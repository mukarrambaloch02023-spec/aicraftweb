import React, { useState } from 'react';
import { Users, Search, Plus, MessageCircle, ExternalLink, X, Mail, Phone, Building } from 'lucide-react';
import { Client } from '../../types';
import { formatCurrencyPKR, sanitizeInput } from '../../utils/security';

interface ClientsViewProps {
  clients: Client[];
  onUpdateClients: (clients: Client[]) => void;
}

export const ClientsView: React.FC<ClientsViewProps> = ({ clients, onUpdateClients }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [company, setCompany] = useState('');

  const filteredClients = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.whatsapp.includes(searchTerm) ||
      (c.company && c.company.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !whatsapp) return;

    const newClient: Client = {
      id: `cl-${Date.now()}`,
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      whatsapp: sanitizeInput(whatsapp),
      company: sanitizeInput(company),
      totalOrders: 1,
      totalSpent: 15000,
      joinedDate: new Date().toISOString().split('T')[0],
    };

    onUpdateClients([newClient, ...clients]);
    setShowAddModal(false);
    setName('');
    setEmail('');
    setWhatsapp('');
    setCompany('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#091226] border border-blue-900/60 p-5 rounded-2xl shadow-lg">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Clients Management
          </h2>
          <p className="text-xs text-slate-400">
            {clients.length} business relationships & corporate accounts
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-cyan-400 to-[#0088FF] hover:opacity-95 shadow-[0_0_15px_rgba(0,136,255,0.4)] flex items-center justify-center gap-1.5 cursor-pointer self-start md:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add Client</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        <input
          type="text"
          placeholder="Search clients by name, email, phone, or company..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#091226] border border-blue-900/80 focus:border-cyan-400 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 font-mono"
        />
      </div>

      {/* Clients Table */}
      <div className="rounded-2xl bg-[#091226] border border-blue-500/20 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-blue-900/60 text-slate-400 uppercase tracking-wider font-mono bg-[#070E20]">
                <th className="py-3 px-4">Client Name</th>
                <th className="py-3 px-4">Company / Brand</th>
                <th className="py-3 px-4">Email Address</th>
                <th className="py-3 px-4">WhatsApp Number</th>
                <th className="py-3 px-4">Total Orders</th>
                <th className="py-3 px-4">Total Invoiced</th>
                <th className="py-3 px-4 text-right">Quick Contact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-950/60">
              {filteredClients.map((client) => {
                const waClean = client.whatsapp.replace(/[^0-9]/g, '');
                return (
                  <tr key={client.id} className="hover:bg-[#0E1A38] transition-colors">
                    <td className="py-3.5 px-4 font-bold text-white">
                      {client.name}
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">
                      {client.company || '—'}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-400">
                      {client.email}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-medium text-emerald-400">
                      {client.whatsapp}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-center sm:text-left text-white tabular-nums">
                      {client.totalOrders}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-cyan-300 tabular-nums">
                      {formatCurrencyPKR(client.totalSpent)}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <a
                        href={`https://wa.me/${waClean}?text=${encodeURIComponent(
                          `Hello ${client.name}! Mukarram Ali from AiCraftWeb here. Hope your website is running blazing fast!`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/20 text-[11px] font-bold transition-all"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Chat</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Client Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070D1F]/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-md rounded-3xl bg-[#0A1122] border-2 border-cyan-400/60 p-6 shadow-2xl text-left">
            <div className="flex items-center justify-between border-b border-blue-900/60 pb-3 mb-4">
              <h3 className="text-lg font-bold text-white">Add New Client Account</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddClient} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-slate-400 mb-1">Client Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#070D1F] border border-blue-900 text-white font-sans text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Company / Brand</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#070D1F] border border-blue-900 text-white font-sans text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">WhatsApp Number *</label>
                <input
                  type="text"
                  required
                  placeholder="+92 300 1234567"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#070D1F] border border-blue-900 text-white font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#070D1F] border border-blue-900 text-white font-mono text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-blue-900">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white font-sans"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-[#0088FF] font-sans"
                >
                  Add Client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
