const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Protect routes (require authentication)
const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) return res.status(401).json({ error: 'User not found' });
      next();
    } catch (error) {
      return res.status(401).json({ error: 'Not authorized, token failed' });
    }
  } else {
    return res.status(401).json({ error: 'Not authorized, no token' });
  }
};

// Role-based access: Admin only
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'Admin') {
    next();
  } else {
    res.status(403).json({ error: 'Not authorized as Admin' });
  }
};

// Role-based access: Faculty only
const isFaculty = (req, res, next) => {
  if (req.user && req.user.role === 'Faculty') {
    next();
  } else {
    res.status(403).json({ error: 'Not authorized as Faculty' });
  }
};

// Role-based access: Student only
const isStudent = (req, res, next) => {
  if (req.user && req.user.role === 'Student') {
    next();
  } else {
    res.status(403).json({ error: 'Not authorized as Student' });
  }
};

// Role-based access: Admin or Faculty
const isAdminOrFaculty = (req, res, next) => {
  if (req.user && (req.user.role === 'Admin' || req.user.role === 'Faculty')) {
    next();
  } else {
    res.status(403).json({ error: 'Not authorized as Admin or Faculty' });
  }
};

// Role-based access: Admin or Staff (for legacy compatibility)
const isAdminOrStaff = (req, res, next) => {
  if (req.user && (req.user.role === 'Admin' || req.user.role === 'Staff')) {
    next();
  } else {
    res.status(403).json({ error: 'Not authorized as Admin or Staff' });
  }
};

module.exports = {
  protect,
  isAdmin,
  isFaculty,
  isStudent,
  isAdminOrFaculty,
  isAdminOrStaff
};