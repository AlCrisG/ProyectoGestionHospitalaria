import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Eye } from 'lucide-react';
import { consultasApi, pacientesApi, medicosApi, estadosConsultaApi } from '../../api';
import { Consulta, Paciente, Medico, EstadoConsulta } from '../../types';
import { consultaSchema, zodFormResolver } from '../../schemas';
import { z } from 'zod';
import { PageWrapper } from '../../components/ui/PageWrapper';
import { PageHeader } from '../../components/ui/PageHeader';
import { DataTable } from '../../components/ui/DataTable';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Textarea } from '../../components/ui/Textarea';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Loader } from '../../components/feedback/Loader';
import { useToast } from '../../components/feedback/Toast';
import { formatDateTime } from '../../utils/formatters';

type FormData = z.infer<typeof consultaSchema>;

export function ConsultasPage() {
  const [data, setData] = useState<Consulta[]>([]);
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [estados, setEstados] = useState<EstadoConsulta[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Consulta | null>(null);
  const { toast } = useToast();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodFormResolver(consultaSchema),
  });

  const load = () => {
    setLoading(true);
    Promise.all([consultasApi.getAll(), pacientesApi.getAll(), medicosApi.getAll(), estadosConsultaApi.getAll()])
      .then(([c, p, m, e]) => { setData(c); setPacientes(p); setMedicos(m); setEstados(e); })
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const onSubmit = async (form: FormData) => {
    try {
      if (editing) {
        await consultasApi.update(editing.id_consulta, form);
        toast('Consulta actualizada');
      } else {
        await consultasApi.create(form);
        toast('Consulta agendada');
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
      <PageHeader title="Consultas médicas" subtitle="RF12–RF15 — Agenda y historial" action={<Button onClick={() => { setEditing(null); const now = new Date(); now.setMinutes(0); reset({ id_paciente: pacientes[0]?.id_paciente ?? 1, id_medico: medicos[0]?.id_medico ?? 1, id_estado: 1, fecha_hora: now.toISOString().slice(0, 16), motivo: '' }); setModalOpen(true); }}><Plus className="h-4 w-4" /> Agendar consulta</Button>} />
      <DataTable
        data={data as unknown as Record<string, unknown>[]}
        searchKeys={['motivo'] as never[]}
        columns={[
          { key: 'fecha_hora', header: 'Fecha/Hora', render: (r) => formatDateTime((r as unknown as Consulta).fecha_hora) },
          { key: 'paciente', header: 'Paciente', render: (r) => (r as unknown as Consulta).paciente?.nombre_completo ?? '—' },
          { key: 'medico', header: 'Médico', render: (r) => (r as unknown as Consulta).medico?.nombre_completo ?? '—' },
          { key: 'estado', header: 'Estado', render: (r) => <StatusBadge status={(r as unknown as Consulta).estado_consulta?.estado ?? 'pendiente'} /> },
          { key: 'motivo', header: 'Motivo' },
        ]}
        actions={(row) => {
          const c = row as unknown as Consulta;
          return (
            <div className="flex gap-1">
              <Link to={`/consultas/${c.id_consulta}`}><Button size="sm" variant="ghost"><Eye className="h-4 w-4" /></Button></Link>
              <Button size="sm" variant="ghost" onClick={() => { setEditing(c); reset({ id_paciente: c.id_paciente, id_medico: c.id_medico, id_estado: c.id_estado, fecha_hora: c.fecha_hora.slice(0, 16), motivo: c.motivo ?? '', diagnostico: c.diagnostico ?? '' }); setModalOpen(true); }}><Pencil className="h-4 w-4" /></Button>
            </div>
          );
        }}
      />
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Editar consulta' : 'Agendar consulta'} size="lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Select label="Paciente" options={pacientes.map((p) => ({ value: p.id_paciente, label: p.nombre_completo }))} {...register('id_paciente')} error={errors.id_paciente?.message} />
          <Select label="Médico" options={medicos.map((m) => ({ value: m.id_medico, label: m.nombre_completo }))} {...register('id_medico')} error={errors.id_medico?.message} />
          <Select label="Estado" options={estados.map((e) => ({ value: e.id_estado, label: e.estado }))} {...register('id_estado')} error={errors.id_estado?.message} />
          <Input label="Fecha y hora" type="datetime-local" {...register('fecha_hora')} error={errors.fecha_hora?.message} required />
          <Textarea label="Motivo" {...register('motivo')} />
          {editing && <Textarea label="Diagnóstico" {...register('diagnostico')} />}
          <Button type="submit" className="w-full">Guardar</Button>
        </form>
      </Modal>
    </PageWrapper>
  );
}
