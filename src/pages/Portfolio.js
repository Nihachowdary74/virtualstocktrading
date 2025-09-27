import React, { useEffect, useState } from "react";
import { getPortfolio } from "../api";

function Portfolio() {
  const [holdings, setHoldings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPortfolio();
      setHoldings(data);
    };
    fetchData();
  }, []);

  if (!holdings || holdings.length === 0) return <p>No holdings yet</p>;

  return (
    <div>
      <h1>Portfolio</h1>
      <ul>
        {holdings.map((h) => (
          <li key={h.symbol}>
            {h.symbol} - {h.qty} shares @ ${h.currentPrice}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Portfolio;
