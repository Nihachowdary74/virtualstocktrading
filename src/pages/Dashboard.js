import React, { useEffect, useState } from "react";
import { getDashboardData } from "../api";

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getDashboardData();
      setData(result);
    };
    fetchData();
  }, []);

  if (!data) return <p>Loading dashboard...</p>;

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Total Balance: ${data.totalBalance}</p>
      <p>Invested: ${data.invested}</p>
      <p>P/L: ${data.pnl}</p>
    </div>
  );
}

export default Dashboard;
