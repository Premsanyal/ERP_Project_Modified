const express = require('express');
const { createProject, getProjects } = require('../controllers/projectController');
const { protect, isAdminOrStaff } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', protect, getProjects);
router.post('/', protect, isAdminOrStaff, createProject);

module.exports = router;