import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  NavLink,
  Link,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landing";
import Navigation from "./components/Navigation";
import { Toaster } from "./components/ui/toaster";
import { Toaster as SonnerToaster } from "./components/ui/sonner";
import Chat from "./components/Chat";
import VideoCall from "./components/VideoCall";
import ResumeUpload from "./components/ResumeUpload";
import UsersList from "./components/UsersList";
import Profile from "./pages/Profile";
import UserProfile from "./pages/UserProfile";
import Events from "./pages/Events";
import Notifications from "./pages/Notifications";
import Learnmore from "./pages/Learnmore";
import Home from "./pages/Home";
import EventDetails from "./pages/EventDetails";
import Guidance from "./pages/Guidance";
import Fundraising from "./pages/Fundraising";
import { Button } from "./components/ui/button";

function App() {
  const [user, setUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setSelectedUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <BrowserRouter>
        {!user ? (
          <div className="w-full mx-auto">
            <Toaster />
            <SonnerToaster />
            <Navigation />
            <Routes>
              <Route path="/login" element={<Login setUser={setUser} />} />
              <Route path="/register" element={<Register />} />
              {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
              <Route path="/learnmore" element={<Learnmore />} />
              <Route path="*" element={<Landing />} />
            </Routes>
          </div>
        ) : (
          <>
            {/* <nav className="h-full bg-white border-b shadow-sm px-6 py-3 flex justify-between items-center">
              <div className="flex gap-4">
                <span className="font-semibold">
                  Hello, {user.name}{" "}
                  <span className="ml-2 text-xs px-2 py-0.5 rounded-full capitalize bg-gray-100 text-gray-700">
                    {user.role}
                  </span>
                </span>
                <Link to="/" className="text-blue-600">
                  Home
                </Link>
                {user.role !== "admin" && (
                  <>
                    <Link to="/profile" className="text-blue-600">
                      Profile
                    </Link>
                  </>
                )}
                {user.role === "admin" && (
                  <>
                    <Link to="/Udirectory" className="text-blue-600">
                      Users-Directory
                    </Link>
                  </>
                )}
                <Link to="/chat" className="text-blue-600">
                  Chat
                </Link>
                <Link to="/video" className="text-blue-600">
                  Video
                </Link>
                <Link to="/events" className="text-blue-600">
                  Events
                </Link>
                {user?.role !== "admin" && (
                  <>
                    <Link to="/notification" className="text-blue-600">
                      Notifications
                    </Link>
                    <Link to="/guidance" className="text-blue-600">
                      Guidance
                    </Link>
                  </>
                )}
                <Link to="/fundraising" className="text-blue-600">
                  Fundraising
                </Link>
              </div>
              <Button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Logout
              </Button>
            </nav> */}
            <nav className="h-full bg-white border-b shadow-sm px-6 py-3 flex justify-between items-center">
              {/* Left Side */}
              <div className="flex items-center gap-6">
                {/* Greeting */}
                <span className="font-semibold text-gray-800 text-lg">
                  Hello, {user?.name}
                </span>
                <span
                  className={`ml-1 text-xs px-3 py-1 rounded-full capitalize font-medium ${
                    user?.role === "admin"
                      ? "bg-red-100 text-red-700"
                      : user?.role === "alumni"
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {user?.role}
                </span>

                {/* Navigation Links */}
                <div className="flex gap-2">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : "text-blue-600 hover:bg-blue-50"
                      }`
                    }
                  >
                    Home
                  </NavLink>

                  {user.role !== "admin" && (
                    <NavLink
                      to="/profile"
                      className={({ isActive }) =>
                        `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-blue-600 text-white"
                            : "text-blue-600 hover:bg-blue-50"
                        }`
                      }
                    >
                      Profile
                    </NavLink>
                  )}

                  {user.role === "admin" && (
                    <NavLink
                      to="/Udirectory"
                      className={({ isActive }) =>
                        `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-blue-600 text-white"
                            : "text-blue-600 hover:bg-blue-50"
                        }`
                      }
                    >
                      Users-Directory
                    </NavLink>
                  )}

                  <NavLink
                    to="/chat"
                    className={({ isActive }) =>
                      `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : "text-blue-600 hover:bg-blue-50"
                      }`
                    }
                  >
                    Chat
                  </NavLink>

                  <NavLink
                    to="/video"
                    className={({ isActive }) =>
                      `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : "text-blue-600 hover:bg-blue-50"
                      }`
                    }
                  >
                    Video
                  </NavLink>

                  <NavLink
                    to="/events"
                    className={({ isActive }) =>
                      `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : "text-blue-600 hover:bg-blue-50"
                      }`
                    }
                  >
                    Events
                  </NavLink>

                  {user?.role !== "admin" && (
                    <>
                      <NavLink
                        to="/notification"
                        className={({ isActive }) =>
                          `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                            isActive
                              ? "bg-blue-600 text-white"
                              : "text-blue-600 hover:bg-blue-50"
                          }`
                        }
                      >
                        Notifications
                      </NavLink>

                      <NavLink
                        to="/guidance"
                        className={({ isActive }) =>
                          `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                            isActive
                              ? "bg-blue-600 text-white"
                              : "text-blue-600 hover:bg-blue-50"
                          }`
                        }
                      >
                        Guidance
                      </NavLink>
                    </>
                  )}

                  <NavLink
                    to="/fundraising"
                    className={({ isActive }) =>
                      `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : "text-blue-600 hover:bg-blue-50"
                      }`
                    }
                  >
                    Fundraising
                  </NavLink>
                </div>
              </div>

              {/* Logout */}
              <Button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow"
              >
                Logout
              </Button>
            </nav>

            <div className="p-6 space-y-6">
              <Routes>
                <Route path="/" element={<Home user={user} />} />
                {user.role !== "admin" && (
                  <Route
                    path="/profile"
                    element={
                      <Profile
                        user={user}
                        selectedUser={selectedUser}
                        onSelectUser={setSelectedUser}
                        onLogout={handleLogout}
                      />
                    }
                  />
                )}
                <Route
                  path="/chat"
                  element={
                    <>
                      <UsersList
                        currentUser={user}
                        onSelect={setSelectedUser}
                        selectedUser={selectedUser}
                      />
                      <Chat user={user} otherUser={selectedUser} />
                    </>
                  }
                />
                <Route
                  path="/video"
                  element={
                    <>
                      <UsersList
                        currentUser={user}
                        onSelect={setSelectedUser}
                        selectedUser={selectedUser}
                      />
                      <VideoCall user={user} otherUser={selectedUser} />
                    </>
                  }
                />
                <Route path="/users/:id" element={<UserProfile />} />
                <Route path="/events" element={<Events user={user} />} />
                <Route path="/events/:id" element={<EventDetails />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/guidance" element={<Guidance user={user} />} />
                <Route path="/Udirectory" element={<UsersList />} />
                <Route path="/notification" element={<Notifications />} />
                <Route path="/learnmore" element={<Learnmore />} />

                <Route
                  path="/fundraising"
                  element={<Fundraising user={user} />}
                />
                {/* Redirect all unknown routes to home */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
