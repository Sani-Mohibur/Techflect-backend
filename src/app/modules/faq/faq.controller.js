import { FAQService } from './faq.service.js';
import catchAsync from '../../utils/catchAsync.js';
import sendResponse from '../../utils/sendResponse.js';
import pick from '../../utils/pick.js';

const getFAQs = catchAsync(async (req, res) => {
  const filters = pick(req.query, ['searchTerm', 'sort', 'limit', 'page', 'fields', 'question']);
  const items = await FAQService.getFAQs(filters);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'FAQs retrieved successfully',
    data: items,
  });
});

const getFAQById = catchAsync(async (req, res) => {
  const item = await FAQService.getFAQById(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'FAQ retrieved successfully',
    data: item,
  });
});

const createFAQ = catchAsync(async (req, res) => {
  const item = await FAQService.createFAQ(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'FAQ created successfully',
    data: item,
  });
});

const updateFAQ = catchAsync(async (req, res) => {
  const item = await FAQService.updateFAQ(req.params.id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'FAQ updated successfully',
    data: item,
  });
});

const deleteFAQ = catchAsync(async (req, res) => {
  const item = await FAQService.deleteFAQ(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'FAQ deleted successfully',
    data: item,
  });
});

export { getFAQs, getFAQById, createFAQ, updateFAQ, deleteFAQ };
