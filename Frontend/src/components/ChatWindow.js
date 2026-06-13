import React from "react";
import MessageBubble from "./MessageBubble";
import "./../styles/ChatWindow.css";

function ChatWindow({ messages }) {
  return (
    <div className="chat-window">
      {messages.map((msg, idx) => (
        <MessageBubble key={idx} message={msg} />
      ))}
    </div>
  );
}

export default ChatWindow;