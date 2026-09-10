import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Quotation, RFQLineItem } from '../../types';
import { X, Calculator, CheckCircle2, Building, ShieldCheck, ArrowRight } from 'lucide-react';

export const QuoteModal: React.FC = () => {
  const { isQuoteModalOpen, setIsQuoteModalOpen, addQuotation, showToast } = useApp();

  const [customerName, setCustomerName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [projectTitle, setProjectTitle] = useState('');
  const [projectLocation, setProjectLocation] = useState('Dubai, UAE');
  const [sector, setSector] = useState('Real Estate & Development');
  const [servicePackage, setServicePackage] = useState<'turnkey' | 'design' | 'qs' | 'pm'>('turnkey');
  const [builtUpAreaSqFt, setBuiltUpAreaSqFt] = useState(45000);
  const [durationMonths, setDurationMonths] = useState(14);
  const [notes, setNotes] = useState('');

  if (!isQuoteModalOpen) return null;

  // Real-time calculation engine
  let items: RFQLineItem[] = [];

  if (servicePackage === 'turnkey') {
    items = [
      {
        id: 'i-1',
        service: 'Design Consultancy',
        description: 'Complete Architectural, Structural & MEP Engineering (Pre-Design to Building Permit Approval)',
        unit: 'Lump Sum',
        quantity: 1,
        unitRateAED: Math.max(120000, Math.round(builtUpAreaSqFt * 3.8)),
        amountAED: Math.max(120000, Math.round(builtUpAreaSqFt * 3.8)),
      },
      {
        id: 'i-2',
        service: 'Commercial Management',
        description: 'POMI Standard Bill of Quantities (BOQ), FIDIC Tender Packaging & Prequalification Report',
        unit: 'Package',
        quantity: 1,
        unitRateAED: Math.max(65000, Math.round(builtUpAreaSqFt * 1.5)),
        amountAED: Math.max(65000, Math.round(builtUpAreaSqFt * 1.5)),
      },
      {
        id: 'i-3',
        service: 'Project Management',
        description: 'On-site Resident Engineering Supervision, QA/QC & Payment Certification',
        unit: 'Month',
        quantity: durationMonths,
        unitRateAED: 24000,
        amountAED: durationMonths * 24000,
      },
    ];
  } else if (servicePackage === 'design') {
    items = [
      {
        id: 'i-1',
        service: 'Design Consultancy',
        description: 'Architectural, Structural & MEP Design with statutory approvals',
        unit: 'Lump Sum',
        quantity: 1,
        unitRateAED: Math.max(140000, Math.round(builtUpAreaSqFt * 4.2)),
        amountAED: Math.max(140000, Math.round(builtUpAreaSqFt * 4.2)),
      },
    ];
  } else if (servicePackage === 'qs') {
    items = [
      {
        id: 'i-1',
        service: 'Quantity Surveying',
        description: 'Detailed BOQ, Tender Analysis & 12 Monthly Valuation Certificates',
        unit: 'Package',
        quantity: 1,
        unitRateAED: Math.max(85000, Math.round(builtUpAreaSqFt * 2.2)),
        amountAED: Math.max(85000, Math.round(builtUpAreaSqFt * 2.2)),
      },
    ];
  } else {
    items = [
      {
        id: 'i-1',
        service: 'Project Management',
        description: 'Resident Site Engineer Supervision & Quality Assurance System',
        unit: 'Month',
        quantity: durationMonths,
        unitRateAED: 26000,
        amountAED: durationMonths * 26000,
      },
    ];
  }

  const subtotalAED = items.reduce((acc, it) => acc + it.amountAED, 0);
  const discountPercent = 5;
  const discounted = subtotalAED * (1 - discountPercent / 100);
  const vatPercent = 5;
  const totalAED = Math.round(discounted * (1 + vatPercent / 100));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !email || !projectTitle) {
      showToast('Please complete required fields (Name, Email, Project Title)', 'warning');
      return;
    }

    const newQuotation: Quotation = {
      id: 'rfq-' + Date.now(),
      rfqNumber: `TCC-RFQ-2026-${Math.floor(100 + Math.random() * 900)}`,
      customerName,
      companyName: companyName || 'Independent Client',
      email,
      phone: phone || '+971 50 000 0000',
      projectTitle,
      projectLocation,
      sector,
      status: 'Pending',
      dateIssued: new Date().toISOString().split('T')[0],
      validUntil: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      items,
      subtotalAED,
      discountPercent,
      vatPercent,
      totalAED,
      notes: notes || 'Prepared under ISO 9001:2015 engineering advisory standards.',
    };

    addQuotation(newQuotation);
    setIsQuoteModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="bg-[#0B1F3A] text-white p-5 sm:p-6 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#F5A623] flex items-center justify-center text-[#0B1F3A] font-bold">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold uppercase tracking-wide font-heading">
                REQUEST A PROPOSAL & QUOTATION
              </h2>
              <p className="text-xs text-slate-300">
                Live Fee Calculation Engine · RICS Standard Benchmarks
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsQuoteModalOpen(false)}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Section 1: Client & Contact */}
          <div>
            <h3 className="text-xs font-extrabold text-[#0B1F3A] uppercase tracking-wider mb-3">
              1. CONTACT & DEVELOPER PROFILE
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Representative Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Eng. Tariq Al-Nuaimi"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded border border-slate-200 text-slate-800 focus:outline-none focus:border-[#F5A623]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Organization / Client</label>
                <input
                  type="text"
                  placeholder="Company Name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded border border-slate-200 text-slate-800 focus:outline-none focus:border-[#F5A623]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Official Email *</label>
                <input
                  type="email"
                  required
                  placeholder="tariq@client.ae"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded border border-slate-200 text-slate-800 focus:outline-none focus:border-[#F5A623]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Mobile / Telephone</label>
                <input
                  type="tel"
                  placeholder="+971 50 123 4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded border border-slate-200 text-slate-800 focus:outline-none focus:border-[#F5A623]"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Project Specifications */}
          <div className="pt-4 border-t border-slate-100">
            <h3 className="text-xs font-extrabold text-[#0B1F3A] uppercase tracking-wider mb-3">
              2. PROJECT SCOPE & PARAMETERS
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mb-4">
              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-700 mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Al Khan Mixed-Use Residential Complex"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded border border-slate-200 text-slate-800 focus:outline-none focus:border-[#F5A623]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Location / Municipality</label>
                <select
                  value={projectLocation}
                  onChange={(e) => setProjectLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded border border-slate-200 text-slate-800 bg-white focus:outline-none focus:border-[#F5A623]"
                >
                  <option value="Dubai, UAE">Dubai, UAE</option>
                  <option value="Sharjah, UAE">Sharjah, UAE</option>
                  <option value="Abu Dhabi, UAE">Abu Dhabi, UAE</option>
                  <option value="Doha, Qatar">Doha, Qatar</option>
                  <option value="Kuwait City, Kuwait">Kuwait City, Kuwait</option>
                  <option value="Manama, Bahrain">Manama, Bahrain</option>
                  <option value="Riyadh, Saudi Arabia">Riyadh, Saudi Arabia</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Sector Classification</label>
                <select
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded border border-slate-200 text-slate-800 bg-white focus:outline-none focus:border-[#F5A623]"
                >
                  <option value="Real Estate & Development">Real Estate & High-Rise</option>
                  <option value="Government & Authorities">Government & Public Infrastructure</option>
                  <option value="Hospitality & Leisure">Hospitality & Resorts</option>
                  <option value="Education & Healthcare">Education & Healthcare</option>
                  <option value="Industrial & Energy">Industrial Warehouses & Oil/Gas</option>
                </select>
              </div>
            </div>

            {/* Service Package Selector */}
            <div className="mb-4">
              <label className="block font-bold text-xs text-slate-700 mb-2 uppercase">
                Consulting Package
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'turnkey', label: 'Full Turnkey', sub: 'Design + QS + PM' },
                  { id: 'design', label: 'Design Only', sub: 'Arch & MEP Permits' },
                  { id: 'qs', label: 'Commercial / QS', sub: 'BOQ & Cost Audit' },
                  { id: 'pm', label: 'Project Mgmt', sub: 'Site Supervision' },
                ].map((pkg) => (
                  <button
                    type="button"
                    key={pkg.id}
                    onClick={() => setServicePackage(pkg.id as any)}
                    className={`p-3 rounded-lg border text-left transition ${
                      servicePackage === pkg.id
                        ? 'border-[#0B1F3A] bg-[#0B1F3A] text-white shadow-xs'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="font-bold text-xs">{pkg.label}</div>
                    <div className={`text-[10px] ${servicePackage === pkg.id ? 'text-[#F5A623]' : 'text-slate-400'}`}>
                      {pkg.sub}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Slider inputs for Area and Duration */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <div>
                <div className="flex justify-between font-bold text-slate-700 mb-1">
                  <span>Gross Built-up Area:</span>
                  <span className="font-mono text-[#0B1F3A]">{builtUpAreaSqFt.toLocaleString()} sq ft</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="300000"
                  step="5000"
                  value={builtUpAreaSqFt}
                  onChange={(e) => setBuiltUpAreaSqFt(Number(e.target.value))}
                  className="w-full accent-[#F5A623]"
                />
              </div>

              <div>
                <div className="flex justify-between font-bold text-slate-700 mb-1">
                  <span>Construction Duration:</span>
                  <span className="font-mono text-[#0B1F3A]">{durationMonths} Months</span>
                </div>
                <input
                  type="range"
                  min="6"
                  max="36"
                  step="1"
                  value={durationMonths}
                  onChange={(e) => setDurationMonths(Number(e.target.value))}
                  className="w-full accent-[#F5A623]"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Live Quotation Summary */}
          <div className="pt-4 border-t border-slate-100">
            <h3 className="text-xs font-extrabold text-[#0B1F3A] uppercase tracking-wider mb-3">
              3. CALCULATED FEE ESTIMATE (AED)
            </h3>

            <div className="rounded-xl border border-slate-200 overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-100 font-bold text-slate-700">
                  <tr>
                    <th className="p-2.5">Scope Description</th>
                    <th className="p-2.5 text-center">Unit / Qty</th>
                    <th className="p-2.5 text-right">Amount (AED)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {items.map((it) => (
                    <tr key={it.id}>
                      <td className="p-2.5">
                        <strong className="text-[#0B1F3A] block">{it.service}</strong>
                        <span className="text-[11px] text-slate-500">{it.description}</span>
                      </td>
                      <td className="p-2.5 text-center font-mono">
                        {it.quantity} {it.unit}
                      </td>
                      <td className="p-2.5 text-right font-mono font-bold">
                        {it.amountAED.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-slate-50 font-bold border-t border-slate-200">
                  <tr>
                    <td colSpan={2} className="p-2 text-right text-slate-600">
                      Subtotal:
                    </td>
                    <td className="p-2 text-right font-mono">AED {subtotalAED.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="p-2 text-right text-slate-600">
                      Partner Volume Discount ({discountPercent}%):
                    </td>
                    <td className="p-2 text-right font-mono text-emerald-600">
                      -AED {Math.round((subtotalAED * discountPercent) / 100).toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="p-2 text-right text-slate-600">
                      UAE VAT ({vatPercent}%):
                    </td>
                    <td className="p-2 text-right font-mono">
                      +AED {Math.round((discounted * vatPercent) / 100).toLocaleString()}
                    </td>
                  </tr>
                  <tr className="bg-[#0B1F3A] text-white text-sm">
                    <td colSpan={2} className="p-3 text-right font-extrabold uppercase">
                      Total Indicative Proposal:
                    </td>
                    <td className="p-3 text-right font-mono font-extrabold text-[#F5A623]">
                      AED {totalAED.toLocaleString()}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Submit Action */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsQuoteModalOpen(false)}
              className="px-5 py-2.5 rounded border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-[#F5A623] hover:bg-[#E8911A] text-[#0B1F3A] font-extrabold text-xs uppercase px-7 py-3 rounded shadow tracking-wider inline-flex items-center gap-2"
            >
              <span>GENERATE FORMAL PROPOSAL</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
