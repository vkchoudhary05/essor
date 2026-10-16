import React, { useState, useEffect } from 'react';
import { 
  Server, 
  Activity, 
  CheckCircle, 
  Code, 
  Database, 
  ExternalLink, 
  Layers, 
  Send, 
  ShieldCheck, 
  Cpu, 
  RefreshCw,
  Terminal,
  Copy,
  Check
} from 'lucide-react';
import { BackendApiService } from '../../services/api';

export const AdminApiDocs: React.FC = () => {
  const [health, setHealth] = useState<any>(null);
  const [pingLatency, setPingLatency] = useState<number | null>(null);
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>('GET /api/v1/health');
  const [testResult, setTestResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const fetchHealth = async () => {
    const start = performance.now();
    try {
      const res = await BackendApiService.checkHealth();
      setPingLatency(Math.round(performance.now() - start));
      setHealth(res);
    } catch (e: any) {
      setHealth({ status: 'ERROR', error: e.message });
    }
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  const endpoints = [
    {
      group: 'Core & Health',
      items: [
        { method: 'GET', path: '/api/v1/health', desc: 'System health check and live server uptime', body: null },
        { method: 'GET', path: '/api/v1/stats', desc: 'Calculated operational metrics for dashboard widgets', body: null },
        { method: 'GET', path: '/api/v1/openapi.json', desc: 'OpenAPI 3.0 specification contract', body: null }
      ]
    },
    {
      group: 'Client Organizations & Multi-tenancy',
      items: [
        { method: 'GET', path: '/api/v1/organizations', desc: 'Retrieve client organizations and physical sites', body: null },
        { method: 'POST', path: '/api/v1/organizations', desc: 'Register or update corporate client profile', body: { legalName: 'Apex Dairy Foods Ltd.', code: 'APEX-01', industry: 'Dairy & Beverages' } }
      ]
    },
    {
      group: 'Audits & Company Visits',
      items: [
        { method: 'GET', path: '/api/v1/visits', desc: 'List company visits and audit records', body: null },
        { method: 'POST', path: '/api/v1/visits', desc: 'Schedule a facility gap assessment or mock audit', body: { organizationId: 'org-1', organizationName: 'AgroNutri Global Exports', scheduledDate: new Date().toISOString(), visitType: 'MOCK_AUDIT' } }
      ]
    },
    {
      group: 'Corrective Actions (CAPA)',
      items: [
        { method: 'GET', path: '/api/v1/capa', desc: 'Query open, in-progress, and overdue CAPAs', body: null },
        { method: 'POST', path: '/api/v1/capa', desc: 'Log non-conformance action requirement', body: { organizationId: 'org-1', findingTitle: 'CCP-2 Calibration Variance', severity: 'MAJOR', dueDate: new Date(Date.now() + 86400000 * 7).toISOString() } }
      ]
    },
    {
      group: 'Training & Certification Registry',
      items: [
        { method: 'GET', path: '/api/v1/training/sessions', desc: 'List training cohort sessions and rosters', body: null },
        { method: 'GET', path: '/api/v1/certificates', desc: 'Query issued tamper-evident certificates registry', body: null },
        { method: 'GET', path: '/api/v1/certificates/verify/ECS-CERT-2026-0089', desc: 'Public credential verification endpoint', body: null }
      ]
    },
    {
      group: 'Inbound Lead Pipeline & Enquiries',
      items: [
        { method: 'GET', path: '/api/v1/enquiries', desc: 'Inbound lead pipeline with filter states', body: null },
        { method: 'POST', path: '/api/v1/enquiries', desc: 'Ingest new consultation request with auto ECS reference', body: { name: 'Gaurav K.', email: 'gaurav@example.com', companyName: 'SpiceCraft India', message: 'Requesting FSSC 22000 readiness review.' } },
        { method: 'GET', path: '/api/v1/enquiries/export/csv', desc: 'Export inbound leads in standardized CSV format', body: null }
      ]
    }
  ];

  const handleRunEndpoint = async (item: { method: string; path: string; body: any }) => {
    setIsLoading(true);
    setTestResult(null);
    try {
      const res = await fetch(item.path, {
        method: item.method,
        headers: { 'Content-Type': 'application/json' },
        body: item.body ? JSON.stringify(item.body) : undefined
      });
      const data = await res.json();
      setTestResult({ status: res.status, ok: res.ok, data });
    } catch (e: any) {
      setTestResult({ status: 'NETWORK_ERROR', ok: false, error: e.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyCurl = (item: { method: string; path: string; body: any }) => {
    const origin = window.location.origin;
    let curl = `curl -X ${item.method} "${origin}${item.path}"`;
    if (item.body) {
      curl += ` \\\n  -H "Content-Type: application/json" \\\n  -d '${JSON.stringify(item.body)}'`;
    }
    navigator.clipboard.writeText(curl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#547565]">
            <Server className="w-4 h-4 text-[#D9B76A]" />
            <span>Decoupled Full-Stack Architecture</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#142B3A] tracking-tight mt-1">
            Backend REST API Engine (`/api/v1`)
          </h1>
          <p className="text-xs text-neutral-500 mt-1 max-w-2xl">
            Cleanly isolated Node.js Express backend service mounted at <code className="bg-neutral-100 text-neutral-800 px-1 py-0.5 rounded font-mono font-bold">/api/v1</code>, decoupled from the React client interface. All data persists reliably in the server data store.
          </p>
        </div>

        <button
          onClick={fetchHealth}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-neutral-700 bg-white hover:bg-neutral-50 border border-neutral-200 rounded-lg shadow-xs transition-colors self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Ping Backend</span>
        </button>
      </div>

      {/* Backend Live Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-xl border border-neutral-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-wider">Backend Status</span>
            <span className="text-sm font-bold text-emerald-700 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {health?.status || 'ONLINE'}
            </span>
          </div>
        </div>

        <div className="p-4 bg-white rounded-xl border border-neutral-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-wider">API Latency</span>
            <span className="text-sm font-bold text-neutral-800">
              {pingLatency !== null ? `${pingLatency} ms` : 'Measuring...'}
            </span>
          </div>
        </div>

        <div className="p-4 bg-white rounded-xl border border-neutral-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-wider">Server Storage</span>
            <span className="text-sm font-bold text-neutral-800">
              JSON File Store (`.data/`)
            </span>
          </div>
        </div>

        <div className="p-4 bg-white rounded-xl border border-neutral-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-wider">API Architecture</span>
            <span className="text-sm font-bold text-neutral-800">
              REST v1 (OpenAPI 3.0)
            </span>
          </div>
        </div>
      </div>

      {/* Architecture Topology Banner */}
      <div className="bg-[#142B3A] text-white p-6 rounded-2xl border border-[#234358] shadow-sm">
        <h3 className="text-sm font-bold text-[#D9B76A] uppercase tracking-wider mb-2 flex items-center gap-2">
          <Terminal className="w-4 h-4" />
          <span>Decoupled Frontend / Backend Separation Contract</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-neutral-300 mt-3 leading-relaxed">
          <div className="p-4 bg-[#0d212e] rounded-xl border border-neutral-700">
            <strong className="text-white block text-sm mb-1">Frontend UI Application (`/src`)</strong>
            <p className="text-neutral-400">
              React SPA built with strict TypeScript, Tailwind CSS, modular domain components, client routing, and printable PDF generators. It communicates exclusively via asynchronous HTTP calls through <code className="text-[#D9B76A]">BackendApiService</code>.
            </p>
          </div>
          <div className="p-4 bg-[#0d212e] rounded-xl border border-neutral-700">
            <strong className="text-white block text-sm mb-1">Backend Server & Storage (`/server`, `server.ts`)</strong>
            <p className="text-neutral-400">
              Express server listening on port 3000 exposing versioned REST endpoints (`/api/v1/*`), business validation, role authentication, CSV exports, transactional persistence, and automated audit trails.
            </p>
          </div>
        </div>
      </div>

      {/* Endpoints Directory & Interactive Runner */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-700">
          Available REST Endpoints (`/api/v1`)
        </h3>

        <div className="space-y-6">
          {endpoints.map(group => (
            <div key={group.group} className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-xs">
              <div className="px-5 py-3 bg-neutral-50/70 border-b border-neutral-200 font-bold text-xs text-[#142B3A] flex items-center gap-2">
                <Code className="w-4 h-4 text-[#547565]" />
                <span>{group.group}</span>
              </div>

              <div className="divide-y divide-neutral-200">
                {group.items.map(item => {
                  const isGet = item.method === 'GET';
                  const isPost = item.method === 'POST';
                  const isPatch = item.method === 'PATCH';

                  return (
                    <div key={item.path + item.method} className="p-4 hover:bg-neutral-50/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 font-mono text-xs">
                          <span className={`px-2 py-0.5 rounded font-bold text-[11px] ${
                            isGet ? 'bg-blue-100 text-blue-800' :
                            isPost ? 'bg-emerald-100 text-emerald-800' :
                            isPatch ? 'bg-amber-100 text-amber-800' : 'bg-neutral-100 text-neutral-800'
                          }`}>
                            {item.method}
                          </span>
                          <span className="font-bold text-neutral-800">{item.path}</span>
                        </div>
                        <p className="text-xs text-neutral-500">{item.desc}</p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleCopyCurl(item)}
                          className="p-2 text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100 rounded-lg text-xs transition-colors"
                          title="Copy cURL Command"
                        >
                          {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                        </button>

                        <button
                          onClick={() => handleRunEndpoint(item)}
                          disabled={isLoading}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#142B3A] text-white hover:bg-[#1f3f54] text-xs font-semibold rounded-lg shadow-xs transition-colors"
                        >
                          <Send className="w-3 h-3 text-[#D9B76A]" />
                          <span>Test Endpoint</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Response Modal / Pane */}
      {testResult && (
        <div className="bg-neutral-900 text-white rounded-xl p-5 border border-neutral-700 space-y-3 font-mono text-xs shadow-xl">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
            <span className="font-bold text-emerald-400">
              HTTP Response: Status {testResult.status} {testResult.ok ? 'OK' : 'FAIL'}
            </span>
            <button
              onClick={() => setTestResult(null)}
              className="text-neutral-400 hover:text-white text-xs"
            >
              Close Output
            </button>
          </div>

          <pre className="max-h-72 overflow-y-auto text-emerald-300 p-2 bg-black/40 rounded">
            {JSON.stringify(testResult.data || testResult.error, null, 2)}
          </pre>
        </div>
      )}

    </div>
  );
};
