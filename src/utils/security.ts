/**
 * Security & Input Sanitization Utilities
 * Enforces strict XSS prevention and safe input handling
 */

export function sanitizeInput(input: string): string {
  if (!input) return '';
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
}

export function validateEmail(email: string): boolean {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email.trim());
}

export function validatePhone(phone: string): boolean {
  // Accepts standard Pakistani and international formats
  const clean = phone.replace(/[^0-9+]/g, '');
  return clean.length >= 10 && clean.length <= 16;
}

export function formatCurrencyPKR(amount: number): string {
  return 'Rs. ' + amount.toLocaleString('en-PK');
}

export function generateWhatsAppLink(
  whatsappRaw: string = '923097425011',
  _details?: any
): string {
  const cleanPhone = (whatsappRaw || '923097425011').replace(/[^0-9]/g, '') || '923097425011';
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hi, I need a website')}`;
}
