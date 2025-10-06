import { Router } from 'express';
import {
  loginUserController,
  registerUserController,
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

export default AuthRouter;
