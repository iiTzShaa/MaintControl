const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const router = express.Router();

// Route to create a new user
router.post('/', async (req, res) => {
  console.log("hello post")
  try {
    const { username, password, firstName, lastName, email, phoneNumber, livingAddress, geographicArea, authorization, companyId } = req.body;

    // Check if the user already exists (by username or email)
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this username or email already exists' });
    }

    // Create a new user
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
    console.log(newUser);
    await newUser.save(); // Save the user in MongoDB

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (err) {
    console.error('Error creating user:', err); // Log the actual error
    res.status(500).json({ error: 'Error creating user' });
  }
});

// Route to get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the database
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching users' });
  }
});

// Route to get a user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching user' });
  }
});

// Route to update a user
router.put('/:id', async (req, res) => {
  try {
    const { username, firstName, lastName, email, phoneNumber, livingAddress, geographicArea, authorization, companyId } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user fields
    user.username = username || user.username;
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.livingAddress = livingAddress || user.livingAddress;
    user.geographicArea = geographicArea || user.geographicArea;
    user.authorization = authorization || user.authorization;
    user.companyId = companyId || user.companyId;

    await user.save();
    res.status(200).json({ message: 'User updated successfully', user });
  } catch (err) {
    res.status(500).json({ error: 'Error updating user' });
  }
});

// Route to delete a user
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting user' });
  }
});

module.exports = router;
