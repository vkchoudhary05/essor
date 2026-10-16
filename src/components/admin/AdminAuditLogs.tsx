import React, { useState } from 'react';
import { ShieldCheck, Search, Filter, Clock } from 'lucide-react';
import { AuditLog, AdminUser } from '../../types';
import { StorageService } from '../../services/storage';

interface AdminAuditLogsProps {
  currentUser: AdminUser;
}

export const AdminAuditLogs: React.FC<AdminAuditLogsProps> = ({ currentUser }) => {
  const [logs, setLogs] = useState<AuditLog[]>(StorageService.getAuditLogs());
  const [filterType, setFilterType] = useState<string>('ALL');
  const [search, setSearch] = useState('');

  const filtered = logs.filter(l => {
    const matchesSearch = 
      l.summary.toLowerCase().includes(search.toLowerCase()) ||
      l.actorName.toLowerCase().includes(search.toLowerCase()) ||
      l.actorEmail.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === 'ALL' || l.entityType === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#142B3A] tracking-tight">
            Security & Operations Audit Trail
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Cryptographically timestamped record of administrative actions, status mutations, and content edits.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search audit events..."
            className="px-3 py-1.5 text-xs rounded-lg border border-neutral-300 bg-white"
          />
          <select
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-lg border border-neutral-300 bg-white"
          >
            <option value="ALL">All Entity Types</option>
            <option value="ENQUIRY">ENQUIRY</option>
            <option value="SERVICE">SERVICE</option>
            <option value="TRAINING">TRAINING</option>
            <option value="CMS_CONTENT">CMS_CONTENT</option>
            <option value="SETTINGS">SETTINGS</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#F8F8F5] text-neutral-500 uppercase font-sans font-semibold text-[10px] tracking-wider border-b border-neutral-200">
              <tr>
                <th className="px-6 py-3">Timestamp (UTC)</th>
                <th className="px-6 py-3">Actor</th>
                <th className="px-6 py-3">Action</th>
                <th className="px-6 py-3">Target Entity</th>
                <th className="px-6 py-3">Summary Event</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-neutral-700">
              {filtered.map(log => (
                <tr key={log.id} className="hover:bg-neutral-50/80 transition-colors">
                  <td className="px-6 py-3.5 text-neutral-500 text-[11px] whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-3.5 font-sans">
                    <div className="font-semibold text-neutral-900">{log.actorName}</div>
                    <div className="text-[10px] text-neutral-400 font-mono">{log.actorEmail}</div>
                  </td>
                  <td className="px-6 py-3.5">
                    <span className="px-2 py-0.5 rounded bg-neutral-100 font-bold text-[10px] text-[#142B3A]">
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 text-neutral-500 text-[11px]">
                    {log.entityType} ({log.entityId})
                  </td>
                  <td className="px-6 py-3.5 font-sans text-xs text-neutral-800">
                    {log.summary}
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-xs text-neutral-400 font-sans">
                    No matching audit logs recorded.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
