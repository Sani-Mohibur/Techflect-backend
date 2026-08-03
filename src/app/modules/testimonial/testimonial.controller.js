import { TestimonialService } from './testimonial.service.js';
import catchAsync from '../../utils/catchAsync.js';
import sendResponse from '../../utils/sendResponse.js';
import pick from '../../utils/pick.js';

const getTestimonials = catchAsync(async (req, res) => {
  const filters = pick(req.query, ['searchTerm', 'sort', 'limit', 'page', 'fields', 'name']);
  const items = await TestimonialService.getTestimonials(filters);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Testimonials retrieved successfully',
    data: items,
  });
});

const getTestimonialById = catchAsync(async (req, res) => {
  const item = await TestimonialService.getTestimonialById(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Testimonial retrieved successfully',
    data: item,
  });
});

const createTestimonial = catchAsync(async (req, res) => {
  const item = await TestimonialService.createTestimonial(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Testimonial created successfully',
    data: item,
  });
});

const updateTestimonial = catchAsync(async (req, res) => {
  const item = await TestimonialService.updateTestimonial(req.params.id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Testimonial updated successfully',
    data: item,
  });
});

const deleteTestimonial = catchAsync(async (req, res) => {
  const item = await TestimonialService.deleteTestimonial(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Testimonial deleted successfully',
    data: item,
  });
});

export { getTestimonials, getTestimonialById, createTestimonial, updateTestimonial, deleteTestimonial };
