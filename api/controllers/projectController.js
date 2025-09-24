const Project = require('../models/projectModel');

// GET all projects
const getProjects = async (req, res) => {
  try {
    const query = {};
    if (req.user.role === 'Student') {
      query.owner = req.user.id;
    }
    const projects = await Project.find(query).sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// GET a single project by ID
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    if (project.owner.toString() !== req.user.id && req.user.role === 'Student') {
      return res.status(403).json({ error: 'User not authorized to view this project' });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// CREATE a new project
const createProject = async (req, res) => {
  const { title, lead, description, budget, status } = req.body;
  try {
    const project = await Project.create({
      title,
      lead,
      description,
      budget,
      status,
      owner: req.user.id
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// UPDATE a project
const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    if (project.owner.toString() !== req.user.id && req.user.role !== 'Admin') {
      return res.status(403).json({ error: 'User not authorized to update this project' });
    }
    Object.assign(project, req.body);
    await project.save();
    res.status(200).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE a project
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    if (project.owner.toString() !== req.user.id && req.user.role !== 'Admin') {
      return res.status(403).json({ error: 'User not authorized to delete this project' });
    }
    await project.deleteOne();
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// CRITICAL PART: Ensure all functions are exported correctly
module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};