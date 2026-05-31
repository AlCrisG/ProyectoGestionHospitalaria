import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, Pencil } from 'lucide-react';
import { medicamentosApi } from '../../api';
import { Medicamento } from '../../types';
import { medicamentoSchema, zodFormResolver } from '../../schemas';
import { z } from 'zod';
import { PageWrapper } from '../../components/ui/PageWrapper';
import { PageHeader } from '../../components/ui/PageHeader';
import { DataTable } from '../../components/ui/DataTable';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Loader } from '../../components/feedback/Loader';
import { useToast } from '../../components/feedback/Toast';

type FormData = z.infer<typeof medicamentoSchema>;

export function MedicamentosPage() {
  const [data, setData] = useState<Medicamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Medicamento | null>(null);
  const { toast } = useToast();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodFormResolver(medicamentoSchema),
  });

  const load = () => {
    setLoading(true);
    medicamentosApi.getAll().then(setData).finally(() => setLoading(false));
  };

  useEffect(load, []);

  const onSubmit = async (form: FormData) => {
    try {
      if (editing) {
        await medicamentosApi.update(editing.id_medicamento, form);
        toast('Medicamento actualizado');
      } else {
        await medicamentosApi.create(form);
        toast('Medicamento registrado');
      }
      setModalOpen(false);
      load();
    } catch {
      toast('Error al guardar', 'error');
    }
  };

  if (loading) return <Loader />;

  return (
    <PageWrapper>
      <PageHeader title="Medicamentos" subtitle="RF16, RF19 — Inventario y control de stock" action={<Button onClick={() => { setEditing(null); reset({ nombre: '', sustancia_activa: '', stock: 0 }); setModalOpen(true); }}><Plus className="h-4 w-4" /> Nuevo</Button>} />
      <DataTable
        data={data as unknown as Record<string, unknown>[]}
        searchKeys={['nombre', 'sustancia_activa'] as never[]}
        columns={[
          { key: 'nombre', header: 'Nombre' },
          { key: 'sustancia_activa', header: 'Sustancia activa' },
          { key: 'stock', header: 'Stock', render: (r) => {
            const m = r as unknown as Medicamento;
            return (
              <span className={m.stock < 10 ? 'text-amber-600 font-semibold' : 'text-slate-700'}>
                {m.stock} {m.stock < 10 && '(bajo)'}
              </span>
            );
          }},
        ]}
        actions={(row) => (
          <Button size="sm" variant="ghost" onClick={() => { const m = row as unknown as Medicamento; setEditing(m); reset({ nombre: m.nombre, sustancia_activa: m.sustancia_activa, stock: m.stock }); setModalOpen(true); }}>
            <Pencil className="h-4 w-4" />
          </Button>
        )}
      />
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Editar medicamento' : 'Nuevo medicamento'}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Nombre" {...register('nombre')} error={errors.nombre?.message} required />
          <Input label="Sustancia activa" {...register('sustancia_activa')} error={errors.sustancia_activa?.message} required />
          <Input label="Stock" type="number" {...register('stock')} error={errors.stock?.message} required />
          <Button type="submit" className="w-full">Guardar</Button>
        </form>
      </Modal>
    </PageWrapper>
  );
}
