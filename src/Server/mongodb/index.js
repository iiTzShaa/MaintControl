require('dotenv').config({ path: 'C:/Users/wwera/OneDrive/שולחן העבודה/Maintenance HIT/MaintControl/.env' });
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
};


connectMaintControlDB();
// Export the database connection function
module.exports = {
  connectMaintControlDB,
};