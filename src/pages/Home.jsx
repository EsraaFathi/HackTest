import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container text-center">
      <h1>Welcome to Coffee Bliss</h1>
      <p>Your favorite coffee, brewed to perfection.</p>
      <nav>
        <Link className="btn btn-primary m-2" to="/menu">
          Menu
        </Link>
        <Link className="btn btn-secondary m-2" to="/about">
          About Us
        </Link>
        {/* admin */}
        <Link className="btn btn-light" to="/admin" style={{ display: "none" }}>
          Admin
        </Link>
      </nav>
    </div>
  );
}

export default Home;
