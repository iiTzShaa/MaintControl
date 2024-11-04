const express = require('express');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const User = require('../models/User'); 
 
const router = express.Router();
 
router.post('/login', async (req, res) => {

  const { username, password, companyId } = req.body;

  console.log("Login attempt:", { username, companyId });
 
  // בדיקה אם כל השדות קיימים

  if (!username || !password || !companyId) {

    return res.status(400).json({ message: 'Please provide username, password, and company ID.' });

  }
 
  try {

    const user = await User.findOne({ username, companyId });

    if (!user) {

      return res.status(400).json({ message: 'Invalid username or company ID.' });

    }
 
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {

      return res.status(400).json({ message: 'Invalid password.' });

    }
 
  

    const token = jwt.sign(

      { userId: user._id, authorization: user.authorization },

      process.env.JWT_SECRET,

      { expiresIn: '1h' }

    );
    console.log("Token created:", token);
 
    res.json({ token, authorization: user.authorization });

  } catch (err) {
    console.error('Error during login:', err);

    res.status(500).json({ message: 'Server error.' });

  }

});
 
module.exports = router;

 