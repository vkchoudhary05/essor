import { Router } from 'express';
import { CertificateController } from '../controllers/certificate.controller';

export const certificateRouter = Router();

certificateRouter.get('/', CertificateController.getAll);
certificateRouter.get('/verify/:certNumber', CertificateController.verify);
certificateRouter.patch('/:id/revoke', CertificateController.revoke);
