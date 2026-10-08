import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { ChevronRight, Menu, X, ShoppingBag } from 'lucide-react';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  customLogoUrl?: string;
  activeLogoType?: 'brain' | 'circuit';
  isAdmin?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigate,
  customLogoUrl,
  activeLogoType,
  isAdmin = false,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<'home' | 'services' | 'pricing' | 'about' | 'contact'>('home');

  const handleLogoClick = () => {
    setActiveSection('home');
    onNavigate('hero');
  };

  const handleNavClick = (section: 'home' | 'services' | 'pricing' | 'about' | 'contact', targetId: string) => {
    setActiveSection(section);
    onNavigate(targetId);
    setMobileMenuOpen(false);
  };

  // Listen to scroll position to highlight currently visible section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 120;
      const contactEl = document.getElementById('contact');
      const aboutEl = document.getElementById('about');
      const pricingEl = document.getElementById('pricing');
      const servicesEl = document.getElementById('services');

      if (contactEl && scrollPos >= contactEl.offsetTop) {
        setActiveSection('contact');
      } else if (aboutEl && scrollPos >= aboutEl.offsetTop) {
        setActiveSection('about');
      } else if (pricingEl && scrollPos >= pricingEl.offsetTop) {
        setActiveSection('pricing');
      } else if (servicesEl && scrollPos >= servicesEl.offsetTop) {
        setActiveSection('services');
      } else {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-[#070D1F]/90 backdrop-blur-xl border-b border-blue-900/40 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between relative z-10">
        {/* Left Side: Brand Logo */}
        <div className="flex items-center">
          <Logo
            onClick={handleLogoClick}
            size="md"
            variant={activeLogoType || 'circuit'}
            showTagline={true}
            customLogoUrl={customLogoUrl}
          />
        </div>

        {/* Center: Clean Public Navigation Links (NO admin links) */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {/* Home */}
          <button
            onClick={() => handleNavClick('home', 'hero')}
            className="relative py-2 text-[15px] font-bold transition-colors group cursor-pointer"
          >
            <span
              className={
                activeSection === 'home'
                  ? 'text-[#0070F3]'
                  : 'text-slate-200 group-hover:text-white'
              }
            >
              Home
            </span>
            {activeSection === 'home' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#0070F3] rounded-full shadow-[0_0_8px_rgba(0,112,243,0.8)]" />
            )}
          </button>

          {/* Services */}
          <button
            onClick={() => handleNavClick('services', 'services')}
            className="relative py-2 text-[15px] font-bold transition-colors group cursor-pointer"
          >
            <span
              className={
                activeSection === 'services'
                  ? 'text-[#0070F3]'
                  : 'text-slate-200 group-hover:text-white'
              }
            >
              Services
            </span>
            {activeSection === 'services' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#0070F3] rounded-full shadow-[0_0_8px_rgba(0,112,243,0.8)]" />
            )}
          </button>

          {/* Pricing */}
          <button
            onClick={() => handleNavClick('pricing', 'pricing')}
            className="relative py-2 text-[15px] font-bold transition-colors group cursor-pointer"
          >
            <span
              className={
                activeSection === 'pricing'
                  ? 'text-[#0070F3]'
                  : 'text-slate-200 group-hover:text-white'
              }
            >
              Pricing
            </span>
            {activeSection === 'pricing' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#0070F3] rounded-full shadow-[0_0_8px_rgba(0,112,243,0.8)]" />
            )}
          </button>

          {/* About */}
          <button
            onClick={() => handleNavClick('about', 'about')}
            className="relative py-2 text-[15px] font-bold transition-colors group cursor-pointer"
          >
            <span
              className={
                activeSection === 'about'
                  ? 'text-[#0070F3]'
                  : 'text-slate-200 group-hover:text-white'
              }
            >
              About
            </span>
            {activeSection === 'about' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#0070F3] rounded-full shadow-[0_0_8px_rgba(0,112,243,0.8)]" />
            )}
          </button>

          {/* Contact */}
          <button
            onClick={() => handleNavClick('contact', 'contact')}
            className="relative py-2 text-[15px] font-bold transition-colors group cursor-pointer"
          >
            <span
              className={
                activeSection === 'contact'
                  ? 'text-[#0070F3]'
                  : 'text-slate-200 group-hover:text-white'
              }
            >
              Contact
            </span>
            {activeSection === 'contact' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#0070F3] rounded-full shadow-[0_0_8px_rgba(0,112,243,0.8)]" />
            )}
          </button>
        </nav>

        {/* Right Side: Exact Electric Blue "Get Started >" Button & Admin View Orders */}
        <div className="hidden sm:flex items-center gap-3">
          {isAdmin && (
            <button
              onClick={() => onNavigate('admin-panel')}
              className="px-4 py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 shadow-[0_0_20px_rgba(0,240,255,0.7)] border border-cyan-200 transition-all flex items-center gap-1.5 cursor-pointer animate-pulse"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>View Orders</span>
            </button>
          )}

          <button
            onClick={() => onNavigate('pricing')}
            className="relative group px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#0066FF] to-[#0088FF] hover:from-[#0055EE] hover:to-[#0077EE] shadow-[0_0_24px_rgba(0,112,243,0.65)] hover:shadow-[0_0_35px_rgba(0,140,255,0.85)] border border-cyan-400/30 transition-all duration-300 flex items-center gap-1.5 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <span>Get Started</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Mobile Hamburger Menu Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white bg-[#0A1633] rounded-lg border border-blue-900/80"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-blue-900/50 bg-[#060D1E]/98 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-3">
            <button
              onClick={() => handleNavClick('home', 'hero')}
              className={`text-left text-base font-bold py-2 border-b border-blue-950/60 ${
                activeSection === 'home' ? 'text-[#0070F3]' : 'text-slate-200'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('services', 'services')}
              className={`text-left text-base font-bold py-2 border-b border-blue-950/60 ${
                activeSection === 'services' ? 'text-[#0070F3]' : 'text-slate-200'
              }`}
            >
              Services (Basic, Pro, Premium)
            </button>
            <button
              onClick={() => handleNavClick('pricing', 'pricing')}
              className={`text-left text-base font-bold py-2 border-b border-blue-950/60 ${
                activeSection === 'pricing' ? 'text-[#0070F3]' : 'text-slate-200'
              }`}
            >
              Pricing Plans
            </button>
            <button
              onClick={() => handleNavClick('about', 'about')}
              className={`text-left text-base font-bold py-2 border-b border-blue-950/60 ${
                activeSection === 'about' ? 'text-[#0070F3]' : 'text-slate-200'
              }`}
            >
              About
            </button>
            <button
              onClick={() => handleNavClick('contact', 'contact')}
              className={`text-left text-base font-bold py-2 border-b border-blue-950/60 ${
                activeSection === 'contact' ? 'text-[#0070F3]' : 'text-slate-200'
              }`}
            >
              Contact
            </button>
          </div>

          <div className="pt-2 space-y-2">
            {isAdmin && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('admin-panel');
                }}
                className="w-full py-3 rounded-xl font-bold text-center text-sm text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 shadow-[0_0_20px_rgba(0,240,255,0.6)] flex items-center justify-center gap-1.5"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>View Orders (?admin=true)</span>
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('pricing');
              }}
              className="w-full py-3 rounded-xl font-bold text-center text-sm text-white bg-gradient-to-r from-[#0066FF] to-[#0088FF] shadow-[0_0_20px_rgba(0,112,243,0.5)] flex items-center justify-center gap-1.5"
            >
              <span>Get Started</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
