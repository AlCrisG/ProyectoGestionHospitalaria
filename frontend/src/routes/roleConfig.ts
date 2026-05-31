import {
  LayoutDashboard, Users, UserCircle, Stethoscope, Calendar,
  FileText, Pill, FlaskConical, Bed, Receipt, Shield, Activity,
} from 'lucide-react';
import { RolNombre } from '../types';

export interface NavItem {
  path: string;
  label: string;
  icon: typeof LayoutDashboard;
  roles: RolNombre[];
}

export const NAV_ITEMS: NavItem[] = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard, roles: ['administrador', 'medico', 'recepcionista', 'auditor'] },
  { path: '/usuarios', label: 'Usuarios', icon: Users, roles: ['administrador'] },
  { path: '/pacientes', label: 'Pacientes', icon: UserCircle, roles: ['administrador', 'medico', 'recepcionista'] },
  { path: '/medicos', label: 'Médicos', icon: Stethoscope, roles: ['administrador', 'recepcionista'] },
  { path: '/especialidades', label: 'Especialidades', icon: Activity, roles: ['administrador'] },
  { path: '/consultas', label: 'Consultas', icon: Calendar, roles: ['administrador', 'medico', 'recepcionista'] },
  { path: '/farmacia/medicamentos', label: 'Medicamentos', icon: Pill, roles: ['administrador', 'medico'] },
  { path: '/farmacia/recetas', label: 'Recetas', icon: FileText, roles: ['administrador', 'medico'] },
  { path: '/laboratorio', label: 'Laboratorio', icon: FlaskConical, roles: ['administrador', 'medico'] },
  { path: '/hospitalizaciones', label: 'Hospitalizaciones', icon: Bed, roles: ['administrador', 'medico', 'recepcionista'] },
  { path: '/facturacion', label: 'Facturación', icon: Receipt, roles: ['administrador', 'recepcionista'] },
  { path: '/auditoria/accesos', label: 'Bitácora accesos', icon: Shield, roles: ['administrador', 'auditor'] },
  { path: '/auditoria/cambios', label: 'Auditoría cambios', icon: Shield, roles: ['administrador', 'auditor'] },
  { path: '/auditoria/respaldos', label: 'Respaldos', icon: Shield, roles: ['administrador', 'auditor'] },
];

export function getNavForRole(rol: RolNombre): NavItem[] {
  return NAV_ITEMS.filter((item) => item.roles.includes(rol));
}

export function canAccessRoute(rol: RolNombre, path: string): boolean {
  if (path === '/' || path === '/login') return true;
  const item = NAV_ITEMS.find((n) => path === n.path || path.startsWith(n.path + '/'));
  if (!item) {
    if (path.startsWith('/pacientes/')) return ['administrador', 'medico', 'recepcionista'].includes(rol);
    if (path.startsWith('/consultas/')) return ['administrador', 'medico', 'recepcionista'].includes(rol);
    if (path.startsWith('/facturacion/')) return ['administrador', 'recepcionista'].includes(rol);
    return rol === 'administrador';
  }
  return item.roles.includes(rol);
}
