const jwt = require('jsonwebtoken');
const User = require('../models/User'); 

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Authorization header:", authHeader); 

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.error("Authorization token missing or malformed");
    return res.status(401).json({ message: 'Authorization token required.' });
  }

  const token = authHeader.split(' ')[1];
  console.log("Extracted token:", token); 

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded); 

    req.userId = decoded.userId; 
    console.log("User ID from token in authenticate middleware:", req.userId); 
    next();
  } catch (error) {
    console.error('JWT verification error:', error);
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token has expired.' });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token.' });
    } else {
      return res.status(401).json({ message: 'Invalid or expired token.' });
    }
  }
};

module.exports = authenticate;

