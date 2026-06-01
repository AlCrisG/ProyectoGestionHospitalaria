import { RolNombre } from '../types';

export const APP_NAME = 'SIGEH';
export const APP_SUBTITLE = 'Sistema Integral de Gestión Hospitalaria';

export const METODOS_PAGO = ['efectivo', 'tarjeta', 'transferencia'] as const;

export const ESTADOS_FACTURA = ['pendiente', 'pagada', 'cancelada'] as const;

export const DEMO_USERS: Record<string, { password: string; rol: RolNombre; id: number }> = {
  admin: { password: 'admin123', rol: 'administrador', id: 1 },
  medico1: { password: 'medico123', rol: 'medico', id: 2 },
  recepcion: { password: 'recep123', rol: 'recepcionista', id: 3 },
  auditor: { password: 'audit123', rol: 'auditor', id: 4 },
};
