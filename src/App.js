

import './App.css';
import Header from './components/header/Header';
import Login from './components/pages/login/Login';
import Main from './components/pages/main/Main';
import { useLocation } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Forgot from './components/pages/login/forgot/Forgot';
import CartProvider from './store/CartProvider';
import Admin from './components/pages/users/admin/Admin';
import Missions from './components/pages/missions/Missions';
import NewMission from './components/pages/missions/NewMission';
import EditMission from './components/pages/missions/EditMission';
import MissionDetails from './components/pages/missions/MissionDetails'; 
import AddUser from './components/pages/users/admin/addUser/AddUser';
import EditUser from './components/pages/users/admin/editUser/EditUser';
import ShowUser from './components/pages/users/admin/showUser/ShowUser';
import MyAccount from './components/pages/myAccount/myAccount';
import { useEffect, useState } from 'react';

function App() {
  const location = useLocation().pathname.replace('/', '');
  const [guides, setGuides] = useState([]);
  const token = localStorage.getItem('token');
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  useEffect(() => {
    var currentDate = new Date();
    var currentDateWithoutTime = currentDate.toISOString().split('T')[0];
 
    const day = localStorage.getItem('day');
    if (day !== currentDateWithoutTime) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    }
  }, []);
  
  return (
    <CartProvider>
      <div className={`App ${darkMode ? 'dark-mode' : 'light-mode'}`}>
        <Header 
          location={location} 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode} 
        />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="login" element={<Login />} />
          <Route path="forgot" element={<Forgot />} />
          <Route path="reset-password/:token" element={<Forgot />} />

        
          {token && <Route path="missions" element={<Missions />} />}
          {token && (
            <Route path="missions/newMission" element={<NewMission />} />
          )}
          {token && (
            <Route path="missions/edit/:missionId" element={<EditMission />} />
          )}
          {token && (
            <Route path="missions/MissionDetails/:missionId" element={<MissionDetails />} />
          )}
          {token && <Route path="admin" element={<Admin />} />}
          {token && <Route path="admin/addUser" element={<AddUser />} />}
          {token && (
            <Route path="admin/editUser/:userId" element={<EditUser />} />
          )}
          {token && (
            <Route path="admin/showUser/:userId" element={<ShowUser />} />
          )}
          {token && <Route path="myAccount" element={<MyAccount />} />}
        </Routes>
      </div>
    </CartProvider>
  );
}

export default App;
