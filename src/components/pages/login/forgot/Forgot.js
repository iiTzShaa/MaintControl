import React, { useState } from 'react';
import './Forgot.css';

const Forgot = () => {
  const [email, setEmail] = useState(''); 
  const [success, setSuccess] = useState(false); 
  const [error, setError] = useState(''); 
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // ------------------
  async function sendResetRequest(email) {
    try {
      const response = await fetch('/api/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
    } catch (err) {
      throw err;
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validate the email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

  
    sendResetRequest(email)
      .then(() => {
        setSuccess(true);
      })
      .catch((err) => {
        setError(err.message); 
      });
  };

  return (
    <div className="forgotBox">
      <h3>
        Please enter a valid email for password resetting. <br /> If your Email
        is in our database, a conformation Email will be sent to you.
      </h3>
      {success ? (
        <div className="forgotSuccess">
          A reset email has been sent to your email address. Please check your
          email to reset your password or username.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="forgotForm">
          <label className="forgotLabel" htmlFor="email">
            Email:
            <input
              id="email"
              className="forgotInput"
              type="email"
              value={email}
              onChange={handleEmailChange}
            />
          </label>
          {error && <div className="forgotError">{error}</div>}
          <button className="forgotResetButton" type="submit">
            Reset Password or Username
          </button>
        </form>
      )}
    </div>
  );
};

export default Forgot;
