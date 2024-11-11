import { Link } from 'react-router-dom';
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { useState, useEffect } from 'react';
import './Admin.css';

const token = localStorage.getItem('token');

// פונקציה לשליפת משתמשים מהשרת
async function getUsers() {
  try {
    const response = await fetch('http://localhost:3000/users', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// פונקציה למחיקת משתמש לפי ID
async function deleteUser(userId) {
  try {
    const response = await fetch(`http://localhost:3000/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  } catch (err) {
    console.error('Failed to delete user:', err);
    throw err;
  }
}

const Admin = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [checkedRoles, setCheckedRoles] = useState({
    administrator: true,
    manager: true,
    maintenance: true,
  });
  const [page, setPage] = useState(0);
  const usersPerPage = 10;
  const startIndex = page * usersPerPage;
  const endIndex = startIndex + usersPerPage;

  useEffect(() => {
    getUsers()
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => console.error(err));
  }, []);

  // סינון משתמשים לפי תפקיד ומונח חיפוש
  const filteredUsers = users.filter(
    (user) =>
      (checkedRoles.administrator && user.authorization === 'administrator') ||
      (checkedRoles.manager && user.authorization === 'manager') ||
      (checkedRoles.maintenance && user.authorization === 'maintenance')
  ).filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedUsers = filteredUsers.slice(startIndex, endIndex);

  // פונקציה לטיפול במחיקת משתמש
  const handleDeleteUser = (userId) => {
    deleteUser(userId)
      .then(() => {
        setUsers(users.filter((user) => user._id !== userId));
      })
      .catch((err) => console.error('Error deleting user:', err));
  };

  return (
    <div className="listContainer">
      <div className="searchAndButtonContainer">
        <input
          className="searchUser"
          type="text"
          placeholder="Search a user..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <div className="usersButtons">
          <Link to="addUser" className="addIcon">
            <AddIcon />
          </Link>
        </div>
      </div>
      <div className="checkBoxContainer">
        <FormGroup sx={{ display: 'flex', flexDirection: 'row' }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedRoles.administrator}
                onChange={(event) =>
                  setCheckedRoles({ ...checkedRoles, administrator: event.target.checked })
                }
              />
            }
            label="Administrator"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedRoles.manager}
                onChange={(event) =>
                  setCheckedRoles({ ...checkedRoles, manager: event.target.checked })
                }
              />
            }
            label="Manager"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedRoles.maintenance}
                onChange={(event) =>
                  setCheckedRoles({ ...checkedRoles, maintenance: event.target.checked })
                }
              />
            }
            label="Maintenance"
          />
        </FormGroup>
      </div>

      <List className="list">
        <ListSubheader className="listSubHeader">Users</ListSubheader>
        {displayedUsers.length === 0 ? (
          <ListItemText primary="User not exist" />
        ) : (
          displayedUsers.map((user) => (
            <ListItem className="listItem" key={user._id}>
              <Link to={`/admin/showUser/${user._id}`}>
                <ListItemText
                  primary={`${user.firstName} ${user.lastName}`}
                  secondary={`${user.authorization}`}
                />
              </Link>
              <Link to={`/admin/editUser/${user._id}`} className="editIcon">
                <EditIcon />
              </Link>
              <DeleteIcon
                className="deleteIcon"
                onClick={() => handleDeleteUser(user._id)}
                style={{ cursor: 'pointer' }}
              />
            </ListItem>
          ))
        )}
      </List>

      <div className="btnPages">
        {page > 0 && (
          <ArrowLeftIcon className="btnPrevious" onClick={() => setPage(page - 1)} />
        )}
        {endIndex < filteredUsers.length && (
          <ArrowRightIcon className="btnNext" onClick={() => setPage(page + 1)} />
        )}
      </div>
    </div>
  );
};

export default Admin;
