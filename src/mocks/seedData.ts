import {
  Rol, Usuario, TipoSangre, Paciente, Expediente, Especialidad, Medico,
  EstadoConsulta, Consulta, Medicamento, Receta, Laboratorio, EstudioLaboratorio,
  Hospitalizacion, Factura, Pago, BitacoraAcceso, AuditoriaCambio, Respaldo,
} from '../types';

export const seedRoles: Rol[] = [
  { id_rol: 1, nombre: 'administrador', descripcion: 'Acceso completo al sistema' },
  { id_rol: 2, nombre: 'medico', descripcion: 'Consultas, expedientes y recetas' },
  { id_rol: 3, nombre: 'recepcionista', descripcion: 'Pacientes y agenda' },
  { id_rol: 4, nombre: 'auditor', descripcion: 'Consulta de bitácoras' },
];

export const seedUsuarios: Usuario[] = [
  { id_usuario: 1, id_rol: 1, username: 'admin', activo: true },
  { id_usuario: 2, id_rol: 2, username: 'medico1', activo: true },
  { id_usuario: 3, id_rol: 3, username: 'recepcion', activo: true },
  { id_usuario: 4, id_rol: 4, username: 'auditor', activo: true },
  { id_usuario: 5, id_rol: 2, username: 'medico2', activo: false },
];

export const seedTiposSangre: TipoSangre[] = [
  { id_tipo_sangre: 1, tipo: 'O+' },
  { id_tipo_sangre: 2, tipo: 'O-' },
  { id_tipo_sangre: 3, tipo: 'A+' },
  { id_tipo_sangre: 4, tipo: 'A-' },
  { id_tipo_sangre: 5, tipo: 'B+' },
  { id_tipo_sangre: 6, tipo: 'AB+' },
];

export const seedPacientes: Paciente[] = [
  { id_paciente: 1, id_tipo_sangre: 1, nombre_completo: 'María García López', fecha_nacimiento: '1985-03-15', telefono: '4431234567', direccion: 'Av. Madero 123, Morelia' },
  { id_paciente: 2, id_tipo_sangre: 3, nombre_completo: 'Juan Pérez Hernández', fecha_nacimiento: '1990-07-22', telefono: '4439876543', direccion: 'Calle Allende 45' },
  { id_paciente: 3, id_tipo_sangre: 2, nombre_completo: 'Ana Martínez Ruiz', fecha_nacimiento: '1978-11-08', telefono: '4435551234' },
];

export const seedExpedientes: Expediente[] = [
  { id_expediente: 1, id_paciente: 1, fecha_creacion: '2024-01-10T10:00:00', antecedentes_familiares: 'Diabetes tipo 2 (madre)', alergias: 'Penicilina' },
  { id_expediente: 2, id_paciente: 2, fecha_creacion: '2024-02-05T14:30:00', antecedentes_familiares: 'Hipertensión (padre)', alergias: 'Ninguna conocida' },
];

export const seedEspecialidades: Especialidad[] = [
  { id_especialidad: 1, nombre: 'Medicina General', descripcion: 'Atención primaria' },
  { id_especialidad: 2, nombre: 'Cardiología', descripcion: 'Enfermedades del corazón' },
  { id_especialidad: 3, nombre: 'Pediatría', descripcion: 'Atención infantil' },
];

export const seedMedicos: Medico[] = [
  { id_medico: 1, id_usuario: 2, id_especialidad: 1, nombre_completo: 'Dr. Carlos Mendoza', cedula_profesional: 'MED-12345' },
  { id_medico: 2, id_usuario: 5, id_especialidad: 2, nombre_completo: 'Dra. Laura Sánchez', cedula_profesional: 'MED-67890' },
];

export const seedEstadosConsulta: EstadoConsulta[] = [
  { id_estado: 1, estado: 'pendiente' },
  { id_estado: 2, estado: 'atendida' },
  { id_estado: 3, estado: 'cancelada' },
  { id_estado: 4, estado: 'finalizada' },
];

export const seedConsultas: Consulta[] = [
  { id_consulta: 1, id_paciente: 1, id_medico: 1, id_estado: 2, fecha_hora: '2025-05-28T09:00:00', motivo: 'Control general', diagnostico: 'Paciente en buen estado de salud' },
  { id_consulta: 2, id_paciente: 2, id_medico: 1, id_estado: 1, fecha_hora: '2025-05-28T11:00:00', motivo: 'Dolor de cabeza' },
  { id_consulta: 3, id_paciente: 1, id_medico: 1, id_estado: 4, fecha_hora: '2025-05-20T10:00:00', motivo: 'Seguimiento', diagnostico: 'Evolución favorable' },
];

export const seedMedicamentos: Medicamento[] = [
  { id_medicamento: 1, nombre: 'Paracetamol 500mg', sustancia_activa: 'Paracetamol', stock: 150 },
  { id_medicamento: 2, nombre: 'Ibuprofeno 400mg', sustancia_activa: 'Ibuprofeno', stock: 8 },
  { id_medicamento: 3, nombre: 'Amoxicilina 500mg', sustancia_activa: 'Amoxicilina', stock: 45 },
];

export const seedRecetas: Receta[] = [
  { id_receta: 1, id_consulta: 1, id_medicamento: 1, dosis: '1 tableta cada 8 horas', duracion: '5 días' },
  { id_receta: 2, id_consulta: 3, id_medicamento: 2, dosis: '1 tableta cada 12 horas', duracion: '3 días' },
];

export const seedLaboratorios: Laboratorio[] = [
  { id_laboratorio: 1, nombre_estudio: 'Biometría hemática', descripcion: 'Conteo sanguíneo completo' },
  { id_laboratorio: 2, nombre_estudio: 'Química sanguínea', descripcion: 'Glucosa, creatinina, urea' },
  { id_laboratorio: 3, nombre_estudio: 'Examen general de orina', descripcion: 'Análisis de orina' },
];

export const seedEstudios: EstudioLaboratorio[] = [
  { id_estudio: 1, id_paciente: 1, id_laboratorio: 1, id_medico: 1, fecha_solicitud: '2025-05-15T08:00:00', resultados: 'Valores dentro de rangos normales' },
  { id_estudio: 2, id_paciente: 2, id_laboratorio: 2, id_medico: 1, fecha_solicitud: '2025-05-27T09:30:00' },
];

export const seedHospitalizaciones: Hospitalizacion[] = [
  { id_hospitalizacion: 1, id_paciente: 1, fecha_ingreso: '2024-06-01T14:00:00', fecha_egreso: '2024-06-05T10:00:00', habitacion: '201-A', motivo: 'Observación post-operatoria' },
];

export const seedFacturas: Factura[] = [
  { id_factura: 1, id_paciente: 1, fecha_emision: '2025-05-28T12:00:00', monto_total: 850, estado: 'pendiente' },
  { id_factura: 2, id_paciente: 2, fecha_emision: '2025-05-20T16:00:00', monto_total: 1200, estado: 'pagada' },
  { id_factura: 3, id_paciente: 1, fecha_emision: '2025-05-10T11:00:00', monto_total: 500, estado: 'cancelada' },
];

export const seedPagos: Pago[] = [
  { id_pago: 1, id_factura: 2, fecha_pago: '2025-05-21T10:00:00', monto: 1200, metodo_pago: 'tarjeta' },
];

export const seedBitacora: BitacoraAcceso[] = [
  { id_acceso: 1, id_usuario: 1, fecha_hora: '2025-05-28T08:00:00', ip_origen: '192.168.1.10', exitoso: true },
  { id_acceso: 2, id_usuario: 3, fecha_hora: '2025-05-28T08:15:00', ip_origen: '192.168.1.25', exitoso: true },
  { id_acceso: 3, id_usuario: 99, fecha_hora: '2025-05-28T09:00:00', ip_origen: '10.0.0.5', exitoso: false },
];

export const seedAuditoria: AuditoriaCambio[] = [
  { id_auditoria: 1, nombre_tabla: 'pacientes', operacion: 'INSERT', usuario_db: 'admin', fecha_hora: '2025-05-28T07:30:00', datos_nuevos: { nombre_completo: 'María García López' } },
  { id_auditoria: 2, nombre_tabla: 'consultas', operacion: 'UPDATE', usuario_db: 'medico1', fecha_hora: '2025-05-28T09:30:00', datos_anteriores: { diagnostico: null }, datos_nuevos: { diagnostico: 'Paciente en buen estado' } },
];

export const seedRespaldos: Respaldo[] = [
  { id_respaldo: 1, fecha_inicio: '2025-05-27T02:00:00', fecha_fin: '2025-05-27T02:15:00', tipo: 'completo', ruta_archivo: '/backups/sigeh_20250527.backup', tamano_mb: 125.5, estatus: 'exitoso' },
];
