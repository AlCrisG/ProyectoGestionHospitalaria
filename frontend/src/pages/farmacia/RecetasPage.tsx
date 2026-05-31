import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Plus } from 'lucide-react';
import { recetasApi, consultasApi, medicamentosApi } from '../../api';
import { Receta, Consulta, Medicamento } from '../../types';
import { recetaSchema, zodFormResolver } from '../../schemas';
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

type FormData = z.infer<typeof recetaSchema>;

export function RecetasPage() {
  const [data, setData] = useState<Receta[]>([]);
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const { toast } = useToast();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodFormResolver(recetaSchema),
  });

  const load = () => {
    setLoading(true);
    Promise.all([recetasApi.getAll(), consultasApi.getAll(), medicamentosApi.getAll()])
      .then(([r, c, m]) => { setData(r); setConsultas(c); setMedicamentos(m); })
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const onSubmit = async (form: FormData) => {
    try {
      await recetasApi.create(form);
      toast('Receta generada');
      setModalOpen(false);
      load();
    } catch {
      toast('Error al generar receta. Verifique stock.', 'error');
    }
  };

  if (loading) return <Loader />;

  return (
    <PageWrapper>
      <PageHeader title="Recetas médicas" subtitle="RF17, RF18 — Prescripciones" action={<Button onClick={() => { reset({ id_consulta: consultas[0]?.id_consulta ?? 1, id_medicamento: medicamentos[0]?.id_medicamento ?? 1, dosis: '', duracion: '' }); setModalOpen(true); }}><Plus className="h-4 w-4" /> Generar receta</Button>} />
      <DataTable
        data={data as unknown as Record<string, unknown>[]}
        searchKeys={['dosis'] as never[]}
        columns={[
          { key: 'consulta', header: 'Consulta', render: (r) => `#${(r as unknown as Receta).id_consulta}` },
          { key: 'medicamento', header: 'Medicamento', render: (r) => (r as unknown as Receta).medicamento?.nombre ?? '—' },
          { key: 'dosis', header: 'Dosis' },
          { key: 'duracion', header: 'Duración' },
        ]}
      />
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Generar receta médica">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Select label="Consulta" options={consultas.map((c) => ({ value: c.id_consulta, label: `#${c.id_consulta} - ${c.paciente?.nombre_completo ?? 'Paciente'}` }))} {...register('id_consulta')} error={errors.id_consulta?.message} />
          <Select label="Medicamento" options={medicamentos.map((m) => ({ value: m.id_medicamento, label: `${m.nombre} (stock: ${m.stock})` }))} {...register('id_medicamento')} error={errors.id_medicamento?.message} />
          <Input label="Dosis" {...register('dosis')} error={errors.dosis?.message} required />
          <Input label="Duración del tratamiento" {...register('duracion')} error={errors.duracion?.message} required />
          <Button type="submit" className="w-full">Generar</Button>
        </form>
      </Modal>
    </PageWrapper>
  );
}
