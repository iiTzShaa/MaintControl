import { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import './AddUser.css';

const AddUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [companyId, setCompanyId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [area, setArea] = useState('');
  const [address, setAddress] = useState('');
  const [authorization, setAuthorization] = useState('');
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false); // New state for popup visibility
  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const token = localStorage.getItem('token');

  async function addUserFetch() {
    const userData = {
      username,
      password,
      firstName,
      lastName,
      email,
      phoneNumber,
      livingAddress: address,
      geographicArea: area,
      authorization,
      companyId,
    };

    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        if (response.statusText === 'Unauthorized') {
          setError('Please login again');
        }
        throw new Error(response.statusText);
      }

      // If successful, show the popup
      setShowPopup(true);

      // Navigate to admin page after a brief delay
      setTimeout(() => {
        navigate('/admin');
      }, 2000);

      return true;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
    } else if (username.length < 4) {
      setError('Username must be at least 4 characters');
    } else if (companyId.length === 0) {
      setError('Must enter company ID');
    } else if (firstName.length < 2) {
      setError('First name must be at least 2 characters');
    } else if (lastName.length < 2) {
      setError('Last name must be at least 2 characters');
    } else if (phoneNumber.length !== 10) {
      setError('Must enter a valid phone number');
    } else if (document.getElementById('authorization').value === 'choose') {
      setError('Must choose an authorization');
    } else if (document.getElementById('Area').value === 'choose') {
      setError('Must enter a geographic area');
    } else if (address === '') {
      setError('Must enter an address');
    } else {
      addUserFetch();
    }
  };

  return (
    <div className="addUserBox">
      <form onSubmit={handleSubmit} className="addUserForm">
        <div className="addUserFormContent">
          <label className="addUserLabel" htmlFor="username">
            Username:
            <input
              id="username"
              className="addUserInput"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Please enter a username"
            />
          </label>
          <label className="addUserLabel" htmlFor="pass">
            Password:
            <div className="passContent">
              <input
                id="pass"
                className="addUserInput"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Please enter an 8 characters password"
              />
              {showPassword ? (
                <VisibilityIcon className="eye" onClick={handleShowPassword} />
              ) : (
                <VisibilityOffIcon
                  className="eyeOff"
                  onClick={handleShowPassword}
                />
              )}
            </div>
          </label>
          <label className="addUserLabel" htmlFor="firstName">
            First name:
            <input
              id="firstName"
              className="addUserInput"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              placeholder="Please enter a first name"
            />
          </label>
          <label className="addUserLabel" htmlFor="LastName">
            Last name:
            <input
              id="lastName"
              className="addUserInput"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              placeholder="Please enter a last name"
            />
          </label>
          <label className="addUserLabel" htmlFor="Email">
            Email address:
            <input
              id="email"
              className="addUserInput"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Please enter a valid email"
            />
          </label>
          <label className="addUserLabel" htmlFor="phoneNumber">
            Phone number:
            <input
              id="phoneNumber"
              className="addUserInput"
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              placeholder="Please enter a valid phone number"
            />
          </label>
          <label className="addUserLabel" htmlFor="Address">
            Living Address:
            <input
              id="Address"
              className="addUserInput"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              placeholder="Please enter an address"
            />
          </label>
          <label className="addUserLabel" htmlFor="Area">
            Geographic Area:
            <select
              id="Area"
              name="Area"
              className="addUserInput"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              required
            >
              <option value="choose">Choose Geographic Area</option>
              <option value="center">Central Israel</option>
              <option value="north">Northern Israel</option>
              <option value="south">Southern Israel</option>
            </select>
          </label>
          <label htmlFor="authorization" className="addUserLabel">
            Authorization:
            <select
              id="authorization"
              name="authorization"
              className="addUserInput"
              value={authorization}
              onChange={(e) => setAuthorization(e.target.value)}
              required
            >
              <option value="choose">Choose authorization</option>
              <option value="administrator">Admin</option>
              <option value="manager">Manager</option>
              <option value="maintenance">Maintenance man</option>
            </select>
          </label>
          <label className="addUserLabel" htmlFor="companyId">
            Company ID:
            <input
              id="companyId"
              className="addUserInput"
              type="text"
              value={companyId}
              onChange={(e) => setCompanyId(e.target.value)}
              required
              placeholder="Please enter a company id"
            />
          </label>
        </div>
        <div className="addUserFormBtn">
          {error && <div className="addUserError">{error}</div>}
          <button className="addUserButton" type="submit">
            Add a user
          </button>
        </div>
      </form>

      {/* Popup Window */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>User added successfully!</p>
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddUser;
