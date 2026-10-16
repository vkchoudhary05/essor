import { Response } from 'express';
import { AuthenticatedRequest } from '../types';
import { VisitService } from '../services/visit.service';
import { getActor } from '../middlewares/auth.middleware';

export class VisitController {
  static getAll(_req: AuthenticatedRequest, res: Response): void {
    const list = VisitService.getAllVisits();
    res.json(list);
  }

  static upsert(req: AuthenticatedRequest, res: Response): void {
    const actor = getActor(req);
    const updated = VisitService.upsertVisit(req.body, actor);
    res.json(updated);
  }

  static review(req: AuthenticatedRequest, res: Response): void {
    const actor = getActor(req);
    const { id } = req.params;
    const { decision, notes } = req.body;
    try {
      const updated = VisitService.reviewVisit(id, decision, notes, actor);
      res.json(updated);
    } catch (err: any) {
      res.status(404).json({ error: err.message || 'Visit not found' });
    }
  }
}
