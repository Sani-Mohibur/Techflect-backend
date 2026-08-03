import express from 'express';
const router = express.Router();
import { getTeamMembers, getTeamMemberById, createTeamMember, updateTeamMember, deleteTeamMember  } from './teamMember.controller.js';
import { protect  } from '../../middleware/auth.js';

router.route('/')
  .get(getTeamMembers)
  .post(protect, createTeamMember);

router.route('/:id')
  .get(getTeamMemberById)
  .put(protect, updateTeamMember)
  .delete(protect, deleteTeamMember);

export default router;