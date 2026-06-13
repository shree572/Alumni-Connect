import React, { useEffect, useState } from "react";
import API from "../utils/api";

export default function Notifications() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/notification/notification");
      setItems(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const markRead = async (id) => {
    try {
      await API.put(`/notification/${id}/read`);
      setItems((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
    } catch {}
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-6">
      <h2 className="text-2xl font-bold mb-3">Notifications</h2>
      {loading ? (
        <div>
          <p>Loading...</p>
          <h1>Hello</h1>
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-xl border border-dashed">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-gray-400 mb-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"	
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75h.008v.008H9.75V9.75zm0 4.5h.008v.008H9.75v-.008zM12 3v1.5M12 19.5V21M4.5 12H3m18 0h-1.5M6.364 6.364l-1.06-1.06M18.364 18.364l-1.06-1.06M18.364 6.364l1.06-1.06M6.364 18.364l-1.06-1.06"
            />
          </svg>
          <p className="text-gray-600 text-lg font-medium">
            No New Notifications found
          </p>
          <p className="text-sm text-gray-400">Try checking back later..</p>
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((n) => (
            <div
              key={n._id}
              className={`border rounded-xl p-3 ${n.read ? "opacity-70" : ""}`}
            >
              <p>{n.message}</p>
              <div className="text-xs text-gray-500">
                {new Date(n.createdAt).toLocaleString()}
              </div>
              {!n.read && (
                <button
                  className="text-blue-600 text-sm"
                  onClick={() => markRead(n._id)}
                >
                  Mark as read
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
