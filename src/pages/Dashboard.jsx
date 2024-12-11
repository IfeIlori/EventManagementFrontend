import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Banner from "../components/Banner";
import EventsCard from "../components/EventsCard";
import api from "../services/api";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const userData = localStorage.getItem("User");
    if (userData) {
      setUserDetails(JSON.parse(userData));
    }
  }, []);

  const getEvents = async () => {
    const response = await api.get("/api/events/getEvents");
    setEvents(response.data.events);
    console.log(events);
  };

  useEffect(() => {
    getEvents();
  }, []);

  const handleRSVP = (event) => {
    localStorage.setItem("Event", JSON.stringify(event));
    navigate("/rsvp");
  }

  return (
    <div className="bg-gray-100 h-full w-full">
      <NavBar />

      {/* Main Content */}
      <main>
        <Banner
          backgroundImage="image.png"
          title={`Welcome ${userDetails ? userDetails.name : "Guest"}`}
          linkText="Get Started"
          onClick={() => {
            document.querySelector('.lg\\:col-span-3').scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Featured Events Section */}
        <div className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-4 gap-6 w-full">
          <section className="lg:col-span-3 bg-white p-6 rounded-lg shadow-md bg-clip-border">
            <h2 className="text-2xl font-semibold mb-4">Featured Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {events
               .filter(event => userDetails?.preferences?.includes(event.type))
               .map((event) => (
                <div key={event.id} className="bg-gray-50 border rounded-lg p-4 shadow hover:shadow-lg transition-shadow">
                  <EventsCard
                    event={event}
                    navigate={navigate}
                  />
                </div>
              ))}
              {events.filter(event => userDetails?.preferences?.includes(event.type)).length === 0 && (
                <p className="text-gray-500 text-center col-span-2">No upcoming preferred events found</p>
              )}
            </div>
          </section>

          {/* Sidebar Section */}
          <aside className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md w-full">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Event Categories</h3>
              <ul className="list-disc list-inside text-gray-600">
                <li>Workshops</li>
                <li>Seminars</li>
                <li>Club Activities</li>
                <li>Career Events</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">My Upcoming Events</h3>
              <ul className="text-gray-600">
                <li className="mb-2">
                  <span className="font-medium">Web Development Workshop</span>{" "}
                  - Mar 15
                </li>
                <li>
                  <span className="font-medium">AI in Education Seminar</span> -
                  Mar 18
                </li>
              </ul>
            </div>
          </aside>

          {/* Upcoming Events Section */}
          <section className="lg:col-span-3 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
            <ul className="space-y-4">
              {events.map((event) => (
                <li key={event.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow">
                  <div>
                    <h3 className="text-lg font-medium">
                      {event.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {event.event_date} | {event.event_time}
                    </p>
                  </div>
                <button onClick={() => handleRSVP(event)} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  RSVP
                </button>
              </li>
            ))}
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
