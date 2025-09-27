import React from 'react'
import { TrendingUp, LogOut, User, DollarSign } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

export default function Header() {
  const { user, profile, signOut } = useAuth()

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  return (
    <header className="bg-gray-900 text-white border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-emerald-500" />
              <h1 className="text-xl font-bold">VirtualTrade</h1>
            </div>
            <span className="text-sm text-emerald-400 font-medium px-2 py-1 bg-emerald-500/20 rounded">
              SIMULATION
            </span>
          </div>

          {user && profile && (
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-sm">
                <DollarSign className="h-4 w-4 text-emerald-500" />
                <span className="text-gray-300">Balance:</span>
                <span className="font-semibold text-emerald-400">
                  {formatCurrency(profile.virtual_balance)}
                </span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm">
                <User className="h-4 w-4 text-blue-500" />
                <span className="text-gray-300">Welcome,</span>
                <span className="font-medium">{profile.username}</span>
              </div>

              <button
                onClick={signOut}
                className="flex items-center space-x-2 text-sm text-gray-300 hover:text-white transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}