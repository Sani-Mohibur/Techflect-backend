import Blog from './blog.model.js';

const getBlogs = async () => {
  return await Blog.find();
};

const getBlogById = async (id) => {
  return await Blog.findById(id);
};

const createBlog = async (payload) => {
  return await Blog.create(payload);
};

const updateBlog = async (id, payload) => {
  return await Blog.findByIdAndUpdate(id, payload, { new: true });
};

const deleteBlog = async (id) => {
  const item = await Blog.findById(id);
  if (item) {
    await item.deleteOne();
  }
  return item;
};

export const BlogService = {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog
};
