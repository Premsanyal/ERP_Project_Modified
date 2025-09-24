const express = require('express');
const {
  createProject,
  getProjects,
  getProjectById, // <-- Import the new function
  updateProject,
  deleteProject
} = require('../controllers/projectController');
const { protect, isAdminOrFaculty } = require('../middleware/authMiddleware');
const router = express.Router();

// Get all projects (any authenticated user) & Create a new project (Admin or Faculty)
router.route('/')
  .get(protect, getProjects)
  .post(protect, isAdminOrFaculty, createProject);

// Get a single project (any authenticated user)
// Update a project (Admin or Faculty)
// Delete a project (Admin or Faculty)
router.route('/:id')
  .get(protect, getProjectById) // <-- ADDED THIS LINE
  .put(protect, isAdminOrFaculty, updateProject)
  .delete(protect, isAdminOrFaculty, deleteProject);

module.exports = router;