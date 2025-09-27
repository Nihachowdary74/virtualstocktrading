import React from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { Portfolio } from '../types/trading'

interface PortfolioCardProps {
  position: Portfolio
}

export default function PortfolioCard({ position }: PortfolioCardProps) {
  const stock = position.stock
  if (!stock) return null

  const currentValue = position.shares * stock.current_price
  const totalCost = position.shares * position.average_cost
  const gainLoss = currentValue - totalCost
  const gainLossPercent = (gainLoss / totalCost) * 100
  const isPositive = gainLoss >= 0

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-bold text-white">{stock.symbol}</h3>
            <span className="text-xs px-2 py-1 bg-gray-700 text-gray-300 rounded">
              {position.shares} shares
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">{stock.name}</p>
        </div>
        
        <div className={`text-right ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
          <div className="flex items-center space-x-1">
            {isPositive ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            <span className="text-sm font-medium">
              {gainLossPercent.toFixed(2)}%
            </span>
          </div>
          <div className="text-xs">
            {formatCurrency(gainLoss)}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-400">Current Price</span>
            <div className="text-white font-medium">{formatCurrency(stock.current_price)}</div>
          </div>
          <div>
            <span className="text-gray-400">Avg Cost</span>
            <div className="text-white font-medium">{formatCurrency(position.average_cost)}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-400">Total Cost</span>
            <div className="text-white font-medium">{formatCurrency(totalCost)}</div>
          </div>
          <div>
            <span className="text-gray-400">Current Value</span>
            <div className="text-white font-medium">{formatCurrency(currentValue)}</div>
          </div>
        </div>

        <div className="pt-3 border-t border-gray-700">
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">Total Return</span>
            <div className={`font-bold ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
              {formatCurrency(gainLoss)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}