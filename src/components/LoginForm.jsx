import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import {login} from '../services/api';

const LoginForm = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [userDetails, setUserDetails] = useState({
    email:"",
    password:""
  })

  const handleSubmit = async (e) =>{
    e.preventDefault()
    setLoading(true)
    try{
      await login(userDetails)
      setLoading(false)
    }catch(err){
      setLoading(false)
      console.log(err)
    }
  }

  return (
    <div className="shadow-2xl bg-white w-4/12 flex flex-col items-center p-5">
      <h1 className="text-xl font-bold">Welcome Back</h1>
      <p className="text-gray-400">Please sign in to your account</p>

      <form onSubmit={handleSubmit} action="" className="flex flex-col gap-3 w-full">
        <div className="flex flex-col">
          <label htmlFor="#">Email</label>
          <input
            className="p-2 rounded-md border"
            type="email"
            placeholder="Enter your email"
            onChange={(e) =>
              setUserDetails({ ...userDetails, email: e.target.value })
            }
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="#">Password</label>
          <input
            className="p-2 rounded-md border"
            type="password"
            placeholder="Enter your password"
            onChange={(e) =>
              setUserDetails({ ...userDetails, password: e.target.value })
            }
          />
        </div>
        <Link className="text-black text-end">Forgot your password?</Link>
        <button className="bg-black text-white p-3 rounded-md" disabled={loading}>{loading ? "Loading..." : "Login"}</button>
        <p className="text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="font-bold">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}

export default LoginForm
