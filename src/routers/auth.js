import { Router } from 'express';
import {
  loginUserController,
  logoutUserController,
  refreshUserController,
  registerUserController,
  requestResetMailController,
  resetPasswordController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validatorBody.js';
import { loginUserSchema, registerUserSchema } from '../validators/users.js';
import { controllerWrapper } from '../utils/controllerWrapper.js';

const AuthRouter = Router();

AuthRouter.post(
  '/register',
  validateBody(registerUserSchema),
  controllerWrapper(registerUserController),
);

AuthRouter.post(
  '/login',
  validateBody(loginUserSchema),
  controllerWrapper(loginUserController),
);

AuthRouter.post('/logout', controllerWrapper(logoutUserController));

AuthRouter.post('/refresh', controllerWrapper(refreshUserController));

AuthRouter.post(
  '/request-reset-email',
  controllerWrapper(requestResetMailController),
);

AuthRouter.post('/reset-password', controllerWrapper(resetPasswordController));

export default AuthRouter;
