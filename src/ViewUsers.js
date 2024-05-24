import React from "react";
import Messages from "./Messages";
function ViewUsers() {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  return (
    <div>
      <h2>Registered Users</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.username}</li>
        ))}
      </ul>
      <Messages message="success" />
    </div>
  );
}

export default ViewUsers;
