const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the User schema with the required parameters
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  livingAddress: {
    type: String,
    required: true,
  },
  geographicArea: {
    type: String,
    required: true,
  },
  authorization: {
    type: String,
    enum: ['user', 'admin'], // Example, can be customized
    default: 'user',
    required: true,
  },
  companyId: {
    type: String, // Assuming it's a reference to a Company document
    ref: 'Company',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash the password before saving
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
