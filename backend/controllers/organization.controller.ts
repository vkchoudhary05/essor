import { Response } from 'express';
import { AuthenticatedRequest } from '../types';
import { OrganizationService } from '../services/organization.service';
import { getActor } from '../middlewares/auth.middleware';

export class OrganizationController {
  static getAll(_req: AuthenticatedRequest, res: Response): void {
    const list = OrganizationService.getAllOrganizations();
    res.json(list);
  }

  static upsert(req: AuthenticatedRequest, res: Response): void {
    const actor = getActor(req);
    const updated = OrganizationService.upsertOrganization(req.body, actor);
    res.json(updated);
  }

  static addSite(req: AuthenticatedRequest, res: Response): void {
    const actor = getActor(req);
    const { id } = req.params;
    try {
      const site = OrganizationService.addSite(id, req.body, actor);
      res.json(site);
    } catch (err: any) {
      res.status(404).json({ error: err.message || 'Organization not found' });
    }
  }
}
