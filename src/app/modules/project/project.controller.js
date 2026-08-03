import Project from './project.model.js';

const getProjects = async (req, res) => {
  const items = await Project.find();
  res.status(200).json(items);
};

const getProjectById = async (req, res) => {
  const item = await Project.findById(req.params.id);
  if (!item) { res.status(404); throw new Error('Project not found'); }
  res.status(200).json(item);
};

const createProject = async (req, res) => {
  const item = await Project.create(req.body);
  res.status(201).json(item);
};

const updateProject = async (req, res) => {
  const item = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) { res.status(404); throw new Error('Project not found'); }
  res.status(200).json(item);
};

const deleteProject = async (req, res) => {
  const item = await Project.findById(req.params.id);
  if (!item) { res.status(404); throw new Error('Project not found'); }
  await item.deleteOne();
  res.status(200).json({ id: req.params.id });
};

export { getProjects, getProjectById, createProject, updateProject, deleteProject  };
