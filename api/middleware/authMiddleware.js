const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Ensure this path is correct

// Protect routes: This function remains the same as it's already excellent.
const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        return res.status(401).json({ error: 'User not found for this token' });
      }
      next();
    } catch (error) {
      return res.status(401).json({ error: 'Not authorized, token failed' });
    }
  } else {
    return res.status(401).json({ error: 'Not authorized, no token' });
  }
};

// --- REFACTORED ROLE-BASED AUTHORIZATION ---
// This single function replaces all the previous `isAdmin`, `isFaculty`, etc. functions.
const authorize = (...roles) => {
  return (req, res, next) => {
    // This middleware should run AFTER the 'protect' middleware,
    // so req.user will be available.
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: `Forbidden. User with role '${req.user.role}' is not authorized for this route.` 
      });
    }
    next();
  };
};


module.exports = {
  protect,
  authorize // Export the new, flexible function
};