import { Response } from 'express';
import { AuthenticatedRequest } from '../types';
import { CmsService } from '../services/cms.service';
import { getActor } from '../middlewares/auth.middleware';

export class CmsController {
  static getCMS(_req: AuthenticatedRequest, res: Response): void {
    const cms = CmsService.getCMS();
    res.json(cms);
  }

  static updateCMS(req: AuthenticatedRequest, res: Response): void {
    const actor = getActor(req);
    const updated = CmsService.updateCMS(req.body, actor);
    res.json(updated);
  }
}
