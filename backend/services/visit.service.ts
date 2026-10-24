import { StoreRepository } from '../repositories/store.repository';
import { CompanyVisit, User } from '../types';

export class VisitService {
  static getAllVisits(): CompanyVisit[] {
    const s = StoreRepository.getState();
    return s.visits;
  }

  static upsertVisit(visit: CompanyVisit, actor: User): CompanyVisit {
    const s = StoreRepository.getState();
    const idx = s.visits.findIndex(v => v.id === visit.id);
    const updated = { ...visit, updatedAt: new Date().toISOString() };

    if (idx >= 0) {
      s.visits[idx] = updated;
      StoreRepository.logAudit(actor, 'UPDATE', 'VISIT', visit.id, `Updated visit ${visit.visitReference}`);
    } else {
      s.visits.push(updated);
      StoreRepository.logAudit(actor, 'CREATE', 'VISIT', visit.id, `Scheduled visit ${visit.visitReference}`);
    }

    StoreRepository.saveState();
    return updated;
  }

  static reviewVisit(id: string, decision: 'APPROVED' | 'REVISE', notes: string | undefined, actor: User): CompanyVisit {
    const s = StoreRepository.getState();
    const target = s.visits.find(v => v.id === id);
    if (!target) throw new Error('Visit not found');

    target.status = decision === 'APPROVED' ? 'APPROVED' : 'CONFIRMED';
    target.reviewNotes = notes;
    target.reviewedBy = actor.name;
    target.reviewedAt = new Date().toISOString();
    target.updatedAt = new Date().toISOString();

    StoreRepository.saveState();
    StoreRepository.logAudit(actor, 'REVIEW_VISIT', 'VISIT', target.id, `${decision} visit report ${target.visitReference}`);
    return target;
  }
}
