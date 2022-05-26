import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header>
      <a href="/" className="brand">
        Ecom X
      </a>

      <ul className="header">
        <li>
          <Link className="header-item" to="/">
            Homepage
          </Link>
        </li>
        <li>
          <Link className="header-item" to="/Dashboard">
            Dashboard
          </Link>
        </li>
        <li>
          <Link className="header-item" to="/Profile">
            Profile
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
