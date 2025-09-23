const express = require('express');
const {
  createProject,
  getProjects,
  updateProject,
  deleteProject
} = require('../controllers/projectController');
const { protect, isAdminOrFaculty } = require('../middleware/authMiddleware');
const router = express.Router();

// Get all projects (any authenticated user)
router.get('/', protect, getProjects);

// Create a new project (Admin or Faculty)
router.post('/', protect, isAdminOrFaculty, createProject);

// Update a project (Admin or Faculty)
router.put('/:id', protect, isAdminOrFaculty, updateProject);

// Delete a project (Admin or Faculty)
router.delete('/:id', protect, isAdminOrFaculty, deleteProject);

module.exports = router;