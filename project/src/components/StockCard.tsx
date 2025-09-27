import React, { useState } from 'react'
import { TrendingUp, TrendingDown, ShoppingCart } from 'lucide-react'
import { Stock } from '../types/trading'
import TradingModal from './TradingModal'

interface StockCardProps {
  stock: Stock
}

export default function StockCard({ stock }: StockCardProps) {
  const [showTrading, setShowTrading] = useState(false)
  const isPositive = stock.price_change >= 0

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  const formatMarketCap = (cap: number) => {
    if (cap >= 1e12) {
      return `$${(cap / 1e12).toFixed(2)}T`
    } else if (cap >= 1e9) {
      return `$${(cap / 1e9).toFixed(2)}B`
    } else if (cap >= 1e6) {
      return `$${(cap / 1e6).toFixed(2)}M`
    }
    return `$${cap}`
  }

  return (
    <>
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 hover:border-gray-600 transition-colors">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-bold text-white">{stock.symbol}</h3>
              <span className="text-xs px-2 py-1 bg-gray-700 text-gray-300 rounded">
                {stock.sector}
              </span>
            </div>
            <p className="text-sm text-gray-400 mt-1">{stock.name}</p>
          </div>
          
          <button
            onClick={() => setShowTrading(true)}
            className="flex items-center space-x-1 px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-sm rounded transition-colors"
          >
            <ShoppingCart className="h-3 w-3" />
            <span>Trade</span>
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-white">
              {formatCurrency(stock.current_price)}
            </span>
            <div className={`flex items-center space-x-1 ${
              isPositive ? 'text-emerald-400' : 'text-red-400'
            }`}>
              {isPositive ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              <span className="text-sm font-medium">
                {formatCurrency(Math.abs(stock.price_change))} ({Math.abs(stock.price_change_percent).toFixed(2)}%)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Market Cap</span>
              <div className="text-white font-medium">{formatMarketCap(stock.market_cap)}</div>
            </div>
            <div>
              <span className="text-gray-400">Volume</span>
              <div className="text-white font-medium">{stock.volume.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>

      {showTrading && (
        <TradingModal
          stock={stock}
          onClose={() => setShowTrading(false)}
        />
      )}
    </>
  )
}