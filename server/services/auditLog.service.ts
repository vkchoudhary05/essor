import { StoreRepository } from '../repositories/store.repository';
import { AuditLog } from '../../src/types';

export class AuditLogService {
  static getLogs(): AuditLog[] {
    const s = StoreRepository.getState();
    return s.auditLogs;
  }
}
