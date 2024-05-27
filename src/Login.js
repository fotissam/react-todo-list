import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    const user = storedUsers.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      alert("Login successful!");
      localStorage.setItem("loggedInUser", username); // Store the logged-in user's username
      navigate("/home");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <>
      <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="py-5 form-group">
            <div>
              <label>Username: </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Password: </label>
              <input
                className="form-control"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="btn btn-outline-success" type="submit">
              Login
            </button>
            <Link to="/register" style={{ marginLeft: "10px" }}>
              <button className="btn btn-info" type="button">
                Register
              </button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
