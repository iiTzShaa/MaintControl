// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import SearchAddress from './AddressLookup/SearchAddress';
// import './NewMission.css';

// function NewMission() {
//   const navigate = useNavigate();
//   const today = new Date();
//   const formattedDate = today.toISOString().substr(0, 10);
//   const [picked, setPicked] = useState(false);
//   const [addressVal, setAddressVal] = useState('');
//   const [fullAddress, setFullAddress] = useState('');
//   const [missionData, setMissionData] = useState({
//     title: '',
//     address: '',
//     area: '',
//     status: '',
//     city: '',
//     description: '',
//     created_date: formattedDate,
//     priority: '',
//   });

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log(picked, missionData);
//     console.log(fullAddress.address.city);
//     console.log(fullAddress.lat, fullAddress.lon);

//     if (
//       picked &&
//       missionData.title !== '' &&
//       missionData.address !== '' &&
//       missionData.city !== '' &&
//       missionData.area !== 'choose' &&
//       missionData.description !== '' &&
//       missionData.created_date !== '' &&
//       missionData.priority !== 'choose'
//     )
//       navigate('/missions');
//   };

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setMissionData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   missionData.address = addressVal;

//   return (
//     <div className="new-mission-form-container">
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="title">Title</label>
//           <input
//             type="text"
//             id="title"
//             name="title"
//             value={missionData.title}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <SearchAddress
//           setPicked={setPicked}
//           setAddressVal={setAddressVal}
//           setFullAddress={setFullAddress}
//         />
//         <div className="form-group">
//           <label htmlFor="city">City</label>
//           <input
//             type="text"
//             id="city"
//             name="city"
//             value={missionData.city}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="area">Area</label>
//           <select
//             id="area"
//             name="area"
//             value={missionData.area}
//             onChange={handleChange}
//             required
//           >
//             <option value="choose">Choose Geographic Area</option>
//             <option value="Central Israel">Central Israel</option>
//             <option value="Northern Israel">Northern Israel</option>
//             <option value="Southern Israel">Southern Israel</option>
//           </select>
//         </div>
//         <div className="form-group">
//           <label htmlFor="description">Description</label>
//           <textarea
//             id="description"
//             name="description"
//             value={missionData.description}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="created_date">Created Date</label>
//           <input
//             type="date"
//             id="created_date"
//             name="created_date"
//             value={missionData.created_date}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="priority">Priority</label>
//           <select
//             id="priority"
//             name="priority"
//             value={missionData.priority}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Choose Priority</option>
//             <option value="high">High</option>
//             <option value="medium">Medium</option>
//             <option value="low">Low</option>
//           </select>
//         </div>

//         <button type="submit" className="create-mission-btn">
//           Create Mission
//         </button>
//       </form>
//     </div>
//   );
// }

// export default NewMission;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchAddress from './AddressLookup/SearchAddress';
import './NewMission.css';

function NewMission() {
  const navigate = useNavigate();
  const today = new Date();
  const formattedDate = today.toISOString().substr(0, 10);
  //eslint-disable-next-line
  const [picked, setPicked] = useState(false);
  const [addressVal, setAddressVal] = useState('');
  const [fullAddress, setFullAddress] = useState('');
  const [missionData, setMissionData] = useState({
    title: '',
    address: '',
    area: '',
    status: '',
    city: '',
    description: '',
    created_date: formattedDate,
    priority: '',
  });
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (missionData.title === '') {
      setError('Title is required');
    } else if (addressVal === '') {
      setError('Address is required');
    } else if (missionData.city === '') {
      setError('City is required');
    } else if (missionData.area === 'choose') {
      setError('Must choose a geographic area');
    } else if (missionData.description === '') {
      setError('Description is required');
    } else if (missionData.priority === 'choose') {
      setError('Must choose a priority');
    } else {
      // Proceed to submit the form
      addMissionFetch();
    }
  };

  const addMissionFetch = async () => {
    const missionRequestData = {
      title: missionData.title,
      address: addressVal,
      city: missionData.city,
      area: missionData.area,
      description: missionData.description,
      created_date: missionData.created_date,
      priority: missionData.priority,
      coordinates: {
        lat: fullAddress.lat,
        lon: fullAddress.lon,
      },
    };

    console.log("Request Body:", JSON.stringify(missionRequestData, null, 2));

    try {
      const response = await fetch('http://localhost:3000/missions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(missionRequestData),
      });

      if (!response.ok) {
        if (response.status === 401) {
          setError('Unauthorized: Please login again');
        }
        throw new Error(response.statusText);
      }

      console.log(response);
      navigate('/missions');
    } catch (err) {
      console.error(err);
      setError('An error occurred while creating the mission');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMissionData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  missionData.address = addressVal;

  return (
    <div className="new-mission-form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={missionData.title}
            onChange={handleChange}
            required
          />
        </div>
        <SearchAddress
         //eslint-disable-next-line
          setPicked={setPicked}
          setAddressVal={setAddressVal}
          setFullAddress={setFullAddress}
        />
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={missionData.city}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="area">Area</label>
          <select
            id="area"
            name="area"
            value={missionData.area}
            onChange={handleChange}
            required
          >
            <option value="choose">Choose Geographic Area</option>
            <option value="Central Israel">Central Israel</option>
            <option value="Northern Israel">Northern Israel</option>
            <option value="Southern Israel">Southern Israel</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={missionData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="created_date">Created Date</label>
          <input
            type="date"
            id="created_date"
            name="created_date"
            value={missionData.created_date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={missionData.priority}
            onChange={handleChange}
            required
          >
            <option value="choose">Choose Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        {error && <div className="error">{error}</div>}
        <button type="submit" className="create-mission-btn">
          Create Mission
        </button>
      </form>
    </div>
  );
}

export default NewMission;
