import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import CalendarPage from "./pages/CalandarPage"
import RSVPPage from "./pages/RSVPPage";
import AdminPage from "./pages/Admin";
import UserEvents from "./pages/UserEvents";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path="" element={<AuthPage/>}>
            <Route path="/" element={<LoginForm/>}/>
            <Route path="/signup" element={<SignUpForm/>}/>
          </Route>

          <Route path="/home" element={<Dashboard/>}></Route>
          <Route path="/calendar" element={<CalendarPage/>}></Route>
          <Route path="/rsvp" element={<RSVPPage/>}/>
          <Route path="/admin" element={<AdminPage/>}/>
          <Route path="/myevents" element={<UserEvents/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
