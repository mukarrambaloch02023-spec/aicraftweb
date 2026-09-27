import React, { useState } from 'react';
import { Search, Filter, Plus, Trash2, CheckCircle2, Eye, Edit3, MessageCircle, AlertCircle, X, ExternalLink, FileSpreadsheet, RefreshCw } from 'lucide-react';
import { Order, OrderStatus, AdminSettings } from '../../types';
import { formatCurrencyPKR, sanitizeInput } from '../../utils/security';
import { getStoredSheetId, fetchOrdersFromGoogleSheet, appendOrderToGoogleSheet } from '../../utils/googleSheets';
import { googleSignIn, getAccessToken } from '../../utils/googleAuth';

interface OrdersViewProps {
  orders: Order[];
  settings: AdminSettings;
  onUpdateOrders: (orders: Order[]) => void;
  selectedOrderForModal: Order | null;
  onCloseOrderModal: () => void;
  onOpenOrderModal: (order: Order) => void;
}

export const OrdersView: React.FC<OrdersViewProps> = ({
  orders,
  settings,
  onUpdateOrders,
  selectedOrderForModal,
  onCloseOrderModal,
  onOpenOrderModal,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | OrderStatus>('All');
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);
  const [isSyncingSheet, setIsSyncingSheet] = useState(false);
  const [sheetStatus, setSheetStatus] = useState<string | null>(null);

  const handleSyncGoogleSheet = async () => {
    setIsSyncingSheet(true);
    setSheetStatus(null);
    try {
      let token = await getAccessToken();
      if (!token) {
        const res = await googleSignIn();
        token = res?.accessToken || null;
      }
      if (!token) {
        setSheetStatus('Google Sign In required to sync.');
        return;
      }

      const currentSheetId = getStoredSheetId();
      if (!currentSheetId) {
        setSheetStatus('No Google Sheet linked. Open Admin panel on homepage (?admin=true) to link one.');
        return;
      }

      const fetched = await fetchOrdersFromGoogleSheet(token, currentSheetId);
      if (fetched.length > 0) {
        const mergedMap = new Map<string, Order>();
        orders.forEach((o) => mergedMap.set(String(o.id), o));
        fetched.forEach((o) => mergedMap.set(String(o.id), o));
        const mergedList = Array.from(mergedMap.values());
        onUpdateOrders(mergedList);
        setSheetStatus(`Synced ${fetched.length} orders from Google Sheet!`);
      } else {
        setSheetStatus('Google Sheet is connected (0 rows).');
      }
    } catch (e: any) {
      console.error('Sync failed:', e);
      setSheetStatus(`Sync error: ${e.message || 'Check Google Sheet'}`);
    } finally {
      setIsSyncingSheet(false);
    }
  };

  // New Order Form state
  const [newClientName, setNewClientName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newWhatsapp, setNewWhatsapp] = useState('');
  const [newRequirement, setNewRequirement] = useState('');
  const [newService, setNewService] = useState('Standard');
  const [newPrice, setNewPrice] = useState(15000);

  // Filtered orders
  const filteredOrders = orders.filter((order) => {
    const idStr = String(order.id || '');
    const clientNameStr = (order.clientName || order.name || '').toLowerCase();
    const emailStr = (order.email || '').toLowerCase();
    const phoneStr = String(order.whatsapp || order.phone || '');

    const matchesSearch =
      idStr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clientNameStr.includes(searchTerm.toLowerCase()) ||
      emailStr.includes(searchTerm.toLowerCase()) ||
      phoneStr.includes(searchTerm);

    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Action: Change Status Directly
  const handleStatusChange = (orderId: string | number, newStatus: OrderStatus) => {
    const updated = orders.map((o) => (String(o.id) === String(orderId) ? { ...o, status: newStatus } : o));
    onUpdateOrders(updated);
  };

  // Action: Mark Complete
  const handleMarkComplete = (orderId: string | number) => {
    handleStatusChange(orderId, 'Completed');
  };

  // Action: Delete Order
  const handleDeleteOrder = (orderId: string | number) => {
    if (window.confirm(`Are you sure you want to delete order ${orderId}?`)) {
      const updated = orders.filter((o) => String(o.id) !== String(orderId));
      onUpdateOrders(updated);
    }
  };

  // Action: Save Edit
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingOrder) return;
    const updated = orders.map((o) => (String(o.id) === String(editingOrder.id) ? editingOrder : o));
    onUpdateOrders(updated);
    setEditingOrder(null);
  };

  // Action: Create New Order Manually
  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName || !newWhatsapp) return;

    const newOrder: Order = {
      id: `ACW-${Math.floor(1000 + Math.random() * 9000)}`,
      clientName: sanitizeInput(newClientName),
      email: sanitizeInput(newEmail),
      whatsapp: sanitizeInput(newWhatsapp),
      requirement: sanitizeInput(newRequirement || 'Custom order recorded in Admin Panel'),
      serviceType: newService,
      baseBudget: Number(newPrice),
      totalPrice: Number(newPrice),
      addons: {
        domain: false,
        management: false,
        runAds: false,
        createAdDesigns: false,
      },
      status: 'Pending',
      date: new Date().toISOString().split('T')[0],
      notes: 'Added manually via admin interface',
    };

    onUpdateOrders([newOrder, ...orders]);
    setShowNewOrderModal(false);
    // Reset
    setNewClientName('');
    setNewEmail('');
    setNewWhatsapp('');
    setNewRequirement('');
    setNewPrice(15000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header & Search/Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#091226] border border-blue-900/60 p-5 rounded-2xl shadow-lg">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Orders Management
          </h2>
          <p className="text-xs text-slate-400">
            Total {orders.length} orders recorded in system
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={handleSyncGoogleSheet}
            disabled={isSyncingSheet}
            className="px-3.5 py-2.5 rounded-xl font-bold text-xs text-emerald-300 bg-emerald-950/80 hover:bg-emerald-900/80 border border-emerald-500/50 shadow-md flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
            title="Fetch and sync orders from connected Google Sheet"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>{isSyncingSheet ? 'Syncing...' : 'Sync Google Sheet'}</span>
          </button>

          <button
            onClick={() => setShowNewOrderModal(true)}
            className="px-4 py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-cyan-400 to-[#0088FF] hover:opacity-95 shadow-[0_0_15px_rgba(0,136,255,0.4)] flex items-center justify-center gap-1.5 cursor-pointer self-start md:self-auto"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>New Order</span>
          </button>
        </div>
      </div>

      {sheetStatus && (
        <div className="p-3 rounded-xl bg-blue-950/80 border border-cyan-500/40 text-xs font-mono text-cyan-300 flex items-center justify-between">
          <span>{sheetStatus}</span>
          <button onClick={() => setSheetStatus(null)} className="text-slate-400 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by Order ID, Client Name, Email, or WhatsApp..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#091226] border border-blue-900/80 focus:border-cyan-400 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all font-mono"
          />
        </div>

        {/* Status Filter Segmented Buttons */}
        <div className="flex items-center gap-1 p-1 bg-[#091226] rounded-xl border border-blue-900/60 overflow-x-auto">
          {(['All', 'New', 'Pending', 'In Progress', 'Completed'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                statusFilter === status
                  ? 'bg-blue-600 text-white shadow-[0_0_12px_rgba(0,136,255,0.5)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-2xl bg-[#091226] border border-blue-500/20 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-blue-900/60 text-slate-400 uppercase tracking-wider font-mono bg-[#070E20]">
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Client Name</th>
                <th className="py-3 px-4">Service</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-950/60">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    No orders match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((ord) => {
                  const statusColors: Record<string, string> = {
                    New: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40',
                    Pending: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
                    'In Progress': 'bg-blue-500/10 text-blue-400 border-blue-500/30',
                    Completed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
                  };

                  const clientDisplayName = ord.clientName || ord.name || 'Client';
                  const clientPhone = ord.whatsapp || ord.phone || 'N/A';
                  const orderPrice = ord.totalPrice ?? ord.budget ?? ord.baseBudget ?? 0;

                  return (
                    <tr key={String(ord.id)} className="hover:bg-[#0E1A38] transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-cyan-300">
                        {String(ord.id)}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-white">{clientDisplayName}</div>
                        <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                          <MessageCircle className="w-3 h-3 text-emerald-400" />
                          <span>{clientPhone}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-medium text-slate-200">{ord.serviceType || 'Standard'}</span>
                        {ord.addons && (ord.addons.domain || ord.addons.management || ord.addons.runAds || ord.addons.createAdDesigns) && (
                          <span className="ml-1.5 px-1.5 py-0.5 rounded text-[9px] bg-blue-950 text-cyan-400 border border-blue-800">
                            +Addons
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-white tabular-nums">
                        {formatCurrencyPKR(orderPrice)}
                      </td>
                      <td className="py-3.5 px-4">
                        <select
                          value={ord.status}
                          onChange={(e) => handleStatusChange(ord.id, e.target.value as OrderStatus)}
                          className={`px-2 py-1 rounded text-[11px] font-mono font-bold border bg-[#060D1E] cursor-pointer focus:outline-none transition-colors ${statusColors[ord.status] || statusColors.New}`}
                        >
                          <option value="New" className="bg-[#091226] text-cyan-300">New</option>
                          <option value="Pending" className="bg-[#091226] text-amber-400">Pending</option>
                          <option value="In Progress" className="bg-[#091226] text-blue-400">In Progress</option>
                          <option value="Completed" className="bg-[#091226] text-emerald-400">Completed</option>
                        </select>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-400">
                        {ord.date}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* View Details */}
                          <button
                            onClick={() => onOpenOrderModal(ord)}
                            title="View Details"
                            className="p-1.5 text-slate-300 hover:text-cyan-400 hover:bg-[#0A1633] rounded-lg transition-colors cursor-pointer"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* Edit */}
                          <button
                            onClick={() => setEditingOrder(ord)}
                            title="Edit Order"
                            className="p-1.5 text-slate-300 hover:text-blue-400 hover:bg-[#0A1633] rounded-lg transition-colors cursor-pointer"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          {/* Mark Complete */}
                          {ord.status !== 'Completed' && (
                            <button
                              onClick={() => handleMarkComplete(ord.id)}
                              title="Mark Complete"
                              className="p-1.5 text-slate-300 hover:text-emerald-400 hover:bg-[#0A1633] rounded-lg transition-colors cursor-pointer"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                            </button>
                          )}

                          {/* Delete */}
                          <button
                            onClick={() => handleDeleteOrder(ord.id)}
                            title="Delete Order"
                            className="p-1.5 text-slate-300 hover:text-rose-400 hover:bg-[#0A1633] rounded-lg transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* VIEW DETAILS MODAL */}
      {selectedOrderForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070D1F]/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-xl rounded-3xl bg-[#0A1122] border-2 border-cyan-400/80 p-6 sm:p-8 shadow-[0_0_50px_rgba(0,136,255,0.4)] text-left">
            <div className="flex items-center justify-between border-b border-blue-900/60 pb-4 mb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400">Order Specification</span>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span>{selectedOrderForModal.id}</span>
                  <span className="text-xs px-2 py-0.5 rounded font-mono bg-blue-950 text-slate-200 border border-blue-800">
                    {selectedOrderForModal.serviceType}
                  </span>
                </h3>
              </div>
              <button
                onClick={onCloseOrderModal}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Client Info Grid */}
              <div className="grid grid-cols-2 gap-3 bg-[#070D1F] p-4 rounded-xl border border-blue-950 font-mono">
                <div>
                  <span className="text-slate-500 block">Client:</span>
                  <span className="text-white font-bold">{selectedOrderForModal.clientName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Email:</span>
                  <span className="text-slate-200">{selectedOrderForModal.email}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">WhatsApp:</span>
                  <span className="text-emerald-400 font-bold">{selectedOrderForModal.whatsapp}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Order Date:</span>
                  <span className="text-slate-200">{selectedOrderForModal.date}</span>
                </div>
              </div>

              {/* Requirement Textarea Box */}
              <div>
                <span className="text-slate-400 font-semibold block mb-1">Website Requirement:</span>
                <div className="p-3.5 rounded-xl bg-[#070D1F] border border-blue-900/80 text-slate-200 leading-relaxed font-sans text-xs max-h-36 overflow-y-auto">
                  {selectedOrderForModal.requirement}
                </div>
              </div>

              {/* Selected Add-ons Itemization */}
              <div className="p-3.5 rounded-xl bg-[#070D1F] border border-blue-900/80 space-y-1.5 font-mono">
                <span className="text-cyan-400 font-bold block mb-1">Add-on Inclusions:</span>
                <div className="flex justify-between text-slate-300">
                  <span>Custom Domain Name:</span>
                  <span>{selectedOrderForModal.addons.domain ? 'Yes (+Rs. 10,000)' : 'No'}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Monthly Maintenance:</span>
                  <span>{selectedOrderForModal.addons.management ? 'Yes (+Rs. 30,000/mo)' : 'No'}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Run Ads Campaign:</span>
                  <span>{selectedOrderForModal.addons.runAds ? 'Yes (+Rs. 2,000)' : 'No'}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Create Ad Posts/Designs:</span>
                  <span>{selectedOrderForModal.addons.createAdDesigns ? 'Yes (+Rs. 2,000)' : 'No'}</span>
                </div>
                <div className="border-t border-blue-900 pt-2 flex justify-between font-bold text-sm text-white">
                  <span>Total Calculated:</span>
                  <span className="text-emerald-400">{formatCurrencyPKR(selectedOrderForModal.totalPrice ?? selectedOrderForModal.budget ?? 0)}</span>
                </div>
              </div>

              {/* WhatsApp direct reach-out */}
              <div className="pt-2 flex gap-3">
                <a
                  href={`https://wa.me/${(selectedOrderForModal.whatsapp || selectedOrderForModal.phone || '').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `Hello ${selectedOrderForModal.clientName || selectedOrderForModal.name || 'Client'}! This is Mukarram Ali from AiCraftWeb regarding your website order ${selectedOrderForModal.id}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:opacity-95 shadow-[0_0_20px_rgba(52,211,153,0.4)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-slate-950" />
                  <span>Chat with Client on WhatsApp</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                {selectedOrderForModal.status !== 'Completed' && (
                  <button
                    onClick={() => {
                      handleMarkComplete(selectedOrderForModal.id);
                      onCloseOrderModal();
                    }}
                    className="px-4 py-3 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 border border-blue-400"
                  >
                    Mark Complete
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EDIT ORDER MODAL */}
      {editingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070D1F]/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-md rounded-3xl bg-[#0A1122] border-2 border-blue-500/50 p-6 shadow-2xl text-left">
            <div className="flex items-center justify-between border-b border-blue-900/60 pb-3 mb-4">
              <h3 className="text-lg font-bold text-white">Edit Order {editingOrder.id}</h3>
              <button onClick={() => setEditingOrder(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-slate-400 mb-1">Status:</label>
                <select
                  value={editingOrder.status}
                  onChange={(e) => setEditingOrder({ ...editingOrder, status: e.target.value as OrderStatus })}
                  className="w-full px-3 py-2 rounded-xl bg-[#070D1F] border border-blue-900 text-white"
                >
                  <option value="New">New</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Total Price (Rs.):</label>
                <input
                  type="number"
                  value={editingOrder.totalPrice}
                  onChange={(e) => setEditingOrder({ ...editingOrder, totalPrice: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl bg-[#070D1F] border border-blue-900 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Developer Notes:</label>
                <textarea
                  rows={3}
                  value={editingOrder.notes || ''}
                  onChange={(e) => setEditingOrder({ ...editingOrder, notes: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#070D1F] border border-blue-900 text-white font-sans text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingOrder(null)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* NEW ORDER MODAL */}
      {showNewOrderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070D1F]/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#0A1122] border-2 border-cyan-400/60 p-6 shadow-2xl text-left">
            <div className="flex items-center justify-between border-b border-blue-900/60 pb-3 mb-4">
              <h3 className="text-lg font-bold text-white">Record Manual Order</h3>
              <button onClick={() => setShowNewOrderModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateOrder} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1 font-mono">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#070D1F] border border-blue-900 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-mono">WhatsApp Number *</label>
                  <input
                    type="text"
                    required
                    value={newWhatsapp}
                    onChange={(e) => setNewWhatsapp(e.target.value)}
                    placeholder="+92 300 0000000"
                    className="w-full px-3 py-2 rounded-xl bg-[#070D1F] border border-blue-900 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-mono">Email Address</label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#070D1F] border border-blue-900 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1 font-mono">Service Tier</label>
                  <select
                    value={newService}
                    onChange={(e) => setNewService(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#070D1F] border border-blue-900 text-white"
                  >
                    <option value="Basic">Basic (Rs. 5,000)</option>
                    <option value="Standard">Standard (Rs. 15,000)</option>
                    <option value="Premium">Premium (Rs. 25,000)</option>
                    <option value="Custom Enterprise">Custom Enterprise</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-mono">Agreed Price (Rs.)</label>
                  <input
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#070D1F] border border-blue-900 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-mono">Requirement Notes</label>
                <textarea
                  rows={3}
                  value={newRequirement}
                  onChange={(e) => setNewRequirement(e.target.value)}
                  placeholder="Website scope agreed over phone or WhatsApp..."
                  className="w-full px-3 py-2 rounded-xl bg-[#070D1F] border border-blue-900 text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-blue-900">
                <button
                  type="button"
                  onClick={() => setShowNewOrderModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-[#0088FF]"
                >
                  Save Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
