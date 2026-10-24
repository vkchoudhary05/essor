import { StoreRepository } from '../repositories/store.repository';
import { AuditLog } from '../types';

export class AuditLogService {
  static getLogs(): AuditLog[] {
    const s = StoreRepository.getState();
    return s.auditLogs;
  }
}
