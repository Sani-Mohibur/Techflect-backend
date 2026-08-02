import express from 'express';
const router = express.Router();
import { getProjects, getProjectById, createProject, updateProject, deleteProject  } from './project.controller.js';
import { protect  } from '../../middleware/authMiddleware.js';

router.route('/')
  .get(getProjects)
  .post(protect, createProject);

router.route('/:id')
  .get(getProjectById)
  .put(protect, updateProject)
  .delete(protect, deleteProject);

export default router;