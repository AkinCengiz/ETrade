import React, { useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  }

  useEffect(() => {
    if(!localStorage.getItem("token")){
      navigate("/login");
    }
  });
  
  return (
    <div>
      <nav
        className="navbar navbar-expand-md bg-dark border-bottom border-body"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <Link className="navbar-brand nav-link" to="/">E-Trade</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item text-light mx-2">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item mx-2">
              <Link className="nav-link" to="/products">Products</Link>
              </li>
              <li className="nav-item mx-2">
              <Link className="nav-link" to="/order">Order</Link>
              </li>
              <li className="nav-item mx-2">
              <Link className="nav-link" to="/cart">Cart</Link>
              </li>
            </ul>
            <button onClick={logout}  className="btn btn-outline-success" type="submit">
              Logout
            </button>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}
