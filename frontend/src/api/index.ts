import { USE_MOCK, apiClient } from './client';
import * as mock from '../mocks/mockServices';
import { AuthUser, Usuario, Paciente, Expediente, Especialidad, Medico, Consulta, Medicamento, Receta, Laboratorio, EstudioLaboratorio, Hospitalizacion, Factura, Pago, BitacoraAcceso, AuditoriaCambio, Respaldo, DashboardStats, TipoSangre, EstadoConsulta, Rol } from '../types';

/** @module Auth - POST /auth/login */
export const authApi = {
  login: (username: string, password: string): Promise<AuthUser> =>
    USE_MOCK ? mock.mockAuth.login(username, password) : apiClient.post('/auth/login', { username, password }).then((r) => r.data),
};

export const dashboardApi = {
  getStats: (): Promise<DashboardStats> =>
    USE_MOCK ? mock.mockDashboard.getStats() : apiClient.get('/dashboard/stats').then((r) => r.data),
};

export const usuariosApi = {
  getAll: (): Promise<Usuario[]> => USE_MOCK ? mock.mockUsuarios.getAll() : apiClient.get('/usuarios').then((r) => r.data),
  create: (data: Omit<Usuario, 'id_usuario'>) => USE_MOCK ? mock.mockUsuarios.create(data) : apiClient.post('/usuarios', data).then((r) => r.data),
  update: (id: number, data: Partial<Usuario>) => USE_MOCK ? mock.mockUsuarios.update(id, data) : apiClient.put(`/usuarios/${id}`, data).then((r) => r.data),
};

export const rolesApi = {
  getAll: (): Promise<Rol[]> => USE_MOCK ? mock.mockRoles.getAll() : apiClient.get('/roles').then((r) => r.data),
};

export const pacientesApi = {
  getAll: (): Promise<Paciente[]> => USE_MOCK ? mock.mockPacientes.getAll() : apiClient.get('/pacientes').then((r) => r.data),
  getById: (id: number): Promise<Paciente> => USE_MOCK ? mock.mockPacientes.getById(id) : apiClient.get(`/pacientes/${id}`).then((r) => r.data),
  create: (data: Omit<Paciente, 'id_paciente'>) => USE_MOCK ? mock.mockPacientes.create(data) : apiClient.post('/pacientes', data).then((r) => r.data),
  update: (id: number, data: Partial<Paciente>) => USE_MOCK ? mock.mockPacientes.update(id, data) : apiClient.put(`/pacientes/${id}`, data).then((r) => r.data),
  delete: (id: number): Promise<void> => USE_MOCK ? mock.mockPacientes.delete(id) : apiClient.delete(`/pacientes/${id}`),
};

export const tiposSangreApi = {
  getAll: (): Promise<TipoSangre[]> => USE_MOCK ? mock.mockTiposSangre.getAll() : apiClient.get('/tipos-sangre').then((r) => r.data),
  create: (data: Omit<TipoSangre, 'id_tipo_sangre'>) => USE_MOCK ? mock.mockTiposSangre.create(data) : apiClient.post('/tipos-sangre', data).then((r) => r.data),
};

export const expedientesApi = {
  getByPaciente: (id: number): Promise<Expediente | null> => USE_MOCK ? mock.mockExpedientes.getByPaciente(id) : apiClient.get(`/expedientes/paciente/${id}`).then((r) => r.data),
  create: (data: Omit<Expediente, 'id_expediente'>) => USE_MOCK ? mock.mockExpedientes.create(data) : apiClient.post('/expedientes', data).then((r) => r.data),
  update: (id: number, data: Partial<Expediente>) => USE_MOCK ? mock.mockExpedientes.update(id, data) : apiClient.put(`/expedientes/${id}`, data).then((r) => r.data),
};

export const especialidadesApi = {
  getAll: (): Promise<Especialidad[]> => USE_MOCK ? mock.mockEspecialidades.getAll() : apiClient.get('/especialidades').then((r) => r.data),
  create: (data: Omit<Especialidad, 'id_especialidad'>) => USE_MOCK ? mock.mockEspecialidades.create(data) : apiClient.post('/especialidades', data).then((r) => r.data),
  update: (id: number, data: Partial<Especialidad>) => USE_MOCK ? mock.mockEspecialidades.update(id, data) : apiClient.put(`/especialidades/${id}`, data).then((r) => r.data),
  delete: (id: number): Promise<void> => USE_MOCK ? mock.mockEspecialidades.delete(id) : apiClient.delete(`/especialidades/${id}`),
};

export const medicosApi = {
  getAll: (especialidadId?: number): Promise<Medico[]> => USE_MOCK ? mock.mockMedicos.getAll(especialidadId) : apiClient.get('/medicos', { params: { especialidadId } }).then((r) => r.data),
  create: (data: Omit<Medico, 'id_medico'>) => USE_MOCK ? mock.mockMedicos.create(data) : apiClient.post('/medicos', data).then((r) => r.data),
  update: (id: number, data: Partial<Medico>) => USE_MOCK ? mock.mockMedicos.update(id, data) : apiClient.put(`/medicos/${id}`, data).then((r) => r.data),
};

export const consultasApi = {
  getAll: (): Promise<Consulta[]> => USE_MOCK ? mock.mockConsultas.getAll() : apiClient.get('/consultas').then((r) => r.data),
  getById: (id: number): Promise<Consulta> => USE_MOCK ? mock.mockConsultas.getById(id) : apiClient.get(`/consultas/${id}`).then((r) => r.data),
  getByPaciente: (id: number): Promise<Consulta[]> => USE_MOCK ? mock.mockConsultas.getByPaciente(id) : apiClient.get(`/consultas/paciente/${id}`).then((r) => r.data),
  create: (data: Omit<Consulta, 'id_consulta'>) => USE_MOCK ? mock.mockConsultas.create(data) : apiClient.post('/consultas', data).then((r) => r.data),
  update: (id: number, data: Partial<Consulta>) => USE_MOCK ? mock.mockConsultas.update(id, data) : apiClient.put(`/consultas/${id}`, data).then((r) => r.data),
};

export const estadosConsultaApi = {
  getAll: (): Promise<EstadoConsulta[]> => USE_MOCK ? mock.mockEstadosConsulta.getAll() : apiClient.get('/estados-consulta').then((r) => r.data),
};

export const medicamentosApi = {
  getAll: (): Promise<Medicamento[]> => USE_MOCK ? mock.mockMedicamentos.getAll() : apiClient.get('/medicamentos').then((r) => r.data),
  create: (data: Omit<Medicamento, 'id_medicamento'>) => USE_MOCK ? mock.mockMedicamentos.create(data) : apiClient.post('/medicamentos', data).then((r) => r.data),
  update: (id: number, data: Partial<Medicamento>) => USE_MOCK ? mock.mockMedicamentos.update(id, data) : apiClient.put(`/medicamentos/${id}`, data).then((r) => r.data),
};

export const recetasApi = {
  getAll: (): Promise<Receta[]> => USE_MOCK ? mock.mockRecetas.getAll() : apiClient.get('/recetas').then((r) => r.data),
  getByPaciente: (id: number): Promise<Receta[]> => USE_MOCK ? mock.mockRecetas.getByPaciente(id) : apiClient.get(`/recetas/paciente/${id}`).then((r) => r.data),
  create: (data: Omit<Receta, 'id_receta'>) => USE_MOCK ? mock.mockRecetas.create(data) : apiClient.post('/recetas', data).then((r) => r.data),
};

export const laboratoriosApi = {
  getAll: (): Promise<Laboratorio[]> => USE_MOCK ? mock.mockLaboratorios.getAll() : apiClient.get('/laboratorios').then((r) => r.data),
  create: (data: Omit<Laboratorio, 'id_laboratorio'>) => USE_MOCK ? mock.mockLaboratorios.create(data) : apiClient.post('/laboratorios', data).then((r) => r.data),
  update: (id: number, data: Partial<Laboratorio>) => USE_MOCK ? mock.mockLaboratorios.update(id, data) : apiClient.put(`/laboratorios/${id}`, data).then((r) => r.data),
};

export const estudiosApi = {
  getAll: (): Promise<EstudioLaboratorio[]> => USE_MOCK ? mock.mockEstudios.getAll() : apiClient.get('/estudios-laboratorio').then((r) => r.data),
  getByPaciente: (id: number): Promise<EstudioLaboratorio[]> => USE_MOCK ? mock.mockEstudios.getByPaciente(id) : apiClient.get(`/estudios-laboratorio/paciente/${id}`).then((r) => r.data),
  create: (data: Omit<EstudioLaboratorio, 'id_estudio'>) => USE_MOCK ? mock.mockEstudios.create(data) : apiClient.post('/estudios-laboratorio', data).then((r) => r.data),
  update: (id: number, data: Partial<EstudioLaboratorio>) => USE_MOCK ? mock.mockEstudios.update(id, data) : apiClient.put(`/estudios-laboratorio/${id}`, data).then((r) => r.data),
};

export const hospitalizacionesApi = {
  getAll: (): Promise<Hospitalizacion[]> => USE_MOCK ? mock.mockHospitalizaciones.getAll() : apiClient.get('/hospitalizaciones').then((r) => r.data),
  getByPaciente: (id: number): Promise<Hospitalizacion[]> => USE_MOCK ? mock.mockHospitalizaciones.getByPaciente(id) : apiClient.get(`/hospitalizaciones/paciente/${id}`).then((r) => r.data),
  create: (data: Omit<Hospitalizacion, 'id_hospitalizacion'>) => USE_MOCK ? mock.mockHospitalizaciones.create(data) : apiClient.post('/hospitalizaciones', data).then((r) => r.data),
};

export const facturasApi = {
  getAll: (): Promise<Factura[]> => USE_MOCK ? mock.mockFacturas.getAll() : apiClient.get('/facturas').then((r) => r.data),
  create: (data: Omit<Factura, 'id_factura'>) => USE_MOCK ? mock.mockFacturas.create(data) : apiClient.post('/facturas', data).then((r) => r.data),
  update: (id: number, data: Partial<Factura>) => USE_MOCK ? mock.mockFacturas.update(id, data) : apiClient.put(`/facturas/${id}`, data).then((r) => r.data),
};

export const pagosApi = {
  getAll: (): Promise<Pago[]> => USE_MOCK ? mock.mockPagos.getAll() : apiClient.get('/pagos').then((r) => r.data),
  getByPaciente: (id: number): Promise<Pago[]> => USE_MOCK ? mock.mockPagos.getByPaciente(id) : apiClient.get(`/pagos/paciente/${id}`).then((r) => r.data),
  create: (data: Omit<Pago, 'id_pago'>) => USE_MOCK ? mock.mockPagos.create(data) : apiClient.post('/pagos', data).then((r) => r.data),
};

export const auditoriaApi = {
  getBitacora: (): Promise<BitacoraAcceso[]> => USE_MOCK ? mock.mockAuditoria.getBitacora() : apiClient.get('/auditoria/accesos').then((r) => r.data),
  getCambios: (): Promise<AuditoriaCambio[]> => USE_MOCK ? mock.mockAuditoria.getCambios() : apiClient.get('/auditoria/cambios').then((r) => r.data),
  getRespaldos: (): Promise<Respaldo[]> => USE_MOCK ? mock.mockAuditoria.getRespaldos() : apiClient.get('/respaldos').then((r) => r.data),
  createRespaldo: (data: Omit<Respaldo, 'id_respaldo'>) => USE_MOCK ? mock.mockAuditoria.createRespaldo(data) : apiClient.post('/respaldos', data).then((r) => r.data),
};
