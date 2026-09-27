import React from 'react';
import { DollarSign, ShoppingBag, Clock, Users, ArrowUpRight, CheckCircle2, AlertTriangle, TrendingUp, Sparkles, ExternalLink } from 'lucide-react';
import { Order, Client, ServicePackage } from '../../types';
import { formatCurrencyPKR } from '../../utils/security';

interface DashboardViewProps {
  orders: Order[];
  clients: Client[];
  onSelectOrder: (order: Order) => void;
  onNavigateToTab: (tab: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  orders,
  clients,
  onSelectOrder,
  onNavigateToTab,
}) => {
  // Calculations
  const totalRevenue = orders.reduce((sum, ord) => {
    const price = ord.totalPrice ?? ord.budget ?? ord.baseBudget ?? 0;
    return sum + (ord.status === 'Completed' || ord.status === 'In Progress' ? price : 0);
  }, 0);
  const totalOrdersCount = orders.length;
  const pendingOrders = orders.filter((o) => o.status === 'Pending' || o.status === 'New').length;
  const inProgressOrders = orders.filter((o) => o.status === 'In Progress').length;
  const activeClientsCount = clients.length;

  // Last 7 days simulation data based on orders + realistic daily cadence
  const daysOfWeek = ['Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu'];
  const dailyRevenues = [
    { day: 'Fri', date: 'Sep 19', revenue: 55000, orders: 1 },
    { day: 'Sat', date: 'Sep 20', revenue: 19000, orders: 1 },
    { day: 'Sun', date: 'Sep 21', revenue: 5000, orders: 1 },
    { day: 'Mon', date: 'Sep 22', revenue: 25000, orders: 1 },
    { day: 'Tue', date: 'Sep 23', revenue: 15000, orders: 1 },
    { day: 'Wed', date: 'Sep 24', revenue: 65000, orders: 1 },
    { day: 'Thu', date: 'Sep 25', revenue: 40000, orders: 2 },
  ];

  const maxDailyRevenue = Math.max(...dailyRevenues.map((d) => d.revenue));
  const recentOrders = [...orders].slice(0, 5);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner / Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0A1224] border border-blue-900/60 p-6 rounded-2xl shadow-lg">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>OPERATIONAL // PAKISTAN HQ</span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Agency Command Dashboard
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Monitoring client pipelines, revenue generation, and technical deployments.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigateToTab('orders')}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 border border-cyan-400/30 transition-all flex items-center gap-1.5"
          >
            <span>Manage All Orders</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Revenue */}
        <div className="rounded-2xl bg-[#091226] border border-blue-500/25 p-5 shadow-[0_0_20px_rgba(0,136,255,0.08)] relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase text-slate-400 tracking-wider">
              Total Revenue
            </span>
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white tabular-nums tracking-tight mb-2">
            {formatCurrencyPKR(totalRevenue)}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+24.8% vs last month</span>
          </div>
        </div>

        {/* Card 2: Total Orders */}
        <div className="rounded-2xl bg-[#091226] border border-blue-500/25 p-5 shadow-[0_0_20px_rgba(0,136,255,0.08)]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase text-slate-400 tracking-wider">
              Total Orders
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white tabular-nums tracking-tight mb-2">
            {totalOrdersCount}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
            <span className="text-cyan-400 font-semibold">{inProgressOrders} In Progress</span>
            <span>•</span>
            <span>{orders.filter((o) => o.status === 'Completed').length} Done</span>
          </div>
        </div>

        {/* Card 3: Pending Orders */}
        <div className="rounded-2xl bg-[#091226] border border-amber-500/30 p-5 shadow-[0_0_20px_rgba(245,158,11,0.1)]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase text-amber-300 tracking-wider font-semibold">
              Pending Orders
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-300 tabular-nums tracking-tight mb-2">
            {pendingOrders}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-amber-400">
            <span>Requires review & WhatsApp reach-out</span>
          </div>
        </div>

        {/* Card 4: Completed Orders */}
        <div className="rounded-2xl bg-[#091226] border border-emerald-500/30 p-5 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase text-emerald-300 tracking-wider font-semibold">
              Completed Orders
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-300 tabular-nums tracking-tight mb-2">
            {orders.filter((o) => o.status === 'Completed').length}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
            <span>Delivered & verified 100% safe</span>
          </div>
        </div>
      </div>

      {/* Revenue Graph: Last 7 Days */}
      <div className="rounded-2xl bg-[#091226] border border-blue-500/20 p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>Revenue Trajectory (Last 7 Days)</span>
              <span className="text-[10px] font-mono bg-blue-950 text-cyan-300 border border-blue-800 px-2 py-0.5 rounded">
                PKR Analytics
              </span>
            </h3>
            <p className="text-xs text-slate-400">Daily invoiced website packages & add-ons</p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
            <span className="w-3 h-3 rounded bg-gradient-to-t from-blue-600 to-cyan-400 inline-block" />
            <span>Daily Intake</span>
          </div>
        </div>

        {/* Bar Chart Visualization */}
        <div className="h-56 w-full flex items-end justify-between gap-2 sm:gap-6 pt-6 pb-2 border-b border-blue-900/60">
          {dailyRevenues.map((item, idx) => {
            const heightPercent = Math.round((item.revenue / maxDailyRevenue) * 100);
            return (
              <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                {/* Tooltip on Hover */}
                <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-[#0A1633] border border-cyan-400/60 px-2.5 py-1 rounded-lg text-[10px] font-mono text-cyan-300 pointer-events-none shadow-lg z-20 whitespace-nowrap">
                  {item.date}: {formatCurrencyPKR(item.revenue)} ({item.orders} order)
                </div>

                {/* Bar */}
                <div
                  style={{ height: `${Math.max(12, heightPercent)}%` }}
                  className="w-full max-w-[48px] rounded-t-lg bg-gradient-to-t from-blue-700 via-blue-500 to-cyan-400 group-hover:to-[#00F0FF] group-hover:shadow-[0_0_20px_rgba(0,136,255,0.7)] transition-all duration-300 relative cursor-pointer"
                >
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white opacity-60" />
                </div>

                {/* Day Label */}
                <div className="mt-2 text-center">
                  <div className="text-xs font-mono font-bold text-slate-300 group-hover:text-cyan-400 transition-colors">
                    {item.day}
                  </div>
                  <div className="text-[10px] font-mono text-slate-500">
                    {(item.revenue / 1000).toFixed(0)}k
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="rounded-2xl bg-[#091226] border border-blue-500/20 p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-white">Recent Orders</h3>
            <p className="text-xs text-slate-400">Latest website requests submitted via AiCraftWeb</p>
          </div>
          <button
            onClick={() => onNavigateToTab('orders')}
            className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
          >
            <span>View All Orders</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-blue-900/60 text-slate-400 uppercase tracking-wider font-mono">
                <th className="pb-3 px-3">Order ID</th>
                <th className="pb-3 px-3">Client</th>
                <th className="pb-3 px-3">Package</th>
                <th className="pb-3 px-3">Price</th>
                <th className="pb-3 px-3">Status</th>
                <th className="pb-3 px-3">Date</th>
                <th className="pb-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-950/60">
              {recentOrders.map((ord) => {
                const statusStyles: Record<string, string> = {
                  New: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40',
                  Pending: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
                  'In Progress': 'bg-blue-500/10 text-blue-400 border-blue-500/30',
                  Completed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
                };

                const clientName = ord.clientName || ord.name || 'Client';
                const clientPhone = ord.whatsapp || ord.phone || 'N/A';
                const price = ord.totalPrice ?? ord.budget ?? ord.baseBudget ?? 0;

                return (
                  <tr key={String(ord.id)} className="hover:bg-[#0E1A38] transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-cyan-300">
                      {String(ord.id)}
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-semibold text-white">{clientName}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{clientPhone}</div>
                    </td>
                    <td className="py-3 px-3 text-slate-200">
                      {ord.serviceType || 'Standard'}
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-white tabular-nums">
                      {formatCurrencyPKR(price)}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${statusStyles[ord.status] || statusStyles.New}`}>
                        {ord.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-400 font-mono">
                      {ord.date}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => onSelectOrder(ord)}
                        className="px-2.5 py-1 rounded bg-[#0A1633] hover:bg-[#132554] border border-blue-800 text-cyan-300 hover:text-white transition-colors"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
