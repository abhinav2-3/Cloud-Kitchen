import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Modal from "../screens/Modal";
import Cart from "../screens/Cart";
import { useCart } from "./ContextReducer";

const Navbar = () => {
  const data = useCart();
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();
  const auth = localStorage.getItem("authToken");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/signup");
  };
  return (
    <nav className="navbar navbar-expand-lg bg-danger">
      <div className="container-fluid">
        <Link
          className="navbar-brand text-white fs-2 font-weight-bold"
          to={"/"}
        >
          Food Hut.
        </Link>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav me-auto text-white">
            <Link
              to={"/"}
              className="nav-link active text-white font-weight-bold"
              aria-current="page"
            >
              Home
            </Link>

            {auth ? (
              <Link
                to={"myorder"}
                className="nav-link active text-white font-weight-bold disabled"
                aria-current="page"
              >
                My Orders
              </Link>
            ) : (
              ""
            )}
          </div>

          {!auth ? (
            <div className="d-flex justify-content-end">
              <Link to={"/login"} className="btn bg-white text-danger mx-2">
                Login
              </Link>
              <Link to={"/signup"} className="btn bg-white text-danger mx-2">
                SignUp
              </Link>
            </div>
          ) : (
            <div>
              <div
                className="btn bg-white text-danger mx-2"
                onClick={() => setCartView(true)}
              >
                Cart{"  "}
                <Badge pill bg="danger">
                  {data.length === 0 ? "" : data.length}
                </Badge>
              </div>
              {cartView ? (
                <Modal onClose={() => setCartView(false)}>
                  <Cart />
                </Modal>
              ) : null}
              <Link
                to={"/signup"}
                className="btn bg-white text-danger mx-2"
                onClick={handleLogout}
              >
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
