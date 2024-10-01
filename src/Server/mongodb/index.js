/*require('dotenv').config({ path: 'C:/Users/wwera/OneDrive/שולחן העבודה/Maintenance HIT/MaintControl/.env' });
console.log('MongoDB URI from .env:', process.env.MONGODB_URI); // Check if it's loading

const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI; 

if (!uri) {
  console.error('MongoDB URI is not defined! Ensure the .env file is properly configured.');
  process.exit(1); // Exit the process if the URI is not defined
}


// Function to connect to MongoDB
const connectMaintControlDB = () => {
  return new Promise((resolve, reject) => {
    try {
      // Connect to MongoDB using mongoose
      mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      // Get the database connection instance
      const db = mongoose.connection;
      // If an error occurs while connecting
      db.on('error', (err) => {
        console.log('Error connecting to the database: ', err);
        reject(err);
      });

      // Once successfully connected
      db.once('open', () => {
        console.log('Connected to MongoDB');
        resolve();
      });
    } catch (error) {
      console.log('Connection failure:', error);
      reject(error);
    }
  });
};*/


/*connectMaintControlDB();
// Export the database connection function
module.exports = {
  connectMaintControlDB,
};*/



/*const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://evyataravni24:0604@cluster0.e546c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);*/





require('dotenv').config(); // Load environment variables from .env
console.log('MongoDB URI from .env:', process.env.MONGODB_URI); // Debugging line
const mongoose = require('mongoose');
const express = require('express');
const userRoutes = require('./routes/userRoutes');
 

const app = express();
app.use(express.json()); // Middleware to parse JSON

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



