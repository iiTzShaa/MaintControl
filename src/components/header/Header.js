import './Header.css';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Logo from '../../images/logo.png';
import { Link, useLocation } from 'react-router-dom';
import AccountMenu from '../menuComp/AccountMenu';

const Header = (props) => {
  const location = useLocation();
  const pageNameHandler = (pageName) => {
    const path = location.pathname;
    if (path.includes('task/mission') && !path.includes('/fill/')) return 'Task Page';
    if (path.includes('admin/editUser')) return 'Edit A User';
    if (path.includes('admin/showUser')) return 'User Details';
    if (path.includes('missions/edit')) return 'Edit a Mission';
    if (path.includes('/fill/')) return 'Filling a Task';

    if (path.startsWith('/missions/MissionDetails')) return 'Mission Details';
    switch (path) {
      case '/':
        return 'Main Page';
      case '/login':
        return 'Login Page';
      case '/forgot':
        return 'Password Reset';
      case '/missions':
        return 'Daily Missions';
      case '/missions/newMission':
        return 'Create A New Mission';
      case '/admin':
        return 'Admin Page';
      case '/admin/addUser':
        return 'Add a User';
      case '/myAccount':
        return 'My Account Page';
      case '/map':
        return 'Management Map';
      default:
        return 'Unknown Page';
    }
  };
  return (
    <div className="header">
      <div className="buttonsContent">
        <AccountMenu icon={MenuIcon} />
        <div className="searchBarContent">
        </div>
      </div>
      <div className="pageName">{pageNameHandler(props.location)}</div>
      <div className="logoBox">
        <Link to="/">
          <img className="logo" src={Logo} alt="logo" />
        </Link>
      </div>
    </div>
  );
};

export default Header;
