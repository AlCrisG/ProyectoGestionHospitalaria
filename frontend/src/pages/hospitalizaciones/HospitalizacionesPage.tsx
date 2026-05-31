import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Plus } from 'lucide-react';
import { hospitalizacionesApi, pacientesApi } from '../../api';
import { Hospitalizacion, Paciente } from '../../types';
import { hospitalizacionSchema, zodFormResolver } from '../../schemas';
import { z } from 'zod';
import { PageWrapper } from '../../components/ui/PageWrapper';
import { PageHeader } from '../../components/ui/PageHeader';
import { DataTable } from '../../components/ui/DataTable';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Textarea } from '../../components/ui/Textarea';
import { Loader } from '../../components/feedback/Loader';
import { useToast } from '../../components/feedback/Toast';
import { formatDateTime } from '../../utils/formatters';

type FormData = z.infer<typeof hospitalizacionSchema>;

export function HospitalizacionesPage() {
  const [data, setData] = useState<Hospitalizacion[]>([]);
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const { toast } = useToast();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodFormResolver(hospitalizacionSchema),
  });

  const load = () => {
    setLoading(true);
    Promise.all([hospitalizacionesApi.getAll(), pacientesApi.getAll()])
      .then(([h, p]) => { setData(h); setPacientes(p); })
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const onSubmit = async (form: FormData) => {
    await hospitalizacionesApi.create(form);
    toast('Hospitalización registrada');
    setModalOpen(false);
    load();
  };

  if (loading) return <Loader />;

  return (
    <PageWrapper>
      <PageHeader title="Hospitalizaciones" subtitle="RF24, RF25 — Ingresos y egresos" action={<Button onClick={() => { reset({ id_paciente: pacientes[0]?.id_paciente ?? 1, fecha_ingreso: new Date().toISOString().slice(0, 16), habitacion: '', motivo: '' }); setModalOpen(true); }}><Plus className="h-4 w-4" /> Nueva</Button>} />
      <DataTable
        data={data as unknown as Record<string, unknown>[]}
        searchKeys={['habitacion', 'motivo'] as never[]}
        columns={[
          { key: 'paciente', header: 'Paciente', render: (r) => (r as unknown as Hospitalizacion).paciente?.nombre_completo ?? '—' },
          { key: 'fecha_ingreso', header: 'Ingreso', render: (r) => formatDateTime((r as unknown as Hospitalizacion).fecha_ingreso) },
          { key: 'fecha_egreso', header: 'Egreso', render: (r) => formatDateTime((r as unknown as Hospitalizacion).fecha_egreso) },
          { key: 'habitacion', header: 'Habitación' },
          { key: 'motivo', header: 'Motivo' },
        ]}
      />
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Registrar hospitalización" size="lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Select label="Paciente" options={pacientes.map((p) => ({ value: p.id_paciente, label: p.nombre_completo }))} {...register('id_paciente')} error={errors.id_paciente?.message} />
          <Input label="Fecha ingreso" type="datetime-local" {...register('fecha_ingreso')} error={errors.fecha_ingreso?.message} required />
          <Input label="Fecha egreso" type="datetime-local" {...register('fecha_egreso')} />
          <Input label="Habitación" {...register('habitacion')} error={errors.habitacion?.message} required />
          <Textarea label="Motivo" {...register('motivo')} />
          <Button type="submit" className="w-full">Guardar</Button>
        </form>
      </Modal>
    </PageWrapper>
  );
}
