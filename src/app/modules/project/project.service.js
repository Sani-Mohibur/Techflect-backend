import Project from './project.model.js';

const getProjects = async () => {
  return await Project.find();
};

const getProjectById = async (id) => {
  return await Project.findById(id);
};

const createProject = async (payload) => {
  return await Project.create(payload);
};

const updateProject = async (id, payload) => {
  return await Project.findByIdAndUpdate(id, payload, { new: true });
};

const deleteProject = async (id) => {
  const item = await Project.findById(id);
  if (item) {
    await item.deleteOne();
  }
  return item;
};

export const ProjectService = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};
