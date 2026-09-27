import React, { useState, useEffect } from 'react';
import { ShieldCheck, MessageCircle, Send, CheckSquare, Square, Check, AlertCircle, ArrowRight, ExternalLink } from 'lucide-react';
import { Order, AdminSettings, OrderAddons } from '../../types';
import { sanitizeInput, validateEmail, validatePhone, formatCurrencyPKR, generateWhatsAppLink } from '../../utils/security';
import { sendOrderToWebhook, appendOrderToGoogleSheet, getStoredSheetId, getStoredWebhookUrl } from '../../utils/googleSheets';
import { getAccessToken } from '../../utils/googleAuth';

interface OrderFormProps {
  settings: AdminSettings;
  selectedBudget: number;
  selectedPackageName: string;
  onOrderSubmitted: (order: Order) => void;
}

export const OrderForm: React.FC<OrderFormProps> = ({
  settings,
  selectedBudget,
  selectedPackageName,
  onOrderSubmitted,
}) => {
  const [fullName, setFullName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [requirement, setRequirement] = useState('');
  const [budget, setBudget] = useState<number>(selectedBudget);

  const [addons, setAddons] = useState<OrderAddons>({
    domain: false,
    management: false,
    runAds: false,
    createAdDesigns: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<Order | null>(null);

  // Sync when selectedBudget prop updates from BudgetMeter or PricingCards
  useEffect(() => {
    if (selectedBudget) {
      setBudget(selectedBudget);
    }
  }, [selectedBudget]);

  // Pricing calculations
  const domainCost = addons.domain ? 10000 : 0;
  const managementCost = addons.management ? 30000 : 0;
  const runAdsCost = addons.runAds ? 2000 : 0; // 2 Ads per week, Rs. 1000 per ad
  const createAdsCost = addons.createAdDesigns ? 2000 : 0; // Rs. 1000 per ad/post (2 posts)
  const totalCost = budget + domainCost + managementCost + runAdsCost + createAdsCost;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const cleanName = sanitizeInput(fullName);
    const cleanEmail = sanitizeInput(email);
    const cleanWhatsapp = sanitizeInput(whatsapp);
    const cleanReq = sanitizeInput(requirement);

    if (!cleanName || cleanName.length < 2) {
      newErrors.fullName = 'Please enter your full name (minimum 2 characters)';
    }

    if (!cleanWhatsapp || !validatePhone(cleanWhatsapp)) {
      newErrors.whatsapp = 'Please provide a valid WhatsApp number with country code (e.g. +92 300 1234567)';
    }

    if (!cleanEmail || !validateEmail(cleanEmail)) {
      newErrors.email = 'Please provide a valid email address';
    }

    if (!cleanReq || cleanReq.length < 10) {
      newErrors.requirement = 'Please describe your website requirement in at least 10 characters';
    }

    if (budget < 5000) {
      newErrors.budget = 'Minimum budget is Rs. 5,000';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const cleanName = sanitizeInput(fullName);
    const cleanEmail = sanitizeInput(email);
    const cleanWhatsapp = sanitizeInput(whatsapp);
    const cleanReq = sanitizeInput(requirement);

    // 1. Create order object matching required format with status "New"
    const newOrder: Order = {
      id: Date.now(),
      name: cleanName,
      clientName: cleanName,
      phone: cleanWhatsapp,
      whatsapp: cleanWhatsapp,
      email: cleanEmail,
      requirement: cleanReq,
      budget: totalCost,
      baseBudget: budget,
      totalPrice: totalCost,
      serviceType: selectedPackageName || 'Custom Package',
      addons: { ...addons },
      status: 'New',
      date: new Date().toLocaleString(),
      notes: 'Order placed from website homepage',
    };

    // a) Save directly to localStorage with key "aicraft_orders"
    try {
      const existingRaw = localStorage.getItem('aicraft_orders') || localStorage.getItem('aicraftweb_orders_v1');
      let currentOrders: Order[] = [];
      if (existingRaw) {
        currentOrders = JSON.parse(existingRaw);
      }
      const updatedOrders = [newOrder, ...currentOrders];
      localStorage.setItem('aicraft_orders', JSON.stringify(updatedOrders));
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('storage'));
      }
    } catch (err) {
      console.error('Error saving order to localStorage', err);
    }

    // b) Save to Google Sheet (via Webhook if configured, or direct Google Sheets API)
    try {
      const webhookUrl = getStoredWebhookUrl();
      if (webhookUrl) {
        sendOrderToWebhook(webhookUrl, newOrder).catch((e) =>
          console.warn('Google Sheet Webhook sync error:', e)
        );
      }

      const sheetId = getStoredSheetId();
      getAccessToken().then((token) => {
        if (token && sheetId) {
          appendOrderToGoogleSheet(token, sheetId, newOrder).catch((e) =>
            console.warn('Google Sheet API sync error:', e)
          );
        }
      });
    } catch (e) {
      console.warn('Google Sheet background sync error:', e);
    }

    // Call parent handler to update React state
    onOrderSubmitted(newOrder);
    setSubmittedOrder(newOrder);
    setIsSubmitting(false);

    // c) Open direct WhatsApp chat with simple Hi message
    const url = 'https://wa.me/923097425011?text=Hi, I need a website';

    try {
      window.open(url, '_blank');
    } catch (e) {
      console.error('Window open failed', e);
    }
  };

  return (
    <section id="order-form" className="py-20 bg-[#070D1F] circuit-bg relative border-b border-blue-900/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0A1633] border border-blue-500/30 text-xs font-mono text-cyan-400 mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>ENCRYPTED & SANITIZED INTAKE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Order Your Custom Website
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Directly reviewed and deployed by developer <span className="text-cyan-400 font-semibold">Mukarram Ali</span>. Your details are safe and protected against unauthorized access.
          </p>
        </div>

        {/* Main Form Container */}
        <div className="rounded-3xl bg-[#0A1122]/95 border border-blue-500/30 p-6 sm:p-10 shadow-[0_0_50px_rgba(0,136,255,0.2)]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Row 1: Full Name & WhatsApp Number */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                  Full Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Mukarram Ali"
                  className="w-full px-4 py-3 rounded-xl bg-[#070D1F] border border-blue-900/80 focus:border-cyan-400 text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all text-sm"
                />
                {errors.fullName && (
                  <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{errors.fullName}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                  WhatsApp Number <span className="text-rose-400">*</span>
                </label>
                <input
                  type="tel"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="e.g. +92 312 9054452"
                  className="w-full px-4 py-3 rounded-xl bg-[#070D1F] border border-blue-900/80 focus:border-cyan-400 text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all text-sm font-mono"
                />
                {errors.whatsapp && (
                  <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{errors.whatsapp}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Row 2: Email & Base Budget */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                  Email Address <span className="text-rose-400">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="client@yourcompany.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#070D1F] border border-blue-900/80 focus:border-cyan-400 text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all text-sm"
                />
                {errors.email && (
                  <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                  Base Budget (Auto-filled from Slider) <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3.5 text-cyan-400 font-mono text-sm font-bold">Rs.</span>
                  <input
                    type="number"
                    min={5000}
                    step={500}
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#070D1F] border border-blue-900/80 focus:border-cyan-400 text-cyan-300 font-mono font-bold placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all text-sm"
                  />
                </div>
                {errors.budget && (
                  <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{errors.budget}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Row 3: Website Requirement */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                Describe Your Website Requirement <span className="text-rose-400">*</span>
              </label>
              <textarea
                rows={4}
                value={requirement}
                onChange={(e) => setRequirement(e.target.value)}
                placeholder="I need this type of website... (e.g. E-Commerce store for organic products with JazzCash payment gateway and 100% hack-proof defense)"
                className="w-full px-4 py-3 rounded-xl bg-[#070D1F] border border-blue-900/80 focus:border-cyan-400 text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all text-sm leading-relaxed"
              />
              {errors.requirement && (
                <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{errors.requirement}</span>
                </p>
              )}
            </div>

            {/* Core Checkboxes with Exact Copy */}
            <div className="border-t border-blue-900/60 pt-6 space-y-4">
              <span className="block text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-3">
                Optional Premium Add-ons & Maintenance:
              </span>

              {/* Checkbox 1 */}
              <label className="flex items-start gap-3 p-3.5 rounded-xl bg-[#070D1F] border border-blue-900/60 hover:border-cyan-400/50 cursor-pointer transition-all">
                <input
                  type="checkbox"
                  checked={addons.domain}
                  onChange={(e) => setAddons({ ...addons, domain: e.target.checked })}
                  className="mt-1 h-4 w-4 rounded border-blue-600 text-cyan-500 focus:ring-cyan-400 bg-slate-900"
                />
                <div className="text-xs sm:text-sm text-slate-200 leading-snug">
                  <span className="font-semibold text-white">Do you need a proper domain name like http://www.yourname.com?</span>
                  <span className="block text-cyan-400 font-mono text-xs mt-0.5">+ Rs. 10,000/month extra for domain</span>
                </div>
              </label>

              {/* Checkbox 2 */}
              <label className="flex items-start gap-3 p-3.5 rounded-xl bg-[#070D1F] border border-blue-900/60 hover:border-cyan-400/50 cursor-pointer transition-all">
                <input
                  type="checkbox"
                  checked={addons.management}
                  onChange={(e) => setAddons({ ...addons, management: e.target.checked })}
                  className="mt-1 h-4 w-4 rounded border-blue-600 text-cyan-500 focus:ring-cyan-400 bg-slate-900"
                />
                <div className="text-xs sm:text-sm text-slate-200 leading-snug">
                  <span className="font-semibold text-white">Do you want us to manage your website?</span>
                  <span className="block text-cyan-400 font-mono text-xs mt-0.5">Monthly Rs. 30,000 to Rs. 70,000 depending on website size (Base: Rs. 30,000/month)</span>
                </div>
              </label>

              {/* Checkbox 3 */}
              <label className="flex items-start gap-3 p-3.5 rounded-xl bg-[#070D1F] border border-blue-900/60 hover:border-cyan-400/50 cursor-pointer transition-all">
                <input
                  type="checkbox"
                  checked={addons.runAds}
                  onChange={(e) => setAddons({ ...addons, runAds: e.target.checked })}
                  className="mt-1 h-4 w-4 rounded border-blue-600 text-cyan-500 focus:ring-cyan-400 bg-slate-900"
                />
                <div className="text-xs sm:text-sm text-slate-200 leading-snug">
                  <span className="font-semibold text-white">Do you want us to run ads for you?</span>
                  <span className="block text-cyan-400 font-mono text-xs mt-0.5">2 Ads Per Week, Rs. 1000 Per Ad (+ Rs. 2,000)</span>
                </div>
              </label>

              {/* Checkbox 4 */}
              <label className="flex items-start gap-3 p-3.5 rounded-xl bg-[#070D1F] border border-blue-900/60 hover:border-cyan-400/50 cursor-pointer transition-all">
                <input
                  type="checkbox"
                  checked={addons.createAdDesigns}
                  onChange={(e) => setAddons({ ...addons, createAdDesigns: e.target.checked })}
                  className="mt-1 h-4 w-4 rounded border-blue-600 text-cyan-500 focus:ring-cyan-400 bg-slate-900"
                />
                <div className="text-xs sm:text-sm text-slate-200 leading-snug">
                  <span className="font-semibold text-white">Do you want us to CREATE ad posts/designs for you?</span>
                  <span className="block text-cyan-400 font-mono text-xs mt-0.5">Rs. 1000 Per Ad/Post (+ Rs. 2,000 for 2 designs)</span>
                </div>
              </label>
            </div>

            {/* Live Total Calculation Summary Box */}
            <div className="rounded-2xl bg-[#070D1F] border border-blue-500/40 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                  Estimated Total Investment:
                </span>
                <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-[#0088FF] tabular-nums">
                  {formatCurrencyPKR(totalCost)}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Base {formatCurrencyPKR(budget)} + Add-ons {formatCurrencyPKR(domainCost + managementCost + runAdsCost + createAdsCost)}
                </div>
              </div>

              <div className="flex flex-col items-center sm:items-end w-full sm:w-auto">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-base text-slate-950 bg-gradient-to-r from-cyan-400 via-[#0088FF] to-blue-500 hover:from-cyan-300 hover:to-blue-400 shadow-[0_0_25px_rgba(0,136,255,0.7)] hover:shadow-[0_0_35px_rgba(0,240,255,0.9)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Placing Order...</span>
                  ) : (
                    <>
                      <MessageCircle className="w-5 h-5 fill-slate-950" />
                      <span>Place Order</span>
                    </>
                  )}
                </button>
                <p className="text-[11px] text-slate-400 mt-2 text-center sm:text-right font-mono">
                  You will be redirected to WhatsApp to send message from your number
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* BIG SUCCESS POPUP MODAL */}
      {submittedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070D1F]/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#0A1122] border-2 border-cyan-400 p-6 sm:p-8 shadow-[0_0_60px_rgba(0,136,255,0.6)] text-center">
            {/* Glowing Success Badge */}
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto mb-5 text-emerald-400 shadow-[0_0_25px_rgba(52,211,153,0.5)]">
              <Check className="w-9 h-9 stroke-[3]" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
              Order Received!
            </h3>

            {/* Exact Required Success Message */}
            <div className="p-4 rounded-xl bg-[#0D1C3D] border border-cyan-400/40 text-cyan-200 text-sm sm:text-base font-semibold mb-6">
              "Thank you! Developer Mukarram Ali will contact you within 24 hours via WhatsApp."
            </div>

            {/* Order Details Brief */}
            <div className="text-left bg-[#070D1F] p-4 rounded-xl border border-blue-900/60 mb-6 text-xs space-y-1.5 font-mono">
              <div className="flex justify-between">
                <span className="text-slate-400">Order ID:</span>
                <span className="text-cyan-400 font-bold">{submittedOrder.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Client:</span>
                <span className="text-white">{submittedOrder.clientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">WhatsApp:</span>
                <span className="text-white">{submittedOrder.whatsapp}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Calculated Total:</span>
                <span className="text-emerald-400 font-bold">{formatCurrencyPKR(submittedOrder.totalPrice ?? submittedOrder.budget ?? 0)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <a
                href="https://wa.me/923097425011?text=Hi, I need a website"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:opacity-95 shadow-[0_0_25px_rgba(52,211,153,0.5)] flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5 fill-slate-950" />
                <span>Open WhatsApp Chat with Mukarram Ali Now</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={() => setSubmittedOrder(null)}
                className="w-full py-2.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
              >
                Close & Return to Website
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
