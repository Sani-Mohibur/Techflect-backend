import { ServiceService } from './service.service.js';
import catchAsync from '../../utils/catchAsync.js';
import sendResponse from '../../utils/sendResponse.js';
import pick from '../../utils/pick.js';

const getServices = catchAsync(async (req, res) => {
  const filters = pick(req.query, ['searchTerm', 'sort', 'limit', 'page', 'fields', 'title']);
  const items = await ServiceService.getServices(filters);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Services retrieved successfully',
    data: items,
  });
});

const getServiceById = catchAsync(async (req, res) => {
  const item = await ServiceService.getServiceById(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Service retrieved successfully',
    data: item,
  });
});

const createService = catchAsync(async (req, res) => {
  const item = await ServiceService.createService(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Service created successfully',
    data: item,
  });
});

const updateService = catchAsync(async (req, res) => {
  const item = await ServiceService.updateService(req.params.id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Service updated successfully',
    data: item,
  });
});

const deleteService = catchAsync(async (req, res) => {
  const item = await ServiceService.deleteService(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Service deleted successfully',
    data: item,
  });
});

export { getServices, getServiceById, createService, updateService, deleteService };
