import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [shouldFocus, setShouldFocus] = useState(false);
  const toDoList = [];

  const navigate = useNavigate();

  useEffect(() => {
    if (shouldFocus) {
      const usernameInput = document.getElementById("username");
      if (usernameInput) {
        usernameInput.focus();
      }
      setShouldFocus(false);
    }
  }, [shouldFocus]);

  const handleRegister = (e) => {
    e.preventDefault();

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    // if the username exists
    const userExists = existingUsers.some((user) => user.username === username);

    if (userExists) {
      alert("The username is existing. Please choose another");
      setUsername("");
      setPassword("");
      setShouldFocus(true);
    } else {
      const newUser = { username, password, toDoList };
      existingUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(existingUsers));
      alert("Registration successful!");
      navigate("/login");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Username: </label>
          <input
            type="text"
            // id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
