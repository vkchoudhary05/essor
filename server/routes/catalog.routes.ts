import { Router } from 'express';
import { CatalogController } from '../controllers/catalog.controller';

export const serviceRouter = Router();
serviceRouter.get('/', CatalogController.getServices);
serviceRouter.post('/', CatalogController.upsertService);

export const courseRouter = Router();
courseRouter.get('/', CatalogController.getCourses);
courseRouter.post('/', CatalogController.upsertCourse);
