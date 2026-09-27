import React, { useState } from 'react';
import { KeyRound, Upload, Check, ShieldCheck, AlertCircle, RefreshCw, Smartphone, Mail, MapPin, Globe, Copy, ExternalLink } from 'lucide-react';
import { AdminSettings } from '../../types';
import { Logo } from '../common/Logo';

interface SettingsViewProps {
  settings: AdminSettings;
  onUpdateSettings: (settings: AdminSettings) => void;
  onResetToDemoData: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  settings,
  onUpdateSettings,
  onResetToDemoData,
}) => {
  const [currentPasscode, setCurrentPasscode] = useState('');
  const [newPasscode, setNewPasscode] = useState('');
  const [confirmPasscode, setConfirmPasscode] = useState('');
  const [passcodeSuccess, setPasscodeSuccess] = useState('');
  const [passcodeError, setPasscodeError] = useState('');

  // Contact Info State
  const [ownerName, setOwnerName] = useState(settings.ownerName);
  const [whatsappNumber, setWhatsappNumber] = useState(settings.whatsappNumber);
  const [whatsappRaw, setWhatsappRaw] = useState(settings.whatsappRaw);
  const [phone, setPhone] = useState(settings.phone);
  const [email, setEmail] = useState(settings.email);
  const [location, setLocation] = useState(settings.location);
  const [contactSuccess, setContactSuccess] = useState(false);

  // Custom Domain State
  const [websiteDomain, setWebsiteDomain] = useState(settings.websiteDomain || 'www.aicraftweb.com');
  const [domainSuccess, setDomainSuccess] = useState(false);
  const [copiedTarget, setCopiedTarget] = useState(false);

  // Logo Upload State
  const [customLogoUrl, setCustomLogoUrl] = useState(settings.customLogoUrl || '');
  const [logoSuccess, setLogoSuccess] = useState(false);

  // Handle Passcode Change
  const handlePasscodeChange = (e: React.FormEvent) => {
    e.preventDefault();
    setPasscodeError('');
    setPasscodeSuccess('');

    if (currentPasscode !== settings.adminPasscode) {
      setPasscodeError('Current passcode is incorrect.');
      return;
    }

    if (newPasscode.length < 6) {
      setPasscodeError('New passcode must be at least 6 characters long.');
      return;
    }

    if (newPasscode !== confirmPasscode) {
      setPasscodeError('New passcodes do not match.');
      return;
    }

    onUpdateSettings({
      ...settings,
      adminPasscode: newPasscode,
    });

    setPasscodeSuccess('Admin passcode updated successfully!');
    setCurrentPasscode('');
    setNewPasscode('');
    setConfirmPasscode('');
  };

  // Handle Contact Update
  const handleContactUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanRaw = whatsappRaw.replace(/[^0-9]/g, '');

    onUpdateSettings({
      ...settings,
      ownerName,
      whatsappNumber,
      whatsappRaw: cleanRaw,
      phone,
      email,
      location,
    });

    setContactSuccess(true);
    setTimeout(() => setContactSuccess(false), 3000);
  };

  // Handle Domain Update
  const handleDomainUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings({
      ...settings,
      websiteDomain: websiteDomain.trim(),
    });
    setDomainSuccess(true);
    setTimeout(() => setDomainSuccess(false), 3000);
  };

  // Handle Logo Upload via FileReader
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, SVG, WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const result = uploadEvent.target?.result as string;
      setCustomLogoUrl(result);
      onUpdateSettings({
        ...settings,
        customLogoUrl: result,
      });
      setLogoSuccess(true);
      setTimeout(() => setLogoSuccess(false), 3000);
    };
    reader.readAsDataURL(file);
  };

  const handleResetToDefaultLogo = () => {
    setCustomLogoUrl('');
    onUpdateSettings({
      ...settings,
      customLogoUrl: undefined,
      activeLogoType: 'brain',
    });
    setLogoSuccess(true);
    setTimeout(() => setLogoSuccess(false), 3000);
  };

  const handleSelectLogoVariant = (variant: 'brain' | 'circuit') => {
    setCustomLogoUrl('');
    onUpdateSettings({
      ...settings,
      customLogoUrl: undefined,
      activeLogoType: variant,
    });
    setLogoSuccess(true);
    setTimeout(() => setLogoSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-4xl">
      {/* Header */}
      <div className="bg-[#091226] border border-blue-900/60 p-5 rounded-2xl shadow-lg">
        <h2 className="text-xl font-bold text-white tracking-tight">
          Admin OS Settings & Identity
        </h2>
        <p className="text-xs text-slate-400">
          Configure agency brand credentials, developer contact information, and security passcodes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Change Admin Passcode */}
        <div className="rounded-2xl bg-[#091226] border border-blue-500/20 p-6 shadow-xl text-left">
          <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-blue-900/50">
            <KeyRound className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white">Change Admin Passcode</h3>
          </div>

          <form onSubmit={handlePasscodeChange} className="space-y-3.5 text-xs font-mono">
            <div>
              <label className="block text-slate-400 mb-1">Current Passcode</label>
              <input
                type="password"
                required
                value={currentPasscode}
                onChange={(e) => setCurrentPasscode(e.target.value)}
                placeholder="Current master key"
                className="w-full px-3 py-2 rounded-xl bg-[#070D1F] border border-blue-900 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">New Passcode</label>
              <input
                type="password"
                required
                value={newPasscode}
                onChange={(e) => setNewPasscode(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full px-3 py-2 rounded-xl bg-[#070D1F] border border-blue-900 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Confirm New Passcode</label>
              <input
                type="password"
                required
                value={confirmPasscode}
                onChange={(e) => setConfirmPasscode(e.target.value)}
                placeholder="Re-enter new passcode"
                className="w-full px-3 py-2 rounded-xl bg-[#070D1F] border border-blue-900 text-white"
              />
            </div>

            {passcodeError && (
              <p className="text-xs text-rose-400 flex items-center gap-1.5 font-sans">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{passcodeError}</span>
              </p>
            )}

            {passcodeSuccess && (
              <p className="text-xs text-emerald-400 flex items-center gap-1.5 font-sans">
                <Check className="w-4 h-4 flex-shrink-0" />
                <span>{passcodeSuccess}</span>
              </p>
            )}

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-[#0088FF] font-sans hover:opacity-95"
            >
              Update Passcode
            </button>
          </form>
        </div>

        {/* Card 2: Logo Selection & Brand Identity */}
        <div className="rounded-2xl bg-[#091226] border border-blue-500/20 p-6 shadow-xl text-left">
          <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-blue-900/50">
            <Upload className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white">Agency Logo Configuration</h3>
          </div>

          <p className="text-xs text-slate-400 mb-4">
            Select your preferred official vector logo design or upload a custom image.
          </p>

          {/* Logo Live Preview */}
          <div className="p-4 rounded-xl bg-[#070D1F] border border-blue-900 flex items-center justify-center mb-4 min-h-[90px]">
            <Logo
              size="lg"
              variant={settings.activeLogoType || 'brain'}
              customLogoUrl={customLogoUrl}
            />
          </div>

          {/* 1-Click Vector Logo Switcher */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {/* Option 1: AI Brain Logo */}
            <button
              type="button"
              onClick={() => handleSelectLogoVariant('brain')}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                !customLogoUrl && (settings.activeLogoType === 'brain' || !settings.activeLogoType)
                  ? 'bg-blue-950/70 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,140,255,0.3)]'
                  : 'bg-[#070D1F] border-blue-900/80 text-slate-400 hover:text-white hover:border-blue-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-cyan-300">Neural AI Brain</span>
                {!customLogoUrl && (settings.activeLogoType === 'brain' || !settings.activeLogoType) && (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                )}
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">
                Synaptic neural brain network in rounded metallic hexagon
              </p>
            </button>

            {/* Option 2: AW Circuit Logo */}
            <button
              type="button"
              onClick={() => handleSelectLogoVariant('circuit')}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                !customLogoUrl && settings.activeLogoType === 'circuit'
                  ? 'bg-blue-950/70 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,140,255,0.3)]'
                  : 'bg-[#070D1F] border-blue-900/80 text-slate-400 hover:text-white hover:border-blue-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-cyan-300">Technical AW Circuit</span>
                {!customLogoUrl && settings.activeLogoType === 'circuit' && (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                )}
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">
                Interlocking AW with microprocessors & PCB tracks
              </p>
            </button>
          </div>

          <div className="space-y-3">
            <label className="block w-full">
              <span className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                Or Upload Custom Brand Image
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="block w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500 cursor-pointer"
              />
            </label>

            {customLogoUrl && (
              <button
                type="button"
                onClick={handleResetToDefaultLogo}
                className="w-full py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-[#0A1633] border border-blue-800 transition-colors"
              >
                Clear Custom Image & Restore Vector Logo
              </button>
            )}

            {logoSuccess && (
              <p className="text-xs text-emerald-400 flex items-center gap-1.5 font-medium">
                <Check className="w-4 h-4" />
                <span>Logo updated across the entire website and header!</span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Card 3: Agency Contact & Mukarram Ali Details */}
      <div className="rounded-2xl bg-[#091226] border border-blue-500/20 p-6 shadow-xl text-left">
        <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-blue-900/50">
          <Smartphone className="w-5 h-5 text-cyan-400" />
          <h3 className="text-base font-bold text-white">Agency Details & WhatsApp Routing</h3>
        </div>

        <form onSubmit={handleContactUpdate} className="space-y-4 text-xs font-mono">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 mb-1">Founder / Owner Name</label>
              <input
                type="text"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#070D1F] border border-blue-900 text-white font-sans text-xs"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#070D1F] border border-blue-900 text-white font-sans text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 mb-1">WhatsApp Formatted (Display)</label>
              <input
                type="text"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#070D1F] border border-blue-900 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">WhatsApp Raw (Numbers only for wa.me link)</label>
              <input
                type="text"
                value={whatsappRaw}
                onChange={(e) => setWhatsappRaw(e.target.value)}
                placeholder="923129054452"
                className="w-full px-3 py-2 rounded-xl bg-[#070D1F] border border-blue-900 text-emerald-400 font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 mb-1">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#070D1F] border border-blue-900 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Official Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#070D1F] border border-blue-900 text-white"
              />
            </div>
          </div>

          {contactSuccess && (
            <p className="text-xs text-emerald-400 flex items-center gap-1.5 font-sans font-medium">
              <Check className="w-4 h-4" />
              <span>Contact parameters updated successfully!</span>
            </p>
          )}

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-[#0088FF] font-sans hover:opacity-95"
            >
              Save Contact Details
            </button>
          </div>
        </form>
      </div>

      {/* Card 4: Custom Domain & DNS Routing (www.aicraftweb.com) */}
      <div className="rounded-2xl bg-[#091226] border border-blue-500/20 p-6 shadow-xl text-left">
        <div className="flex items-center justify-between pb-3 border-b border-blue-900/50 mb-4">
          <div className="flex items-center gap-2.5">
            <Globe className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="text-base font-bold text-white">Custom Domain & DNS Routing</h3>
              <p className="text-xs text-slate-400">Link your official branded web domain</p>
            </div>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/70 border border-emerald-800/80 px-2.5 py-1 rounded-full flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>Configured: www.aicraftweb.com</span>
          </span>
        </div>

        <form onSubmit={handleDomainUpdate} className="space-y-4 text-xs font-mono">
          <div>
            <label className="block text-slate-400 mb-1 font-sans">Primary Custom Domain</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">https://</span>
                <input
                  type="text"
                  value={websiteDomain}
                  onChange={(e) => setWebsiteDomain(e.target.value)}
                  placeholder="www.aicraftweb.com"
                  className="w-full pl-20 pr-3 py-2.5 rounded-xl bg-[#070D1F] border border-blue-900 text-cyan-300 font-bold focus:border-cyan-400 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl font-bold font-sans text-slate-950 bg-gradient-to-r from-cyan-400 to-[#0088FF] hover:opacity-95 whitespace-nowrap"
              >
                Update Domain
              </button>
            </div>
          </div>

          {domainSuccess && (
            <p className="text-xs text-emerald-400 flex items-center gap-1.5 font-sans font-medium">
              <Check className="w-4 h-4" />
              <span>Domain parameters saved to platform metadata and schema!</span>
            </p>
          )}

          {/* DNS Records Guide */}
          <div className="mt-4 p-4 rounded-xl bg-[#060D1E] border border-blue-900/80 space-y-3 font-sans">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span>Required DNS Records at your Registrar (Namecheap, GoDaddy, Cloudflare):</span>
            </h4>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-blue-900 text-slate-400 font-mono text-[11px]">
                    <th className="py-1.5 px-2">Type</th>
                    <th className="py-1.5 px-2">Host / Name</th>
                    <th className="py-1.5 px-2">Target / Destination</th>
                    <th className="py-1.5 px-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-950/60 font-mono text-slate-200">
                  <tr>
                    <td className="py-2.5 px-2 text-cyan-400 font-bold">CNAME</td>
                    <td className="py-2.5 px-2 text-white">www</td>
                    <td className="py-2.5 px-2 text-slate-300 truncate max-w-[220px]">
                      ais-pre-hpegthtdnwwqivkbofxcbv-168595970634.asia-southeast1.run.app
                    </td>
                    <td className="py-2.5 px-2 text-right">
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText('ais-pre-hpegthtdnwwqivkbofxcbv-168595970634.asia-southeast1.run.app');
                          setCopiedTarget(true);
                          setTimeout(() => setCopiedTarget(false), 2000);
                        }}
                        className="p-1 px-2 rounded bg-blue-950 hover:bg-blue-900 text-cyan-300 text-[10px] border border-blue-800 transition-colors inline-flex items-center gap-1"
                      >
                        {copiedTarget ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedTarget ? 'Copied' : 'Copy'}</span>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-2 text-cyan-400 font-bold">A / Forward</td>
                    <td className="py-2.5 px-2 text-white">@ (root)</td>
                    <td className="py-2.5 px-2 text-slate-300">
                      Redirect 301 to https://www.aicraftweb.com
                    </td>
                    <td className="py-2.5 px-2 text-right">
                      <span className="text-[10px] text-slate-500 font-sans">Automatic</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-blue-900/60">
              <span>SSL/TLS: 256-bit automated encryption handled seamlessly.</span>
              <a
                href="https://www.aicraftweb.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
              >
                <span>Visit www.aicraftweb.com</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </form>
      </div>

      {/* Card 4: System Reset & Seed Data */}
      <div className="rounded-2xl bg-[#091226] border border-blue-900/60 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-white mb-1">Restore Default Orders & Services</h4>
          <p className="text-xs text-slate-400">
            Resets orders to the initial 8-10 sample orders and restores standard pricing plans.
          </p>
        </div>
        <button
          onClick={() => {
            if (window.confirm('Reset all localStorage data to initial 9 orders and default services?')) {
              onResetToDemoData();
            }
          }}
          className="px-4 py-2.5 rounded-xl text-xs font-semibold text-rose-300 hover:text-white bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/60 flex items-center gap-2 transition-all whitespace-nowrap"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Demo Data</span>
        </button>
      </div>
    </div>
  );
};
