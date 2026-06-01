import { useEffect, useState } from 'react';
import { auditoriaApi } from '../../api';
import { AuditoriaCambio } from '../../types';
import { PageWrapper } from '../../components/ui/PageWrapper';
import { PageHeader } from '../../components/ui/PageHeader';
import { DataTable } from '../../components/ui/DataTable';
import { Loader } from '../../components/feedback/Loader';
import { formatDateTime } from '../../utils/formatters';

export function AuditoriaCambiosPage() {
  const [data, setData] = useState<AuditoriaCambio[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<AuditoriaCambio | null>(null);

  useEffect(() => {
    auditoriaApi.getCambios().then(setData).finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <PageWrapper>
      <PageHeader title="Auditoría de cambios" subtitle="RF31 — Operaciones sobre la base de datos" />
      <DataTable
        data={data as unknown as Record<string, unknown>[]}
        searchKeys={['nombre_tabla', 'operacion'] as never[]}
        columns={[
          { key: 'fecha_hora', header: 'Fecha', render: (r) => formatDateTime((r as unknown as AuditoriaCambio).fecha_hora) },
          { key: 'nombre_tabla', header: 'Tabla' },
          { key: 'operacion', header: 'Operación' },
          { key: 'usuario_db', header: 'Usuario DB' },
        ]}
        actions={(row) => (
          <button onClick={() => setSelected(row as unknown as AuditoriaCambio)} className="text-primary text-sm hover:underline">Ver detalle</button>
        )}
      />
      {selected && (
        <div className="mt-6 rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="font-semibold mb-4">Detalle del cambio #{selected.id_auditoria}</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm text-slate-500 mb-2">Datos anteriores</p>
              <pre className="rounded-lg bg-slate-50 p-4 text-xs overflow-auto max-h-48">{JSON.stringify(selected.datos_anteriores, null, 2) || '—'}</pre>
            </div>
            <div>
              <p className="text-sm text-slate-500 mb-2">Datos nuevos</p>
              <pre className="rounded-lg bg-primary-50 p-4 text-xs overflow-auto max-h-48">{JSON.stringify(selected.datos_nuevos, null, 2) || '—'}</pre>
            </div>
          </div>
          <button onClick={() => setSelected(null)} className="mt-4 text-sm text-slate-500 hover:text-slate-700">Cerrar</button>
        </div>
      )}
    </PageWrapper>
  );
}
