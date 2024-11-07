// const express = require('express');
// const User = require('../models/User');
// const bcrypt = require('bcrypt');

// const router = express.Router();

// // Route to create a new user
// router.post('/', async (req, res) => {
//   console.log("hello post")
//   try {
//     const { username, password, firstName, lastName, email, phoneNumber, livingAddress, geographicArea, authorization, companyId } = req.body;

//     // Check if the user already exists (by username or email)
//     const existingUser = await User.findOne({ $or: [{ username }, { email }] });
//     if (existingUser) {
//       return res.status(400).json({ error: 'User with this username or email already exists' });
//     }

//     // Create a new user
//     const newUser = new User({
//       username,
//       password,
//       firstName,
//       lastName,
//       email,
//       phoneNumber,
//       livingAddress,
//       geographicArea,
//       authorization,
//       companyId,
//     });
//     console.log(newUser);
//     await newUser.save(); // Save the user in MongoDB

//     res.status(201).json({ message: 'User created successfully', user: newUser });
//   } catch (err) {
//     console.error('Error creating user:', err); // Log the actual error
//     res.status(500).json({ error: 'Error creating user' });
//   }
// });

// // Route to get all users
// router.get('/', async (req, res) => {
//   try {
//     const users = await User.find(); // Fetch all users from the database
//     res.status(200).json(users);
//   } catch (err) {
//     res.status(500).json({ error: 'Error fetching users' });
//   }
// });

// // Route to get a user by ID
// router.get('/:id', async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     res.status(200).json(user);
//   } catch (err) {
//     res.status(500).json({ error: 'Error fetching user' });
//   }
// });

// // Route to update a user
// router.put('/:id', async (req, res) => {
//   try {
//     const { username, firstName, lastName, email, phoneNumber, livingAddress, geographicArea, authorization, companyId } = req.body;
//     const user = await User.findById(req.params.id);

//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     // Update user fields
//     user.username = username || user.username;
//     user.firstName = firstName || user.firstName;
//     user.lastName = lastName || user.lastName;
//     user.email = email || user.email;
//     user.phoneNumber = phoneNumber || user.phoneNumber;
//     user.livingAddress = livingAddress || user.livingAddress;
//     user.geographicArea = geographicArea || user.geographicArea;
//     user.authorization = authorization || user.authorization;
//     user.companyId = companyId || user.companyId;

//     await user.save();
//     res.status(200).json({ message: 'User updated successfully', user });
//   } catch (err) {
//     res.status(500).json({ error: 'Error updating user' });
//   }
// });

// // Route to delete a user
// router.delete('/:id', async (req, res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);

//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     res.status(200).json({ message: 'User deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ error: 'Error deleting user' });
//   }
// });

// module.exports = router;

// const express = require('express');
// const User = require('../models/User');
// const Mission = require('../models/Mission');
// const bcrypt = require('bcrypt');
// const authenticate = require('./middlewareAuth');
// const router = express.Router();

// // Route to create a new user
// router.post('/', async (req, res) => {
//   console.log("hello post");
//   try {
//     const { username, password, firstName, lastName, email, phoneNumber, livingAddress, geographicArea, authorization, companyId } = req.body;

//     // Check if the user already exists (by username or email)
//     const existingUser = await User.findOne({ $or: [{ username }, { email }] });
//     if (existingUser) {
//       return res.status(400).json({ error: 'User with this username or email already exists' });
//     }

//     // Create a new user
//     const newUser = new User({
//       username,
//       password,
//       firstName,
//       lastName,
//       email,
//       phoneNumber,
//       livingAddress,
//       geographicArea,
//       authorization,
//       companyId,
//     });
//     console.log(newUser);
//     await newUser.save(); // Save the user in MongoDB

//     res.status(201).json({ message: 'User created successfully', user: newUser });
//   } catch (err) {
//     console.error('Error creating user:', err); // Log the actual error
//     res.status(500).json({ error: 'Error creating user' });
//   }
// });

// // Route to get all users
// router.get('/', async (req, res) => {
//   try {
//     const users = await User.find(); // Fetch all users from the database
//     res.status(200).json(users);
//   } catch (err) {
//     res.status(500).json({ error: 'Error fetching users' });
//   }
// });

// // Route to get a user by ID
// router.get('/:id', async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     res.status(200).json(user);
//   } catch (err) {
//     res.status(500).json({ error: 'Error fetching user' });
//   }
// });

// // Route to update a user
// router.put('/:id', async (req, res) => {
//   try {
//     const { username, firstName, lastName, email, phoneNumber, livingAddress, geographicArea, authorization, companyId } = req.body;
//     const user = await User.findById(req.params.id);

//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     // Update user fields
//     user.username = username || user.username;
//     user.firstName = firstName || user.firstName;
//     user.lastName = lastName || user.lastName;
//     user.email = email || user.email;
//     user.phoneNumber = phoneNumber || user.phoneNumber;
//     user.livingAddress = livingAddress || user.livingAddress;
//     user.geographicArea = geographicArea || user.geographicArea;
//     user.authorization = authorization || user.authorization;
//     user.companyId = companyId || user.companyId;

//     await user.save();
//     res.status(200).json({ message: 'User updated successfully', user });
//   } catch (err) {
//     res.status(500).json({ error: 'Error updating user' });
//   }
// });

// // Route to delete a user
// router.delete('/:id', async (req, res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);

//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     res.status(200).json({ message: 'User deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ error: 'Error deleting user' });
//   }
// });

// // Route to assign a user to a mission
// router.post('/:userId/assign-mission/:missionId', async (req, res) => {
//   const { userId, missionId } = req.params;

//   try {
//     const user = await User.findById(userId);
//     const mission = await Mission.findById(missionId);

//     if (!user || !mission) {
//       return res.status(404).json({ error: 'User or Mission not found' });
//     }

//     // Add mission to user's list if not already present
//     if (!user.missions.includes(missionId)) {
//       user.missions.push(missionId);
//     }

//     // Add user to mission's list if not already present
//     if (!mission.users.includes(userId)) {
//       mission.users.push(userId);
//     }

//     await user.save();
//     await mission.save();

//     res.status(200).json({ message: 'User assigned to mission successfully', user, mission });
//   } catch (err) {
//     res.status(500).json({ error: 'Error assigning user to mission' });
//   }
// });

// // Route to release a user from a mission
// router.post('/:userId/release-mission/:missionId', async (req, res) => {
//   const { userId, missionId } = req.params;

//   try {
//     const user = await User.findById(userId);
//     const mission = await Mission.findById(missionId);

//     if (!user || !mission) {
//       return res.status(404).json({ error: 'User or Mission not found' });
//     }

//     // Remove mission from user's list
//     user.missions = user.missions.filter(id => id.toString() !== missionId);
//     // Remove user from mission's list
//     mission.users = mission.users.filter(id => id.toString() !== userId);

//     await user.save();
//     await mission.save();

//     res.status(200).json({ message: 'User released from mission successfully', user, mission });
//   } catch (err) {
//     res.status(500).json({ error: 'Error releasing user from mission' });
//   }
// });

// // Get current authenticated user
// router.get('/current', authenticate, async (req, res) => {
//   try {
//     const user = await User.findById(req.userId).populate('missions'); // Populate missions if needed
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.status(200).json(user);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching user data' });
//   }
// });

// module.exports = router;

// const express = require('express');
// const User = require('../models/User');
// const Mission = require('../models/Mission');
// const bcrypt = require('bcrypt');
// const authenticate = require('./middlewareAuth');
// const router = express.Router();

// // Route to create a new user
// router.post('/', async (req, res) => {
//   console.log("Creating a new user with data:", req.body);
//   try {
//     const { username, password, firstName, lastName, email, phoneNumber, livingAddress, geographicArea, authorization, companyId } = req.body;

//     const existingUser = await User.findOne({ $or: [{ username }, { email }] });
//     if (existingUser) {
//       console.error('User with this username or email already exists');
//       return res.status(400).json({ error: 'User with this username or email already exists' });
//     }

//     const newUser = new User({
//       username,
//       password,
//       firstName,
//       lastName,
//       email,
//       phoneNumber,
//       livingAddress,
//       geographicArea,
//       authorization,
//       companyId,
//     });
//     console.log("New user data before saving:", newUser);
//     await newUser.save();

//     res.status(201).json({ message: 'User created successfully', user: newUser });
//   } catch (err) {
//     console.error('Error creating user:', err);
//     res.status(500).json({ error: 'Error creating user' });
//   }
// });

// // Route to get all users
// router.get('/', async (req, res) => {
//   console.log("Fetching all users");
//   try {
//     const users = await User.find();
//     console.log("Users fetched:", users);
//     res.status(200).json(users);
//   } catch (err) {
//     console.error('Error fetching users:', err);
//     res.status(500).json({ error: 'Error fetching users' });
//   }
// });

// // Route to get current authenticated user
// router.get('/current', authenticate, async (req, res) => {
//   console.log("User ID from token in /users/current route:", req.userId); 

//   try {
//     const user = await User.findById(req.userId).populate('missions');
//     if (!user) {
//       console.error('User not found in database');
//       return res.status(404).json({ message: 'User not found' });
//     }

//     console.log("User data retrieved:", user);
//     res.status(200).json(user);
//   } catch (err) {
//     console.error('Error fetching user data from database:', err);
//     res.status(500).json({ message: 'Error fetching user data' });
//   }
// });

// module.exports = router;

// const express = require('express');
// const User = require('../models/User');
// const Mission = require('../models/Mission');
// const bcrypt = require('bcrypt');
// const authenticate = require('./middlewareAuth');
// const router = express.Router();

// // Route to create a new user
// router.post('/', async (req, res) => {
//   console.log("Creating a new user with data:", req.body);
//   try {
//     const { username, password, firstName, lastName, email, phoneNumber, livingAddress, geographicArea, authorization, companyId } = req.body;

//     const existingUser = await User.findOne({ $or: [{ username }, { email }] });
//     if (existingUser) {
//       console.error('User with this username or email already exists');
//       return res.status(400).json({ error: 'User with this username or email already exists' });
//     }

//     const newUser = new User({
//       username,
//       password,
//       firstName,
//       lastName,
//       email,
//       phoneNumber,
//       livingAddress,
//       geographicArea,
//       authorization,
//       companyId,
//     });
//     console.log("New user data before saving:", newUser);
//     await newUser.save();

//     res.status(201).json({ message: 'User created successfully', user: newUser });
//   } catch (err) {
//     console.error('Error creating user:', err);
//     res.status(500).json({ error: 'Error creating user' });
//   }
// });

// // Route to get all users
// router.get('/', async (req, res) => {
//   console.log("Fetching all users");
//   try {
//     const users = await User.find();
//     console.log("Users fetched:", users);
//     res.status(200).json(users);
//   } catch (err) {
//     console.error('Error fetching users:', err);
//     res.status(500).json({ error: 'Error fetching users' });
//   }
// });

// // Route to get current authenticated user
// router.get('/current', authenticate, async (req, res) => {
//   console.log("User ID from token in /users/current route:", req.userId);

//   try {
//     const user = await User.findById(req.userId).populate('missions');
//     if (!user) {
//       console.error('User not found in database');
//       return res.status(404).json({ message: 'User not found' });
//     }

//     console.log("User data retrieved:", user);
//     res.status(200).json(user);
//   } catch (err) {
//     console.error('Error fetching user data from database:', err);
//     res.status(500).json({ message: 'Error fetching user data' });
//   }
// });

// // Route to get a specific user by ID
// router.get('/:userId', async (req, res) => {
//   const { userId } = req.params;
//   console.log(`Fetching details for user ID: ${userId}`);

//   try {
//     const user = await User.findById(userId).populate('missions');
//     if (!user) {
//       console.error('User not found');
//       return res.status(404).json({ error: 'User not found' });
//     }

//     console.log("User details retrieved:", user);
//     res.status(200).json(user);
//   } catch (err) {
//     console.error('Error fetching user details:', err);
//     res.status(500).json({ error: 'Error fetching user details' });
//   }
// });

// module.exports = router;


// const express = require('express');
// const User = require('../models/User');
// const Mission = require('../models/Mission');
// const bcrypt = require('bcrypt');
// const authenticate = require('./middlewareAuth');
// const router = express.Router();

// // Route to create a new user
// router.post('/', async (req, res) => {
//   console.log("Creating a new user with data:", req.body);
//   try {
//     const { username, password, firstName, lastName, email, phoneNumber, livingAddress, geographicArea, authorization, companyId } = req.body;

//     const existingUser = await User.findOne({ $or: [{ username }, { email }] });
//     if (existingUser) {
//       console.error('User with this username or email already exists');
//       return res.status(400).json({ error: 'User with this username or email already exists' });
//     }

//     const newUser = new User({
//       username,
//       password,
//       firstName,
//       lastName,
//       email,
//       phoneNumber,
//       livingAddress,
//       geographicArea,
//       authorization,
//       companyId,
//     });
//     console.log("New user data before saving:", newUser);
//     await newUser.save();

//     res.status(201).json({ message: 'User created successfully', user: newUser });
//   } catch (err) {
//     console.error('Error creating user:', err);
//     res.status(500).json({ error: 'Error creating user' });
//   }
// });

// // Route to get all users
// router.get('/', async (req, res) => {
//   console.log("Fetching all users");
//   try {
//     const users = await User.find();
//     console.log("Users fetched:", users);
//     res.status(200).json(users);
//   } catch (err) {
//     console.error('Error fetching users:', err);
//     res.status(500).json({ error: 'Error fetching users' });
//   }
// });

// // Route to get current authenticated user
// router.get('/current', authenticate, async (req, res) => {
//   console.log("User ID from token in /users/current route:", req.userId);

//   try {
//     const user = await User.findById(req.userId).populate('missions');
//     if (!user) {
//       console.error('User not found in database');
//       return res.status(404).json({ message: 'User not found' });
//     }

//     console.log("User data retrieved:", user);
//     res.status(200).json(user);
//   } catch (err) {
//     console.error('Error fetching user data from database:', err);
//     res.status(500).json({ message: 'Error fetching user data' });
//   }
// });

// // Route to get a specific user by ID
// router.get('/:userId', async (req, res) => {
//   const { userId } = req.params;
//   console.log(`Fetching details for user ID: ${userId}`);

//   try {
//     const user = await User.findById(userId).populate('missions');
//     if (!user) {
//       console.error('User not found');
//       return res.status(404).json({ error: 'User not found' });
//     }

//     console.log("User details retrieved:", user);
//     res.status(200).json(user);
//   } catch (err) {
//     console.error('Error fetching user details:', err);
//     res.status(500).json({ error: 'Error fetching user details' });
//   }
// });

// // Route to update a specific user by ID
// router.put('/:userId', async (req, res) => {
//   const { userId } = req.params;
//   console.log(`Attempting to update user with ID: ${userId}`);

//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       req.body,
//       { new: true, runValidators: true } // Return the updated document and validate fields
//     );

//     if (!updatedUser) {
//       console.error('User not found');
//       return res.status(404).json({ error: 'User not found' });
//     }

//     console.log("User updated successfully:", updatedUser);
//     res.status(200).json({ message: 'User updated successfully', user: updatedUser });
//   } catch (err) {
//     console.error('Error updating user:', err);
//     res.status(500).json({ error: 'Error updating user' });
//   }
// });

// // Route to delete a specific user by ID
// router.delete('/:userId', async (req, res) => {
//   const { userId } = req.params;
//   console.log(`Attempting to delete user with ID: ${userId}`);

//   try {
//     const deletedUser = await User.findByIdAndDelete(userId);
//     if (!deletedUser) {
//       console.error('User not found');
//       return res.status(404).json({ error: 'User not found' });
//     }

//     console.log("User deleted successfully:", deletedUser);
//     res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
//   } catch (err) {
//     console.error('Error deleting user:', err);
//     res.status(500).json({ error: 'Error deleting user' });
//   }
// });

// module.exports = router;

// const express = require('express');
// const User = require('../models/User');
// const Mission = require('../models/Mission');
// const bcrypt = require('bcrypt');
// const authenticate = require('./middlewareAuth');
// const router = express.Router();

// // Route to create a new user
// router.post('/', async (req, res) => {
//   console.log("Creating a new user with data:", req.body);
//   try {
//     const { username, password, firstName, lastName, email, phoneNumber, livingAddress, geographicArea, authorization, companyId } = req.body;

//     const existingUser = await User.findOne({ $or: [{ username }, { email }] });
//     if (existingUser) {
//       console.error('User with this username or email already exists');
//       return res.status(400).json({ error: 'User with this username or email already exists' });
//     }

//     const newUser = new User({
//       username,
//       password,
//       firstName,
//       lastName,
//       email,
//       phoneNumber,
//       livingAddress,
//       geographicArea,
//       authorization,
//       companyId,
//     });
//     console.log("New user data before saving:", newUser);
//     await newUser.save();

//     res.status(201).json({ message: 'User created successfully', user: newUser });
//   } catch (err) {
//     console.error('Error creating user:', err);
//     res.status(500).json({ error: 'Error creating user' });
//   }
// });

// // Route to get all users (returning only firstName, lastName, and _id)
// router.get('/', async (req, res) => {
//   console.log("Fetching all users");
//   try {
//     const users = await User.find({}, 'firstName lastName _id authorization');
//     console.log("Users fetched:", users);
//     res.status(200).json(users);
//   } catch (err) {
//     console.error('Error fetching users:', err);
//     res.status(500).json({ error: 'Error fetching users' });
//   }
// });

// // Other routes (get current user, get by ID, update, delete) remain unchanged
// module.exports = router;

const express = require('express');
const User = require('../models/User');
const Mission = require('../models/Mission');
const bcrypt = require('bcrypt');
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

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
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



router.put('/:userId/assign-mission', async (req, res) => {
  const { missionId } = req.body;
  const userId = mongoose.Types.ObjectId(req.params.userId);
  const missionObjectId = new mongoose.Types.ObjectId(missionId);



  console.log(`Received request to assign mission ${missionId} to user ${userId}`); // בדיקת קבלת בקשה

  try {
    const user = await User.findById(userId);
    if (!user) {
      console.error('User not found');
      return res.status(404).json({ error: 'User not found' });
    }

    const mission = await Mission.findById(missionObjectId);
    if (!mission) {
      console.error('Mission not found');
      return res.status(404).json({ error: 'Mission not found' });
    }

    // הוספת משימה למערך המשימות של המשתמש
    user.missions.addToSet(mission._id);
    mission.users.addToSet(user._id);

    await user.save();
    await mission.save();

    console.log(`Mission ${missionId} assigned to user ${userId} successfully`); // בדיקה להצלחת הפעולה
    res.status(200).json({ message: 'Mission assigned to user successfully', user, mission });
  } catch (error) {
    console.error('Error assigning mission to user:', error);
    res.status(500).json({ error: 'Error assigning mission to user' });
  }
});

module.exports = router;


// Route to assign a mission to a user and update both models
// router.put('/:userId/assign-mission', async (req, res) => {
//   const { missionId } = req.body;
//   const userId = mongoose.Types.ObjectId(req.params.userId);
//   const missionObjectId = mongoose.Types.ObjectId(missionId);

//   try {
//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ error: 'User not found' });

//     const mission = await Mission.findById(missionObjectId);
//     if (!mission) return res.status(404).json({ error: 'Mission not found' });

//     // Add mission to user's missions array and add user to mission's users array
//     user.missions.addToSet(mission._id);
//     mission.users.addToSet(user._id);

//     await user.save();
//     await mission.save();

//     res.status(200).json({ message: 'Mission assigned to user successfully', user, mission });
//   } catch (error) {
//     console.error('Error assigning mission to user:', error);
//     res.status(500).json({ error: 'Error assigning mission to user' });
//   }
// });