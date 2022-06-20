import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { userSignout } from "../redux/actions/userActions.js";

import { IoIosArrowDropdown } from "react-icons/io";

export const Header = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.signIn);

  const onSignOutHandler = () => {
    dispatch(userSignout());
  };

  return (
    <header>
      <a href="/" className="brand">
        Ecom X
      </a>

      <ul className="header">
        <li>
          <NavLink
            className={(isActive) =>
              isActive ? "header-item-active" : "header-item"
            }
            to="/"
          >
            Homepage
          </NavLink>
        </li>

        {/* Admin */}
        {userInfo && userInfo.isAdmin ? (
          <div className="dropdown">
            <li>
              <NavLink className="header-item" to="#">
                Admin <IoIosArrowDropdown className="dropdown-icon" />
              </NavLink>
            </li>

            <ul className="dropdown-content">
              <li>
                <NavLink className="header-item" to="/dashboard">
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink className="header-item" to="/userlist">
                  Users
                </NavLink>
              </li>
              <li>
                <NavLink className="header-item" to="/productlist">
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink className="header-item" to="/support">
                  Support
                </NavLink>
              </li>
            </ul>
          </div>
        ) : null}

        {userInfo ? (
          <div className="dropdown">
            <li>
              <Link className="header-item" to="#">
                {userInfo.name} <IoIosArrowDropdown className="dropdown-icon" />
              </Link>
            </li>

            <ul className="dropdown-content">
              <li>
                <Link className="header-item" to="/profile">
                  Profile
                </Link>
              </li>
              {userInfo.isAdmin || userInfo.isSeller ? null : (
                <Link className="header-item" to="/orderhistory">
                  Order History
                </Link>
              )}

              <li>
                <Link className="header-item" onClick={onSignOutHandler} to="#">
                  Sign Out
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <li>
            <NavLink className="header-item" to="/signin">
              Sign In
            </NavLink>
          </li>
        )}
      </ul>
    </header>
  );
};

export default Header;
