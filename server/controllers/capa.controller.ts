import { Response } from 'express';
import { AuthenticatedRequest } from '../types';
import { CapaService } from '../services/capa.service';
import { getActor } from '../middlewares/auth.middleware';

export class CapaController {
  static getAll(_req: AuthenticatedRequest, res: Response): void {
    const list = CapaService.getAllCapas();
    res.json(list);
  }

  static upsert(req: AuthenticatedRequest, res: Response): void {
    const actor = getActor(req);
    const updated = CapaService.upsertCapa(req.body, actor);
    res.json(updated);
  }

  static attachEvidence(req: AuthenticatedRequest, res: Response): void {
    const actor = getActor(req);
    const { id } = req.params;
    try {
      const updated = CapaService.attachEvidence(id, req.body, actor);
      res.json(updated);
    } catch (err: any) {
      res.status(404).json({ error: err.message || 'CAPA not found' });
    }
  }

  static review(req: AuthenticatedRequest, res: Response): void {
    const actor = getActor(req);
    const { id } = req.params;
    const { decision, comments } = req.body;
    try {
      const updated = CapaService.reviewCapa(id, decision, comments, actor);
      res.json(updated);
    } catch (err: any) {
      res.status(404).json({ error: err.message || 'CAPA not found' });
    }
  }
}
