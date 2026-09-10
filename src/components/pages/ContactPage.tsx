import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, Building, ShieldCheck } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast } = useApp();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    phone: '',
    subject: 'General Engineering Inquiry',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.message) {
      showToast('Please fill out all required fields', 'warning');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      showToast('Your message has been transmitted to TC Consultancy FZC', 'success');
      setFormData({
        fullName: '',
        email: '',
        company: '',
        phone: '',
        subject: 'General Engineering Inquiry',
        message: '',
      });
    }, 900);
  };

  return (
    <div className="bg-[#F8FAFC]">
      {/* Header Banner */}
      <section className="bg-[#0B1F3A] text-white py-16 sm:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[#F5A623] text-xs font-extrabold tracking-widest uppercase font-mono block mb-2">
            REGIONAL DIRECTORY
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight uppercase leading-tight font-heading mb-4">
            CONTACT TC CONSULTANCY
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed">
            Reach our central headquarters in Sharjah Free Zone or connect with our project teams
            operating across Dubai, Abu Dhabi, Doha, and Kuwait City.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Contact Information & Office Details (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-2xl border border-[#E3E6EB] p-6 sm:p-8 shadow-sm">
                <span className="text-[#F5A623] text-xs font-extrabold tracking-widest uppercase font-mono block mb-1">
                  HEADQUARTERS
                </span>
                <h2 className="text-xl font-extrabold text-[#0B1F3A] uppercase font-heading mb-6">
                  TC CONSULTANCY FZC
                </h2>

                <div className="space-y-4 text-xs">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#0B1F3A]/5 text-[#0B1F3A] flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-500 uppercase text-[10px]">Office Address</div>
                      <div className="font-bold text-[#0B1F3A] text-sm mt-0.5">
                        P. O. Box 7970, SAIF Zone, Sharjah
                      </div>
                      <div className="text-slate-500 text-xs">United Arab Emirates</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#0B1F3A]/5 text-[#0B1F3A] flex items-center justify-center shrink-0 mt-0.5">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-500 uppercase text-[10px]">Communications</div>
                      <div className="font-bold text-[#0B1F3A] text-sm mt-0.5">
                        Tel: +971 6 557 3924
                      </div>
                      <div className="text-slate-500 text-xs">Fax: +971 6 557 3925</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#0B1F3A]/5 text-[#0B1F3A] flex items-center justify-center shrink-0 mt-0.5">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-500 uppercase text-[10px]">Electronic Mail</div>
                      <div className="font-bold text-[#0B1F3A] text-sm mt-0.5">
                        info@tcconsultancy.net
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#0B1F3A]/5 text-[#0B1F3A] flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-500 uppercase text-[10px]">Operating Hours (GST)</div>
                      <div className="font-bold text-[#0B1F3A] text-sm mt-0.5">
                        Monday – Friday: 08:00 – 17:30
                      </div>
                      <div className="text-slate-500 text-xs">Saturday: Project site emergency desks</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Preview Container */}
              <div className="rounded-2xl overflow-hidden border border-[#E3E6EB] bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between text-xs font-bold text-[#0B1F3A] mb-3">
                  <span>SAIF Zone Location Map</span>
                  <span className="text-[#F5A623] font-mono text-[11px]">Sharjah Airport Hub</span>
                </div>
                <div className="relative aspect-[16/9] bg-slate-100 rounded-lg overflow-hidden flex items-center justify-center border border-slate-200">
                  <div className="text-center p-4">
                    <Building className="w-8 h-8 text-[#0B1F3A] mx-auto mb-2" />
                    <div className="text-xs font-bold text-[#0B1F3A]">TC CONSULTANCY FZC</div>
                    <div className="text-[11px] text-slate-500">Sharjah Airport International Free Zone</div>
                    <div className="text-[10px] text-amber-600 font-mono mt-1">25.3284° N, 55.5165° E</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Inquiry Form (7 cols) */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl border border-[#E3E6EB] p-8 sm:p-10 shadow-sm">
                <div className="mb-6 pb-4 border-b border-slate-100">
                  <span className="text-[#F5A623] text-xs font-extrabold tracking-widest uppercase font-mono block mb-1">
                    TRANSMIT INQUIRY
                  </span>
                  <h2 className="text-2xl font-extrabold text-[#0B1F3A] uppercase font-heading">
                    START A CONVERSATION
                  </h2>
                </div>

                {submitted ? (
                  <div className="py-12 text-center">
                    <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-[#0B1F3A] mb-2">Message Dispatched</h3>
                    <p className="text-sm text-[#5A6678] max-w-sm mx-auto mb-6">
                      Thank you for contacting TC Consultancy. A senior representative will review your
                      project brief and connect within 1 business day.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-5 py-2.5 bg-[#0B1F3A] text-white text-xs font-bold uppercase rounded"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#0B1F3A] mb-1 uppercase tracking-wider">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Your Name"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[#E3E6EB] text-sm text-[#0B1F3A] focus:outline-none focus:border-[#F5A623]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#0B1F3A] mb-1 uppercase tracking-wider">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="your.email@domain.ae"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[#E3E6EB] text-sm text-[#0B1F3A] focus:outline-none focus:border-[#F5A623]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#0B1F3A] mb-1 uppercase tracking-wider">
                          Company / Client
                        </label>
                        <input
                          type="text"
                          placeholder="Organization name"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[#E3E6EB] text-sm text-[#0B1F3A] focus:outline-none focus:border-[#F5A623]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#0B1F3A] mb-1 uppercase tracking-wider">
                          Contact Phone
                        </label>
                        <input
                          type="tel"
                          placeholder="+971 50 000 0000"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[#E3E6EB] text-sm text-[#0B1F3A] focus:outline-none focus:border-[#F5A623]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0B1F3A] mb-1 uppercase tracking-wider">
                        Subject of Interest
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#E3E6EB] text-sm text-[#0B1F3A] bg-white focus:outline-none focus:border-[#F5A623]"
                      >
                        <option value="General Engineering Inquiry">General Engineering Inquiry</option>
                        <option value="Design Consultancy Proposal">Design Consultancy Proposal</option>
                        <option value="Quantity Surveying & Cost Modeling">Quantity Surveying & Cost Modeling</option>
                        <option value="Project Management Tender">Project Management Tender</option>
                        <option value="Procurement & Direct Packages">Procurement & Direct Packages</option>
                        <option value="Careers / Human Resources">Careers / Human Resources</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0B1F3A] mb-1 uppercase tracking-wider">
                        Your Message *
                      </label>
                      <textarea
                        rows={5}
                        required
                        placeholder="Provide details on project location, gross area, expected timeframe, or specific consultation requirements..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#E3E6EB] text-sm text-[#0B1F3A] focus:outline-none focus:border-[#F5A623] resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#F5A623] hover:bg-[#E8911A] text-[#0B1F3A] font-extrabold text-xs uppercase py-3.5 rounded shadow tracking-wider inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                    >
                      {isSubmitting ? (
                        <span>TRANSMITTING...</span>
                      ) : (
                        <>
                          <span>SEND MESSAGE</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
