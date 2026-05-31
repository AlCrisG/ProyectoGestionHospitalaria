import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import type { FieldValues, Resolver } from 'react-hook-form';

/** Compatibilidad Zod 3 + React Hook Form */
export function zodFormResolver<T extends z.ZodTypeAny>(schema: T): Resolver<z.infer<T> & FieldValues> {
  return zodResolver(schema) as Resolver<z.infer<T> & FieldValues>;
}

export const loginSchema = z.object({
  username: z.string().min(1, 'El usuario es obligatorio'),
  password: z.string().min(1, 'La contraseña es obligatoria'),
});

export const usuarioSchema = z.object({
  username: z.string().min(3, 'Mínimo 3 caracteres').max(50),
  password: z.string().min(8, 'Mínimo 8 caracteres').optional().or(z.literal('')),
  id_rol: z.coerce.number().min(1, 'Seleccione un rol'),
  activo: z.boolean(),
});

export const pacienteSchema = z.object({
  nombre_completo: z.string().min(3, 'Nombre obligatorio (mín. 3 caracteres)'),
  fecha_nacimiento: z.string().min(1, 'Fecha de nacimiento obligatoria').refine((d) => new Date(d) <= new Date(), 'No puede ser fecha futura'),
  id_tipo_sangre: z.coerce.number().min(1, 'Seleccione tipo de sangre'),
  telefono: z.string().regex(/^(\d{10})?$/, 'Teléfono debe tener 10 dígitos').optional().or(z.literal('')),
  direccion: z.string().optional(),
});

export const expedienteSchema = z.object({
  antecedentes_familiares: z.string().optional(),
  alergias: z.string().optional(),
});

export const especialidadSchema = z.object({
  nombre: z.string().min(2, 'Nombre obligatorio'),
  descripcion: z.string().optional(),
});

export const medicoSchema = z.object({
  nombre_completo: z.string().min(3, 'Nombre obligatorio'),
  cedula_profesional: z.string().min(5, 'Cédula obligatoria').regex(/^[A-Za-z0-9-]+$/, 'Formato inválido'),
  id_especialidad: z.coerce.number().min(1, 'Seleccione especialidad'),
  id_usuario: z.coerce.number().min(1, 'Seleccione usuario'),
});

export const consultaSchema = z.object({
  id_paciente: z.coerce.number().min(1, 'Seleccione paciente'),
  id_medico: z.coerce.number().min(1, 'Seleccione médico'),
  id_estado: z.coerce.number().min(1, 'Seleccione estado'),
  fecha_hora: z.string().min(1, 'Fecha y hora obligatorias'),
  motivo: z.string().optional(),
  diagnostico: z.string().optional(),
});

export const medicamentoSchema = z.object({
  nombre: z.string().min(2, 'Nombre obligatorio'),
  sustancia_activa: z.string().min(2, 'Sustancia activa obligatoria'),
  stock: z.coerce.number().int().min(0, 'Stock no puede ser negativo'),
});

export const recetaSchema = z.object({
  id_consulta: z.coerce.number().min(1, 'Seleccione consulta'),
  id_medicamento: z.coerce.number().min(1, 'Seleccione medicamento'),
  dosis: z.string().min(1, 'Dosis obligatoria'),
  duracion: z.string().min(1, 'Duración obligatoria'),
});

export const laboratorioSchema = z.object({
  nombre_estudio: z.string().min(2, 'Nombre obligatorio'),
  descripcion: z.string().optional(),
});

export const estudioSchema = z.object({
  id_paciente: z.coerce.number().min(1),
  id_laboratorio: z.coerce.number().min(1),
  id_medico: z.coerce.number().min(1),
  fecha_solicitud: z.string().min(1),
  resultados: z.string().optional(),
});

export const hospitalizacionSchema = z.object({
  id_paciente: z.coerce.number().min(1),
  fecha_ingreso: z.string().min(1),
  fecha_egreso: z.string().optional(),
  habitacion: z.string().min(1, 'Habitación obligatoria'),
  motivo: z.string().optional(),
});

export const facturaSchema = z.object({
  id_paciente: z.coerce.number().min(1),
  monto_total: z.coerce.number().positive('Monto debe ser mayor a 0'),
  estado: z.enum(['pendiente', 'pagada', 'cancelada']),
  fecha_emision: z.string().optional(),
});

export const pagoSchema = z.object({
  id_factura: z.coerce.number().min(1),
  monto: z.coerce.number().positive('Monto debe ser mayor a 0'),
  metodo_pago: z.string().min(1, 'Método de pago obligatorio'),
  fecha_pago: z.string().optional(),
});

export const respaldoSchema = z.object({
  tipo: z.string().min(1),
  ruta_archivo: z.string().min(1),
  estatus: z.string().min(1),
  fecha_inicio: z.string().optional(),
});

export const tipoSangreSchema = z.object({
  tipo: z.string().min(1, 'Tipo obligatorio').regex(/^(A|B|AB|O)[+-]$/, 'Formato: A+, O-, AB+, etc.'),
});
