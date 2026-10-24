import { StoreRepository } from '../repositories/store.repository';
import { ServiceItem, TrainingCourse, User } from '../types';

export class CatalogService {
  static getAllServices(): ServiceItem[] {
    const s = StoreRepository.getState();
    return s.services;
  }

  static upsertService(srv: ServiceItem, actor: User): ServiceItem {
    const s = StoreRepository.getState();
    const idx = s.services.findIndex(item => item.id === srv.id);
    const updated = { ...srv, updatedAt: new Date().toISOString() };

    if (idx >= 0) {
      s.services[idx] = updated;
      StoreRepository.logAudit(actor, 'UPDATE', 'SERVICE', srv.id, `Updated service "${srv.title}"`);
    } else {
      s.services.push(updated);
      StoreRepository.logAudit(actor, 'CREATE', 'SERVICE', srv.id, `Created service "${srv.title}"`);
    }

    StoreRepository.saveState();
    return updated;
  }

  static getAllCourses(): TrainingCourse[] {
    const s = StoreRepository.getState();
    return s.courses;
  }

  static upsertCourse(crs: TrainingCourse, actor: User): TrainingCourse {
    const s = StoreRepository.getState();
    const idx = s.courses.findIndex(item => item.id === crs.id);
    const updated = { ...crs, updatedAt: new Date().toISOString() };

    if (idx >= 0) {
      s.courses[idx] = updated;
      StoreRepository.logAudit(actor, 'UPDATE', 'TRAINING', crs.id, `Updated training syllabus "${crs.title}"`);
    } else {
      s.courses.push(updated);
      StoreRepository.logAudit(actor, 'CREATE', 'TRAINING', crs.id, `Created training syllabus "${crs.title}"`);
    }

    StoreRepository.saveState();
    return updated;
  }
}
