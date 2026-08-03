import { BlogService } from './blog.service.js';
import catchAsync from '../../utils/catchAsync.js';
import sendResponse from '../../utils/sendResponse.js';
import pick from '../../utils/pick.js';

const getBlogs = catchAsync(async (req, res) => {
  const filters = pick(req.query, ['searchTerm', 'sort', 'limit', 'page', 'fields', 'title']);
  const items = await BlogService.getBlogs(filters);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blogs retrieved successfully',
    data: items,
  });
});

const getBlogById = catchAsync(async (req, res) => {
  const item = await BlogService.getBlogById(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blog retrieved successfully',
    data: item,
  });
});

const createBlog = catchAsync(async (req, res) => {
  const item = await BlogService.createBlog(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Blog created successfully',
    data: item,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const item = await BlogService.updateBlog(req.params.id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blog updated successfully',
    data: item,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const item = await BlogService.deleteBlog(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blog deleted successfully',
    data: item,
  });
});

export { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog };
