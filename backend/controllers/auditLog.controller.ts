import { Response } from 'express';
import { AuthenticatedRequest } from '../types';
import { AuditLogService } from '../services/auditLog.service';

export class AuditLogController {
  static getLogs(_req: AuthenticatedRequest, res: Response): void {
    const logs = AuditLogService.getLogs();
    res.json(logs);
  }
}
