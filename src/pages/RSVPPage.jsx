// RSVPPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import api from "../services/api";
const RSVPPage = () => {
  const navigate = useNavigate();
  const [confirmRSVP, setConfirmRSVP] = useState(false);
  const [eventDetails, setEventDetails] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedEvent = localStorage.getItem("Event");
    const userDetails = localStorage.getItem("User");
    if (userDetails) {
      setUserId(JSON.parse(userDetails).id);
    }
    if (storedEvent) {
      setEventDetails(JSON.parse(storedEvent));
    } 
  }, []);



const handleConfirm = async () => {
    setConfirmRSVP(true)
  const response = await api.post(`/api/events/confirmRSVP`, {
    userId: userId,
    eventId: eventDetails.id,
  })
  try {
    if (response.data.message === "RSVP confirmed successfully") {
      setConfirmRSVP(false)
      alert("RSVP confirmed successfully")
      navigate("/home")
    }
  } catch (error) {
    setConfirmRSVP(false)
    alert("Error confirming RSVP")
    console.error(error)
  }
}

  if (!eventDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          {eventDetails.image && (
            <img
              src={eventDetails.image}
              alt={eventDetails.name}
              className="w-full h-64 object-cover"
            />
          )}
          
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">{eventDetails.name}</h1>
            <p className="text-gray-600 mb-6">{eventDetails.description}</p>

            <div className="space-y-4 mb-8">
              <div>
                <strong className="text-gray-700">Location:</strong>
                <p className="text-gray-600">{eventDetails.location}</p>
              </div>
              <div>
                <strong className="text-gray-700">Date:</strong>
                <p className="text-gray-600">{eventDetails.event_date}</p>
              </div>
              <div>
                <strong className="text-gray-700">Time:</strong>
                <p className="text-gray-600">{eventDetails.event_time}</p>
              </div>
            </div>

           
              <div className="space-x-4">
                <button
                  onClick={handleConfirm}
                  disabled={confirmRSVP}
                  className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                >
                  {confirmRSVP ? "Confirming..." : "RSVP Yes"}
                </button>
                <button
                  onClick={() => navigate("/home")}
                  className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600"
                >
                  RSVP No
                </button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RSVPPage;
