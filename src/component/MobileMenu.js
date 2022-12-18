import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { toggleMobileMenuStatusOff } from "../redux/actions/menuAction.js";
import { userSignout } from "../redux/actions/userActions.js";

const MobileMenu = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.signIn);

  const onSignOutHandler = () => {
    dispatch(userSignout());
  };

  const toggleMenuOff = () => {
    dispatch(toggleMobileMenuStatusOff());
  };

  return (
    <div className="mobile__menu__body">
      <div className="mobile__body1">
        <ul className="mobile__menu__options">
          <NavLink to="/">
            <li onClick={toggleMenuOff} className="mobile__menu__option">
              Homepage{" "}
            </li>
          </NavLink>
          {userInfo?.isAdmin && (
            <li className="mobile__menu__option admin__menu">
              Admin {">"}
              <ul onClick={toggleMenuOff} className="admin__submenu">
                {/* <li className="mobile__submenu__option">subHomepage {">"}</li>
              <li className="mobile__submenu__option">Admin {">"}</li>
              <li className="mobile__submenu__option">User {">"}</li> */}
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
            </li>
          )}
          <li className="mobile__menu__option user__menu">
            {userInfo ? (
              <>
                {userInfo?.name} {">"}
                <ul onClick={toggleMenuOff} className="user__submenu">
                  {/* <li className="mobile__menu__option">subHomepage {">"}</li>
              <li className="mobile__menu__option">Admin {">"}</li>
              <li className="mobile__menu__option">User {">"}</li> */}
                  <li>
                    <Link className="header-item" to="/profile">
                      Profile
                    </Link>
                  </li>
                  <li>
                    {userInfo?.isAdmin || userInfo?.isSeller ? null : (
                      <Link className="header-item" to="/orderhistory">
                        Order History
                      </Link>
                    )}
                  </li>
                  <li>
                    <Link
                      className="header-item"
                      onClick={onSignOutHandler}
                      to="#"
                    >
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </>
            ) : (
              <ul>
                <li>
                  <Link
                    className="header-item"
                    onClick={toggleMenuOff}
                    to="/signin"
                  >
                    Sign In
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>

      {/* <div className="mobile__body2">
        <ul className="mobile__submenu__admin">
          <li className="mobile__menu__option">Homepage {">"}</li>
          <li className="mobile__menu__option">Admin {">"}</li>
          <li className="mobile__menu__option">User {">"}</li>
        </ul>
        <ul className="mobile__submenu__user">
          <li className="mobile__menu__option">Homepage {">"}</li>
          <li className="mobile__menu__option">Admin {">"}</li>
          <li className="mobile__menu__option">User {">"}</li>
        </ul>
      </div> */}
    </div>
  );
};

export default MobileMenu;
