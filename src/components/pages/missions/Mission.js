
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import NextWeekIcon from '@mui/icons-material/NextWeek';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EditIcon from '@mui/icons-material/Edit';
import WorkerSelector from './WorkerSelector';
import Checkbox from '@mui/material/Checkbox';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Button, TextField } from '@mui/material';
import './Mission.css';
 
const Mission = (props) => {
  const [showDescription, setShowDescription] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [status, setStatus] = useState(props.mission.status || 'To Do');
  const [notes, setNotes] = useState(props.mission.notes || []);
  const [newNote, setNewNote] = useState('');
  const label = { inputProps: { 'aria-label': 'Mission Checkbox' } };
 
  const navigate = useNavigate();
 
  const toggleDescription = (event) => {
    setShowDescription(!showDescription);
    event.stopPropagation();
  };
 
  const missionChangeHandler = () => {
    navigate(`/missions/edit/${props.mission._id}`); //editmission
  };
 
  const checkBoxHandler = (event) => {
    event.stopPropagation();
    setIsDone((prevState) => !prevState);
  };
 
 
  const MissionStatusBox = ({ status }) => {
    const getStatusClass = () => {
      if (status === 'To Do') return 'status-todo';
      if (status === 'In Progress') return 'status-inprogress';
      if (status === 'Completed') return 'status-completed';
      return '';
    };}

 
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
            <div className="MissionLabel">
              <div className="MissionContent">
                <div className="missionTitle">
                  <span className="MissionName">{props.mission.title}</span>
                  <div
                    className={showDescription ? 'expansionArrow' : 'expansionArrowUp'}
                    onClick={toggleDescription}
                  >
                    <KeyboardArrowDownIcon />
                  </div>
                </div>
                <div className="filters">
                  <div className="filterContent">
                    <span className="filterTitle">Priority:</span>
                    <span className={priorityClass}>{props.mission.priority}</span>
                  </div>
                  <div className="filterContent">
                    <span className="filterTitle">City:</span>
                    <span className="City">{props.mission.city}</span>
                  </div>
                  <div className="filterContent">
                    <span className="filterTitle">Area:</span>
                    <span className="Area">{props.mission.area}</span>
                  </div>
                  <div className="filterContent">
                    <span className="filterTitle">Date:</span>
                    <span className="Date">{new Date(props.mission.created_date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <div>
                <div
                  className={`status-box ${
                    props.mission.status === 'To Do'
                      ? 'status-todo'
                      : props.mission.status === 'In Progress'
                      ? 'status-inprogress'
                      : 'status-completed'
                  }`}
                >
                  {props.mission.status.toUpperCase()}
                </div>
              </div>
              <div className="buttonContainer">
                <Link className="taskBtn" to={`/missions/MissionDetails/${props.mission._id}`} onClick={props.checkBoxHandler}>
                  <Fab size="small" color="info" aria-label="add">
                    <AssignmentIcon />
                  </Fab>
                </Link>
                <Fab size="small" color="info" aria-label="edit"  onClick={missionChangeHandler}>
                  <EditIcon />
                </Fab>
              </div>
            </div>
          </div>
          {showDescription && (
            <div className="missionDesc">
              <div>{props.mission.description}</div>
            </div>
          )}
        </div>
      );
    };
export default Mission;