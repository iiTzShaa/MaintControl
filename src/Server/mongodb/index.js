
require('dotenv').config(); // Load environment variables from .env
console.log('MongoDB URI from .env:', process.env.MONGODB_URI); // Debugging line
const mongoose = require('mongoose');
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');


const app = express();
app.use(express.json()); // Middleware to parse JSON

const uri = process.env.MONGODB_URI;
app.use(cors({
  origin: 'http://localhost:3001', // Replace this with the port your React app is running on
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}))

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
 
console.log("connecting to the server...");
// Connect to the database
connectDB();

app.use('/users', userRoutes);

// Define routes or import them
// Example route
app.get('/', (req, res) => {
  res.send('API is running!');
});



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



