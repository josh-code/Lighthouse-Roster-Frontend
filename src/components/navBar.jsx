import React from "react";
import { NavLink, Link } from "react-router-dom";

const NavBar = ({ user }) => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light"
      data-toggle="collapse"
      data-target=".navbar-collapse.show"
    >
      <Link className="navbar-brand" to="/">
        Lighthouse Roster
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo02"
        aria-controls="navbarTogglerDemo02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div
        className="collapse navbar-collapse"
        id="navbarTogglerDemo02"
        data-toggle="collapse"
        data-target=".navbar-collapse.show"
      >
        {/* <li ></li> */}
        {user && (
          <NavLink className="nav-item nav-link " to="/userDashboard">
            Dashboard
          </NavLink>
        )}
        {user
          ? user.isAdmin && (
              <React.Fragment>
                <NavLink className="nav-item nav-link " to="/admin">
                  Admin Dashboard
                </NavLink>
              </React.Fragment>
            )
          : ""}
        {!user && (
          <React.Fragment>
            <NavLink className="nav-item nav-link" to="/login">
              Login
            </NavLink>
            <NavLink className="nav-item nav-link" to="/register">
              Register
            </NavLink>
          </React.Fragment>
        )}
        {user && (
          <React.Fragment>
            {/* <NavLink className="nav-item nav-link" to="/profile">
              {user.name}
            </NavLink> */}
            <NavLink className="nav-item nav-link" to="/logout">
              Logout
            </NavLink>
          </React.Fragment>
        )}
        {/* <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item active">
            <a class="nav-link" href="#">
              Home <span class="sr-only">(current)</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              Link
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#">
              Disabled
            </a>
          </li>
        </ul> */}
      </div>
    </nav>
  );
};

export default NavBar;
