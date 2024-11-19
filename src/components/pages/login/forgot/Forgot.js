// import React, { useState } from 'react';
// import './Forgot.css';

// const Forgot = () => {
//   const [email, setEmail] = useState(''); 
//   const [success, setSuccess] = useState(false); 
//   const [error, setError] = useState(''); 
//   const handleEmailChange = (event) => {
//     setEmail(event.target.value);
//   };

//   // ------------------
//   async function sendResetRequest(email) {
//     try {
//       const response = await fetch('/api/reset', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email }),
//       });
//       if (!response.ok) {
//         throw new Error(response.statusText);
//       }
//     } catch (err) {
//       throw err;
//     }
//   }

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Validate the email
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       setError('Please enter a valid email address');
//       return;
//     }

  
//     sendResetRequest(email)
//       .then(() => {
//         setSuccess(true);
//       })
//       .catch((err) => {
//         setError(err.message); 
//       });
//   };

//   return (
//     <div className="forgotBox">
//       <h3>
//         Please enter a valid email for password resetting. <br /> If your Email
//         is in our database, a conformation Email will be sent to you.
//       </h3>
//       {success ? (
//         <div className="forgotSuccess">
//           A reset email has been sent to your email address. Please check your
//           email to reset your password or username.
//         </div>
//       ) : (
//         <form onSubmit={handleSubmit} className="forgotForm">
//           <label className="forgotLabel" htmlFor="email">
//             Email:
//             <input
//               id="email"
//               className="forgotInput"
//               type="email"
//               value={email}
//               onChange={handleEmailChange}
//             />
//           </label>
//           {error && <div className="forgotError">{error}</div>}
//           <button className="forgotResetButton" type="submit">
//             Reset Password or Username
//           </button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default Forgot;

import React, { useState } from 'react';
import './Forgot.css';

const Forgot = () => {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // מצב טעינה חדש

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // פונקציה לשליחת בקשה לאיפוס סיסמה
  async function sendResetRequest(email) {
    try {
      const response = await fetch('http://localhost:3000/api/password-reset', { // נתיב מותאם
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        const errorData = await response.json(); // שגיאה מפורטת מהשרת
        throw new Error(errorData.message || 'Something went wrong.');
      }
    } catch (err) {
      throw err;
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    // איפוס הודעות
    setError('');
    setSuccess(false);
    setLoading(true); // התחלת מצב טעינה

    // בדיקת תקינות אימייל
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      setLoading(false); // עצירת טעינה במקרה של שגיאה
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
        setLoading(false); // סיום מצב טעינה
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
              disabled={loading} // מניעת שינוי אימייל בזמן טעינה
            />
          </label>
          {error && <div className="forgotError">{error}</div>}
          <button
            className="forgotResetButton"
            type="submit"
            disabled={loading} // מניעת לחיצה כפולה
          >
            {loading ? 'Sending...' : 'Reset Password or Username'} {/* אינדיקציה לטעינה */}
          </button>
        </form>
      )}
    </div>
  );
};

export default Forgot;
