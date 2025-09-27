import React, { useState } from 'react'
import { useAuth } from './hooks/useAuth'
import Header from './components/Header'
import Navigation from './components/Navigation'
import Dashboard from './components/Dashboard'
import Portfolio from './components/Portfolio'
import Competitions from './components/Competitions'
import Education from './components/Education'
import AuthModal from './components/AuthModal'

function App() {
  const { user, loading } = useAuth()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showAuth, setShowAuth] = useState(false)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900">
        {/* Landing Page */}
        <div className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-white mb-6">
                Virtual<span className="text-emerald-400">Trade</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Learn stock trading without financial risk. Practice with virtual money, 
                compete with other traders, and master the market.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
                <button
                  onClick={() => setShowAuth(true)}
                  className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Start Trading for Free
                </button>
                <button
                  onClick={() => setShowAuth(true)}
                  className="px-8 py-3 border border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 font-semibold rounded-lg transition-colors"
                >
                  Learn More
                </button>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-6 max-w-md mx-auto">
                <h3 className="text-emerald-400 font-semibold mb-2">🎉 Start with $100,000</h3>
                <p className="text-gray-300 text-sm">
                  Get virtual money to practice trading real stocks with live market data
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-emerald-400 text-2xl">📈</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Real Market Data</h3>
                <p className="text-gray-400">
                  Trade with live stock prices and realistic market conditions
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-400 text-2xl">🏆</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Competitions</h3>
                <p className="text-gray-400">
                  Compete with other traders and climb the leaderboards
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-400 text-2xl">📚</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Learn & Practice</h3>
                <p className="text-gray-400">
                  Educational content and tutorials to improve your skills
                </p>
              </div>
            </div>
          </div>
        </div>

        <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
      </div>
    )
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />
      case 'portfolio':
        return <Portfolio />
      case 'competitions':
        return <Competitions />
      case 'education':
        return <Education />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderActiveTab()}
      </main>
    </div>
  )
}

export default App