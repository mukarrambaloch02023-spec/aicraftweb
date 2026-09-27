import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  ShoppingBag,
  Clock,
  CheckCircle2,
  Trash2,
  Eye,
  RefreshCw,
  Search,
  MessageCircle,
  ExternalLink,
  ChevronDown,
  X,
  FileText,
  AlertCircle,
  Download,
  FileSpreadsheet,
  UploadCloud,
  Check,
  Copy,
  Settings,
  HelpCircle,
  Link as LinkIcon,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { User } from 'firebase/auth';
import { Order, OrderStatus } from '../../types';
import { formatCurrencyPKR } from '../../utils/security';
import { getStoredOrders, saveOrders } from '../../utils/storage';
import {
  initAuth,
  googleSignIn,
  logoutGoogle,
  getAccessToken,
} from '../../utils/googleAuth';
import {
  createOrdersSpreadsheet,
  fetchOrdersFromGoogleSheet,
  appendOrderToGoogleSheet,
  updateOrderStatusInGoogleSheet,
  getStoredSheetId,
  saveStoredSheetId,
  getStoredWebhookUrl,
  saveStoredWebhookUrl,
  GOOGLE_APPS_SCRIPT_TEMPLATE,
} from '../../utils/googleSheets';

interface SinglePageAdminProps {
  onOrderUpdated?: (orders: Order[]) => void;
}

export const SinglePageAdminSection: React.FC<SinglePageAdminProps> = ({ onOrderUpdated }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'New' | 'Pending' | 'In Progress' | 'Completed'>('All');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [lastRefreshed, setLastRefreshed] = useState<string>('');

  // Google OAuth & Sheets State
  const [googleUser, setGoogleUser] = useState<User | null>(null);
  const [googleToken, setGoogleToken] = useState<string | null>(null);
  const [isSigningInGoogle, setIsSigningInGoogle] = useState(false);
  const [sheetId, setSheetId] = useState<string>('');
  const [webhookUrl, setWebhookUrl] = useState<string>('');
  const [isCreatingSheet, setIsCreatingSheet] = useState(false);
  const [isFetchingSheet, setIsFetchingSheet] = useState(false);
  const [isSyncingAll, setIsSyncingAll] = useState(false);
  const [sheetStatusMsg, setSheetStatusMsg] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);
  const [customSheetInput, setCustomSheetInput] = useState('');

  // Load orders directly from localStorage key "aicraft_orders"
  const loadOrders = () => {
    try {
      const raw = localStorage.getItem('aicraft_orders') || localStorage.getItem('aicraftweb_orders_v1');
      if (raw) {
        const parsed: Order[] = JSON.parse(raw);
        setOrders(parsed);
      } else {
        const initial = getStoredOrders();
        setOrders(initial);
      }
      setLastRefreshed(new Date().toLocaleTimeString());
    } catch (e) {
      console.error('Error loading orders from localStorage:', e);
    }
  };

  useEffect(() => {
    loadOrders();
    setSheetId(getStoredSheetId());
    setWebhookUrl(getStoredWebhookUrl());

    // Initialize Auth state listener
    const unsubscribe = initAuth(
      (user, token) => {
        setGoogleUser(user);
        setGoogleToken(token);
      },
      () => {
        setGoogleUser(null);
        setGoogleToken(null);
      }
    );

    const handleStorageEvent = () => {
      loadOrders();
      setSheetId(getStoredSheetId());
      setWebhookUrl(getStoredWebhookUrl());
    };

    window.addEventListener('storage', handleStorageEvent);
    return () => {
      unsubscribe();
      window.removeEventListener('storage', handleStorageEvent);
    };
  }, []);

  // Sign In with Google
  const handleGoogleSignIn = async () => {
    setIsSigningInGoogle(true);
    setSheetStatusMsg(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setGoogleUser(result.user);
        setGoogleToken(result.accessToken);
        setSheetStatusMsg({ type: 'success', text: `Connected Google Account: ${result.user.email}` });
      }
    } catch (err: any) {
      console.error('Google Sign In failed:', err);
      setSheetStatusMsg({ type: 'error', text: err.message || 'Google Sign-in failed. Please try again.' });
    } finally {
      setIsSigningInGoogle(false);
    }
  };

  // Sign out from Google
  const handleGoogleSignOut = async () => {
    try {
      await logoutGoogle();
      setGoogleUser(null);
      setGoogleToken(null);
      setSheetStatusMsg({ type: 'info', text: 'Signed out from Google Account.' });
    } catch (e: any) {
      console.error('Sign out error:', e);
    }
  };

  // Create new Google Sheet
  const handleCreateSheet = async () => {
    if (!googleToken) {
      setSheetStatusMsg({ type: 'error', text: 'Please sign in with Google first.' });
      return;
    }
    setIsCreatingSheet(true);
    setSheetStatusMsg(null);
    try {
      const newSheet = await createOrdersSpreadsheet(googleToken);
      setSheetId(newSheet.id);
      saveStoredSheetId(newSheet.id);

      // Immediately sync existing orders to it
      if (orders.length > 0) {
        for (const ord of orders) {
          await appendOrderToGoogleSheet(googleToken, newSheet.id, ord);
        }
      }

      setSheetStatusMsg({
        type: 'success',
        text: `New Google Sheet created and populated with ${orders.length} orders!`,
      });
    } catch (err: any) {
      console.error('Error creating Google Sheet:', err);
      setSheetStatusMsg({ type: 'error', text: err.message || 'Failed to create Google Sheet.' });
    } finally {
      setIsCreatingSheet(false);
    }
  };

  // Fetch orders from Google Sheet
  const handleFetchOrdersFromSheet = async () => {
    if (!googleToken) {
      setSheetStatusMsg({ type: 'error', text: 'Please sign in with Google first to fetch orders.' });
      return;
    }
    const currentSheetId = sheetId || getStoredSheetId();
    if (!currentSheetId) {
      setSheetStatusMsg({ type: 'error', text: 'No Google Sheet connected. Click "Create Sheet" or paste an ID.' });
      return;
    }

    setIsFetchingSheet(true);
    setSheetStatusMsg(null);
    try {
      const sheetOrders = await fetchOrdersFromGoogleSheet(googleToken, currentSheetId);
      if (sheetOrders.length === 0) {
        setSheetStatusMsg({ type: 'info', text: 'Google Sheet is connected, but has 0 order rows yet.' });
      } else {
        // Merge with existing local orders by id
        const mergedMap = new Map<string, Order>();
        // Add local orders first
        orders.forEach((o) => mergedMap.set(String(o.id), o));
        // Overwrite or append with sheet orders (as source of truth)
        sheetOrders.forEach((o) => mergedMap.set(String(o.id), o));
        const mergedList = Array.from(mergedMap.values());

        setOrders(mergedList);
        saveOrders(mergedList);
        if (onOrderUpdated) onOrderUpdated(mergedList);

        setSheetStatusMsg({
          type: 'success',
          text: `Successfully fetched ${sheetOrders.length} orders from Google Sheet!`,
        });
      }
    } catch (err: any) {
      console.error('Fetch error:', err);
      setSheetStatusMsg({ type: 'error', text: err.message || 'Failed to fetch from Google Sheet.' });
    } finally {
      setIsFetchingSheet(false);
    }
  };

  // Sync all local orders to Google Sheet
  const handleSyncAllToSheet = async () => {
    if (!googleToken) {
      setSheetStatusMsg({ type: 'error', text: 'Please sign in with Google first.' });
      return;
    }
    const currentSheetId = sheetId || getStoredSheetId();
    if (!currentSheetId) {
      setSheetStatusMsg({ type: 'error', text: 'No Google Sheet connected.' });
      return;
    }

    setIsSyncingAll(true);
    setSheetStatusMsg(null);
    try {
      // Fetch existing IDs from sheet to avoid duplicate appends
      const existingSheetOrders = await fetchOrdersFromGoogleSheet(googleToken, currentSheetId);
      const existingIds = new Set(existingSheetOrders.map((o) => String(o.id)));

      let addedCount = 0;
      for (const ord of orders) {
        if (!existingIds.has(String(ord.id))) {
          await appendOrderToGoogleSheet(googleToken, currentSheetId, ord);
          addedCount++;
        }
      }

      setSheetStatusMsg({
        type: 'success',
        text: `Sync complete! Added ${addedCount} new orders to Google Sheet.`,
      });
    } catch (err: any) {
      console.error('Sync error:', err);
      setSheetStatusMsg({ type: 'error', text: err.message || 'Failed to sync to Google Sheet.' });
    } finally {
      setIsSyncingAll(false);
    }
  };

  // Save custom sheet ID or Webhook URL
  const handleSaveConfig = () => {
    if (customSheetInput.trim()) {
      let cleanId = customSheetInput.trim();
      // Extract ID if full URL was pasted: /spreadsheets/d/{ID}/
      const match = cleanId.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
      if (match && match[1]) {
        cleanId = match[1];
      }
      setSheetId(cleanId);
      saveStoredSheetId(cleanId);
    }
    if (webhookUrl.trim()) {
      saveStoredWebhookUrl(webhookUrl.trim());
    }
    setShowConfigModal(false);
    setSheetStatusMsg({ type: 'success', text: 'Google Sheet settings saved!' });
  };

  // Update order status (in LocalStorage + Google Sheet if connected)
  const handleStatusChange = async (orderId: string | number, newStatus: OrderStatus) => {
    const updated = orders.map((o) => (String(o.id) === String(orderId) ? { ...o, status: newStatus } : o));
    setOrders(updated);
    saveOrders(updated);
    if (onOrderUpdated) onOrderUpdated(updated);

    // If Google Sheet is connected and token available, update in sheet as well
    if (googleToken && sheetId) {
      updateOrderStatusInGoogleSheet(googleToken, sheetId, orderId, newStatus).catch((e) =>
        console.warn('Failed to update status in Google Sheet:', e)
      );
    }
  };

  // Delete an order
  const handleDeleteOrder = (orderId: string | number) => {
    if (window.confirm(`Are you sure you want to delete order ${orderId}?`)) {
      const updated = orders.filter((o) => String(o.id) !== String(orderId));
      setOrders(updated);
      saveOrders(updated);
      if (onOrderUpdated) onOrderUpdated(updated);
      if (selectedOrder && String(selectedOrder.id) === String(orderId)) {
        setSelectedOrder(null);
      }
    }
  };

  const copyScriptToClipboard = () => {
    navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_TEMPLATE);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2500);
  };

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    const idStr = String(order.id || '').toLowerCase();
    const nameStr = (order.clientName || order.name || '').toLowerCase();
    const phoneStr = String(order.whatsapp || order.phone || '');
    const reqStr = (order.requirement || '').toLowerCase();
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      idStr.includes(search) ||
      nameStr.includes(search) ||
      phoneStr.includes(search) ||
      reqStr.includes(search);

    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate metrics
  const totalOrdersCount = orders.length;
  const newOrPendingCount = orders.filter((o) => o.status === 'New' || o.status === 'Pending').length;
  const completedCount = orders.filter((o) => o.status === 'Completed').length;
  const totalRevenue = orders.reduce((sum, ord) => {
    const price = ord.totalPrice ?? ord.budget ?? ord.baseBudget ?? 0;
    return sum + (ord.status === 'Completed' || ord.status === 'In Progress' ? price : 0);
  }, 0);

  const statusStyles: Record<string, string> = {
    New: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50',
    Pending: 'bg-amber-500/10 text-amber-400 border-amber-500/40',
    'In Progress': 'bg-blue-500/10 text-blue-400 border-blue-500/40',
    Completed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/40',
  };

  return (
    <section
      id="admin-panel"
      className="py-16 bg-[#040814] border-t-4 border-cyan-500/80 relative z-20 text-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-blue-900/40 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/80 border border-cyan-500/40 text-xs font-mono text-cyan-400 mb-2">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>ADMIN CONTROL PANEL (?admin=true)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <span>Orders Management & Google Sheets Database</span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-950 border border-emerald-500/50 font-mono text-emerald-300 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Google Sheets Ready</span>
              </span>
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Customer orders are saved in both browser storage and your synced Google Sheet.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <a
              href="/aicraftweb-project.zip"
              download="aicraftweb-project.zip"
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs font-mono flex items-center gap-2 shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all cursor-pointer"
              title="Download clean project source code as ZIP"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download ZIP</span>
            </a>

            <button
              onClick={loadOrders}
              className="px-3.5 py-2 rounded-xl bg-[#0A1633] hover:bg-[#0E204A] border border-blue-700/60 text-xs font-mono text-cyan-300 flex items-center gap-2 transition-colors cursor-pointer"
              title="Reload orders from storage"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* GOOGLE SHEETS DATABASE INTEGRATION CARD */}
        <div className="my-6 rounded-2xl bg-gradient-to-r from-[#071329] via-[#0A1A3A] to-[#071329] border-2 border-emerald-500/40 p-5 sm:p-6 shadow-[0_0_35px_rgba(16,185,129,0.15)] relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Left: Connection Status & Identity */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span>Google Sheets Database Connection</span>
                    {sheetId ? (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        CONNECTED
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                        NOT LINKED
                      </span>
                    )}
                  </h3>
                  <div className="text-xs text-slate-300 flex items-center gap-2">
                    {googleUser ? (
                      <span className="text-emerald-400 font-mono">
                        Logged in as {googleUser.email}
                      </span>
                    ) : (
                      <span className="text-slate-400">
                        Sign in to create, fetch, and update your Google Sheet.
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {sheetId && (
                <div className="flex items-center gap-2 pt-1 font-mono text-xs text-slate-400">
                  <span>Spreadsheet ID:</span>
                  <code className="text-cyan-300 bg-[#040A18] px-2 py-0.5 rounded border border-blue-900">
                    {sheetId.slice(0, 14)}...{sheetId.slice(-6)}
                  </code>
                  <a
                    href={`https://docs.google.com/spreadsheets/d/${sheetId}/edit`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:underline flex items-center gap-1 font-sans font-bold"
                  >
                    <span>Open in Google Sheets</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>

            {/* Right: Actions */}
            <div className="flex flex-wrap items-center gap-2.5">
              {!googleUser ? (
                /* Official Sign In with Google Button */
                <button
                  onClick={handleGoogleSignIn}
                  disabled={isSigningInGoogle}
                  className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs flex items-center gap-2.5 shadow-lg transition-all cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>{isSigningInGoogle ? 'Connecting...' : 'Sign in with Google'}</span>
                </button>
              ) : (
                <>
                  {/* Create New Sheet */}
                  <button
                    onClick={handleCreateSheet}
                    disabled={isCreatingSheet}
                    className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                    title="Create a new Google Sheet in your Google Drive"
                  >
                    <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
                    <span>{isCreatingSheet ? 'Creating Sheet...' : sheetId ? 'Recreate Sheet' : 'Create Google Sheet'}</span>
                  </button>

                  {/* Fetch Orders */}
                  <button
                    onClick={handleFetchOrdersFromSheet}
                    disabled={isFetchingSheet || !sheetId}
                    className="px-3.5 py-2 rounded-xl bg-[#0E2048] hover:bg-[#132c66] border border-cyan-400/50 text-cyan-300 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-40"
                    title="Fetch all orders from connected Google Sheet"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isFetchingSheet ? 'animate-spin' : ''}`} />
                    <span>Fetch from Sheet</span>
                  </button>

                  {/* Sync Local Orders to Sheet */}
                  <button
                    onClick={handleSyncAllToSheet}
                    disabled={isSyncingAll || !sheetId}
                    className="px-3.5 py-2 rounded-xl bg-[#0E2048] hover:bg-[#132c66] border border-emerald-400/50 text-emerald-300 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-40"
                    title="Upload all local orders to Google Sheet"
                  >
                    <UploadCloud className="w-3.5 h-3.5" />
                    <span>Sync to Sheet</span>
                  </button>

                  {/* Sign Out */}
                  <button
                    onClick={handleGoogleSignOut}
                    className="p-2 text-slate-400 hover:text-rose-400 hover:bg-[#070D1F] rounded-xl transition-colors cursor-pointer"
                    title="Sign Out from Google"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </>
              )}

              {/* Sheet & Webhook Settings Modal Toggle */}
              <button
                onClick={() => {
                  setCustomSheetInput(sheetId);
                  setShowConfigModal(true);
                }}
                className="px-3 py-2 rounded-xl bg-[#070D1F] hover:bg-[#0A1633] border border-blue-900 text-xs font-mono text-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Configure Sheet ID and Vercel Webhook"
              >
                <Settings className="w-3.5 h-3.5 text-cyan-400" />
                <span>Config</span>
              </button>
            </div>
          </div>

          {/* Status Alert Banner */}
          {sheetStatusMsg && (
            <div
              className={`mt-4 p-3 rounded-xl text-xs font-mono flex items-center justify-between border ${
                sheetStatusMsg.type === 'success'
                  ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
                  : sheetStatusMsg.type === 'error'
                  ? 'bg-rose-950/60 text-rose-300 border-rose-500/40'
                  : 'bg-blue-950/60 text-cyan-300 border-blue-500/40'
              }`}
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>{sheetStatusMsg.text}</span>
              </div>
              <button onClick={() => setSheetStatusMsg(null)} className="text-slate-400 hover:text-white">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-8">
          <div className="bg-[#070D1F] border border-blue-900/50 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Total Orders</span>
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-cyan-400 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-white font-mono">{totalOrdersCount}</div>
            <div className="text-[11px] text-slate-400 mt-1 font-mono">Saved in database</div>
          </div>

          <div className="bg-[#070D1F] border border-blue-900/50 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">New / Pending</span>
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-amber-400 font-mono">{newOrPendingCount}</div>
            <div className="text-[11px] text-slate-400 mt-1 font-mono">Requires action</div>
          </div>

          <div className="bg-[#070D1F] border border-blue-900/50 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Completed</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-emerald-400 font-mono">{completedCount}</div>
            <div className="text-[11px] text-slate-400 mt-1 font-mono">Delivered projects</div>
          </div>

          <div className="bg-[#070D1F] border border-blue-900/50 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Active Pipeline</span>
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                <ShieldAlert className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-cyan-300 font-mono tabular-nums">
              {formatCurrencyPKR(totalRevenue)}
            </div>
            <div className="text-[11px] text-slate-400 mt-1 font-mono">Completed / In Progress</div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by client name, ID, phone, or requirement..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-[#070D1F] border border-blue-900/70 focus:border-cyan-400 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400"
            />
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-1 p-1 bg-[#070D1F] rounded-xl border border-blue-900/60 overflow-x-auto">
            {(['All', 'New', 'Pending', 'In Progress', 'Completed'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  statusFilter === status
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-blue-900/30'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Orders Table Container */}
        <div className="bg-[#070D1F] rounded-2xl border border-blue-900/60 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-blue-900/70 bg-[#0A1633] text-slate-400 font-mono uppercase text-[11px] tracking-wider">
                  <th className="py-3.5 px-4">Order ID</th>
                  <th className="py-3.5 px-4">Client</th>
                  <th className="py-3.5 px-4">Requirement</th>
                  <th className="py-3.5 px-4">Budget / Price</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-950/60">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <ShoppingBag className="w-8 h-8 text-slate-600" />
                        <span className="font-mono text-sm">No orders found matching criteria.</span>
                        <span className="text-xs text-slate-500">
                          Submit an order via the homepage form or click "Fetch from Sheet" to load orders.
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((ord) => {
                    const clientName = ord.clientName || ord.name || 'Client';
                    const clientPhone = ord.whatsapp || ord.phone || 'N/A';
                    const price = ord.totalPrice ?? ord.budget ?? ord.baseBudget ?? 0;
                    const cleanPhone = clientPhone.replace(/[^0-9]/g, '');

                    return (
                      <tr key={String(ord.id)} className="hover:bg-[#0B1736] transition-colors">
                        {/* Order ID */}
                        <td className="py-3.5 px-4 font-mono font-bold text-cyan-300 whitespace-nowrap">
                          #{String(ord.id).slice(-8)}
                        </td>

                        {/* Client */}
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-white">{clientName}</div>
                          <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5 mt-0.5">
                            <MessageCircle className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                            {cleanPhone ? (
                              <a
                                href={`https://wa.me/${cleanPhone}?text=Hi, I need a website`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-emerald-400 hover:underline"
                                title="Open WhatsApp chat with client"
                              >
                                {clientPhone}
                              </a>
                            ) : (
                              <span>{clientPhone}</span>
                            )}
                          </div>
                        </td>

                        {/* Requirement */}
                        <td className="py-3.5 px-4 max-w-xs">
                          <p className="line-clamp-2 text-slate-300 text-xs">
                            {ord.requirement || 'No details provided'}
                          </p>
                          {ord.serviceType && (
                            <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[10px] bg-blue-950 text-cyan-300 border border-blue-800">
                              {ord.serviceType}
                            </span>
                          )}
                        </td>

                        {/* Budget */}
                        <td className="py-3.5 px-4 font-mono font-bold text-white whitespace-nowrap tabular-nums">
                          {formatCurrencyPKR(price)}
                        </td>

                        {/* Status Dropdown */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <select
                            value={ord.status}
                            onChange={(e) => handleStatusChange(ord.id, e.target.value as OrderStatus)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold border bg-[#060D1E] cursor-pointer focus:outline-none transition-colors ${
                              statusStyles[ord.status] || statusStyles.New
                            }`}
                          >
                            <option value="New" className="bg-[#070D1F] text-cyan-300">New</option>
                            <option value="Pending" className="bg-[#070D1F] text-amber-400">Pending</option>
                            <option value="In Progress" className="bg-[#070D1F] text-blue-400">In Progress</option>
                            <option value="Completed" className="bg-[#070D1F] text-emerald-400">Completed</option>
                          </select>
                        </td>

                        {/* Date */}
                        <td className="py-3.5 px-4 font-mono text-slate-400 whitespace-nowrap text-[11px]">
                          {ord.date}
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setSelectedOrder(ord)}
                              title="View Order Details"
                              className="p-1.5 text-slate-300 hover:text-cyan-400 hover:bg-[#0A1633] rounded-lg transition-colors cursor-pointer"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            {ord.status !== 'Completed' && (
                              <button
                                onClick={() => handleStatusChange(ord.id, 'Completed')}
                                title="Mark Completed"
                                className="p-1.5 text-slate-300 hover:text-emerald-400 hover:bg-[#0A1633] rounded-lg transition-colors cursor-pointer"
                              >
                                <CheckCircle2 className="w-4 h-4" />
                              </button>
                            )}

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

        {/* Admin Footer Note */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono gap-2">
          <span>AiCraftWeb Google Sheets Database • Connected to Google Cloud & LocalStorage</span>
          <span>Orders automatically persist across page reloads and Vercel deployments</span>
        </div>
      </div>

      {/* CONFIG MODAL: Custom Sheet ID & Vercel Webhook Setup */}
      {showConfigModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#070D1F] border border-blue-500/40 rounded-3xl max-w-xl w-full p-6 shadow-2xl relative text-left">
            <button
              onClick={() => setShowConfigModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400 flex items-center justify-center text-cyan-400">
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Google Sheet & Vercel Webhook Settings</h3>
                <span className="text-xs text-slate-400">Configure your spreadsheet or automated webhook</span>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Connect Existing Google Sheet (ID or URL):
                </label>
                <input
                  type="text"
                  value={customSheetInput}
                  onChange={(e) => setCustomSheetInput(e.target.value)}
                  placeholder="e.g. 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms or paste Sheet URL"
                  className="w-full px-3 py-2.5 rounded-xl bg-[#0A1633] border border-blue-900 focus:border-cyan-400 text-white placeholder-slate-500 font-mono text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Optional: Google Apps Script Webhook URL (For Public Vercel Orders):
                </label>
                <input
                  type="text"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  placeholder="https://script.google.com/macros/s/AKfycb.../exec"
                  className="w-full px-3 py-2.5 rounded-xl bg-[#0A1633] border border-blue-900 focus:border-cyan-400 text-white placeholder-slate-500 font-mono text-xs focus:outline-none"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  With a Webhook URL, customer orders submitted on Vercel are automatically inserted into your Google Sheet even when customers aren't logged in.
                </p>
              </div>

              {/* Collapsible Apps Script helper */}
              <div className="p-3 bg-[#050A18] rounded-xl border border-blue-950 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-cyan-400 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>How to get Free Google Apps Script Webhook in 30 Seconds</span>
                  </span>
                  <button
                    onClick={copyScriptToClipboard}
                    className="px-2.5 py-1 rounded bg-[#0A1633] hover:bg-[#102352] border border-blue-800 text-[10px] font-mono text-cyan-300 flex items-center gap-1 cursor-pointer"
                  >
                    {copiedScript ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedScript ? 'Copied Code!' : 'Copy Script Code'}</span>
                  </button>
                </div>
                <ol className="list-decimal list-inside text-[11px] text-slate-400 space-y-1">
                  <li>In your Google Sheet, click <strong>Extensions &gt; Apps Script</strong>.</li>
                  <li>Click <strong>Copy Script Code</strong> above, paste it in the editor, and click Save.</li>
                  <li>Click <strong>Deploy &gt; New Deployment &gt; Web app</strong>.</li>
                  <li>Set <em>"Who has access"</em> to <strong>Anyone</strong>, click Deploy, and paste the URL above!</li>
                </ol>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  onClick={() => setShowConfigModal(false)}
                  className="py-2.5 px-4 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveConfig}
                  className="py-2.5 px-5 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:opacity-95 shadow-md cursor-pointer"
                >
                  Save Configuration
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#070D1F] border border-blue-500/40 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative text-left">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400 flex items-center justify-center text-cyan-400">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Order Details</h3>
                <span className="text-xs font-mono text-cyan-400">ID: #{String(selectedOrder.id)}</span>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-[#0A1633] p-4 rounded-xl space-y-2 border border-blue-900/60">
                <div className="flex justify-between">
                  <span className="text-slate-400">Client Name:</span>
                  <span className="font-semibold text-white">{selectedOrder.clientName || selectedOrder.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">WhatsApp / Phone:</span>
                  <span className="font-mono text-cyan-300">{selectedOrder.whatsapp || selectedOrder.phone || 'N/A'}</span>
                </div>
                {selectedOrder.email && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Email:</span>
                    <span className="text-white">{selectedOrder.email}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-400">Date Placed:</span>
                  <span className="font-mono text-slate-300">{selectedOrder.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Current Status:</span>
                  <span className="font-mono font-bold text-cyan-400">{selectedOrder.status}</span>
                </div>
              </div>

              <div>
                <h4 className="text-slate-400 font-medium mb-1">Project Requirement:</h4>
                <div className="p-3 bg-[#050A18] rounded-xl border border-blue-950 text-slate-200 leading-relaxed font-sans">
                  {selectedOrder.requirement}
                </div>
              </div>

              <div className="bg-[#0A1633] p-3 rounded-xl border border-blue-900/60 flex justify-between items-center">
                <span className="text-slate-400 font-semibold">Total Budget / Price:</span>
                <span className="text-base font-mono font-extrabold text-emerald-400">
                  {formatCurrencyPKR(selectedOrder.totalPrice ?? selectedOrder.budget ?? selectedOrder.baseBudget ?? 0)}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex gap-3">
                <a
                  href={`https://wa.me/${(selectedOrder.whatsapp || selectedOrder.phone || '923097425011').replace(/[^0-9]/g, '')}?text=Hi, I need a website`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:opacity-95 shadow-md flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-slate-950" />
                  <span>Chat on WhatsApp</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => setSelectedOrder(null)}
                  className="py-3 px-5 rounded-xl font-semibold text-xs text-slate-300 bg-[#0A1633] hover:bg-[#102352] border border-blue-900/80 transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
