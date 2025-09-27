import React from 'react'
import { TrendingUp, TrendingDown, DollarSign, BarChart } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { usePortfolio } from '../hooks/usePortfolio'
import { useStocks } from '../hooks/useStocks'
import StockCard from './StockCard'

export default function Dashboard() {
  const { profile } = useAuth()
  const { portfolio, transactions } = usePortfolio()
  const { stocks } = useStocks()

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
  const totalAccountValue = (profile?.virtual_balance || 0) + totalPortfolioValue

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  const topMovers = stocks
    .filter(stock => Math.abs(stock.price_change_percent) > 1)
    .sort((a, b) => Math.abs(b.price_change_percent) - Math.abs(a.price_change_percent))
    .slice(0, 6)

  return (
    <div className="space-y-8">
      {/* Account Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <DollarSign className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Value</p>
              <p className="text-xl font-bold text-white">
                {formatCurrency(totalAccountValue)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-emerald-500/20 rounded-lg">
              <BarChart className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Portfolio Value</p>
              <p className="text-xl font-bold text-white">
                {formatCurrency(totalPortfolioValue)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gray-500/20 rounded-lg">
              <DollarSign className="h-5 w-5 text-gray-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Cash Balance</p>
              <p className="text-xl font-bold text-white">
                {formatCurrency(profile?.virtual_balance || 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${
              totalGainLoss >= 0 ? 'bg-emerald-500/20' : 'bg-red-500/20'
            }`}>
              {totalGainLoss >= 0 ? (
                <TrendingUp className="h-5 w-5 text-emerald-400" />
              ) : (
                <TrendingDown className="h-5 w-5 text-red-400" />
              )}
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Return</p>
              <p className={`text-xl font-bold ${
                totalGainLoss >= 0 ? 'text-emerald-400' : 'text-red-400'
              }`}>
                {formatCurrency(totalGainLoss)}
              </p>
              <p className={`text-xs ${
                totalGainLoss >= 0 ? 'text-emerald-400' : 'text-red-400'
              }`}>
                {totalGainLossPercent.toFixed(2)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Market Movers */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Market Movers</h2>
          <span className="text-sm text-gray-400">Stocks with significant price changes</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topMovers.map((stock) => (
            <StockCard key={stock.id} stock={stock} />
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      {transactions.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Recent Transactions</h2>
          <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Action
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Shares
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {transactions.slice(0, 10).map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-white">
                            {transaction.stock?.symbol}
                          </div>
                          <div className="text-sm text-gray-400">
                            {transaction.stock?.name}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          transaction.transaction_type === 'buy'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {transaction.transaction_type.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                        {transaction.shares}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                        {formatCurrency(transaction.price_per_share)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                        {formatCurrency(transaction.total_amount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {new Date(transaction.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}