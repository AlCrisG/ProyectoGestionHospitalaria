import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, Pencil, FlaskConical } from 'lucide-react';
import { laboratoriosApi, estudiosApi, pacientesApi, medicosApi } from '../../api';
import { Laboratorio, EstudioLaboratorio, Paciente, Medico } from '../../types';
import { laboratorioSchema, estudioSchema, zodFormResolver } from '../../schemas';
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

type LabForm = z.infer<typeof laboratorioSchema>;
type EstudioForm = z.infer<typeof estudioSchema>;

export function LaboratorioPage() {
  const [tab, setTab] = useState<'estudios' | 'catalogo' | 'solicitudes'>('solicitudes');
  const [laboratorios, setLaboratorios] = useState<Laboratorio[]>([]);
  const [estudios, setEstudios] = useState<EstudioLaboratorio[]>([]);
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalLab, setModalLab] = useState(false);
  const [modalEstudio, setModalEstudio] = useState(false);
  const [editingEstudio, setEditingEstudio] = useState<EstudioLaboratorio | null>(null);
  const { toast } = useToast();

  const labForm = useForm<LabForm>({ resolver: zodFormResolver(laboratorioSchema) });
  const estudioForm = useForm<EstudioForm>({ resolver: zodFormResolver(estudioSchema) });

  const load = () => {
    setLoading(true);
    Promise.all([laboratoriosApi.getAll(), estudiosApi.getAll(), pacientesApi.getAll(), medicosApi.getAll()])
      .then(([l, e, p, m]) => { setLaboratorios(l); setEstudios(e); setPacientes(p); setMedicos(m); })
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  if (loading) return <Loader />;

  return (
    <PageWrapper>
      <PageHeader title="Laboratorio" subtitle="RF20–RF23 — Estudios clínicos" />
      <div className="flex gap-2 mb-6 flex-wrap">
        {(['solicitudes', 'catalogo'] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === t ? 'bg-primary text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}>
            {t === 'solicitudes' ? 'Solicitudes y resultados' : 'Catálogo de estudios'}
          </button>
        ))}
      </div>

      {tab === 'catalogo' && (
        <>
          <div className="mb-4"><Button onClick={() => { labForm.reset({ nombre_estudio: '', descripcion: '' }); setModalLab(true); }}><Plus className="h-4 w-4" /> Nuevo estudio</Button></div>
          <DataTable
            data={laboratorios as unknown as Record<string, unknown>[]}
            searchKeys={['nombre_estudio'] as never[]}
            columns={[
              { key: 'nombre_estudio', header: 'Estudio' },
              { key: 'descripcion', header: 'Descripción' },
            ]}
          />
          <Modal open={modalLab} onClose={() => setModalLab(false)} title="Nuevo estudio de laboratorio">
            <form onSubmit={labForm.handleSubmit(async (f) => { await laboratoriosApi.create(f); toast('Estudio registrado'); setModalLab(false); load(); })} className="space-y-4">
              <Input label="Nombre" {...labForm.register('nombre_estudio')} error={labForm.formState.errors.nombre_estudio?.message} required />
              <Textarea label="Descripción" {...labForm.register('descripcion')} />
              <Button type="submit" className="w-full">Guardar</Button>
            </form>
          </Modal>
        </>
      )}

      {tab === 'solicitudes' && (
        <>
          <div className="mb-4"><Button onClick={() => { setEditingEstudio(null); estudioForm.reset({ id_paciente: pacientes[0]?.id_paciente ?? 1, id_laboratorio: laboratorios[0]?.id_laboratorio ?? 1, id_medico: medicos[0]?.id_medico ?? 1, fecha_solicitud: new Date().toISOString().slice(0, 16), resultados: '' }); setModalEstudio(true); }}><FlaskConical className="h-4 w-4" /> Solicitar estudio</Button></div>
          <DataTable
            data={estudios as unknown as Record<string, unknown>[]}
            searchKeys={['resultados'] as never[]}
            columns={[
              { key: 'fecha_solicitud', header: 'Fecha', render: (r) => formatDateTime((r as unknown as EstudioLaboratorio).fecha_solicitud) },
              { key: 'paciente', header: 'Paciente', render: (r) => (r as unknown as EstudioLaboratorio).paciente?.nombre_completo ?? '—' },
              { key: 'laboratorio', header: 'Estudio', render: (r) => (r as unknown as EstudioLaboratorio).laboratorio?.nombre_estudio ?? '—' },
              { key: 'resultados', header: 'Resultados', render: (r) => (r as unknown as EstudioLaboratorio).resultados || <span className="text-amber-600">Pendiente</span> },
            ]}
            actions={(row) => (
              <Button size="sm" variant="ghost" onClick={() => { const e = row as unknown as EstudioLaboratorio; setEditingEstudio(e); estudioForm.reset({ id_paciente: e.id_paciente, id_laboratorio: e.id_laboratorio, id_medico: e.id_medico, fecha_solicitud: e.fecha_solicitud.slice(0, 16), resultados: e.resultados ?? '' }); setModalEstudio(true); }}>
                <Pencil className="h-4 w-4" />
              </Button>
            )}
          />
          <Modal open={modalEstudio} onClose={() => setModalEstudio(false)} title={editingEstudio ? 'Registrar resultados' : 'Solicitar estudio'} size="lg">
            <form onSubmit={estudioForm.handleSubmit(async (f) => {
              if (editingEstudio) { await estudiosApi.update(editingEstudio.id_estudio, f); toast('Resultados guardados'); }
              else { await estudiosApi.create(f); toast('Estudio solicitado'); }
              setModalEstudio(false); load();
            })} className="space-y-4">
              <Select label="Paciente" options={pacientes.map((p) => ({ value: p.id_paciente, label: p.nombre_completo }))} {...estudioForm.register('id_paciente')} />
              <Select label="Estudio" options={laboratorios.map((l) => ({ value: l.id_laboratorio, label: l.nombre_estudio }))} {...estudioForm.register('id_laboratorio')} />
              <Select label="Médico solicitante" options={medicos.map((m) => ({ value: m.id_medico, label: m.nombre_completo }))} {...estudioForm.register('id_medico')} />
              <Input label="Fecha solicitud" type="datetime-local" {...estudioForm.register('fecha_solicitud')} />
              <Textarea label="Resultados" {...estudioForm.register('resultados')} />
              <Button type="submit" className="w-full">Guardar</Button>
            </form>
          </Modal>
        </>
      )}
    </PageWrapper>
  );
}
