import React, { useState, useId } from 'react';
import { useApp } from '../../context/AppContext';
import {
  HelpCircle,
  ChevronDown,
  Search,
  FileCheck,
  Calculator,
  ShieldAlert,
  HardHat,
  MessageSquare,
  ArrowRight,
} from 'lucide-react';

interface FaqItem {
  id: string;
  category: 'contracts' | 'cost' | 'compliance' | 'supervision';
  categoryLabel: string;
  question: string;
  answer: string;
  points?: string[];
}

export const FaqSection: React.FC = () => {
  const { setIsQuoteModalOpen, setIsChatOpen } = useApp();
  const searchInputId = useId();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'faq-1': true, // Open the first item by default
  });

  const FAQ_ITEMS: FaqItem[] = [
    {
      id: 'faq-1',
      category: 'contracts',
      categoryLabel: 'Contracts & FIDIC',
      question: 'Which standard forms of building contracts does TC Consultancy administer?',
      answer:
        'TC Consultancy specializes in the administration of the complete FIDIC Suite of Contracts as well as local government standard conditions across the UAE, Saudi Arabia, and Qatar. Our chartered MRICS surveyors routinely act as The Engineer or Employer Representative.',
      points: [
        'FIDIC Red Book (Conditions of Contract for Construction)',
        'FIDIC Yellow Book (Plant & Design-Build Contracts)',
        'FIDIC White Book (Client / Consultant Model Services Agreement)',
        'UAE Ministry of Infrastructure & Sharjah Public Works bespoke contracts',
      ],
    },
    {
      id: 'faq-2',
      category: 'cost',
      categoryLabel: 'Cost & Estimating',
      question: 'How are professional fee proposals structured for engineering & QS services?',
      answer:
        'Fee arrangements are transparent and determined through our standardized engineering rate matrix. Proposals depend on built-up area (sq. ft.), complexity, and engagement duration.',
      points: [
        'Percentage of Estimated Construction Cost (standard for multi-year capital developments)',
        'Lump-Sum Fixed Deliverables (ideal for Concept BoQ, Tender Documentation, and Feasibility)',
        'Monthly Retainer / Interim Valuations (suited for on-site Resident Supervision and QA/QC inspection)',
        'Clients can calculate preliminary fee projections instantly using our online RFQ calculator',
      ],
    },
    {
      id: 'faq-3',
      category: 'compliance',
      categoryLabel: 'Authority Approvals',
      question: 'Is TC Consultancy accredited with UAE government authorities and Civil Defence?',
      answer:
        'Yes. TC Consultancy FZC maintains operational licenses and approvals from the Sharjah Airport International Free Zone (SAIF Zone), Sharjah Municipality, Dubai Development Authority (DDA), and UAE Civil Defence departments. All operating procedures are accredited under ISO 9001:2015 Quality Management standards.',
    },
    {
      id: 'faq-4',
      category: 'cost',
      categoryLabel: 'Cost & Estimating',
      question: 'What is the standard turnaround time for preliminary cost advice and BoQ preparation?',
      answer:
        'For high-level project feasibility and preliminary elemental cost models, our team delivers initial findings within 48 to 72 hours of receiving conceptual architectural plans. Comprehensive, pre-tender Bills of Quantities (BoQs) fully formatted to NRM / CESMM standards typically take 10 to 14 business days depending on design maturity.',
    },
    {
      id: 'faq-5',
      category: 'contracts',
      categoryLabel: 'Contracts & FIDIC',
      question: 'Can your team provide delay analysis and dispute resolution support?',
      answer:
        'Our commercial management division contains certified delay analysts and claims consultants. We provide objective forensic schedule analysis, disruption modeling (Time Impact Analysis, As-Built vs. As-Planned), quantum assessment, and representation during formal dispute board hearings or mediation proceedings.',
    },
    {
      id: 'faq-6',
      category: 'supervision',
      categoryLabel: 'Site & Supervision',
      question: 'How do clients monitor site inspections, material approvals, and milestone certifications?',
      answer:
        'Clients receive continuous visibility through a dedicated Project Director and monthly interim valuation reports. Every assignment includes digital submittal logs, milestone payment certificates, and immediate flag notifications for schedule or budgetary variances.',
      points: [
        'Weekly Site Progress Records with photographic quality audits',
        'Transparent interim payment certificates (IPC) certified by chartered QS',
        'Direct coordination with MEP, structural, and civil contractors on site',
      ],
    },
  ];

  const categories = [
    { id: 'all', label: 'All Inquiries', icon: HelpCircle },
    { id: 'contracts', label: 'Contracts & FIDIC', icon: FileCheck },
    { id: 'cost', label: 'Cost & Estimating', icon: Calculator },
    { id: 'compliance', label: 'Authority Approvals', icon: ShieldAlert },
    { id: 'supervision', label: 'Site & Supervision', icon: HardHat },
  ];

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredItems = FAQ_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.points && item.points.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="faq-section" className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B1F3A]/5 border border-[#0B1F3A]/15 text-[#0B1F3A] text-xs font-bold uppercase tracking-wider font-heading mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#F5A623]" />
            <span>CLIENT INQUIRIES & ADVISORY</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1F3A] tracking-tight uppercase font-heading">
            FREQUENTLY ASKED QUESTIONS
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
            Essential information regarding our FIDIC contract administration, statutory engineering approvals, fee structures, and milestone delivery frameworks across the GCC.
          </p>
        </div>

        {/* Controls: Category Filter Tabs & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  id={`faq-tab-${cat.id}`}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold uppercase font-heading tracking-wider transition-all whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[#0B1F3A] text-[#F5A623] shadow-sm'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#F5A623]' : 'text-slate-400'}`} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id={searchInputId}
              type="text"
              placeholder="Search inquiries (e.g., FIDIC, BoQ)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-white border border-slate-200 text-xs font-sans text-[#0B1F3A] placeholder:text-slate-400 focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] transition"
            />
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {filteredItems.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
              <HelpCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <div className="text-sm font-bold text-[#0B1F3A] font-heading uppercase">
                No matching inquiries found
              </div>
              <p className="text-xs text-slate-500 font-sans mt-1">
                Try searching for alternate terms or reach out to our engineering directors directly.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="mt-4 px-4 py-2 rounded bg-slate-100 hover:bg-slate-200 text-xs font-bold text-[#0B1F3A] uppercase font-heading tracking-wider"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredItems.map((item) => {
              const isOpen = !!openItems[item.id];

              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-xl border transition-all overflow-hidden ${
                    isOpen
                      ? 'border-[#0B1F3A]/30 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <button
                    id={`faq-toggle-${item.id}`}
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    aria-expanded={isOpen}
                    className="w-full px-5 sm:px-6 py-4 sm:py-5 flex items-start justify-between gap-4 text-left transition"
                  >
                    <div className="space-y-1">
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#F5A623] bg-[#0B1F3A]/5 px-2 py-0.5 rounded font-heading">
                        {item.categoryLabel}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-[#0B1F3A] font-heading leading-snug">
                        {item.question}
                      </h3>
                    </div>

                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-1 transition-transform duration-200 ${
                        isOpen
                          ? 'bg-[#0B1F3A] text-white rotate-180'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 font-sans leading-relaxed border-t border-slate-100">
                      <p>{item.answer}</p>

                      {item.points && item.points.length > 0 && (
                        <ul className="mt-3 space-y-1.5 pl-4 list-disc text-slate-700">
                          {item.points.map((pt, idx) => (
                            <li key={idx}>{pt}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Help Bar */}
        <div className="mt-10 p-6 rounded-xl bg-[#0B1F3A] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-base font-extrabold text-white uppercase font-heading">
              HAVE A SPECIFIC TENDER OR RFP REQUIREMENT?
            </h4>
            <p className="text-xs text-slate-300 font-sans mt-0.5">
              Our chartered engineers in Sharjah and Dubai are available for confidential consultations.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              id="faq-action-chat"
              onClick={() => setIsChatOpen(true)}
              className="px-4 py-2.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold uppercase tracking-wider font-heading flex items-center gap-1.5 transition"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#F5A623]" />
              <span>Live Support</span>
            </button>

            <button
              id="faq-action-rfq"
              onClick={() => setIsQuoteModalOpen(true)}
              className="px-4 py-2.5 rounded bg-[#F5A623] hover:bg-[#E8911A] text-[#0B1F3A] text-xs font-extrabold uppercase tracking-wider font-heading flex items-center gap-1.5 shadow transition"
            >
              <span>Instant RFQ</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
