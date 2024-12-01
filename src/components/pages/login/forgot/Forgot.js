import React, { useState } from 'react';
import './Forgot.css';

const Forgot = () => {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); 

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
/*בדיקה בדיקה*/


  async function sendResetRequest(email) {
    try {
      const response = await fetch('http://localhost:3000/api/password-reset', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        const errorData = await response.json(); 
        throw new Error(errorData.message || 'Something went wrong.');
      }
    } catch (err) {
      throw err;
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    setError('');
    setSuccess(false);
    setLoading(true); 

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      setLoading(false); 
      return;
    }

    sendResetRequest(email)
      .then(() => {
        setSuccess(true);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false); 
      });
  };

  return (
    <div className="forgotBox">
      <h3>
        Please enter a valid email for password resetting. <br /> If your Email
        is in our database, a confirmation Email will be sent to you.
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
              disabled={loading} 
            />
          </label>
          {error && <div className="forgotError">{error}</div>}
          <button
            className="forgotResetButton"
            type="submit"
            disabled={loading} 
          >
            {loading ? 'Sending...' : 'Reset Password or Username'} 
          </button>
        </form>
      )}
    </div>
  );
};

export default Forgot;
