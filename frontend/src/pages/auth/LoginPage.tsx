import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Hospital, Eye, EyeOff } from 'lucide-react';
import { loginSchema, zodFormResolver } from '../../schemas';
import { z } from 'zod';
import { useAuth } from '../../context/AuthContext';
import { AuthLayout } from '../../components/layout/AuthLayout';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { APP_NAME } from '../../utils/constants';
import { useToast } from '../../components/feedback/Toast';

type LoginForm = z.infer<typeof loginSchema>;

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodFormResolver(loginSchema),
    defaultValues: { username: '', password: '' },
  });

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    try {
      await login(data.username, data.password);
      toast('Bienvenido al sistema SIGEH');
      const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch {
      toast('Credenciales inválidas', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
        <div className="rounded-xl bg-primary p-2 text-white">
          <Hospital className="h-8 w-8" />
        </div>
        <h1 className="text-2xl font-bold text-primary">{APP_NAME}</h1>
      </div>
      <motion.div whileHover={{ scale: 1.01 }} className="rounded-2xl border border-slate-100 bg-white p-8 shadow-xl shadow-primary/5">
        <h2 className="text-2xl font-bold text-slate-800">Iniciar sesión</h2>
        <p className="mt-1 text-sm text-slate-500 mb-6">Ingrese sus credenciales de acceso</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Usuario" {...register('username')} error={errors.username?.message} required />
          <div className="relative">
            <Input
              label="Contraseña"
              type={showPass ? 'text' : 'password'}
              {...register('password')}
              error={errors.password?.message}
              required
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-9 text-slate-400 hover:text-slate-600"
            >
              {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <Button type="submit" loading={loading} className="w-full mt-2">
            Ingresar
          </Button>
        </form>
        <div className="mt-6 rounded-lg bg-primary-50 p-4 text-xs text-slate-600">
          <p className="font-medium text-primary mb-2">Acceso con base de datos:</p>
          <p>Use su usuario registrado en PostgreSQL (ej. medico1).</p>
          <p className="mt-2 text-slate-500">Modo mock: active REACT_APP_USE_MOCK=true en .env</p>
        </div>
      </motion.div>
    </AuthLayout>
  );
}
