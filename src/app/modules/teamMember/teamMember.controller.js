import { TeamMemberService } from './teamMember.service.js';
import catchAsync from '../../utils/catchAsync.js';
import sendResponse from '../../utils/sendResponse.js';
import pick from '../../utils/pick.js';

const getTeamMembers = catchAsync(async (req, res) => {
  const filters = pick(req.query, ['searchTerm', 'sort', 'limit', 'page', 'fields', 'name', 'jobTitle']);
  const items = await TeamMemberService.getTeamMembers(filters);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Team members retrieved successfully',
    data: items,
  });
});

const getTeamMemberById = catchAsync(async (req, res) => {
  const item = await TeamMemberService.getTeamMemberById(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Team member retrieved successfully',
    data: item,
  });
});

const createTeamMember = catchAsync(async (req, res) => {
  const item = await TeamMemberService.createTeamMember(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Team member created successfully',
    data: item,
  });
});

const updateTeamMember = catchAsync(async (req, res) => {
  const item = await TeamMemberService.updateTeamMember(req.params.id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Team member updated successfully',
    data: item,
  });
});

const deleteTeamMember = catchAsync(async (req, res) => {
  const item = await TeamMemberService.deleteTeamMember(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Team member deleted successfully',
    data: item,
  });
});

export { getTeamMembers, getTeamMemberById, createTeamMember, updateTeamMember, deleteTeamMember };
