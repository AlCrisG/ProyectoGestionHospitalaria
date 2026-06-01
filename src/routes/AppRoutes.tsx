import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ProtectedRoute } from './ProtectedRoute';
import { MainLayout } from '../components/layout/MainLayout';
import { LoginPage } from '../pages/auth/LoginPage';
import { DashboardPage } from '../pages/dashboard/DashboardPage';
import { UsuariosPage } from '../pages/usuarios/UsuariosPage';
import { PacientesPage } from '../pages/pacientes/PacientesPage';
import { ExpedientePage } from '../pages/pacientes/ExpedientePage';
import { MedicosPage } from '../pages/medicos/MedicosPage';
import { EspecialidadesPage } from '../pages/medicos/EspecialidadesPage';
import { ConsultasPage } from '../pages/consultas/ConsultasPage';
import { ConsultaDetailPage } from '../pages/consultas/ConsultaDetailPage';
import { MedicamentosPage } from '../pages/farmacia/MedicamentosPage';
import { RecetasPage } from '../pages/farmacia/RecetasPage';
import { LaboratorioPage } from '../pages/laboratorio/LaboratorioPage';
import { HospitalizacionesPage } from '../pages/hospitalizaciones/HospitalizacionesPage';
import { FacturacionPage } from '../pages/facturacion/FacturacionPage';
import { PagosPage } from '../pages/facturacion/PagosPage';
import { AuditoriaAccesosPage } from '../pages/auditoria/AuditoriaAccesosPage';
import { AuditoriaCambiosPage } from '../pages/auditoria/AuditoriaCambiosPage';
import { RespaldosPage } from '../pages/auditoria/RespaldosPage';
import { Loader } from '../components/feedback/Loader';

function PublicOnly({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <Loader className="min-h-screen" />;
  if (isAuthenticated) return <Navigate to="/" replace />;
  return <>{children}</>;
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<PublicOnly><LoginPage /></PublicOnly>} />
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="usuarios" element={<UsuariosPage />} />
        <Route path="pacientes" element={<PacientesPage />} />
        <Route path="pacientes/:id/expediente" element={<ExpedientePage />} />
        <Route path="medicos" element={<MedicosPage />} />
        <Route path="especialidades" element={<EspecialidadesPage />} />
        <Route path="consultas" element={<ConsultasPage />} />
        <Route path="consultas/:id" element={<ConsultaDetailPage />} />
        <Route path="farmacia/medicamentos" element={<MedicamentosPage />} />
        <Route path="farmacia/recetas" element={<RecetasPage />} />
        <Route path="laboratorio" element={<LaboratorioPage />} />
        <Route path="hospitalizaciones" element={<HospitalizacionesPage />} />
        <Route path="facturacion" element={<FacturacionPage />} />
        <Route path="facturacion/:id/pagos" element={<PagosPage />} />
        <Route path="auditoria/accesos" element={<AuditoriaAccesosPage />} />
        <Route path="auditoria/cambios" element={<AuditoriaCambiosPage />} />
        <Route path="auditoria/respaldos" element={<RespaldosPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
