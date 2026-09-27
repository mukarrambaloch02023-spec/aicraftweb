import React, { useState } from 'react';
import { Lock, KeyRound, AlertCircle, ArrowRight, ShieldCheck, X } from 'lucide-react';
import { Logo } from '../common/Logo';

interface AdminLoginModalProps {
  onSuccess: () => void;
  onClose: () => void;
  correctPasscode: string;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  onSuccess,
  onClose,
  correctPasscode,
}) => {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === correctPasscode) {
      setError('');
      onSuccess();
    } else {
      setError('Access Denied: Invalid security passcode.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070D1F]/90 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-md rounded-3xl bg-[#0A1122] border-2 border-blue-500/40 p-6 sm:p-8 shadow-[0_0_50px_rgba(0,136,255,0.4)] text-center">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/40 flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(0,136,255,0.3)]">
            <Lock className="w-7 h-7" />
          </div>
        </div>

        <h3 className="text-2xl font-black text-white tracking-tight mb-1">
          Owner Control Panel
        </h3>
        <p className="text-xs text-slate-400 mb-6">
          Private administrative interface for Mukarram Ali
        </p>

        <form onSubmit={handleLogin} className="space-y-4 text-left">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
              Security Passcode
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-cyan-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setError('');
                }}
                placeholder="Enter security passcode..."
                autoFocus
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#070D1F] border border-blue-900 focus:border-cyan-400 text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-400 font-mono text-sm"
              />
            </div>
            {error && (
              <p className="text-xs text-rose-400 mt-2 flex items-center gap-1.5 font-medium">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </p>
            )}
          </div>

          <div className="p-3 rounded-xl bg-[#070D1F] border border-blue-950/80 text-[11px] text-slate-400 font-mono flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <span>Encrypted zero-trust authorization active</span>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 to-[#0088FF] hover:opacity-95 shadow-[0_0_20px_rgba(0,136,255,0.5)] flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Authenticate & Access</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
