import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './WorkerSelector.css';

const WorkerSelector = ({ missionId, onSelectUser }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/users', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) throw new Error('Failed to fetch users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleSelectUser = async (userId) => {
    if (!userId || !missionId) {
      console.error('User ID or Mission ID is missing');
      return;
    }

    const selectedUser = users.find(user => user._id === userId);
    if (!selectedUser) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/users/${userId}/assign-mission/${missionId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        console.log('User assigned successfully');
        onSelectUser(selectedUser);
      } else {
        console.error('Failed to assign user');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="worker-selector">
      <label htmlFor="userSelect">Assign to:</label>
      <select id="userSelect" onChange={(e) => handleSelectUser(e.target.value)}>
        <option value="">Select User</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.firstName} {user.lastName}
          </option>
        ))}
      </select>
    </div>
  );
};

WorkerSelector.propTypes = {
  missionId: PropTypes.string.isRequired,
  onSelectUser: PropTypes.func.isRequired,
};

export default WorkerSelector;
