import React, { useEffect, useState } from "react";
import { getMarketStocks } from "../api";

function StockList() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const fetchStocks = async () => {
      const data = await getMarketStocks();
      setStocks(data);
    };
    fetchStocks();
  }, []);

  return (
    <div>
      <h2>Available Stocks</h2>
      {stocks.length === 0 ? (
        <p>Loading stocks...</p>
      ) : (
        <ul>
          {stocks.map((stock) => (
            <li key={stock.symbol}>
              {stock.symbol} - ${stock.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default StockList;
