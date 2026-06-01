import { format, parseISO, isValid } from 'date-fns';
import { es } from 'date-fns/locale';

export function formatDate(dateStr: string | undefined): string {
  if (!dateStr) return '—';
  try {
    const d = dateStr.includes('T') ? parseISO(dateStr) : new Date(dateStr);
    if (!isValid(d)) return dateStr;
    return format(d, 'dd/MM/yyyy', { locale: es });
  } catch {
    return dateStr;
  }
}

export function formatDateTime(dateStr: string | undefined): string {
  if (!dateStr) return '—';
  try {
    const d = parseISO(dateStr);
    if (!isValid(d)) return dateStr;
    return format(d, "dd/MM/yyyy HH:mm", { locale: es });
  } catch {
    return dateStr;
  }
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(amount);
}

export function cn(...classes: (string | false | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
