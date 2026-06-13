import React from 'react'

import {
Users,
Handshake,
Globe,
GraduationCap
} from "lucide-react";

const Learnmore = () => {
  return (
   <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About Alumni Connect
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Alumni Connect is a smart platform that bridges the gap between
            alumni and current students, creating opportunities for mentorship,
            networking, and career growth.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <img
            src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=900&q=80"
            alt="Networking"
            className="rounded-2xl shadow-lg"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            What is Alumni Connect?
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Our project is designed to create a strong network between students
            and alumni. It allows students to seek guidance, explore career
            opportunities, and learn from real-world experiences. Alumni can
            share knowledge, give back to their institution, and stay connected
            with the community.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Whether you’re a student looking for career advice or an alumnus
            wanting to mentor, Alumni Connect is the go-to platform to foster
            meaningful connections.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-10">
            Key Features
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
              <Users className="text-indigo-600 text-4xl mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Networking</h3>
              <p className="text-gray-600 text-sm">
                Connect with alumni and students to build a lifelong network.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
              <Handshake className="text-indigo-600 text-4xl mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Mentorship</h3>
              <p className="text-gray-600 text-sm">
                Alumni can mentor students and provide valuable guidance.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
              <GraduationCap className="text-indigo-600 text-4xl mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Career Growth</h3>
              <p className="text-gray-600 text-sm">
                Explore internships, job opportunities, and career paths.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
              <Globe className="text-indigo-600 text-4xl mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Global Community</h3>
              <p className="text-gray-600 text-sm">
                Stay connected across borders with alumni worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 text-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Be Part of the Alumni Connect Journey
        </h2>
        <p className="max-w-2xl mx-auto mb-8 text-lg">
          Together, let’s create a platform that strengthens bonds, empowers
          careers, and celebrates community.
        </p>
        <a
          href="/register"
          className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition"
        >
          Get Started
        </a>
      </section>
    </div>
  )
}

export default Learnmore
