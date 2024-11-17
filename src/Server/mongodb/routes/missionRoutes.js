const express = require('express');
const Mission = require('../models/Mission');
const User = require('../models/User');
const router = express.Router();

// Route to create a new mission
router.post('/', async (req, res) => {
  try {
    const { title, address, city, area, description, created_date, priority, notes, status } = req.body;

    const newMission = new Mission({
      title,
      address,
      city,
      area,
      description,
      created_date,
      priority,
      notes: notes || [],
      status: status || 'To Do',
    });
    await newMission.save();
    res.status(201).json({ message: 'Mission created successfully', mission: newMission });
  } catch (err) {
    console.error('Error creating mission:', err);
    res.status(500).json({ error: 'Error creating mission' });
  }
});

// Route to get all missions
router.get('/', async (req, res) => {
  try {
    const missions = await Mission.find();
    res.status(200).json(missions);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching missions' });
  }
});

// Route to get a specific mission by ID and populate users
router.get('/:id', async (req, res) => {
  try {
    const mission = await Mission.findById(req.params.id).populate('users'); // Assumes 'users' is the field for assigned users
 
    if (!mission) {
      return res.status(404).json({ message: 'Mission not found' });
    }
 
    res.status(200).json(mission);
  } catch (error) {
    console.error('Error fetching mission:', error);
    res.status(500).send('Server error');
  }
});



// Other routes for updating, retrieving, and deleting missions
router.put('/:id', async (req, res) => {
  try {
    const { title, address, city, area, description, created_date, priority, notes, status, assignedUser } = req.body;
    const mission = await Mission.findById(req.params.id);

    if (!mission) {
      return res.status(404).json({ error: 'Mission not found' });
    }

    mission.title = title || mission.title;
    mission.address = address || mission.address;
    mission.city = city || mission.city;
    mission.area = area || mission.area;
    mission.description = description || mission.description;
    mission.created_date = created_date || mission.created_date;
    mission.priority = priority || mission.priority;
    mission.notes = notes || mission.notes;
    mission.status = status || mission.status;

    await mission.save();

    if (assignedUser) {
      await User.findByIdAndUpdate(assignedUser, { $addToSet: { missions: mission._id } });
    }

    res.status(200).json({ message: 'Mission updated successfully', mission });
  } catch (err) {
    console.error('Error updating mission:', err);
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
