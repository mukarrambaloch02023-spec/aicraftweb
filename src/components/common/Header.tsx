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

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 120;
      const contactEl = document.getElementById('contact');
      const aboutEl = document.getElementById('about');
      const pricingEl = document.getElementById('pricing');
      const servicesEl = document.getElementById('services');
      if (contactEl && scrollPos >= contactEl.offsetTop) setActiveSection('contact');
      else if (aboutEl && scrollPos >= aboutEl.offsetTop) setActiveSection('about');
      else if (pricingEl && scrollPos >= pricingEl.offsetTop) setActiveSection('pricing');
      else if (servicesEl && scrollPos >= servicesEl.offsetTop) setActiveSection('services');
      else setActiveSection('home');
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-[#070D1F]/70 backdrop-blur-xl border-b border-blue-900/40 transition-all duration-300 overflow-hidden relative">

      {/* MOVING LIGHTS - FINAL FIX */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{ position: 'absolute', top: '-30px', left: '15%', width: '500px', height: '150px', background: '#8b5cf6', opacity: 0.5, borderRadius: '50%', filter: 'blur(60px)', animation: 'float1 4s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', top: '-20px', right: '20%', width: '450px', height: '130px', background: '#3b82f6', opacity: 0.45, borderRadius: '50%', filter: 'blur(60px)', animation: 'float2 5s ease-in-out infinite' }} />
      </div>
      <style>{`@keyframes float1 { 0%,100%{transform:translateX(0)} 50%{transform:translateX(25px)}} @keyframes float2 { 0%,100%{transform:translateX(0)} 50%{transform:translateX(-25px)}}`}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between relative z-10">
        <div className="flex items-center">
          <Logo onClick={handleLogoClick} size="md" variant={activeLogoType || 'circuit'} showTagline={true} customLogoUrl={customLogoUrl} />
        </div>
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          <button onClick={() => handleNavClick('home', 'hero')} className="relative py-2 text-[15px] font-bold group cursor-pointer"><span className={activeSection === 'home'? 'text-[#0070F3]' : 'text-slate-200 group-hover:text-white'}>Home</span>{activeSection === 'home' && <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#0070F3] rounded-full" />}</button>
          <button onClick={() => handleNavClick('services', 'services')} className="relative py-2 text-[15px] font-bold group cursor-pointer"><span className={activeSection === 'services'? 'text-[#0070F3]' : 'text-slate-200 group-hover:text-white'}>Services</span>{activeSection === 'services' && <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#0070F3] rounded-full" />}</button>
          <button onClick={() => handleNavClick('pricing', 'pricing')} className="relative py-2 text-[15px] font-bold group cursor-pointer"><span className={activeSection === 'pricing'? 'text-[#0070F3]' : 'text-slate-200 group-hover:text-white'}>Pricing</span>{activeSection === 'pricing' && <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#0070F3] rounded-full" />}</button>
          <button onClick={() => handleNavClick('about', 'about')} className="relative py-2 text-[15px] font-bold group cursor-pointer"><span className={activeSection === 'about'? 'text-[#0070F3]' : 'text-slate-200 group-hover:text-white'}>About</span>{activeSection === 'about' && <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#0070F3] rounded-full" />}</button>
          <button onClick={() => handleNavClick('contact', 'contact')} className="relative py-2 text-[15px] font-bold group cursor-pointer"><span className={activeSection === 'contact'? 'text-[#0070F3]' : 'text-slate-200 group-hover:text-white'}>Contact</span>{activeSection === 'contact' && <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#0070F3] rounded-full" />}</button>
        </nav>
        <div className="hidden sm:flex items-center gap-3">
          {isAdmin && (<button onClick={() => onNavigate('admin-panel')} className="px-4 py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 flex items-center gap-1.5"><ShoppingBag className="w-3.5 h-3.5" /><span>View Orders</span></button>)}
          <button onClick={() => onNavigate('pricing')} className="px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#0066FF] to-[#0088FF] border border-cyan-400/30 flex items-center gap-1.5"><span>Get Started</span><ChevronRight className="w-4 h-4" /></button>
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-slate-300 bg-[#0A1633] rounded-lg border border-blue-900/80">{mobileMenuOpen? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}</button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-blue-900/50 bg-[#060D1E]/98 px-6 py-6 space-y-4">
          <button onClick={() => handleNavClick('home', 'hero')} className="block text-left font-bold py-2">Home</button>
          <button onClick={() => handleNavClick('services', 'services')} className="block text-left font-bold py-2">Services</button>
          <button onClick={() => handleNavClick('pricing', 'pricing')} className="block text-left font-bold py-2">Pricing</button>
          <button onClick={() => handleNavClick('about', 'about')} className="block text-left font-bold py-2">About</button>
          <button onClick={() => handleNavClick('contact', 'contact')} className="block text-left font-bold py-2">Contact</button>
        </div>
      )}
    </header>
  );
};
