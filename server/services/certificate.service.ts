import { StoreRepository } from '../repositories/store.repository';
import { Certificate, User } from '../../src/types';

export class CertificateService {
  static getAllCertificates(): Certificate[] {
    const s = StoreRepository.getState();
    return s.certificates;
  }

  static verifyCertificate(certNumber: string): { valid: boolean; certificate?: Certificate } {
    const s = StoreRepository.getState();
    const query = certNumber.trim().toLowerCase();
    const cert = s.certificates.find(c => c.certificateNumber.toLowerCase() === query);

    if (!cert) {
      return { valid: false };
    }

    cert.verificationCount = (cert.verificationCount || 0) + 1;
    cert.updatedAt = new Date().toISOString();
    StoreRepository.saveState();

    return {
      valid: cert.status === 'ISSUED',
      certificate: cert
    };
  }

  static revokeCertificate(id: string, reason: string, actor: User): Certificate {
    const s = StoreRepository.getState();
    const target = s.certificates.find(c => c.id === id);
    if (!target) throw new Error('Certificate not found');

    target.status = 'REVOKED';
    target.revocationReason = reason;
    target.updatedAt = new Date().toISOString();

    StoreRepository.saveState();
    StoreRepository.logAudit(actor, 'REVOKE', 'CERTIFICATE', target.id, `Revoked certificate ${target.certificateNumber}: ${reason}`);
    return target;
  }
}
