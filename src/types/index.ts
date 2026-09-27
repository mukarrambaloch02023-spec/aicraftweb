export type OrderStatus = 'New' | 'Pending' | 'In Progress' | 'Completed';

export interface OrderAddons {
  domain: boolean; // + Rs. 10,000/mo
  management: boolean; // Rs. 30,000 - 70,000/mo (base 30,000)
  runAds: boolean; // Rs. 2,000/week (2 ads * 1000)
  createAdDesigns: boolean; // Rs. 2,000 (2 posts * 1000)
}

export interface Order {
  id: string | number;
  clientName?: string;
  name?: string;
  email?: string;
  whatsapp?: string;
  phone?: string;
  requirement: string;
  serviceType?: string;
  baseBudget?: number;
  budget?: number;
  totalPrice?: number;
  addons?: OrderAddons | any;
  status: OrderStatus;
  date: string; // ISO date or YYYY-MM-DD or formatted locale string
  notes?: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  totalOrders: number;
  totalSpent: number;
  joinedDate: string;
  company?: string;
}

export interface ServicePackage {
  id: string;
  name: string;
  price: number;
  tagline: string;
  isPopular?: boolean;
  features: string[];
  deliveryTime: string;
  pages: string;
}

export interface AdminSettings {
  adminPasscode: string;
  ownerName: string;
  whatsappNumber: string; // formatted e.g. +92 300 1234567
  whatsappRaw: string; // e.g. 923001234567
  email: string;
  phone: string;
  location: string;
  websiteDomain?: string;
  customLogoUrl?: string;
  activeLogoType?: 'brain' | 'circuit';
}
