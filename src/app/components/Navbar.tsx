import { Link, NavLink } from "react-router-dom";
import { ROUTES } from "../common/constants/constants";
import logo from "../../assets/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg";
export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Link to={ROUTES.HOME} className="navbar__logo">
          <img src={logo} alt="logo" />
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
            to="/categories"
            className={({ isActive }) =>
              "nav__link" + (isActive ? " is-active" : "")
            }
          >
            Categories
          </NavLink>
          <NavLink
            to="/wishlist"
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
