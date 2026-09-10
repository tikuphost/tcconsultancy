import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  MessageSquare,
  FileText,
  Building,
  Newspaper,
  TrendingUp,
  Tag,
  ArrowRight,
  Clock,
} from 'lucide-react';

interface AdminOverviewProps {
  onNavigateTab: (tab: string) => void;
}

export const AdminOverviewSection: React.FC<AdminOverviewProps> = ({ onNavigateTab }) => {
  const { chatSessions, quotations, projects, blogPosts, chatTags } = useApp();

  const activeChats = chatSessions.filter((s) => s.status !== 'resolved').length;
  const pendingRFQs = quotations.filter((q) => q.status === 'Pending').length;
  const totalRFQValue = quotations.reduce((acc, q) => acc + q.totalAED, 0);

  // Calculate tag distribution
  const tagUsageMap: Record<string, number> = {};
  chatSessions.forEach((s) => {
    s.tags.forEach((t) => {
      tagUsageMap[t] = (tagUsageMap[t] || 0) + 1;
    });
  });

  const sortedTags = Object.entries(tagUsageMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  const maxUsage = Math.max(...Object.values(tagUsageMap), 1);

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-xl font-extrabold text-[#0B1F3A] uppercase font-heading">
          EXECUTIVE OVERVIEW & TELEMETRY
        </h1>
        <p className="text-xs text-[#5A6678]">
          Real-time metrics across inquiry threads, proposal valuations, and Hostinger Cloud container services.
        </p>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div
          onClick={() => onNavigateTab('chat')}
          className="bg-white p-5 rounded-xl border border-[#E3E6EB] hover:border-[#F5A623] shadow-xs hover:shadow-md transition cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              ACTIVE LIVE SESSIONS
            </span>
            <span className="p-2 rounded-lg bg-red-50 text-red-600">
              <MessageSquare className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-extrabold text-[#0B1F3A] font-mono mb-1">
            {activeChats} <span className="text-xs font-normal text-slate-500">/ {chatSessions.length}</span>
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>Multi-tag routing active</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div
          onClick={() => onNavigateTab('quotations')}
          className="bg-white p-5 rounded-xl border border-[#E3E6EB] hover:border-[#F5A623] shadow-xs hover:shadow-md transition cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              RFQ PROPOSAL PIPELINE
            </span>
            <span className="p-2 rounded-lg bg-amber-50 text-amber-600">
              <FileText className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-extrabold text-[#0B1F3A] font-mono mb-1">
            AED {(totalRFQValue / 1000).toFixed(0)}k
          </div>
          <div className="text-[11px] text-slate-500 font-semibold">
            {pendingRFQs} proposal(s) awaiting review
          </div>
        </div>

        {/* Metric 3 */}
        <div
          onClick={() => onNavigateTab('projects')}
          className="bg-white p-5 rounded-xl border border-[#E3E6EB] hover:border-[#F5A623] shadow-xs hover:shadow-md transition cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              DELIVERED ASSIGNMENTS
            </span>
            <span className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <Building className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-extrabold text-[#0B1F3A] font-mono mb-1">
            {projects.length}
          </div>
          <div className="text-[11px] text-slate-500 font-semibold">
            Across UAE, Kuwait, Qatar & Bahrain
          </div>
        </div>

        {/* Metric 4 */}
        <div
          onClick={() => onNavigateTab('tags')}
          className="bg-white p-5 rounded-xl border border-[#E3E6EB] hover:border-[#F5A623] shadow-xs hover:shadow-md transition cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              ROUTING TAG LIBRARY
            </span>
            <span className="p-2 rounded-lg bg-purple-50 text-purple-600">
              <Tag className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-extrabold text-[#0B1F3A] font-mono mb-1">
            {chatTags.length}
          </div>
          <div className="text-[11px] text-slate-500 font-semibold">
            Custom & system taxonomy tags
          </div>
        </div>
      </div>

      {/* Grid: Top Tags Usage Chart & Recent RFQs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Top Tags Horizontal Frequency Chart (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-[#E3E6EB] shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xs font-extrabold text-[#0B1F3A] uppercase tracking-wide">
                TOP ROUTING TAG DISTRIBUTION
              </h2>
              <p className="text-[11px] text-slate-400">Active session frequencies</p>
            </div>
            <button
              onClick={() => onNavigateTab('tags')}
              className="text-xs font-bold text-amber-600 hover:underline flex items-center gap-1"
            >
              <span>Manage</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3 pt-2">
            {sortedTags.map(([tagName, count]) => {
              const tagObj = chatTags.find((t) => t.name === tagName);
              const color = tagObj?.color || '#3B82F6';
              const percent = Math.round((count / maxUsage) * 100);

              return (
                <div key={tagName} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
                      <span>{tagName}</span>
                    </span>
                    <span className="font-mono text-slate-500 font-bold">{count} threads</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${percent}%`, backgroundColor: color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent RFQs & Inquiries Table (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-[#E3E6EB] shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xs font-extrabold text-[#0B1F3A] uppercase tracking-wide">
                RECENT PROPOSALS & QUOTATIONS
              </h2>
              <p className="text-[11px] text-slate-400">Active commercial tenders</p>
            </div>
            <button
              onClick={() => onNavigateTab('quotations')}
              className="text-xs font-bold text-amber-600 hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] text-slate-400 uppercase">
                  <th className="pb-2">RFQ #</th>
                  <th className="pb-2">Client / Project</th>
                  <th className="pb-2 text-right">Value (AED)</th>
                  <th className="pb-2 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {quotations.slice(0, 5).map((rfq) => (
                  <tr key={rfq.id} className="hover:bg-slate-50 transition">
                    <td className="py-2.5 font-mono font-bold text-[#0B1F3A]">{rfq.rfqNumber}</td>
                    <td className="py-2.5">
                      <div className="font-bold text-slate-800">{rfq.customerName}</div>
                      <div className="text-[11px] text-slate-400 truncate max-w-xs">{rfq.projectTitle}</div>
                    </td>
                    <td className="py-2.5 text-right font-mono font-bold text-[#0B1F3A]">
                      AED {rfq.totalAED.toLocaleString()}
                    </td>
                    <td className="py-2.5 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          rfq.status === 'Confirmed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : rfq.status === 'Pending'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {rfq.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
