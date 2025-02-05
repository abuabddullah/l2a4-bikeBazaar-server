import express from 'express';
import { userController } from './user.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { auth } from '../../middlewares/auth';
import {
  registerSchema,
  loginSchema,
  updateProfileSchema,
  changePasswordSchema,
} from './user.validation';

const router = express.Router();

router.post(
  '/register',
  validateRequest(registerSchema),
  userController.register
);
router.post('/login', validateRequest(loginSchema), userController.login);
router.get('/profile', auth(), userController.getProfile);
router.patch(
  '/profile',
  auth(),
  validateRequest(updateProfileSchema),
  userController.updateProfile
);
router.post(
  '/change-password',
  auth(),
  validateRequest(changePasswordSchema),
  userController.changePassword
);

export const userRoutes = router;