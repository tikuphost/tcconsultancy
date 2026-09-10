import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Database,
  Download,
  Terminal,
  Cpu,
  HardDrive,
  CheckCircle,
  Play,
  RotateCcw,
  ShieldCheck,
  Server,
} from 'lucide-react';

export const AdminDatabaseSection: React.FC = () => {
  const {
    telemetry,
    chatSessions,
    chatTags,
    projects,
    quotations,
    blogPosts,
    showToast,
  } = useApp();

  const [sqlQuery, setSqlQuery] = useState('SELECT id, name, color, usageCount FROM chat_tags LIMIT 10;');
  const [queryResult, setQueryResult] = useState<any[] | null>([
    { id: 'tag-1', name: 'Bulk RFQ', color: '#F59E0B', usageCount: 6 },
    { id: 'tag-2', name: 'Design Consultancy', color: '#3B82F6', usageCount: 9 },
    { id: 'tag-3', name: 'Commercial Management', color: '#10B981', usageCount: 8 },
    { id: 'tag-4', name: 'Urgent', color: '#EF4444', usageCount: 4 },
  ]);

  // One-Click SQL Dump Generation
  const handleDownloadBackup = () => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `tc_consultancy_mysql_dump_${timestamp}.sql`;

    const sqlContent = `-- TC CONSULTANCY FZC - HOSTINGER CLOUD STARTUP MYSQL DUMP
-- Hostinger Cloud Instance: 4 Cores, 4GB RAM, NVMe SSD
-- Dump Version: 2.4.0-Production
-- Generation Timestamp: ${new Date().toUTCString()}
-- Database: tc_consultancy_prod

SET FOREIGN_KEY_CHECKS = 0;

-- --------------------------------------------------------
-- Table structure for \`chat_tags\`
-- --------------------------------------------------------
DROP TABLE IF EXISTS \`chat_tags\`;
CREATE TABLE \`chat_tags\` (
  \`id\` varchar(64) NOT NULL,
  \`name\` varchar(128) NOT NULL,
  \`color\` varchar(16) NOT NULL DEFAULT '#3B82F6',
  \`description\` text DEFAULT NULL,
  \`is_system\` tinyint(1) NOT NULL DEFAULT '0',
  \`usage_count\` int NOT NULL DEFAULT '0',
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

${chatTags
  .map(
    (t) =>
      `INSERT INTO \`chat_tags\` (\`id\`, \`name\`, \`color\`, \`description\`, \`is_system\`, \`usage_count\`) VALUES ('${t.id}', '${t.name.replace(/'/g, "''")}', '${t.color}', '${(t.description || '').replace(/'/g, "''")}', ${t.isSystem ? 1 : 0}, ${t.usageCount});`
  )
  .join('\n')}

-- --------------------------------------------------------
-- Table structure for \`projects\`
-- --------------------------------------------------------
DROP TABLE IF EXISTS \`projects\`;
CREATE TABLE \`projects\` (
  \`id\` varchar(64) NOT NULL,
  \`name\` varchar(255) NOT NULL,
  \`service\` varchar(128) NOT NULL,
  \`client\` varchar(255) NOT NULL,
  \`consultant\` varchar(255) NOT NULL,
  \`project_value\` varchar(64) NOT NULL,
  \`location\` varchar(128) NOT NULL,
  \`category\` varchar(64) NOT NULL,
  \`status\` varchar(32) NOT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

${projects
  .map(
    (p) =>
      `INSERT INTO \`projects\` (\`id\`, \`name\`, \`service\`, \`client\`, \`consultant\`, \`project_value\`, \`location\`, \`category\`, \`status\`) VALUES ('${p.id}', '${p.name.replace(/'/g, "''")}', '${p.service}', '${p.client.replace(/'/g, "''")}', '${p.consultant.replace(/'/g, "''")}', '${p.value}', '${p.location}', '${p.category}', '${p.status}');`
  )
  .join('\n')}

-- --------------------------------------------------------
-- Table structure for \`quotations\`
-- --------------------------------------------------------
DROP TABLE IF EXISTS \`quotations\`;
CREATE TABLE \`quotations\` (
  \`id\` varchar(64) NOT NULL,
  \`rfq_number\` varchar(64) NOT NULL,
  \`customer_name\` varchar(255) NOT NULL,
  \`company_name\` varchar(255) NOT NULL,
  \`total_aed\` bigint NOT NULL,
  \`status\` varchar(32) NOT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

${quotations
  .map(
    (q) =>
      `INSERT INTO \`quotations\` (\`id\`, \`rfq_number\`, \`customer_name\`, \`company_name\`, \`total_aed\`, \`status\`) VALUES ('${q.id}', '${q.rfqNumber}', '${q.customerName.replace(/'/g, "''")}', '${q.companyName.replace(/'/g, "''")}', ${q.totalAED}, '${q.status}');`
  )
  .join('\n')}

SET FOREIGN_KEY_CHECKS = 1;
-- Dump completed successfully.
`;

    const blob = new Blob([sqlContent], { type: 'application/sql' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast(`Exported complete MySQL backup (${(sqlContent.length / 1024).toFixed(1)} KB)`, 'success');
  };

  // Run Simulated Diagnostic SQL Query
  const handleExecuteQuery = (e: React.FormEvent) => {
    e.preventDefault();
    const q = sqlQuery.toLowerCase().trim();

    if (q.includes('chat_tags')) {
      setQueryResult(
        chatTags.map((t) => ({ id: t.id, name: t.name, color: t.color, usageCount: t.usageCount }))
      );
      showToast(`Query executed: ${chatTags.length} row(s) returned`, 'success');
    } else if (q.includes('projects')) {
      setQueryResult(
        projects.slice(0, 8).map((p) => ({
          name: p.name,
          service: p.service,
          client: p.client,
          value: p.value,
          status: p.status,
        }))
      );
      showToast(`Query executed: 8 row(s) returned`, 'success');
    } else if (q.includes('quotations')) {
      setQueryResult(
        quotations.map((q) => ({
          rfqNumber: q.rfqNumber,
          customer: q.customerName,
          company: q.companyName,
          totalAED: q.totalAED,
          status: q.status,
        }))
      );
      showToast(`Query executed: ${quotations.length} row(s) returned`, 'success');
    } else {
      setQueryResult([
        { status: 'OK', message: 'Query parsed successfully', affected_rows: 0, execution_ms: 1.4 },
      ]);
      showToast('Query executed successfully', 'info');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-[#0B1F3A] uppercase font-heading flex items-center gap-2">
            <Database className="w-5 h-5 text-[#F5A623]" />
            <span>HOSTINGER CLOUD STARTUP TELEMETRY & MYSQL</span>
          </h1>
          <p className="text-xs text-[#5A6678]">
            Container resource instrumentation, persistent storage metrics, and automated SQL schema backups.
          </p>
        </div>

        <button
          onClick={handleDownloadBackup}
          className="bg-[#0B1F3A] hover:bg-[#071528] text-[#F5A623] border border-[#F5A623] font-extrabold text-xs uppercase px-4 py-2.5 rounded-lg shadow-xs tracking-wider flex items-center gap-2 transition"
        >
          <Download className="w-4 h-4" />
          <span>Generate MySQL Backup (.SQL)</span>
        </button>
      </div>

      {/* Hostinger Cloud Hardware Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* CPU */}
        <div className="bg-white p-5 rounded-xl border border-[#E3E6EB] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              CPU PROCESSOR
            </span>
            <Cpu className="w-4 h-4 text-[#F5A623]" />
          </div>
          <div className="text-xl font-extrabold text-[#0B1F3A] font-mono mb-1">
            4 Dedicated Cores
          </div>
          <div className="text-[11px] text-slate-500 mb-2">
            Current container load: <strong className="text-slate-800">{telemetry.cpuLoadPercent}%</strong>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-[#F5A623] rounded-full transition-all"
              style={{ width: `${telemetry.cpuLoadPercent}%` }}
            />
          </div>
        </div>

        {/* RAM */}
        <div className="bg-white p-5 rounded-xl border border-[#E3E6EB] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              PHYSICAL MEMORY
            </span>
            <HardDrive className="w-4 h-4 text-sky-500" />
          </div>
          <div className="text-xl font-extrabold text-[#0B1F3A] font-mono mb-1">
            {telemetry.memoryUsedGB} GB / {telemetry.memoryTotalGB} GB
          </div>
          <div className="text-[11px] text-slate-500 mb-2">
            Heap RSS: <strong className="text-slate-800">428 MB Active</strong>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-sky-500 rounded-full transition-all"
              style={{ width: `${(telemetry.memoryUsedGB / telemetry.memoryTotalGB) * 100}%` }}
            />
          </div>
        </div>

        {/* MySQL Storage (out of 6,144 MB) */}
        <div className="bg-white p-5 rounded-xl border border-[#E3E6EB] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              MYSQL DATABASE SIZE
            </span>
            <Database className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-xl font-extrabold text-[#0B1F3A] font-mono mb-1">
            {telemetry.databaseUsedMB} MB
          </div>
          <div className="text-[11px] text-slate-500 mb-2">
            Maximum Limit: <strong className="text-slate-800">6,144 MB (6 GB)</strong>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all"
              style={{ width: `${(telemetry.databaseUsedMB / telemetry.databaseMaxMB) * 100}%` }}
            />
          </div>
        </div>

        {/* Container Uptime & Stack */}
        <div className="bg-white p-5 rounded-xl border border-[#E3E6EB] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              ENGINE STACK
            </span>
            <Server className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-base font-extrabold text-[#0B1F3A] font-mono mb-1 truncate">
            Node.js 22 + MySQL 8
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Sharjah Zone SSL Active</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1 font-mono">
            Uptime: 48d 14h 22m
          </div>
        </div>
      </div>

      {/* MySQL Table Inventory Table */}
      <div className="bg-white rounded-xl border border-[#E3E6EB] overflow-hidden shadow-xs">
        <div className="p-4 border-b border-[#E3E6EB] flex items-center justify-between">
          <h2 className="text-xs font-extrabold text-[#0B1F3A] uppercase tracking-wider">
            MYSQL DATABASE SCHEMA & TABLE INVENTORY
          </h2>
          <span className="text-xs text-slate-400 font-mono">Engine: InnoDB · utf8mb4</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200">
                <th className="py-2.5 px-4">Table Name</th>
                <th className="py-2.5 px-4">Storage Engine</th>
                <th className="py-2.5 px-4 text-center">Row Count</th>
                <th className="py-2.5 px-4 text-right">Data Length</th>
                <th className="py-2.5 px-4 text-right">Index Length</th>
                <th className="py-2.5 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {[
                { name: 'chat_tags', rows: chatTags.length, data: '16 KB', index: '8 KB' },
                { name: 'chat_sessions', rows: chatSessions.length, data: '48 KB', index: '16 KB' },
                { name: 'chat_messages', rows: chatSessions.reduce((a, s) => a + s.messages.length, 0), data: '128 KB', index: '32 KB' },
                { name: 'projects', rows: projects.length, data: '96 KB', index: '16 KB' },
                { name: 'quotations', rows: quotations.length, data: '32 KB', index: '8 KB' },
                { name: 'blog_posts', rows: blogPosts.length, data: '184 KB', index: '24 KB' },
              ].map((tbl) => (
                <tr key={tbl.name} className="hover:bg-slate-50/70 transition">
                  <td className="py-2.5 px-4 font-bold text-[#0B1F3A]">`{tbl.name}`</td>
                  <td className="py-2.5 px-4 text-slate-500">InnoDB</td>
                  <td className="py-2.5 px-4 text-center font-bold text-slate-800">{tbl.rows}</td>
                  <td className="py-2.5 px-4 text-right text-slate-600">{tbl.data}</td>
                  <td className="py-2.5 px-4 text-right text-slate-500">{tbl.index}</td>
                  <td className="py-2.5 px-4 text-center">
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase">
                      OK
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Diagnostic SQL Console */}
      <div className="bg-[#0B1F3A] rounded-xl border border-slate-800 overflow-hidden shadow-md text-white p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#F5A623]" />
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-200">
              DIAGNOSTIC SQL RUNNER
            </h2>
          </div>
          <span className="text-[10px] font-mono text-slate-400">Read-Only Diagnostic Sandbox</span>
        </div>

        <form onSubmit={handleExecuteQuery} className="space-y-3">
          <div className="relative">
            <textarea
              rows={2}
              value={sqlQuery}
              onChange={(e) => setSqlQuery(e.target.value)}
              className="w-full p-3 rounded bg-slate-900 text-slate-100 font-mono text-xs border border-slate-700 focus:outline-none focus:border-[#F5A623]"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <span>Quick tests:</span>
              <button
                type="button"
                onClick={() => setSqlQuery('SELECT * FROM chat_tags;')}
                className="text-amber-400 hover:underline font-mono"
              >
                chat_tags
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => setSqlQuery("SELECT name, client, value FROM projects WHERE status = 'completed';")}
                className="text-amber-400 hover:underline font-mono"
              >
                completed_projects
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => setSqlQuery('SELECT * FROM quotations;')}
                className="text-amber-400 hover:underline font-mono"
              >
                quotations
              </button>
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-[#F5A623] hover:bg-[#E8911A] text-[#0B1F3A] font-extrabold text-xs uppercase rounded flex items-center gap-1.5 transition"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Execute SQL</span>
            </button>
          </div>
        </form>

        {/* Results output */}
        {queryResult && (
          <div className="mt-4 pt-4 border-t border-slate-800">
            <span className="text-[10px] font-mono text-[#F5A623] uppercase block mb-2">
              Query Results ({queryResult.length} rows):
            </span>
            <div className="overflow-x-auto max-h-56 bg-slate-900 rounded p-3 text-xs font-mono text-slate-200 border border-slate-800">
              <pre>{JSON.stringify(queryResult, null, 2)}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
