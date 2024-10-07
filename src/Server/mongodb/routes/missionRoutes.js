const express = require('express');
const Mission = require('../models/mission'); 

const router = express.Router();

// Route to create a new mission
router.post('/', async (req, res) => {
    console.log("post mission")
  try {
    const { title, address, city, area, description, created_date, priority } = req.body;

    // Create a new mission
    const newMission = new Mission({
      title,
      address,
      city,
      area,
     //status,
      description,
      created_date,
      priority,
      //assignedTo,
      //companyId
    });
    console.log(newMission);
    await newMission.save(); // Save the mission in MongoDB

    res.status(201).json({ message: 'Mission created successfully', mission: newMission });
  } catch (err) {
    console.error('Error creating mission:', err); // Log the actual error
    res.status(500).json({ error: 'Error creating mission' });
  }
});

// Route to get all missions
router.get('/', async (req, res) => {
  try {
    const missions = await Mission.find(); // Fetch all missions from the database
    res.status(200).json(missions);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching missions' });
  }
});

// Route to get a mission by ID
router.get('/:id', async (req, res) => {
  try {
    const mission = await Mission.findById(req.params.id);
    if (!mission) {
      return res.status(404).json({ error: 'Mission not found' });
    }
    res.status(200).json(mission);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching mission' });
  }
});

// Route to update a mission
router.put('/:id', async (req, res) => {
  try {
    const { title, address, city, area, description, created_date, priority } = req.body;
    const mission = await Mission.findById(req.params.id);

    if (!mission) {
      return res.status(404).json({ error: 'Mission not found' });
    }

    // Update mission fields
    mission.title = title || mission.title;
    mission.address = address || mission.address;
    mission.city = city || mission.city;
    mission.area = area || mission.area;
   // mission.status = status || mission.status;
    mission.description = description || mission.description;
    mission.created_date = created_date || mission.created_date;
    mission.priority = priority || mission.priority;
    //mission.assignedTo = assignedTo || mission.assignedTo;
    //mission.companyId = companyId || mission.companyId;

    await mission.save();
    res.status(200).json({ message: 'Mission updated successfully', mission });
  } catch (err) {
    res.status(500).json({ error: 'Error updating mission' });
  }
});

// Route to delete a mission
router.delete('/:id', async (req, res) => {
  try {
    const mission = await Mission.findByIdAndDelete(req.params.id);

    if (!mission) {
      return res.status(404).json({ error: 'Mission not found' });
    }

    res.status(200).json({ message: 'Mission deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting mission' });
  }
});

module.exports = router;
