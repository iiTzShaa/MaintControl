import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import './EditUser.css';

const EditUser = () => {
  const { userId } = useParams();
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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3000/users/${userId}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }
        const user = await response.json();
        setUsername(user.username);
        setPassword(user.password);
        setCompanyId(user.companyId);
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setEmail(user.email);
        setPhoneNumber(user.phoneNumber);
        setAuthorization(user.authorization);
        setAddress(user.livingAddress);
        setArea(user.geographicArea);
      } catch (err) {
        console.error(err);
        setError('Error fetching user details');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId, token]);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/users/${userId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            user_id: userId,
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
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      navigate('/admin'); 
    } catch (err) {
      console.error(err);
      setError('Error updating user');
    }
  };

  return (
    <div>
      {loading ? (
        <span className="loader"></span>
      ) : (
        <div className="editUserBox">
          <form onSubmit={handleSubmit} className="editUserForm">
            <div className="editUserFormContent">
              <label className="editUserLabel" htmlFor="username">
                Username:
                <input
                  id="username"
                  className="editUserInput"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </label>
              <label className="editUserLabel" htmlFor="pass">
                Password:
                <div className="passContent">
                  <input
                    id="pass"
                    className="editUserInput"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  {showPassword ? (
                    <VisibilityIcon
                      className="eye"
                      onClick={handleShowPassword}
                    />
                  ) : (
                    <VisibilityOffIcon
                      className="eyeOff"
                      onClick={handleShowPassword}
                    />
                  )}
                </div>
              </label>
              <label className="editUserLabel" htmlFor="firstName">
                First name:
                <input
                  id="firstName"
                  className="editUserInput"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </label>
              <label className="editUserLabel" htmlFor="lastName">
                Last name:
                <input
                  id="lastName"
                  className="editUserInput"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </label>
              <label className="editUserLabel" htmlFor="email">
                Email:
                <input
                  id="email"
                  className="editUserInput"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
              <label className="editUserLabel" htmlFor="phoneNumber">
                Phone number:
                <input
                  id="phoneNumber"
                  className="editUserInput"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </label>
              <label className="editUserLabel" htmlFor="address">
                Address:
                <input
                  id="address"
                  className="editUserInput"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </label>
              <label className="editUserLabel" htmlFor="area">
                Geographic Area:
                <select
                  id="area"
                  className="editUserInput"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  required
                >
                  <option value="">Choose Area</option>
                  <option value="center">Central Israel</option>
                  <option value="north">Northern Israel</option>
                  <option value="south">Southern Israel</option>
                </select>
              </label>
              <label className="editUserLabel" htmlFor="authorization">
                Authorization:
                <select
                  id="authorization"
                  className="editUserInput"
                  value={authorization}
                  onChange={(e) => setAuthorization(e.target.value)}
                  required
                >
                  <option value="">Choose Authorization</option>
                  <option value="administrator">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </label>
              <label className="editUserLabel" htmlFor="companyId">
                Company ID:
                <input
                  id="companyId"
                  className="editUserInput"
                  type="text"
                  value={companyId}
                  onChange={(e) => setCompanyId(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="editUserFormBtn">
              {error && <div className="editUserError">{error}</div>}
              <button className="editUserButton" type="submit">
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditUser;
