// AddTask.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'; // Import PropTypes
import "./AddTask.css";

const AddTask = ({ onTaskAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    start_date: '',
    end_date: '',
    start_time: '',
    end_time: '',
    description: '',
    category: '',
    status: 'Ongoing', // Set default status as "Ongoing"
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.post(
        'http://localhost:8000/api/task/',
        { ...formData, userId } // Include userId in the task data
      );
      onTaskAdded(response.data);
      // Save task data to localStorage
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      localStorage.setItem('tasks', JSON.stringify([...tasks, response.data]));
      setFormData({
        title: '',
        start_date: '',
        end_date: '',
        start_time: '',
        end_time: '',
        description: '',
        category: '',
        status: 'Ongoing', // Reset status to "Ongoing" after submitting
      });
      // Redirect to task page after adding task
      navigate('/Task');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div className="page-container">
      <div className="sidebar">
        <div className="logo">
          <img src="./img/ship.png" alt="Ship Icon3" className="ship-icon3" />  <span>TaskVoyage</span>
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
        <h1>Add Task</h1>
        <form onSubmit={handleSubmit} className="task-form">
          <div className="form-group">
            <label>Title:</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Start Date:</label>
            <input type="date" name="start_date" value={formData.start_date} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>End Date:</label>
            <input type="date" name="end_date" value={formData.end_date} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Start Time:</label>
            <input type="time" name="start_time" value={formData.start_time} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>End Time:</label>
            <input type="time" name="end_time" value={formData.end_time} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Category:</label>
            <select name="category" value={formData.category} onChange={handleChange}>
              <option value="Personal">Personal</option>
              <option value="Work">Work</option>
              <option value="Education">Education</option>
              <option value="Sports">Sports</option>
              <option value="Health">Health</option>
            </select>
          </div>
          <button type="submit">Add Task</button>
        </form>
      </div>
    </div>
  );
};

// Define prop types for AddTask component
AddTask.propTypes = {
  onTaskAdded: PropTypes.func.isRequired,
};

export default AddTask;
