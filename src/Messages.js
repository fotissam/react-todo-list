import React, { useState } from "react";
import "./Messages.css";

function Messages({ message }) {
  const [visible, setVisible] = useState(true);

  function handleCloseButton() {
    setVisible(false);
  }

  const messages = {
    success: "Success Message",
    warning: "Warning",
    nodata: "No data on inputs, please try again",
  };

  return (
    <div
      className={`message-container ${message}`}
      style={{ display: visible ? "block" : "none" }}
    >
      <span
        id="messageClose"
        className="close-button"
        onClick={handleCloseButton}
      >
        ✖️
      </span>
      <p>{messages[message]}</p>
    </div>
  );
}

export default Messages;
