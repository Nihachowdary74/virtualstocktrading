import React from 'react'
import { Briefcase, TrendingUp, AlertCircle } from 'lucide-react'
import { usePortfolio } from '../hooks/usePortfolio'
import { useAuth } from '../hooks/useAuth'
import PortfolioCard from './PortfolioCard'

export default function Portfolio() {
  const { portfolio, loading } = usePortfolio()
  const { profile } = useAuth()

  const totalPortfolioValue = portfolio.reduce((total, position) => {
    if (position.stock) {
      return total + (position.shares * position.stock.current_price)
    }
    return total
  }, 0)

  const totalInvested = portfolio.reduce((total, position) => {
    return total + (position.shares * position.average_cost)
  }, 0)

  const totalGainLoss = totalPortfolioValue - totalInvested
  const totalGainLossPercent = totalInvested > 0 ? (totalGainLoss / totalInvested) * 100 : 0

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-400">Loading portfolio...</div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Portfolio Summary */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Briefcase className="h-6 w-6 text-emerald-500" />
          <h2 className="text-2xl font-bold text-white">Portfolio Overview</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-sm text-gray-400 mb-1">Total Value</p>
            <p className="text-2xl font-bold text-white">
              {formatCurrency(totalPortfolioValue)}
            </p>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-400 mb-1">Total Invested</p>
            <p className="text-2xl font-bold text-white">
              {formatCurrency(totalInvested)}
            </p>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-400 mb-1">Total Return</p>
            <p className={`text-2xl font-bold ${
              totalGainLoss >= 0 ? 'text-emerald-400' : 'text-red-400'
            }`}>
              {formatCurrency(totalGainLoss)}
            </p>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-400 mb-1">Return %</p>
            <div className={`flex items-center justify-center space-x-1 ${
              totalGainLoss >= 0 ? 'text-emerald-400' : 'text-red-400'
            }`}>
              <TrendingUp className={`h-4 w-4 ${totalGainLoss < 0 ? 'rotate-180' : ''}`} />
              <span className="text-2xl font-bold">
                {Math.abs(totalGainLossPercent).toFixed(2)}%
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-700">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Available Cash</span>
            <span className="text-white font-medium">
              {formatCurrency(profile?.virtual_balance || 0)}
            </span>
          </div>
        </div>
      </div>

      {/* Portfolio Positions */}
      {portfolio.length > 0 ? (
        <div>
          <h3 className="text-xl font-bold text-white mb-6">Your Positions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolio.map((position) => (
              <PortfolioCard key={position.id} position={position} />
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-12 text-center">
          <AlertCircle className="h-12 w-12 text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No Positions Yet</h3>
          <p className="text-gray-400 mb-6">
            Start building your portfolio by purchasing stocks from the Dashboard or Market sections.
          </p>
          <div className="bg-blue-900 border border-blue-700 rounded-lg p-4 max-w-md mx-auto">
            <p className="text-blue-300 text-sm">
              💡 <strong>Tip:</strong> Diversify your investments across different sectors to reduce risk and maximize potential returns.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}