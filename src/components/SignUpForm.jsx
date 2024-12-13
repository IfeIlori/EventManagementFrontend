import axios from 'axios';
import React, { useState } from 'react'
import { Link } from "react-router-dom";
import Select from "react-select"
import { signup } from '../services/api';


const SignUpForm = () => {
  const [loading, setLoading] = useState(false)
  const [userDetails, setUserDetails] = useState({
    name:"",
    email:"",
    password:"",
    confirmPassword:"",
    eventPrefences:[]
  })

  const options = [
    {value:"Workshops", label:"Workshops"},
    {value:"Seminars", label:"Seminars"},
    {value:"Club activites", label:"Club Activites"},
  ]

  const handlePreferencesChange = (selectedPreferences) =>{
    const preferences = selectedPreferences.map(option => option.value)
    setUserDetails({...userDetails,eventPrefences:preferences})
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()
    setLoading(true)
    if(userDetails.password != userDetails.confirmPassword){
      setLoading(false)
      alert("Passwords don't match")
      return
    }

    const finalUserDetails = {
      name:userDetails.name,
      email:userDetails.email,
      password:userDetails.password,
      role:"user",
      preferences:userDetails.eventPrefences
    }

    try {
      await signup(finalUserDetails);
      setLoading(false)
    } catch (error) {
      console.log("Error", error)
      setLoading(false)
    }
    
  }
  return (
    <div  className="shadow-2xl bg-white w-4/12 flex flex-col items-center p-5" >
      <h1 className="text-xl font-bold">Create Account</h1>
      <p className="text-gray-400">Sign up for a new account</p>


      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
        <div className="flex flex-col">
          <label htmlFor="name">Full Name</label>
          <input
            className="p-2 rounded-md border"
            type="text"
            placeholder="Enter your full name"
            onChange={(e) =>
              setUserDetails({ ...userDetails, name: e.target.value })
            }
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) =>
              setUserDetails({ ...userDetails, email: e.target.value })
            }
            className="p-2 rounded-md border"
            type="email"
            placeholder="Enter your email"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            onChange={(e) =>
              setUserDetails({ ...userDetails, password: e.target.value })
            }
            className="p-2 rounded-md border"
            type="password"
            placeholder="Enter your password"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            onChange={(e) =>
              setUserDetails({ ...userDetails, confirmPassword: e.target.value })
            }
            className="p-2 rounded-md border"
            type="password"
            placeholder="Enter your password again"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="Preferences">Preferences</label>
          <Select
            isMulti
            name="activites"
            options={options}
            onChange={handlePreferencesChange}
            className=""
            classNamePrefix="select"
          />
        </div>

        <button type='submit' className="bg-black text-white p-3 rounded-md" disabled={loading}>{loading ? "Loading..." : "Signup"}</button>
        <p className="text-center">
          Already have an account?
          <Link to="/" className="font-bold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignUpForm
