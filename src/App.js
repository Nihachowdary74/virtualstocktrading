import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Market from "./pages/Market";
import Portfolio from "./pages/Portfolio";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/market" element={<Market />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
