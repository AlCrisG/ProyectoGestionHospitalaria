import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { especialidadesApi } from '../../api';
import { Especialidad } from '../../types';
import { especialidadSchema, zodFormResolver } from '../../schemas';
import { z } from 'zod';
import { PageWrapper } from '../../components/ui/PageWrapper';
import { PageHeader } from '../../components/ui/PageHeader';
import { DataTable } from '../../components/ui/DataTable';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Loader } from '../../components/feedback/Loader';
import { useToast } from '../../components/feedback/Toast';

type FormData = z.infer<typeof especialidadSchema>;

export function EspecialidadesPage() {
  const [data, setData] = useState<Especialidad[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Especialidad | null>(null);
  const { toast } = useToast();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodFormResolver(especialidadSchema),
  });

  const load = () => {
    setLoading(true);
    especialidadesApi.getAll().then(setData).finally(() => setLoading(false));
  };

  useEffect(load, []);

  const onSubmit = async (form: FormData) => {
    try {
      if (editing) {
        await especialidadesApi.update(editing.id_especialidad, form);
        toast('Especialidad actualizada');
      } else {
        await especialidadesApi.create(form);
        toast('Especialidad creada');
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
      <PageHeader title="Especialidades médicas" subtitle="RF06 — Catálogo de especialidades" action={<Button onClick={() => { setEditing(null); reset({ nombre: '', descripcion: '' }); setModalOpen(true); }}><Plus className="h-4 w-4" /> Nueva</Button>} />
      <DataTable
        data={data as unknown as Record<string, unknown>[]}
        searchKeys={['nombre'] as never[]}
        columns={[
          { key: 'nombre', header: 'Nombre' },
          { key: 'descripcion', header: 'Descripción' },
        ]}
        actions={(row) => {
          const e = row as unknown as Especialidad;
          return (
            <div className="flex gap-1">
              <Button size="sm" variant="ghost" onClick={() => { setEditing(e); reset({ nombre: e.nombre, descripcion: e.descripcion ?? '' }); setModalOpen(true); }}><Pencil className="h-4 w-4" /></Button>
              <Button size="sm" variant="ghost" onClick={async () => { await especialidadesApi.delete(e.id_especialidad); toast('Eliminada'); load(); }}><Trash2 className="h-4 w-4 text-red-500" /></Button>
            </div>
          );
        }}
      />
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Editar' : 'Nueva especialidad'}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Nombre" {...register('nombre')} error={errors.nombre?.message} required />
          <Textarea label="Descripción" {...register('descripcion')} />
          <Button type="submit" className="w-full">Guardar</Button>
        </form>
      </Modal>
    </PageWrapper>
  );
}
