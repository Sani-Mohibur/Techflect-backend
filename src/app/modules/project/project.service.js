import Project from './project.model.js';
import QueryBuilder from '../../builder/QueryBuilder.js';
import AppError from '../../errors/AppError.js';

const getProjects = async (query) => {
  const projectQuery = new QueryBuilder(Project.find(), query)
    .search(['title', 'description'])
    .filter()
    .sort()
    .paginate()
    .fields();
  return await projectQuery.modelQuery;
};

const getProjectById = async (id) => {
  const item = await Project.findById(id);
  if (!item) {
    throw new AppError(404, 'Project not found');
  }
  return item;
};

const createProject = async (payload) => {
  return await Project.create(payload);
};

const updateProject = async (id, payload) => {
  const item = await Project.findByIdAndUpdate(id, payload, { new: true });
  if (!item) {
    throw new AppError(404, 'Project not found');
  }
  return item;
};

const deleteProject = async (id) => {
  const item = await Project.findById(id);
  if (!item) {
    throw new AppError(404, 'Project not found');
  }
  await item.deleteOne();
  return item;
};

export const ProjectService = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};
