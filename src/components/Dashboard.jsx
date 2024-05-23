import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Dashboard.css";

const Dashboard = () => {
  const [ongoingTasks, setOngoingTasks] = useState([]);

  useEffect(() => {
    // Fetch ongoing tasks for the logged-in user from backend
    const userId = localStorage.getItem('userId');
    axios.get(`http://localhost:8000/api/task/?status=Ongoing&userId=${userId}`)
      .then(response => {
        setOngoingTasks(response.data);
      })
      .catch(error => {
        console.error('Error fetching ongoing tasks:', error);
      });
  }, []);

  return (
    <div className="dashboard">
      <div className="sidebar">
        <div className="logo">
          <img src="./img/ship.png" alt="Ship Icon3" className="ship-icon3"/> <span>TaskVoyage</span>
        </div>
        <ul className="navigation">
          <li><a href="/dashboard">Home</a></li>
          <li><a href="/Task">Tasks</a></li>
          <li><a href="/Calendar">Calendar</a></li>
          <li><a href="/Settings">Settings</a></li>
          <li><a href="/login">Logout</a></li>
        </ul>
      </div>
      <div className="content-area">
        <div className="introduction">
          <img src="./img/parrot.png" alt="Pirate Avatar" className="pirate-avatar"/>
          <div>
            <h1>AHOOY MATEY!!</h1>
            <p>Task Voyage helps students stay focused and productive during their academic journey by simplifying the process of prioritizing tasks, tracking progress, and ensuring timely completion with features that are specialized to deadlines.</p>
          </div>
        </div>
        <div className='text-box'>
          <h1>Task Summary</h1>
        </div>
        <div className='text-box'>
          <h2>Ongoing Tasks</h2>
        </div>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Description</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {ongoingTasks.map(task => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.start_date}</td>
                <td>{task.end_date}</td>
                <td>{task.start_time}</td>
                <td>{task.end_time}</td>
                <td>{task.description}</td>
                <td>{task.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
