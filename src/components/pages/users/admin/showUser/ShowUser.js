// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// import './ShowUser.css';

// const token = localStorage.getItem('token');

// async function getUsers() {
//   try {
//     const response = await fetch(
//       'https://maint-control-docker-image-2n3aq2y4ja-zf.a.run.app/users/getUsers?OFFSET=0&LIMIT=100',
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     if (!response.ok) {
//       throw new Error(response.statusText);
//     }
//     const data = await response.json();
//     return data.answer;
//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// }

// const ShowUser = () => {
//   const { userId } = useParams();
//   const [loading, setLoading] = useState(false);
//   const [users, setUsers] = useState([]);
//   const [showPassword, setShowPassword] = useState(false); // new state to track whether to show or hide the password

//   useEffect(() => {
//     setLoading(true);
//     getUsers()
//       .then((data) => {
//         setUsers(data);
//         setLoading(false);
//       })
//       .catch((err) => console.error(err));
//   }, []);

//   const handleShowPassword = () => {
//     setShowPassword(!showPassword); // toggle showPassword state
//   };

//   if (users.length) {
//     const displayedUser = users.find(
//       (user) => user.user_id === parseInt(userId)
//     );

//     console.log(displayedUser);

//     return (
//       <div>
//         {loading ? (
//           <span className="loader"></span>
//         ) : (
//           <div className="showUserBox">
//             <form className="showUserForm">
//               <div className="showUserFormContent">
//                 <label className="showUserLabel" htmlFor="username">
//                   Username:
//                   <input
//                     id="username"
//                     className="showUserInput"
//                     value={displayedUser.user_name}
//                     readOnly={true}
//                   />
//                 </label>
//                 <label className="showUserLabel" htmlFor="pass">
//                   Password:
//                   <div className="passContent">
//                     <input
//                       id="pass"
//                       className="showUserInput"
//                       type={showPassword ? 'text' : 'password'}
//                       value={displayedUser.password}
//                       readOnly={true}
//                     />
//                     {showPassword ? (
//                       <VisibilityIcon
//                         className="eye"
//                         onClick={handleShowPassword}
//                       />
//                     ) : (
//                       <VisibilityOffIcon
//                         className="eyeOff"
//                         onClick={handleShowPassword}
//                       />
//                     )}
//                   </div>
//                 </label>
//                 <label className="showUserLabel" htmlFor="firstName">
//                   First name:
//                   <input
//                     id="firstName"
//                     className="showUserInput"
//                     type="text"
//                     value={displayedUser.first_name}
//                     readOnly={true}
//                   />
//                 </label>
//                 <label className="showUserLabel" htmlFor="LastName">
//                   Last name:
//                   <input
//                     id="lastName"
//                     className="showUserInput"
//                     type="text"
//                     value={displayedUser.last_name}
//                     readOnly={true}
//                   />
//                 </label>
//                 <label className="showUserLabel" htmlFor="Email">
//                   Email address:
//                   <input
//                     id="email"
//                     className="showUserInput"
//                     type="text"
//                     value={displayedUser.email}
//                     readOnly={true}
//                   />
//                 </label>
//                 <label className="showUserLabel" htmlFor="phoneNumber">
//                   Phone number:
//                   <input
//                     id="phoneNumber"
//                     className="showUserInput"
//                     type="text"
//                     value={displayedUser.phone}
//                     readOnly={true}
//                   />
//                 </label>
//                 <label className="showUserLabel" htmlFor="Address">
//                   Living Address:
//                   <input
//                     id="Address"
//                     className="showUserInput"
//                     type="text"
//                     value={displayedUser.address_name}
//                     readOnly={true}
//                   />
//                 </label>
//                 <label className="showUserLabel" htmlFor="Area">
//                   Geographic Area:
//                   <input
//                     id="Area"
//                     name="Area"
//                     className="showUserInput"
//                     type="text"
//                     value={displayedUser.zone_name}
//                     readOnly={true}
//                   />
//                 </label>
//                 <label htmlFor="authorization" className="showUserLabel">
//                   Authorization:
//                   <input
//                     id="authorization"
//                     name="authorization"
//                     className="showUserInput"
//                     type="text"
//                     value={displayedUser.role}
//                     readOnly={true}
//                   />
//                 </label>
//                 <label className="showUserLabel" htmlFor="companyId">
//                   Company ID:
//                   <input
//                     id="companyId"
//                     className="showUserInput"
//                     type="text"
//                     value={displayedUser.company_id}
//                     readOnly={true}
//                   />
//                 </label>
//               </div>
//               <button className="userButton" type="submit">
//                 Save User
//               </button>
//             </form>
//           </div>
//         )}
//       </div>
//     );
//   }
// };

// export default ShowUser;


import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import './ShowUser.css';

const token = localStorage.getItem('token');

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

const ShowUser = () => {
  const { userId } = useParams();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setLoading(true);
    getUsers()
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  if (users.length) {
    const displayedUser = users.find(
      (user) => user._id === userId
    );

    return (
      <div>
        {loading ? (
          <span className="loader"></span>
        ) : (
          <div className="showUserBox">
            <form className="showUserForm">
              <div className="showUserFormContent">
                <label className="showUserLabel" htmlFor="username">
                  Username:
                  <input
                    id="username"
                    className="showUserInput"
                    value={displayedUser.username}
                    readOnly
                  />
                </label>
                <label className="showUserLabel" htmlFor="pass">
                  Password:
                  <div className="passContent">
                    <input
                      id="pass"
                      className="showUserInput"
                      type={showPassword ? 'text' : 'password'}
                      value={displayedUser.password}
                      readOnly
                    />
                    {showPassword ? (
                      <VisibilityIcon
                        className="eye"
                        onClick={handleShowPassword}
                      />
                    ) : (
                      <VisibilityOffIcon
                        className="eyeOff"
                        onClick={handleShowPassword}
                      />
                    )}
                  </div>
                </label>
                <label className="showUserLabel" htmlFor="firstName">
                  First name:
                  <input
                    id="firstName"
                    className="showUserInput"
                    value={displayedUser.firstName}
                    readOnly
                  />
                </label>
                <label className="showUserLabel" htmlFor="lastName">
                  Last name:
                  <input
                    id="lastName"
                    className="showUserInput"
                    value={displayedUser.lastName}
                    readOnly
                  />
                </label>
                <label className="showUserLabel" htmlFor="email">
                  Email address:
                  <input
                    id="email"
                    className="showUserInput"
                    value={displayedUser.email}
                    readOnly
                  />
                </label>
                <label className="showUserLabel" htmlFor="phoneNumber">
                  Phone number:
                  <input
                    id="phoneNumber"
                    className="showUserInput"
                    value={displayedUser.phoneNumber}
                    readOnly
                  />
                </label>
                <label className="showUserLabel" htmlFor="livingAddress">
                  Living Address:
                  <input
                    id="livingAddress"
                    className="showUserInput"
                    value={displayedUser.livingAddress}
                    readOnly
                  />
                </label>
                <label className="showUserLabel" htmlFor="geographicArea">
                  Geographic Area:
                  <input
                    id="geographicArea"
                    className="showUserInput"
                    value={displayedUser.geographicArea}
                    readOnly
                  />
                </label>
                <label htmlFor="authorization" className="showUserLabel">
                  Authorization:
                  <input
                    id="authorization"
                    className="showUserInput"
                    value={displayedUser.authorization}
                    readOnly
                  />
                </label>
                <label className="showUserLabel" htmlFor="companyId">
                  Company ID:
                  <input
                    id="companyId"
                    className="showUserInput"
                    value={displayedUser.companyId}
                    readOnly
                  />
                </label>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  } else {
    return <div>Loading user data...</div>;
  }
};

export default ShowUser;
