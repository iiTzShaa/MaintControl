const express = require('express');
const User = require('../models/User');
const Mission = require('../models/Mission');
const authenticate = require('./middlewareAuth');
const router = express.Router();
const mongoose = require('mongoose');


// Route to create a new user
router.post('/', async (req, res) => {
  console.log("Creating a new user with data:", req.body);
  try {
    const { username, password, firstName, lastName, email, phoneNumber, livingAddress, geographicArea, authorization, companyId } = req.body;

    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      console.error('User with this username or email already exists');
      return res.status(400).json({ error: 'User with this username or email already exists' });
    }

    const newUser = new User({
      username,
      password,
      firstName,
      lastName,
      email,
      phoneNumber,
      livingAddress,
      geographicArea,
      authorization,
      companyId,

    });
    console.log("New user data before saving:", newUser);
    await newUser.save();

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Error creating user' });
  }
});

router.get('/', async (req, res) => {
  console.log("Fetching all users");
  try {
    const users = await User.find();
    console.log("Users fetched:", users);
    res.status(200).json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Error fetching users' });
  }
});

// Route to get current authenticated user
router.get('/current', authenticate, async (req, res) => {
  console.log("User ID from token in /users/current route:", req.userId);
 
  try {
    const user = await User.findById(req.userId).populate('missions');
    if (!user) {
      console.error('User not found in database');
      return res.status(404).json({ message: 'User not found' });
    }
 
    console.log("User data retrieved:", user);
    res.status(200).json(user);
  } catch (err) {
    console.error('Error fetching user data from database:', err);
    res.status(500).json({ message: 'Error fetching user data' });
  }
});

// Route to get a specific user by ID
router.get('/:userId', authenticate, async (req, res) => {
  const { userId } = req.params;
  console.log(`Fetching details for user ID: ${userId}`);

  try {
    const user = await User.findById(userId).populate('missions');
    if (!user) {
      console.error('User not found');
      return res.status(404).json({ error: 'User not found' });
    }

    console.log("User details retrieved:", user);
    res.status(200).json(user);
  } catch (err) {
    console.error('Error fetching user details:', err);
    res.status(500).json({ error: 'Error fetching user details' });
  }
});

// Route to update a specific user by ID
router.put('/:userId', authenticate, async (req, res) => {
  const { userId } = req.params;
  console.log(`Attempting to update user with ID: ${userId}`);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      req.body,
      { new: true, runValidators: true } // Return the updated document and validate fields
    );

    if (!updatedUser) {
      console.error('User not found');
      return res.status(404).json({ error: 'User not found' });
    }

    console.log("User updated successfully:", updatedUser);
    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ error: 'Error updating user' });
  }
});



//
router.post('/:userId/assign-mission/:missionId', async (req, res) => {
  const { userId, missionId } = req.params;

  try {
    const user = await User.findById(userId);
    const mission = await Mission.findById(missionId);

    if (!user || !mission) {
      return res.status(404).json({ error: 'User or Mission not found' });
    }

    if (!user.missions.includes(missionId)) {
      user.missions.push(missionId);
    }

    if (!mission.users.includes(userId)) {
      mission.users.push(userId);
    }

    await user.save();
    await mission.save();

    res.status(200).json({ message: 'User assigned to mission successfully', user, mission });
  } catch (err) {
    res.status(500).json({ error: 'Error assigning user to mission' });
  }
});



router.post('/:userId/release-mission/:missionId', async (req, res) => {
  const { userId, missionId } = req.params;

  try {
    const user = await User.findById(userId);
    const mission = await Mission.findById(missionId);

    if (!user || !mission) {
      return res.status(404).json({ error: 'User or Mission not found' });
    }

    user.missions = user.missions.filter(id => id.toString() !== missionId);
    mission.users = mission.users.filter(id => id.toString() !== userId);

    await user.save();
    await mission.save();

    res.status(200).json({ message: 'User released from mission successfully', user, mission });
  } catch (err) {
    res.status(500).json({ error: 'Error releasing user from mission' });
  }
});



// Route to delete a specific user by ID
router.delete('/:userId', authenticate, async (req, res) => {
  const { userId } = req.params;
  console.log(`Attempting to delete user with ID: ${userId}`);

  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      console.error('User not found');
      return res.status(404).json({ error: 'User not found' });
    }

    console.log("User deleted successfully:", deletedUser);
    res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: 'Error deleting user' });
  }
});

module.exports = router;
