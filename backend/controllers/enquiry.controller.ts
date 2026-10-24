import { Response } from 'express';
import { AuthenticatedRequest } from '../types';
import { EnquiryService } from '../services/enquiry.service';
import { getActor } from '../middlewares/auth.middleware';

export class EnquiryController {
  static getAll(_req: AuthenticatedRequest, res: Response): void {
    const list = EnquiryService.getAllEnquiries();
    res.json(list);
  }

  static create(req: AuthenticatedRequest, res: Response): void {
    const result = EnquiryService.createEnquiry(req.body);
    res.status(201).json(result);
  }

  static updateStatus(req: AuthenticatedRequest, res: Response): void {
    const actor = getActor(req);
    const { id } = req.params;
    const { status, reason } = req.body;
    try {
      const updated = EnquiryService.updateStatus(id, status, reason, actor);
      res.json(updated);
    } catch (err: any) {
      res.status(404).json({ error: err.message || 'Enquiry not found' });
    }
  }

  static addNote(req: AuthenticatedRequest, res: Response): void {
    const actor = getActor(req);
    const { id } = req.params;
    const { note } = req.body;
    try {
      const updated = EnquiryService.addNote(id, note, actor);
      res.json(updated);
    } catch (err: any) {
      res.status(404).json({ error: err.message || 'Enquiry not found' });
    }
  }

  static assign(req: AuthenticatedRequest, res: Response): void {
    const actor = getActor(req);
    const { id } = req.params;
    const { assignedTo } = req.body;
    try {
      const updated = EnquiryService.assignEnquiry(id, assignedTo, actor);
      res.json(updated);
    } catch (err: any) {
      res.status(404).json({ error: err.message || 'Enquiry not found' });
    }
  }

  static exportCsv(_req: AuthenticatedRequest, res: Response): void {
    const csv = EnquiryService.generateCsvExport();
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="essor_enquiries_export.csv"');
    res.send(csv);
  }
}
