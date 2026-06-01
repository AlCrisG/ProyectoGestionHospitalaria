export type RolNombre = 'administrador' | 'medico' | 'recepcionista' | 'auditor';

export interface Rol {
  id_rol: number;
  nombre: RolNombre;
  descripcion?: string;
}

export interface Usuario {
  id_usuario: number;
  id_rol: number;
  username: string;
  password_hash?: string;
  activo: boolean;
  rol?: Rol;
}

export interface AuthUser {
  id_usuario: number;
  username: string;
  rol: RolNombre;
  token: string;
}

export interface TipoSangre {
  id_tipo_sangre: number;
  tipo: string;
}

export interface Paciente {
  id_paciente: number;
  id_tipo_sangre: number;
  nombre_completo: string;
  fecha_nacimiento: string;
  telefono?: string;
  direccion?: string;
  tipo_sangre?: TipoSangre;
}

export interface Expediente {
  id_expediente: number;
  id_paciente: number;
  fecha_creacion: string;
  antecedentes_familiares?: string;
  alergias?: string;
  paciente?: Paciente;
}

export interface Especialidad {
  id_especialidad: number;
  nombre: string;
  descripcion?: string;
}

export interface Medico {
  id_medico: number;
  id_usuario: number;
  id_especialidad: number;
  nombre_completo: string;
  cedula_profesional: string;
  especialidad?: Especialidad;
  usuario?: Usuario;
}

export interface EstadoConsulta {
  id_estado: number;
  estado: string;
}

export interface Consulta {
  id_consulta: number;
  id_paciente: number;
  id_medico: number;
  id_estado: number;
  fecha_hora: string;
  motivo?: string;
  diagnostico?: string;
  paciente?: Paciente;
  medico?: Medico;
  estado_consulta?: EstadoConsulta;
}

export interface Medicamento {
  id_medicamento: number;
  nombre: string;
  sustancia_activa: string;
  stock: number;
}

export interface Receta {
  id_receta: number;
  id_consulta: number;
  id_medicamento: number;
  dosis: string;
  duracion: string;
  medicamento?: Medicamento;
  consulta?: Consulta;
}

export interface Laboratorio {
  id_laboratorio: number;
  nombre_estudio: string;
  descripcion?: string;
}

export interface EstudioLaboratorio {
  id_estudio: number;
  id_paciente: number;
  id_laboratorio: number;
  id_medico: number;
  fecha_solicitud: string;
  resultados?: string;
  paciente?: Paciente;
  laboratorio?: Laboratorio;
  medico?: Medico;
}

export interface Hospitalizacion {
  id_hospitalizacion: number;
  id_paciente: number;
  fecha_ingreso: string;
  fecha_egreso?: string;
  habitacion: string;
  motivo?: string;
  paciente?: Paciente;
}

export interface Factura {
  id_factura: number;
  id_paciente: number;
  fecha_emision: string;
  monto_total: number;
  estado: 'pendiente' | 'pagada' | 'cancelada';
  paciente?: Paciente;
}

export interface Pago {
  id_pago: number;
  id_factura: number;
  fecha_pago: string;
  monto: number;
  metodo_pago: string;
  factura?: Factura;
}

export interface BitacoraAcceso {
  id_acceso: number;
  id_usuario: number;
  fecha_hora: string;
  ip_origen?: string;
  exitoso: boolean;
  usuario?: Usuario;
}

export interface AuditoriaCambio {
  id_auditoria: number;
  nombre_tabla: string;
  operacion: string;
  usuario_db: string;
  fecha_hora: string;
  datos_anteriores?: Record<string, unknown>;
  datos_nuevos?: Record<string, unknown>;
}

export interface Respaldo {
  id_respaldo: number;
  fecha_inicio: string;
  fecha_fin?: string;
  tipo: string;
  ruta_archivo: string;
  tamano_mb?: number;
  estatus: string;
}

export interface DashboardStats {
  totalPacientes: number;
  consultasHoy: number;
  facturasPendientes: number;
  medicamentosStockBajo: number;
}
