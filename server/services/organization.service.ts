import { StoreRepository } from '../repositories/store.repository';
import { Organization, ClientSite, User } from '../../src/types';

export class OrganizationService {
  static getAllOrganizations(): Organization[] {
    const s = StoreRepository.getState();
    return s.organizations;
  }

  static upsertOrganization(org: Organization, actor: User): Organization {
    const s = StoreRepository.getState();
    const idx = s.organizations.findIndex(o => o.id === org.id);
    const updated = { ...org, updatedAt: new Date().toISOString() };

    if (idx >= 0) {
      s.organizations[idx] = updated;
      StoreRepository.logAudit(actor, 'UPDATE', 'ORGANIZATION', org.id, `Updated organization ${org.legalName}`);
    } else {
      s.organizations.push(updated);
      StoreRepository.logAudit(actor, 'CREATE', 'ORGANIZATION', org.id, `Created organization ${org.legalName}`);
    }

    StoreRepository.saveState();
    return updated;
  }

  static addSite(orgId: string, sitePayload: Partial<ClientSite>, actor: User): ClientSite {
    const s = StoreRepository.getState();
    const org = s.organizations.find(o => o.id === orgId);
    if (!org) throw new Error('Organization not found');

    const nextCode = `${org.code}-S${org.sites.length + 1}`;

    const site: ClientSite = {
      id: `site-${Date.now()}`,
      organizationId: org.id,
      name: sitePayload.name || 'Main Facility',
      siteCode: sitePayload.siteCode || nextCode,
      address: sitePayload.address || '',
      city: sitePayload.city || '',
      state: sitePayload.state || '',
      country: sitePayload.country || 'India',
      contactName: sitePayload.contactName || org.legalName,
      contactEmail: sitePayload.contactEmail || org.primaryEmail,
      contactPhone: sitePayload.contactPhone || org.primaryPhone,
      applicableStandards: sitePayload.applicableStandards || org.serviceAgreements || ['FSSC 22000'],
      isActive: true,
      createdAt: new Date().toISOString()
    };

    org.sites.push(site);
    org.updatedAt = new Date().toISOString();
    StoreRepository.saveState();
    StoreRepository.logAudit(actor, 'CREATE_SITE', 'ORGANIZATION', org.id, `Added site "${site.name}" to ${org.legalName}`);
    return site;
  }
}
