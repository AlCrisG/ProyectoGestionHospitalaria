import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Plus } from 'lucide-react';
import { auditoriaApi } from '../../api';
import { Respaldo } from '../../types';
import { respaldoSchema, zodFormResolver } from '../../schemas';
import { z } from 'zod';
import { PageWrapper } from '../../components/ui/PageWrapper';
import { PageHeader } from '../../components/ui/PageHeader';
import { DataTable } from '../../components/ui/DataTable';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Loader } from '../../components/feedback/Loader';
import { useToast } from '../../components/feedback/Toast';
import { formatDateTime } from '../../utils/formatters';
import { usePermissions } from '../../hooks/usePermissions';

type FormData = z.infer<typeof respaldoSchema>;

export function RespaldosPage() {
  const [data, setData] = useState<Respaldo[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const { toast } = useToast();
  const { isAdmin } = usePermissions();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodFormResolver(respaldoSchema),
    defaultValues: { tipo: 'completo', estatus: 'exitoso' },
  });

  const load = () => {
    setLoading(true);
    auditoriaApi.getRespaldos().then(setData).finally(() => setLoading(false));
  };

  useEffect(load, []);

  const onSubmit = async (form: FormData) => {
    await auditoriaApi.createRespaldo({
      ...form,
      fecha_inicio: new Date().toISOString(),
      fecha_fin: new Date().toISOString(),
    });
    toast('Respaldo registrado');
    setModalOpen(false);
    load();
  };

  if (loading) return <Loader />;

  return (
    <PageWrapper>
      <PageHeader
        title="Respaldos realizados"
        subtitle="RF32, RF33 — Control de respaldos"
        action={isAdmin && <Button onClick={() => { reset({ tipo: 'completo', ruta_archivo: '/backups/sigeh_' + Date.now() + '.backup', estatus: 'exitoso' }); setModalOpen(true); }}><Plus className="h-4 w-4" /> Registrar</Button>}
      />
      <DataTable
        data={data as unknown as Record<string, unknown>[]}
        columns={[
          { key: 'fecha_inicio', header: 'Inicio', render: (r) => formatDateTime((r as unknown as Respaldo).fecha_inicio) },
          { key: 'tipo', header: 'Tipo' },
          { key: 'ruta_archivo', header: 'Ruta' },
          { key: 'tamano_mb', header: 'Tamaño (MB)' },
          { key: 'estatus', header: 'Estatus', render: (r) => <StatusBadge status={(r as unknown as Respaldo).estatus} /> },
        ]}
      />
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Registrar respaldo">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Tipo" {...register('tipo')} error={errors.tipo?.message} required />
          <Input label="Ruta del archivo" {...register('ruta_archivo')} error={errors.ruta_archivo?.message} required />
          <Input label="Estatus" {...register('estatus')} error={errors.estatus?.message} required />
          <Button type="submit" className="w-full">Registrar</Button>
        </form>
      </Modal>
    </PageWrapper>
  );
}
