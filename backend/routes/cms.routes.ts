import { Router } from 'express';
import { CmsController } from '../controllers/cms.controller';

export const cmsRouter = Router();

cmsRouter.get('/', CmsController.getCMS);
cmsRouter.put('/', CmsController.updateCMS);
