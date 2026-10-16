import { Request } from 'express';
import { User, UserRole } from '../../src/types';

export interface AuthenticatedRequest extends Request {
  actor?: User;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  timestamp: string;
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
  search?: string;
}
