import { StoreRepository } from '../repositories/store.repository';
import { Enquiry, EnquiryStatus, User } from '../types';

export class EnquiryService {
  static getAllEnquiries(): Enquiry[] {
    const s = StoreRepository.getState();
    return s.enquiries;
  }

  static createEnquiry(payload: Partial<Enquiry>): { enquiry: Enquiry; referenceNumber: string } {
    const s = StoreRepository.getState();
    const year = new Date().getFullYear();
    const nextNum = (s.enquiries.length + 46).toString().padStart(4, '0');
    const referenceNumber = `ECS-${year}-${nextNum}`;

    const newEnquiry: Enquiry = {
      id: `enq-${Date.now()}`,
      referenceNumber,
      name: payload.name || '',
      email: payload.email || '',
      phone: payload.phone || '',
      companyName: payload.companyName || '',
      industry: payload.industry || 'Food & Beverage Processing',
      serviceId: payload.serviceId,
      serviceTitle: payload.serviceTitle || 'General Compliance Advisory',
      auditStandard: payload.auditStandard || 'FSSC 22000 / BRCGS',
      preferredContactMethod: payload.preferredContactMethod || 'EMAIL',
      message: payload.message || '',
      sourcePage: payload.sourcePage || '/contact',
      privacyAcknowledged: payload.privacyAcknowledged ?? true,
      status: 'NEW' as EnquiryStatus,
      assignedTo: payload.assignedTo,
      notes: [],
      statusHistory: [
        {
          id: `hist-${Date.now()}`,
          enquiryId: `enq-${Date.now()}`,
          previousStatus: 'NEW' as EnquiryStatus,
          newStatus: 'NEW' as EnquiryStatus,
          changedByName: 'Backend API Intake',
          changedByEmail: 'api@essorcompliance.com',
          reason: 'Inbound submission received via REST API',
          createdAt: new Date().toISOString()
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    s.enquiries.unshift(newEnquiry);
    StoreRepository.saveState();
    return { enquiry: newEnquiry, referenceNumber };
  }

  static updateStatus(id: string, status: EnquiryStatus, reason: string | undefined, actor: User): Enquiry {
    const s = StoreRepository.getState();
    const target = s.enquiries.find(e => e.id === id);
    if (!target) throw new Error('Enquiry not found');

    const prev = target.status;
    target.status = status;
    target.updatedAt = new Date().toISOString();
    target.statusHistory.unshift({
      id: `hist-${Date.now()}`,
      enquiryId: target.id,
      previousStatus: prev,
      newStatus: status,
      changedByName: actor.name,
      changedByEmail: actor.email,
      reason: reason || `Status set to ${status}`,
      createdAt: new Date().toISOString()
    });

    StoreRepository.saveState();
    StoreRepository.logAudit(actor, 'UPDATE_STATUS', 'ENQUIRY', target.id, `Status changed from ${prev} to ${status}`);
    return target;
  }

  static addNote(id: string, noteText: string, actor: User): Enquiry {
    const s = StoreRepository.getState();
    const target = s.enquiries.find(e => e.id === id);
    if (!target) throw new Error('Enquiry not found');

    const newNote = {
      id: `note-${Date.now()}`,
      enquiryId: target.id,
      authorName: actor.name,
      authorEmail: actor.email,
      note: String(noteText).trim(),
      createdAt: new Date().toISOString()
    };

    target.notes.unshift(newNote);
    target.updatedAt = new Date().toISOString();

    StoreRepository.saveState();
    StoreRepository.logAudit(actor, 'ADD_NOTE', 'ENQUIRY', target.id, `Added follow-up note to ${target.referenceNumber}`);
    return target;
  }

  static assignEnquiry(id: string, assignedTo: string, actor: User): Enquiry {
    const s = StoreRepository.getState();
    const target = s.enquiries.find(e => e.id === id);
    if (!target) throw new Error('Enquiry not found');

    target.assignedTo = assignedTo;
    target.updatedAt = new Date().toISOString();

    StoreRepository.saveState();
    StoreRepository.logAudit(actor, 'ASSIGN', 'ENQUIRY', target.id, `Assigned to ${assignedTo}`);
    return target;
  }

  static generateCsvExport(): string {
    const s = StoreRepository.getState();
    const headers = ['Reference Number', 'Date', 'Company', 'Contact', 'Email', 'Phone', 'Service', 'Status', 'Assigned To'];
    const rows = s.enquiries.map(e => [
      `"${e.referenceNumber}"`,
      `"${new Date(e.createdAt).toLocaleDateString()}"`,
      `"${(e.companyName || '').replace(/"/g, '""')}"`,
      `"${(e.name || '').replace(/"/g, '""')}"`,
      `"${(e.email || '').replace(/"/g, '""')}"`,
      `"${(e.phone || '').replace(/"/g, '""')}"`,
      `"${(e.serviceTitle || '').replace(/"/g, '""')}"`,
      `"${e.status}"`,
      `"${(e.assignedTo || 'Unassigned').replace(/"/g, '""')}"`
    ]);
    return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  }
}
