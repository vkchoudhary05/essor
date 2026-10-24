import { Router } from 'express';
import { CapaController } from '../controllers/capa.controller';

export const capaRouter = Router();

capaRouter.get('/', CapaController.getAll);
capaRouter.post('/', CapaController.upsert);
capaRouter.post('/:id/evidence', CapaController.attachEvidence);
capaRouter.patch('/:id/review', CapaController.review);
