import { useState } from "react";
import API from "../utils/api";
import { motion, AnimatePresence } from "framer-motion"; // 👈 for animations
import ChatWindow from "../components/ChatWindow"
import InputBox from "../components/InputBox"
function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi 👋 I'm the Alma Connect Assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);

    try {
      const res = await API.post("/chatbot/chhat", { message: input });
      setMessages([
        ...newMessages,
        { sender: "bot", text: res.data.reply || "No response 🤖" },
      ]);
    } catch (error) {
      setMessages([
        ...newMessages,
        { sender: "bot", text: "⚠️ Sorry, I couldn’t connect to the server." },
      ]);
    }

    setInput("");
  };

  return (
    <div>
      {/* Floating Toggle Button */}
      <button
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "✖" : "💬"}
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-20 right-6 w-80 bg-white rounded-xl shadow-2xl border flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 font-semibold shadow-md">
              Alma Connect Assistant
            </div>

            {/* Messages */}
            <div className="flex-1 p-3 overflow-y-auto max-h-96 space-y-3">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex items-end ${
                    m.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {m.sender === "bot" && (
                    <div className="w-8 h-8 bg-blue-500 text-white flex items-center justify-center rounded-full mr-2 text-sm">
                      🤖
                    </div>
                  )}
                  <div
                    className={`px-3 py-2 rounded-2xl max-w-[70%] text-sm shadow-sm ${
                      m.sender === "user"
                        ? "bg-blue-500 text-white rounded-br-none"
                        : "bg-gray-100 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    {m.text}
                  </div>
                  {m.sender === "user" && (
                    <div className="w-8 h-8 bg-indigo-500 text-white flex items-center justify-center rounded-full ml-2 text-sm">
                      👤
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="flex border-t bg-gray-50 p-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 p-2 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                placeholder="Type a message..."
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                onClick={sendMessage}
                className="ml-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    


    //     <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10">
    //   {/* Floating Chat Widget Only */}
    //   <FloatingChatWidget 
    //     onSendMessage={handleSendMessage}
    //     onQuickReply={handleQuickReply}
    //     position="bottom-right"
    //   />
    // </div>
  );
}

export default ChatWidget;

