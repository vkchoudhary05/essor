import { Response } from 'express';
import { AuthenticatedRequest } from '../types';
import { CertificateService } from '../services/certificate.service';
import { getActor } from '../middlewares/auth.middleware';

export class CertificateController {
  static getAll(_req: AuthenticatedRequest, res: Response): void {
    const list = CertificateService.getAllCertificates();
    res.json(list);
  }

  static verify(req: AuthenticatedRequest, res: Response): void {
    const { certNumber } = req.params;
    const result = CertificateService.verifyCertificate(certNumber);
    if (!result.certificate) {
      res.status(404).json({ error: 'Certificate not found', valid: false });
      return;
    }
    res.json(result);
  }

  static revoke(req: AuthenticatedRequest, res: Response): void {
    const actor = getActor(req);
    const { id } = req.params;
    const { reason } = req.body;
    try {
      const updated = CertificateService.revokeCertificate(id, reason, actor);
      res.json(updated);
    } catch (err: any) {
      res.status(404).json({ error: err.message || 'Certificate not found' });
    }
  }
}
