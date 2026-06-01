import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, Pencil } from 'lucide-react';
import { usuariosApi, rolesApi } from '../../api';
import { Usuario, Rol } from '../../types';
import { usuarioSchema, zodFormResolver } from '../../schemas';
import { z } from 'zod';
import { PageWrapper } from '../../components/ui/PageWrapper';
import { PageHeader } from '../../components/ui/PageHeader';
import { DataTable } from '../../components/ui/DataTable';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Loader } from '../../components/feedback/Loader';
import { useToast } from '../../components/feedback/Toast';

type FormData = z.infer<typeof usuarioSchema>;

export function UsuariosPage() {
  const [data, setData] = useState<Usuario[]>([]);
  const [roles, setRoles] = useState<Rol[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Usuario | null>(null);
  const { toast } = useToast();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodFormResolver(usuarioSchema),
    defaultValues: { activo: true, id_rol: 1 },
  });

  const load = () => {
    setLoading(true);
    Promise.all([usuariosApi.getAll(), rolesApi.getAll()])
      .then(([u, r]) => { setData(u); setRoles(r); })
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const openCreate = () => {
    setEditing(null);
    reset({ username: '', password: '', id_rol: 1, activo: true });
    setModalOpen(true);
  };

  const openEdit = (u: Usuario) => {
    setEditing(u);
    reset({ username: u.username, password: '', id_rol: u.id_rol, activo: u.activo });
    setModalOpen(true);
  };

  const onSubmit = async (form: FormData) => {
    try {
      if (editing) {
        await usuariosApi.update(editing.id_usuario, { id_rol: form.id_rol, activo: form.activo, username: form.username });
        toast('Usuario actualizado');
      } else {
        if (!form.password) { toast('La contraseña es obligatoria', 'error'); return; }
        await usuariosApi.create({ username: form.username, id_rol: form.id_rol, activo: form.activo });
        toast('Usuario creado');
      }
      setModalOpen(false);
      load();
    } catch {
      toast('Error al guardar', 'error');
    }
  };

  const toggleActivo = async (u: Usuario) => {
    await usuariosApi.update(u.id_usuario, { activo: !u.activo });
    toast(u.activo ? 'Usuario desactivado' : 'Usuario activado');
    load();
  };

  if (loading) return <Loader />;

  return (
    <PageWrapper>
      <PageHeader title="Usuarios del sistema" subtitle="RF01, RF02, RF04 — Gestión de usuarios y roles" action={<Button onClick={openCreate}><Plus className="h-4 w-4" /> Nuevo usuario</Button>} />
      <DataTable
        data={data as unknown as Record<string, unknown>[]}
        searchKeys={['username'] as never[]}
        columns={[
          { key: 'username', header: 'Usuario' },
          { key: 'rol', header: 'Rol', render: (r) => (r as unknown as Usuario).rol?.nombre ?? '—' },
          { key: 'activo', header: 'Estado', render: (r) => <StatusBadge status={(r as unknown as Usuario).activo ? 'activo' : 'inactivo'} /> },
        ]}
        actions={(row) => {
          const u = row as unknown as Usuario;
          return (
            <div className="flex gap-2">
              <Button size="sm" variant="ghost" onClick={() => openEdit(u)}><Pencil className="h-4 w-4" /></Button>
              <Button size="sm" variant="secondary" onClick={() => toggleActivo(u)}>{u.activo ? 'Desactivar' : 'Activar'}</Button>
            </div>
          );
        }}
      />
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Editar usuario' : 'Nuevo usuario'}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Nombre de usuario" {...register('username')} error={errors.username?.message} required />
          {!editing && <Input label="Contraseña" type="password" {...register('password')} error={errors.password?.message} required />}
          <Select label="Rol" options={roles.map((r) => ({ value: r.id_rol, label: r.nombre }))} {...register('id_rol')} error={errors.id_rol?.message} />
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" {...register('activo')} className="rounded border-slate-300 text-primary focus:ring-primary" />
            <span className="text-sm text-slate-700">Usuario activo</span>
          </label>
          <div className="flex gap-3 pt-2">
            <Button type="submit" className="flex-1">Guardar</Button>
            <Button type="button" variant="ghost" onClick={() => setModalOpen(false)}>Cancelar</Button>
          </div>
        </form>
      </Modal>
    </PageWrapper>
  );
}
