// This simulates API calls
export const getMarketStocks = async () => {
  return [
    { symbol: "AAPL", price: 150 },
    { symbol: "TSLA", price: 700 },
    { symbol: "GOOG", price: 2800 },
  ];
};

export const getPortfolio = async () => {
  return [
    { symbol: "AAPL", qty: 10, avgPrice: 145, currentPrice: 150 },
    { symbol: "TSLA", qty: 5, avgPrice: 680, currentPrice: 700 },
  ];
};

export const getDashboardData = async () => {
  return { totalBalance: 10000, invested: 8000, pnl: 2000 };
};

export const loginUser = async (credentials) => {
  return { username: credentials.username, token: "dummy-token" };
};
