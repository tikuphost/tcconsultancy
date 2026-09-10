import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  Compass,
  Calculator,
  Zap,
  Ruler,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';

export const ExpertiseStrip: React.FC = () => {
  const { setPage, setSelectedServiceSlug } = useApp();

  const services = [
    {
      id: 'design',
      title: 'DESIGN CONSULTANCY',
      desc: 'Sustainable, profitable and economical built environments from architectural brief to statutory permit.',
      icon: Building2,
      slug: 'design-consultancy',
    },
    {
      id: 'project-mgmt',
      title: 'PROJECT MANAGEMENT',
      desc: 'End-to-end delivery from site survey to handover, ensuring coordination and quality control.',
      icon: Compass,
      slug: 'project-management',
    },
    {
      id: 'commercial',
      title: 'COMMERCIAL MANAGEMENT',
      desc: 'Systematic cost control, preliminary estimates, value engineering and variation pricing.',
      icon: Calculator,
      slug: 'commercial-management',
    },
    {
      id: 'structural-mep',
      title: 'STRUCTURAL & MEP',
      desc: 'Detailed engineering design, life-safety, power distribution and statutory municipal approvals.',
      icon: Zap,
      slug: 'design-consultancy',
    },
    {
      id: 'qs',
      title: 'QUANTITY SURVEYING',
      desc: 'Accurate budgets, POMI/CESMM BOQs, interim valuation certificates and final accounts.',
      icon: Ruler,
      slug: 'commercial-management',
    },
    {
      id: 'sustainability',
      title: 'SUSTAINABILITY & QA',
      desc: 'ISO 9001 certified quality assurance systems forming the cornerstone of our practice.',
      icon: ShieldCheck,
      slug: 'procurement-strategy',
    },
  ];

  const handleCardClick = (slug: string) => {
    setSelectedServiceSlug(slug);
    setPage('services');
  };

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-[#E3E6EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Section Label & Headline */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-[#F5A623] text-xs font-extrabold tracking-widest uppercase font-mono block mb-2">
            WHAT WE DO
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1F3A] tracking-tight uppercase font-heading">
            EXPERTISE THAT BUILDS TOMORROW
          </h2>
          <div className="w-12 h-1 bg-[#F5A623] mx-auto mt-4 rounded-full" />
        </div>

        {/* Row of 6 Icon Columns (Responsive: 1 col on mobile, 2 on sm, 3 on md, 6 on lg) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-4">
          {services.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => handleCardClick(item.slug)}
                className="group flex flex-col items-center text-center p-4 rounded-lg hover:bg-[#F5F6F8] transition-all duration-200 cursor-pointer border border-transparent hover:border-slate-200"
              >
                {/* Thin Outline Icon matching reference */}
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 text-[#0B1F3A] group-hover:text-[#F5A623] transition-colors">
                  <Icon className="w-8 h-8 stroke-[1.5]" />
                </div>

                {/* Column Title */}
                <h3 className="text-xs sm:text-[13px] font-extrabold text-[#0B1F3A] uppercase tracking-wide mb-2 min-h-[36px] flex items-center justify-center">
                  {item.title}
                </h3>

                {/* Micro Description */}
                <p className="text-xs text-[#5A6678] leading-relaxed mb-3">
                  {item.desc}
                </p>

                {/* Subtle affordance */}
                <span className="mt-auto text-[11px] font-bold text-[#F5A623] opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-0.5">
                  Explore <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
