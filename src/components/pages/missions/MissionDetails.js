// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { useParams } from 'react-router-dom';
// // import { Button, TextField } from '@mui/material';
// // import './MissionDetails.css';

// // const MissionDetails = () => {
// //   const { missionId } = useParams(); // Get missionId from the URL parameters
// //   const [mission, setMission] = useState(null);
// //   const [status, setStatus] = useState('');
// //   const [notes, setNotes] = useState([]);
// //   const [newNote, setNewNote] = useState(''); // Track new note input

// //   // Fetch mission details on component mount
// //   useEffect(() => {
// //     const fetchMission = async () => {
// //       try {
// //         const response = await axios.get(`http://localhost:3000/api/missions/${missionId}`);
// //         setMission(response.data);
// //         setStatus(response.data.status);
// //         setNotes(response.data.notes || []);
// //       } catch (error) {
// //         console.error('Error fetching mission:', error);
// //       }
// //     };
// //     fetchMission();
// //   }, [missionId]);

// //   // Update the page title based on the mission title
// //   useEffect(() => {
// //     if (mission) {
// //       document.title = `Mission Details - ${mission.title}`;
// //     } else {
// //       document.title = 'Loading Mission Details...';
// //     }
// //   }, [mission]);

// //   // Update mission status in the database
// //   const handleStatusChange = async (newStatus) => {
// //     try {
// //       await axios.put(`http://localhost:3000/api/missions/${missionId}`, { status: newStatus });
// //       setStatus(newStatus);
// //     } catch (error) {
// //       console.error('Failed to update status:', error);
// //     }
// //   };

// //   // Add a new note to the mission
// //   const addNote = async () => {
// //     if (!newNote.trim()) return; // Avoid empty notes
// //     const updatedNotes = [...notes, newNote];
// //     try {
// //       await axios.put(`http://localhost:3000/api/missions/${missionId}`, { notes: updatedNotes });
// //       setNotes(updatedNotes);
// //       setNewNote(''); // Clear input after adding note
// //     } catch (error) {
// //       console.error('Failed to add note:', error);
// //     }
// //   };

// //   if (!mission) return <div>Loading...</div>;

// //   return (
// //     <div>
// //       <h1>{mission.title}</h1>
// //       <p>{mission.description}</p>
// //       <p><strong>Address:</strong> {mission.address}, {mission.city}</p>
// //       <p><strong>Status:</strong> {status}</p>

// //       <div>
// //         <Button
// //           variant="contained"
// //           style={{
// //             backgroundColor: status === 'To Do' ? 'blue' : status === 'In Progress' ? 'orange' : 'green',
// //             color: '#fff',
// //             marginRight: '0.5rem',
// //           }}
// //           onClick={() => handleStatusChange('To Do')}
// //         >
// //           To Do
// //         </Button>
// //         <Button
// //           variant="contained"
// //           style={{
// //             backgroundColor: status === 'In Progress' ? 'orange' : 'gray',
// //             color: '#fff',
// //             marginRight: '0.5rem',
// //           }}
// //           onClick={() => handleStatusChange('In Progress')}
// //         >
// //           In Progress
// //         </Button>
// //         <Button
// //           variant="contained"
// //           style={{
// //             backgroundColor: status === 'Done' ? 'green' : 'gray',
// //             color: '#fff',
// //           }}
// //           onClick={() => handleStatusChange('Done')}
// //         >
// //           Done
// //         </Button>
// //       </div>

// //       <div style={{ marginTop: '1rem' }}>
// //         <h3>Notes</h3>
// //         <ul>
// //           {notes.map((note, index) => (
// //             <li key={index}>{note}</li>
// //           ))}
// //         </ul>
// //         <TextField
// //           label="Add a note"
// //           variant="outlined"
// //           size="small"
// //           value={newNote}
// //           onChange={(e) => setNewNote(e.target.value)}
// //           onKeyDown={(e) => {
// //             if (e.key === 'Enter') {
// //               e.preventDefault(); // Prevent form submission on Enter
// //               addNote();
// //             }
// //           }}
// //         />
// //         <Button
// //           variant="contained"
// //           size="small"
// //           onClick={addNote}
// //           style={{ marginTop: '0.5rem', marginLeft: '0.5rem' }}
// //         >
// //           Add Note
// //         </Button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default MissionDetails;

// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { useParams } from 'react-router-dom';
// // import { Button, TextField, Chip, Autocomplete } from '@mui/material';
// // import './MissionDetails.css';

// // const MissionDetails = () => {
// //   const { missionId } = useParams();
// //   const [mission, setMission] = useState(null);
// //   const [status, setStatus] = useState('');
// //   const [notes, setNotes] = useState([]);
// //   const [newNote, setNewNote] = useState('');
// //   const [users, setUsers] = useState([]); // Store all users from the system
// //   const [assignedUser, setAssignedUser] = useState(null); // Store selected user

// //   // Fetch mission details and all users on component mount
// //   useEffect(() => {
// //     const fetchMissionAndUsers = async () => {
// //       try {
// //         const missionResponse = await axios.get(`http://localhost:3000/api/missions/${missionId}`);
// //         setMission(missionResponse.data);
// //         setStatus(missionResponse.data.status);
// //         setNotes(missionResponse.data.notes || []);

// //         const usersResponse = await axios.get('http://localhost:3000/api/users');
// //         setUsers(usersResponse.data);
// //         setAssignedUser(missionResponse.data.assignedUser || null); // Load assigned user if exists
// //       } catch (error) {
// //         console.error('Error fetching mission or users:', error);
// //       }
// //     };
// //     fetchMissionAndUsers();
// //   }, [missionId]);

// //   // Update mission status in the database
// //   const handleStatusChange = async (newStatus) => {
// //     try {
// //       await axios.put(`http://localhost:3000/api/missions/${missionId}`, { status: newStatus });
// //       setStatus(newStatus);
// //     } catch (error) {
// //       console.error('Failed to update status:', error);
// //     }
// //   };

// //   // Add a new note to the mission
// //   const addNote = async () => {
// //     if (!newNote.trim()) return;
// //     const updatedNotes = [...notes, newNote];
// //     try {
// //       await axios.put(`http://localhost:3000/api/missions/${missionId}`, { notes: updatedNotes });
// //       setNotes(updatedNotes);
// //       setNewNote('');
// //     } catch (error) {
// //       console.error('Failed to add note:', error);
// //     }
// //   };

// //   // Update assigned user in the database
// //   const handleUserChange = async (user) => {
// //     try {
// //       await axios.put(`http://localhost:3000/api/missions/${missionId}`, { assignedUser: user._id });
// //       setAssignedUser(user);
// //     } catch (error) {
// //       console.error('Failed to update assigned user:', error);
// //     }
// //   };

// //   if (!mission) return <div>Loading...</div>;

// //   return (
// //     <div>
// //       <h1>{mission.title}</h1>
// //       <p>{mission.description}</p>
// //       <p><strong>Address:</strong> {mission.address}, {mission.city}</p>
// //       <p><strong>Status:</strong> {status}</p>

// //       {/* Status buttons */}
// //       <div>
// //         <Button
// //           variant="contained"
// //           style={{
// //             backgroundColor: status === 'To Do' ? 'blue' : status === 'In Progress' ? 'orange' : 'green',
// //             color: '#fff',
// //             marginRight: '0.5rem',
// //           }}
// //           onClick={() => handleStatusChange('To Do')}
// //         >
// //           To Do
// //         </Button>
// //         <Button
// //           variant="contained"
// //           style={{
// //             backgroundColor: status === 'In Progress' ? 'orange' : 'gray',
// //             color: '#fff',
// //             marginRight: '0.5rem',
// //           }}
// //           onClick={() => handleStatusChange('In Progress')}
// //         >
// //           In Progress
// //         </Button>
// //         <Button
// //           variant="contained"
// //           style={{
// //             backgroundColor: status === 'Done' ? 'green' : 'gray',
// //             color: '#fff',
// //           }}
// //           onClick={() => handleStatusChange('Done')}
// //         >
// //           Done
// //         </Button>
// //       </div>

// //       {/* User assignment section */}
// //       <div style={{ marginTop: '1rem' }}>
// //         <h3>Assign User</h3>
// //         <Autocomplete
// //           options={users}
// //           getOptionLabel={(user) => user.name}
// //           value={assignedUser}
// //           onChange={(event, newValue) => handleUserChange(newValue)}
// //           renderInput={(params) => <TextField {...params} label="Select User" variant="outlined" />}
// //           renderOption={(props, option) => (
// //             <li {...props} key={option._id}>
// //               {option.name}
// //             </li>
// //           )}
// //         />
// //         {assignedUser && (
// //           <div style={{ marginTop: '0.5rem' }}>
// //             <Chip label={`Assigned to: ${assignedUser.name}`} onDelete={() => handleUserChange(null)} />
// //           </div>
// //         )}
// //       </div>

// //       {/* Notes section */}
// //       <div style={{ marginTop: '1rem' }}>
// //         <h3>Notes</h3>
// //         <ul>
// //           {notes.map((note, index) => (
// //             <li key={index}>{note}</li>
// //           ))}
// //         </ul>
// //         <TextField
// //           label="Add a note"
// //           variant="outlined"
// //           size="small"
// //           value={newNote}
// //           onChange={(e) => setNewNote(e.target.value)}
// //           onKeyDown={(e) => {
// //             if (e.key === 'Enter') {
// //               e.preventDefault();
// //               addNote();
// //             }
// //           }}
// //         />
// //         <Button
// //           variant="contained"
// //           size="small"
// //           onClick={addNote}
// //           style={{ marginTop: '0.5rem', marginLeft: '0.5rem' }}
// //         >
// //           Add Note
// //         </Button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default MissionDetails;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { Button, TextField, Chip } from '@mui/material';
// import WorkerSelector from './WorkerSelector';
// import './MissionDetails.css';

// const MissionDetails = () => {
//   const { missionId } = useParams();
//   const [mission, setMission] = useState(null);
//   const [status, setStatus] = useState('');
//   const [notes, setNotes] = useState([]);
//   const [newNote, setNewNote] = useState('');
//   const [assignedUser, setAssignedUser] = useState(null);

//   // Fetch mission details on component mount
//   useEffect(() => {
//     const fetchMission = async () => {
//       try {
//         const missionResponse = await axios.get(`http://localhost:3000/api/missions/${missionId}`);
//         setMission(missionResponse.data);
//         setStatus(missionResponse.data.status);
//         setNotes(missionResponse.data.notes || []);
//         setAssignedUser(missionResponse.data.assignedUser || null);
//       } catch (error) {
//         console.error('Error fetching mission:', error);
//       }
//     };
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

//   // // Update assigned user in the UI and database
//   // const handleUserChange = async (user) => {
//   //   if (!user) return;
//   //   try {
//   //     await axios.put(`http://localhost:3000/api/missions/${missionId}/assign-user`, { userId: user._id });
//   //     setAssignedUser(user);
//   //   } catch (error) {
//   //     console.error('Failed to update assigned user:', error);
//   //   }
//   // };

//   if (!mission) return <div>Loading...</div>;

//   return (
//     <div>
//       <h1>{mission.title}</h1>
//       <p>{mission.description}</p>
//       <p><strong>Address:</strong> {mission.address}, {mission.city}</p>
//       <p><strong>Status:</strong> {status}</p>

//       {/* Status buttons */}
//       <div>
//         <Button
//           variant="contained"
//           style={{ backgroundColor: status === 'To Do' ? 'blue' : status === 'In Progress' ? 'orange' : 'green', color: '#fff', marginRight: '0.5rem' }}
//           onClick={() => handleStatusChange('To Do')}
//         >
//           To Do
//         </Button>
//         <Button
//           variant="contained"
//           style={{ backgroundColor: status === 'In Progress' ? 'orange' : 'gray', color: '#fff', marginRight: '0.5rem' }}
//           onClick={() => handleStatusChange('In Progress')}
//         >
//           In Progress
//         </Button>
//         <Button
//           variant="contained"
//           style={{ backgroundColor: status === 'Done' ? 'green' : 'gray', color: '#fff' }}
//           onClick={() => handleStatusChange('Done')}
//         >
//           Done
//         </Button>
//       </div>

//       {/* User assignment section */}
//       <div style={{ marginTop: '1rem' }}>
//         <h3>Assign User</h3>
//         <WorkerSelector missionId={missionId} onSelectUser={handleUserChange} />
//         {assignedUser && (
//           <div style={{ marginTop: '0.5rem' }}>
//             <Chip label={`Assigned to: ${assignedUser.firstName} ${assignedUser.lastName}`} onDelete={() => handleUserChange(null)} />
//           </div>
//         )}
//       </div>

//       {/* Notes section */}
//       <div style={{ marginTop: '1rem' }}>
//         <h3>Notes</h3>
//         <ul>
//           {notes.map((note, index) => (
//             <li key={index}>{note}</li>
//           ))}
//         </ul>
//         <TextField
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
//         <Button
//           variant="contained"
//           size="small"
//           onClick={addNote}
//           style={{ marginTop: '0.5rem', marginLeft: '0.5rem' }}
//         >
//           Add Note
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default MissionDetails;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { Button, TextField } from '@mui/material';
// import WorkerSelector from './WorkerSelector';
// import './MissionDetails.css';

// const MissionDetails = () => {
//   const { missionId } = useParams();
//   const [mission, setMission] = useState(null);
//   const [status, setStatus] = useState('');
//   const [notes, setNotes] = useState([]);
//   const [newNote, setNewNote] = useState('');

//   // Fetch mission details on component mount
//   useEffect(() => {
//     const fetchMission = async () => {
//       try {
//         const missionResponse = await axios.get(`http://localhost:3000/api/missions/${missionId}`);
//         setMission(missionResponse.data);
//         setStatus(missionResponse.data.status);
//         setNotes(missionResponse.data.notes || []);
//       } catch (error) {
//         console.error('Error fetching mission:', error);
//       }
//     };
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

//   if (!mission) return <div>Loading...</div>;

//   return (
//     <div>
//       <h1>{mission.title}</h1>
//       <p>{mission.description}</p>
//       <p><strong>Address:</strong> {mission.address}, {mission.city}</p>
//       <p><strong>Status:</strong> {status}</p>

//       {/* Status buttons */}
//       <div>
//         <Button
//           variant="contained"
//           style={{ backgroundColor: status === 'To Do' ? 'blue' : status === 'In Progress' ? 'orange' : 'green', color: '#fff', marginRight: '0.5rem' }}
//           onClick={() => handleStatusChange('To Do')}
//         >
//           To Do
//         </Button>
//         <Button
//           variant="contained"
//           style={{ backgroundColor: status === 'In Progress' ? 'orange' : 'gray', color: '#fff', marginRight: '0.5rem' }}
//           onClick={() => handleStatusChange('In Progress')}
//         >
//           In Progress
//         </Button>
//         <Button
//           variant="contained"
//           style={{ backgroundColor: status === 'Done' ? 'green' : 'gray', color: '#fff' }}
//           onClick={() => handleStatusChange('Done')}
//         >
//           Done
//         </Button>
//       </div>

//       {/* User assignment section */}
//       <div style={{ marginTop: '1rem' }}>
//         <h3>Assign User</h3>
//         <WorkerSelector missionId={missionId} />
//       </div>

//       {/* Notes section */}
//       <div style={{ marginTop: '1rem' }}>
//         <h3>Notes</h3>
//         <ul>
//           {notes.map((note, index) => (
//             <li key={index}>{note}</li>
//           ))}
//         </ul>
//         <TextField
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
//         <Button
//           variant="contained"
//           size="small"
//           onClick={addNote}
//           style={{ marginTop: '0.5rem', marginLeft: '0.5rem' }}
//         >
//           Add Note
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default MissionDetails;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import WorkerSelector from './WorkerSelector';
import './MissionDetails.css';

const MissionDetails = () => {
  const { missionId } = useParams();
  const [mission, setMission] = useState(null);
  const [status, setStatus] = useState('');
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  // Fetch mission details on component mount
  useEffect(() => {
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
    fetchMission();
  }, [missionId]);

  // Update mission status in the database
  const handleStatusChange = async (newStatus) => {
    try {
      await axios.put(`http://localhost:3000/api/missions/${missionId}`, { status: newStatus });
      setStatus(newStatus);
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  // Add a new note to the mission
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

  // Handle user assignment from WorkerSelector
  const handleUserChange = (userId) => {
    console.log(`User with ID ${userId} assigned to mission ${missionId}`);
  };

  if (!mission) return <div>Loading...</div>;

  return (
    <div>
      <h1>{mission.title}</h1>
      <p>{mission.description}</p>
      <p><strong>Address:</strong> {mission.address}, {mission.city}</p>
      <p><strong>Status:</strong> {status}</p>

      {/* Status buttons */}
      <div>
        <Button
          variant="contained"
          style={{ backgroundColor: status === 'To Do' ? 'blue' : status === 'In Progress' ? 'orange' : 'green', color: '#fff', marginRight: '0.5rem' }}
          onClick={() => handleStatusChange('To Do')}
        >
          To Do
        </Button>
        <Button
          variant="contained"
          style={{ backgroundColor: status === 'In Progress' ? 'orange' : 'gray', color: '#fff', marginRight: '0.5rem' }}
          onClick={() => handleStatusChange('In Progress')}
        >
          In Progress
        </Button>
        <Button
          variant="contained"
          style={{ backgroundColor: status === 'Done' ? 'green' : 'gray', color: '#fff' }}
          onClick={() => handleStatusChange('Done')}
        >
          Done
        </Button>
      </div>

      {/* User assignment section */}
      <div style={{ marginTop: '1rem' }}>
        <h3>Assign User</h3>
        <WorkerSelector missionId={missionId} onSelectUser={handleUserChange} />
      </div>

      {/* Notes section */}
      <div style={{ marginTop: '1rem' }}>
        <h3>Notes</h3>
        <ul>
          {notes.map((note, index) => (
            <li key={index}>{note}</li>
          ))}
        </ul>
        <TextField
          label="Add a note"
          variant="outlined"
          size="small"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addNote();
            }
          }}
        />
        <Button
          variant="contained"
          size="small"
          onClick={addNote}
          style={{ marginTop: '0.5rem', marginLeft: '0.5rem' }}
        >
          Add Note
        </Button>
      </div>
    </div>
  );
};

export default MissionDetails;
