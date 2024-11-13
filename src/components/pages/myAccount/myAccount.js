import React, { useState, useEffect } from 'react';
import './myAccount.css';

const MyAccount = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("No token found in localStorage. Redirecting to login.");
      return;
    }

    setLoading(true);
    async function getUserDetails() {
      try {
        const response = await fetch(`http://localhost:3000/users/current`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        setUser(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    }
    getUserDetails();
  }, []);

  if (loading) return <span className="loader"></span>;

  if (!user) return <div>No user data available</div>;

  return (
    <div className="myAccountBox">
      <div className="leftSection">
        <form className="myAccountFormContent">
          <label className="myAccountLabel">
            Username:
            <input className="myAccountInput" value={user.username} readOnly />
          </label>
          <label className="myAccountLabel">
            Full Name:
            <input className="myAccountInput" value={`${user.firstName} ${user.lastName}`} readOnly />
          </label>
          <label className="myAccountLabel">
            Authorization:
            <input className="myAccountInput" value={user.authorization} readOnly />
          </label>
          <label className="myAccountLabel">
            Company ID:
            <input className="myAccountInput" value={user.companyId} readOnly />
          </label>
          <label className="myAccountLabel">
            Phone Number:
            <input className="myAccountInput" value={user.phoneNumber} readOnly />
          </label>
        </form>
      </div>

      <div className="rightSection">
        <h3 className="missionsTitle">Assigned Missions:</h3>
        {user.missions && user.missions.length > 0 ? (
          <ul className="missionsList">
            {user.missions.map((mission) => (
              <li key={mission._id} className="missionItem">
                {mission.title} - {mission.city}
              </li>
            ))}
          </ul>
        ) : (
            <p style={{ color: 'white' }}>No missions assigned</p>
        )}
      </div>
    </div>
  );
};

export default MyAccount;
