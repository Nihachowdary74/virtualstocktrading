import React, { useState } from 'react'
import { BookOpen, PlayCircle, Award, TrendingUp, PieChart, Shield } from 'lucide-react'

export default function Education() {
  const [activeLesson, setActiveLesson] = useState<number | null>(null)

  const lessons = [
    {
      id: 1,
      title: 'Stock Market Basics',
      description: 'Learn the fundamentals of how the stock market works',
      duration: '15 min',
      level: 'Beginner',
      icon: TrendingUp,
      content: `
        The stock market is where shares of publicly-held companies are bought and sold. When you buy a stock, you become a partial owner of that company.

        Key Concepts:
        • Stocks represent ownership in a company
        • Share prices fluctuate based on supply and demand
        • Companies issue stocks to raise capital for growth
        • Investors buy stocks hoping the price will increase

        Types of Stocks:
        • Common Stock: Voting rights, dividends vary
        • Preferred Stock: Fixed dividends, no voting rights

        Market Participants:
        • Individual investors (retail investors)
        • Institutional investors (mutual funds, pension funds)
        • Market makers and brokers
      `
    },
    {
      id: 2,
      title: 'Understanding Stock Valuation',
      description: 'Learn how to evaluate if a stock is fairly priced',
      duration: '20 min',
      level: 'Intermediate',
      icon: PieChart,
      content: `
        Stock valuation helps determine whether a stock is overvalued, undervalued, or fairly priced.

        Key Metrics:
        • Price-to-Earnings (P/E) Ratio: Stock price ÷ Earnings per share
        • Market Capitalization: Share price × Total shares outstanding
        • Dividend Yield: Annual dividend ÷ Stock price

        Valuation Methods:
        • Fundamental Analysis: Company financials, industry trends
        • Technical Analysis: Price patterns, volume, charts
        • Comparative Analysis: Compare with similar companies

        Red Flags:
        • Extremely high P/E ratios
        • Declining revenue over time
        • High debt-to-equity ratios
        • Management turnover
      `
    },
    {
      id: 3,
      title: 'Risk Management Strategies',
      description: 'Protect your investments with proper risk management',
      duration: '18 min',
      level: 'Intermediate',
      icon: Shield,
      content: `
        Risk management is crucial for long-term investing success. Never invest more than you can afford to lose.

        Diversification:
        • Spread investments across different sectors
        • Mix of stocks, bonds, and other assets
        • Geographic diversification (domestic vs international)

        Risk Management Tools:
        • Stop-loss orders: Automatically sell if price drops
        • Position sizing: Don't put all money in one stock
        • Asset allocation: Balance between different asset types

        Common Mistakes:
        • Emotional trading (fear and greed)
        • Trying to time the market
        • Following hot tips without research
        • Not having an investment plan
      `
    }
  ]

  const achievements = [
    { name: 'First Steps', description: 'Complete your first lesson', earned: true },
    { name: 'Knowledge Seeker', description: 'Complete 5 lessons', earned: false },
    { name: 'Market Scholar', description: 'Complete all beginner lessons', earned: false },
    { name: 'Trading Expert', description: 'Complete all lessons', earned: false },
  ]

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center space-x-3">
        <BookOpen className="h-8 w-8 text-blue-500" />
        <div>
          <h1 className="text-3xl font-bold text-white">Trading Education</h1>
          <p className="text-gray-400 mt-1">
            Master the fundamentals of stock trading and investing
          </p>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Your Progress</h2>
          <span className="text-emerald-400 font-medium">1 of 3 lessons completed</span>
        </div>
        
        <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
          <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '33%' }}></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-emerald-400">1</p>
            <p className="text-sm text-gray-400">Completed</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">2</p>
            <p className="text-sm text-gray-400">In Progress</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">3</p>
            <p className="text-sm text-gray-400">Total Lessons</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-400">1</p>
            <p className="text-sm text-gray-400">Achievements</p>
          </div>
        </div>
      </div>

      {/* Lessons */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Available Lessons</h2>
        <div className="space-y-4">
          {lessons.map((lesson) => {
            const Icon = lesson.icon
            return (
              <div key={lesson.id} className="bg-gray-800 rounded-lg border border-gray-700">
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-blue-500/20 rounded-lg">
                      <Icon className="h-6 w-6 text-blue-400" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-bold text-white">{lesson.title}</h3>
                        <div className="flex items-center space-x-4">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            lesson.level === 'Beginner'
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {lesson.level}
                          </span>
                          <span className="text-sm text-gray-400">{lesson.duration}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-400 mb-4">{lesson.description}</p>
                      
                      <button
                        onClick={() => setActiveLesson(activeLesson === lesson.id ? null : lesson.id)}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                      >
                        <PlayCircle className="h-4 w-4" />
                        <span>{activeLesson === lesson.id ? 'Hide Lesson' : 'Start Lesson'}</span>
                      </button>
                    </div>
                  </div>
                  
                  {activeLesson === lesson.id && (
                    <div className="mt-6 pt-6 border-t border-gray-700">
                      <div className="prose prose-invert max-w-none">
                        <div className="whitespace-pre-line text-gray-300 leading-relaxed">
                          {lesson.content}
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-700">
                        <button className="px-4 py-2 text-gray-400 hover:text-white transition-colors">
                          ← Previous Lesson
                        </button>
                        <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors">
                          Mark Complete
                        </button>
                        <button className="px-4 py-2 text-gray-400 hover:text-white transition-colors">
                          Next Lesson →
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Achievements */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((achievement) => (
            <div
              key={achievement.name}
              className={`p-6 rounded-lg border ${
                achievement.earned
                  ? 'bg-yellow-900/20 border-yellow-700'
                  : 'bg-gray-800 border-gray-700'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Award className={`h-8 w-8 ${
                  achievement.earned ? 'text-yellow-400' : 'text-gray-500'
                }`} />
                <div>
                  <h3 className={`font-bold ${
                    achievement.earned ? 'text-yellow-400' : 'text-white'
                  }`}>
                    {achievement.name}
                  </h3>
                  <p className="text-gray-400 text-sm">{achievement.description}</p>
                </div>
                {achievement.earned && (
                  <span className="text-yellow-400 text-2xl">✓</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg border border-blue-700/30 p-6">
        <h3 className="text-xl font-bold text-white mb-4">💡 Quick Trading Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h4 className="font-semibold text-white mb-2">Start Small</h4>
            <p className="text-gray-400 text-sm">
              Begin with small investments while you learn. It's better to gain experience with smaller amounts.
            </p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h4 className="font-semibold text-white mb-2">Do Your Research</h4>
            <p className="text-gray-400 text-sm">
              Never buy a stock without understanding the company. Read financial reports and news.
            </p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h4 className="font-semibold text-white mb-2">Stay Disciplined</h4>
            <p className="text-gray-400 text-sm">
              Stick to your investment strategy. Don't let emotions drive your trading decisions.
            </p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h4 className="font-semibold text-white mb-2">Learn Continuously</h4>
            <p className="text-gray-400 text-sm">
              The market is always changing. Keep learning and adapting your strategies.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}