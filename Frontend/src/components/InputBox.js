import React, { useState } from "react";
import "../styles/InputBox.css";

function InputBox({ onSend, disabled }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input);
      setInput("");
    }
  };

  return (
    <div className="input-box">
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Type your message..."
        disabled={disabled}
      />
      <button onClick={handleSend} disabled={disabled}>
        {disabled ? "Sending..." : "Send"}
      </button>
    </div>
  );
}

export default InputBox;