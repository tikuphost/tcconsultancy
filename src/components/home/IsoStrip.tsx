import React from 'react';
import { ShieldCheck, Award, CheckCircle } from 'lucide-react';

export const IsoStrip: React.FC = () => {
  return (
    <div className="bg-[#0B1F3A] text-slate-100 py-6 border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#F5A623]/20 border border-[#F5A623] flex items-center justify-center text-[#F5A623] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-white font-extrabold text-sm tracking-wider uppercase font-mono mr-2">
                ISO 9001 QUALITY SYSTEM
              </span>
              <span className="text-xs text-slate-300 font-normal">
                All our offices are ISO 9001 Quality Assurance accredited, demonstrating our rigorous commitment to technical quality.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-[#F5A623] shrink-0">
            <span className="flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" />
              Accredited Entity
            </span>
            <span className="flex items-center gap-1">
              <Award className="w-3.5 h-3.5" />
              Annual Audit Certified
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
