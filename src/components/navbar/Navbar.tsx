import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { PageView } from '../../types';
import {
  Menu,
  X,
  Phone,
  Mail,
  Building2,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  LayoutDashboard,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { page, setPage, setIsQuoteModalOpen, isAdminMode, setIsAdminMode, chatSessions } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; id: PageView }[] = [
    { label: 'HOME', id: 'home' },
    { label: 'ABOUT US', id: 'about' },
    { label: 'SERVICES', id: 'services' },
    { label: 'PROJECTS', id: 'projects' },
    { label: 'CLIENTS', id: 'clients' },
    { label: 'CAREERS', id: 'careers' },
    { label: 'BLOG', id: 'blog' },
    { label: 'CONTACT', id: 'contact' },
  ];

  const totalUnreadAdmin = chatSessions.reduce((acc, s) => acc + s.unreadAdminCount, 0);

  return (
    <>
      {/* Top Utility Announcement Bar */}
      <div className="bg-[#071528] text-slate-300 text-xs py-1.5 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1 text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block"></span>
              Sharjah Office (SAIF Zone): +971 6 557 3924
            </span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:inline text-slate-400">info@tcconsultancy.net</span>
          </div>

          <div className="flex items-center gap-3 ml-auto text-[11px] sm:text-xs">
            <span className="hidden sm:inline-flex items-center gap-1 text-amber-400/90 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              ISO 9001:2015 Accredited · RICS & AACEI Certified
            </span>

            {/* Quick Switch to Admin Command Center */}
            <button
              onClick={() => setIsAdminMode(!isAdminMode)}
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-amber-400 text-[11px] font-semibold transition border border-slate-700"
              title="Toggle Admin Command Center"
            >
              <LayoutDashboard className="w-3 h-3" />
              <span>{isAdminMode ? 'Return to Storefront' : 'Admin Portal'}</span>
              {totalUnreadAdmin > 0 && (
                <span className="bg-red-500 text-white text-[9px] px-1 rounded-full font-bold">
                  {totalUnreadAdmin}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation Bar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0B1F3A]/95 backdrop-blur-md shadow-lg py-3'
            : 'bg-[#0B1F3A] py-4'
        } border-b border-slate-800/80`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo Lockup */}
          <button
            onClick={() => {
              setPage('home');
              if (isAdminMode) setIsAdminMode(false);
            }}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            {/* Logo Mark */}
            <div className="w-10 h-10 rounded bg-gradient-to-br from-[#F5A623] to-[#D97D0B] flex items-center justify-center shadow-md shadow-amber-900/30 text-[#0B1F3A] font-extrabold text-xl group-hover:scale-105 transition-transform">
              <Building2 className="w-6 h-6 text-[#0B1F3A]" />
            </div>

            {/* Wordmark */}
            <div>
              <div className="text-white font-extrabold tracking-wider text-base sm:text-lg leading-tight font-heading flex items-center gap-1">
                TC CONSULTANCY
              </div>
              <div className="text-[#F5A623] text-[9px] sm:text-[10px] font-bold tracking-widest uppercase">
                ENGINEERING & PROJECT MANAGEMENT
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-3">
            {navItems.map((item) => {
              const isActive = page === item.id && !isAdminMode;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setPage(item.id);
                    if (isAdminMode) setIsAdminMode(false);
                  }}
                  className={`px-3 py-1.5 text-xs font-bold tracking-wider uppercase transition-colors relative ${
                    isActive
                      ? 'text-[#F5A623]'
                      : 'text-slate-200 hover:text-white hover:bg-slate-800/40 rounded'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#F5A623] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop Right CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => setIsQuoteModalOpen(true)}
              className="bg-[#F5A623] hover:bg-[#E8911A] text-[#0B1F3A] font-extrabold text-xs uppercase px-5 py-2.5 rounded shadow hover:shadow-amber-500/20 transition-all transform active:scale-95 tracking-wider"
            >
              GET A QUOTE
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setIsQuoteModalOpen(true)}
              className="bg-[#F5A623] text-[#0B1F3A] font-extrabold text-[11px] uppercase px-3 py-1.5 rounded"
            >
              QUOTE
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded text-slate-200 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm">
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-[#0B1F3A] shadow-2xl p-6 flex flex-col justify-between border-l border-slate-800">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-[#F5A623] flex items-center justify-center text-[#0B1F3A] font-bold">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <span className="text-white font-bold text-sm tracking-wider">TC CONSULTANCY</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded text-slate-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="mt-6 flex flex-col space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setPage(item.id);
                      if (isAdminMode) setIsAdminMode(false);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center justify-between px-3 py-2.5 rounded text-sm font-semibold tracking-wide uppercase text-left ${
                      page === item.id && !isAdminMode
                        ? 'bg-[#F5A623] text-[#0B1F3A]'
                        : 'text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-4 h-4 opacity-70" />
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsQuoteModalOpen(true);
                }}
                className="w-full bg-[#F5A623] hover:bg-[#E8911A] text-[#0B1F3A] font-extrabold text-sm uppercase py-3 rounded text-center tracking-wider block"
              >
                GET A QUOTE
              </button>

              <button
                onClick={() => {
                  setIsAdminMode(!isAdminMode);
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-slate-800 text-amber-400 font-semibold text-xs py-2 rounded text-center border border-slate-700 block"
              >
                {isAdminMode ? 'Return to Storefront' : 'Open Admin Command Center'}
              </button>

              <div className="text-slate-400 text-xs text-center space-y-1 pt-2">
                <p>Sharjah Office: +971 6 557 3924</p>
                <p>info@tcconsultancy.net</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
