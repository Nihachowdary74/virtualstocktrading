import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#eee" }}>
      <Link to="/">Dashboard</Link> |{" "}
      <Link to="/market">Market</Link> |{" "}
      <Link to="/portfolio">Portfolio</Link> |{" "}
      <Link to="/login">Login</Link>
    </nav>
  );
}

export default Navbar;
