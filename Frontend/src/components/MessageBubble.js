import React from "react";
import "../styles/MessageBubble.css";

function MessageBubble({ message }) {
  return (
    <div className={`message-bubble ${message.sender}`}>
      <span>{message.text}</span>
    </div>
  );
}

export default MessageBubble;