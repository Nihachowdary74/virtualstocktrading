export interface Stock {
  id: string
  symbol: string
  name: string
  current_price: number
  price_change: number
  price_change_percent: number
  market_cap: number
  volume: number
  sector: string
  last_updated: string
}

export interface Portfolio {
  id: string
  user_id: string
  stock_id: string
  shares: number
  average_cost: number
  created_at: string
  updated_at: string
  stock?: Stock
}

export interface Transaction {
  id: string
  user_id: string
  stock_id: string
  transaction_type: 'buy' | 'sell'
  shares: number
  price_per_share: number
  total_amount: number
  created_at: string
  stock?: Stock
}

export interface Profile {
  id: string
  user_id: string
  username: string
  virtual_balance: number
  total_portfolio_value: number
  created_at: string
  updated_at: string
}

export interface Competition {
  id: string
  name: string
  description: string
  start_date: string
  end_date: string
  starting_balance: number
  is_active: boolean
  created_at: string
}

export interface PriceHistory {
  id: string
  stock_id: string
  price: number
  timestamp: string
}