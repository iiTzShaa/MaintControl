const express = require('express');
const db = require('./mongodb/index'); 
const fs = require('fs');
require('dotenv').config({ path: 'C:/Users/wwera/OneDrive/שולחן העבודה/Maintenance HIT/MaintControl/.env' }); 

// Initialize express app
const app = express();
app.use(express.json()); // Middleware for JSON body parsing

// Function to dynamically load routes
const getDirectories = (path) => {
  let directories = [];
  fs.readdirSync(path).forEach((file) => {
    const fullPath = path + '/' + file;
    if (fs.statSync(fullPath).isDirectory()) {
      directories.push(fullPath);
      directories = directories.concat(getDirectories(fullPath)); // Recursively get subdirectories
    }
  });
  return directories;
};

// Load and register routes dynamically
const directories = getDirectories('./routes');
directories.forEach((directory) => {
  fs.readdir(directory, (err, files) => {
    if (err) return console.error(err); // Handle errors

    files.forEach((file) => {
      const filePath = directory + '/' + file;
      if (fs.statSync(filePath).isFile()) {
        app.use('/', require(filePath)); // Register routes
      }
    });
  });
});

// Connect to MongoDB using the connection function
db.connectMaintControlDB()
  .then(() => {
    // Start the server only after successful DB connection
    app.listen(process.env.APP_PORT, () => {
      console.log(`Server listening on port ${process.env.APP_PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to the database. Server not started.', err);
  });


























/* const express = require('express')
const db = require('./db/index')
const fs = require("fs")
require('dotenv').config()

// connect middlware
const app = express()
app.use(express.json())

const getDirectories = (path) => {
  let directories = []
  fs.readdirSync(path).forEach((file) => {
    const fullPath = path + '/' + file
    if (fs.statSync(fullPath).isDirectory()) {
      directories.push(fullPath)
      directories = directories.concat(getDirectories(fullPath))
    }
  })
  return directories
}

const directories = getDirectories('./routes')
directories.forEach((directory) => {
  fs.readdir(directory, (err, files) => {
    files.forEach((file) => {
      const filePath = directory + '/' + file
      if (fs.statSync(filePath).isFile()) {
        app.use('/', require(filePath))
      }
    })
  })
})

//connect db
db.connectMaintControlDB()

//start server
app.listen(process.env.APP_PORT, () => {
  console.log(`Server listening on port ${process.env.APP_PORT}`)
}) */