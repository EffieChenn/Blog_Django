import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthRequired from "./auth/AuthRequired";

const Navbar = () => {
  let { user, logoutUser, authTokens } = useContext(AuthRequired);

  const isAuthenticated = () => {
    if (!authTokens) {
      window.alert("請先登入！");
      window.location.href = "/login";
    } else {
      window.location.href = "/blog/add";
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to={"/blog"}>
          BlogBlog
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav d-flex">
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to={"/"}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={"/blog"}>
                Posts
              </NavLink>
            </li>
            <li className="nav-item">
              <Link className="nav-link" onClick={isAuthenticated}>
                Add Post
              </Link>
            </li>
            {user ? (
              <li className="nav-item ms-auto">
                <Link className="nav-link" onClick={logoutUser}>
                  Logout
                </Link>
              </li>
            ) : (
              <li className="nav-item ms-auto">
                <NavLink className="nav-link" to={"/login"}>
                  Login
                </NavLink>
              </li>
            )}
            {user && (
              <li className="nav-item ms-auto">
                <p className="nav-link">Hello, {user.username}</p>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
