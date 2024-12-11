import { useState, useEffect } from 'react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const NavBar = () => {
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("User"));
        setUserDetails(user);
    }, []);

    const [userDetails, setUserDetails] = useState({});
    const navigate = useNavigate()

    const handleLogin = () =>{
        navigate("/")
    }

    const handleSignup = () =>{
        navigate("/signup")
    }

    const handleCalendar = () =>{
      navigate("/calendar")
    }

    const handleDashboard = () =>{
      navigate("/home")
    }

    const handleMyEvents = () =>{
      navigate("/myevents")
    }

    const handleAdmin = () =>{
      navigate("/admin")
    }

    const handleLogout = () =>{
      alert("Logout succesful")
      localStorage.removeItem("User")
      localStorage.removeItem("Event")
      localStorage.removeItem("token")
    }
    
    
  return (
    <nav className="w-full p-4 text-gray-400 flex justify-between bg-white border-b-2 drop-shadow-md">
      <div className="flex gap-3 items-center">
        <img
          className="w-12 h-auto"
          src="https://img.freepik.com/premium-vector/campus-collage-university-education-logo-design-template_7492-59.jpg?w=2000"
          alt="logo"
        />

        <ul className="flex gap-4 text-black">
          <li>
            <button onClick={handleDashboard}>Events</button>
          </li>
          <li>
            <button onClick={handleCalendar}>Calendar</button>
          </li>
          <li>
            <button onClick={handleMyEvents}>My Events</button>
          </li>
          {userDetails && userDetails.role === "admin" && (
            <li>
              <button onClick={handleAdmin}>Admin</button>
            </li>
          )}
        </ul>
      </div>

      <div className="flex gap-2">
        {userDetails ? (
          <>
                <div className='flex items-center gap-2'>
                          <p>{`Welcome ${userDetails.name}`}</p>
                          
                          <button
              onClick={handleLogout}
              className="px-3 py-2 bg-black text-white rounded-md"
            >Logout</button>
                </div>
          </>
        ) : (
          <>
            <button
              onClick={handleLogin}
              className="px-5 py-1 bg-black text-white rounded-md"
            >
              Login
            </button>
            <button
              onClick={handleSignup}
              className="px-5 py-1 bg-transparent text-black border rounded-md"
            >
              SignUp
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar
