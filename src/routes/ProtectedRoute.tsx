import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usePermissions } from '../hooks/usePermissions';
import { Loader } from '../components/feedback/Loader';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const { canAccess } = usePermissions();
  const location = useLocation();

  if (loading) return <Loader className="min-h-screen" />;
  if (!isAuthenticated) return <Navigate to="/login" state={{ from: location }} replace />;
  if (!canAccess(location.pathname)) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold text-primary">403</h1>
        <p className="mt-2 text-slate-600">No tiene permisos para acceder a esta sección.</p>
      </div>
    );
  }
  return <>{children}</>;
}
