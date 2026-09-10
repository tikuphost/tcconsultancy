import React from 'react';
import { useApp } from '../../context/AppContext';
import { Building2, ShieldCheck, Award, ExternalLink } from 'lucide-react';
import { PageView } from '../../types';

export const Footer: React.FC = () => {
  const { setPage, setIsAdminMode } = useApp();

  const handleNav = (p: PageView) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#071528] text-slate-300 border-t border-slate-800 text-xs">
      {/* 6-Column Grid matching reference image footer layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6">
          {/* Brand Column (3 cols on lg) */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded bg-[#F5A623] flex items-center justify-center text-[#0B1F3A] font-extrabold">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-white font-extrabold tracking-wider text-base leading-tight font-heading">
                  TC CONSULTANCY
                </div>
                <div className="text-[#F5A623] text-[9px] font-bold tracking-widest uppercase">
                  GROUP OF COMPANIES
                </div>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed mb-6">
              Building infrastructure that connects communities and creates a better future for
              generations to come across the Middle East and GCC region.
            </p>

            {/* Social Icons matching reference */}
            <div className="flex items-center gap-3">
              {['LinkedIn', 'Twitter', 'Facebook', 'Instagram'].map((network) => (
                <div
                  key={network}
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-[#F5A623] hover:text-[#0B1F3A] text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
                  title={network}
                >
                  <span className="text-[10px] font-bold">{network.slice(0, 2).toUpperCase()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Col 2: Company */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-4">
              COMPANY
            </h4>
            <ul className="space-y-2.5 text-slate-400">
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-white transition">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-white transition">
                  Our Leadership
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('careers')} className="hover:text-white transition">
                  Careers
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('blog')} className="hover:text-white transition">
                  News & Bulletins
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-white transition">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-4">
              SERVICES
            </h4>
            <ul className="space-y-2.5 text-slate-400">
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-white transition">
                  Design Consultancy
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-white transition">
                  Project Management
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-white transition">
                  Commercial Management
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-white transition">
                  Structural & MEP
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-white transition">
                  Quantity Surveying
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-white transition">
                  Procurement Strategy
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Industries */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-4">
              INDUSTRIES
            </h4>
            <ul className="space-y-2.5 text-slate-400">
              <li>
                <button onClick={() => handleNav('clients')} className="hover:text-white transition">
                  Government Authorities
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('clients')} className="hover:text-white transition">
                  Hospitality & Resorts
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('clients')} className="hover:text-white transition">
                  Education Campuses
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('clients')} className="hover:text-white transition">
                  Industrial & Warehouses
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('clients')} className="hover:text-white transition">
                  Energy & Utilities
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Resources */}
          <div className="lg:col-span-1">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-4">
              RESOURCES
            </h4>
            <ul className="space-y-2.5 text-slate-400">
              <li>
                <button onClick={() => handleNav('projects')} className="hover:text-white transition">
                  Project Map
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('projects')} className="hover:text-white transition">
                  Case Studies
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-white transition">
                  Safety & QA
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsAdminMode(true)}
                  className="text-amber-400 hover:text-amber-300 transition font-bold"
                >
                  Admin Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Col 6: Accreditations matching reference */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-4">
              ACCREDITATIONS
            </h4>
            <div className="space-y-3">
              <div className="p-2.5 rounded bg-slate-800/80 border border-slate-700">
                <div className="text-white font-bold text-[11px] tracking-wider font-mono">
                  RICS REGULATED
                </div>
                <div className="text-[10px] text-slate-400">
                  Royal Institution of Chartered Surveyors
                </div>
              </div>

              <div className="p-2.5 rounded bg-slate-800/80 border border-slate-700">
                <div className="text-white font-bold text-[11px] tracking-wider font-mono">
                  AACEI CERTIFIED
                </div>
                <div className="text-[10px] text-slate-400">
                  Association for the Advancement of Cost Engineering
                </div>
              </div>

              <div className="p-2.5 rounded bg-slate-800/80 border border-slate-700">
                <div className="text-[#F5A623] font-bold text-[11px] tracking-wider font-mono">
                  ISO 9001:2015
                </div>
                <div className="text-[10px] text-slate-400">
                  Quality Assurance Management Certified
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar matching reference */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © 2026 TC Consultancy FZC. All Rights Reserved. Sharjah, United Arab Emirates.
          </div>

          <div className="flex items-center gap-6">
            <span className="text-slate-500">Hostinger Cloud Startup Deployable</span>
            <button onClick={() => handleNav('contact')} className="hover:text-white transition">
              Privacy Policy
            </button>
            <button onClick={() => handleNav('contact')} className="hover:text-white transition">
              Terms of Use
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
