import React from "react";
import homeImage from "../assets/jpg/image2.jpg";
import RegisterModal from "../components/RegisterModal";
import LoginModal from "../components/LoginModal";
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";

function Home() {
  const [show, setShow] = useState(false);
  const [loginShow, setLoginShow] = useState(false);

  const { setUser, setIsLoggedIn } = useContext(UserContext);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
      setIsLoggedIn(true);
    }
  }, [setIsLoggedIn, setUser]);

  return (
    <div className="home-page">
      <header className="home-header">
        <h1>Camping Log</h1>
      </header>

      <div className="image-container">
        <img className="homeImage" src={homeImage} alt="homeImage" />
        <div className="btn-container">
          <button className="primary-button" onClick={() => setLoginShow(true)}>
            Login
          </button>

          <button className="primary-button" id="ex-btn">
            <Link
              style={{ color: "white", textdecoration: "none" }}
              to="/profile"
            >
              Explore
            </Link>
          </button>

          <button className="primary-button" onClick={() => setShow(true)}>
            Register
          </button>

          <LoginModal onClose={() => setLoginShow(false)} show={loginShow} />
          <RegisterModal onClose={() => setShow(false)} show={show} />
        </div>
      </div>
    </div>
  );
}

export default Home;
