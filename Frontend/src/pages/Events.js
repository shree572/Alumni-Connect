import React, { useEffect, useState } from "react";
import API from "../utils/api";
import { Button } from "../components/ui/button";

export default function Events({ user }) {
	const [events, setEvents] = useState([]);
	const [loading, setLoading] = useState(false);
	const [creating, setCreating] = useState(false);
	const [form, setForm] = useState({ title: "", description: "", category: "Hackathon", date: "", location: "" });

	const canCreate = user?.role === "admin" || user?.role === "alumni";

	const load = async () => {
		try {
			setLoading(true);
			const { data } = await API.get("/events");
			setEvents(data);
		} catch (e) {
			console.error(e);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => { load(); }, []);

	const createEvent = async (e) => {
		e.preventDefault();
		try {
			setCreating(true);
			await API.post("/events", { ...form });
			setForm({ title: "", description: "", category: "Hackathon", date: "", location: "" });
			await load();
		} catch (e) {
			alert("Failed to create event");
		} finally {
			setCreating(false);
		}
	};

	const register = async (id) => {
		try {
			await API.post(`/events/${id}/register`);
			await load();
		} catch (e) {
			alert("Failed to register for event");
		}
	};

	return (
		<div className="max-w-5xl mx-auto space-y-6">
			<div className="bg-white rounded-2xl shadow p-6">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-2xl font-bold">Events</h2>
				</div>
				{/* {canCreate && (
					<form onSubmit={createEvent} className="grid md:grid-cols-2 gap-3 mb-4">
						<input className="px-4 py-2 border rounded-xl" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
						<select className="px-4 py-2 border rounded-xl" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
							<option>Hackathon</option>
							<option>Seminar</option>
							<option>TED Talk</option>
							<option>Workshop</option>
							<option>Other</option>
						</select>
						<input className="px-4 py-2 border rounded-xl" type="datetime-local" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
						<input className="px-4 py-2 border rounded-xl" placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
						<textarea className="md:col-span-2 px-4 py-2 border rounded-xl" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
						<Button type="submit" disabled={creating} className="md:col-span-2">{creating ? "Creating..." : "Create Event"}</Button>
					</form>
				)} */}

				{canCreate && (
  <form
    onSubmit={createEvent}
    className="grid md:grid-cols-2 gap-4 mb-6 p-6 bg-white shadow-lg rounded-2xl border"
  >
    <h2 className="md:col-span-2 text-xl font-bold text-gray-800 mb-2">
      Create a New Event
    </h2>

    <input
      className="px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
      placeholder="Title"
      value={form.title}
      onChange={(e) => setForm({ ...form, title: e.target.value })}
      required
    />

    <select
      className="px-4 py-2 border rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
      value={form.category}
      onChange={(e) => setForm({ ...form, category: e.target.value })}
    >
      <option>Hackathon</option>
      <option>Seminar</option>
      <option>TED Talk</option>
      <option>Workshop</option>
      <option>Other</option>
    </select>

    <input
      className="px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
      type="datetime-local"
      value={form.date}
      onChange={(e) => setForm({ ...form, date: e.target.value })}
      required
    />

    <input
      className="px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
      placeholder="Location"
      value={form.location}
      onChange={(e) => setForm({ ...form, location: e.target.value })}
    />

    <textarea
      className="md:col-span-2 px-4 py-2 border rounded-xl h-28 resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
      placeholder="Description"
      value={form.description}
      onChange={(e) => setForm({ ...form, description: e.target.value })}
    />

    <Button
      type="submit"
      disabled={creating}
      className="md:col-span-2 w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 rounded-xl shadow hover:opacity-90 transition disabled:opacity-60"
    >
      {creating ? "Creating..." : "Create Event"}
    </Button>
  </form>
)}

				
				{loading ? (
  <p>Loading...</p>
) : events.length === 0 ? (
  <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
    <svg
      className="w-12 h-12 text-gray-400 mb-3"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    <p className="text-gray-600 font-medium">No events to show</p>
    <p className="text-gray-400 text-sm mt-1">Check back later for new events.</p>
  </div>
) : (
					<div className="space-y-3">
						{events.map(ev => (
							<div key={ev._id} className="border rounded-xl p-4">
								<div className="flex items-center justify-between">
									<div>
										<h3 className="font-semibold">{ev.title} <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-gray-100">{ev.category}</span></h3>
										<p className="text-sm text-gray-600">{new Date(ev.date).toLocaleString()} • {ev.location}</p>
									</div>
									<Button onClick={() => register(ev._id)} variant="outline">Register</Button>
								</div>
								{ev.description && <p className="mt-2">{ev.description}</p>}
								{Array.isArray(ev.attendees) && ev.attendees.length > 0 && (
									<p className="text-xs text-gray-500 mt-1">Attendees: {ev.attendees.length}</p>
								)}
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
