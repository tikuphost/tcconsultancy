import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/navbar/Navbar';
import { Hero } from './components/home/Hero';
import { ExpertiseStrip } from './components/home/ExpertiseStrip';
import { ImpactBand } from './components/home/ImpactBand';
import { ProjectsMapSection } from './components/home/ProjectsMapSection';
import { FeaturedProjects } from './components/home/FeaturedProjects';
import { IsoStrip } from './components/home/IsoStrip';
import { CtaBanner } from './components/home/CtaBanner';
import { FaqSection } from './components/home/FaqSection';
import { ContactSection } from './components/home/ContactSection';
import { Footer } from './components/footer/Footer';
import { AboutPage } from './components/pages/AboutPage';
import { ServicesPage } from './components/pages/ServicesPage';
import { ProjectsPage } from './components/pages/ProjectsPage';
import { ClientsPage } from './components/pages/ClientsPage';
import { CareersPage } from './components/pages/CareersPage';
import { BlogPage } from './components/pages/BlogPage';
import { ContactPage } from './components/pages/ContactPage';
import { ChatFloatingWidget } from './components/chat/ChatFloatingWidget';
import { QuoteModal } from './components/quote/QuoteModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { page, isAdminMode, toast } = useApp();

  // If in Admin Mode, render full Command Center
  if (isAdminMode) {
    return (
      <div className="relative min-h-screen bg-[#F8FAFC]">
        <AdminDashboard />
        <ToastContainer toast={toast} />
      </div>
    );
  }

  // Otherwise, render Public Storefront matching reference design
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 font-sans selection:bg-[#F5A623] selection:text-[#0B1F3A]">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Routed Page Content */}
      <main className="flex-1">
        {page === 'home' && (
          <>
            <Hero />
            <ExpertiseStrip />
            <ImpactBand />
            <ProjectsMapSection />
            <FeaturedProjects />
            <IsoStrip />
            <CtaBanner />
            <FaqSection />
            <ContactSection />
          </>
        )}

        {page === 'about' && <AboutPage />}
        {page === 'services' && <ServicesPage />}
        {page === 'projects' && <ProjectsPage />}
        {page === 'clients' && <ClientsPage />}
        {page === 'careers' && <CareersPage />}
        {page === 'blog' && <BlogPage />}
        {page === 'contact' && <ContactPage />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Customer Live Chat Widget */}
      <ChatFloatingWidget />

      {/* Instant Proposal / RFQ Modal */}
      <QuoteModal />

      {/* Global Toast Notifications */}
      <ToastContainer toast={toast} />
    </div>
  );
};

const ToastContainer: React.FC<{ toast: { message: string; type: 'success' | 'info' | 'warning' } | null }> = ({
  toast,
}) => {
  if (!toast) return null;

  const bgStyles =
    toast.type === 'success'
      ? 'bg-emerald-800 text-white border-emerald-700'
      : toast.type === 'warning'
      ? 'bg-amber-800 text-white border-amber-700'
      : 'bg-[#0B1F3A] text-white border-slate-700';

  const Icon =
    toast.type === 'success' ? CheckCircle2 : toast.type === 'warning' ? AlertTriangle : Info;

  return (
    <div className="fixed top-5 right-5 z-50 animate-in fade-in slide-in-from-top-3 duration-200">
      <div
        className={`px-4 py-3 rounded-xl border shadow-xl flex items-center gap-2.5 text-xs font-semibold max-w-md ${bgStyles}`}
      >
        <Icon className="w-4 h-4 shrink-0 text-[#F5A623]" />
        <span className="flex-1">{toast.message}</span>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
