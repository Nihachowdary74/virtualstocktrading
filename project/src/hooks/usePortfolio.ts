import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Portfolio, Transaction } from '../types/trading'
import { useAuth } from './useAuth'

export function usePortfolio() {
  const { user, profile } = useAuth()
  const [portfolio, setPortfolio] = useState<Portfolio[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchPortfolio()
      fetchTransactions()
    }
  }, [user])

  const fetchPortfolio = async () => {
    if (!user) return

    const { data, error } = await supabase
      .from('portfolios')
      .select(`
        *,
        stock:stocks(*)
      `)
      .eq('user_id', user.id)
      .gt('shares', 0)

    if (data && !error) {
      setPortfolio(data)
    }
    setLoading(false)
  }

  const fetchTransactions = async () => {
    if (!user) return

    const { data, error } = await supabase
      .from('transactions')
      .select(`
        *,
        stock:stocks(*)
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(50)

    if (data && !error) {
      setTransactions(data)
    }
  }

  const buyStock = async (stockId: string, shares: number, pricePerShare: number) => {
    if (!user || !profile) return { error: 'Not authenticated' }

    const totalCost = shares * pricePerShare

    if (totalCost > profile.virtual_balance) {
      return { error: 'Insufficient funds' }
    }

    try {
      // Check if user already owns this stock
      const { data: existingPosition } = await supabase
        .from('portfolios')
        .select('*')
        .eq('user_id', user.id)
        .eq('stock_id', stockId)
        .single()

      if (existingPosition) {
        // Update existing position
        const newShares = existingPosition.shares + shares
        const newAverageCost = ((existingPosition.shares * existingPosition.average_cost) + totalCost) / newShares

        await supabase
          .from('portfolios')
          .update({
            shares: newShares,
            average_cost: newAverageCost,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existingPosition.id)
      } else {
        // Create new position
        await supabase
          .from('portfolios')
          .insert([
            {
              user_id: user.id,
              stock_id: stockId,
              shares,
              average_cost: pricePerShare,
            },
          ])
      }

      // Record transaction
      await supabase
        .from('transactions')
        .insert([
          {
            user_id: user.id,
            stock_id: stockId,
            transaction_type: 'buy',
            shares,
            price_per_share: pricePerShare,
            total_amount: totalCost,
          },
        ])

      // Update user balance
      await supabase
        .from('profiles')
        .update({
          virtual_balance: profile.virtual_balance - totalCost,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id)

      // Refresh data
      await fetchPortfolio()
      await fetchTransactions()

      return { success: true }
    } catch (error) {
      return { error: 'Transaction failed' }
    }
  }

  const sellStock = async (stockId: string, shares: number, pricePerShare: number) => {
    if (!user || !profile) return { error: 'Not authenticated' }

    const totalValue = shares * pricePerShare

    // Find user's position
    const position = portfolio.find(p => p.stock_id === stockId)
    if (!position || position.shares < shares) {
      return { error: 'Insufficient shares' }
    }

    try {
      // Update position
      const newShares = position.shares - shares

      if (newShares === 0) {
        // Remove position entirely
        await supabase
          .from('portfolios')
          .delete()
          .eq('id', position.id)
      } else {
        // Update remaining shares
        await supabase
          .from('portfolios')
          .update({
            shares: newShares,
            updated_at: new Date().toISOString(),
          })
          .eq('id', position.id)
      }

      // Record transaction
      await supabase
        .from('transactions')
        .insert([
          {
            user_id: user.id,
            stock_id: stockId,
            transaction_type: 'sell',
            shares,
            price_per_share: pricePerShare,
            total_amount: totalValue,
          },
        ])

      // Update user balance
      await supabase
        .from('profiles')
        .update({
          virtual_balance: profile.virtual_balance + totalValue,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id)

      // Refresh data
      await fetchPortfolio()
      await fetchTransactions()

      return { success: true }
    } catch (error) {
      return { error: 'Transaction failed' }
    }
  }

  return {
    portfolio,
    transactions,
    loading,
    buyStock,
    sellStock,
    refreshPortfolio: fetchPortfolio,
  }
}