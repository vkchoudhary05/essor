import { StoreRepository } from '../repositories/store.repository';
import { User, UserRole } from '../types';

export class AuthService {
  static getCurrentUser(actor?: User): User {
    if (actor) return actor;
    const store = StoreRepository.getState();
    return store.currentUser;
  }

  static switchRole(role: UserRole): User {
    const store = StoreRepository.getState();
    let user = store.users.find(u => u.role === role);

    if (!user) {
      user = {
        id: `usr-${Date.now()}`,
        name: `${role} User`,
        email: `${String(role).toLowerCase()}@essorcompliance.com`,
        role,
        isActive: true
      };
      store.users.push(user);
    }

    store.currentUser = user;
    StoreRepository.saveState();
    StoreRepository.logAudit(user, 'SWITCH_ROLE', 'USER', user.id, `Simulated role changed to ${role}`);
    return user;
  }

  static login(email: string): User {
    const store = StoreRepository.getState();
    let user = store.users.find(u => u.email.toLowerCase() === String(email).toLowerCase());

    if (!user) {
      user = {
        id: `usr-${Date.now()}`,
        name: email.split('@')[0],
        email,
        role: 'PARTICIPANT',
        isActive: true
      };
      store.users.push(user);
    }

    store.currentUser = user;
    StoreRepository.saveState();
    StoreRepository.logAudit(user, 'LOGIN', 'USER', user.id, `User logged in: ${user.email}`);
    return user;
  }
}
