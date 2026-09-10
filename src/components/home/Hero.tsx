import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight, Building2, CheckCircle2, Shield } from 'lucide-react';

export const Hero: React.FC = () => {
  const { setPage, setIsQuoteModalOpen } = useApp();

  return (
    <section className="relative w-full min-h-[560px] lg:min-h-[640px] flex items-center bg-[#071528] overflow-hidden">
      {/* Photographic Background: Engineering Bridge at Dusk / Twilight with dark blue overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=2000&q=85')`,
        }}
      >
        {/* Deep Navy Overlay Gradient matching reference */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#071528]/95 via-[#0B1F3A]/85 to-[#071528]/70" />
        <div className="absolute inset-0 bg-[#071528]/40 mix-blend-multiply" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
        <div className="max-w-2xl lg:max-w-3xl">
          {/* Eyebrow Label */}
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="text-[#F5A623] text-xs sm:text-sm font-extrabold tracking-widest uppercase font-mono">
              ENGINEERING EXCELLENCE SINCE 2017
            </span>
          </div>

          {/* Massive Bold Headline (2 lines) */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6 uppercase font-heading">
            ADDING VALUE THROUGH{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300">
              PROFESSIONAL ENGINEERING
            </span>
          </h1>

          {/* Supporting Paragraph */}
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8 max-w-xl font-normal">
            A comprehensive engineering consulting firm delivering design, project management, and
            commercial management services across the Middle East. We support clients in making the
            right decisions on strategy, operations, risk, and value.
          </p>

          {/* Two Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setPage('services')}
              className="inline-flex items-center justify-center gap-2 bg-[#F5A623] hover:bg-[#E8911A] text-[#0B1F3A] font-extrabold text-xs sm:text-sm uppercase px-6 py-3.5 rounded shadow-lg hover:shadow-amber-500/25 transition-all transform active:scale-95 tracking-wider"
            >
              <span>OUR SERVICES</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setPage('projects')}
              className="inline-flex items-center justify-center gap-2 bg-transparent hover:bg-white/10 text-white font-bold text-xs sm:text-sm uppercase px-6 py-3.5 rounded border border-white/80 transition-all tracking-wider"
            >
              VIEW PROJECTS
            </button>
          </div>

          {/* Micro trust credentials */}
          <div className="mt-10 pt-6 border-t border-slate-700/50 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#F5A623]" />
              <span>RICS & AACEI Certified</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#F5A623]" />
              <span>ISO 9001 Quality Assurance</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#F5A623]" />
              <span>30+ Years Combined Director Leadership</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
