import React, { useState } from 'react';
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Layers,
  Settings as SettingsIcon,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Menu,
  X,
  Bell,
  Terminal,
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { Order, Client, ServicePackage, AdminSettings } from '../../types';
import { DashboardView } from './DashboardView';
import { OrdersView } from './OrdersView';
import { ClientsView } from './ClientsView';
import { ServicesView } from './ServicesView';
import { SettingsView } from './SettingsView';

interface AdminLayoutProps {
  onExitAdmin: () => void;
  onLogout?: () => void;
  orders: Order[];
  clients: Client[];
  services: ServicePackage[];
  settings: AdminSettings;
  onUpdateOrders: (orders: Order[]) => void;
  onUpdateClients: (clients: Client[]) => void;
  onUpdateServices: (services: ServicePackage[]) => void;
  onUpdateSettings: (settings: AdminSettings) => void;
  onResetDemoData: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  onExitAdmin,
  onLogout,
  orders,
  clients,
  services,
  settings,
  onUpdateOrders,
  onUpdateClients,
  onUpdateServices,
  onUpdateSettings,
  onResetDemoData,
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'clients' | 'services' | 'settings'>('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [selectedOrderForModal, setSelectedOrderForModal] = useState<Order | null>(null);

  const pendingCount = orders.filter((o) => o.status === 'Pending').length;

  interface NavItem {
    id: 'dashboard' | 'orders' | 'clients' | 'services' | 'settings';
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number | null;
  }

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'orders', label: 'Orders', icon: ShoppingBag, badge: pendingCount > 0 ? pendingCount : null },
    { id: 'clients', label: 'Clients', icon: Users, badge: clients.length },
    { id: 'services', label: 'Services', icon: Layers },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  const handleSelectTab = (tabId: typeof activeTab) => {
    setActiveTab(tabId);
    setMobileSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#060B18] text-slate-100 flex flex-col md:flex-row antialiased selection:bg-cyan-500/30">
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#070D1F] border-b border-blue-900/60 sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <Logo size="sm" showTagline={false} variant={settings.activeLogoType || 'brain'} customLogoUrl={settings.customLogoUrl} />
          <span className="text-[10px] font-mono text-cyan-400 bg-blue-950 px-2 py-0.5 rounded border border-blue-800">
            ADMIN OS
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onExitAdmin}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-[#0A1633] text-xs font-semibold flex items-center gap-1 border border-blue-900"
          >
            <span>Exit</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-2 rounded-lg bg-[#0A1633] text-slate-200 border border-blue-900"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Linear-Style Left Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-30 h-screen w-64 bg-[#070E20] border-r border-blue-900/50 flex flex-col justify-between p-4 transition-transform duration-300 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div>
          {/* Logo & Workspace Tag */}
          <div className="pb-6 pt-2 border-b border-blue-900/50 flex items-center justify-between">
            <div className="flex flex-col">
              <Logo size="md" showTagline={false} variant={settings.activeLogoType || 'brain'} customLogoUrl={settings.customLogoUrl} />
              <div className="flex items-center gap-2 mt-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-mono text-cyan-400 font-semibold tracking-wider uppercase">
                  AiCraft Admin v3.2
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links (Linear style clean active states) */}
          <nav className="mt-6 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600/20 text-[#00F0FF] border border-cyan-400/40 shadow-[0_0_15px_rgba(0,136,255,0.2)]'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-[#0A1633]/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#00F0FF]' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge !== null && (
                    <span
                      className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono font-bold ${
                        item.id === 'orders' && pendingCount > 0
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-blue-950 text-cyan-400 border border-blue-800'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions: User Account & Return to Site */}
        <div className="pt-4 border-t border-blue-900/50 space-y-2">
          {/* Active Admin Profile */}
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#09142E] border border-blue-900/60">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#0088FF] to-cyan-400 flex items-center justify-center text-slate-950 font-black text-xs">
              MA
            </div>
            <div className="flex-1 truncate">
              <div className="text-xs font-bold text-white truncate">{settings.ownerName}</div>
              <div className="text-[10px] text-cyan-400/80 font-mono">Lead Engineer</div>
            </div>
          </div>

          {/* Quick Exit to Public Website */}
          <button
            onClick={onExitAdmin}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-[#0A1633] hover:bg-[#12244f] border border-blue-800/80 transition-all cursor-pointer"
          >
            <span>Exit to AiCraftWeb</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {/* Top Breadcrumb & Live Stats Bar */}
        <div className="hidden md:flex items-center justify-between pb-6 mb-6 border-b border-blue-900/40">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span>AiCraftWeb OS</span>
            <span>/</span>
            <span className="text-cyan-400 uppercase font-bold">{activeTab}</span>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <div className="flex items-center gap-2 text-slate-300 bg-[#09142E] px-3 py-1.5 rounded-lg border border-blue-900/60">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Zero-Trust Shield: Active</span>
            </div>
            <button
              onClick={onLogout || onExitAdmin}
              className="px-3 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/50 text-red-300 hover:text-red-200 border border-red-900/60 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Lock admin session immediately"
            >
              <LogOut className="w-3.5 h-3.5 text-red-400" />
              <span>Lock & Sign Out</span>
            </button>
            <button
              onClick={onExitAdmin}
              className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors px-2 py-1"
            >
              <span>View Live Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Dynamic View Display */}
        {activeTab === 'dashboard' && (
          <DashboardView
            orders={orders}
            clients={clients}
            onSelectOrder={(ord) => {
              setSelectedOrderForModal(ord);
              setActiveTab('orders');
            }}
            onNavigateToTab={(tab) => setActiveTab(tab as typeof activeTab)}
          />
        )}

        {activeTab === 'orders' && (
          <OrdersView
            orders={orders}
            settings={settings}
            onUpdateOrders={onUpdateOrders}
            selectedOrderForModal={selectedOrderForModal}
            onCloseOrderModal={() => setSelectedOrderForModal(null)}
            onOpenOrderModal={(ord) => setSelectedOrderForModal(ord)}
          />
        )}

        {activeTab === 'clients' && (
          <ClientsView clients={clients} onUpdateClients={onUpdateClients} />
        )}

        {activeTab === 'services' && (
          <ServicesView services={services} onUpdateServices={onUpdateServices} />
        )}

        {activeTab === 'settings' && (
          <SettingsView
            settings={settings}
            onUpdateSettings={onUpdateSettings}
            onResetToDemoData={onResetDemoData}
          />
        )}
      </main>
    </div>
  );
};
