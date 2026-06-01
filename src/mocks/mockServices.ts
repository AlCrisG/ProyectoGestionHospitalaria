import { mockStore } from './mockStore';
import {
  AuthUser, Usuario, Paciente, Expediente, Especialidad, Medico, Consulta,
  Medicamento, Receta, Laboratorio, EstudioLaboratorio, Hospitalizacion,
  Factura, Pago, BitacoraAcceso, AuditoriaCambio, Respaldo, DashboardStats,
  TipoSangre, EstadoConsulta, Rol,
} from '../types';
import { DEMO_USERS } from '../utils/constants';

function enrichPaciente(p: Paciente): Paciente {
  const tipo = mockStore.tiposSangre.find((t) => t.id_tipo_sangre === p.id_tipo_sangre);
  return { ...p, tipo_sangre: tipo };
}

function enrichConsulta(c: Consulta): Consulta {
  return {
    ...c,
    paciente: enrichPaciente(mockStore.pacientes.find((p) => p.id_paciente === c.id_paciente)!),
    medico: mockStore.medicos.find((m) => m.id_medico === c.id_medico),
    estado_consulta: mockStore.estadosConsulta.find((e) => e.id_estado === c.id_estado),
  };
}

export const mockAuth = {
  async login(username: string, password: string): Promise<AuthUser> {
    await mockStore.delay(null);
    const demo = DEMO_USERS[username];
    if (!demo || demo.password !== password) {
      const user = mockStore.usuarios.find((u) => u.username === username && u.activo);
      if (!user) throw new Error('Credenciales inválidas');
      throw new Error('Credenciales inválidas');
    }
    mockStore.bitacora.push({
      id_acceso: mockStore.nextId('bitacora'),
      id_usuario: demo.id,
      fecha_hora: new Date().toISOString(),
      ip_origen: '127.0.0.1',
      exitoso: true,
    });
    return {
      id_usuario: demo.id,
      username,
      rol: demo.rol,
      token: `mock-jwt-${username}-${Date.now()}`,
    };
  },
};

export const mockDashboard = {
  async getStats(): Promise<DashboardStats> {
    const today = new Date().toISOString().slice(0, 10);
    return mockStore.delay({
      totalPacientes: mockStore.pacientes.length,
      consultasHoy: mockStore.consultas.filter((c) => c.fecha_hora.startsWith(today)).length,
      facturasPendientes: mockStore.facturas.filter((f) => f.estado === 'pendiente').length,
      medicamentosStockBajo: mockStore.medicamentos.filter((m) => m.stock < 10).length,
    });
  },
};

export const mockUsuarios = {
  async getAll(): Promise<Usuario[]> {
    return mockStore.delay(
      mockStore.usuarios.map((u) => ({
        ...u,
        rol: mockStore.roles.find((r) => r.id_rol === u.id_rol),
      }))
    );
  },
  async create(data: Omit<Usuario, 'id_usuario'>): Promise<Usuario> {
    const nuevo = { ...data, id_usuario: mockStore.nextId('usuarios') };
    mockStore.usuarios.push(nuevo);
    return mockStore.delay(nuevo);
  },
  async update(id: number, data: Partial<Usuario>): Promise<Usuario> {
    const idx = mockStore.usuarios.findIndex((u) => u.id_usuario === id);
    if (idx < 0) throw new Error('No encontrado');
    mockStore.usuarios[idx] = { ...mockStore.usuarios[idx], ...data };
    return mockStore.delay(mockStore.usuarios[idx]);
  },
};

export const mockPacientes = {
  async getAll(): Promise<Paciente[]> {
    return mockStore.delay(mockStore.pacientes.map(enrichPaciente));
  },
  async getById(id: number): Promise<Paciente> {
    const p = mockStore.pacientes.find((x) => x.id_paciente === id);
    if (!p) throw new Error('Paciente no encontrado');
    return mockStore.delay(enrichPaciente(p));
  },
  async create(data: Omit<Paciente, 'id_paciente'>): Promise<Paciente> {
    const nuevo = { ...data, id_paciente: mockStore.nextId('pacientes') };
    mockStore.pacientes.push(nuevo);
    return mockStore.delay(enrichPaciente(nuevo));
  },
  async update(id: number, data: Partial<Paciente>): Promise<Paciente> {
    const idx = mockStore.pacientes.findIndex((p) => p.id_paciente === id);
    if (idx < 0) throw new Error('No encontrado');
    mockStore.pacientes[idx] = { ...mockStore.pacientes[idx], ...data };
    return mockStore.delay(enrichPaciente(mockStore.pacientes[idx]));
  },
  async delete(id: number): Promise<void> {
    mockStore.pacientes = mockStore.pacientes.filter((p) => p.id_paciente !== id);
    return mockStore.delay(undefined);
  },
};

export const mockTiposSangre = {
  async getAll(): Promise<TipoSangre[]> {
    return mockStore.delay(mockStore.tiposSangre);
  },
  async create(data: Omit<TipoSangre, 'id_tipo_sangre'>): Promise<TipoSangre> {
    const nuevo = { ...data, id_tipo_sangre: mockStore.nextId('tiposSangre') };
    mockStore.tiposSangre.push(nuevo);
    return mockStore.delay(nuevo);
  },
};

export const mockExpedientes = {
  async getByPaciente(pacienteId: number): Promise<Expediente | null> {
    const exp = mockStore.expedientes.find((e) => e.id_paciente === pacienteId);
    if (!exp) return mockStore.delay(null);
    const paciente = mockStore.pacientes.find((p) => p.id_paciente === pacienteId);
    return mockStore.delay({ ...exp, paciente: paciente ? enrichPaciente(paciente) : undefined });
  },
  async create(data: Omit<Expediente, 'id_expediente'>): Promise<Expediente> {
    const nuevo = { ...data, id_expediente: mockStore.nextId('expedientes'), fecha_creacion: data.fecha_creacion || new Date().toISOString() };
    mockStore.expedientes.push(nuevo);
    return mockStore.delay(nuevo);
  },
  async update(id: number, data: Partial<Expediente>): Promise<Expediente> {
    const idx = mockStore.expedientes.findIndex((e) => e.id_expediente === id);
    if (idx < 0) throw new Error('No encontrado');
    mockStore.expedientes[idx] = { ...mockStore.expedientes[idx], ...data };
    return mockStore.delay(mockStore.expedientes[idx]);
  },
};

export const mockEspecialidades = {
  async getAll(): Promise<Especialidad[]> {
    return mockStore.delay(mockStore.especialidades);
  },
  async create(data: Omit<Especialidad, 'id_especialidad'>): Promise<Especialidad> {
    const nuevo = { ...data, id_especialidad: mockStore.nextId('especialidades') };
    mockStore.especialidades.push(nuevo);
    return mockStore.delay(nuevo);
  },
  async update(id: number, data: Partial<Especialidad>): Promise<Especialidad> {
    const idx = mockStore.especialidades.findIndex((e) => e.id_especialidad === id);
    if (idx < 0) throw new Error('No encontrado');
    mockStore.especialidades[idx] = { ...mockStore.especialidades[idx], ...data };
    return mockStore.delay(mockStore.especialidades[idx]);
  },
  async delete(id: number): Promise<void> {
    mockStore.especialidades = mockStore.especialidades.filter((e) => e.id_especialidad !== id);
    return mockStore.delay(undefined);
  },
};

export const mockMedicos = {
  async getAll(especialidadId?: number): Promise<Medico[]> {
    let list = mockStore.medicos;
    if (especialidadId) list = list.filter((m) => m.id_especialidad === especialidadId);
    return mockStore.delay(
      list.map((m) => ({
        ...m,
        especialidad: mockStore.especialidades.find((e) => e.id_especialidad === m.id_especialidad),
      }))
    );
  },
  async create(data: Omit<Medico, 'id_medico'>): Promise<Medico> {
    const nuevo = { ...data, id_medico: mockStore.nextId('medicos') };
    mockStore.medicos.push(nuevo);
    return mockStore.delay(nuevo);
  },
  async update(id: number, data: Partial<Medico>): Promise<Medico> {
    const idx = mockStore.medicos.findIndex((m) => m.id_medico === id);
    if (idx < 0) throw new Error('No encontrado');
    mockStore.medicos[idx] = { ...mockStore.medicos[idx], ...data };
    return mockStore.delay(mockStore.medicos[idx]);
  },
};

export const mockConsultas = {
  async getAll(): Promise<Consulta[]> {
    return mockStore.delay(mockStore.consultas.map(enrichConsulta));
  },
  async getByPaciente(pacienteId: number): Promise<Consulta[]> {
    return mockStore.delay(
      mockStore.consultas.filter((c) => c.id_paciente === pacienteId).map(enrichConsulta)
    );
  },
  async getById(id: number): Promise<Consulta> {
    const c = mockStore.consultas.find((x) => x.id_consulta === id);
    if (!c) throw new Error('No encontrada');
    return mockStore.delay(enrichConsulta(c));
  },
  async create(data: Omit<Consulta, 'id_consulta'>): Promise<Consulta> {
    const nuevo = { ...data, id_consulta: mockStore.nextId('consultas') };
    mockStore.consultas.push(nuevo);
    return mockStore.delay(enrichConsulta(nuevo));
  },
  async update(id: number, data: Partial<Consulta>): Promise<Consulta> {
    const idx = mockStore.consultas.findIndex((c) => c.id_consulta === id);
    if (idx < 0) throw new Error('No encontrada');
    mockStore.consultas[idx] = { ...mockStore.consultas[idx], ...data };
    return mockStore.delay(enrichConsulta(mockStore.consultas[idx]));
  },
};

export const mockEstadosConsulta = {
  async getAll(): Promise<EstadoConsulta[]> {
    return mockStore.delay(mockStore.estadosConsulta);
  },
};

export const mockMedicamentos = {
  async getAll(): Promise<Medicamento[]> {
    return mockStore.delay(mockStore.medicamentos);
  },
  async create(data: Omit<Medicamento, 'id_medicamento'>): Promise<Medicamento> {
    const nuevo = { ...data, id_medicamento: mockStore.nextId('medicamentos') };
    mockStore.medicamentos.push(nuevo);
    return mockStore.delay(nuevo);
  },
  async update(id: number, data: Partial<Medicamento>): Promise<Medicamento> {
    const idx = mockStore.medicamentos.findIndex((m) => m.id_medicamento === id);
    if (idx < 0) throw new Error('No encontrado');
    mockStore.medicamentos[idx] = { ...mockStore.medicamentos[idx], ...data };
    return mockStore.delay(mockStore.medicamentos[idx]);
  },
};

export const mockRecetas = {
  async getAll(): Promise<Receta[]> {
    return mockStore.delay(
      mockStore.recetas.map((r) => ({
        ...r,
        medicamento: mockStore.medicamentos.find((m) => m.id_medicamento === r.id_medicamento),
        consulta: enrichConsulta(mockStore.consultas.find((c) => c.id_consulta === r.id_consulta)!),
      }))
    );
  },
  async getByPaciente(pacienteId: number): Promise<Receta[]> {
    const consultaIds = mockStore.consultas.filter((c) => c.id_paciente === pacienteId).map((c) => c.id_consulta);
    const recetas = mockStore.recetas.filter((r) => consultaIds.includes(r.id_consulta));
    return mockStore.delay(
      recetas.map((r) => ({
        ...r,
        medicamento: mockStore.medicamentos.find((m) => m.id_medicamento === r.id_medicamento),
      }))
    );
  },
  async create(data: Omit<Receta, 'id_receta'>): Promise<Receta> {
    const nuevo = { ...data, id_receta: mockStore.nextId('recetas') };
    mockStore.recetas.push(nuevo);
    const med = mockStore.medicamentos.find((m) => m.id_medicamento === data.id_medicamento);
    if (med && med.stock > 0) med.stock -= 1;
    return mockStore.delay(nuevo);
  },
};

export const mockLaboratorios = {
  async getAll(): Promise<Laboratorio[]> {
    return mockStore.delay(mockStore.laboratorios);
  },
  async create(data: Omit<Laboratorio, 'id_laboratorio'>): Promise<Laboratorio> {
    const nuevo = { ...data, id_laboratorio: mockStore.nextId('laboratorios') };
    mockStore.laboratorios.push(nuevo);
    return mockStore.delay(nuevo);
  },
  async update(id: number, data: Partial<Laboratorio>): Promise<Laboratorio> {
    const idx = mockStore.laboratorios.findIndex((l) => l.id_laboratorio === id);
    if (idx < 0) throw new Error('No encontrado');
    mockStore.laboratorios[idx] = { ...mockStore.laboratorios[idx], ...data };
    return mockStore.delay(mockStore.laboratorios[idx]);
  },
};

export const mockEstudios = {
  async getAll(): Promise<EstudioLaboratorio[]> {
    return mockStore.delay(
      mockStore.estudios.map((e) => ({
        ...e,
        paciente: enrichPaciente(mockStore.pacientes.find((p) => p.id_paciente === e.id_paciente)!),
        laboratorio: mockStore.laboratorios.find((l) => l.id_laboratorio === e.id_laboratorio),
        medico: mockStore.medicos.find((m) => m.id_medico === e.id_medico),
      }))
    );
  },
  async getByPaciente(pacienteId: number): Promise<EstudioLaboratorio[]> {
    return mockStore.delay(
      mockStore.estudios
        .filter((e) => e.id_paciente === pacienteId)
        .map((e) => ({
          ...e,
          laboratorio: mockStore.laboratorios.find((l) => l.id_laboratorio === e.id_laboratorio),
        }))
    );
  },
  async create(data: Omit<EstudioLaboratorio, 'id_estudio'>): Promise<EstudioLaboratorio> {
    const nuevo = { ...data, id_estudio: mockStore.nextId('estudios') };
    mockStore.estudios.push(nuevo);
    return mockStore.delay(nuevo);
  },
  async update(id: number, data: Partial<EstudioLaboratorio>): Promise<EstudioLaboratorio> {
    const idx = mockStore.estudios.findIndex((e) => e.id_estudio === id);
    if (idx < 0) throw new Error('No encontrado');
    mockStore.estudios[idx] = { ...mockStore.estudios[idx], ...data };
    return mockStore.delay(mockStore.estudios[idx]);
  },
};

export const mockHospitalizaciones = {
  async getAll(): Promise<Hospitalizacion[]> {
    return mockStore.delay(
      mockStore.hospitalizaciones.map((h) => ({
        ...h,
        paciente: enrichPaciente(mockStore.pacientes.find((p) => p.id_paciente === h.id_paciente)!),
      }))
    );
  },
  async getByPaciente(pacienteId: number): Promise<Hospitalizacion[]> {
    return mockStore.delay(mockStore.hospitalizaciones.filter((h) => h.id_paciente === pacienteId));
  },
  async create(data: Omit<Hospitalizacion, 'id_hospitalizacion'>): Promise<Hospitalizacion> {
    const nuevo = { ...data, id_hospitalizacion: mockStore.nextId('hospitalizaciones') };
    mockStore.hospitalizaciones.push(nuevo);
    return mockStore.delay(nuevo);
  },
};

export const mockFacturas = {
  async getAll(): Promise<Factura[]> {
    return mockStore.delay(
      mockStore.facturas.map((f) => ({
        ...f,
        paciente: enrichPaciente(mockStore.pacientes.find((p) => p.id_paciente === f.id_paciente)!),
      }))
    );
  },
  async create(data: Omit<Factura, 'id_factura'>): Promise<Factura> {
    const nuevo = { ...data, id_factura: mockStore.nextId('facturas') };
    mockStore.facturas.push(nuevo);
    return mockStore.delay(nuevo);
  },
  async update(id: number, data: Partial<Factura>): Promise<Factura> {
    const idx = mockStore.facturas.findIndex((f) => f.id_factura === id);
    if (idx < 0) throw new Error('No encontrada');
    mockStore.facturas[idx] = { ...mockStore.facturas[idx], ...data };
    return mockStore.delay(mockStore.facturas[idx]);
  },
};

export const mockPagos = {
  async getAll(): Promise<Pago[]> {
    return mockStore.delay(
      mockStore.pagos.map((p) => ({
        ...p,
        factura: mockStore.facturas.find((f) => f.id_factura === p.id_factura),
      }))
    );
  },
  async getByPaciente(pacienteId: number): Promise<Pago[]> {
    const facturaIds = mockStore.facturas.filter((f) => f.id_paciente === pacienteId).map((f) => f.id_factura);
    return mockStore.delay(mockStore.pagos.filter((p) => facturaIds.includes(p.id_factura)));
  },
  async create(data: Omit<Pago, 'id_pago'>): Promise<Pago> {
    const nuevo = { ...data, id_pago: mockStore.nextId('pagos') };
    mockStore.pagos.push(nuevo);
    const factura = mockStore.facturas.find((f) => f.id_factura === data.id_factura);
    if (factura) {
      const totalPagado = mockStore.pagos
        .filter((p) => p.id_factura === data.id_factura)
        .reduce((s, p) => s + p.monto, 0);
      if (totalPagado >= factura.monto_total) factura.estado = 'pagada';
    }
    return mockStore.delay(nuevo);
  },
};

export const mockAuditoria = {
  async getBitacora(): Promise<BitacoraAcceso[]> {
    return mockStore.delay(
      mockStore.bitacora.map((b) => ({
        ...b,
        usuario: mockStore.usuarios.find((u) => u.id_usuario === b.id_usuario),
      }))
    );
  },
  async getCambios(): Promise<AuditoriaCambio[]> {
    return mockStore.delay(mockStore.auditoria);
  },
  async getRespaldos(): Promise<Respaldo[]> {
    return mockStore.delay(mockStore.respaldos);
  },
  async createRespaldo(data: Omit<Respaldo, 'id_respaldo'>): Promise<Respaldo> {
    const nuevo = { ...data, id_respaldo: mockStore.nextId('respaldos') };
    mockStore.respaldos.push(nuevo);
    return mockStore.delay(nuevo);
  },
};

export const mockRoles = {
  async getAll(): Promise<Rol[]> {
    return mockStore.delay(mockStore.roles);
  },
};
