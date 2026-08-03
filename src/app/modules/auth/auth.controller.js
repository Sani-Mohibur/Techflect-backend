import { AuthService } from './auth.service.js';
import catchAsync from '../../utils/catchAsync.js';
import sendResponse from '../../utils/sendResponse.js';
import pick from '../../utils/pick.js';

const loginAdmin = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const result = await AuthService.loginAdmin(email, password);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in successfully',
    data: result,
  });
});

const getMe = catchAsync(async (req, res) => {
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User profile retrieved successfully',
    data: req.user,
  });
});

const getUsers = catchAsync(async (req, res) => {
  const filters = pick(req.query, ['searchTerm', 'sort', 'limit', 'page', 'fields', 'email', 'role']);
  const users = await AuthService.getUsers(filters);
  
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Users retrieved successfully',
    data: users,
  });
});

const createUser = catchAsync(async (req, res) => {
  const result = await AuthService.createUser(req.body);
  
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User created successfully',
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const result = await AuthService.updateUser(req.params.id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User updated successfully',
    data: result,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const result = await AuthService.deleteUser(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User deleted successfully',
    data: result,
  });
});

const toggleBlockUser = catchAsync(async (req, res) => {
  const result = await AuthService.toggleBlockUser(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User block status updated successfully',
    data: result,
  });
});

export { 
  loginAdmin,
  getMe,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  toggleBlockUser,
};
