import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { SERVICE_PILLARS } from '../../data/seedData';
import {
  Building2,
  Compass,
  Calculator,
  ShoppingBag,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  FileCheck,
  ShieldAlert,
  Layers,
} from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const { selectedServiceSlug, setSelectedServiceSlug, setIsQuoteModalOpen } = useApp();
  const [activePillarId, setActivePillarId] = useState<string>('design');
  const [expandedStages, setExpandedStages] = useState<Record<string, boolean>>({
    'design-0': true,
    'design-1': true,
    'project-0': true,
    'commercial-0': true,
  });

  useEffect(() => {
    if (selectedServiceSlug) {
      const match = SERVICE_PILLARS.find((p) => p.slug === selectedServiceSlug);
      if (match) setActivePillarId(match.id);
    }
  }, [selectedServiceSlug]);

  const toggleStage = (key: string) => {
    setExpandedStages((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const currentPillar = SERVICE_PILLARS.find((p) => p.id === activePillarId) || SERVICE_PILLARS[0];

  const pillarIcons: Record<string, any> = {
    design: Building2,
    project: Compass,
    commercial: Calculator,
    procurement: ShoppingBag,
  };

  return (
    <div className="bg-[#F8FAFC]">
      {/* Header Banner */}
      <section className="bg-[#0B1F3A] text-white py-16 sm:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[#F5A623] text-xs font-extrabold tracking-widest uppercase font-mono block mb-2">
            PRACTICE CAPABILITIES
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight uppercase leading-tight font-heading mb-4">
            COMPREHENSIVE ENGINEERING SERVICES
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed">
            From initial architectural concepts and statutory municipal approvals to FIDIC-based
            commercial management and site supervision across the Middle East.
          </p>
        </div>
      </section>

      {/* Service Pillar Tabs */}
      <section className="sticky top-[69px] z-30 bg-white border-b border-[#E3E6EB] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto no-scrollbar space-x-2 sm:space-x-4 py-3">
            {SERVICE_PILLARS.map((pillar) => {
              const Icon = pillarIcons[pillar.id] || Building2;
              const isActive = activePillarId === pillar.id;
              return (
                <button
                  key={pillar.id}
                  onClick={() => {
                    setActivePillarId(pillar.id);
                    setSelectedServiceSlug(pillar.slug);
                  }}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold tracking-wide uppercase transition-all whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[#0B1F3A] text-white shadow-sm'
                      : 'text-[#5A6678] hover:text-[#0B1F3A] hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#F5A623]' : 'text-slate-400'}`} />
                  <span>{pillar.title.split('—')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Main Stage Breakdown (8 cols) */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-xl border border-[#E3E6EB] p-6 sm:p-8 shadow-sm mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="p-2 rounded-md bg-[#F5A623]/20 text-[#0B1F3A]">
                    {React.createElement(pillarIcons[currentPillar.id] || Building2, {
                      className: 'w-6 h-6 text-[#0B1F3A]',
                    })}
                  </span>
                  <div>
                    <span className="text-[11px] font-extrabold text-[#F5A623] uppercase tracking-wider font-mono">
                      CORE DISCIPLINE
                    </span>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B1F3A] uppercase tracking-tight">
                      {currentPillar.title}
                    </h2>
                  </div>
                </div>

                <p className="text-[#5A6678] text-sm sm:text-base leading-relaxed mb-6 pt-2 border-t border-slate-100">
                  {currentPillar.shortDesc}
                </p>

                {/* Stages Accordion List */}
                <div className="space-y-4">
                  {currentPillar.stages.map((stage, idx) => {
                    const key = `${currentPillar.id}-${idx}`;
                    const isExpanded = expandedStages[key] ?? true;

                    return (
                      <div
                        key={key}
                        className="rounded-lg border border-[#E3E6EB] overflow-hidden transition-colors"
                      >
                        <button
                          onClick={() => toggleStage(key)}
                          className="w-full flex items-center justify-between p-4 sm:p-5 bg-slate-50 hover:bg-slate-100 text-left transition"
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-full bg-[#0B1F3A] text-white text-xs font-bold flex items-center justify-center font-mono">
                              {idx + 1}
                            </span>
                            <span className="font-extrabold text-sm sm:text-base text-[#0B1F3A]">
                              {stage.title}
                            </span>
                          </div>
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-slate-500" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-slate-500" />
                          )}
                        </button>

                        {isExpanded && (
                          <div className="p-5 bg-white border-t border-slate-100">
                            <p className="text-sm text-[#5A6678] leading-relaxed mb-4">
                              {stage.description}
                            </p>
                            <div className="space-y-2">
                              {stage.points.map((pt, pIdx) => (
                                <div key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                                  <CheckCircle className="w-4 h-4 text-[#F5A623] shrink-0 mt-0.5" />
                                  <span>{pt}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Special Focus Box for MEP / Interior / FIDIC */}
              {activePillarId === 'design' && (
                <div className="bg-white rounded-xl border border-[#E3E6EB] p-6 sm:p-8 shadow-sm">
                  <h3 className="text-lg font-extrabold text-[#0B1F3A] uppercase mb-4">
                    ELECTRICAL & MEP ENGINEERING SCOPE
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5A6678] mb-4 leading-relaxed">
                    Developed in strict compliance with UAE Civil Defence and local electricity/water authorities:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                    <div className="p-2.5 rounded bg-[#F5F6F8]">⚡ Power Distribution & Substation Sizing</div>
                    <div className="p-2.5 rounded bg-[#F5F6F8]">💡 Architectural Lighting Design</div>
                    <div className="p-2.5 rounded bg-[#F5F6F8]">🚨 Fire Alarm & Protection Systems</div>
                    <div className="p-2.5 rounded bg-[#F5F6F8]">🔋 UPS & Emergency Standby Power</div>
                    <div className="p-2.5 rounded bg-[#F5F6F8]">📹 CCTV, Access Control & Security Systems</div>
                    <div className="p-2.5 rounded bg-[#F5F6F8]">⚡ Lightning Protection & Airway Safety</div>
                  </div>
                </div>
              )}

              {activePillarId === 'commercial' && (
                <div className="bg-white rounded-xl border border-[#E3E6EB] p-6 sm:p-8 shadow-sm">
                  <h3 className="text-lg font-extrabold text-[#0B1F3A] uppercase mb-3">
                    POST-CONTRACT COST ADMINISTRATION
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5A6678] mb-4">
                    Monthly Interim Valuation Certificates (IPC), contractual analysis of variations,
                    and quarterly cost reporting forecast final accounts accurately to eliminate surprise disputes.
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs font-semibold text-[#0B1F3A]">
                    <span className="px-3 py-1 bg-slate-100 rounded-md border border-slate-200">POMI Method</span>
                    <span className="px-3 py-1 bg-slate-100 rounded-md border border-slate-200">CESMM4</span>
                    <span className="px-3 py-1 bg-slate-100 rounded-md border border-slate-200">FIDIC Red/Yellow</span>
                    <span className="px-3 py-1 bg-slate-100 rounded-md border border-slate-200">Earned Value Analysis</span>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar CTA & Credentials (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-[#0B1F3A] text-white p-6 rounded-xl shadow-md border border-slate-800">
                <span className="text-[#F5A623] text-xs font-extrabold uppercase font-mono tracking-widest block mb-2">
                  PROJECT ESTIMATOR
                </span>
                <h3 className="text-lg font-extrabold uppercase font-heading mb-2">
                  REQUEST A FEE PROPOSAL
                </h3>
                <p className="text-slate-300 text-xs leading-relaxed mb-6">
                  Provide your project location, gross floor area, or scope. Our certified Quantity
                  Surveyors will prepare an indicative proposal.
                </p>
                <button
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="w-full bg-[#F5A623] hover:bg-[#E8911A] text-[#0B1F3A] font-extrabold text-xs uppercase py-3 rounded shadow transition tracking-wider flex items-center justify-center gap-2"
                >
                  <span>CALCULATE QUOTE</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-white p-6 rounded-xl border border-[#E3E6EB] shadow-sm">
                <h4 className="text-sm font-extrabold text-[#0B1F3A] uppercase tracking-wide mb-4">
                  STANDARDS & CERTIFICATIONS
                </h4>
                <ul className="space-y-3 text-xs text-[#5A6678]">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#F5A623]" />
                    <span>ISO 9001:2015 Quality Management</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#F5A623]" />
                    <span>RICS Regulated Firm Standards</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#F5A623]" />
                    <span>AACEI Cost Engineering Framework</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#F5A623]" />
                    <span>Full UAE Municipal Licensure</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
