import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Briefcase, UploadCloud, CheckCircle2, ShieldCheck, Mail, Send, RotateCcw } from 'lucide-react';

export const CareersPage: React.FC = () => {
  const { showToast } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    position: 'Quantity Surveyor (MRICS)',
    cvFileName: '',
    description: '',
    agreeTerms: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, cvFileName: e.target.files[0].name });
      showToast(`Selected file: ${e.target.files[0].name}`, 'info');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.mobile) {
      showToast('Please provide your required Email and Mobile number', 'warning');
      return;
    }
    if (!formData.agreeTerms) {
      showToast('Please accept the declaration terms', 'warning');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      showToast('Application transmitted to TCC HR Directorate. Thank you!', 'success');
    }, 1000);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      mobile: '',
      position: 'Quantity Surveyor (MRICS)',
      cvFileName: '',
      description: '',
      agreeTerms: false,
    });
    setSubmitted(false);
    showToast('Form reset', 'info');
  };

  return (
    <div className="bg-[#F8FAFC]">
      {/* Header Banner */}
      <section className="bg-[#0B1F3A] text-white py-16 sm:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[#F5A623] text-xs font-extrabold tracking-widest uppercase font-mono block mb-2">
            JOIN OUR WORKFORCE
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight uppercase leading-tight font-heading mb-4">
            APPLY FOR A CAREER AT TCC
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed">
            Foster your professional development, lead signature infrastructure, and collaborate in an
            ISO 9001 compliant environment across the GCC.
          </p>
        </div>
      </section>

      {/* Quote Banner */}
      <section className="py-12 bg-white border-b border-[#E3E6EB]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="p-8 rounded-2xl bg-[#0B1F3A] text-white border-l-4 border-[#F5A623] shadow-md">
            <blockquote className="text-base sm:text-lg italic leading-relaxed text-slate-200 mb-4">
              "Your career with TCC will be filled with numerous learning experiences, challenging
              projects in various GCC countries, and an ISO-compliant work environment — all of which
              provide an opportunity for career growth. As an important and integral part of the team,
              your ideas towards a productive and satisfying work environment will be welcomed in an
              atmosphere of collaboration and teamwork."
            </blockquote>
            <div className="text-xs font-bold text-[#F5A623] uppercase tracking-wider font-mono">
              — TC CONSULTANCY HR & MANAGEMENT DIRECTORS
            </div>
          </div>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="py-14 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-[#E3E6EB] p-8 sm:p-10 shadow-sm">
            <div className="mb-8 pb-6 border-b border-slate-100">
              <h2 className="text-2xl font-extrabold text-[#0B1F3A] uppercase font-heading mb-2">
                CAREER APPLICATION PORTAL
              </h2>
              <p className="text-xs sm:text-sm text-[#5A6678]">
                We are always in search of talented and ambitious professionals. You can also email
                your updated resume directly to{' '}
                <a href="mailto:info@tcconsultancy.net" className="text-amber-600 font-bold underline">
                  info@tcconsultancy.net
                </a>
                .
              </p>
            </div>

            {submitted ? (
              <div className="py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-2xl font-bold text-[#0B1F3A] mb-2">Application Received</h3>
                <p className="text-sm text-[#5A6678] max-w-md mx-auto mb-6">
                  Thank you, <strong>{formData.name || 'Candidate'}</strong>. Our recruitment desk
                  has registered your CV. Shortlisted candidates will be contacted for an interview.
                </p>
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-[#0B1F3A] text-white text-xs font-bold uppercase rounded"
                >
                  Submit Another Application
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-[#0B1F3A] mb-1 uppercase tracking-wider">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#E3E6EB] text-sm text-[#0B1F3A] focus:outline-none focus:border-[#F5A623]"
                  />
                </div>

                {/* Email and Mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-[#0B1F3A] mb-1 uppercase tracking-wider">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. yourname@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#E3E6EB] text-sm text-[#0B1F3A] focus:outline-none focus:border-[#F5A623]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0B1F3A] mb-1 uppercase tracking-wider">
                      Mobile No *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+971 50 000 0000"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#E3E6EB] text-sm text-[#0B1F3A] focus:outline-none focus:border-[#F5A623]"
                    />
                  </div>
                </div>

                {/* Position of Interest */}
                <div>
                  <label className="block text-xs font-bold text-[#0B1F3A] mb-1 uppercase tracking-wider">
                    Position of Interest
                  </label>
                  <select
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#E3E6EB] text-sm text-[#0B1F3A] bg-white focus:outline-none focus:border-[#F5A623]"
                  >
                    <option value="Quantity Surveyor (MRICS)">Quantity Surveyor (MRICS / AACEI)</option>
                    <option value="Senior Project Manager">Senior Project Manager (Civil / Structural)</option>
                    <option value="Senior MEP Design Engineer">Senior MEP Design Engineer</option>
                    <option value="Architectural Detailer & 3D Visualizer">Architectural Detailer & 3D Visualizer</option>
                    <option value="Contract Administrator (FIDIC)">Contract Administrator (FIDIC)</option>
                    <option value="Graduate Engineering Trainee">Graduate Engineering Trainee (College Entry)</option>
                  </select>
                </div>

                {/* Upload CV */}
                <div>
                  <label className="block text-xs font-bold text-[#0B1F3A] mb-1 uppercase tracking-wider">
                    Upload CV (PDF / DOC / DOCX - Max 10MB)
                  </label>
                  <div className="border-2 border-dashed border-[#E3E6EB] rounded-xl p-6 text-center hover:border-[#F5A623] transition-colors relative cursor-pointer bg-slate-50/50">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <UploadCloud className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <span className="text-xs font-bold text-[#0B1F3A] block">
                      {formData.cvFileName ? (
                        <span className="text-emerald-600 font-mono">{formData.cvFileName} (Attached)</span>
                      ) : (
                        'Click to browse or drag and drop your updated CV'
                      )}
                    </span>
                    <span className="text-[11px] text-slate-400">PDF, DOC, DOCX formatted files supported</span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold text-[#0B1F3A] mb-1 uppercase tracking-wider">
                    Professional Background & Summary
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Provide a brief summary of your years of experience, notable GCC projects, technical certifications, and availability notice period..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#E3E6EB] text-sm text-[#0B1F3A] focus:outline-none focus:border-[#F5A623] resize-none"
                  />
                </div>

                {/* Terms Agreement Checkbox */}
                <div className="flex items-start gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="termsCheck"
                    checked={formData.agreeTerms}
                    onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                    className="mt-1 w-4 h-4 rounded text-[#F5A623] focus:ring-[#F5A623] border-slate-300"
                  />
                  <label htmlFor="termsCheck" className="text-xs text-slate-600 leading-relaxed">
                    I agree to the terms and authorize TC Consultancy to review my resume and contact
                    me regarding current or future employment opportunities across GCC branch offices.
                  </label>
                </div>

                {/* Action Buttons: Send / Reset matching specification */}
                <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#F5A623] hover:bg-[#E8911A] text-[#0B1F3A] font-extrabold text-xs uppercase px-8 py-3.5 rounded shadow tracking-wider inline-flex items-center gap-2 cursor-pointer disabled:opacity-75"
                  >
                    {isSubmitting ? (
                      <span>TRANSMITTING...</span>
                    ) : (
                      <>
                        <span>SEND APPLICATION</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-5 py-3 rounded border border-slate-300 text-xs font-bold uppercase tracking-wider text-[#5A6678] hover:bg-slate-100 transition inline-flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>RESET</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
