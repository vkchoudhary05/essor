import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types';
import { StoreRepository } from '../repositories/store.repository';
import { UserRole } from '../../src/types';

/**
 * Middleware to resolve the active user/role from headers or system defaults
 */
export function authMiddleware(req: AuthenticatedRequest, _res: Response, next: NextFunction): void {
  const store = StoreRepository.getState();
  const roleHeader = req.header('X-Simulated-Role') as UserRole | undefined;

  if (roleHeader) {
    const user = store.users.find(u => u.role === roleHeader);
    if (user) {
      req.actor = user;
      return next();
    }
  }

  req.actor = store.currentUser;
  next();
}

/**
 * Helper to ensure an actor exists on the request
 */
export function getActor(req: AuthenticatedRequest) {
  if (req.actor) return req.actor;
  const store = StoreRepository.getState();
  return store.currentUser;
}
