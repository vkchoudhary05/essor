import { StoreRepository } from '../repositories/store.repository';
import { CMSContent, User } from '../types';

export class CmsService {
  static getCMS(): CMSContent {
    const s = StoreRepository.getState();
    return s.cms;
  }

  static updateCMS(patch: Partial<CMSContent>, actor: User): CMSContent {
    const s = StoreRepository.getState();
    s.cms = { ...s.cms, ...patch };
    StoreRepository.saveState();
    StoreRepository.logAudit(actor, 'UPDATE', 'CMS_CONTENT', 'global', 'Updated website CMS copy and contact settings');
    return s.cms;
  }
}
