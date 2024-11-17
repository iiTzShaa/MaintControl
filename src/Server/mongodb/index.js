require('dotenv').config();
console.log('MongoDB URI from .env:', process.env.MONGODB_URI); 
const mongoose = require('mongoose');
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const missionRoutes = require('./routes/missionRoutes');
const authRoutes = require('./routes/auth'); 
const cors = require('cors');

const app = express();
app.use(express.json()); // Middleware to parse JSON

console.log('JWT_SECRET:', process.env.JWT_SECRET);
const uri = process.env.MONGODB_URI;

app.use(cors({
  origin: 'http://localhost:3001', // Replace this with the port your React app is running on
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.options('*', cors()); // Enable preflight requests for all routes

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

console.log("Connecting to the database...");
// Connect to the database
connectDB();

// Set up routes
app.use('/users', userRoutes);  // Users without /api prefix
app.use('/api/missions', missionRoutes); // Missions with /api prefix
app.use('/auth', authRoutes); // Authentication without /api prefix

// Example route
app.get('/', (req, res) => {
  res.send('API is running!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
