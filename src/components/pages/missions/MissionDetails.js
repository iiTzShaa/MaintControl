// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { Button, TextField, IconButton } from '@mui/material';
// import WorkerSelector from './WorkerSelector';
// import DeleteIcon from '@mui/icons-material/Delete';
// import './MissionDetails.css';
 
// const MissionDetails = () => {
//   const { missionId } = useParams();
//   const [mission, setMission] = useState(null);
//   const [status, setStatus] = useState('');
//   const [notes, setNotes] = useState([]);
//   const [newNote, setNewNote] = useState('');
 
//   // Fetch mission details on component mount
//   const fetchMission = async () => {
//     try {
//       const missionResponse = await axios.get(`http://localhost:3000/api/missions/${missionId}`);
//       setMission(missionResponse.data);
//       setStatus(missionResponse.data.status);
//       setNotes(missionResponse.data.notes || []);
//     } catch (error) {
//       console.error('Error fetching mission:', error);
//     }
//   };
 
//   useEffect(() => {
//     fetchMission();
//   }, [missionId]);
 
//   // Update mission status in the database
//   const handleStatusChange = async (newStatus) => {
//     try {
//       await axios.put(`http://localhost:3000/api/missions/${missionId}`, { status: newStatus });
//       setStatus(newStatus);
//     } catch (error) {
//       console.error('Failed to update status:', error);
//     }
//   };
 
//   // Add a new note to the mission
//   const addNote = async () => {
//     if (!newNote.trim()) return;
//     const updatedNotes = [...notes, newNote];
//     try {
//       await axios.put(`http://localhost:3000/api/missions/${missionId}`, { notes: updatedNotes });
//       setNotes(updatedNotes);
//       setNewNote('');
//     } catch (error) {
//       console.error('Failed to add note:', error);
//     }
//   };
 
//   // Handle user assignment from WorkerSelector
//   const handleUserChange = async (userId) => {
//     try {
//       await axios.post(`http://localhost:3000/api/users/${userId}/assign-mission/${missionId}`);
//       await fetchMission(); // Refresh mission data
//     } catch (error) {
//       console.error('Failed to assign user to mission:', error);
//     }
//   };
 
//   // Release a user from the mission
//   const releaseUserFromMission = async (userId) => {
//     try {
//       await axios.post(`http://localhost:3000/users/${userId}/release-mission/${missionId}`);
//       await fetchMission(); // Refresh mission data after user is released
//     } catch (error) {
//       console.error('Failed to release user from mission:', error);
//     }
//   };
 
//   if (!mission) return <div>Loading...</div>;
 
//   return (
// <div>
// <h1>{mission.title}</h1>
// <p>{mission.description}</p>
// <p><strong>Address:</strong> {mission.address}, {mission.city}</p>
// <p><strong>Status:</strong> {status}</p>
 
//       {/* Status buttons */}
// <div>
// <Button
//           variant="contained"
//           style={{ backgroundColor: status === 'To Do' ? 'blue' : status === 'In Progress' ? 'orange' : 'green', color: '#fff', marginRight: '0.5rem' }}
//           onClick={() => handleStatusChange('To Do')}
// >
//           To Do
// </Button>
// <Button
//           variant="contained"
//           style={{ backgroundColor: status === 'In Progress' ? 'orange' : 'gray', color: '#fff', marginRight: '0.5rem' }}
//           onClick={() => handleStatusChange('In Progress')}
// >
//           In Progress
// </Button>
// <Button
//           variant="contained"
//           style={{ backgroundColor: status === 'Done' ? 'green' : 'gray', color: '#fff' }}
//           onClick={() => handleStatusChange('Done')}
// >
//           Done
// </Button>
// </div>
 
//       {/* User assignment section */}
// <div style={{ marginTop: '1rem' }}>
// <h3>Assign User</h3>
// <WorkerSelector missionId={missionId} onSelectUser={handleUserChange} />
// </div>
 
//       {/* Users assigned to the mission */}
// <div style={{ marginTop: '1rem' }}>
// <h3>Assigned Users</h3>
// <table>
// <thead>
// <tr>
// <th>First Name</th>
// <th>Last Name</th>
// <th>Phone Number</th>
// <th>Actions</th>
// </tr>
// </thead>
// <tbody>
//             {mission.users && mission.users.map((user) => (
// <tr key={user._id}>
// <td>{user.firstName}</td>
// <td>{user.lastName}</td>
// <td>{user.phoneNumber}</td>
// <td>
// <IconButton
//                     onClick={() => releaseUserFromMission(user._id)}
// >
// <DeleteIcon style={{ cursor: 'pointer' }} />
// </IconButton>
// </td>
// </tr>
//             ))}
// </tbody>
// </table>
// </div>
 
//       {/* Notes section */}
// <div style={{ marginTop: '1rem' }}>
// <h3>Notes</h3>
// <ul>
//           {notes.map((note, index) => (
// <li key={index}>{note}</li>
//           ))}
// </ul>
// <TextField
//           label="Add a note"
//           variant="outlined"
//           size="small"
//           value={newNote}
//           onChange={(e) => setNewNote(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === 'Enter') {
//               e.preventDefault();
//               addNote();
//             }
//           }}
//         />
// <Button
//           variant="contained"
//           size="small"
//           onClick={addNote}
//           style={{ marginTop: '0.5rem', marginLeft: '0.5rem' }}
// >
//           Add Note
// </Button>
// </div>
// </div>
//   );
// };
 
// export default MissionDetails;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button, TextField, IconButton } from '@mui/material';
import WorkerSelector from './WorkerSelector';
import DeleteIcon from '@mui/icons-material/Delete';
import './MissionDetails.css';

const MissionDetails = ({ darkMode }) => {
  const { missionId } = useParams();
  const [mission, setMission] = useState(null);
  const [status, setStatus] = useState('');
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    fetchMission();
  }, [missionId]);

  const fetchMission = async () => {
    try {
      const missionResponse = await axios.get(`http://localhost:3000/api/missions/${missionId}`);
      setMission(missionResponse.data);
      setStatus(missionResponse.data.status);
      setNotes(missionResponse.data.notes || []);
    } catch (error) {
      console.error('Error fetching mission:', error);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      await axios.put(`http://localhost:3000/api/missions/${missionId}`, { status: newStatus });
      setStatus(newStatus);
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const addNote = async () => {
    if (!newNote.trim()) return;
    const updatedNotes = [...notes, newNote];
    try {
      await axios.put(`http://localhost:3000/api/missions/${missionId}`, { notes: updatedNotes });
      setNotes(updatedNotes);
      setNewNote('');
    } catch (error) {
      console.error('Failed to add note:', error);
    }
  };

  const handleUserChange = async (userId) => {
    try {
      const response = await axios.post(`http://localhost:3000/users/${userId}/assign-mission/${missionId}`);
      setMission((prevMission) => ({
        ...prevMission,
        users: [...prevMission.users, response.data.user],
      }));
    } catch (error) {
      console.error('Failed to assign user:', error);
    }
  };

  const releaseUserFromMission = async (userId) => {
    try {
      await axios.post(`http://localhost:3000/users/${userId}/release-mission/${missionId}`);
      setMission((prevMission) => ({
        ...prevMission,
        users: prevMission.users.filter((user) => user._id !== userId),
      }));
    } catch (error) {
      console.error('Failed to release user:', error);
    }
  };

  if (!mission) return <div>Loading...</div>;

  return (
    <div className={`missionDetailsContainer ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <h1 className="missionTitle">{mission.title}</h1>
      <p className="missionDescription">{mission.description}</p>
      <p><strong>Address:</strong> {mission.address}, {mission.city}</p>
      <p><strong>Status:</strong> {status}</p>

      <div className="statusButtons">
        {['To Do', 'In Progress', 'Done'].map((statusOption) => (
          <Button
            key={statusOption}
            variant="contained"
            style={{ backgroundColor: status === statusOption ? '#1a73e8' : 'gray', color: '#fff' }}
            onClick={() => handleStatusChange(statusOption)}
          >
            {statusOption}
          </Button>
        ))}
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3>Assign User</h3>
        <WorkerSelector missionId={missionId} onSelectUser={handleUserChange} />
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3>Assigned Users</h3>
        <table className="assignedUsersTable">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mission.users?.map((user) => (
              <tr key={user._id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.phoneNumber}</td>
                <td>
                  <IconButton onClick={() => releaseUserFromMission(user._id)}>
                    <DeleteIcon />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="notesSection">
        <h3>Notes</h3>
        <ul>
          {notes.map((note, index) => (
            <li key={index} className="noteItem">{note}</li>
          ))}
        </ul>
        <div className="addNoteSection">
          <TextField
            label="Add a note"
            variant="outlined"
            size="small"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addNote()}
          />
          <Button variant="contained" onClick={addNote}>Add Note</Button>
        </div>
      </div>
    </div>
  );
};

export default MissionDetails;