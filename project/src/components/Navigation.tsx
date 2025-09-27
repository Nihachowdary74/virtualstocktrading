import React from 'react'
import { BarChart3, Briefcase, Trophy, BookOpen } from 'lucide-react'

interface NavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
  { id: 'competitions', label: 'Competitions', icon: Trophy },
  { id: 'education', label: 'Learn', icon: BookOpen },
]

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex items-center space-x-2 px-3 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === item.id
                    ? 'border-emerald-500 text-emerald-400'
                    : 'border-transparent text-gray-300 hover:text-white hover:border-gray-600'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}