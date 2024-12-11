import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthPage = () => {
  return (
    <div
      className="flex w-full h-screen flex justify-center items-center"
      style={{
        backgroundImage: `url(image2.png)`,
        backgroundSize: "cover", // Ensures the image covers the entire header
        backgroundPosition: "center", // Centers the image
        backgroundRepeat: "no-repeat",
        height: "100vh", // Sets the height of the header to 70% of the viewport height
      }}
    >
      <Outlet />
    </div>
  );
}

export default AuthPage
