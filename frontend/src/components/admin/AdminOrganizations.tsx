import React, { useState } from 'react';
import { Building2, MapPin, Plus, CheckCircle, X, Mail, Phone, ShieldCheck } from 'lucide-react';
import { Organization, ClientSite, User } from '../../types';
import { StorageService } from '../../services/storage';

interface AdminOrganizationsProps {
  currentUser: User;
  onRefresh: () => void;
}

export const AdminOrganizations: React.FC<AdminOrganizationsProps> = ({ currentUser, onRefresh }) => {
  const [orgs, setOrgs] = useState<Organization[]>(StorageService.getOrganizations());
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(orgs[0] || null);
  const [isAddingOrg, setIsAddingOrg] = useState(false);
  const [isAddingSite, setIsAddingSite] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New org form
  const [newOrgName, setNewOrgName] = useState('');
  const [newOrgCode, setNewOrgCode] = useState('');
  const [newOrgIndustry, setNewOrgIndustry] = useState('');
  const [newOrgEmail, setNewOrgEmail] = useState('');
  const [newOrgAddress, setNewOrgAddress] = useState('');

  // New site form
  const [siteName, setSiteName] = useState('');
  const [siteCode, setSiteCode] = useState('');
  const [siteAddress, setSiteAddress] = useState('');
  const [siteCity, setSiteCity] = useState('');
  const [siteStandards, setSiteStandards] = useState('FSSC 22000, HACCP, FSSAI');

  const handleCreateOrg = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrgName || !newOrgCode) return;

    const created: Organization = {
      id: `org-${Date.now()}`,
      legalName: newOrgName.trim(),
      code: newOrgCode.trim().toUpperCase(),
      industry: newOrgIndustry.trim() || 'Food Processing',
      businessType: 'Food Manufacturer',
      primaryEmail: newOrgEmail.trim() || 'contact@client.com',
      primaryPhone: '+91 22 0000 0000',
      headquartersAddress: newOrgAddress.trim() || 'Corporate Office',
      assignedAccountManager: currentUser.name,
      status: 'ACTIVE',
      sites: [],
      serviceAgreements: ['Standard Food Safety Advisory'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    StorageService.saveOrganization(created, currentUser);
    setOrgs(StorageService.getOrganizations());
    setSelectedOrg(created);
    setIsAddingOrg(false);
    showToast(`Created organization ${created.legalName}`);
    onRefresh();
  };

  const handleAddSite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrg || !siteName) return;

    const newSite: ClientSite = {
      id: `site-${Date.now()}`,
      organizationId: selectedOrg.id,
      name: siteName.trim(),
      siteCode: siteCode.trim().toUpperCase(),
      address: siteAddress.trim(),
      city: siteCity.trim() || 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      contactName: 'Site Quality Manager',
      contactEmail: selectedOrg.primaryEmail,
      contactPhone: selectedOrg.primaryPhone,
      applicableStandards: siteStandards.split(',').map(s => s.trim()).filter(Boolean),
      isActive: true,
      createdAt: new Date().toISOString()
    };

    const updated = {
      ...selectedOrg,
      sites: [...selectedOrg.sites, newSite]
    };

    StorageService.saveOrganization(updated, currentUser);
    setOrgs(StorageService.getOrganizations());
    setSelectedOrg(updated);
    setIsAddingSite(false);
    setSiteName('');
    setSiteCode('');
    showToast(`Added operational site ${newSite.name}`);
    onRefresh();
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="space-y-6">
      
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-lg bg-[#142B3A] text-white text-xs font-semibold shadow-xl border border-[#234257] flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-[#F5E4B5]" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#142B3A] tracking-tight">
            Client Organizations & Physical Facilities
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Manage multi-tenant client companies, manufacturing sites, and applicable audit benchmarks.
          </p>
        </div>

        <button
          onClick={() => setIsAddingOrg(true)}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#142B3A] hover:bg-[#1e3f54] rounded-lg transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Onboard Client Org</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Organization list */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden">
          <div className="p-4 bg-[#F8F8F5] border-b border-neutral-200 text-xs font-bold text-neutral-700 uppercase tracking-wider">
            Organizations Registry ({orgs.length})
          </div>

          <div className="divide-y divide-neutral-100">
            {orgs.map(org => {
              const isSelected = selectedOrg?.id === org.id;
              return (
                <div
                  key={org.id}
                  onClick={() => setSelectedOrg(org)}
                  className={`p-4 cursor-pointer hover:bg-neutral-50 transition-colors ${
                    isSelected ? 'bg-neutral-50 border-l-4 border-l-[#142B3A]' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-mono text-xs font-bold text-[#142B3A]">{org.code}</span>
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded uppercase bg-emerald-100 text-emerald-800">
                      {org.status}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-neutral-900 mt-1">{org.legalName}</h3>
                  <div className="text-xs text-neutral-500 mt-0.5">{org.industry}</div>
                  <div className="text-[11px] text-neutral-400 mt-2 flex items-center justify-between">
                    <span>{org.sites.length} Physical Sites</span>
                    <span>Manager: {org.assignedAccountManager}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Org Details & Sites */}
        {selectedOrg && (
          <div className="lg:col-span-7 bg-white rounded-xl border border-neutral-200 shadow-sm p-6 space-y-6">
            <div className="flex items-start justify-between border-b border-neutral-100 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-[#547565]">
                  CODE: {selectedOrg.code}
                </span>
                <h2 className="text-xl font-bold text-[#142B3A] mt-1">
                  {selectedOrg.legalName}
                </h2>
                <p className="text-xs text-neutral-500">
                  {selectedOrg.industry} · {selectedOrg.businessType}
                </p>
              </div>

              <button
                onClick={() => setIsAddingSite(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#547565] hover:bg-[#435e51] rounded-lg"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Site</span>
              </button>
            </div>

            {/* General Info */}
            <div className="grid grid-cols-2 gap-4 text-xs bg-neutral-50 p-4 rounded-lg">
              <div>
                <span className="text-neutral-400 font-semibold uppercase text-[10px] block">Corporate Email</span>
                <span className="font-semibold text-neutral-900">{selectedOrg.primaryEmail}</span>
              </div>
              <div>
                <span className="text-neutral-400 font-semibold uppercase text-[10px] block">Phone</span>
                <span className="font-semibold text-neutral-900">{selectedOrg.primaryPhone}</span>
              </div>
              <div className="col-span-2">
                <span className="text-neutral-400 font-semibold uppercase text-[10px] block">Headquarters</span>
                <span className="text-neutral-700">{selectedOrg.headquartersAddress}</span>
              </div>
            </div>

            {/* Sites list */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                Operating Sites & Plants ({selectedOrg.sites.length})
              </h3>

              <div className="space-y-3">
                {selectedOrg.sites.map(site => (
                  <div key={site.id} className="p-4 rounded-xl border border-neutral-200 bg-white space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-[#142B3A]">{site.name}</span>
                      <span className="font-mono text-xs text-[#547565] font-bold">{site.siteCode}</span>
                    </div>
                    <div className="text-xs text-neutral-600 flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                      <span>{site.address}, {site.city}, {site.state}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {site.applicableStandards.map(std => (
                        <span key={std} className="px-2 py-0.5 rounded bg-neutral-100 text-[10px] font-bold text-neutral-700">
                          {std}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Add Org Modal */}
      {isAddingOrg && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-xl shadow-2xl p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-bold text-[#142B3A]">Onboard New Client Organization</h3>
              <button onClick={() => setIsAddingOrg(false)} className="text-neutral-400 hover:text-neutral-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateOrg} className="space-y-3">
              <div>
                <label className="block font-semibold mb-1">Company Legal Name</label>
                <input
                  type="text"
                  required
                  value={newOrgName}
                  onChange={e => setNewOrgName(e.target.value)}
                  placeholder="e.g. Apex Dairy Products Pvt. Ltd."
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Org Code</label>
                  <input
                    type="text"
                    required
                    value={newOrgCode}
                    onChange={e => setNewOrgCode(e.target.value)}
                    placeholder="e.g. APEXDAIRY"
                    className="w-full px-3 py-2 border rounded-lg font-mono uppercase"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Industry</label>
                  <input
                    type="text"
                    value={newOrgIndustry}
                    onChange={e => setNewOrgIndustry(e.target.value)}
                    placeholder="e.g. Dairy & Beverage"
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1">Primary Email</label>
                <input
                  type="email"
                  value={newOrgEmail}
                  onChange={e => setNewOrgEmail(e.target.value)}
                  placeholder="qa@apexdairy.com"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Corporate Address</label>
                <input
                  type="text"
                  value={newOrgAddress}
                  onChange={e => setNewOrgAddress(e.target.value)}
                  placeholder="MIDC Industrial Estate, Pune"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="pt-3 border-t flex justify-end gap-2">
                <button type="button" onClick={() => setIsAddingOrg(false)} className="px-4 py-2 font-semibold text-neutral-600">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 font-semibold text-white bg-[#142B3A] rounded-lg">
                  Save Organization
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Site Modal */}
      {isAddingSite && selectedOrg && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-xl shadow-2xl p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-bold text-[#142B3A]">Add Physical Site to {selectedOrg.legalName}</h3>
              <button onClick={() => setIsAddingSite(false)} className="text-neutral-400 hover:text-neutral-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddSite} className="space-y-3">
              <div>
                <label className="block font-semibold mb-1">Facility Name</label>
                <input
                  type="text"
                  required
                  value={siteName}
                  onChange={e => setSiteName(e.target.value)}
                  placeholder="e.g. Pune Processing Plant Unit 2"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Site Code</label>
                  <input
                    type="text"
                    required
                    value={siteCode}
                    onChange={e => setSiteCode(e.target.value)}
                    placeholder="e.g. APEX-PUN-02"
                    className="w-full px-3 py-2 border rounded-lg font-mono uppercase"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">City</label>
                  <input
                    type="text"
                    value={siteCity}
                    onChange={e => setSiteCity(e.target.value)}
                    placeholder="Pune"
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1">Physical Address</label>
                <input
                  type="text"
                  value={siteAddress}
                  onChange={e => setSiteAddress(e.target.value)}
                  placeholder="Plot 18, Phase 2, Chakan"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Applicable Standards (Comma separated)</label>
                <input
                  type="text"
                  value={siteStandards}
                  onChange={e => setSiteStandards(e.target.value)}
                  placeholder="FSSC 22000, ISO 22000, HACCP"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="pt-3 border-t flex justify-end gap-2">
                <button type="button" onClick={() => setIsAddingSite(false)} className="px-4 py-2 font-semibold text-neutral-600">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 font-semibold text-white bg-[#547565] rounded-lg">
                  Save Facility Site
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
