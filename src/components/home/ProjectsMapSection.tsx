import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight, MapPin, CheckCircle2, Clock, Eye } from 'lucide-react';
import { ProjectItem } from '../../types';

export const ProjectsMapSection: React.FC = () => {
  const { projects, setPage, setSelectedProjectId } = useApp();
  const [hoveredProject, setHoveredProject] = useState<ProjectItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'completed' | 'in_progress'>('all');

  // Filter projects with coordinates
  const mappedProjects = projects.filter((p) => p.coordinates);

  const filteredProjects = mappedProjects.filter((p) => {
    if (activeFilter === 'all') return true;
    return p.status === activeFilter;
  });

  const completedCount = projects.filter((p) => p.status === 'completed').length;
  const inProgressCount = projects.filter((p) => p.status === 'in_progress').length;

  return (
    <section className="py-16 sm:py-24 bg-[#F5F6F8] border-b border-[#E3E6EB] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Block (5 cols) */}
          <div className="lg:col-span-5">
            <span className="text-[#F5A623] text-xs font-extrabold tracking-widest uppercase font-mono block mb-2">
              OUR PROJECTS
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1F3A] tracking-tight uppercase leading-tight font-heading mb-4">
              BUILDING ACROSS COMMUNITIES
            </h2>
            <p className="text-[#5A6678] text-sm sm:text-base leading-relaxed mb-6">
              From landmark towers along the Arabian Gulf to critical public utility facilities and
              university campuses, our projects make a lasting impact. Explore where we build across
              the UAE, Qatar, Kuwait, and Bahrain.
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-8">
              <button
                onClick={() => setPage('projects')}
                className="inline-flex items-center gap-2 bg-[#F5A623] hover:bg-[#E8911A] text-[#0B1F3A] font-extrabold text-xs uppercase px-5 py-3 rounded shadow hover:shadow-amber-500/20 transition-all"
              >
                <span>VIEW PROJECT DIRECTORY</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() =>
                  setActiveFilter((prev) => (prev === 'all' ? 'in_progress' : prev === 'in_progress' ? 'completed' : 'all'))
                }
                className="px-4 py-2.5 rounded border border-slate-300 text-xs font-bold text-[#0B1F3A] hover:bg-white transition"
              >
                Filter: {activeFilter === 'all' ? 'All (29)' : activeFilter === 'completed' ? 'Completed Only' : 'In Progress'}
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-white border border-[#E3E6EB] shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#0B1F3A] flex items-center justify-center text-white text-xs font-bold">
                  {completedCount}
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0B1F3A]">Delivered Projects</div>
                  <div className="text-[11px] text-[#5A6678]">100% Handover Rate</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#F5A623] flex items-center justify-center text-[#0B1F3A] text-xs font-bold">
                  {inProgressCount}
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0B1F3A]">Active Deliveries</div>
                  <div className="text-[11px] text-[#5A6678]">GCC Developments</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Map Block (7 cols) matching reference layout */}
          <div className="lg:col-span-7 relative">
            <div className="relative bg-white rounded-xl p-4 sm:p-8 border border-[#E3E6EB] shadow-sm">
              {/* Header inside map frame */}
              <div className="flex justify-between items-center mb-4 text-xs font-semibold text-slate-500">
                <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-[#0B1F3A]">
                  <MapPin className="w-3.5 h-3.5 text-[#F5A623]" />
                  GCC Regional Footprint (Arabian Peninsula)
                </span>
                <span className="text-[11px] text-slate-400">Hover dots for project brief</span>
              </div>

              {/* Arabian Gulf / GCC Map Canvas SVG */}
              <div className="relative w-full aspect-[16/10] bg-[#F8FAFC] rounded-lg border border-slate-200 overflow-hidden flex items-center justify-center">
                {/* SVG Silhouette of Arabian Peninsula / GCC Coastlines */}
                <svg
                  viewBox="0 0 1000 650"
                  className="w-full h-full object-contain filter drop-shadow-sm select-none"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <defs>
                    <linearGradient id="gulfGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#E2E8F0" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#CBD5E1" stopOpacity="0.8" />
                    </linearGradient>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E2E8F0" strokeWidth="0.8" />
                    </pattern>
                  </defs>

                  {/* Grid Lines */}
                  <rect width="1000" height="650" fill="url(#grid)" />

                  {/* GCC Landmass Silhouette (Saudi, Kuwait, Bahrain, Qatar, UAE, Oman) */}
                  <path
                    d="M 120 180
                       C 200 130, 300 90, 420 120
                       C 480 140, 520 190, 550 250
                       C 580 300, 620 340, 680 370
                       C 730 400, 820 410, 890 360
                       C 940 330, 960 380, 930 460
                       C 900 530, 850 560, 770 580
                       C 680 600, 560 620, 450 610
                       C 320 600, 240 560, 180 500
                       C 110 420, 90 300, 120 180 Z"
                    fill="url(#gulfGradient)"
                    stroke="#94A3B8"
                    strokeWidth="1.5"
                  />

                  {/* Arabian Gulf Water Inlet Accent */}
                  <path
                    d="M 280 150
                       C 380 190, 480 250, 580 300
                       C 640 330, 720 360, 780 340
                       C 840 320, 880 280, 860 250
                       C 820 220, 740 210, 680 190
                       C 580 160, 480 130, 380 110 Z"
                    fill="#E0F2FE"
                    opacity="0.6"
                  />

                  {/* Territory Labels */}
                  <text x="250" y="160" fill="#64748B" fontSize="16" fontWeight="bold" fontFamily="sans-serif">KUWAIT</text>
                  <text x="390" y="270" fill="#64748B" fontSize="15" fontWeight="bold" fontFamily="sans-serif">BAHRAIN</text>
                  <text x="490" y="320" fill="#64748B" fontSize="16" fontWeight="bold" fontFamily="sans-serif">QATAR</text>
                  <text x="730" y="390" fill="#0B1F3A" fontSize="18" fontWeight="800" fontFamily="sans-serif">U.A.E.</text>
                  <text x="320" y="440" fill="#94A3B8" fontSize="22" fontWeight="700" letterSpacing="4" fontFamily="sans-serif">SAUDI ARABIA</text>
                  <text x="830" y="490" fill="#64748B" fontSize="16" fontWeight="bold" fontFamily="sans-serif">OMAN</text>

                  {/* Specific City markers */}
                  <circle cx="750" cy="350" r="3" fill="#64748B" />
                  <text x="756" y="348" fill="#475569" fontSize="11" fontWeight="600">Dubai</text>

                  <circle cx="780" cy="335" r="3" fill="#64748B" />
                  <text x="786" y="333" fill="#475569" fontSize="11" fontWeight="600">Sharjah (HQ)</text>

                  <circle cx="630" cy="420" r="3" fill="#64748B" />
                  <text x="560" y="435" fill="#475569" fontSize="11" fontWeight="600">Abu Dhabi</text>
                </svg>

                {/* Project Location Dots (Absolute Positioned over responsive SVG map) */}
                {filteredProjects.map((p) => {
                  const coords = p.coordinates || { x: 50, y: 50 };
                  const isHovered = hoveredProject?.id === p.id;
                  const isCompleted = p.status === 'completed';

                  return (
                    <button
                      key={p.id}
                      onClick={() => {
                        setSelectedProjectId(p.id);
                        setPage('projects');
                      }}
                      onMouseEnter={() => setHoveredProject(p)}
                      onMouseLeave={() => setHoveredProject(null)}
                      style={{
                        left: `${coords.x}%`,
                        top: `${coords.y}%`,
                      }}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer focus:outline-none z-20"
                      aria-label={`${p.name} (${p.status})`}
                    >
                      {/* Pulse Ring for In-Progress or Hovered */}
                      {(!isCompleted || isHovered) && (
                        <span
                          className={`absolute inset-0 rounded-full animate-ping opacity-75 ${
                            isCompleted ? 'bg-[#0B1F3A]' : 'bg-[#F5A623]'
                          }`}
                        />
                      )}

                      {/* Dot */}
                      <span
                        className={`block w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 border-white shadow-md transition-transform duration-150 ${
                          isCompleted
                            ? 'bg-[#0B1F3A] hover:scale-125'
                            : 'bg-[#F5A623] hover:scale-125'
                        }`}
                      />
                    </button>
                  );
                })}

                {/* Floating Tooltip Card on Hover */}
                {hoveredProject && (
                  <div
                    className="absolute z-30 pointer-events-none transition-all duration-150 transform -translate-x-1/2 -translate-y-full mb-3"
                    style={{
                      left: `${hoveredProject.coordinates?.x || 50}%`,
                      top: `${Math.max(12, (hoveredProject.coordinates?.y || 50) - 4)}%`,
                    }}
                  >
                    <div className="bg-[#0B1F3A] text-white p-3 rounded-lg shadow-xl text-xs w-60 border border-slate-700">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[10px] uppercase font-bold text-[#F5A623]">
                          {hoveredProject.category}
                        </span>
                        <span
                          className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${
                            hoveredProject.status === 'completed'
                              ? 'bg-emerald-900/60 text-emerald-300'
                              : 'bg-amber-900/60 text-amber-300'
                          }`}
                        >
                          {hoveredProject.status === 'completed' ? 'Completed' : 'In Progress'}
                        </span>
                      </div>
                      <div className="font-bold text-sm leading-snug mb-1 text-white">
                        {hoveredProject.name}
                      </div>
                      <div className="text-slate-300 text-[11px] mb-1">
                        Client: <span className="text-slate-100">{hoveredProject.client}</span>
                      </div>
                      <div className="text-[#F5A623] font-mono font-bold text-[11px]">
                        Value: AED {hoveredProject.value}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Map Legend (Bottom Right matching reference) */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs">
                <div className="text-slate-500 font-medium">
                  Showing <span className="font-bold text-[#0B1F3A]">{filteredProjects.length}</span> mapped landmarks
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#0B1F3A] inline-block border border-white shadow-sm" />
                    <span className="text-[#0B1F3A] font-semibold text-xs">Completed Projects</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#F5A623] inline-block border border-white shadow-sm" />
                    <span className="text-[#0B1F3A] font-semibold text-xs">In Progress</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
