import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Plus, CreditCard } from 'lucide-react';
import { facturasApi, pacientesApi } from '../../api';
import { Factura, Paciente } from '../../types';
import { facturaSchema, zodFormResolver } from '../../schemas';
import { z } from 'zod';
import { PageWrapper } from '../../components/ui/PageWrapper';
import { PageHeader } from '../../components/ui/PageHeader';
import { DataTable } from '../../components/ui/DataTable';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Loader } from '../../components/feedback/Loader';
import { useToast } from '../../components/feedback/Toast';
import { formatDateTime, formatCurrency } from '../../utils/formatters';
import { ESTADOS_FACTURA } from '../../utils/constants';

type FormData = z.infer<typeof facturaSchema>;

export function FacturacionPage() {
  const [data, setData] = useState<Factura[]>([]);
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const { toast } = useToast();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodFormResolver(facturaSchema),
    defaultValues: { estado: 'pendiente' },
  });

  const load = () => {
    setLoading(true);
    Promise.all([facturasApi.getAll(), pacientesApi.getAll()])
      .then(([f, p]) => { setData(f); setPacientes(p); })
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const onSubmit = async (form: FormData) => {
    await facturasApi.create({ ...form, fecha_emision: new Date().toISOString() });
    toast('Factura generada');
    setModalOpen(false);
    load();
  };

  if (loading) return <Loader />;

  return (
    <PageWrapper>
      <PageHeader title="Facturación" subtitle="RF26, RF28 — Facturas y estados" action={<Button onClick={() => { reset({ id_paciente: pacientes[0]?.id_paciente ?? 1, monto_total: 0, estado: 'pendiente' }); setModalOpen(true); }}><Plus className="h-4 w-4" /> Nueva factura</Button>} />
      <DataTable
        data={data as unknown as Record<string, unknown>[]}
        searchKeys={['estado'] as never[]}
        columns={[
          { key: 'id_factura', header: 'No.' },
          { key: 'paciente', header: 'Paciente', render: (r) => (r as unknown as Factura).paciente?.nombre_completo ?? '—' },
          { key: 'fecha_emision', header: 'Emisión', render: (r) => formatDateTime((r as unknown as Factura).fecha_emision) },
          { key: 'monto_total', header: 'Monto', render: (r) => formatCurrency((r as unknown as Factura).monto_total) },
          { key: 'estado', header: 'Estado', render: (r) => <StatusBadge status={(r as unknown as Factura).estado} /> },
        ]}
        actions={(row) => {
          const f = row as unknown as Factura;
          return f.estado === 'pendiente' ? (
            <Link to={`/facturacion/${f.id_factura}/pagos`}><Button size="sm" variant="secondary"><CreditCard className="h-4 w-4" /> Pagar</Button></Link>
          ) : null;
        }}
      />
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Generar factura">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Select label="Paciente" options={pacientes.map((p) => ({ value: p.id_paciente, label: p.nombre_completo }))} {...register('id_paciente')} error={errors.id_paciente?.message} />
          <Input label="Monto total" type="number" step="0.01" {...register('monto_total')} error={errors.monto_total?.message} required />
          <Select label="Estado" options={ESTADOS_FACTURA.map((e) => ({ value: e, label: e }))} {...register('estado')} />
          <Button type="submit" className="w-full">Generar</Button>
        </form>
      </Modal>
    </PageWrapper>
  );
}
