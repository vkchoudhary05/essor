import { Response } from 'express';
import { AuthenticatedRequest } from '../types';
import { AuthService } from '../services/auth.service';
import { getActor } from '../middlewares/auth.middleware';

export class AuthController {
  static getMe(req: AuthenticatedRequest, res: Response): void {
    const actor = getActor(req);
    const user = AuthService.getCurrentUser(actor);
    res.json(user);
  }

  static switchRole(req: AuthenticatedRequest, res: Response): void {
    const { role } = req.body;
    if (!role) {
      res.status(400).json({ error: 'Role is required' });
      return;
    }
    const user = AuthService.switchRole(role);
    res.json(user);
  }

  static login(req: AuthenticatedRequest, res: Response): void {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({ error: 'Email is required' });
      return;
    }
    const user = AuthService.login(email);
    res.json(user);
  }
}
