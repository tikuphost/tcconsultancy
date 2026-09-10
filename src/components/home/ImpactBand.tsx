import React from 'react';
import { Award, HardHat, Users, Globe2 } from 'lucide-react';

export const ImpactBand: React.FC = () => {
  const stats = [
    {
      id: 'stat-1',
      icon: Award,
      value: '30+',
      label: 'YEARS COMBINED EXPERIENCE',
      subtext: 'Director leadership across GCC',
    },
    {
      id: 'stat-2',
      icon: HardHat,
      value: '250+',
      label: 'PROJECTS DELIVERED',
      subtext: 'Completed with zero compromise',
    },
    {
      id: 'stat-3',
      icon: Users,
      value: '120+',
      label: 'CLIENTS SERVED',
      subtext: 'Government & leading developers',
    },
    {
      id: 'stat-4',
      icon: Globe2,
      value: '5',
      label: 'COUNTRIES / GCC REGIONS',
      subtext: 'UAE, Qatar, Kuwait, Bahrain, KSA',
    },
  ];

  return (
    <section className="bg-[#0B1F3A] text-white py-14 sm:py-16 border-y border-slate-800 relative overflow-hidden">
      {/* Subtle background radial glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#F5A623]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Title Block (4 cols on lg) */}
          <div className="lg:col-span-4 border-l-2 border-[#F5A623] pl-4 sm:pl-6">
            <span className="text-[#F5A623] text-xs font-extrabold tracking-widest uppercase font-mono block mb-1">
              OUR IMPACT
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase leading-snug font-heading">
              NUMBERS THAT REFLECT OUR COMMITMENT
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
              Decades of technical integrity, precision surveying, and fiduciary protection for client capital.
            </p>
          </div>

          {/* Right 4 KPI Tiles (8 cols on lg) */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-800/80">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.id}
                  className={`flex flex-col items-center text-center px-3 ${
                    idx !== 0 ? 'pt-4 sm:pt-0' : ''
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-slate-800/60 border border-slate-700/60 flex items-center justify-center text-[#F5A623] mb-3">
                    <Icon className="w-5 h-5 stroke-[1.8]" />
                  </div>

                  {/* Huge Number */}
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-mono tracking-tight mb-1">
                    {stat.value}
                  </div>

                  {/* Caption */}
                  <div className="text-[11px] sm:text-xs font-bold text-[#F5A623] uppercase tracking-wider mb-1 leading-tight">
                    {stat.label}
                  </div>

                  <div className="text-[10px] text-slate-400 leading-tight hidden sm:block">
                    {stat.subtext}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
