import { Router } from 'express';
import { AuditLogController } from '../controllers/auditLog.controller';

export const auditLogRouter = Router();

auditLogRouter.get('/', AuditLogController.getLogs);
