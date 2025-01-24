import React from "react";
import { Link } from "react-router-dom";


function NavBar() {
  return (
    <nav className="navbar">
      <h1>Management App</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/clients">Clients</Link>
        </li>
        <li>
          <Link to="/products">Cosmetic Products</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
