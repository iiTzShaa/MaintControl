// const mongoose = require('mongoose');

// // Define the Mission schema with the required parameters
// const missionSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   address: {
//     type: String,
//     required: true,
//   },
//   city: {
//     type: String,
//     required: true,
//   },
//   area: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   created_date: {
//     type: Date,
//     default: Date.now,
//     required: true,
//   },
//   priority: {
//     type: String,
//     enum: ['Low', 'Medium', 'High'],
//     default: 'Low',
//     required: true,
//   },
//   users: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
//   }],
  
// });

// // Create the Mission model
// const Mission = mongoose.model('Mission', missionSchema);

// module.exports = Mission;

const mongoose = require('mongoose');
 
 
const missionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  created_date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Low',
    required: true,
  },
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  notes: [{
    type: String,
    required: false,
  }],
  status: {
    type: String,
    enum: ['To Do', 'In Progress', 'Done'],
    default: 'To Do',
    required: false,
  },
});
 
// Create the Mission model
const Mission = mongoose.model('Mission', missionSchema);
 
module.exports = Mission;