import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Quotation } from '../../types';
import {
  FileText,
  Printer,
  X,
  CheckCircle,
  Building2,
  ShieldCheck,
  Award,
  Download,
} from 'lucide-react';

export const AdminQuotationsSection: React.FC = () => {
  const { quotations, updateQuotationStatus, showToast } = useApp();
  const [selectedQuoteForPI, setSelectedQuoteForPI] = useState<Quotation | null>(null);

  const statuses: Quotation['status'][] = [
    'Pending',
    'Quoted',
    'Negotiating',
    'Confirmed',
    'Shipped',
    'Declined',
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-extrabold text-[#0B1F3A] uppercase font-heading flex items-center gap-2">
          <FileText className="w-5 h-5 text-[#F5A623]" />
          <span>RFQ PIPELINE & PROFORMA INVOICES</span>
        </h1>
        <p className="text-xs text-[#5A6678]">
          Review fee proposals, advance tender status workflows, and generate official FIDIC Proforma Invoices with corporate seal.
        </p>
      </div>

      {/* RFQ Pipeline Table */}
      <div className="bg-white rounded-xl border border-[#E3E6EB] overflow-hidden shadow-xs">
        <div className="p-4 border-b border-[#E3E6EB] flex items-center justify-between">
          <h2 className="text-xs font-extrabold text-[#0B1F3A] uppercase tracking-wider">
            ALL TENDER PROPOSALS ({quotations.length})
          </h2>
          <span className="text-xs text-slate-400 font-mono">Real-time valuation sync</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200">
                <th className="py-3 px-4">RFQ Number</th>
                <th className="py-3 px-4">Client Representative</th>
                <th className="py-3 px-4">Project & Location</th>
                <th className="py-3 px-4 text-right">Value (AED)</th>
                <th className="py-3 px-4 text-center">Status Workflow</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {quotations.map((rfq) => (
                <tr key={rfq.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3 px-4 font-mono font-bold text-[#0B1F3A] whitespace-nowrap">
                    {rfq.rfqNumber}
                    <div className="text-[10px] text-slate-400 font-normal">
                      Issued: {rfq.dateIssued}
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-800">{rfq.customerName}</div>
                    <div className="text-[11px] text-slate-500">{rfq.companyName}</div>
                    <div className="text-[10px] text-slate-400">{rfq.email}</div>
                  </td>

                  <td className="py-3 px-4 max-w-xs">
                    <div className="font-bold text-[#0B1F3A] truncate">{rfq.projectTitle}</div>
                    <div className="text-[11px] text-slate-500">{rfq.projectLocation}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{rfq.sector}</div>
                  </td>

                  <td className="py-3 px-4 text-right font-mono font-bold text-[#0B1F3A] whitespace-nowrap">
                    AED {rfq.totalAED.toLocaleString()}
                    <div className="text-[10px] text-emerald-600 font-normal">
                      Incl. 5% UAE VAT
                    </div>
                  </td>

                  <td className="py-3 px-4 text-center">
                    <select
                      value={rfq.status}
                      onChange={(e) => updateQuotationStatus(rfq.id, e.target.value as any)}
                      className={`px-2.5 py-1 rounded text-xs font-bold uppercase transition focus:outline-none ${
                        rfq.status === 'Confirmed'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : rfq.status === 'Pending'
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-slate-100 text-slate-700 border border-slate-300'
                      }`}
                    >
                      {statuses.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setSelectedQuoteForPI(rfq)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#0B1F3A] hover:bg-[#071528] text-white text-[11px] font-bold uppercase transition"
                    >
                      <Printer className="w-3.5 h-3.5 text-[#F5A623]" />
                      <span>View PI</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PRINTABLE PROFORMA INVOICE (PI) MODAL */}
      {selectedQuoteForPI && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto border border-slate-300 print:max-w-none print:w-full print:border-none print:rounded-none">
            {/* Top Toolbar (Hidden on Print) */}
            <div className="p-4 bg-[#0B1F3A] text-white flex items-center justify-between print:hidden shrink-0">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#F5A623]" />
                <span className="font-extrabold text-xs uppercase tracking-wider">
                  PROFORMA INVOICE: {selectedQuoteForPI.rfqNumber}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="px-3 py-1.5 rounded bg-[#F5A623] hover:bg-[#E8911A] text-[#0B1F3A] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / Save PDF</span>
                </button>
                <button
                  onClick={() => setSelectedQuoteForPI(null)}
                  className="p-1.5 text-slate-400 hover:text-white rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Printable Document Body */}
            <div className="p-8 sm:p-12 overflow-y-auto font-sans text-slate-800 text-xs leading-relaxed print:p-0">
              {/* Header Letterhead */}
              <div className="flex items-start justify-between border-b-2 border-[#0B1F3A] pb-6 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-8 h-8 rounded bg-[#F5A623] text-[#0B1F3A] flex items-center justify-center font-bold">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-base font-extrabold text-[#0B1F3A] font-heading tracking-wider">
                        TC CONSULTANCY FZC
                      </div>
                      <div className="text-[10px] text-[#F5A623] font-bold tracking-widest uppercase">
                        GROUP OF COMPANIES
                      </div>
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-500 space-y-0.5 mt-2">
                    <div>P.O. Box 7970, SAIF Zone, Sharjah, UAE</div>
                    <div>Tel: +971 6 557 3924 | Fax: +971 6 557 3925</div>
                    <div>TRN (Tax Registration): 100293848100003</div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xl font-extrabold text-[#0B1F3A] uppercase font-heading block">
                    PROFORMA INVOICE
                  </span>
                  <div className="font-mono text-sm font-bold text-[#F5A623] mt-1">
                    {selectedQuoteForPI.rfqNumber}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Date: <strong>{selectedQuoteForPI.dateIssued}</strong>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Valid Until: <strong>{selectedQuoteForPI.validUntil}</strong>
                  </div>
                </div>
              </div>

              {/* Billed To / Project Info */}
              <div className="grid grid-cols-2 gap-8 p-4 rounded-lg bg-slate-50 border border-slate-200 mb-6">
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                    CLIENT / BILLED TO:
                  </span>
                  <div className="font-bold text-sm text-[#0B1F3A]">
                    {selectedQuoteForPI.customerName}
                  </div>
                  <div className="text-slate-600">{selectedQuoteForPI.companyName}</div>
                  <div className="text-slate-500 font-mono">{selectedQuoteForPI.email}</div>
                  <div className="text-slate-500">{selectedQuoteForPI.phone}</div>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                    PROJECT PARAMETERS:
                  </span>
                  <div className="font-bold text-sm text-[#0B1F3A]">
                    {selectedQuoteForPI.projectTitle}
                  </div>
                  <div className="text-slate-600">Location: {selectedQuoteForPI.projectLocation}</div>
                  <div className="text-slate-600">Sector: {selectedQuoteForPI.sector}</div>
                  <div className="text-slate-500">Standard: ISO 9001 / FIDIC White Book</div>
                </div>
              </div>

              {/* Items Breakdown Table */}
              <table className="w-full text-left border-collapse mb-6">
                <thead>
                  <tr className="bg-[#0B1F3A] text-white text-[10px] uppercase font-bold">
                    <th className="py-2.5 px-3">Item</th>
                    <th className="py-2.5 px-3">Scope Description</th>
                    <th className="py-2.5 px-3 text-center">Unit / Qty</th>
                    <th className="py-2.5 px-3 text-right">Rate (AED)</th>
                    <th className="py-2.5 px-3 text-right">Amount (AED)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  {selectedQuoteForPI.items.map((it, idx) => (
                    <tr key={it.id}>
                      <td className="py-3 px-3 font-mono font-bold text-[#0B1F3A]">{idx + 1}</td>
                      <td className="py-3 px-3">
                        <strong className="text-[#0B1F3A] block">{it.service}</strong>
                        <span className="text-[11px] text-slate-500">{it.description}</span>
                      </td>
                      <td className="py-3 px-3 text-center font-mono">
                        {it.quantity} {it.unit}
                      </td>
                      <td className="py-3 px-3 text-right font-mono">
                        {it.unitRateAED.toLocaleString()}
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-slate-900">
                        {it.amountAED.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="border-t-2 border-slate-300 font-bold">
                  <tr>
                    <td colSpan={4} className="py-2 px-3 text-right text-slate-600">
                      Subtotal:
                    </td>
                    <td className="py-2 px-3 text-right font-mono">
                      AED {selectedQuoteForPI.subtotalAED.toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4} className="py-2 px-3 text-right text-slate-600">
                      Partner Volume Discount ({selectedQuoteForPI.discountPercent}%):
                    </td>
                    <td className="py-2 px-3 text-right font-mono text-emerald-600">
                      -AED{' '}
                      {Math.round(
                        (selectedQuoteForPI.subtotalAED * selectedQuoteForPI.discountPercent) / 100
                      ).toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4} className="py-2 px-3 text-right text-slate-600">
                      UAE VAT ({selectedQuoteForPI.vatPercent}%):
                    </td>
                    <td className="py-2 px-3 text-right font-mono">
                      +AED{' '}
                      {Math.round(
                        (selectedQuoteForPI.totalAED * selectedQuoteForPI.vatPercent) / 105
                      ).toLocaleString()}
                    </td>
                  </tr>
                  <tr className="bg-[#0B1F3A] text-white text-sm">
                    <td colSpan={4} className="py-3 px-3 text-right uppercase font-extrabold">
                      Total Payable Net:
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-extrabold text-[#F5A623]">
                      AED {selectedQuoteForPI.totalAED.toLocaleString()}
                    </td>
                  </tr>
                </tfoot>
              </table>

              {/* Wire Banking & Payment Terms */}
              <div className="grid grid-cols-2 gap-6 p-4 bg-slate-50 rounded-lg border border-slate-200 mb-8 text-[11px]">
                <div>
                  <span className="font-bold text-[#0B1F3A] uppercase block mb-1">
                    Wire Remittance Instructions
                  </span>
                  <div className="text-slate-600">Bank: Sharjah Islamic Bank (SAIF Zone Branch)</div>
                  <div className="text-slate-600">Account Name: TC Consultancy FZC</div>
                  <div className="text-slate-600 font-mono">IBAN: AE92 0330 0000 0001 2345 6789</div>
                  <div className="text-slate-600 font-mono">Swift Code: SHJBAEAAXXX</div>
                </div>

                <div>
                  <span className="font-bold text-[#0B1F3A] uppercase block mb-1">
                    Standard Milestone Terms
                  </span>
                  <div className="text-slate-600">• 30% Advance on appointment mobilization</div>
                  <div className="text-slate-600">• 40% On completion of detail design & submission</div>
                  <div className="text-slate-600">• 30% Monthly interim valuations on site handover</div>
                </div>
              </div>

              {/* Official Signatures & Seal */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-200">
                <div className="text-center">
                  <div className="font-script text-lg text-slate-800 italic mb-1">
                    Eng. M. Khateeb (MRICS)
                  </div>
                  <div className="w-40 border-t border-slate-400 pt-1 text-[10px] text-slate-500 uppercase font-bold">
                    Chartered QS Director
                  </div>
                </div>

                {/* Simulated Corporate Stamp */}
                <div className="w-24 h-24 rounded-full border-2 border-dashed border-red-600 text-red-600 flex flex-col items-center justify-center rotate-[-12deg] p-1 text-center font-mono opacity-80">
                  <span className="text-[8px] font-bold leading-tight">TC CONSULTANCY</span>
                  <span className="text-[7px]">SHARJAH FZC</span>
                  <span className="text-[6px]">APPROVED PI</span>
                  <span className="text-[7px] font-bold">2026</span>
                </div>

                <div className="text-center">
                  <div className="font-script text-lg text-slate-800 italic mb-1">
                    TC Management Board
                  </div>
                  <div className="w-40 border-t border-slate-400 pt-1 text-[10px] text-slate-500 uppercase font-bold">
                    Authorized Signatory
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
