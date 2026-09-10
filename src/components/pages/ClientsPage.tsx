import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SEED_CLIENTS } from '../../data/seedData';
import { Building2, Shield, Landmark, GraduationCap, Utensils, Zap, Home } from 'lucide-react';

export const ClientsPage: React.FC = () => {
  const { setPage } = useApp();
  const [selectedSector, setSelectedSector] = useState<string>('all');

  const sectors = [
    'all',
    'Government & Authorities',
    'Hospitality',
    'Education',
    'Industrial & Energy',
    'Real Estate & Development',
  ];

  const sectorIcons: Record<string, any> = {
    'Government & Authorities': Landmark,
    Education: GraduationCap,
    Hospitality: Utensils,
    'Industrial & Energy': Zap,
    'Real Estate & Development': Home,
  };

  const filteredClients = SEED_CLIENTS.filter((client) => {
    if (selectedSector === 'all') return true;
    return client.sector === selectedSector;
  });

  return (
    <div className="bg-[#F8FAFC]">
      {/* Header Banner */}
      <section className="bg-[#0B1F3A] text-white py-16 sm:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[#F5A623] text-xs font-extrabold tracking-widest uppercase font-mono block mb-2">
            TRUSTED PARTNERSHIPS
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight uppercase leading-tight font-heading mb-4">
            OUR CLIENTS & STAKEHOLDERS
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed">
            Earning and establishing the trust and goodwill of ministries, leading developers, and
            international operators across the Middle East.
          </p>
        </div>
      </section>

      {/* Sector Filter Bar */}
      <section className="sticky top-[69px] z-30 bg-white border-b border-[#E3E6EB] py-4 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto no-scrollbar gap-2">
            {sectors.map((sector) => (
              <button
                key={sector}
                onClick={() => setSelectedSector(sector)}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition whitespace-nowrap ${
                  selectedSector === sector
                    ? 'bg-[#0B1F3A] text-white'
                    : 'text-[#5A6678] hover:bg-slate-100'
                }`}
              >
                {sector === 'all' ? 'All Sectors (18)' : sector}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Client Logo Wall Grid */}
      <section className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredClients.map((client) => {
              const Icon = sectorIcons[client.sector] || Building2;
              return (
                <div
                  key={client.id}
                  onClick={() => setPage('projects')}
                  className="group bg-white rounded-xl border border-[#E3E6EB] hover:border-[#F5A623] p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="p-2.5 rounded-lg bg-slate-100 text-[#0B1F3A] group-hover:bg-[#F5A623] transition-colors">
                      <Icon className="w-5 h-5" />
                    </span>
                    <span className="text-[10px] font-mono font-bold text-slate-400">
                      {client.country}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-extrabold text-[#0B1F3A] uppercase tracking-wide group-hover:text-[#F5A623] transition-colors mb-1.5 leading-snug">
                      {client.name}
                    </h3>
                    <p className="text-xs text-[#5A6678] mb-4">
                      {client.sector}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
                    <span>Assignments:</span>
                    <span className="px-2 py-0.5 rounded bg-slate-100 font-mono font-bold text-[#0B1F3A]">
                      {client.projectsCount} Delivered
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
