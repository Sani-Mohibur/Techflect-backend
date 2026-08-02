const Blog = require('./Blog');

const getBlogs = async (req, res) => {
  const items = await Blog.find();
  res.status(200).json(items);
};

const getBlogById = async (req, res) => {
  const item = await Blog.findById(req.params.id);
  if (!item) { res.status(404); throw new Error('Blog not found'); }
  res.status(200).json(item);
};

const createBlog = async (req, res) => {
  const item = await Blog.create(req.body);
  res.status(201).json(item);
};

const updateBlog = async (req, res) => {
  const item = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) { res.status(404); throw new Error('Blog not found'); }
  res.status(200).json(item);
};

const deleteBlog = async (req, res) => {
  const item = await Blog.findById(req.params.id);
  if (!item) { res.status(404); throw new Error('Blog not found'); }
  await item.deleteOne();
  res.status(200).json({ id: req.params.id });
};

module.exports = { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog };
