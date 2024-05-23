import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const getCookie = (name) => {
  const cookieValue = document.cookie.match(
    "(^|;)\\s*" + name + "\\s*=\\s*([^;]+)"
  );
  return cookieValue ? cookieValue.pop() : null;
};

const Register = () => {
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const csrftoken = getCookie("csrftoken");
    try {
      console.log("Registration data:", {
        first_name,
        last_name,
        username,
        email,
        password,
        confirm_password,
        verified: false,
      });
      console.log("CSRF Token:", csrftoken);
      const response = await axios.post(
        "http://localhost:8000/api/register/",
        {
          first_name,
          last_name,
          username,
          email,
          password,
          confirm_password,
        },
        {
          headers: {
            "X-CSRFToken": csrftoken,
          },
        }
      );

      if (response && response.data) {
        console.log("Registration successful:", response.data);
        setFirst_name("");
        setLast_name("");
        setUsername("");
        setEmail("");
        setPassword("");
        setError("");
        setConfirmPassword("");

        navigate('/email-confirm/:uid/:token');
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.log(csrftoken + "  testtest");
      console.error("Registration error:", error.response || error.message);
      console.error(
        "Registration error:",
        error.response?.data?.message || error.message
      );
      setError(error.response?.data?.message || error.message);
    }
  };

  return (

    <div className="container1">
      <div>
        <img src="./img/cloudy.png" alt="Cloud Icon3" className="cloud-icon3" />
        <img src="./img/cloudy.png" alt="Cloud Icon4" className="cloud-icon4" />
        <img src="./img/ship.png" alt="Ship Icon2" className="ship-icon2" />
        <img src="./img/sea.png" alt="Water Icon4" className="water-icon4" />
      </div>
      <div className="form-container1">
        <div className="register-title">
          <h1 className="heading">TaskVoyage</h1>
          <p className="sub-heading">Fill Out These Informations</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>First Name:</label>
            <input
              type="text"
              placeholder="First Name"
              value={first_name}
              onChange={(e) => setFirst_name(e.target.value)}
              required
            />
            <label>Last Name:</label>
            <input
              type="text"
              placeholder="Last Name"
              value={last_name}
              onChange={(e) => setLast_name(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Username:</label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Email:</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Confirm Password:</label>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirm_password}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <div className="Button-container1">
            <button type="submit">Register</button>
          </div>
        </form>
        <img src="./img/sea.png" alt="Water Icon5" className="water-icon5" />
      </div>
    </div>
  );
};

export default Register;
