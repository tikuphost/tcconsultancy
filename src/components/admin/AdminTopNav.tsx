import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  Cpu,
  HardDrive,
  Database,
  ArrowLeft,
  Bell,
  CheckCircle,
  User,
} from 'lucide-react';

export const AdminTopNav: React.FC = () => {
  const { setIsAdminMode, telemetry, showToast } = useApp();

  return (
    <header className="bg-[#0B1F3A] text-white border-b border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-4">
        {/* Logo lockup */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-[#F5A623] flex items-center justify-center text-[#0B1F3A] font-extrabold">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-white font-extrabold text-sm tracking-wider font-heading flex items-center gap-2">
              <span>TC COMMAND CENTER</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono font-bold">
                PROD v2.4
              </span>
            </div>
            <div className="text-slate-400 text-[10px]">Sharjah FZC Internal Operations</div>
          </div>
        </div>

        {/* Live Hostinger Cloud Startup Telemetry Pill (Desktop) */}
        <div className="hidden lg:flex items-center gap-3 pl-4 border-l border-slate-700 text-[11px] font-mono text-slate-300">
          <div className="flex items-center gap-1.5" title="Server CPU Cores">
            <Cpu className="w-3.5 h-3.5 text-[#F5A623]" />
            <span>4 Cores ({telemetry.cpuLoadPercent}%)</span>
          </div>

          <div className="flex items-center gap-1.5" title="Container Memory">
            <HardDrive className="w-3.5 h-3.5 text-sky-400" />
            <span>{telemetry.memoryUsedGB}GB / {telemetry.memoryTotalGB}GB RAM</span>
          </div>

          <div className="flex items-center gap-1.5" title="MySQL Storage">
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            <span>MySQL: {telemetry.databaseUsedMB}MB / 6,144MB</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => showToast('All systems nominal. Hostinger Cloud SSL active.', 'info')}
          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
          title="System status"
        >
          <Bell className="w-4 h-4" />
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-300 pr-2">
          <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center font-bold text-[10px] text-[#F5A623]">
            TC
          </div>
          <span className="font-semibold">Director Desk</span>
        </div>

        {/* Exit Admin Mode Back to Storefront */}
        <button
          onClick={() => setIsAdminMode(false)}
          className="inline-flex items-center gap-1.5 bg-[#F5A623] hover:bg-[#E8911A] text-[#0B1F3A] px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit to Website</span>
        </button>
      </div>
    </header>
  );
};
