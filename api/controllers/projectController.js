const Project = require('../models/projectModel');

// Get all projects (optionally filter by user)
const getProjects = async (req, res) => {
  try {
    // Optionally, filter by owner: { owner: req.user.id }
    const projects = await Project.find({}).sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Create a new project
const createProject = async (req, res) => {
  const { title, lead, description, budget, status } = req.body;
  try {
    const project = await Project.create({
      title,
      lead,
      description,
      budget,
      status,
      owner: req.user.id // set by authMiddleware
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a project
const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    // Optionally, check ownership: if (project.owner.toString() !== req.user.id) { ... }

    Object.assign(project, req.body);
    await project.save();
    res.status(200).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a project
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    // Optionally, check ownership: if (project.owner.toString() !== req.user.id) { ... }

    await project.deleteOne();
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getProjects,
  createProject,
  updateProject,
  deleteProject
};