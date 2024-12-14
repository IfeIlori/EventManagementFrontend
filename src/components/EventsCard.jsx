import React from 'react'

const EventsCard = ({event, navigate, onClick}) => {
  const handleRSVP = () => {
    localStorage.setItem("Event", JSON.stringify(event));
    navigate("/rsvp");
  }
  return (
    <div>
      <h3 className="text-lg font-medium">{event.name}</h3>
      <p className="text-sm text-gray-600">
        {event.description}
      </p>
     {onClick?<button onClick={() => onClick(event)} className="mt-3 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
        Cancel
      </button>: <button onClick={handleRSVP} className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        RSVP
      </button>}
    </div>
  );
}

export default EventsCard
