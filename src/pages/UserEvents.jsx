import React, { useState, useEffect } from 'react'
import NavBar from '../components/NavBar'
import EventsCard from '../components/EventsCard'
import api from '../services/api'
const UserEvents = () => {
    const [events, setEvents] = useState([])
const [userId, setUserId] = useState(null)

    useEffect(() => {
        const userDetails = localStorage.getItem("User")
        if(userDetails){
            setUserId(userDetails.id)
            getUserEvents()
        }
    }, [])

    const getUserEvents = async () => {
        const response = await api.get(`/api/events/getUserEvents/${userId}`)
        setEvents(response.data.events)
    }

    const cancelEvent = async (eventId) => {
        const response = await api.delete(`/api/events/cancelEvent/${eventId}`)
        setEvents(response.data.events)
    }
  return (
    <div>
     <NavBar/>
     <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold'>My Events</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {events.length > 0 ? (
          events.map((event) => (
            <EventsCard key={event.id} event={event} onClick={cancelEvent} />
          ))
        ) : (
          <p className="text-gray-500">You have not RSVP'd to any events yet.</p>
        )}
      </div>
     </div>
    </div>
  )
}

export default UserEvents
