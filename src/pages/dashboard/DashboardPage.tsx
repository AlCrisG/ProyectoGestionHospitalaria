import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Calendar, Receipt, Pill, ArrowRight } from 'lucide-react';
import { dashboardApi } from '../../api';
import { DashboardStats } from '../../types';
import { PageWrapper } from '../../components/ui/PageWrapper';
import { PageHeader } from '../../components/ui/PageHeader';
import { StatCard } from '../../components/ui/StatCard';
import { Loader } from '../../components/feedback/Loader';
import { useAuth } from '../../context/AuthContext';
import { getNavForRole } from '../../routes/roleConfig';
import { RolNombre } from '../../types';
import { fadeInView } from '../../utils/animations';

export function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dashboardApi.getStats().then(setStats).finally(() => setLoading(false));
  }, []);

  const quickLinks = user ? getNavForRole(user.rol as RolNombre).filter((n) => n.path !== '/') : [];

  if (loading) return <Loader />;

  return (
    <PageWrapper>
      <PageHeader
        title={`Bienvenido, ${user?.username}`}
        subtitle="Panel de control del Hospital Regional SIGEH"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Pacientes" value={stats?.totalPacientes ?? 0} icon={Users} color="bg-primary" />
        <StatCard title="Consultas hoy" value={stats?.consultasHoy ?? 0} icon={Calendar} color="bg-sky-500" />
        <StatCard title="Facturas pendientes" value={stats?.facturasPendientes ?? 0} icon={Receipt} color="bg-amber-500" />
        <StatCard title="Stock bajo" value={stats?.medicamentosStockBajo ?? 0} icon={Pill} color="bg-red-500" />
      </div>
      <motion.div {...fadeInView}>
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Accesos rápidos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickLinks.map((link, i) => (
            <motion.div key={link.path} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Link
                to={link.path}
                className="group flex items-center gap-4 rounded-xl border border-slate-100 bg-white p-5 shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
              >
                <div className="rounded-xl bg-primary-50 p-3 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <link.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-800">{link.label}</p>
                  <p className="text-xs text-slate-500">Ir al módulo</p>
                </div>
                <ArrowRight className="h-5 w-5 text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </PageWrapper>
  );
}
