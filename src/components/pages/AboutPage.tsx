import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  Award,
  Users,
  Target,
  Eye,
  CheckCircle2,
  Building,
  Briefcase,
  ArrowRight,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setPage, setIsQuoteModalOpen } = useApp();

  return (
    <div className="bg-[#F8FAFC]">
      {/* Page Header Banner */}
      <section className="bg-[#0B1F3A] text-white py-16 sm:py-20 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#F5A623_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="text-[#F5A623] text-xs font-extrabold tracking-widest uppercase font-mono block mb-2">
              ABOUT TC CONSULTANCY
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight uppercase leading-tight font-heading mb-4">
              ADDING VALUE THROUGH PROFESSIONAL INTEGRITY
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              TC Consultancy (Group of Companies) is a comprehensive engineering consulting firm
              fulfilling client needs in a timely and efficient manner across the GCC region.
            </p>
          </div>
        </div>
      </section>

      {/* Main Profile & Director Experience */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#E3E6EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <span className="text-[#F5A623] text-xs font-extrabold tracking-widest uppercase font-mono block mb-2">
                OUR HERITAGE & LEADERSHIP
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A] uppercase tracking-tight font-heading mb-6">
                30 YEARS COMBINED DIRECTOR EXPERIENCE
              </h2>

              <p className="text-[#5A6678] text-base leading-relaxed mb-5">
                Our Directors have a combined experience of 30 years, which has enriched their
                knowledge and expertise in the field of construction and infrastructure. Our objective
                is to earn and establish the trust and goodwill of every patron in order to embark on
                a long-lasting and mutually beneficial professional relationship with them.
              </p>

              <p className="text-[#5A6678] text-base leading-relaxed mb-6">
                We support our clients in making the right decisions on strategy, operation, risk,
                procurement, and value. Our multidisciplinary workforce includes Members of the Royal
                Institution of Chartered Surveyors (RICS), Certified Cost Engineers (AACEI), Architects,
                and highly skilled Engineers with work experience in the Middle East and internationally.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-lg bg-[#F5F6F8] border border-[#E3E6EB]">
                  <div className="text-2xl font-extrabold text-[#0B1F3A] font-mono mb-1">
                    RICS
                  </div>
                  <div className="text-xs font-bold text-[#0B1F3A] mb-1">
                    Chartered Surveyors
                  </div>
                  <div className="text-[11px] text-[#5A6678]">
                    Global standards in cost consultancy, valuations, and contract administration.
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-[#F5F6F8] border border-[#E3E6EB]">
                  <div className="text-2xl font-extrabold text-[#0B1F3A] font-mono mb-1">
                    AACEI
                  </div>
                  <div className="text-xs font-bold text-[#0B1F3A] mb-1">
                    Certified Cost Engineers
                  </div>
                  <div className="text-[11px] text-[#5A6678]">
                    Scientific total cost management, risk profiling, and project controls.
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80"
                  alt="TC Consultancy Construction Engineering Site"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/90 via-[#0B1F3A]/30 to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-[#F5A623] text-xs font-extrabold uppercase tracking-widest font-mono">
                    SHARJAH FZC HEADQUARTERS
                  </span>
                  <div className="text-lg font-bold font-heading">
                    Registered & Accredited in UAE & GCC
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 bg-[#F5F6F8] border-b border-[#E3E6EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission Card */}
            <div className="p-8 rounded-xl bg-white border border-[#E3E6EB] shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-lg bg-[#0B1F3A] text-[#F5A623] flex items-center justify-center mb-6">
                  <Target className="w-6 h-6" />
                </div>
                <span className="text-[#F5A623] text-xs font-extrabold tracking-widest uppercase font-mono block mb-1">
                  CORE PURPOSE
                </span>
                <h3 className="text-2xl font-extrabold text-[#0B1F3A] uppercase font-heading mb-4">
                  OUR MISSION
                </h3>
                <p className="text-[#5A6678] text-sm sm:text-base leading-relaxed">
                  TC Consultancy (Group of Companies) is a comprehensive engineering consulting firm
                  that wishes to fulfil the needs of each client in a timely and efficient manner.
                  The objective is to earn and establish the trust and goodwill of every patron in
                  order to embark on a long-lasting and mutually beneficial professional relationship
                  with them. We support our clients in making the right decisions on strategy,
                  operation, risk, procurement, and value.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-[#0B1F3A]">
                <CheckCircle2 className="w-4 h-4 text-[#F5A623]" />
                Client-Centered Decision Architecture
              </div>
            </div>

            {/* Vision Card */}
            <div className="p-8 rounded-xl bg-white border border-[#E3E6EB] shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-lg bg-[#F5A623] text-[#0B1F3A] flex items-center justify-center mb-6">
                  <Eye className="w-6 h-6" />
                </div>
                <span className="text-[#F5A623] text-xs font-extrabold tracking-widest uppercase font-mono block mb-1">
                  STRATEGIC HORIZON
                </span>
                <h3 className="text-2xl font-extrabold text-[#0B1F3A] uppercase font-heading mb-4">
                  OUR VISION
                </h3>
                <p className="text-[#5A6678] text-sm sm:text-base leading-relaxed">
                  To be one of the leading international providers of technical and support services
                  for the construction industry, generating enduring value for our clients and the
                  communities in which we operate.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-[#0B1F3A]">
                <CheckCircle2 className="w-4 h-4 text-[#F5A623]" />
                International Engineering Excellence
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ISO Quality Strip Callout */}
      <section className="py-12 bg-white border-b border-[#E3E6EB]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#0B1F3A] text-[#F5A623] mb-4">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B1F3A] uppercase tracking-tight mb-3">
            ISO 9001 QUALITY SYSTEM COMMITMENT
          </h3>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto mb-6">
            All our offices are ISO 9001 Quality Assurance accredited, demonstrating our commitment
            to quality. It is this commitment and our dedication to our clients' needs that form the
            cornerstone of our business.
          </p>
          <button
            onClick={() => setIsQuoteModalOpen(true)}
            className="inline-flex items-center gap-2 bg-[#F5A623] hover:bg-[#E8911A] text-[#0B1F3A] font-extrabold text-xs uppercase px-6 py-3 rounded shadow transition"
          >
            <span>DISCUSS YOUR PROJECT WITH OUR LEADERSHIP</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
