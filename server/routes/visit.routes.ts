import { Router } from 'express';
import { VisitController } from '../controllers/visit.controller';

export const visitRouter = Router();

visitRouter.get('/', VisitController.getAll);
visitRouter.post('/', VisitController.upsert);
visitRouter.patch('/:id/review', VisitController.review);
