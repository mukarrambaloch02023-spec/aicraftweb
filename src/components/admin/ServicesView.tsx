import React, { useState } from 'react';
import { Layers, Plus, Edit2, Trash2, Check, Star, X } from 'lucide-react';
import { ServicePackage } from '../../types';
import { formatCurrencyPKR } from '../../utils/security';

interface ServicesViewProps {
  services: ServicePackage[];
  onUpdateServices: (services: ServicePackage[]) => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({ services, onUpdateServices }) => {
  const [editingPkg, setEditingPkg] = useState<ServicePackage | null>(null);
  const [isNew, setIsNew] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [price, setPrice] = useState(15000);
  const [tagline, setTagline] = useState('');
  const [pages, setPages] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('3-5 Days');
  const [featuresText, setFeaturesText] = useState('');
  const [isPopular, setIsPopular] = useState(false);

  const openNewPackageModal = () => {
    setIsNew(true);
    setEditingPkg({
      id: `srv-${Date.now()}`,
      name: '',
      price: 15000,
      tagline: '',
      pages: '',
      deliveryTime: '3 Days',
      features: [],
      isPopular: false,
    });
    setName('');
    setPrice(15000);
    setTagline('');
    setPages('');
    setDeliveryTime('3 Days');
    setFeaturesText('Astra Pro Theme Setup\nSpeed Optimization\nWhatsApp Live Chat\nSecurity Hardening');
    setIsPopular(false);
  };

  const openEditModal = (pkg: ServicePackage) => {
    setIsNew(false);
    setEditingPkg(pkg);
    setName(pkg.name);
    setPrice(pkg.price);
    setTagline(pkg.tagline);
    setPages(pkg.pages);
    setDeliveryTime(pkg.deliveryTime);
    setFeaturesText(pkg.features.join('\n'));
    setIsPopular(!!pkg.isPopular);
  };

  const handleDelete = (pkgId: string) => {
    if (services.length <= 1) {
      alert('You must have at least one service package available.');
      return;
    }
    if (window.confirm('Delete this service package?')) {
      const updated = services.filter((s) => s.id !== pkgId);
      onUpdateServices(updated);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;

    const featureList = featuresText
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    const savedPackage: ServicePackage = {
      id: editingPkg ? editingPkg.id : `srv-${Date.now()}`,
      name,
      price: Number(price),
      tagline,
      pages,
      deliveryTime,
      features: featureList,
      isPopular,
    };

    let updated: ServicePackage[];
    if (isNew) {
      updated = [...services, savedPackage];
    } else {
      updated = services.map((s) => (s.id === savedPackage.id ? savedPackage : s));
    }

    onUpdateServices(updated);
    setEditingPkg(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#091226] border border-blue-900/60 p-5 rounded-2xl shadow-lg">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Services & Pricing Packages
          </h2>
          <p className="text-xs text-slate-400">
            Changes made here update the public pricing tables and package calculators instantly.
          </p>
        </div>

        <button
          onClick={openNewPackageModal}
          className="px-4 py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-cyan-400 to-[#0088FF] hover:opacity-95 shadow-[0_0_15px_rgba(0,136,255,0.4)] flex items-center justify-center gap-1.5 cursor-pointer self-start md:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add New Package</span>
        </button>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((pkg) => (
          <div
            key={pkg.id}
            className={`rounded-2xl p-6 flex flex-col justify-between transition-all ${
              pkg.isPopular
                ? 'bg-[#0D1C3D] border-2 border-cyan-400 shadow-[0_0_30px_rgba(0,136,255,0.3)]'
                : 'bg-[#091226] border border-blue-500/20'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-black text-white flex items-center gap-1.5">
                  {pkg.name}
                  {pkg.isPopular && <Star className="w-4 h-4 text-cyan-400 fill-cyan-400" />}
                </span>
                <span className="text-[10px] font-mono text-cyan-300 bg-blue-950 px-2 py-0.5 rounded border border-blue-800">
                  {pkg.deliveryTime}
                </span>
              </div>

              <div className="text-3xl font-black text-white mb-1 tabular-nums">
                {formatCurrencyPKR(pkg.price)}
              </div>
              <div className="text-xs text-cyan-400 font-semibold mb-3">
                {pkg.pages}
              </div>

              <p className="text-xs text-slate-300 mb-4 min-h-[32px]">
                {pkg.tagline}
              </p>

              {/* Features list */}
              <div className="space-y-1.5 border-t border-blue-900/50 pt-3 mb-6">
                {pkg.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                    <Check className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-4 border-t border-blue-900/50">
              <button
                onClick={() => openEditModal(pkg)}
                className="flex-1 py-2 px-3 rounded-lg text-xs font-semibold bg-[#0A1633] hover:bg-[#132554] border border-blue-800 text-cyan-300 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Package</span>
              </button>

              <button
                onClick={() => handleDelete(pkg.id)}
                className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-[#0A1633] border border-blue-900/50 transition-colors"
                title="Delete Package"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Package Edit/Add Modal */}
      {editingPkg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070D1F]/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#0A1122] border-2 border-cyan-400/60 p-6 shadow-2xl text-left max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-blue-900/60 pb-3 mb-4">
              <h3 className="text-lg font-bold text-white">
                {isNew ? 'Create New Service Package' : `Edit Package: ${editingPkg.name}`}
              </h3>
              <button onClick={() => setEditingPkg(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1">Package Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Standard"
                    className="w-full px-3 py-2 rounded-xl bg-[#070D1F] border border-blue-900 text-white font-sans text-xs"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Price in PKR (Rs.) *</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#070D1F] border border-blue-900 text-white font-mono text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Pages Scope</label>
                <input
                  type="text"
                  value={pages}
                  onChange={(e) => setPages(e.target.value)}
                  placeholder="e.g. 5 Pages (Home, About, Services, Portfolio, Contact)"
                  className="w-full px-3 py-2 rounded-xl bg-[#070D1F] border border-blue-900 text-white font-sans text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1">Delivery SLA</label>
                  <input
                    type="text"
                    value={deliveryTime}
                    onChange={(e) => setDeliveryTime(e.target.value)}
                    placeholder="e.g. 4 Days"
                    className="w-full px-3 py-2 rounded-xl bg-[#070D1F] border border-blue-900 text-white font-mono text-xs"
                  />
                </div>
                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isPopular}
                      onChange={(e) => setIsPopular(e.target.checked)}
                      className="rounded border-blue-600 text-cyan-400 bg-slate-900 w-4 h-4"
                    />
                    <span className="text-white font-sans">Highlight as "Most Popular"</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Short Tagline</label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="e.g. Best for growing businesses needing full presence"
                  className="w-full px-3 py-2 rounded-xl bg-[#070D1F] border border-blue-900 text-white font-sans text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">
                  Features (One per line) *
                </label>
                <textarea
                  rows={5}
                  required
                  value={featuresText}
                  onChange={(e) => setFeaturesText(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#070D1F] border border-blue-900 text-white font-mono text-xs leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-blue-900">
                <button
                  type="button"
                  onClick={() => setEditingPkg(null)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white font-sans"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-[#0088FF] font-sans"
                >
                  Save Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
