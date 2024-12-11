// Calendar.jsx
import React, { useState, useEffect } from "react";
import api from "../services/api";
import NavBar from "./NavBar";

// Function to generate a calendar for a given month
function generateCalendar(year, month) {
  const date = new Date(year, month, 1);
  const firstDay = date.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];
  let currentDay = 1;

  for (let i = 0; i < 6; i++) {
    let week = [];
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        week.push(null);
      } else if (currentDay > daysInMonth) {
        week.push(null);
      } else {
        week.push(currentDay);
        currentDay++;
      }
    }
    days.push(week);
  }
  return days;
}

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [eventsByDate, setEventsByDate] = useState({});

  const { year, month } = {
    year: currentDate.getFullYear(),
    month: currentDate.getMonth(),
  };

  // Fetch events from the database
  const getEvents = async () => {
    try {
      const response = await api.get("/api/events/getEvents");
      setEvents(response.data.events);
      
      // Organize events by date
      const eventMap = {};
      response.data.events.forEach(event => {
        const eventDate = new Date(event.event_date);
        const dayOfMonth = eventDate.getDate();
        
        if (eventDate.getMonth() === month && eventDate.getFullYear() === year) {
          if (!eventMap[dayOfMonth]) {
            eventMap[dayOfMonth] = [];
          }
          eventMap[dayOfMonth].push(event.name);
        }
      });
      setEventsByDate(eventMap);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    getEvents();
  }, [month, year]); // Refetch when month or year changes

  const calendarDays = generateCalendar(year, month);

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  return (
    <div>
      <NavBar />
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={goToPreviousMonth}
            className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Previous
          </button>
          <h2 className="text-2xl font-semibold">{`${currentDate.toLocaleString(
            "default",
            {
              month: "long",
            }
          )} ${year}`}</h2>
          <button
            onClick={goToNextMonth}
            className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Next
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2">
          <div className="font-semibold text-center">Sun</div>
          <div className="font-semibold text-center">Mon</div>
          <div className="font-semibold text-center">Tue</div>
          <div className="font-semibold text-center">Wed</div>
          <div className="font-semibold text-center">Thu</div>
          <div className="font-semibold text-center">Fri</div>
          <div className="font-semibold text-center">Sat</div>

          {calendarDays.map((week, index) => (
            <React.Fragment key={index}>
              {week.map((day, dayIndex) => (
                <div
                  key={dayIndex}
                  className={`p-4 text-center border rounded-lg ${
                    day ? "cursor-pointer" : "bg-gray-200"
                  } ${eventsByDate[day] ? "bg-blue-100" : ""}`}
                >
                  {day ? (
                    <>
                      <div>{day}</div>
                      {eventsByDate[day] && (
                        <div className="text-xs mt-2">
                          {eventsByDate[day].map((event, i) => (
                            <div key={i} className="text-blue-500">
                              {event}
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  ) : null}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
