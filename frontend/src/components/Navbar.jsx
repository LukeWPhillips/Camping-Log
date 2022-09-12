import React from "react";
import Logo from "../assets/jpg/mountain2.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/UserContext";

function Navbar() {
  const { setUser, isLoggedIn, setIsLoggedIn } = useContext(UserContext);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    window.localStorage.removeItem("isLoggedIn");
    setUser(null);
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="nav-container">
      <div className="logo-container">
        <img src={Logo} alt="logo" id="logo" />
        <h1 className="logo-name">Camping Log</h1>
      </div>
      <div className="menu-container">
        <Link style={{ textDecoration: "none", color: "white" }} to="/">
          <p id="item" className="menu-item">
            Home
          </p>
        </Link>
        <Link style={{ textDecoration: "none", color: "white" }} to="/profile">
          <p id="item" className="menu-item">
            Campsites
          </p>
        </Link>
        {isLoggedIn === true && (
          <p onClick={logout} id="item" className="menu-item">
            Logout
          </p>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
