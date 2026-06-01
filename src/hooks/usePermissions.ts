import { useAuth } from '../context/AuthContext';
import { canAccessRoute } from '../routes/roleConfig';
import { RolNombre } from '../types';

export function usePermissions() {
  const { user } = useAuth();
  const rol = user?.rol as RolNombre | undefined;

  return {
    rol,
    canAccess: (path: string) => (rol ? canAccessRoute(rol, path) : false),
    isAdmin: rol === 'administrador',
    isMedico: rol === 'medico',
    isRecepcionista: rol === 'recepcionista',
    isAuditor: rol === 'auditor',
    canWrite: rol === 'administrador' || rol === 'recepcionista',
    canEditDiagnostico: rol === 'administrador' || rol === 'medico',
  };
}
