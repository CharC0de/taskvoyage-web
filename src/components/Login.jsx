import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // Import the CSS file

const Login = () => {
    const [formData, setFormData] = useState({
        user: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/login/', formData);

            if (response.status === 200) {
                const data = response.data;
                console.log('User logged in successfully');

                // Store the userId in localStorage
                localStorage.setItem('userId', data.userId);

                // Redirect to the dashboard
                navigate('/dashboard');
            } else {
                const data = response.data;
                setError(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            setError('User Not Found, New User Must Register.');
        }
    };

    return (
        <div className="form-container">
            <img src="./img/cloudy.png" alt="Cloud Icon2" className="cloud-icon2" />
            <img src="./img/cloudy.png" alt="Cloud Icon" className="cloud-icon" />
            <img src="./img/ship.png" alt="Ship Icon" className="ship-icon1" />
            <img src="./img/sea.png" alt="Water Icon" className="water-icon" />
            <img src="./img/sea.png" alt="Water Icon3" className="water-icon3" />

            <div className="login-container">
                <div className="login-form">
                    <div className="headertitle">
                        <h2>TaskVoyage</h2>
                    </div>
                    {error && <div className="error">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="icon-input-container input-container">
                            <label>Email:</label>
                            <div className="icon">
                                <img src="./img/avatar.png" alt="Avatar Icon" className="avatar-icon" />
                            </div>
                            <input
                                type="email"
                                placeholder="Email"
                                name="user"
                                value={formData.user}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="icon-input-container input-container">
                            <label>Password:</label>
                            <div className="icon">
                                <img src="./img/key.png" alt="Key Icon" className="key-icon" />
                            </div>
                            <input
                                type="password"
                                placeholder='Password'
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit">Login</button>
                        <p className="Sign-up">Don`&apos;`t have an account? <Link to="/register">Sign up</Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
