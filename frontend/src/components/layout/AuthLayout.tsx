import { motion } from 'framer-motion';
import { Hospital } from 'lucide-react';
import { ReactNode } from 'react';
import { APP_NAME, APP_SUBTITLE } from '../../utils/constants';

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary-dark to-blue-900 p-12 flex-col justify-between text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 h-64 w-64 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-20 right-20 h-96 w-96 rounded-full bg-blue-300 blur-3xl" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="rounded-2xl bg-white/20 p-3 backdrop-blur">
              <Hospital className="h-10 w-10" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{APP_NAME}</h1>
              <p className="text-blue-200 text-sm">{APP_SUBTITLE}</p>
            </div>
          </div>
          <h2 className="text-4xl font-bold leading-tight mt-16">
            Gestión hospitalaria<br />integral y segura
          </h2>
          <p className="mt-4 text-blue-100 text-lg max-w-md">
            Administre pacientes, consultas, expedientes, farmacia y facturación desde una plataforma centralizada.
          </p>
        </div>
        <p className="relative z-10 text-sm text-blue-200">Hospital Regional · Morelia, Michoacán</p>
      </motion.div>
      <div className="flex flex-1 items-center justify-center p-6 bg-white lg:bg-gradient-to-br lg:from-white lg:to-blue-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
