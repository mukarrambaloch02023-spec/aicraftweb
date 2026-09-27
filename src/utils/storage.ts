import { Order, Client, ServicePackage, AdminSettings } from '../types';

const STORAGE_KEYS = {
  ORDERS: 'aicraft_orders',
  SERVICES: 'aicraftweb_services_v1',
  CLIENTS: 'aicraftweb_clients_v1',
  SETTINGS: 'aicraftweb_settings_v1',
};

export const DEFAULT_SERVICES: ServicePackage[] = [
  {
    id: 'srv-basic',
    name: 'Basic',
    price: 5000,
    tagline: 'Ideal for single landing pages & fast online presence',
    pages: '1 Page Landing Page',
    features: [
      '1 Custom High-Speed Landing Page',
      'Modern Astra Theme Genuine License',
      'Instant WhatsApp Chat Integration',
      '100% Mobile & Tablet Responsive',
      'Sanitized Inquiry Contact Form',
      'Free SSL Encryption & Speed Tuning'
    ],
    deliveryTime: '2 Days',
    isPopular: false,
  },
  {
    id: 'srv-pro',
    name: 'Pro',
    price: 10000,
    tagline: 'Best for growing businesses needing full presence, SEO & speed',
    pages: '5 Pages (Home, About, Services, Pricing, Contact)',
    features: [
      '5 Complete Responsive Web Pages',
      'Astra Pro Genuine License Included',
      'Google Lighthouse Speed Score 95+',
      'WhatsApp Live Chat Integration',
      'Advanced On-Page Technical SEO',
      'Hack-Proof Security Hardening',
      'Client Inquiry & Testimonials Funnel'
    ],
    deliveryTime: '4 Days',
    isPopular: true,
  },
  {
    id: 'srv-premium',
    name: 'Premium',
    price: 20000,
    tagline: 'Complete e-commerce & high-converting secure online store',
    pages: 'Full E-Commerce Store',
    features: [
      'Full E-Commerce Store (WooCommerce)',
      'Payment Gateway Integration (JazzCash/EasyPaisa/Stripe)',
      '1 Month Free Priority Support & Updates',
      'Technical Brand Logo Included',
      'Cloudflare Enterprise Firewall & WAF',
      'Daily Automated Cloud Backups',
      'Speed Score 98+ & Zero-Breach Setup'
    ],
    deliveryTime: '7 Days',
    isPopular: false,
  },
];

export const DEFAULT_SETTINGS: AdminSettings = {
  adminPasscode: '@tekken888!',
  ownerName: 'Mukarram Ali',
  whatsappNumber: '03097425011',
  whatsappRaw: '923097425011',
  email: 'mukarrambaloch02023@gmail.com',
  phone: '03097425011',
  location: 'Pakistan',
  websiteDomain: 'www.aicraftweb.com',
  activeLogoType: 'circuit',
};

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ACW-1089',
    clientName: 'Hamza Tariq',
    email: 'hamza.tariq@nexustech.pk',
    whatsapp: '+92 301 8452190',
    requirement: 'Need an e-commerce clothing shop with JazzCash & EasyPaisa payments, fast checkout.',
    serviceType: 'Premium',
    baseBudget: 20000,
    totalPrice: 20000,
    addons: {
      domain: false,
      management: false,
      runAds: false,
      createAdDesigns: false,
    },
    status: 'In Progress',
    date: '2026-09-24',
    notes: 'Theme customized, working on payment gateway credentials.',
  },
  {
    id: 'ACW-1088',
    clientName: 'Dr. Ayesha Malik',
    email: 'ayesha.malik@lahoreclinic.com',
    whatsapp: '+92 322 7109923',
    requirement: 'A modern medical consultation site with patient booking & WhatsApp direct chat.',
    serviceType: 'Pro',
    baseBudget: 10000,
    totalPrice: 10000,
    addons: {
      domain: false,
      management: false,
      runAds: false,
      createAdDesigns: false,
    },
    status: 'Completed',
    date: '2026-09-22',
    notes: 'Delivered ahead of schedule. Client gave 5 stars.',
  },
  {
    id: 'ACW-1087',
    clientName: 'Zubair Qureshi',
    email: 'zubair@qureshitraders.com',
    whatsapp: '+92 333 4567890',
    requirement: 'Single page landing page showcasing our industrial export products with direct inquiry form.',
    serviceType: 'Basic',
    baseBudget: 5000,
    totalPrice: 5000,
    addons: {
      domain: false,
      management: false,
      runAds: false,
      createAdDesigns: false,
    },
    status: 'Completed',
    date: '2026-09-21',
    notes: 'Astra theme setup complete, WhatsApp link tested.',
  },
  {
    id: 'ACW-1086',
    clientName: 'Bilal Farooq',
    email: 'bilal@karachidigital.co',
    whatsapp: '+92 345 9988112',
    requirement: 'Full agency portal with case studies and interactive quote calculator like AiCraftWeb.',
    serviceType: 'Pro',
    baseBudget: 10000,
    totalPrice: 10000,
    addons: {
      domain: false,
      management: false,
      runAds: false,
      createAdDesigns: false,
    },
    status: 'Pending',
    date: '2026-09-20',
    notes: 'Awaiting logo and brand assets from client.',
  },
  {
    id: 'ACW-1085',
    clientName: 'Usman Ghani',
    email: 'usman@ghanirealestate.pk',
    whatsapp: '+92 300 5544332',
    requirement: 'Real estate listings landing page in Islamabad with high-res property gallery and map integration.',
    serviceType: 'Premium',
    baseBudget: 20000,
    totalPrice: 20000,
    addons: {
      domain: false,
      management: false,
      runAds: false,
      createAdDesigns: false,
    },
    status: 'Pending',
    date: '2026-09-19',
    notes: 'Requirement intake call booked on WhatsApp.',
  },
  {
    id: 'ACW-1084',
    clientName: 'Saad Rafique',
    email: 'saad@pakgym.pk',
    whatsapp: '+92 313 1239874',
    requirement: 'Gym membership signup page with WhatsApp direct inquiry and trainer schedules.',
    serviceType: 'Basic',
    baseBudget: 5000,
    totalPrice: 5000,
    addons: {
      domain: false,
      management: false,
      runAds: false,
      createAdDesigns: false,
    },
    status: 'Completed',
    date: '2026-09-18',
    notes: 'Domain connected and SSL activated successfully.',
  },
  {
    id: 'ACW-1083',
    clientName: 'Maryam Siddiqui',
    email: 'maryam@botanicaorganics.com',
    whatsapp: '+92 321 6677889',
    requirement: 'Organic skincare shop with 20 items, discount coupon system, and WhatsApp checkout.',
    serviceType: 'Premium',
    baseBudget: 20000,
    totalPrice: 20000,
    addons: {
      domain: false,
      management: false,
      runAds: false,
      createAdDesigns: false,
    },
    status: 'In Progress',
    date: '2026-09-17',
    notes: 'Product catalog uploaded, styling checkout funnel.',
  },
  {
    id: 'ACW-1082',
    clientName: 'Kashif Mehmood',
    email: 'kashif@automech.pk',
    whatsapp: '+92 302 9900112',
    requirement: 'Automotive spare parts catalog with fast filter search and WhatsApp instant quotation button.',
    serviceType: 'Pro',
    baseBudget: 10000,
    totalPrice: 10000,
    addons: {
      domain: false,
      management: false,
      runAds: false,
      createAdDesigns: false,
    },
    status: 'Completed',
    date: '2026-09-16',
    notes: 'Project handed over and approved by client.',
  },
];

export const INITIAL_CLIENTS: Client[] = [
  {
    id: 'cl-1',
    name: 'Hamza Tariq',
    email: 'hamza.tariq@nexustech.pk',
    whatsapp: '+92 301 8452190',
    totalOrders: 1,
    totalSpent: 65000,
    joinedDate: '2026-09-24',
    company: 'Nexus Tech Clothing',
  },
  {
    id: 'cl-2',
    name: 'Dr. Ayesha Malik',
    email: 'ayesha.malik@lahoreclinic.com',
    whatsapp: '+92 322 7109923',
    totalOrders: 1,
    totalSpent: 25000,
    joinedDate: '2026-09-22',
    company: 'Lahore Clinic',
  },
  {
    id: 'cl-3',
    name: 'Zubair Qureshi',
    email: 'zubair@qureshitraders.com',
    whatsapp: '+92 333 4567890',
    totalOrders: 2,
    totalSpent: 12000,
    joinedDate: '2026-08-10',
    company: 'Qureshi Traders',
  },
  {
    id: 'cl-4',
    name: 'Bilal Farooq',
    email: 'bilal@karachidigital.co',
    whatsapp: '+92 345 9988112',
    totalOrders: 1,
    totalSpent: 19000,
    joinedDate: '2026-09-20',
    company: 'Karachi Digital Hub',
  },
  {
    id: 'cl-5',
    name: 'Usman Ghani',
    email: 'usman@ghanirealestate.pk',
    whatsapp: '+92 300 5544332',
    totalOrders: 1,
    totalSpent: 55000,
    joinedDate: '2026-09-19',
    company: 'Ghani Real Estate',
  },
  {
    id: 'cl-6',
    name: 'Maryam Siddiqui',
    email: 'maryam@botanicaorganics.com',
    whatsapp: '+92 321 6677889',
    totalOrders: 1,
    totalSpent: 67000,
    joinedDate: '2026-09-17',
    company: 'Botanica Organics',
  },
];

export function getStoredOrders(): Order[] {
  try {
    const raw = localStorage.getItem('aicraft_orders') || localStorage.getItem('aicraftweb_orders_v1');
    if (!raw) {
      localStorage.setItem('aicraft_orders', JSON.stringify(INITIAL_ORDERS));
      return INITIAL_ORDERS;
    }
    const parsed = JSON.parse(raw);
    localStorage.setItem('aicraft_orders', JSON.stringify(parsed));
    return parsed;
  } catch {
    return INITIAL_ORDERS;
  }
}

export function saveOrders(orders: Order[]): void {
  try {
    localStorage.setItem('aicraft_orders', JSON.stringify(orders));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('storage'));
    }
  } catch (e) {
    console.error('Failed to save orders', e);
  }
}

export function getStoredServices(): ServicePackage[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SERVICES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(DEFAULT_SERVICES));
      return DEFAULT_SERVICES;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_SERVICES;
  }
}

export function saveServices(services: ServicePackage[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
  } catch (e) {
    console.error('Failed to save services', e);
  }
}

export function getStoredClients(): Client[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CLIENTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(INITIAL_CLIENTS));
      return INITIAL_CLIENTS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_CLIENTS;
  }
}

export function saveClients(clients: Client[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(clients));
  } catch (e) {
    console.error('Failed to save clients', e);
  }
}

export function getStoredSettings(): AdminSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
      return DEFAULT_SETTINGS;
    }
    const parsed = JSON.parse(raw);
    parsed.activeLogoType = 'circuit';
    parsed.websiteDomain = parsed.websiteDomain || 'www.aicraftweb.com';
    // Ensure updated phone & whatsapp number is active
    parsed.whatsappNumber = '03097425011';
    parsed.whatsappRaw = '923097425011';
    parsed.phone = '03097425011';
    parsed.email = 'mukarrambaloch02023@gmail.com';
    if (parsed.adminPasscode === 'aicraft2026') {
      parsed.adminPasscode = '@tekken888!';
    }
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(parsed));
    return parsed;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: AdminSettings): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save settings', e);
  }
}
