import { Response } from 'express';
import { AuthenticatedRequest } from '../types';
import { CatalogService } from '../services/catalog.service';
import { getActor } from '../middlewares/auth.middleware';

export class CatalogController {
  static getServices(_req: AuthenticatedRequest, res: Response): void {
    const list = CatalogService.getAllServices();
    res.json(list);
  }

  static upsertService(req: AuthenticatedRequest, res: Response): void {
    const actor = getActor(req);
    const updated = CatalogService.upsertService(req.body, actor);
    res.json(updated);
  }

  static getCourses(_req: AuthenticatedRequest, res: Response): void {
    const list = CatalogService.getAllCourses();
    res.json(list);
  }

  static upsertCourse(req: AuthenticatedRequest, res: Response): void {
    const actor = getActor(req);
    const updated = CatalogService.upsertCourse(req.body, actor);
    res.json(updated);
  }
}
