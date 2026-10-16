import { Request, Response } from 'express';
import { StatsService } from '../services/stats.service';

export class StatsController {
  static getStats(_req: Request, res: Response): void {
    const stats = StatsService.getDashboardStats();
    res.json(stats);
  }
}
