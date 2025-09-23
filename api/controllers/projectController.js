const Project = require('../models/projectModel');

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({}).sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) { res.status(500).json({ error: 'Server error' }); }
};

const createProject = async (req, res) => {
  const { title, lead, description, budget, status } = req.body;
  try {
    const project = await Project.create({ title, lead, description, budget, status, owner: req.user.id });
    res.status(201).json(project);
  } catch (error) { res.status(400).json({ error: error.message }); }
};

module.exports = { getProjects, createProject };