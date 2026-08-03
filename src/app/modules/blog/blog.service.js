import Blog from './blog.model.js';
import QueryBuilder from '../../builder/QueryBuilder.js';
import AppError from '../../errors/AppError.js';

const getBlogs = async (query) => {
  const blogQuery = new QueryBuilder(Blog.find(), query)
    .search(['title'])
    .filter()
    .sort()
    .paginate()
    .fields();
  return await blogQuery.modelQuery;
};

const getBlogById = async (id) => {
  const item = await Blog.findById(id);
  if (!item) {
    throw new AppError(404, 'Blog not found');
  }
  return item;
};

const createBlog = async (payload) => {
  return await Blog.create(payload);
};

const updateBlog = async (id, payload) => {
  const item = await Blog.findByIdAndUpdate(id, payload, { new: true });
  if (!item) {
    throw new AppError(404, 'Blog not found');
  }
  return item;
};

const deleteBlog = async (id) => {
  const item = await Blog.findById(id);
  if (!item) {
    throw new AppError(404, 'Blog not found');
  }
  await item.deleteOne();
  return item;
};

export const BlogService = {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog
};
