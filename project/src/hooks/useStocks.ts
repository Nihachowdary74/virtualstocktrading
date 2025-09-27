import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Stock, PriceHistory } from '../types/trading'

export function useStocks() {
  const [stocks, setStocks] = useState<Stock[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStocks()
    
    // Simulate real-time price updates
    const interval = setInterval(updateStockPrices, 5000)
    
    return () => clearInterval(interval)
  }, [])

  const fetchStocks = async () => {
    const { data, error } = await supabase
      .from('stocks')
      .select('*')
      .order('symbol')

    if (data && !error) {
      setStocks(data)
    }
    setLoading(false)
  }

  const updateStockPrices = async () => {
    const updatedStocks = stocks.map(stock => {
      // Simulate price movement (-2% to +2%)
      const changePercent = (Math.random() - 0.5) * 0.04
      const newPrice = stock.current_price * (1 + changePercent)
      const priceChange = newPrice - stock.current_price
      const priceChangePercent = (priceChange / stock.current_price) * 100

      return {
        ...stock,
        current_price: Math.round(newPrice * 100) / 100,
        price_change: Math.round(priceChange * 100) / 100,
        price_change_percent: Math.round(priceChangePercent * 100) / 100,
        last_updated: new Date().toISOString(),
      }
    })

    setStocks(updatedStocks)

    // Update database
    for (const stock of updatedStocks) {
      await supabase
        .from('stocks')
        .update({
          current_price: stock.current_price,
          price_change: stock.price_change,
          price_change_percent: stock.price_change_percent,
          last_updated: stock.last_updated,
        })
        .eq('id', stock.id)

      // Add to price history
      await supabase
        .from('price_history')
        .insert([
          {
            stock_id: stock.id,
            price: stock.current_price,
          },
        ])
    }
  }

  const getStockById = (id: string) => {
    return stocks.find(stock => stock.id === id)
  }

  const getStockBySymbol = (symbol: string) => {
    return stocks.find(stock => stock.symbol === symbol)
  }

  return {
    stocks,
    loading,
    getStockById,
    getStockBySymbol,
    refreshStocks: fetchStocks,
  }
}