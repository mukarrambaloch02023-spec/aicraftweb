import ScrollReveal from "@/components/ScrollReveal"
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Header } from './components/common/Header';
import { Hero } from './components/home/Hero';
import { SecuritySection } from './components/home/SecuritySection';
import { BudgetMeter } from './components/home/BudgetMeter';
import { PricingPlans } from './components/home/PricingPlans';
import { OrderForm } from './components/home/OrderForm';
import { ServicesSection } from './components/home/ServicesSection';
import { AboutSection } from './components/home/AboutSection';
import { ContactSection } from './components/home/ContactSection';
import { Footer } from './components/common/Footer';
import { FloatingWhatsApp } from './components/common/FloatingWhatsApp';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminLoginPage } from './components/admin/AdminLoginPage';
import { SinglePageAdminSection } from './components/admin/SinglePageAdminSection';
import { ShoppingBag, ChevronDown, ShieldAlert } from 'lucide-react';
import {
  getStoredOrders,
  saveOrders,
  getStoredServices,
  saveServices,
  getStoredClients,
  saveClients,
  getStoredSettings,
  saveSettings,
  INITIAL_ORDERS,
  DEFAULT_SERVICES,
  INITIAL_CLIENTS,
  DEFAULT_SETTINGS,
} from './utils/storage';
import { Order, ServicePackage, Client, AdminSettings } from './types';

// ===================================================================
// PUBLIC HOMEPAGE COMPONENT (ROUTE: /)
// Clean modern agency homepage. No admin link visible to public users.
// ===================================================================
interface PublicHomeProps {
  settings: AdminSettings;
  services: ServicePackage[];
  orders: Order[];
  onOrderSubmitted: (newOrder: Order) => void;
  onUpdateOrders: (orders: Order[]) => void;
}

const PublicHomePage: React.FC<PublicHomeProps> = ({
  settings,
  services,
  orders,
  onOrderSubmitted,
  onUpdateOrders,
}) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isAdminMode =
    searchParams.get('admin') === 'true' ||
    (typeof window !== 'undefined' && window.location.search.includes('admin=true'));

  const [selectedBudget, setSelectedBudget] = useState<number>(10000);
  const [selectedPackageName, setSelectedPackageName] = useState<string>('Pro');

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPackage = (pkg: ServicePackage) => {
    setSelectedBudget(pkg.price);
    setSelectedPackageName(pkg.name);
    scrollToSection('order-form');
  };

  const handleSelectBudgetFromMeter = (budget: number, tier: string) => {
    setSelectedBudget(budget);
    setSelectedPackageName(tier);
    scrollToSection('order-form');
  };

  return (
    <div className="min-h-screen bg-[#070D1F] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Banner: Only visible when ?admin=true */}
      {isAdminMode && (
        <div className="bg-[#050C1F] border-b border-cyan-500/50 px-4 py-2 text-xs font-mono text-cyan-300 flex items-center justify-between z-50 sticky top-0 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-bold text-white tracking-wide">ADMIN MODE (?admin=true)</span>
            <span className="text-slate-400 hidden md:inline">• Control panel enabled at page bottom</span>
          </div>
          <button
            onClick={() => scrollToSection('admin-panel')}
            className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 font-bold hover:opacity-90 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm text-xs"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>View Orders ({orders.length})</span>
            <ChevronDown className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Header */}
      <Header
        onNavigate={scrollToSection}
        customLogoUrl={settings.customLogoUrl}
        activeLogoType={settings.activeLogoType || 'circuit'}
        isAdmin={isAdminMode}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          settings={settings}
          onOrderClick={() => scrollToSection('pricing')}
        />

        {/* Services Section (Basic, Pro, Premium) */}
        <ServicesSection />

        {/* Fixed Pricing Plans (Basic 5000, Pro 10000, Premium 20000) */}
        <PricingPlans
          services={services}
          onSelectPlan={handleSelectPackage}
        />

        {/* Interactive Money Meter */}
        <BudgetMeter onSelectBudget={handleSelectBudgetFromMeter} />

        {/* Security Trust Section */}
        <SecuritySection />

        {/* Order Form */}
        <OrderForm
          settings={settings}
          selectedBudget={selectedBudget}
          selectedPackageName={selectedPackageName}
          onOrderSubmitted={onOrderSubmitted}
        />

        {/* About Section */}
        <AboutSection
          settings={settings}
          onOrderClick={() => scrollToSection('pricing')}
        />

        {/* Direct Contact Section */}
        <ContactSection settings={settings} />

        {/* Single Page Admin Section: ONLY visible when ?admin=true */}
        {isAdminMode && (
          <SinglePageAdminSection onOrderUpdated={onUpdateOrders} />
        )}
      </main>

      {/* Public Footer */}
      <Footer
        settings={settings}
        onNavigate={scrollToSection}
        customLogoUrl={settings.customLogoUrl}
      />

      {/* Floating Action Button: View Orders (Only visible when ?admin=true) */}
      {isAdminMode && (
        <div className="fixed bottom-6 left-6 z-50">
          <button
            onClick={() => scrollToSection('admin-panel')}
            className="px-5 py-3 rounded-full bg-[#0A1633] border-2 border-cyan-400 text-white font-bold text-xs sm:text-sm shadow-[0_0_30px_rgba(0,240,255,0.6)] hover:bg-[#0E204A] transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center gap-2.5 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-cyan-400" />
            <span>View Orders</span>
            <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-xs border border-cyan-400/40">
              {orders.length}
            </span>
          </button>
        </div>
      )}

      {/* Floating WhatsApp Live Chat (Phone / WhatsApp: 03097425011) */}
      <FloatingWhatsApp settings={settings} />
    </div>
  );
};

// ===================================================================
// ADMIN ROUTE COMPONENT (ROUTE: /admin)
// Hidden private dashboard with login (admin@aicraftweb.com / admin123)
// ===================================================================
interface AdminRouteProps {
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

const AdminRouteWrapper: React.FC<AdminRouteProps> = ({
  orders: propOrders,
  clients,
  services,
  settings,
  onUpdateOrders,
  onUpdateClients,
  onUpdateServices,
  onUpdateSettings,
  onResetDemoData,
}) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('aicraft_admin_authenticated') === 'true';
  });

  // Dedicated admin orders state loaded directly from localStorage key "aicraft_orders"
  const [orders, setOrders] = useState<Order[]>([]);

  // 2. In /admin dashboard, read from localStorage key "aicraft_orders" on mount
  useEffect(() => {
    const loadOrdersFromStorage = () => {
      try {
        const raw = localStorage.getItem('aicraft_orders') || localStorage.getItem('aicraftweb_orders_v1');
        if (raw) {
          const parsed = JSON.parse(raw);
          setOrders(parsed);
          onUpdateOrders(parsed);
        } else {
          const initial = getStoredOrders();
          setOrders(initial);
          onUpdateOrders(initial);
        }
      } catch (err) {
        console.error('Failed to parse aicraft_orders', err);
      }
    };

    loadOrdersFromStorage();

    // Listen to storage events so orders placed from / homepage reflect immediately
    const handleStorageChange = () => {
      loadOrdersFromStorage();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleUpdateAdminOrders = (newOrders: Order[]) => {
    setOrders(newOrders);
    try {
      localStorage.setItem('aicraft_orders', JSON.stringify(newOrders));
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('storage'));
      }
    } catch (e) {
      console.error('Failed to save to aicraft_orders', e);
    }
    onUpdateOrders(newOrders);
  };

  const handleLoginSuccess = () => {
    localStorage.setItem('aicraft_admin_authenticated', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('aicraft_admin_authenticated');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <AdminLoginPage
        onSuccess={handleLoginSuccess}
        onExitToPublic={() => navigate('/')}
        customLogoUrl={settings.customLogoUrl}
        activeLogoType={settings.activeLogoType || 'circuit'}
      />
    );
  }

  return (
    <AdminLayout
      onExitAdmin={() => navigate('/')}
      onLogout={handleLogout}
      orders={orders}
      clients={clients}
      services={services}
      settings={settings}
      onUpdateOrders={handleUpdateAdminOrders}
      onUpdateClients={onUpdateClients}
      onUpdateServices={onUpdateServices}
      onUpdateSettings={onUpdateSettings}
      onResetDemoData={onResetDemoData}
    />
  );
};

// ===================================================================
// ROOT APP COMPONENT (ROUTER)
// ===================================================================
export default function App() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [services, setServices] = useState<ServicePackage[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [settings, setSettings] = useState<AdminSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    setOrders(getStoredOrders());
    setServices(getStoredServices());
    setClients(getStoredClients());
    setSettings(getStoredSettings());
  }, []);

  const handleUpdateOrders = (newOrders: Order[]) => {
    setOrders(newOrders);
    saveOrders(newOrders);
  };

  const handleUpdateServices = (newServices: ServicePackage[]) => {
    setServices(newServices);
    saveServices(newServices);
  };

  const handleUpdateClients = (newClients: Client[]) => {
    setClients(newClients);
    saveClients(newClients);
  };

  const handleUpdateSettings = (newSettings: AdminSettings) => {
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  const handleResetDemoData = () => {
    setOrders(INITIAL_ORDERS);
    saveOrders(INITIAL_ORDERS);
    setServices(DEFAULT_SERVICES);
    saveServices(DEFAULT_SERVICES);
    setClients(INITIAL_CLIENTS);
    saveClients(INITIAL_CLIENTS);
  };

  const handleOrderSubmitted = (newOrder: Order) => {
    const raw = localStorage.getItem('aicraft_orders');
    const existing: Order[] = raw ? JSON.parse(raw) : orders;
    const updated = [newOrder, ...existing];
    setOrders(updated);
    saveOrders(updated);

    // Register or update client record
    const clientName = newOrder.clientName || newOrder.name || 'Client';
    const clientEmail = newOrder.email || '';
    const clientPhone = newOrder.whatsapp || newOrder.phone || '';
    const price = newOrder.totalPrice ?? newOrder.budget ?? 0;

    const existingClient = clients.find(
      (c) => (clientEmail && c.email.toLowerCase() === clientEmail.toLowerCase()) || (clientPhone && c.whatsapp === clientPhone)
    );

    if (!existingClient) {
      const newClientRecord: Client = {
        id: `cl-${Date.now()}`,
        name: clientName,
        email: clientEmail || `${clientName.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
        whatsapp: clientPhone,
        totalOrders: 1,
        totalSpent: price,
        joinedDate: new Date().toISOString().split('T')[0],
      };
      const updatedClients = [newClientRecord, ...clients];
      setClients(updatedClients);
      saveClients(updatedClients);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* ROUTE 1: / (Public Agency Homepage) */}
        <Route
          path="/"
          element={
            <PublicHomePage
              settings={settings}
              services={services}
              orders={orders}
              onOrderSubmitted={handleOrderSubmitted}
              onUpdateOrders={handleUpdateOrders}
            />
          }
        />

        {/* ROUTE 2: /admin (Hidden Admin Dashboard with Login) */}
        <Route
          path="/admin/*"
          element={
            <AdminRouteWrapper
              orders={orders}
              clients={clients}
              services={services}
              settings={settings}
              onUpdateOrders={handleUpdateOrders}
              onUpdateClients={handleUpdateClients}
              onUpdateServices={handleUpdateServices}
              onUpdateSettings={handleUpdateSettings}
              onResetDemoData={handleResetDemoData}
            />
          }
        />

        {/* Fallback to Public Homepage */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
