
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SearchAddress from './AddressLookup/SearchAddress';
import './editMission.css';

function EditMission() {
  const { missionId } = useParams();
  const navigate = useNavigate();
  const priorityOptions = ['High', 'Medium', 'Low'];
  const areaOptions = ['Central Israel', 'Northern Israel', 'Southern Israel'];

  const [missionData, setMissionData] = useState({
    title: '',
    address: '',
    area: '',
    city: '',
    status: '',
    description: '',
    created_date: '',
    priority: '',
  });
  const [picked, setPicked] = useState(false);
  const [addressVal, setAddressVal] = useState('');

  useEffect(() => {
    const fetchMission = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/missions/${missionId}`);
        const data = await response.json();
        setMissionData(data);
        setAddressVal(data.address); 
      } catch (error) {
        console.error('Error fetching mission:', error);
      }
    };
    fetchMission();
  }, [missionId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (picked && missionData.title && missionData.address && missionData.city && missionData.area && missionData.description && missionData.created_date && missionData.priority) {
      try {
        const response = await fetch(`http://localhost:3000/api/missions/${missionId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(missionData),
        });
        if (response.ok) {
          navigate('/missions');
        } else {
          console.error('Failed to update mission');
        }
      } catch (error) {
        console.error('Error updating mission:', error);
      }
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
    <div className="edit-mission-form-container">
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
        <SearchAddress setPicked={setPicked} setAddressVal={setAddressVal} />
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
            <option value="">Choose Geographic Area</option>
            {areaOptions.map(area => (
              <option key={area} value={area}>{area}</option>
            ))}
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
            <option value="">Choose Priority</option>
            {priorityOptions.map(priority => (
              <option key={priority} value={priority}>{priority}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="create-mission-btn">
          Save Mission
        </button>
      </form>
    </div>
  );
}

export default EditMission;
