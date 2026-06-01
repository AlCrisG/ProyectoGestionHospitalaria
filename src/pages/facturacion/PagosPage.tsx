import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowLeft } from 'lucide-react';
import { facturasApi, pagosApi } from '../../api';
import { Factura, Pago } from '../../types';
import { pagoSchema, zodFormResolver } from '../../schemas';
import { z } from 'zod';
import { PageWrapper } from '../../components/ui/PageWrapper';
import { PageHeader } from '../../components/ui/PageHeader';
import { DataTable } from '../../components/ui/DataTable';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { Loader } from '../../components/feedback/Loader';
import { useToast } from '../../components/feedback/Toast';
import { formatCurrency, formatDateTime } from '../../utils/formatters';
import { METODOS_PAGO } from '../../utils/constants';

type FormData = z.infer<typeof pagoSchema>;

export function PagosPage() {
  const { id } = useParams<{ id: string }>();
  const facturaId = Number(id);
  const [factura, setFactura] = useState<Factura | null>(null);
  const [pagos, setPagos] = useState<Pago[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodFormResolver(pagoSchema),
    defaultValues: { id_factura: facturaId, metodo_pago: 'efectivo' },
  });

  useEffect(() => {
    if (!facturaId) return;
    Promise.all([
      facturasApi.getAll().then((list) => list.find((f) => f.id_factura === facturaId) ?? null),
      pagosApi.getAll().then((list) => list.filter((p) => p.id_factura === facturaId)),
    ]).then(([f, p]) => {
      setFactura(f);
      setPagos(p);
      reset({ id_factura: facturaId, monto: f?.monto_total ?? 0, metodo_pago: 'efectivo' });
    }).finally(() => setLoading(false));
  }, [facturaId, reset]);

  const onSubmit = async (form: FormData) => {
    if (factura && form.monto > factura.monto_total) {
      toast('El monto no puede exceder el total de la factura', 'error');
      return;
    }
    await pagosApi.create({ ...form, fecha_pago: new Date().toISOString() });
    toast('Pago registrado');
    const updated = await facturasApi.getAll();
    setFactura(updated.find((f) => f.id_factura === facturaId) ?? null);
    const allPagos = await pagosApi.getAll();
    setPagos(allPagos.filter((p) => p.id_factura === facturaId));
  };

  if (loading) return <Loader />;

  return (
    <PageWrapper>
      <Link to="/facturacion" className="inline-flex items-center gap-1 text-sm text-primary hover:underline mb-4">
        <ArrowLeft className="h-4 w-4" /> Volver
      </Link>
      <PageHeader title="Registrar pago" subtitle={factura ? `Factura #${factura.id_factura} — ${formatCurrency(factura.monto_total)}` : ''} />
      <div className="grid gap-6 lg:grid-cols-2">
        <form onSubmit={handleSubmit(onSubmit)} className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm space-y-4">
          <input type="hidden" {...register('id_factura')} />
          <Input label="Monto" type="number" step="0.01" {...register('monto')} error={errors.monto?.message} required />
          <Select label="Método de pago" options={METODOS_PAGO.map((m) => ({ value: m, label: m }))} {...register('metodo_pago')} error={errors.metodo_pago?.message} />
          <Button type="submit" className="w-full">Registrar pago</Button>
        </form>
        <div>
          <h3 className="font-semibold mb-3">Historial de pagos (RF29)</h3>
          <DataTable
            data={pagos as unknown as Record<string, unknown>[]}
            columns={[
              { key: 'fecha_pago', header: 'Fecha', render: (r) => formatDateTime((r as unknown as Pago).fecha_pago) },
              { key: 'monto', header: 'Monto', render: (r) => formatCurrency((r as unknown as Pago).monto) },
              { key: 'metodo_pago', header: 'Método' },
            ]}
            emptyMessage="Sin pagos registrados"
          />
        </div>
      </div>
    </PageWrapper>
  );
}
