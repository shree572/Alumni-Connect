import React, { useEffect, useState, useMemo } from "react";
import API from "../utils/api";
import FundRequestManager from "../components/FundRequestManager";
import AdminDashboard from "../components/AdminDashboard";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import ChatWidget from "../components/ChatWidget"

export default function Home({ user }) {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalEvents: 0,
    totalDonations: 0,
  });
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("events");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const [{ data: ev }, { data: us }] = await Promise.all([
          API.get("/events"),
          API.get("/alumni"),
        ]);
        setEvents(ev);
        setUsers(us.filter((u) => u._id !== user?._id));
        setLoading(false);
      } catch (e) {
        setLoading(true);
      }
    })();
  }, [user]);

  const filteredEvents = useMemo(() => {
    const q = query.toLowerCase();
    return events.filter(
      (e) =>
        (e.title || "").toLowerCase().includes(q) ||
        (e.location || "").toLowerCase().includes(q)
    );
  }, [events, query]);

  const filteredUsers = useMemo(() => {
    const q = query.toLowerCase();
    return users.filter(
      (u) =>
        (u.name || "").toLowerCase().includes(q) ||
        (u.currentJob || "").toLowerCase().includes(q) ||
        (Array.isArray(u.education) &&
          u.education.join(" ").toLowerCase().includes(q))
    );
  }, [users, query]);

  const loadStats = async () => {
    try {
      const [usersRes, eventsRes, donationsRes] = await Promise.all([
        API.get("/alumni"),
        API.get("/events"),
        API.get("/donation/donations"),
      ]);
      setStats({
        totalUsers: usersRes.data.length,
        totalEvents: eventsRes.data.length,
        totalDonations: donationsRes.data.reduce((sum, d) => sum + d.amount, 0),
      });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
  <>
  <div className="max-w-6xl mx-auto space-y-6">
    {/* Search + Tabs */}
    <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col sm:flex-row sm:items-center gap-3 border border-gray-100">
      <input
        className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
        placeholder="Search events by name/location or users by name/college/course/job"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="flex gap-2">
        <Button
          variant={tab === "events" ? "default" : "outline"}
          className={`px-5 py-2 rounded-xl transition ${
            tab === "events"
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "hover:bg-gray-100"
          }`}
          onClick={() => setTab("events")}
        >
          Events
        </Button>
        <Button
          variant={tab === "users" ? "default" : "outline"}
          className={`px-5 py-2 rounded-xl transition ${
            tab === "users"
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "hover:bg-gray-100"
          }`}
          onClick={() => setTab("users")}
        >
          Users
        </Button>
      </div>
    </div>

    {/* Events */}
    {tab === "events" ? (
      <div className="bg-white rounded-2xl shadow-md p-6 space-y-4 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          📅 All Events
        </h3>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : filteredEvents.length === 0 ? (
          <p className="text-gray-500 text-sm">No events to display</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {filteredEvents.map((ev) => (
              <div
                key={ev._id}
                className="border border-gray-100 rounded-xl p-5 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition bg-gradient-to-br from-gray-50 to-white"
                onClick={() => navigate(`/events/${ev._id}`)}
              >
                <h4 className="font-semibold text-gray-800">
                  {ev.title}{" "}
                  <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                    {ev.category}
                  </span>
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  {new Date(ev.date).toLocaleString()} • {ev.location}
                </p>
                {ev.description && (
                  <p className="mt-2 text-sm text-gray-700 line-clamp-2">
                    {ev.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    ) : (
      /* Users */
      <div className="bg-white rounded-2xl shadow-md p-6 space-y-4 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          👥 Users
        </h3>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : filteredUsers.length === 0 ? (
          <p className="text-gray-500 text-sm">No users to display</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            {filteredUsers.map((u) => (
              <div
                key={u._id}
                className="border border-gray-100 rounded-xl p-4 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition bg-gradient-to-br from-gray-50 to-white"
                onClick={() => navigate(`/users/${u._id}`)}
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-gray-800">
                    {u.name}{" "}
                    <span
                      className={`ml-2 text-xs px-2 py-0.5 rounded-full capitalize ${
                        u.role === "admin"
                          ? "bg-red-100 text-red-700"
                          : u.role === "alumni"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {u.role}
                    </span>
                  </p>
                  <Button
                    variant="outline"
                    className="text-sm px-3 py-1 rounded-lg hover:bg-gray-100 transition"
                    onClick={async (e) => {
                      e.stopPropagation();
                      try {
                        await API.post(`/alumni/${u._id}/follow`);
                        setUsers((prev) =>
                          prev.map((x) =>
                            x._id === u._id
                              ? {
                                  ...x,
                                  followers: (x.followers || []).some(
                                    (id) => id === user?._id
                                  )
                                    ? (x.followers || []).filter(
                                        (id) => id !== user?._id
                                      )
                                    : [...(x.followers || []), user?._id],
                                }
                              : x
                          )
                        );
                      } catch {}
                    }}
                  >
                    {(u.followers || []).some((id) => id === user?._id)
                      ? "Unfollow"
                      : "Follow"}
                  </Button>
                </div>
                <p className="text-sm text-gray-600 mt-1">{u.email}</p>
                {u.currentJob && (
                  <p className="text-sm text-gray-700">{u.currentJob}</p>
                )}
                {Array.isArray(u.education) && u.education.length > 0 && (
                  <p className="text-xs text-gray-500">{u.education[0]}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    )}
  </div>

  {/* Stats Section */}
  <div className="max-w-6xl mx-auto space-y-6 mt-8">
    <div className="grid md:grid-cols-3 gap-6">
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition">
        <h3 className="text-3xl font-bold text-blue-700">
          {stats.totalUsers}
        </h3>
        <p className="text-gray-600">Total Users</p>
      </div>
      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition">
        <h3 className="text-3xl font-bold text-green-700">
          {stats.totalEvents}
        </h3>
        <p className="text-gray-600">Total Events</p>
      </div>
      <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition">
        <h3 className="text-3xl font-bold text-purple-700">
          ₹{stats.totalDonations}
        </h3>
        <p className="text-gray-600">Total Donations</p>
      </div>
    </div>

    {user?.role === "alumni" && <FundRequestManager user={user} />}
    {user?.role === "admin" && <AdminDashboard user={user} />}
  </div>

  <ChatWidget/>
</>

  );
}
