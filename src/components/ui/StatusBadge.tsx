import { cn } from '../../utils/formatters';

const styles: Record<string, string> = {
  pendiente: 'bg-amber-100 text-amber-800',
  pagada: 'bg-emerald-100 text-emerald-800',
  cancelada: 'bg-slate-100 text-slate-600',
  atendida: 'bg-emerald-100 text-emerald-800',
  finalizada: 'bg-blue-100 text-blue-800',
  exitoso: 'bg-emerald-100 text-emerald-800',
  fallido: 'bg-red-100 text-red-800',
  activo: 'bg-emerald-100 text-emerald-800',
  inactivo: 'bg-slate-100 text-slate-500',
};

export function StatusBadge({ status }: { status: string }) {
  const key = status.toLowerCase();
  return (
    <span className={cn('inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize', styles[key] || 'bg-slate-100 text-slate-600')}>
      {status}
    </span>
  );
}
