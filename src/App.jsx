// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import EmailConfirmation from "./components/EmailConfirmation";
import Dashboard from "./components/Dashboard";
import Task from './components/Task';
import Calendar from './components/Calendar';
import Logout from './components/Logout';
import AddTask from './components/AddTask';
import Settings from "./components/Settings";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />{" "}
        {/* Define a route for the root URL */}
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/dashboard" element={<Dashboard/>} />
        <Route exact path="/Task" element={<Task/>} />
        <Route exact path="/calendar" element={<Calendar/>} />
        <Route exact path="/logout" element={<Logout/>} />
        <Route exact path="/AddTask" element={<AddTask/>} />
        <Route exact path="/Settings" element={<Settings/>}/>


        <Route
          exact
          path="/email-confirm/:uid/:token"
          element={<EmailConfirmation />}
        />
      </Routes>
    </Router>
  );
};

export default App;
