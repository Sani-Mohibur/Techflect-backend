import { ProjectService } from './project.service.js';
import catchAsync from '../../utils/catchAsync.js';
import sendResponse from '../../utils/sendResponse.js';
import pick from '../../utils/pick.js';

const getProjects = catchAsync(async (req, res) => {
  const filters = pick(req.query, ['searchTerm', 'sort', 'limit', 'page', 'fields', 'title']);
  const items = await ProjectService.getProjects(filters);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Projects retrieved successfully',
    data: items,
  });
});

const getProjectById = catchAsync(async (req, res) => {
  const item = await ProjectService.getProjectById(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Project retrieved successfully',
    data: item,
  });
});

const createProject = catchAsync(async (req, res) => {
  const item = await ProjectService.createProject(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Project created successfully',
    data: item,
  });
});

const updateProject = catchAsync(async (req, res) => {
  const item = await ProjectService.updateProject(req.params.id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Project updated successfully',
    data: item,
  });
});

const deleteProject = catchAsync(async (req, res) => {
  const item = await ProjectService.deleteProject(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Project deleted successfully',
    data: item,
  });
});

export { getProjects, getProjectById, createProject, updateProject, deleteProject };
