import { BlogService } from './blog.service.js';

const getBlogs = async (req, res) => {
  const items = await BlogService.getBlogs();
  res.status(200).json(items);
};

const getBlogById = async (req, res) => {
  const item = await BlogService.getBlogById(req.params.id);
  if (!item) { res.status(404); throw new Error('Blog not found'); }
  res.status(200).json(item);
};

const createBlog = async (req, res) => {
  const item = await BlogService.createBlog(req.body);
  res.status(201).json(item);
};

const updateBlog = async (req, res) => {
  const item = await BlogService.updateBlog(req.params.id, req.body);
  if (!item) { res.status(404); throw new Error('Blog not found'); }
  res.status(200).json(item);
};

const deleteBlog = async (req, res) => {
  const item = await BlogService.deleteBlog(req.params.id);
  if (!item) { res.status(404); throw new Error('Blog not found'); }
  res.status(200).json({ id: req.params.id });
};

export { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog };
