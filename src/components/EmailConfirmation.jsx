import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EmailConfirmation.css';

const EmailConfirmation = () => {
  const { uid, token } = useParams();
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        await axios.get(`http://localhost:8000/api/confirm-email/${uid}/${token}/`);
        setConfirmationMessage('Email confirmation successful! You can now log in.');
        setErrorMessage('');
      } catch (error) {
        setErrorMessage('Please check your email. Copy paste the link to your browser and once its confirmed you can login your account.');
        setConfirmationMessage('');
      }
    };

    confirmEmail();
  }, [uid, token]);

  return (
    <div className='emailconfirm'>
      <div className='page-box'>
        <div className="text-content">
        <img src="./img/parrot.png" alt="Pirate Avatar" className="pirate-avatar" />
          <h2>Email Confirmation</h2>
          {confirmationMessage && <p>{confirmationMessage}</p>}
          {errorMessage && <p>{errorMessage}</p>}
          <div className="button-container">
        <button onClick={handleLogin}>Back to Login</button>
      </div>
        </div>
      </div>
    </div>
    
  );
};

export default EmailConfirmation;
