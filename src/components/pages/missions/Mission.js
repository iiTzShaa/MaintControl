// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import Fab from '@mui/material/Fab';
// import NextWeekIcon from '@mui/icons-material/NextWeek';
// import WorkerSelector from './WorkerSelector';
// import Checkbox from '@mui/material/Checkbox';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import { useNavigate } from 'react-router-dom';

// const Mission = (props) => {
//   const [showDescription, setShowDescription] = useState(false);
//   const [isDone, setIsDone] = useState(false);
//   const label = { inputProps: { 'aria-label': 'Mission Checkbox' } };
//   const navigate = useNavigate();

//   const formattedDate = new Date().getTime(); // Get the current date in milliseconds
//   const missionCreatedDate = new Date(props.mission.created_date).getTime(); // Get the mission's created date in milliseconds
//   // Calculate the number of days left
//   const pastDays =
//     Math.round((formattedDate - missionCreatedDate) / (1000 * 60 * 60 * 24)) <
//     9999
//       ? Math.round((formattedDate - missionCreatedDate) / (1000 * 60 * 60 * 24))
//       : '...';

//   const arrowClass = showDescription ? 'expansionArrow' : 'expansionArrowUp';
//   const toggleDescription = (event) => {
//     setShowDescription(!showDescription);
//     event.stopPropagation();
//   };

//   const missionChangeHandler = () => {
//     if (props.editMissionClicked)
//       navigate(`/missions/edit/${props.mission.id}`);
//   };

//   const checkBoxHandler = (event) => {
//     event.stopPropagation();
//     setIsDone((prevState) => !prevState);
//   };

//   const UrgencyClass =
//     props.mission.urgency === 'High'
//       ? 'UrgencyHigh'
//       : props.mission.urgency === 'Medium'
//       ? 'UrgencyMed'
//       : props.mission.urgency === 'Low'
//       ? 'UrgencyLow'
//       : 'Urgency';

//   return (
//     <li
//       key={props.mission.id}
//       className={`MissionlistItem ${isDone ? 'done' : ''}`}
//     >
//       <div className="MissionlistItemContent">
//         <Checkbox
//           {...label}
//           sx={{
//             color: 'white',
//             '&.Mui-checked': {
//               color: 'white',
//             },
//           }}
//           onClick={checkBoxHandler}
//         />
//         <label className="MissionLabel">
//           <div className="MissionContent">
//             <div className="missionTitle">
//               <span
//                 className="MissionName"
//                 style={{ fontSize: '1.2rem', color: '#fff' }}
//                 onClick={missionChangeHandler}
//               >
//                 {props.mission.title}
//               </span>
//               <div className={arrowClass} onClick={toggleDescription}>
//                 <KeyboardArrowDownIcon />
//               </div>
//             </div>
//             <div className="filters" onClick={missionChangeHandler}>
//               <div className="filterContent">
//                 <span className="filterTitle">Urgency:</span>
//                 <span
//                   className={UrgencyClass}
//                   style={{ fontSize: '1rem', color: '#fff' }}
//                 >
//                   {props.mission.urgency}
//                 </span>
//               </div>
//               <div className="filterContent">
//                 <span className="filterTitle">City:</span>
//                 <span
//                   className="City"
//                   style={{ fontSize: '1rem', color: '#fff' }}
//                 >
//                   {props.mission.city}
//                 </span>
//               </div>
//               <div className="filterContent">
//                 <span className="filterTitle">Area:</span>
//                 <span
//                   className="Area"
//                   style={{ fontSize: '1rem', color: '#fff' }}
//                 >
//                   {props.mission.area}
//                 </span>
//               </div>
//               <div className="filterContent">
//                 <span className="filterTitle">Date:</span>
//                 <span
//                   className="Date"
//                   style={{ fontSize: '1rem', color: '#fff' }}
//                 >
//                   {props.mission.created_date}
//                 </span>
//               </div>
//               <div className="filterContentPastDays">
//                 <span className="filterTitle">Past Days:</span>
//                 <span
//                   className="PastDays"
//                   style={{ fontSize: '1rem', color: '#fff' }}
//                 >
//                   {pastDays}
//                 </span>
//               </div>
//             </div>
//           </div>
//           <WorkerSelector />
//           <Link
//             className="taskBtn"
//             to={`/task/mission/${props.mission.id}`}
//             onClick={checkBoxHandler}
//           >
//             <Fab size="small" color="info" aria-label="add">
//               <NextWeekIcon />
//             </Fab>
//           </Link>
//         </label>
//       </div>
//       {showDescription && (
//         <div className="missionDesc">{props.mission.description}</div>
//       )}
//     </li>
//   );
// };

// export default Mission;


// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Fab from '@mui/material/Fab';
// import NextWeekIcon from '@mui/icons-material/NextWeek';
// import WorkerSelector from './WorkerSelector';
// import Checkbox from '@mui/material/Checkbox';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// const Mission = (props) => {
//   const [showDescription, setShowDescription] = useState(false);
//   const [isDone, setIsDone] = useState(false);
//   const label = { inputProps: { 'aria-label': 'Mission Checkbox' } };
//   const navigate = useNavigate();

//   const formattedDate = new Date().getTime(); // Get the current date in milliseconds
//   const missionCreatedDate = new Date(props.mission.created_date).getTime(); // Get the mission's created date in milliseconds
//   // Calculate the number of days left
//   const pastDays =
//     Math.round((formattedDate - missionCreatedDate) / (1000 * 60 * 60 * 24)) < 9999
//       ? Math.round((formattedDate - missionCreatedDate) / (1000 * 60 * 60 * 24))
//       : '...';

//   const arrowClass = showDescription ? 'expansionArrow' : 'expansionArrowUp';
//   const toggleDescription = (event) => {
//     setShowDescription(!showDescription);
//     event.stopPropagation();
//   };

//   const missionChangeHandler = () => {
//     // Navigate to the edit page for the specific mission ID (_id in MongoDB)
//     navigate(`/missions/edit/${props.mission._id}`);
//   };

//   const checkBoxHandler = (event) => {
//     event.stopPropagation();
//     setIsDone((prevState) => !prevState);
//   };

//   // Determine priority class based on mission priority
//   const priorityClass =
//     props.mission.priority === 'High'
//       ? 'PriorityHigh'
//       : props.mission.priority === 'Medium'
//       ? 'PriorityMed'
//       : props.mission.priority === 'Low'
//       ? 'PriorityLow'
//       : 'Priority';

//   return (
//     <li key={props.mission._id} className={`MissionlistItem ${isDone ? 'done' : ''}`}>
//       <div className="MissionlistItemContent">
//         <Checkbox
//           {...label}
//           sx={{
//             color: 'white',
//             '&.Mui-checked': {
//               color: 'white',
//             },
//           }}
//           onClick={checkBoxHandler}
//         />
//         <label className="MissionLabel">
//           <div className="MissionContent">
//             <div className="missionTitle">
//               <span
//                 className="MissionName"
//                 style={{ fontSize: '1.2rem', color: '#fff' }}
//                 onClick={missionChangeHandler}
//               >
//                 {props.mission.title}
//               </span>
//               <div className={arrowClass} onClick={toggleDescription}>
//                 <KeyboardArrowDownIcon />
//               </div>
//             </div>
//             <div className="filters" onClick={missionChangeHandler}>
//               <div className="filterContent">
//                 <span className="filterTitle">Priority:</span>
//                 <span className={priorityClass} style={{ fontSize: '1rem', color: '#fff' }}>
//                   {props.mission.priority}
//                 </span>
//               </div>
//               <div className="filterContent">
//                 <span className="filterTitle">City:</span>
//                 <span className="City" style={{ fontSize: '1rem', color: '#fff' }}>
//                   {props.mission.city}
//                 </span>
//               </div>
//               <div className="filterContent">
//                 <span className="filterTitle">Area:</span>
//                 <span className="Area" style={{ fontSize: '1rem', color: '#fff' }}>
//                   {props.mission.area}
//                 </span>
//               </div>
//               <div className="filterContent">
//                 <span className="filterTitle">Date:</span>
//                 <span className="Date" style={{ fontSize: '1rem', color: '#fff' }}>
//                   {new Date(props.mission.created_date).toLocaleDateString('en-GB')}
//                 </span>
//               </div>
//               <div className="filterContentPastDays">
//                 <span className="filterTitle">Past Days:</span>
//                 <span className="PastDays" style={{ fontSize: '1rem', color: '#fff' }}>
//                   {pastDays}
//                 </span>
//               </div>
//             </div>
//           </div>
//           <WorkerSelector />
//           <Link
//             className="taskBtn"
//             to={`/task/mission/${props.mission._id}`}
//             onClick={checkBoxHandler}
//           >
//             <Fab size="small" color="info" aria-label="add">
//               <NextWeekIcon />
//             </Fab>
//           </Link>
//         </label>
//       </div>
//       {showDescription && (
//         <div className="missionDesc">{props.mission.description}</div>
//       )}
//     </li>
//   );
// };

// export default Mission;


// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Fab from '@mui/material/Fab';
// import NextWeekIcon from '@mui/icons-material/NextWeek';
// import WorkerSelector from './WorkerSelector';
// import Checkbox from '@mui/material/Checkbox';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// const Mission = (props) => {
//   const [showDescription, setShowDescription] = useState(false);
//   const [isDone, setIsDone] = useState(false);
//   const label = { inputProps: { 'aria-label': 'Mission Checkbox' } };
//   const navigate = useNavigate();

//   const toggleDescription = (event) => {
//     setShowDescription(!showDescription);
//     event.stopPropagation();
//   };

//   const missionChangeHandler = () => {
//     navigate(`/missions/edit/${props.mission._id}`);
//   };

//   const checkBoxHandler = (event) => {
//     event.stopPropagation();
//     setIsDone((prevState) => !prevState);
//   };

//   const priorityClass =
//     props.mission.priority === 'High'
//       ? 'PriorityHigh'
//       : props.mission.priority === 'Medium'
//       ? 'PriorityMed'
//       : props.mission.priority === 'Low'
//       ? 'PriorityLow'
//       : 'Priority';

//   return (
//     <div className={`MissionlistItem ${isDone ? 'done' : ''}`}>
//       <div className="MissionlistItemContent">
//         <Checkbox
//           {...label}
//           sx={{
//             color: 'white',
//             '&.Mui-checked': {
//               color: 'white',
//             },
//           }}
//           onClick={checkBoxHandler}
//         />
//         <label className="MissionLabel">
//           <div className="MissionContent">
//             <div className="missionTitle">
//               <span
//                 className="MissionName"
//                 style={{ fontSize: '1.2rem', color: '#fff' }}
//                 onClick={missionChangeHandler}
//               >
//                 {props.mission.title}
//               </span>
//               <div
//                 className={showDescription ? 'expansionArrow' : 'expansionArrowUp'}
//                 onClick={toggleDescription}
//               >
//                 <KeyboardArrowDownIcon />
//               </div>
//             </div>
//             <div className="filters" onClick={missionChangeHandler}>
//               <div className="filterContent">
//                 <span className="filterTitle">Priority:</span>
//                 <span className={priorityClass} style={{ fontSize: '1rem', color: '#fff' }}>
//                   {props.mission.priority}
//                 </span>
//               </div>
//               <div className="filterContent">
//                 <span className="filterTitle">City:</span>
//                 <span className="City" style={{ fontSize: '1rem', color: '#fff' }}>
//                   {props.mission.city}
//                 </span>
//               </div>
//               <div className="filterContent">
//                 <span className="filterTitle">Area:</span>
//                 <span className="Area" style={{ fontSize: '1rem', color: '#fff' }}>
//                   {props.mission.area}
//                 </span>
//               </div>
//               <div className="filterContent">
//                 <span className="filterTitle">Date:</span>
//                 <span className="Date" style={{ fontSize: '1rem', color: '#fff' }}>
//                   {props.mission.formattedDate}
//                 </span>
//               </div>
//             </div>
//           </div>
//           <WorkerSelector />
//           <Link className="taskBtn" to={`/task/mission/${props.mission._id}`} onClick={checkBoxHandler}>
//             <Fab size="small" color="info" aria-label="add">
//               <NextWeekIcon />
//             </Fab>
//           </Link>
//         </label>
//       </div>
//       {showDescription && <div className="missionDesc">{props.mission.description}</div>}
//     </div>
//   );
// };

// export default Mission;

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import NextWeekIcon from '@mui/icons-material/NextWeek';
import EditIcon from '@mui/icons-material/Edit';
import WorkerSelector from './WorkerSelector';
import Checkbox from '@mui/material/Checkbox';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import './Mission.css';

const Mission = (props) => {
  const [showDescription, setShowDescription] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // Track selected user ID
  const label = { inputProps: { 'aria-label': 'Mission Checkbox' } };

  const navigate = useNavigate();

  const toggleDescription = (event) => {
    setShowDescription(!showDescription);
    event.stopPropagation();
  };

  const missionChangeHandler = () => {
    navigate(`/missions/edit/${props.mission._id}`);
  };

  const checkBoxHandler = (event) => {
    event.stopPropagation();
    setIsDone((prevState) => !prevState);
  };

  const handleUserSelect = (userId) => {
    setSelectedUser(userId);
  };

  const priorityClass =
    props.mission.priority === 'High'
      ? 'UrgencyHigh'
      : props.mission.priority === 'Medium'
      ? 'UrgencyMed'
      : props.mission.priority === 'Low'
      ? 'UrgencyLow'
      : 'Priority';

  return (
    <div className={`MissionlistItem ${isDone ? 'done' : ''}`}>
      <div className="MissionlistItemContent">
        <label className="MissionLabel">
          <div className="MissionContent">
            <div className="missionTitle">
              <span className="MissionName">
                {props.mission.title}
              </span>
              <div
                className={showDescription ? 'expansionArrow' : 'expansionArrowUp'}
                onClick={toggleDescription}
              >
                <KeyboardArrowDownIcon />
              </div>
            </div>
            <div className="filters" >
              <div className="filterContent">
                <span className="filterTitle">Priority:</span>
                <span className={priorityClass}>
                  {props.mission.priority}
                </span>
              </div>
              <div className="filterContent">
                <span className="filterTitle">City:</span>
                <span className="City">
                  {props.mission.city}
                </span>
              </div>
              <div className="filterContent">
                <span className="filterTitle">Area:</span>
                <span className="Area">
                  {props.mission.area}
                </span>
              </div>
              <div className="filterContent">
                <span className="filterTitle">Date:</span>
                <span className="Date">
                  {props.mission.formattedDate}
                </span>
              </div>
            </div>
          </div>
          {/* WorkerSelector component to select a user for the mission */}
          <WorkerSelector
            missionId={props.mission._id} // Pass missionId to WorkerSelector
            onSelectUser={(userId) => setSelectedUser(userId)} // Update selectedUser when a user is assigned
          />
          <Link className="taskBtn" to={`/task/mission/${props.mission._id}`} onClick={checkBoxHandler}>
            <Fab size="small" color="info" aria-label="add">
              <NextWeekIcon />
            </Fab>
          </div>
        </label>
      </div>

      {showDescription && <div className="missionDesc">{props.mission.description}</div>}
    </div>
  );
};

export default Mission;

