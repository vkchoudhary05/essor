import { Router } from 'express';
import { OrganizationController } from '../controllers/organization.controller';

export const organizationRouter = Router();

organizationRouter.get('/', OrganizationController.getAll);
organizationRouter.post('/', OrganizationController.upsert);
organizationRouter.post('/:id/sites', OrganizationController.addSite);
