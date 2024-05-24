import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Home from "./Home";
import ViewUsers from "./ViewUsers";
import PrivateRoute from "./PrivateRoute";
import "./App.css";

const users = JSON.parse(localStorage.getItem("users")) || [];
console.log(users);

function Header() {
  return (
    <header className="header">
      <p>Your app!</p>
    </header>
  );
}

function App() {
  return (
    <div className="App col-12 col-md-9 mx-auto">
      <Link to="/users">View Users</Link>
      <DeleteLocalStorage />
      {users ? <Header /> : ""}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/users" element={<ViewUsers />} />
      </Routes>
    </div>
  );
}

export default App;

function DeleteLocalStorage() {
  const navigate = useNavigate();

  function handleDeleteStorage(e) {
    e.preventDefault();
    window.localStorage.clear();
    alert("Όλοι οι χρήστες διεγράφηκαν");

    navigate("/login");
  }

  return (
    <a href="/login" onClick={handleDeleteStorage}>
      Delete Users
    </a>
  );
}
