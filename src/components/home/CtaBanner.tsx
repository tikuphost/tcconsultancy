import React from 'react';
import { useApp } from '../../context/AppContext';
import { HardHat, ArrowRight } from 'lucide-react';

export const CtaBanner: React.FC = () => {
  const { setIsQuoteModalOpen } = useApp();

  return (
    <section className="bg-[#F5A623] text-[#0B1F3A] py-8 sm:py-10 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left Block with circular icon matching reference */}
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-14 h-14 rounded-full bg-[#0B1F3A] text-[#F5A623] flex items-center justify-center shrink-0 shadow-md">
              <HardHat className="w-7 h-7" />
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight uppercase font-heading">
                READY TO BUILD SOMETHING GREAT?
              </h2>
              <p className="text-[#0B1F3A]/80 text-xs sm:text-sm font-medium mt-0.5">
                Let's create infrastructure that drives progress and improves lives.
              </p>
            </div>
          </div>

          {/* Right Dark Navy Button matching reference */}
          <button
            onClick={() => setIsQuoteModalOpen(true)}
            className="bg-[#0B1F3A] hover:bg-[#071528] text-white font-extrabold text-xs sm:text-sm uppercase px-7 py-3.5 rounded shadow-lg hover:shadow-xl transition-all transform active:scale-95 tracking-wider inline-flex items-center gap-2 shrink-0"
          >
            <span>START YOUR PROJECT</span>
            <ArrowRight className="w-4 h-4 text-[#F5A623]" />
          </button>
        </div>
      </div>
    </section>
  );
};
