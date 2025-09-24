const Project = require('../models/projectModel');

// GET all projects (filtered by user role)
const getProjects = async (req, res) => {
  try {
    const query = {};
    // If the user's role is 'Student', they only see projects they own.
    // Admins and Faculty can see all projects.
    if (req.user.role === 'Student') {
      query.owner = req.user.id;
    }
    
    const projects = await Project.find(query).sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// NEW: Get a single project by ID
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Security check: Allow access if the user is the owner or an Admin/Faculty
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
      owner: req.user.id // Automatically set owner from authenticated user
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

    // SECURITY: Check if user is the owner or an Admin before allowing update
    if (project.owner.toString() !== req.user.id && req.user.role !== 'Admin') {
      return res.status(403).json({ error: 'User not authorized to update this project' });
    }

    // Update the project fields and save
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

    // SECURITY: Check if user is the owner or an Admin before allowing delete
    if (project.owner.toString() !== req.user.id && req.user.role !== 'Admin') {
        return res.status(403).json({ error: 'User not authorized to delete this project' });
    }

    await project.deleteOne();
    res.status(204).end(); // 204 No Content is standard for a successful deletion
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getProjects,
  getProjectById, // Make sure to export the new function
  createProject,
  updateProject,
  deleteProject
};