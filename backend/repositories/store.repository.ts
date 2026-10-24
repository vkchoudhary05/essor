import { ServerStore, ServerState } from '../store';
import { User, AuditLog } from '../types';

export class StoreRepository {
  /**
   * Retrieves the current snapshot of the in-memory/file-persisted state
   */
  static getState(): ServerState {
    return ServerStore.getState();
  }

  /**
   * Persists the current state to disk
   */
  static saveState(): void {
    ServerStore.saveState();
  }

  /**
   * Logs an action to the immutable audit trail
   */
  static logAudit(actor: User, action: string, entityType: any, entityId: string, summary: string): void {
    ServerStore.logAction(actor, action, entityType, entityId, summary);
  }

  /**
   * Finds a user by ID or email
   */
  static findUserByEmail(email: string): User | undefined {
    const state = this.getState();
    return state.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  static findUserByRole(role: string): User | undefined {
    const state = this.getState();
    return state.users.find(u => u.role === role);
  }
}
