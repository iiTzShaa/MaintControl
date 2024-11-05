// // middleware/authenticate.js
// const jwt = require('jsonwebtoken');
// const User = require('../models/User'); // Optional: Only needed if you want to fetch user details in middleware

// const authenticate = async (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   // Check if the authorization header is present and starts with 'Bearer '
//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return res.status(401).json({ message: 'Authorization token required.' });
//   }

//   const token = authHeader.split(' ')[1]; // Extract the token part from "Bearer <token>"

//   // Check if JWT_SECRET is set in the environment variables
//   if (!process.env.JWT_SECRET) {
//     console.error('JWT_SECRET is not defined in the environment variables.');
//     return res.status(500).json({ message: 'Internal server error.' });
//   }

//   try {
//     // Verify the token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("Decoded token:", decoded);
//     req.userId = decoded.userId; // Attach user ID from the token to the request object

//     // Optionally: Fetch the user details and attach to request (uncomment if needed)
//     // req.user = await User.findById(decoded.userId);
    
//     next(); // Continue to the next middleware or route handler
//   } catch (error) {
//     // Customize error messages based on JWT error types
//     if (error.name === 'TokenExpiredError') {
//       return res.status(401).json({ message: 'Token has expired.' });
//     } else if (error.name === 'JsonWebTokenError') {
//       return res.status(401).json({ message: 'Invalid token.' });
//     } else {
//       console.error('JWT verification error:', error);
//       return res.status(401).json({ message: 'Invalid or expired token.' });
//     }
//   }
// };

// module.exports = authenticate;

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

