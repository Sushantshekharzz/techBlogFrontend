import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import InvalidCredential from "./InvalidCredential";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import "./login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      userName: username,
      password: password,
    };
    try {
      const response = await axios.post(`http://localhost:3001/login/`, data);
      if (response.data.message === "invalid password") {
        setModalIsOpen(true);
      } else if (response.data.message === "Sucessfully Login") {
        const userName = response.data.user.username;
        window.location.href = `/Addblog?userName=${userName}`;
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="">
      <Navbar />
      <div className="login-container">
        <h2 className="login-title">LOGIN</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">USERNAME</label>
            <input
              type="text"
              id="username"
              className="login-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">PASSWORD</label>
            <input
              type="password"
              id="password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            LOGIN
          </button>
          <p>
            Not have an account?{" "}
            <Link to="/SignUp" className="signup-link">
              SIGN UP
            </Link>
          </p>
          <InvalidCredential isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} />
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
