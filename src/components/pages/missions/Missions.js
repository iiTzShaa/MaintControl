import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxIcon from '@mui/icons-material/CheckBox'; 
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'; 
import Mission from './Mission';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TextRotateVerticalIcon from '@mui/icons-material/TextRotateVertical';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import './Missions.css';
import axios from 'axios';

const Missions = () => {
  const [missions, setMissions] = useState([]);
  const [selectedMissions, setSelectedMissions] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [sortingOrderDate, setSortingOrderDate] = useState('asc');
  const [sortingOrderAlph, setSortingOrderAlph] = useState('asc');
  const [sortingOrderCity, setSortingOrderCity] = useState('asc');
  const [sortingOrderPri, setSortingOrderPri] = useState('asc');
  const [searchCity, setSearchCity] = useState('');
  const [filter, setFilter] = useState('created_date');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleFilter = (event, newFilter) => {
    if (newFilter !== null) {
      setFilter(newFilter);
    }
  };

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/missions');
        setMissions(response.data);
      } catch (error) {
        console.error('Error fetching missions:', error);
      }
    };
    fetchMissions();
  }, []);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) setUsername(storedUsername);
  }, []);
  
  const handleSelectMission = (missionId) => {
    setSelectedMissions((prevSelected) =>
      prevSelected.includes(missionId)
        ? prevSelected.filter((id) => id !== missionId)
        : [...prevSelected, missionId]
    );
  };

  const sortingHandlerDate = () => setSortingOrderDate(sortingOrderDate === 'asc' ? 'desc' : 'asc');
  const sortingHandlerAlph = () => setSortingOrderAlph(sortingOrderAlph === 'asc' ? 'desc' : 'asc');
  const sortingHandlerCity = () => setSortingOrderCity(sortingOrderCity === 'asc' ? 'desc' : 'asc');
  const sortingHandlerPri = () => setSortingOrderPri(sortingOrderPri === 'asc' ? 'desc' : 'asc');

  const deleteSelectedMissions = async () => {
    try {
      await Promise.all(
        selectedMissions.map((missionId) =>
          axios.delete(`http://localhost:3000/api/missions/${missionId}`)
        )
      );
      setMissions((prevMissions) =>
        prevMissions.filter((mission) => !selectedMissions.includes(mission._id))
      );
      setSelectedMissions([]);
    } catch (error) {
      console.error('Error deleting missions:', error);
    }
  };


  let filteredMissions = missions.filter((mission) =>
    mission.city.toLowerCase().includes(searchCity.toLowerCase())
  );

  if (filter === 'abc' && sortingOrderAlph === 'asc') {
    filteredMissions = filteredMissions.sort((a, b) => a.title.localeCompare(b.title));
  } else if (filter === 'abc' && sortingOrderAlph === 'desc') {
    filteredMissions = filteredMissions.sort((a, b) => b.title.localeCompare(a.title));
  }

  if (filter === 'city' && sortingOrderCity === 'asc') {
    filteredMissions = filteredMissions.sort((a, b) => a.city.localeCompare(b.city));
  } else if (filter === 'city' && sortingOrderCity === 'desc') {
    filteredMissions = filteredMissions.sort((a, b) => b.city.localeCompare(a.city));
  }

  if (filter === 'created_date' && sortingOrderDate === 'asc') {
    filteredMissions = filteredMissions.sort((a, b) => new Date(a.created_date) - new Date(b.created_date));
  } else if (filter === 'created_date' && sortingOrderDate === 'desc') {
    filteredMissions = filteredMissions.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
  }

  const priorityValues = {
    High: 3,
    Medium: 2,
    Low: 1,
  };

  if (filter === 'priority') {
    filteredMissions = filteredMissions.sort((a, b) => {
      return sortingOrderPri === 'asc'
        ? priorityValues[a.priority] - priorityValues[b.priority]
        : priorityValues[b.priority] - priorityValues[a.priority];
    });
  }
  const handleEditClick = (missionId) => {
    navigate(`/missions/edit/${missionId}`);
  };

  const filteredMissionsSerch = missions.filter((mission) =>
    mission.city.toLowerCase().includes(searchCity.toLowerCase())
  );

  return (
    <div className="MissionsTableBox">
      <div className="MissionsBtnsBox">
      <div className="Welcome">Welcome {username}, Total missions: {missions.length}</div>
        <input
          type="text"
          placeholder="Search by city"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          className="searchBarByCity"
        />

        <div className="actionsContainer">
        <Link to="/missions/newMission">
          <Fab 
            size="small" 
            color="primary" 
            aria-label="add"
            style={{ marginLeft: '10px', marginTop: '-10px' }}
            >
      <AddIcon />
    </Fab>
  </Link>
  <Fab
    size="small"
    aria-label="delete"
    onClick={deleteSelectedMissions}
    disabled={selectedMissions.length === 0}
    style={{marginLeft: '10px', marginTop: '-10px' }}
  >
    <DeleteIcon />
  </Fab>
  <ToggleButtonGroup
    value={filter}
    exclusive
    onChange={handleFilter}
    aria-label="set filter"
  >
    <ToggleButton value="created_date" onClick={sortingHandlerDate}>
      <CalendarMonthIcon />
    </ToggleButton>
    <ToggleButton value="abc" onClick={sortingHandlerAlph}>
      <TextRotateVerticalIcon />
    </ToggleButton>
    <ToggleButton value="city" onClick={sortingHandlerCity}>
      <LocationCityIcon />
    </ToggleButton>
    <ToggleButton value="priority" onClick={sortingHandlerPri}>
      <PriorityHighIcon />
    </ToggleButton>
  </ToggleButtonGroup>
</div>
      </div>
      <div className="MissionsTable">
        <ul className="Missions">
          {filteredMissions.map((mission) => (
            <li key={mission._id} className="MissionItem">
              <Checkbox
                checked={selectedMissions.includes(mission._id)}
                onChange={() => handleSelectMission(mission._id)}
                inputProps={{ 'aria-label': 'Mission Checkbox' }}
                sx={{
                  color: 'white', 
                  '&.Mui-checked': {
                    color: 'black', 
                  },
                }}
              />
              <Mission 
                mission={mission}
                onEdit={() => handleEditClick(mission._id)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Missions;
