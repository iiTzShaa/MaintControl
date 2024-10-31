// import { useState } from "react";
// import Box from "@mui/material/Box";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";

// export default function WorkerSelector() {
//   const [avilUser, setAvailUser] = useState("");

//   const handleChange = (event) => {
//     setAvailUser(event.target.value);
//   };

//   return (
//     <Box
//       sx={{
//         minWidth: 220,
//         marginLeft: "auto",
//       }}
//     >
//       <FormControl fullWidth>
//         <InputLabel id="available-users-select-label" sx={{ color: "white" }}>
//           Available Users
//         </InputLabel>
//         <Select
//           sx={{
//             color: "white",
//           }}
//           labelId="available-users-select-label"
//           id="available-users-select"
//           value={avilUser}
//           label="Available Users"
//           onChange={handleChange}
//         >
//           <MenuItem value={0}>None</MenuItem>
//           <MenuItem value={10}>User 1</MenuItem>
//           <MenuItem value={20}>User 2</MenuItem>
//           <MenuItem value={30}>User 3</MenuItem>
//           <MenuItem value={40}>User 4</MenuItem>
//           <MenuItem value={50}>User 5</MenuItem>
//           <MenuItem value={60}>User 6</MenuItem>
//         </Select>
//       </FormControl>
//     </Box>
//   );
// }


import React, { useState, useEffect } from 'react';

const WorkerSelector = ({ onSelectUser }) => {
  const [users, setUsers] = useState([]);

  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/users'); 
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        console.log('Fetched users:', data); 
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="worker-selector">
      <label htmlFor="userSelect" style={{ color: '#fff', marginRight: '10px' }}>Available Users</label>
      <select id="userSelect" onChange={(e) => onSelectUser(e.target.value)}>
        <option value="">Select User</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.firstName} {user.lastName} {}
          </option>
        ))}
      </select>
    </div>
  );
};

export default WorkerSelector;
