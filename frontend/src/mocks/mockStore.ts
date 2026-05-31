import {
  seedRoles, seedUsuarios, seedTiposSangre, seedPacientes, seedExpedientes,
  seedEspecialidades, seedMedicos, seedEstadosConsulta, seedConsultas,
  seedMedicamentos, seedRecetas, seedLaboratorios, seedEstudios,
  seedHospitalizaciones, seedFacturas, seedPagos, seedBitacora,
  seedAuditoria, seedRespaldos,
} from './seedData';

function clone<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}

class MockStore {
  roles = clone(seedRoles);
  usuarios = clone(seedUsuarios);
  tiposSangre = clone(seedTiposSangre);
  pacientes = clone(seedPacientes);
  expedientes = clone(seedExpedientes);
  especialidades = clone(seedEspecialidades);
  medicos = clone(seedMedicos);
  estadosConsulta = clone(seedEstadosConsulta);
  consultas = clone(seedConsultas);
  medicamentos = clone(seedMedicamentos);
  recetas = clone(seedRecetas);
  laboratorios = clone(seedLaboratorios);
  estudios = clone(seedEstudios);
  hospitalizaciones = clone(seedHospitalizaciones);
  facturas = clone(seedFacturas);
  pagos = clone(seedPagos);
  bitacora = clone(seedBitacora);
  auditoria = clone(seedAuditoria);
  respaldos = clone(seedRespaldos);

  private counters: Record<string, number> = {
    usuarios: 10, pacientes: 10, expedientes: 10, especialidades: 10,
    medicos: 10, consultas: 10, medicamentos: 10, recetas: 10,
    laboratorios: 10, estudios: 10, hospitalizaciones: 10, facturas: 10,
    pagos: 10, bitacora: 10, auditoria: 10, respaldos: 10, tiposSangre: 10,
    estadosConsulta: 10,
  };

  nextId(key: string): number {
    this.counters[key] = (this.counters[key] || 100) + 1;
    return this.counters[key];
  }

  delay<T>(data: T, ms = 300): Promise<T> {
    return new Promise((resolve) => setTimeout(() => resolve(data), ms));
  }
}

export const mockStore = new MockStore();
