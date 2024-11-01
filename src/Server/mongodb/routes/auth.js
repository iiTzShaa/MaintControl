const express = require('express');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const User = require('../models/User'); // שים לב למיקום של הקובץ
 
const router = express.Router();
 
router.post('/login', async (req, res) => {

  const { username, password, companyId } = req.body;
 
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
 
    // יצירת טוקן JWT

    const token = jwt.sign(

      { userId: user._id, authorization: user.authorization },

      process.env.JWT_SECRET,

      { expiresIn: '1h' }

    );
 
    res.json({ token, authorization: user.authorization });

  } catch (err) {

    res.status(500).json({ message: 'Server error.' });

  }

});
 
module.exports = router;

 