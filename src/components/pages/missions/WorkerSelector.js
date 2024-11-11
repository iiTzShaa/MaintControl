// // import { useState } from "react";
// // import Box from "@mui/material/Box";
// // import InputLabel from "@mui/material/InputLabel";
// // import MenuItem from "@mui/material/MenuItem";
// // import FormControl from "@mui/material/FormControl";
// // import Select from "@mui/material/Select";

// // export default function WorkerSelector() {
// //   const [avilUser, setAvailUser] = useState("");

// //   const handleChange = (event) => {
// //     setAvailUser(event.target.value);
// //   };

// //   return (
// //     <Box
// //       sx={{
// //         minWidth: 220,
// //         marginLeft: "auto",
// //       }}
// //     >
// //       <FormControl fullWidth>
// //         <InputLabel id="available-users-select-label" sx={{ color: "white" }}>
// //           Available Users
// //         </InputLabel>
// //         <Select
// //           sx={{
// //             color: "white",
// //           }}
// //           labelId="available-users-select-label"
// //           id="available-users-select"
// //           value={avilUser}
// //           label="Available Users"
// //           onChange={handleChange}
// //         >
// //           <MenuItem value={0}>None</MenuItem>
// //           <MenuItem value={10}>User 1</MenuItem>
// //           <MenuItem value={20}>User 2</MenuItem>
// //           <MenuItem value={30}>User 3</MenuItem>
// //           <MenuItem value={40}>User 4</MenuItem>
// //           <MenuItem value={50}>User 5</MenuItem>
// //           <MenuItem value={60}>User 6</MenuItem>
// //         </Select>
// //       </FormControl>
// //     </Box>
// //   );
// // }


// import React, { useState, useEffect } from 'react';

// const WorkerSelector = ({ onSelectUser }) => {
//   const [users, setUsers] = useState([]);

  
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await fetch('http://localhost:3000/users'); 
//         if (!response.ok) {
//           throw new Error('Failed to fetch users');
//         }
//         const data = await response.json();
//         console.log('Fetched users:', data); 
//         setUsers(data);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       }
//     };
//     fetchUsers();
//   }, []);

//   return (
//     <div className="worker-selector">
//       <label htmlFor="userSelect" style={{ color: '#fff', marginRight: '10px' }}>Available Users</label>
//       <select id="userSelect" onChange={(e) => onSelectUser(e.target.value)}>
//         <option value="">Select User</option>
//         {users.map((user) => (
//           <option key={user._id} value={user._id}>
//             {user.firstName} {user.lastName} {}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default WorkerSelector;

// import React, { useState, useEffect } from 'react';

// const WorkerSelector = ({ missionId }) => {
//   const [users, setUsers] = useState([]);

//   // Fetch users on component mount
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await fetch('http://localhost:3000/users'); // Replace with your backend endpoint
//         if (!response.ok) {
//           throw new Error('Failed to fetch users');
//         }
//         const data = await response.json();
//         console.log('Fetched users:', data); 
//         setUsers(data);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       }
//     };
//     fetchUsers();
//   }, []);

//   // Function to handle user selection and assign to mission
//   const onSelectUser = async (userId) => {
//     if (!userId) return;

//     try {
//       const response = await fetch(`http://localhost:3000/users/${userId}/assign-mission/${missionId}`, { // Replace with your backend endpoint
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ userId, missionId }),
//       });

//       if (response.ok) {
//         console.log("User assigned successfully");
//         // Optionally, update the UI or fetch the updated data here
//       } else {
//         console.error("Failed to assign user");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <div className="worker-selector">
//       <label htmlFor="userSelect" style={{ color: '#fff', marginRight: '10px' }}>Available Users</label>
//       <select id="userSelect" onChange={(e) => onSelectUser(e.target.value)}>
//         <option value="">Select User</option>
//         {users.map((user) => (
//           <option key={user._id} value={user._id}>
//             {user.firstName} {user.lastName}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default WorkerSelector;

// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

// const WorkerSelector = ({ missionId, onSelectUser }) => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await fetch('http://localhost:3000/users');
//         if (!response.ok) throw new Error('Failed to fetch users');
//         const data = await response.json();
//         setUsers(data);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       }
//     };
//     fetchUsers();
//   }, []);

//   const handleSelectUser = async (userId) => {
//     if (!userId || !missionId) {
//       console.error('User ID or Mission ID is missing');
//       return;
//     }

//     try {
//       const response = await fetch(`http://localhost:3000/users/${userId}/assign-mission/${missionId}`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//       });

//       if (response.ok) {
//         console.log('User assigned successfully');
//         onSelectUser(userId); // Update the selected user ID in the parent component
//       } else {
//         console.error('Failed to assign user');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div className="worker-selector">

//       <label htmlFor="userSelect" style={{ color: '#fff', marginRight: '10px' }}>Assigen to:</label>
//       <select id="userSelect" onChange={(e) => onSelectUser(e.target.value)}>
//         <option value="">Select User</option>
//         {users.map((user) => (
//           <option key={user._id} value={user._id}>
//             {user.firstName} {user.lastName}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// WorkerSelector.propTypes = {
//   missionId: PropTypes.string.isRequired,
//   onSelectUser: PropTypes.func.isRequired,
// };

// export default WorkerSelector;

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const WorkerSelector = ({ missionId, onSelectUser }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token'); // קבלת ה-token מתוך localStorage
        const response = await fetch('http://localhost:3000/users', {
          headers: {
            'Authorization': `Bearer ${token}` // הוספת ה-token לכותרת Authorization
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
      const response = await fetch(`http://localhost:3000/users/${userId}/assign-mission/${missionId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
      <label htmlFor="userSelect" style={{ color: 'black', marginRight: '10px' }}>Assign to:</label>
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
