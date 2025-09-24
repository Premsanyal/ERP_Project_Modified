const express = require('express');
// CRITICAL PART: Ensure all functions are imported correctly
const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject
} = require('../controllers/projectController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

// Chain GET and POST routes for the base endpoint
router.route('/')
  .get(protect, getProjects)
  .post(protect, authorize('Admin', 'Faculty'), createProject);

// Chain GET, PUT, and DELETE for endpoints with an ID
router.route('/:id')
  .get(protect, getProjectById)
  .put(protect, authorize('Admin', 'Faculty'), updateProject)
  .delete(protect, authorize('Admin', 'Faculty'), deleteProject);

module.exports = router;