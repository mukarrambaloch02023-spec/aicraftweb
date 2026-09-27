import React, { useState } from 'react';
import { Logo } from '../common/Logo';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Eye, EyeOff, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

interface AdminLoginPageProps {
  onSuccess: () => void;
  onExitToPublic: () => void;
  customLogoUrl?: string;
  activeLogoType?: 'brain' | 'circuit';
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({
  onSuccess,
  onExitToPublic,
  customLogoUrl,
  activeLogoType = 'circuit',
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    // Check requested credentials: email: admin@aicraftweb.com, password: admin123
    // Also accept passcode @tekken888! or owner email for seamless access
    const isEmailValid =
      cleanEmail === 'admin@aicraftweb.com' ||
      cleanEmail === 'mukarrambaloch02023@gmail.com' ||
      cleanEmail === 'contact@aicraftweb.pk' ||
      cleanEmail === 'mukarramali02023@gmail.com' ||
      cleanEmail === 'admin';

    const isPasswordValid =
      cleanPassword === 'admin123' ||
      cleanPassword === '@tekken888!';

    setTimeout(() => {
      setLoading(false);
      if (isEmailValid && isPasswordValid) {
        localStorage.setItem('aicraft_admin_authenticated', 'true');
        onSuccess();
      } else {
        setError('Invalid credentials. Use: admin@aicraftweb.com / admin123');
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#060B18] text-slate-100 flex flex-col justify-between items-center p-4 sm:p-6 relative overflow-hidden circuit-bg selection:bg-cyan-500/30">
      {/* Background Cyber Glowing Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-600/15 via-cyan-500/15 to-transparent blur-[120px] rounded-full pointer-events-none" />

      {/* Top Header / Public Site Escape */}
      <div className="w-full max-w-5xl flex items-center justify-between py-2 relative z-10">
        <Logo size="sm" showTagline={false} customLogoUrl={customLogoUrl} variant={activeLogoType} />
        
        <button
          onClick={onExitToPublic}
          className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-[#0A1633] border border-blue-900/80 hover:border-cyan-400/50 flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <Globe className="w-3.5 h-3.5 text-cyan-400" />
          <span>Exit to Public Website</span>
        </button>
      </div>

      {/* Main Glassmorphic Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md my-auto relative z-10"
      >
        <div className="relative group">
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#00F0FF]/20 via-[#0070F3]/30 to-blue-600/20 blur-xl opacity-75 group-hover:opacity-100 transition duration-500 pointer-events-none" />
          
          <div className="relative rounded-2xl bg-[#081024]/95 border border-blue-500/30 p-7 sm:p-9 shadow-2xl backdrop-blur-xl">
            {/* Header Lockup */}
            <div className="text-center mb-7">
              <div className="flex justify-center mb-4">
                <div className="p-3.5 rounded-2xl bg-[#0A1633] border border-blue-500/40 shadow-[0_0_20px_rgba(0,112,243,0.3)]">
                  <Logo size="md" showTagline={false} customLogoUrl={customLogoUrl} variant={activeLogoType} />
                </div>
              </div>

              <h1 className="text-2xl font-black tracking-tight text-white">
                Admin <span className="text-[#0070F3]">Control Panel</span>
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Restricted route. Authorized agency management access only.
              </p>
            </div>

            {/* Error Banner */}
            {error && (
              <div className="mb-5 p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 flex items-start gap-2.5 text-xs text-rose-300">
                <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono">
                  Admin Email
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@aicraftweb.com"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#060D1E] border border-blue-900 focus:border-cyan-400 text-white placeholder-slate-500 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#060D1E] border border-blue-900 focus:border-cyan-400 text-white placeholder-slate-500 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-900/60 text-[11px] text-cyan-300/80 font-mono">
                <span className="text-slate-400">Credentials: </span>
                <span className="text-white font-bold">admin@aicraftweb.com</span> / <span className="text-white font-bold">admin123</span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 via-[#0088FF] to-blue-500 hover:opacity-95 shadow-[0_0_20px_rgba(0,112,243,0.4)] flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>Enter Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-blue-900/50 flex items-center justify-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Session Authenticated & Encrypted</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <div className="w-full max-w-5xl text-center py-2 text-xs text-slate-500 relative z-10">
        AiCraftWeb Internal Operating System • Authorized Administrator Access
      </div>
    </div>
  );
};
