import React, { useState } from 'react'
import { X, TrendingUp, TrendingDown } from 'lucide-react'
import { Stock } from '../types/trading'
import { usePortfolio } from '../hooks/usePortfolio'
import { useAuth } from '../hooks/useAuth'

interface TradingModalProps {
  stock: Stock
  onClose: () => void
}

export default function TradingModal({ stock, onClose }: TradingModalProps) {
  const [action, setAction] = useState<'buy' | 'sell'>('buy')
  const [shares, setShares] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const { profile } = useAuth()
  const { buyStock, sellStock, portfolio } = usePortfolio()

  const userPosition = portfolio.find(p => p.stock_id === stock.id)
  const maxAffordableShares = profile ? Math.floor(profile.virtual_balance / stock.current_price) : 0
  const totalCost = parseInt(shares) * stock.current_price || 0

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  const handleTrade = async () => {
    if (!shares || parseInt(shares) <= 0) {
      setMessage('Please enter a valid number of shares')
      return
    }

    setLoading(true)
    setMessage('')

    const shareCount = parseInt(shares)
    let result

    if (action === 'buy') {
      result = await buyStock(stock.id, shareCount, stock.current_price)
    } else {
      result = await sellStock(stock.id, shareCount, stock.current_price)
    }

    if (result?.error) {
      setMessage(result.error)
    } else {
      setMessage(`Successfully ${action === 'buy' ? 'bought' : 'sold'} ${shareCount} shares of ${stock.symbol}`)
      setTimeout(() => {
        onClose()
      }, 2000)
    }

    setLoading(false)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg max-w-md w-full border border-gray-700">
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Trade {stock.symbol}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Stock Info */}
          <div className="bg-gray-900 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-white">{stock.name}</h3>
              <div className={`flex items-center space-x-1 ${
                stock.price_change >= 0 ? 'text-emerald-400' : 'text-red-400'
              }`}>
                {stock.price_change >= 0 ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                <span className="text-sm">
                  {stock.price_change_percent.toFixed(2)}%
                </span>
              </div>
            </div>
            <div className="text-2xl font-bold text-white">
              {formatCurrency(stock.current_price)}
            </div>
          </div>

          {/* Position Info */}
          {userPosition && (
            <div className="bg-gray-900 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-300 mb-2">Your Position</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Shares Owned</span>
                  <div className="text-white font-medium">{userPosition.shares}</div>
                </div>
                <div>
                  <span className="text-gray-400">Avg Cost</span>
                  <div className="text-white font-medium">{formatCurrency(userPosition.average_cost)}</div>
                </div>
              </div>
            </div>
          )}

          {/* Action Selection */}
          <div className="flex space-x-2">
            <button
              onClick={() => setAction('buy')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                action === 'buy'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Buy
            </button>
            <button
              onClick={() => setAction('sell')}
              disabled={!userPosition || userPosition.shares === 0}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                action === 'sell'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed'
              }`}
            >
              Sell
            </button>
          </div>

          {/* Shares Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Number of Shares
            </label>
            <input
              type="number"
              min="1"
              max={action === 'buy' ? maxAffordableShares : userPosition?.shares || 0}
              value={shares}
              onChange={(e) => setShares(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Enter shares"
            />
            <div className="mt-2 text-xs text-gray-400">
              {action === 'buy' ? (
                <>Max affordable: {maxAffordableShares} shares</>
              ) : (
                <>Available: {userPosition?.shares || 0} shares</>
              )}
            </div>
          </div>

          {/* Order Summary */}
          {shares && parseInt(shares) > 0 && (
            <div className="bg-gray-900 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-300 mb-2">Order Summary</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Action:</span>
                  <span className="text-white capitalize">{action} {shares} shares</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Price per share:</span>
                  <span className="text-white">{formatCurrency(stock.current_price)}</span>
                </div>
                <div className="flex justify-between font-medium border-t border-gray-700 pt-1 mt-2">
                  <span className="text-gray-300">Total:</span>
                  <span className="text-white">{formatCurrency(totalCost)}</span>
                </div>
              </div>
            </div>
          )}

          {message && (
            <div className={`p-3 rounded-lg text-sm ${
              message.includes('Successfully') 
                ? 'bg-emerald-900 text-emerald-300 border border-emerald-700' 
                : 'bg-red-900 text-red-300 border border-red-700'
            }`}>
              {message}
            </div>
          )}

          {/* Trade Button */}
          <button
            onClick={handleTrade}
            disabled={loading || !shares || parseInt(shares) <= 0}
            className="w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
          >
            {loading ? 'Processing...' : `${action === 'buy' ? 'Buy' : 'Sell'} Shares`}
          </button>
        </div>
      </div>
    </div>
  )
}