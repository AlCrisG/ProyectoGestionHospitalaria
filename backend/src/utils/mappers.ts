/** Mapea filas de PostgreSQL al formato esperado por el frontend React */

export function fullName(nombre?: string, apPat?: string, apMat?: string): string {
  return [nombre, apPat, apMat].filter(Boolean).join(' ').trim();
}

export function splitFullName(nombreCompleto: string): {
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
} {
  const parts = nombreCompleto.trim().split(/\s+/);
  if (parts.length === 0) return { nombre: '', apellido_paterno: '', apellido_materno: '' };
  if (parts.length === 1) return { nombre: parts[0], apellido_paterno: '', apellido_materno: '' };
  if (parts.length === 2) return { nombre: parts[0], apellido_paterno: parts[1], apellido_materno: '' };
  return {
    nombre: parts[0],
    apellido_paterno: parts[1],
    apellido_materno: parts.slice(2).join(' '),
  };
}

export function mapRolNombre(dbNombre: string): string {
  const n = dbNombre.toLowerCase().normalize('NFD').replace(/\p{M}/gu, '');
  if (n.includes('dba') || n.includes('admin')) return 'administrador';
  if (n.includes('medic')) return 'medico';
  if (n.includes('audit')) return 'auditor';
  if (n.includes('recep')) return 'recepcionista';
  return n;
}

export function mapPaciente(row: Record<string, unknown>) {
  return {
    id_paciente: row.id_paciente,
    id_tipo_sangre: row.id_tipo_sangre,
    nombre_completo: fullName(
      row.nombre as string,
      row.apellido_paterno as string,
      row.apellido_materno as string
    ),
    fecha_nacimiento: row.fecha_nacimiento
      ? new Date(row.fecha_nacimiento as string).toISOString().slice(0, 10)
      : '',
    telefono: row.telefono ?? undefined,
    direccion: row.direccion ?? undefined,
    tipo_sangre: row.tipo
      ? { id_tipo_sangre: row.id_tipo_sangre, tipo: row.tipo as string }
      : undefined,
  };
}

export function mapMedico(row: Record<string, unknown>) {
  return {
    id_medico: row.id_medico,
    id_usuario: row.id_usuario,
    id_especialidad: row.id_especialidad,
    nombre_completo: fullName(
      row.nombre as string,
      row.apellido_paterno as string,
      row.apellido_materno as string
    ),
    cedula_profesional: row.cedula_profesional,
    especialidad: row.especialidad_nombre
      ? { id_especialidad: row.id_especialidad, nombre: row.especialidad_nombre as string }
      : undefined,
  };
}

export function mapConsulta(row: Record<string, unknown>) {
  return {
    id_consulta: row.id_consulta,
    id_paciente: row.id_paciente,
    id_medico: row.id_medico,
    id_estado: row.id_estado,
    fecha_hora: row.fecha_hora,
    motivo: row.motivo,
    diagnostico: row.diagnostico,
    paciente: row.paciente_nombre
      ? {
          id_paciente: row.id_paciente,
          nombre_completo: fullName(
            row.paciente_nombre as string,
            row.paciente_ap as string,
            row.paciente_am as string
          ),
        }
      : undefined,
    medico: row.medico_nombre
      ? {
          id_medico: row.id_medico,
          nombre_completo: fullName(
            row.medico_nombre as string,
            row.medico_ap as string,
            row.medico_am as string
          ),
        }
      : undefined,
    estado_consulta: row.estado
      ? { id_estado: row.id_estado, estado: row.estado as string }
      : undefined,
  };
}

export function toIso(val: unknown): string {
  if (!val) return new Date().toISOString();
  return new Date(val as string).toISOString();
}
