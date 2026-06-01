import { useEffect, useState } from 'react';
import { auditoriaApi } from '../../api';
import { BitacoraAcceso } from '../../types';
import { PageWrapper } from '../../components/ui/PageWrapper';
import { PageHeader } from '../../components/ui/PageHeader';
import { DataTable } from '../../components/ui/DataTable';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Loader } from '../../components/feedback/Loader';
import { formatDateTime } from '../../utils/formatters';

export function AuditoriaAccesosPage() {
  const [data, setData] = useState<BitacoraAcceso[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auditoriaApi.getBitacora().then(setData).finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <PageWrapper>
      <PageHeader title="Bitácora de accesos" subtitle="RF30 — Registro de accesos al sistema" />
      <DataTable
        data={data as unknown as Record<string, unknown>[]}
        searchKeys={['ip_origen'] as never[]}
        columns={[
          { key: 'fecha_hora', header: 'Fecha/Hora', render: (r) => formatDateTime((r as unknown as BitacoraAcceso).fecha_hora) },
          { key: 'usuario', header: 'Usuario', render: (r) => (r as unknown as BitacoraAcceso).usuario?.username ?? `#${(r as unknown as BitacoraAcceso).id_usuario}` },
          { key: 'ip_origen', header: 'IP' },
          { key: 'exitoso', header: 'Resultado', render: (r) => <StatusBadge status={(r as unknown as BitacoraAcceso).exitoso ? 'exitoso' : 'fallido'} /> },
        ]}
      />
    </PageWrapper>
  );
}
