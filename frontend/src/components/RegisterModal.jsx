import { useState } from "react";
import { GrClose } from "react-icons/gr";
import { toast } from "react-toastify";

import { useContext } from "react";
import UserContext from "../context/UserContext";

function RegisterModal(props) {
  const { setUser, setIsLoggedIn } = useContext(UserContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  if (!props.show) {
    return null;
  }

  const { name, email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`api/users`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 400) {
        return toast.error("User already exists");
      } else {
        localStorage.setItem("user", JSON.stringify(formData));
        setUser(res.data);
        setIsLoggedIn(true);
        setFormData("");

        toast.success("You are now registered, please log in to continue");
      }
    } catch (error) {
      toast.error("Registration failed");
    }
  };

  return (
    <div className="modal">
      <button onClick={props.onClose} className="close-btn">
        <GrClose />
      </button>
      <section className="header">
        <h1> Register</h1>
        <h2>Please create an account</h2>
      </section>

      <form className="form" onSubmit={submitHandler}>
        <input
          className="name-input"
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={onChange}
          placeholder="Enter your name"
          required
        />
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
          value={password}
          onChange={onChange}
          placeholder="Enter your password"
          required
        />

        <div className="btn-container">
          <button className="primary-button">Register</button>
        </div>
      </form>
    </div>
  );
}

export default RegisterModal;
