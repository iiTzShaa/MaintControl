const User = require('./models/User');


require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import CORS

const app = express();

// Enable CORS for specific origin (replace 'http://localhost:3000' with your frontend URL)
app.use(cors({
  origin: 'http://localhost:3000' // Replace this with the actual URL of your frontend
}));

app.use(express.json()); // Middleware to parse JSON

// MongoDB connection
const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error('MongoDB URI is not defined! Make sure to configure .env file.');
  process.exit(1);
}

async function connectDB() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

connectDB().then(() => addTestUser());

// Function to add a test user to the database
async function addTestUser() {
  try {
    // Define the test user details
    const testUser = new User ({
      username: 'testUser',
      password: 'testPassword123',
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      phoneNumber: '1234567890',
      livingAddress: '123 Test St',
      geographicArea: 'Test Area',
      authorization: 'admin',
      companyId: '12345'
    });

    // Save the user to the database
    await testUser.save();
    console.log('Test user added successfully!');
  } catch (error) {
    console.error('Error adding test user:', error.message);
  }
}

// Define your routes
app.get('/', (req, res) => {
  res.send('API is running!');
});

// Example of using your routes
const userRoutes = require('./routes/userRoutes'); // Assuming you have user routes
app.use('/api/users', userRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


