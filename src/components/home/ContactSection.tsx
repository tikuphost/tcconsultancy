import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Phone, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { showToast } = useApp();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.message) {
      showToast('Please fill in required fields (Name, Email, Message)', 'warning');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      showToast('Inquiry sent successfully. Our Sharjah team will respond shortly.', 'success');
      setFormData({ fullName: '', email: '', company: '', phone: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 900);
  };

  return (
    <section className="py-16 sm:py-24 bg-[#F5F6F8] border-b border-[#E3E6EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Contact Information Column (5 cols) matching reference layout */}
          <div className="lg:col-span-5">
            <span className="text-[#F5A623] text-xs font-extrabold tracking-widest uppercase font-mono block mb-2">
              GET IN TOUCH
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1F3A] tracking-tight uppercase leading-tight font-heading mb-4">
              LET'S BUILD TOGETHER
            </h2>
            <p className="text-[#5A6678] text-sm leading-relaxed mb-8 max-w-md">
              Have a project in mind? Our team of RICS chartered surveyors, structural architects,
              and project directors is ready to turn your vision into reality.
            </p>

            {/* Stacked Contact Items with icons */}
            <div className="space-y-4">
              <a
                href="tel:+97165573924"
                className="flex items-start gap-4 p-3.5 rounded-lg bg-white border border-[#E3E6EB] hover:border-slate-300 transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-[#0B1F3A]/5 text-[#0B1F3A] group-hover:bg-[#F5A623] group-hover:text-[#0B1F3A] flex items-center justify-center shrink-0 transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Direct Telephone</div>
                  <div className="text-sm font-extrabold text-[#0B1F3A]">+971 6 557 3924</div>
                  <div className="text-[11px] text-slate-400">Fax: +971 6 557 3925</div>
                </div>
              </a>

              <a
                href="mailto:info@tcconsultancy.net"
                className="flex items-start gap-4 p-3.5 rounded-lg bg-white border border-[#E3E6EB] hover:border-slate-300 transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-[#0B1F3A]/5 text-[#0B1F3A] group-hover:bg-[#F5A623] group-hover:text-[#0B1F3A] flex items-center justify-center shrink-0 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Official Inquiries</div>
                  <div className="text-sm font-extrabold text-[#0B1F3A]">info@tcconsultancy.net</div>
                  <div className="text-[11px] text-slate-400">Response within 24 business hours</div>
                </div>
              </a>

              <div className="flex items-start gap-4 p-3.5 rounded-lg bg-white border border-[#E3E6EB]">
                <div className="w-10 h-10 rounded-full bg-[#0B1F3A]/5 text-[#0B1F3A] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Sharjah Headquarters</div>
                  <div className="text-sm font-extrabold text-[#0B1F3A]">TC CONSULTANCY FZC</div>
                  <div className="text-xs text-slate-600 mt-0.5">
                    P. O. Box 7970, SAIF Zone, Sharjah, United Arab Emirates
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Column (7 cols) matching reference layout */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-xl border border-[#E3E6EB] p-6 sm:p-8 shadow-sm">
              {submitted ? (
                <div className="py-12 text-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0B1F3A] mb-2">Message Dispatched</h3>
                  <p className="text-sm text-[#5A6678] max-w-sm mx-auto">
                    Thank you for contacting TC Consultancy. Our engineering desk has logged your request and assigned an engineering lead.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Row 1: Full Name, Email Address */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0B1F3A] mb-1 uppercase tracking-wider">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Eng. Khalid Al-Nuaimi"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded border border-[#E3E6EB] text-sm text-[#0B1F3A] focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0B1F3A] mb-1 uppercase tracking-wider">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="khalid@domain.ae"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded border border-[#E3E6EB] text-sm text-[#0B1F3A] focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 2: Company, Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0B1F3A] mb-1 uppercase tracking-wider">
                        Company / Organization
                      </label>
                      <input
                        type="text"
                        placeholder="Company Name"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded border border-[#E3E6EB] text-sm text-[#0B1F3A] focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0B1F3A] mb-1 uppercase tracking-wider">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+971 50 123 4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded border border-[#E3E6EB] text-sm text-[#0B1F3A] focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 3: Your Message */}
                  <div>
                    <label className="block text-xs font-bold text-[#0B1F3A] mb-1 uppercase tracking-wider">
                      Your Message *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Outline project location, scope (e.g. Design, Quantity Surveying, Supervision), or specific technical requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded border border-[#E3E6EB] text-sm text-[#0B1F3A] focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] transition-colors resize-none"
                    />
                  </div>

                  {/* Golden Full-Width Button matching reference */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#F5A623] hover:bg-[#E8911A] text-[#0B1F3A] font-extrabold text-xs uppercase py-3.5 rounded shadow hover:shadow-amber-500/20 transition-all tracking-wider inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
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
  );
};
