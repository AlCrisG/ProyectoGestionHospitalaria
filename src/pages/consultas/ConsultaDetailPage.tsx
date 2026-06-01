import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { consultasApi } from '../../api';
import { Consulta } from '../../types';
import { PageWrapper } from '../../components/ui/PageWrapper';
import { PageHeader } from '../../components/ui/PageHeader';
import { Textarea } from '../../components/ui/Textarea';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Loader } from '../../components/feedback/Loader';
import { useToast } from '../../components/feedback/Toast';
import { usePermissions } from '../../hooks/usePermissions';
import { formatDateTime } from '../../utils/formatters';
import { ArrowLeft, Save } from 'lucide-react';

export function ConsultaDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [consulta, setConsulta] = useState<Consulta | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { canEditDiagnostico } = usePermissions();
  const { register, handleSubmit, reset } = useForm<{ diagnostico: string }>();

  useEffect(() => {
    if (!id) return;
    consultasApi.getById(Number(id)).then((c) => {
      setConsulta(c);
      reset({ diagnostico: c.diagnostico ?? '' });
    }).finally(() => setLoading(false));
  }, [id, reset]);

  const onSaveDiagnostico = async (data: { diagnostico: string }) => {
    if (!consulta) return;
    await consultasApi.update(consulta.id_consulta, { diagnostico: data.diagnostico });
    toast('Diagnóstico actualizado');
    setConsulta({ ...consulta, diagnostico: data.diagnostico });
  };

  if (loading) return <Loader />;
  if (!consulta) return <p>Consulta no encontrada</p>;

  return (
    <PageWrapper>
      <Link to="/consultas" className="inline-flex items-center gap-1 text-sm text-primary hover:underline mb-4">
        <ArrowLeft className="h-4 w-4" /> Volver
      </Link>
      <PageHeader title={`Consulta #${consulta.id_consulta}`} subtitle={formatDateTime(consulta.fecha_hora)} />
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm space-y-3">
          <p><span className="text-slate-500">Paciente:</span> <strong>{consulta.paciente?.nombre_completo}</strong></p>
          <p><span className="text-slate-500">Médico:</span> <strong>{consulta.medico?.nombre_completo}</strong></p>
          <p><span className="text-slate-500">Estado:</span> <StatusBadge status={consulta.estado_consulta?.estado ?? ''} /></p>
          <p><span className="text-slate-500">Motivo:</span> {consulta.motivo || '—'}</p>
        </div>
        {canEditDiagnostico && (
          <form onSubmit={handleSubmit(onSaveDiagnostico)} className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
            <h3 className="font-semibold text-slate-800 mb-4">Diagnóstico (RF15)</h3>
            <Textarea label="Diagnóstico" {...register('diagnostico')} />
            <Button type="submit" className="mt-4"><Save className="h-4 w-4" /> Guardar diagnóstico</Button>
          </form>
        )}
      </div>
    </PageWrapper>
  );
}
