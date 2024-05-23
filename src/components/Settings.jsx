// Settings.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'; // Corrected the import statement
import './Settings.css';

const Settings = ({ userId }) => {
    const [user, setUser] = useState({
        profilePicture: '',
        username: '',
        email: ''
    });
    const [newUsername, setNewUsername] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user data based on userId
        axios.get(`http://localhost:8000/api/customuser/${userId}`)
            .then(response => {
                setUser(response.data);
                setNewUsername(response.data.username);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, [userId]);

    const handleUsernameChange = (e) => {
        setNewUsername(e.target.value);
    };

    const handleSaveChanges = () => {
        if (newUsername.trim() === '') {
            alert('Input text field');
            return;
        }

        // Update the username in the database
        axios.put(`http://localhost:8000/api/customuser/${userId}`, { username: newUsername })
            .then(response => {
                setUser({ ...user, username: newUsername });
                setMessage('Username updated successfully!');
            })
            .catch(error => {
                console.error('Error updating username:', error);
                setMessage('Failed to update username. Please try again.');
            });
    };

    const handleLogout = () => {
        // Clear userId and navigate to login page
        document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        navigate('/login');
    };

    return (
        <div className="settings-page">
            <div className="sidebar">
                <div className="logo">
                    <img src="./components/images/ship.png" alt="Ship Icon" className="ship-icon" />
                    <span>TaskVoyage</span>
                </div>
                <ul className="navigation">
                    <li><a href="/dashboard">Home</a></li>
                    <li><a href="/Task">Tasks</a></li>
                    <li><a href="/Calendar">Calendar</a></li>
                    <li><a href="/Settings">Settings</a></li>
                    <li><a href="/login">Logout</a></li>
                </ul>
            </div>
            <div className="content-area3">
                <div className="introduction3">
                    <img src={user.profilePicture || './img/parrot.png'} alt="User Profile" className="profile-picture" />
                    <div className="user-info">
                        <h2>User Profile</h2>
                        <h2>AHOOOY {user.username}!</h2>
                        <p>Email: {user.email}</p>
                        <label>
                            Username:
                            <input type="text" value={newUsername} onChange={handleUsernameChange} />
                        </label>
                        <button onClick={handleSaveChanges}>Save Changes</button>
                        {message && <p className="message">{message}</p>}
                    </div>
                </div>
                <div className="faq">
                    <h2>FAQ</h2>
                    <p>Here you can add frequently asked questions.</p>
                    <div className="faq-section">
                        <h3>Task Instructions</h3>
                        <p><strong>Q: How do I add a task?</strong></p>
                        <p>A: Follow these steps:</p>
                        <ul>
                            <li><strong>Input Task Name:</strong> Enter the name of your task.</li>
                            <li><strong>Input Dates:</strong> Specify the starting and ending dates for your task.</li>
                            <li><strong>Input Times:</strong> Enter the starting and ending times for your task on the chosen dates.</li>
                            <li><strong>Choose Category:</strong> Select a category for your task (Personal, Education, Sports, Health).</li>
                            <li><strong>Click Submit:</strong> Your task is now created and will be displayed on your homepage and task page.</li>
                        </ul>
                    </div>
                    <div className="faq-section">
                        <h3>Event Instructions</h3>
                        <p><strong>Q: How do I add an event?</strong></p>
                        <p>A: Follow these steps:</p>
                        <ul>
                            <li><strong>Input Event Name:</strong> Enter the name of your event.</li>
                            <li><strong>Input Dates:</strong> Specify the starting and ending dates for your event.</li>
                            <li><strong>Input Times:</strong> Enter the starting and ending times for your event on the chosen dates.</li>
                            <li><strong>Write Description:</strong> Provide a description for your event.</li>
                            <li><strong>Click Submit:</strong> Your event is now created and will be displayed on your homepage and calendar.</li>
                        </ul>
                    </div>
                </div>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

Settings.propTypes = {
    userId: PropTypes.string.isRequired,
};

export default Settings;
