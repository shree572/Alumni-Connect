import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { Button } from "./ui/button";

const socket = io(process.env.REACT_APP_SOCKET_URL || "http://localhost:3000");

export default function Chat({ user, otherUser }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    if (user?._id && otherUser?._id) {
      socket.emit("joinRoom", { userId: user._id, otherId: otherUser._id });
    }

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [user, otherUser]);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user?._id || !otherUser?._id) return;
      try {
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL || "http://localhost:3000/api"}/chat/${user._id}/${otherUser._id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token") || ""}` }
        });
        const data = await res.json();
        setMessages(Array.isArray(data) ? data : []);
      } catch (e) {
        // ignore
      }
    };
    fetchHistory();
  }, [user, otherUser]);

  const sendMessage = () => {
    if (!text.trim()) return;
    if (!otherUser?._id) return;
    const msg = { sender: user._id, receiver: otherUser._id, text };
    socket.emit("sendMessage", msg);
    setText("");
  };

  return (
    <>
    

<div className="max-w-5xl mx-auto mt-8 bg-white rounded-2xl shadow-lg overflow-hidden flex h-[600px]">
  {/* Sidebar (just a placeholder, not using users) */}
  <div className="w-1/3 border-r bg-gray-100 p-4">
    <h3 className="text-lg font-bold mb-4">Chats</h3>
    <div className="space-y-2">
      <div className="p-3 bg-white rounded-xl shadow cursor-pointer">
        Default Chat
      </div>
    </div>
  </div>

  {/* Chat Section */}
  <div className="flex-1 flex flex-col">
    {/* Chat header */}
    <div className="p-4 border-b flex items-center justify-between">
      <h3 className="text-lg font-semibold">Chat</h3>
    </div>

    {/* Messages */}
    <div className="flex-1 overflow-y-scroll p-4 space-y-3">
      {messages.map((m, i) => (
        <div
          key={i}
          className={`p-2 rounded-xl max-w-xs ${
            (m.sender || m.senderId) === user._id
              ? "bg-blue-500 text-white ml-auto"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          {m.text}
        </div>
      ))}
    </div>

    {/* Input */}
    <div className="p-3 border-t flex gap-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <Button onClick={sendMessage}>Send</Button>
    </div>
  </div>
</div>    
</>
  );
}



// import { useEffect, useState } from "react";
// import { Button } from "../components/ui/button";
// import API from "../utils/api"; // adjust import path based on your setup

// export default function Chat({ user }) {
//   const [users, setUsers] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [text, setText] = useState("");

//   // Fetch users from API
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const { data } = await API.get("/alumni"); // your API endpoint for users
//         setUsers(data);
//       } catch (err) {
//         console.error("Error fetching users:", err);
//       }
//     };
//     fetchUsers();
//   }, []);

//   const sendMessage = async () => {
//     if (!text.trim()) return;
//     const newMsg = { text, senderId: user._id };
//     setMessages([...messages, newMsg]); // optimistic UI
//     setText("");
//     // TODO: call API to actually send message
//   };

//   return (
//     <div className="max-w-5xl mx-auto mt-8 bg-gray-100 rounded-2xl shadow-lg overflow-hidden flex h-[600px] gap-4 p-4">
//       {/* Users Section */}
//       <div className="w-1/3 bg-white rounded-2xl shadow-md p-4 overflow-y-auto">
//         <h3 className="text-lg font-bold mb-4">Users</h3>
//         <div className="space-y-4">
//           {users.length === 0 ? (
//             <p className="text-gray-500 text-sm">No users found</p>
//           ) : (
//             users.map((u) => (
//               <div
//                 key={u._id}
//                 className="p-4 border rounded-xl flex items-center justify-between hover:bg-gray-50"
//               >
//                 <div>
//                   <p className="font-semibold">{u.name}</p>
//                   <p className="text-sm text-gray-500">{u.email}</p>
//                 </div>
//                 <button className="px-3 py-1 text-sm rounded-lg border hover:bg-gray-200">
//                   Follow
//                 </button>
//               </div>
//             ))
//           )}
//         </div>
//       </div>

//       {/* Chats Section */}
//       <div className="flex-1 bg-white rounded-2xl shadow-md flex flex-col">
//         {/* Chat Header */}
//         <div className="p-4 border-b">
//           <h3 className="text-lg font-bold">Chat</h3>
//         </div>

//         {/* Messages */}
//         <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
//           {messages.map((m, i) => (
//             <div
//               key={i}
//               className={`p-2 rounded-xl max-w-xs ${
//                 (m.sender || m.senderId) === user._id
//                   ? "bg-blue-500 text-white ml-auto"
//                   : "bg-gray-200 text-gray-800"
//               }`}
//             >
//               {m.text}
//             </div>
//           ))}
//         </div>

//         {/* Input */}
//         <div className="p-3 border-t flex gap-2 bg-white">
//           <input
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             placeholder="Type a message..."
//             className="flex-1 px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <Button onClick={sendMessage}>Send</Button>
//         </div>
//      </div>
//     </div>
//   );
// }

