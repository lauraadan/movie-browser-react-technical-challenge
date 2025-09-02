import React from "react";
import { Link, NavLink } from "react-router-dom";
import { ROUTES } from "../../constants/constants";

export default function Navbar(): JSX.Element {
  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Link to={ROUTES.HOME} className="navbar__logo">
          <img src="src/assets/logo.svg" alt="logo" />
        </Link>
        <nav className="navbar__nav">
          <NavLink
            to={ROUTES.HOME}
            end
            className={({ isActive }) =>
              "nav__link" + (isActive ? " is-active" : "")
            }
          >
            Home
          </NavLink>
          <NavLink
            to={ROUTES.CATEGORIES}
            className={({ isActive }) =>
              "nav__link" + (isActive ? " is-active" : "")
            }
          >
            Categories
          </NavLink>
          <NavLink
            to={ROUTES.WISHLIST}
            className={({ isActive }) =>
              "nav__link" + (isActive ? " is-active" : "")
            }
          >
            Wishlist
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
