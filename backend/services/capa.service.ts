import { StoreRepository } from '../repositories/store.repository';
import { CorrectiveAction, User } from '../types';

export class CapaService {
  static getAllCapas(): CorrectiveAction[] {
    const s = StoreRepository.getState();
    return s.capas;
  }

  static upsertCapa(capa: CorrectiveAction, actor: User): CorrectiveAction {
    const s = StoreRepository.getState();
    const idx = s.capas.findIndex(c => c.id === capa.id);
    const updated = { ...capa, updatedAt: new Date().toISOString() };

    if (idx >= 0) {
      s.capas[idx] = updated;
      StoreRepository.logAudit(actor, 'UPDATE', 'CAPA', capa.id, `Updated CAPA ${capa.referenceNumber}`);
    } else {
      s.capas.push(updated);
      StoreRepository.logAudit(actor, 'CREATE', 'CAPA', capa.id, `Created CAPA ${capa.referenceNumber}`);
    }

    StoreRepository.saveState();
    return updated;
  }

  static attachEvidence(id: string, payload: { filename?: string; notes?: string }, actor: User): CorrectiveAction {
    const s = StoreRepository.getState();
    const target = s.capas.find(c => c.id === id);
    if (!target) throw new Error('CAPA not found');

    const evidence = {
      id: `ev-${Date.now()}`,
      uploadedBy: actor.name,
      uploadedByRole: actor.role,
      filename: payload.filename || 'evidence.pdf',
      notes: payload.notes || 'Corrective action evidence attachment',
      createdAt: new Date().toISOString()
    };

    target.evidenceList.push(evidence);
    target.status = 'SUBMITTED_FOR_REVIEW';
    target.updatedAt = new Date().toISOString();

    StoreRepository.saveState();
    StoreRepository.logAudit(actor, 'SUBMIT_EVIDENCE', 'CAPA', target.id, `Attached evidence file to ${target.referenceNumber}`);
    return target;
  }

  static reviewCapa(id: string, decision: 'APPROVED' | 'REJECTED', comments: string | undefined, actor: User): CorrectiveAction {
    const s = StoreRepository.getState();
    const target = s.capas.find(c => c.id === id);
    if (!target) throw new Error('CAPA not found');

    if (decision === 'APPROVED') {
      target.status = 'CLOSED';
      target.closedBy = actor.name;
      target.closedAt = new Date().toISOString();
    } else {
      target.status = 'REJECTED_FOR_REWORK';
    }

    target.reviewerComments = comments;
    target.updatedAt = new Date().toISOString();

    StoreRepository.saveState();
    StoreRepository.logAudit(actor, 'REVIEW_CAPA', 'CAPA', target.id, `${decision === 'APPROVED' ? 'Closed' : 'Rejected'} CAPA ${target.referenceNumber}`);
    return target;
  }
}
