import express from 'express';
const router = express.Router();
import { 
  loginAdmin, 
  getMe, 
  getUsers, 
  createUser, 
  updateUser, 
  deleteUser, 
  toggleBlockUser 
} from './auth.controller.js';
import { protect, authorizeRoles } from '../../middleware/auth.js';
import { ROLES } from '../../utils/roles.js';

router.post('/login', loginAdmin);
router.get('/me', protect, getMe);

// User management routes (Admin only)
router.route('/users')
  .get(protect, authorizeRoles(ROLES.ADMIN), getUsers)
  .post(protect, authorizeRoles(ROLES.ADMIN), createUser);

router.route('/users/:id')
  .put(protect, authorizeRoles(ROLES.ADMIN), updateUser)
  .delete(protect, authorizeRoles(ROLES.ADMIN), deleteUser);

router.put('/users/:id/block', protect, authorizeRoles(ROLES.ADMIN), toggleBlockUser);

export default router;