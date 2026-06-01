import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, Pencil } from 'lucide-react';
import { medicosApi, especialidadesApi, usuariosApi } from '../../api';
import { Medico, Especialidad, Usuario } from '../../types';
import { medicoSchema, zodFormResolver } from '../../schemas';
import { z } from 'zod';
import { PageWrapper } from '../../components/ui/PageWrapper';
import { PageHeader } from '../../components/ui/PageHeader';
import { DataTable } from '../../components/ui/DataTable';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Loader } from '../../components/feedback/Loader';
import { useToast } from '../../components/feedback/Toast';

type FormData = z.infer<typeof medicoSchema>;

export function MedicosPage() {
  const [data, setData] = useState<Medico[]>([]);
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [filtroEsp, setFiltroEsp] = useState<number | ''>('');
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Medico | null>(null);
  const { toast } = useToast();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodFormResolver(medicoSchema),
  });

  const load = () => {
    setLoading(true);
    const espId = filtroEsp ? Number(filtroEsp) : undefined;
    Promise.all([
      medicosApi.getAll(espId),
      especialidadesApi.getAll(),
      usuariosApi.getAll(),
    ]).then(([m, e, u]) => {
      setData(m);
      setEspecialidades(e);
      setUsuarios(u.filter((x) => x.activo));
    }).finally(() => setLoading(false));
  };

  useEffect(load, [filtroEsp]);

  const onSubmit = async (form: FormData) => {
    try {
      if (editing) {
        await medicosApi.update(editing.id_medico, form);
        toast('Médico actualizado');
      } else {
        await medicosApi.create(form);
        toast('Médico registrado');
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
      <PageHeader title="Médicos" subtitle="RF05, RF07 — Registro y consulta por especialidad" action={<Button onClick={() => { setEditing(null); reset({ nombre_completo: '', cedula_profesional: '', id_especialidad: 1, id_usuario: 1 }); setModalOpen(true); }}><Plus className="h-4 w-4" /> Nuevo médico</Button>} />
      <div className="mb-4 max-w-xs">
        <Select
          label="Filtrar por especialidad"
          options={[{ value: '', label: 'Todas' }, ...especialidades.map((e) => ({ value: e.id_especialidad, label: e.nombre }))]}
          value={filtroEsp}
          onChange={(e) => setFiltroEsp(e.target.value ? Number(e.target.value) : '')}
        />
      </div>
      <DataTable
        data={data as unknown as Record<string, unknown>[]}
        searchKeys={['nombre_completo', 'cedula_profesional'] as never[]}
        columns={[
          { key: 'nombre_completo', header: 'Nombre' },
          { key: 'cedula_profesional', header: 'Cédula' },
          { key: 'especialidad', header: 'Especialidad', render: (r) => (r as unknown as Medico).especialidad?.nombre ?? '—' },
        ]}
        actions={(row) => (
          <Button size="sm" variant="ghost" onClick={() => { const m = row as unknown as Medico; setEditing(m); reset({ nombre_completo: m.nombre_completo, cedula_profesional: m.cedula_profesional, id_especialidad: m.id_especialidad, id_usuario: m.id_usuario }); setModalOpen(true); }}>
            <Pencil className="h-4 w-4" />
          </Button>
        )}
      />
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Editar médico' : 'Nuevo médico'} size="lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Nombre completo" {...register('nombre_completo')} error={errors.nombre_completo?.message} required />
          <Input label="Cédula profesional" {...register('cedula_profesional')} error={errors.cedula_profesional?.message} required />
          <Select label="Especialidad" options={especialidades.map((e) => ({ value: e.id_especialidad, label: e.nombre }))} {...register('id_especialidad')} error={errors.id_especialidad?.message} />
          <Select label="Usuario vinculado" options={usuarios.map((u) => ({ value: u.id_usuario, label: u.username }))} {...register('id_usuario')} error={errors.id_usuario?.message} />
          <div className="flex gap-3"><Button type="submit" className="flex-1">Guardar</Button><Button type="button" variant="ghost" onClick={() => setModalOpen(false)}>Cancelar</Button></div>
        </form>
      </Modal>
    </PageWrapper>
  );
}
