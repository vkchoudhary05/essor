import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

export const authRouter = Router();

authRouter.get('/me', AuthController.getMe);
authRouter.post('/switch-role', AuthController.switchRole);
authRouter.post('/login', AuthController.login);
