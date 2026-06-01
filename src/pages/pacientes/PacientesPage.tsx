import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Plus, Pencil, FileText, Trash2, Droplet } from 'lucide-react';
import { pacientesApi, tiposSangreApi } from '../../api';
import { Paciente, TipoSangre } from '../../types';
import { pacienteSchema, tipoSangreSchema, zodFormResolver } from '../../schemas';
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
import { formatDate } from '../../utils/formatters';
import { usePermissions } from '../../hooks/usePermissions';

type FormData = z.infer<typeof pacienteSchema>;

export function PacientesPage() {
  const [data, setData] = useState<Paciente[]>([]);
  const [tipos, setTipos] = useState<TipoSangre[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [tipoModalOpen, setTipoModalOpen] = useState(false);
  const [editing, setEditing] = useState<Paciente | null>(null);
  const tipoForm = useForm<z.infer<typeof tipoSangreSchema>>({ resolver: zodFormResolver(tipoSangreSchema) });
  const { toast } = useToast();
  const { isAdmin, isRecepcionista } = usePermissions();
  const canEdit = isAdmin || isRecepcionista;

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodFormResolver(pacienteSchema),
  });

  const load = () => {
    setLoading(true);
    Promise.all([pacientesApi.getAll(), tiposSangreApi.getAll()])
      .then(([p, t]) => { setData(p); setTipos(t); })
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const openCreate = () => {
    setEditing(null);
    reset({ nombre_completo: '', fecha_nacimiento: '', id_tipo_sangre: tipos[0]?.id_tipo_sangre ?? 1, telefono: '', direccion: '' });
    setModalOpen(true);
  };

  const openEdit = (p: Paciente) => {
    setEditing(p);
    reset({ nombre_completo: p.nombre_completo, fecha_nacimiento: p.fecha_nacimiento, id_tipo_sangre: p.id_tipo_sangre, telefono: p.telefono ?? '', direccion: p.direccion ?? '' });
    setModalOpen(true);
  };

  const onSubmit = async (form: FormData) => {
    try {
      if (editing) {
        await pacientesApi.update(editing.id_paciente, form);
        toast('Paciente actualizado');
      } else {
        await pacientesApi.create(form);
        toast('Paciente registrado');
      }
      setModalOpen(false);
      load();
    } catch {
      toast('Error al guardar', 'error');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Eliminar este paciente?')) return;
    await pacientesApi.delete(id);
    toast('Paciente eliminado');
    load();
  };

  if (loading) return <Loader />;

  return (
    <PageWrapper>
      <PageHeader
        title="Pacientes"
        subtitle="RF08, RF09 — Registro de pacientes y tipos de sangre"
        action={
          <div className="flex gap-2 flex-wrap">
            {isAdmin && (
              <Button variant="secondary" onClick={() => { tipoForm.reset({ tipo: '' }); setTipoModalOpen(true); }}>
                <Droplet className="h-4 w-4" /> Tipo de sangre
              </Button>
            )}
            {canEdit && <Button onClick={openCreate}><Plus className="h-4 w-4" /> Nuevo paciente</Button>}
          </div>
        }
      />
      <DataTable
        data={data as unknown as Record<string, unknown>[]}
        searchKeys={['nombre_completo', 'telefono'] as never[]}
        columns={[
          { key: 'nombre_completo', header: 'Nombre' },
          { key: 'fecha_nacimiento', header: 'Nacimiento', render: (r) => formatDate((r as unknown as Paciente).fecha_nacimiento) },
          { key: 'tipo_sangre', header: 'Sangre', render: (r) => (r as unknown as Paciente).tipo_sangre?.tipo ?? '—' },
          { key: 'telefono', header: 'Teléfono' },
        ]}
        actions={(row) => {
          const p = row as unknown as Paciente;
          return (
            <div className="flex gap-1">
              <Link to={`/pacientes/${p.id_paciente}/expediente`}><Button size="sm" variant="ghost"><FileText className="h-4 w-4" /></Button></Link>
              {canEdit && <>
                <Button size="sm" variant="ghost" onClick={() => openEdit(p)}><Pencil className="h-4 w-4" /></Button>
                {isAdmin && <Button size="sm" variant="ghost" onClick={() => handleDelete(p.id_paciente)}><Trash2 className="h-4 w-4 text-red-500" /></Button>}
              </>}
            </div>
          );
        }}
      />
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Editar paciente' : 'Nuevo paciente'} size="lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Nombre completo" {...register('nombre_completo')} error={errors.nombre_completo?.message} required />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Fecha de nacimiento" type="date" {...register('fecha_nacimiento')} error={errors.fecha_nacimiento?.message} required />
            <Select label="Tipo de sangre" options={tipos.map((t) => ({ value: t.id_tipo_sangre, label: t.tipo }))} {...register('id_tipo_sangre')} error={errors.id_tipo_sangre?.message} />
          </div>
          <Input label="Teléfono" {...register('telefono')} error={errors.telefono?.message as string} placeholder="10 dígitos" />
          <Input label="Dirección" {...register('direccion')} />
          <div className="flex gap-3"><Button type="submit" className="flex-1">Guardar</Button><Button type="button" variant="ghost" onClick={() => setModalOpen(false)}>Cancelar</Button></div>
        </form>
      </Modal>
      <Modal open={tipoModalOpen} onClose={() => setTipoModalOpen(false)} title="Agregar tipo de sangre (RF09)">
        <form onSubmit={tipoForm.handleSubmit(async (f) => {
          await tiposSangreApi.create(f);
          toast('Tipo de sangre registrado');
          setTipoModalOpen(false);
          load();
        })} className="space-y-4">
          <Input label="Tipo (ej. A+, O-)" {...tipoForm.register('tipo')} error={tipoForm.formState.errors.tipo?.message} required />
          <Button type="submit" className="w-full">Guardar</Button>
        </form>
      </Modal>
    </PageWrapper>
  );
}
