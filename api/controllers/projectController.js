const Project = require('../models/projectModel');

// GET all projects
const getProjects = async (req, res) => {
  const projects = await Project.find({}).sort({ createdAt: -1 });
  res.status(200).json(projects);
};

// CREATE a new project
const createProject = async (req, res) => {
  const { title, lead, description, budget } = req.body;
  try {
    const project = await Project.create({ title, lead, description, budget });
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getProjects, createProject };