import express from 'express';
const router = express.Router();
import { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog  } from './blog.controller.js';
import { protect  } from '../../middleware/authMiddleware.js';

router.route('/')
  .get(getBlogs)
  .post(protect, createBlog);

router.route('/:id')
  .get(getBlogById)
  .put(protect, updateBlog)
  .delete(protect, deleteBlog);

export default router;