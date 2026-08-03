import { ProjectService } from './project.service.js';

const getProjects = async (req, res) => {
  const items = await ProjectService.getProjects();
  res.status(200).json(items);
};

const getProjectById = async (req, res) => {
  const item = await ProjectService.getProjectById(req.params.id);
  if (!item) { res.status(404); throw new Error('Project not found'); }
  res.status(200).json(item);
};

const createProject = async (req, res) => {
  const item = await ProjectService.createProject(req.body);
  res.status(201).json(item);
};

const updateProject = async (req, res) => {
  const item = await ProjectService.updateProject(req.params.id, req.body);
  if (!item) { res.status(404); throw new Error('Project not found'); }
  res.status(200).json(item);
};

const deleteProject = async (req, res) => {
  const item = await ProjectService.deleteProject(req.params.id);
  if (!item) { res.status(404); throw new Error('Project not found'); }
  res.status(200).json({ id: req.params.id });
};

export { getProjects, getProjectById, createProject, updateProject, deleteProject };
