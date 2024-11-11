// const express = require('express');

// const bcrypt = require('bcrypt');

// const jwt = require('jsonwebtoken');

// const User = require('../models/User'); 
 
// const router = express.Router();
 
// router.post('/login', async (req, res) => {

//   const { username, password, companyId } = req.body;

//   console.log("Login attempt:", { username, companyId });
 

//   if (!username || !password || !companyId) {

//     return res.status(400).json({ message: 'Please provide username, password, and company ID.' });

//   }
 
//   try {

//     const user = await User.findOne({ username, companyId });

//     if (!user) {

//       return res.status(400).json({ message: 'Invalid username or company ID.' });

//     }
//     console.log('Password:', password);
//     const isMatch = await bcrypt.compare(password, user.password);
//     console.log('isMatch:', isMatch);
//     if (!isMatch) {

//       return res.status(400).json({ message: 'Invalid password.' });

//     }
 
  

//     const token = jwt.sign(

//       { userId: user._id, authorization: user.authorization },

//       process.env.JWT_SECRET,

//       { expiresIn: '1h' }

//     );
//     console.log("Token created:", token);
 
//     res.json({ token, authorization: user.authorization });

//   } catch (err) {
//     console.error('Error during login:', err);

//     res.status(500).json({ message: 'Server error.' });

//   }

// });
 
// module.exports = router;

 

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
 
const router = express.Router();
 
router.post('/login', async (req, res) => {
  const { username, password, companyId } = req.body;

  console.log("Login attempt:", { username, companyId });

  // בדוק אם כל השדות קיימים
  if (!username || !password || !companyId) {
    return res.status(400).json({ message: 'Please provide username, password, and company ID.' });
  }

  try {
    // חפש את המשתמש לפי שם משתמש ומזהה חברה
    const user = await User.findOne({ username, companyId });

    if (!user) {
      // אם המשתמש לא נמצא, החזר שגיאה מתאימה
      return res.status(400).json({ message: 'Invalid username or company ID.' });
    }

    // השוואת הסיסמה
    // const isMatch = await bcrypt.compare(password, user.password);

    // if (!isMatch) {
    //   // אם הסיסמה לא נכונה, החזר שגיאה
    //   return res.status(400).json({ message: 'Invalid password.' });
    // }
 
    // יצירת טוקן JWT עם מזהה המשתמש והרשאה
    const token = jwt.sign(
      { userId: user._id, authorization: user.authorization },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log("Token created:", token);
    
    // שלח את הטוקן וההרשאה ללקוח
    res.json({ token, authorization: user.authorization });

  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});
 
module.exports = router;
