import { useState } from "react";
import { GrClose } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import axios from "axios";

import { toast } from "react-toastify";

function LoginModal(props, user) {
  const { setUser, setIsLoggedIn } = useContext(UserContext);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  if (!props.show) {
    return null;
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  // add localhost for it  to work in development http://localhost:5000
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:5000/api/users/login`,
        {
          email: email,
          password: password,
        }
      );

      if (response.status === 401) {
        toast.error("Invalid username or password");
      } else {
        console.log(user);

        localStorage.setItem("user", JSON.stringify(response.data));

        setUser(response.data);
        setIsLoggedIn(true);
        toast.success("You are now logged in");
        setFormData("");
        navigate("/profile");
      }
    } catch (error) {
      toast.error("Login failed");
    }
  };

  return (
    <div className="modal">
      <button onClick={props.onClose} className="close-btn">
        <GrClose />
      </button>
      <section className="header">
        <h1> Login </h1>
        <h2>Please enter you username and password</h2>
      </section>

      <form className="form" onSubmit={submitHandler}>
        <input
          className="email-input"
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={onChange}
          required
        />
        <input
          className="password-input"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={onChange}
          required
        />

        <div className="btn-container">
          <button className="primary-button">Login</button>
        </div>
      </form>
    </div>
  );
}
export default LoginModal;
