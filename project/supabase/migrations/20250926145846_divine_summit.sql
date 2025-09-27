/*
  # Virtual Trading App Database Schema

  1. New Tables
    - `profiles` - User profile information and virtual balance
    - `stocks` - Available stocks for trading with current prices
    - `portfolios` - User stock holdings
    - `transactions` - Trading history
    - `competitions` - Mock trading competitions
    - `competition_participants` - Users in competitions
    - `price_history` - Historical stock prices for charts

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- User profiles with virtual trading balance
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE NOT NULL,
  virtual_balance decimal(12,2) DEFAULT 100000.00,
  total_portfolio_value decimal(12,2) DEFAULT 0.00,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Available stocks for trading
CREATE TABLE IF NOT EXISTS stocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  symbol text UNIQUE NOT NULL,
  name text NOT NULL,
  current_price decimal(10,2) NOT NULL,
  price_change decimal(10,2) DEFAULT 0.00,
  price_change_percent decimal(5,2) DEFAULT 0.00,
  market_cap bigint DEFAULT 0,
  volume bigint DEFAULT 0,
  sector text DEFAULT '',
  last_updated timestamptz DEFAULT now()
);

-- User portfolio holdings
CREATE TABLE IF NOT EXISTS portfolios (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  stock_id uuid REFERENCES stocks(id) ON DELETE CASCADE,
  shares integer NOT NULL DEFAULT 0,
  average_cost decimal(10,2) NOT NULL DEFAULT 0.00,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, stock_id)
);

-- Transaction history
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  stock_id uuid REFERENCES stocks(id) ON DELETE CASCADE,
  transaction_type text NOT NULL CHECK (transaction_type IN ('buy', 'sell')),
  shares integer NOT NULL,
  price_per_share decimal(10,2) NOT NULL,
  total_amount decimal(12,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Mock trading competitions
CREATE TABLE IF NOT EXISTS competitions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  starting_balance decimal(12,2) DEFAULT 100000.00,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Competition participants
CREATE TABLE IF NOT EXISTS competition_participants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  competition_id uuid REFERENCES competitions(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  starting_balance decimal(12,2) NOT NULL,
  current_value decimal(12,2) DEFAULT 0.00,
  rank integer DEFAULT 0,
  joined_at timestamptz DEFAULT now(),
  UNIQUE(competition_id, user_id)
);

-- Price history for charts
CREATE TABLE IF NOT EXISTS price_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stock_id uuid REFERENCES stocks(id) ON DELETE CASCADE,
  price decimal(10,2) NOT NULL,
  timestamp timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE competition_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE stocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE competitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE price_history ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can manage own profile"
  ON profiles
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own portfolio"
  ON portfolios
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own transactions"
  ON transactions
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own competition participation"
  ON competition_participants
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Everyone can view stocks"
  ON stocks
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Everyone can view competitions"
  ON competitions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Everyone can view price history"
  ON price_history
  FOR SELECT
  TO authenticated
  USING (true);

-- Insert sample stocks
INSERT INTO stocks (symbol, name, current_price, market_cap, sector) VALUES
  ('AAPL', 'Apple Inc.', 178.50, 2800000000000, 'Technology'),
  ('MSFT', 'Microsoft Corporation', 415.25, 3100000000000, 'Technology'),
  ('GOOGL', 'Alphabet Inc.', 175.80, 2200000000000, 'Technology'),
  ('AMZN', 'Amazon.com Inc.', 186.40, 1900000000000, 'Consumer Discretionary'),
  ('TSLA', 'Tesla Inc.', 412.75, 1300000000000, 'Consumer Discretionary'),
  ('META', 'Meta Platforms Inc.', 558.50, 1400000000000, 'Technology'),
  ('NVDA', 'NVIDIA Corporation', 875.30, 2100000000000, 'Technology'),
  ('NFLX', 'Netflix Inc.', 692.50, 310000000000, 'Communication Services'),
  ('BABA', 'Alibaba Group', 215.80, 520000000000, 'Consumer Discretionary'),
  ('V', 'Visa Inc.', 289.75, 620000000000, 'Financial Services')
ON CONFLICT (symbol) DO NOTHING;

-- Create a sample competition
INSERT INTO competitions (name, description, start_date, end_date) VALUES
  ('Monthly Trading Challenge', 'Compete with other traders to see who can achieve the best returns this month!', 
   date_trunc('month', now()), date_trunc('month', now()) + interval '1 month')
ON CONFLICT DO NOTHING;