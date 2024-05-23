import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Task.css";

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch tasks for the logged-in user from the database
    const userId = localStorage.getItem('userId');
    axios.get(`http://localhost:8000/api/task/?userId=${userId}`)
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  useEffect(() => {
    // Filter tasks based on search query
    const results = tasks.filter(task =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  }, [searchQuery, tasks]);

  const handleSearch = () => {
    // Perform search operation
    // This could be implemented in future versions
  };

  const handleAddTask = () => {
    // Redirect to add task page
    navigate('/AddTask');
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:8000/api/task/${taskId}/`);
      // Remove the deleted task from the tasks state
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="page-container">
      <div className="sidebar3">
        {/* Sidebar content */}
        <div className="logo3">
          <img src="./img/ship.png" alt="Ship Icon3" className="ship-icon3"/>  <span>TaskVoyage</span>
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
          <h1>WHAT ARE YOUR PLANS TODAY MATEY?</h1>
        </div>
        <h1>Tasks</h1>
        <input
          type="text"
          placeholder="Search tasks"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="button-container">
          <button onClick={handleSearch}>Search</button>
          <button onClick={handleAddTask}>Add Task</button>
        </div>
        {/* Task table */}
        <table>
          {/* Table headers */}
          <thead>
            <tr>
              <th>Title</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Description</th>
              <th>Category</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody>
            {/* Render tasks */}
            {searchResults.length > 0 ? (
              searchResults.map(task => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{task.start_date}</td>
                  <td>{task.end_date}</td>
                  <td>{task.start_time}</td>
                  <td>{task.end_time}</td>
                  <td>{task.description}</td>
                  <td>{task.category}</td>
                  <td>{task.status}</td>
                  <td>
                    <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9">No tasks exist, please create a task.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Task;
