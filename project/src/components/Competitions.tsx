import React from 'react'
import { Trophy, Users, Calendar, Target } from 'lucide-react'

export default function Competitions() {
  const mockCompetitions = [
    {
      id: 1,
      name: 'Monthly Trading Challenge',
      description: 'Compete with other traders to achieve the best returns this month!',
      participants: 1247,
      prize: 'Virtual Achievement Badge',
      daysLeft: 12,
      status: 'active',
      startingBalance: 100000,
      leaderPosition: 'Not Joined'
    },
    {
      id: 2,
      name: 'Tech Stock Specialist',
      description: 'Focus on technology stocks and prove your sector expertise.',
      participants: 892,
      prize: 'Tech Expert Certificate',
      daysLeft: 5,
      status: 'active',
      startingBalance: 50000,
      leaderPosition: 'Not Joined'
    },
    {
      id: 3,
      name: 'Risk vs Reward Challenge',
      description: 'Balance risk and reward in this advanced trading competition.',
      participants: 654,
      prize: 'Advanced Trader Badge',
      daysLeft: 0,
      status: 'ended',
      startingBalance: 100000,
      leaderPosition: 'Ended'
    }
  ]

  const mockLeaderboard = [
    { rank: 1, username: 'TraderPro2024', returns: 15.8, portfolio: 115800 },
    { rank: 2, username: 'StockWizard', returns: 12.4, portfolio: 112400 },
    { rank: 3, username: 'MarketMaster', returns: 9.7, portfolio: 109700 },
    { rank: 4, username: 'InvestorGuru', returns: 8.3, portfolio: 108300 },
    { rank: 5, username: 'TradingNinja', returns: 6.9, portfolio: 106900 },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center space-x-3">
        <Trophy className="h-8 w-8 text-yellow-500" />
        <div>
          <h1 className="text-3xl font-bold text-white">Trading Competitions</h1>
          <p className="text-gray-400 mt-1">
            Test your trading skills against other investors and earn achievements
          </p>
        </div>
      </div>

      {/* Active Competitions */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Available Competitions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCompetitions.map((competition) => (
            <div
              key={competition.id}
              className="bg-gray-800 rounded-lg border border-gray-700 p-6 hover:border-gray-600 transition-colors"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-white">{competition.name}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  competition.status === 'active'
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-gray-500/20 text-gray-400'
                }`}>
                  {competition.status.toUpperCase()}
                </span>
              </div>

              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {competition.description}
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Users className="h-4 w-4" />
                    <span>Participants</span>
                  </div>
                  <span className="text-white font-medium">{competition.participants}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Calendar className="h-4 w-4" />
                    <span>Days Left</span>
                  </div>
                  <span className="text-white font-medium">
                    {competition.status === 'ended' ? 'Ended' : `${competition.daysLeft} days`}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Target className="h-4 w-4" />
                    <span>Starting Balance</span>
                  </div>
                  <span className="text-white font-medium">
                    {formatCurrency(competition.startingBalance)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Trophy className="h-4 w-4" />
                    <span>Prize</span>
                  </div>
                  <span className="text-yellow-400 font-medium">{competition.prize}</span>
                </div>
              </div>

              <button
                disabled={competition.status === 'ended'}
                className={`w-full py-2 px-4 font-medium rounded-lg transition-colors ${
                  competition.status === 'ended'
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
              >
                {competition.status === 'ended' ? 'Competition Ended' : 'Join Competition'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Leaderboard */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Current Leaderboard</h2>
        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          <div className="p-4 border-b border-gray-700 bg-gray-700">
            <h3 className="font-semibold text-white">Monthly Trading Challenge</h3>
            <p className="text-sm text-gray-400 mt-1">Top performers this month</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Trader
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Returns
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Portfolio Value
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {mockLeaderboard.map((trader, index) => (
                  <tr key={trader.rank} className="hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {index < 3 ? (
                          <span className={`text-lg ${
                            index === 0 ? 'text-yellow-400' :
                            index === 1 ? 'text-gray-300' : 'text-yellow-600'
                          }`}>
                            {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                          </span>
                        ) : (
                          <span className="text-gray-400 font-medium">#{trader.rank}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-white font-medium">{trader.username}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-emerald-400 font-medium">+{trader.returns}%</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-white">{formatCurrency(trader.portfolio)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Competition Benefits */}
      <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-lg border border-purple-700/30 p-6">
        <h3 className="text-xl font-bold text-white mb-4">Why Join Competitions?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <h4 className="font-semibold text-white mb-2">Earn Achievements</h4>
            <p className="text-gray-400 text-sm">
              Unlock badges and certificates for your trading accomplishments
            </p>
          </div>
          <div className="text-center">
            <Target className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
            <h4 className="font-semibold text-white mb-2">Skill Development</h4>
            <p className="text-gray-400 text-sm">
              Practice different strategies and learn from market conditions
            </p>
          </div>
          <div className="text-center">
            <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <h4 className="font-semibold text-white mb-2">Community Learning</h4>
            <p className="text-gray-400 text-sm">
              Compare performance and learn from other successful traders
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}