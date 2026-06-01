import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Save } from 'lucide-react';
import { pacientesApi, expedientesApi } from '../../api';
import { Paciente, Expediente } from '../../types';
import { expedienteSchema, zodFormResolver } from '../../schemas';
import { z } from 'zod';
import { PageWrapper } from '../../components/ui/PageWrapper';
import { PageHeader } from '../../components/ui/PageHeader';
import { Textarea } from '../../components/ui/Textarea';
import { Button } from '../../components/ui/Button';
import { Loader } from '../../components/feedback/Loader';
import { useToast } from '../../components/feedback/Toast';
import { formatDateTime } from '../../utils/formatters';

type FormData = z.infer<typeof expedienteSchema>;

export function ExpedientePage() {
  const { id } = useParams<{ id: string }>();
  const pacienteId = Number(id);
  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const [expediente, setExpediente] = useState<Expediente | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodFormResolver(expedienteSchema),
  });

  useEffect(() => {
    if (!pacienteId) return;
    Promise.all([pacientesApi.getById(pacienteId), expedientesApi.getByPaciente(pacienteId)])
      .then(([p, e]) => {
        setPaciente(p);
        setExpediente(e);
        if (e) reset({ antecedentes_familiares: e.antecedentes_familiares ?? '', alergias: e.alergias ?? '' });
      })
      .finally(() => setLoading(false));
  }, [pacienteId, reset]);

  const onSubmit = async (form: FormData) => {
    try {
      if (expediente) {
        await expedientesApi.update(expediente.id_expediente, form);
        toast('Expediente actualizado');
      } else {
        const nuevo = await expedientesApi.create({ id_paciente: pacienteId, ...form, fecha_creacion: new Date().toISOString() });
        setExpediente(nuevo);
        toast('Expediente creado');
      }
    } catch {
      toast('Error al guardar', 'error');
    }
  };

  if (loading) return <Loader />;

  return (
    <PageWrapper>
      <Link to="/pacientes" className="inline-flex items-center gap-1 text-sm text-primary hover:underline mb-4">
        <ArrowLeft className="h-4 w-4" /> Volver a pacientes
      </Link>
      <PageHeader
        title="Expediente clínico"
        subtitle={paciente ? paciente.nombre_completo : ''}
      />
      {expediente && (
        <p className="text-sm text-slate-500 mb-4">Creado: {formatDateTime(expediente.fecha_creacion)}</p>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-4 rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
        <Textarea label="Antecedentes familiares" {...register('antecedentes_familiares')} error={errors.antecedentes_familiares?.message} />
        <Textarea label="Alergias" {...register('alergias')} error={errors.alergias?.message} />
        <Button type="submit"><Save className="h-4 w-4" /> Guardar expediente</Button>
      </form>
    </PageWrapper>
  );
}
