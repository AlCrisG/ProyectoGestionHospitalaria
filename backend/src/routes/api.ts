import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { pool } from '../db/pool';
import { authMiddleware } from '../middleware/auth';
import {
  mapPaciente,
  mapMedico,
  mapConsulta,
  splitFullName,
  mapRolNombre,
  toIso,
} from '../utils/mappers';

export const apiRouter = Router();
apiRouter.use(authMiddleware);

// ——— Dashboard ———
apiRouter.get('/dashboard/stats', async (_req, res) => {
  try {
    const [p, c, f, m] = await Promise.all([
      pool.query('SELECT COUNT(*)::int AS n FROM pacientes'),
      pool.query(`SELECT COUNT(*)::int AS n FROM consultas WHERE fecha_hora::date = CURRENT_DATE`),
      pool.query(`SELECT COUNT(*)::int AS n FROM facturas WHERE estado = 'pendiente'`),
      pool.query(`SELECT COUNT(*)::int AS n FROM medicamentos WHERE stock < 10`),
    ]);
    res.json({
      totalPacientes: p.rows[0].n,
      consultasHoy: c.rows[0].n,
      facturasPendientes: f.rows[0].n,
      medicamentosStockBajo: m.rows[0].n,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Error al obtener estadísticas' });
  }
});

// ——— Roles ———
apiRouter.get('/roles', async (_req, res) => {
  const { rows } = await pool.query('SELECT id_rol, nombre, descripcion FROM roles ORDER BY id_rol');
  res.json(rows.map((r) => ({ ...r, nombre: mapRolNombre(r.nombre) })));
});

// ——— Usuarios ———
apiRouter.get('/usuarios', async (_req, res) => {
  const { rows } = await pool.query(
    `SELECT u.id_usuario, u.id_rol, u.username, u.activo, r.nombre, r.descripcion
     FROM usuarios u JOIN roles r ON u.id_rol = r.id_rol ORDER BY u.id_usuario`
  );
  res.json(
    rows.map((u) => ({
      id_usuario: u.id_usuario,
      id_rol: u.id_rol,
      username: u.username,
      activo: u.activo,
      rol: { id_rol: u.id_rol, nombre: mapRolNombre(u.nombre), descripcion: u.descripcion },
    }))
  );
});

apiRouter.post('/usuarios', async (req, res) => {
  const { username, password, id_rol, activo } = req.body;
  const hash = password ? await bcrypt.hash(password, 10) : 'changeme';
  const { rows } = await pool.query(
    `INSERT INTO usuarios (id_rol, username, password_hash, activo)
     VALUES ($1, $2, $3, $4) RETURNING id_usuario, id_rol, username, activo`,
    [id_rol, username, hash, activo ?? true]
  );
  res.status(201).json(rows[0]);
});

apiRouter.put('/usuarios/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { username, password, id_rol, activo } = req.body;
  if (password) {
    const hash = await bcrypt.hash(password, 10);
    await pool.query(
      `UPDATE usuarios SET username = COALESCE($1, username), id_rol = COALESCE($2, id_rol),
       activo = COALESCE($3, activo), password_hash = $4 WHERE id_usuario = $5`,
      [username, id_rol, activo, hash, id]
    );
  } else {
    await pool.query(
      `UPDATE usuarios SET username = COALESCE($1, username), id_rol = COALESCE($2, id_rol),
       activo = COALESCE($3, activo) WHERE id_usuario = $4`,
      [username, id_rol, activo, id]
    );
  }
  const { rows } = await pool.query('SELECT id_usuario, id_rol, username, activo FROM usuarios WHERE id_usuario = $1', [id]);
  res.json(rows[0]);
});

// ——— Pacientes ———
const PACIENTE_SELECT = `
  SELECT p.*, ts.tipo FROM pacientes p
  LEFT JOIN tipos_sangre ts ON p.id_tipo_sangre = ts.id_tipo_sangre`;

apiRouter.get('/pacientes', async (_req, res) => {
  const { rows } = await pool.query(`${PACIENTE_SELECT} ORDER BY p.id_paciente`);
  res.json(rows.map(mapPaciente));
});

apiRouter.get('/pacientes/:id', async (req, res) => {
  const { rows } = await pool.query(`${PACIENTE_SELECT} WHERE p.id_paciente = $1`, [req.params.id]);
  if (!rows[0]) return res.status(404).json({ message: 'No encontrado' });
  res.json(mapPaciente(rows[0]));
});

apiRouter.post('/pacientes', async (req, res) => {
  const { nombre_completo, fecha_nacimiento, id_tipo_sangre, telefono, direccion } = req.body;
  const { nombre, apellido_paterno, apellido_materno } = splitFullName(nombre_completo);
  const { rows } = await pool.query(
    `INSERT INTO pacientes (id_tipo_sangre, nombre, apellido_paterno, apellido_materno, fecha_nacimiento, telefono, direccion)
     VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
    [id_tipo_sangre, nombre, apellido_paterno, apellido_materno, fecha_nacimiento, telefono || null, direccion || null]
  );
  const ts = await pool.query('SELECT tipo FROM tipos_sangre WHERE id_tipo_sangre = $1', [id_tipo_sangre]);
  res.status(201).json(mapPaciente({ ...rows[0], tipo: ts.rows[0]?.tipo }));
});

apiRouter.put('/pacientes/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { nombre_completo, fecha_nacimiento, id_tipo_sangre, telefono, direccion } = req.body;
  const { nombre, apellido_paterno, apellido_materno } = splitFullName(nombre_completo || '');
  await pool.query(
    `UPDATE pacientes SET
      nombre = COALESCE($1, nombre), apellido_paterno = COALESCE($2, apellido_paterno),
      apellido_materno = COALESCE($3, apellido_materno), fecha_nacimiento = COALESCE($4, fecha_nacimiento),
      id_tipo_sangre = COALESCE($5, id_tipo_sangre), telefono = $6, direccion = $7
     WHERE id_paciente = $8`,
    [nombre || null, apellido_paterno || null, apellido_materno || null, fecha_nacimiento, id_tipo_sangre, telefono ?? null, direccion ?? null, id]
  );
  const { rows } = await pool.query(`${PACIENTE_SELECT} WHERE p.id_paciente = $1`, [id]);
  res.json(mapPaciente(rows[0]));
});

apiRouter.delete('/pacientes/:id', async (req, res) => {
  await pool.query('DELETE FROM pacientes WHERE id_paciente = $1', [req.params.id]);
  res.status(204).send();
});

// ——— Tipos sangre ———
apiRouter.get('/tipos-sangre', async (_req, res) => {
  const { rows } = await pool.query('SELECT * FROM tipos_sangre ORDER BY id_tipo_sangre');
  res.json(rows);
});

apiRouter.post('/tipos-sangre', async (req, res) => {
  const { rows } = await pool.query(
    'INSERT INTO tipos_sangre (tipo) VALUES ($1) RETURNING *',
    [req.body.tipo]
  );
  res.status(201).json(rows[0]);
});

// ——— Expedientes ———
apiRouter.get('/expedientes/paciente/:pacienteId', async (req, res) => {
  const { rows } = await pool.query(
    'SELECT * FROM expedientes WHERE id_paciente = $1 LIMIT 1',
    [req.params.pacienteId]
  );
  if (!rows[0]) return res.json(null);
  const exp = rows[0];
  res.json({
    ...exp,
    fecha_creacion: toIso(exp.fecha_creacion),
  });
});

apiRouter.post('/expedientes', async (req, res) => {
  const { id_paciente, antecedentes_familiares, alergias, fecha_creacion } = req.body;
  const { rows } = await pool.query(
    `INSERT INTO expedientes (id_paciente, fecha_creacion, antecedentes_familiares, alergias)
     VALUES ($1, COALESCE($2::timestamptz, NOW()), $3, $4) RETURNING *`,
    [id_paciente, fecha_creacion, antecedentes_familiares, alergias]
  );
  res.status(201).json({ ...rows[0], fecha_creacion: toIso(rows[0].fecha_creacion) });
});

apiRouter.put('/expedientes/:id', async (req, res) => {
  const { antecedentes_familiares, alergias } = req.body;
  const { rows } = await pool.query(
    `UPDATE expedientes SET antecedentes_familiares = $1, alergias = $2
     WHERE id_expediente = $3 RETURNING *`,
    [antecedentes_familiares, alergias, req.params.id]
  );
  res.json({ ...rows[0], fecha_creacion: toIso(rows[0].fecha_creacion) });
});

// ——— Especialidades ———
apiRouter.get('/especialidades', async (_req, res) => {
  const { rows } = await pool.query('SELECT * FROM especialidades ORDER BY id_especialidad');
  res.json(rows);
});

apiRouter.post('/especialidades', async (req, res) => {
  const { rows } = await pool.query(
    'INSERT INTO especialidades (nombre, descripcion) VALUES ($1,$2) RETURNING *',
    [req.body.nombre, req.body.descripcion]
  );
  res.status(201).json(rows[0]);
});

apiRouter.put('/especialidades/:id', async (req, res) => {
  const { rows } = await pool.query(
    'UPDATE especialidades SET nombre = $1, descripcion = $2 WHERE id_especialidad = $3 RETURNING *',
    [req.body.nombre, req.body.descripcion, req.params.id]
  );
  res.json(rows[0]);
});

apiRouter.delete('/especialidades/:id', async (req, res) => {
  await pool.query('DELETE FROM especialidades WHERE id_especialidad = $1', [req.params.id]);
  res.status(204).send();
});

// ——— Médicos ———
const MEDICO_SELECT = `
  SELECT m.*, e.nombre AS especialidad_nombre FROM medicos m
  LEFT JOIN especialidades e ON m.id_especialidad = e.id_especialidad`;

apiRouter.get('/medicos', async (req, res) => {
  const esp = req.query.especialidadId;
  let q = `${MEDICO_SELECT}`;
  const params: unknown[] = [];
  if (esp) {
    q += ' WHERE m.id_especialidad = $1';
    params.push(esp);
  }
  q += ' ORDER BY m.id_medico';
  const { rows } = await pool.query(q, params);
  res.json(rows.map((r) => mapMedico({ ...r, especialidad_nombre: r.especialidad_nombre })));
});

apiRouter.post('/medicos', async (req, res) => {
  const { nombre_completo, cedula_profesional, id_especialidad, id_usuario } = req.body;
  const { nombre, apellido_paterno, apellido_materno } = splitFullName(nombre_completo);
  const { rows } = await pool.query(
    `INSERT INTO medicos (id_usuario, id_especialidad, nombre, apellido_paterno, apellido_materno, cedula_profesional)
     VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [id_usuario, id_especialidad, nombre, apellido_paterno, apellido_materno, cedula_profesional]
  );
  res.status(201).json(mapMedico(rows[0]));
});

apiRouter.put('/medicos/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { nombre_completo, cedula_profesional, id_especialidad, id_usuario } = req.body;
  const { nombre, apellido_paterno, apellido_materno } = splitFullName(nombre_completo || '');
  await pool.query(
    `UPDATE medicos SET id_usuario = COALESCE($1,id_usuario), id_especialidad = COALESCE($2,id_especialidad),
     nombre = COALESCE($3,nombre), apellido_paterno = COALESCE($4,apellido_paterno),
     apellido_materno = COALESCE($5,apellido_materno), cedula_profesional = COALESCE($6,cedula_profesional)
     WHERE id_medico = $7`,
    [id_usuario, id_especialidad, nombre || null, apellido_paterno || null, apellido_materno || null, cedula_profesional, id]
  );
  const { rows } = await pool.query(`${MEDICO_SELECT} WHERE m.id_medico = $1`, [id]);
  res.json(mapMedico(rows[0]));
});

// ——— Consultas ———
const CONSULTA_SELECT = `
  SELECT c.*, ec.estado,
    p.nombre AS paciente_nombre, p.apellido_paterno AS paciente_ap, p.apellido_materno AS paciente_am,
    m.nombre AS medico_nombre, m.apellido_paterno AS medico_ap, m.apellido_materno AS medico_am
  FROM consultas c
  JOIN estados_consulta ec ON c.id_estado = ec.id_estado
  JOIN pacientes p ON c.id_paciente = p.id_paciente
  JOIN medicos m ON c.id_medico = m.id_medico`;

apiRouter.get('/consultas', async (_req, res) => {
  const { rows } = await pool.query(`${CONSULTA_SELECT} ORDER BY c.fecha_hora DESC`);
  res.json(rows.map((r) => mapConsulta({ ...r, fecha_hora: toIso(r.fecha_hora) })));
});

apiRouter.get('/consultas/:id', async (req, res) => {
  const { rows } = await pool.query(`${CONSULTA_SELECT} WHERE c.id_consulta = $1`, [req.params.id]);
  if (!rows[0]) return res.status(404).json({ message: 'No encontrada' });
  res.json(mapConsulta({ ...rows[0], fecha_hora: toIso(rows[0].fecha_hora) }));
});

apiRouter.get('/consultas/paciente/:pacienteId', async (req, res) => {
  const { rows } = await pool.query(
    `${CONSULTA_SELECT} WHERE c.id_paciente = $1 ORDER BY c.fecha_hora DESC`,
    [req.params.pacienteId]
  );
  res.json(rows.map((r) => mapConsulta({ ...r, fecha_hora: toIso(r.fecha_hora) })));
});

apiRouter.post('/consultas', async (req, res) => {
  const { id_paciente, id_medico, id_estado, fecha_hora, motivo, diagnostico } = req.body;
  const { rows } = await pool.query(
    `INSERT INTO consultas (id_paciente, id_medico, id_estado, fecha_hora, motivo, diagnostico)
     VALUES ($1,$2,$3,$4,$5,$6) RETURNING id_consulta`,
    [id_paciente, id_medico, id_estado, fecha_hora, motivo, diagnostico]
  );
  const detail = await pool.query(`${CONSULTA_SELECT} WHERE c.id_consulta = $1`, [rows[0].id_consulta]);
  res.status(201).json(mapConsulta({ ...detail.rows[0], fecha_hora: toIso(detail.rows[0].fecha_hora) }));
});

apiRouter.put('/consultas/:id', async (req, res) => {
  const { id_paciente, id_medico, id_estado, fecha_hora, motivo, diagnostico } = req.body;
  await pool.query(
    `UPDATE consultas SET id_paciente = COALESCE($1,id_paciente), id_medico = COALESCE($2,id_medico),
     id_estado = COALESCE($3,id_estado), fecha_hora = COALESCE($4,fecha_hora),
     motivo = COALESCE($5,motivo), diagnostico = COALESCE($6,diagnostico) WHERE id_consulta = $7`,
    [id_paciente, id_medico, id_estado, fecha_hora, motivo, diagnostico, req.params.id]
  );
  const { rows } = await pool.query(`${CONSULTA_SELECT} WHERE c.id_consulta = $1`, [req.params.id]);
  res.json(mapConsulta({ ...rows[0], fecha_hora: toIso(rows[0].fecha_hora) }));
});

apiRouter.get('/estados-consulta', async (_req, res) => {
  const { rows } = await pool.query('SELECT * FROM estados_consulta ORDER BY id_estado');
  res.json(rows);
});

// ——— Medicamentos ———
apiRouter.get('/medicamentos', async (_req, res) => {
  const { rows } = await pool.query('SELECT * FROM medicamentos ORDER BY id_medicamento');
  res.json(rows);
});

apiRouter.post('/medicamentos', async (req, res) => {
  const { rows } = await pool.query(
    'INSERT INTO medicamentos (nombre, sustancia_activa, stock) VALUES ($1,$2,$3) RETURNING *',
    [req.body.nombre, req.body.sustancia_activa, req.body.stock]
  );
  res.status(201).json(rows[0]);
});

apiRouter.put('/medicamentos/:id', async (req, res) => {
  const { rows } = await pool.query(
    'UPDATE medicamentos SET nombre=$1, sustancia_activa=$2, stock=$3 WHERE id_medicamento=$4 RETURNING *',
    [req.body.nombre, req.body.sustancia_activa, req.body.stock, req.params.id]
  );
  res.json(rows[0]);
});

// ——— Recetas ———
apiRouter.get('/recetas', async (_req, res) => {
  const { rows } = await pool.query(
    `SELECT r.*, m.nombre AS med_nombre, m.sustancia_activa, m.stock
     FROM recetas r JOIN medicamentos m ON r.id_medicamento = m.id_medicamento`
  );
  res.json(
    rows.map((r) => ({
      id_receta: r.id_receta,
      id_consulta: r.id_consulta,
      id_medicamento: r.id_medicamento,
      dosis: r.dosis,
      duracion: r.duracion,
      medicamento: { id_medicamento: r.id_medicamento, nombre: r.med_nombre, sustancia_activa: r.sustancia_activa, stock: r.stock },
    }))
  );
});

apiRouter.get('/recetas/paciente/:pacienteId', async (req, res) => {
  const { rows } = await pool.query(
    `SELECT r.*, m.nombre AS med_nombre, m.sustancia_activa, m.stock
     FROM recetas r
     JOIN medicamentos m ON r.id_medicamento = m.id_medicamento
     JOIN consultas c ON r.id_consulta = c.id_consulta
     WHERE c.id_paciente = $1`,
    [req.params.pacienteId]
  );
  res.json(
    rows.map((r) => ({
      id_receta: r.id_receta,
      id_consulta: r.id_consulta,
      id_medicamento: r.id_medicamento,
      dosis: r.dosis,
      duracion: r.duracion,
      medicamento: { id_medicamento: r.id_medicamento, nombre: r.med_nombre, sustancia_activa: r.sustancia_activa, stock: r.stock },
    }))
  );
});

apiRouter.post('/recetas', async (req, res) => {
  const { id_consulta, id_medicamento, dosis, duracion } = req.body;
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const { rows } = await client.query(
      'INSERT INTO recetas (id_consulta, id_medicamento, dosis, duracion) VALUES ($1,$2,$3,$4) RETURNING *',
      [id_consulta, id_medicamento, dosis, duracion]
    );
    await client.query(
      'UPDATE medicamentos SET stock = GREATEST(stock - 1, 0) WHERE id_medicamento = $1',
      [id_medicamento]
    );
    await client.query('COMMIT');
    res.status(201).json(rows[0]);
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
});

// ——— Laboratorios ———
apiRouter.get('/laboratorios', async (_req, res) => {
  const { rows } = await pool.query('SELECT * FROM laboratorios ORDER BY id_laboratorio');
  res.json(rows);
});

apiRouter.post('/laboratorios', async (req, res) => {
  const { rows } = await pool.query(
    'INSERT INTO laboratorios (nombre_estudio, descripcion) VALUES ($1,$2) RETURNING *',
    [req.body.nombre_estudio, req.body.descripcion]
  );
  res.status(201).json(rows[0]);
});

apiRouter.put('/laboratorios/:id', async (req, res) => {
  const { rows } = await pool.query(
    'UPDATE laboratorios SET nombre_estudio=$1, descripcion=$2 WHERE id_laboratorio=$3 RETURNING *',
    [req.body.nombre_estudio, req.body.descripcion, req.params.id]
  );
  res.json(rows[0]);
});

// ——— Estudios laboratorio ———
apiRouter.get('/estudios-laboratorio', async (_req, res) => {
  const { rows } = await pool.query(
    `SELECT el.*, l.nombre_estudio, l.descripcion,
      p.nombre AS pn, p.apellido_paterno AS pap, p.apellido_materno AS pam,
      m.nombre AS mn, m.apellido_paterno AS map, m.apellido_materno AS mam
     FROM estudios_laboratorio el
     JOIN laboratorios l ON el.id_laboratorio = l.id_laboratorio
     JOIN pacientes p ON el.id_paciente = p.id_paciente
     JOIN medicos m ON el.id_medico = m.id_medico
     ORDER BY el.fecha_solicitud DESC`
  );
  res.json(
    rows.map((r) => ({
      id_estudio: r.id_estudio,
      id_paciente: r.id_paciente,
      id_laboratorio: r.id_laboratorio,
      id_medico: r.id_medico,
      fecha_solicitud: toIso(r.fecha_solicitud),
      resultados: r.resultados,
      laboratorio: { id_laboratorio: r.id_laboratorio, nombre_estudio: r.nombre_estudio, descripcion: r.descripcion },
      paciente: { id_paciente: r.id_paciente, nombre_completo: [r.pn, r.pap, r.pam].filter(Boolean).join(' ') },
      medico: { id_medico: r.id_medico, nombre_completo: [r.mn, r.map, r.mam].filter(Boolean).join(' ') },
    }))
  );
});

apiRouter.get('/estudios-laboratorio/paciente/:pacienteId', async (req, res) => {
  const { rows } = await pool.query(
    `SELECT el.*, l.nombre_estudio, l.descripcion FROM estudios_laboratorio el
     JOIN laboratorios l ON el.id_laboratorio = l.id_laboratorio
     WHERE el.id_paciente = $1`,
    [req.params.pacienteId]
  );
  res.json(
    rows.map((r) => ({
      ...r,
      fecha_solicitud: toIso(r.fecha_solicitud),
      laboratorio: { id_laboratorio: r.id_laboratorio, nombre_estudio: r.nombre_estudio },
    }))
  );
});

apiRouter.post('/estudios-laboratorio', async (req, res) => {
  const { id_paciente, id_laboratorio, id_medico, fecha_solicitud, resultados } = req.body;
  const { rows } = await pool.query(
    `INSERT INTO estudios_laboratorio (id_paciente, id_laboratorio, id_medico, fecha_solicitud, resultados)
     VALUES ($1,$2,$3,COALESCE($4::timestamptz,NOW()),$5) RETURNING *`,
    [id_paciente, id_laboratorio, id_medico, fecha_solicitud, resultados]
  );
  res.status(201).json({ ...rows[0], fecha_solicitud: toIso(rows[0].fecha_solicitud) });
});

apiRouter.put('/estudios-laboratorio/:id', async (req, res) => {
  const { id_paciente, id_laboratorio, id_medico, fecha_solicitud, resultados } = req.body;
  const { rows } = await pool.query(
    `UPDATE estudios_laboratorio SET id_paciente=COALESCE($1,id_paciente), id_laboratorio=COALESCE($2,id_laboratorio),
     id_medico=COALESCE($3,id_medico), fecha_solicitud=COALESCE($4,fecha_solicitud), resultados=COALESCE($5,resultados)
     WHERE id_estudio=$6 RETURNING *`,
    [id_paciente, id_laboratorio, id_medico, fecha_solicitud, resultados, req.params.id]
  );
  res.json({ ...rows[0], fecha_solicitud: toIso(rows[0].fecha_solicitud) });
});

// ——— Hospitalizaciones ———
apiRouter.get('/hospitalizaciones', async (_req, res) => {
  const { rows } = await pool.query(
    `SELECT h.*, p.nombre, p.apellido_paterno, p.apellido_materno FROM hospitalizaciones h
     JOIN pacientes p ON h.id_paciente = p.id_paciente ORDER BY h.fecha_ingreso DESC`
  );
  res.json(
    rows.map((h) => ({
      id_hospitalizacion: h.id_hospitalizacion,
      id_paciente: h.id_paciente,
      fecha_ingreso: toIso(h.fecha_ingreso),
      fecha_egreso: h.fecha_egreso ? toIso(h.fecha_egreso) : undefined,
      habitacion: h.habitacion,
      motivo: h.motivo,
      paciente: { id_paciente: h.id_paciente, nombre_completo: [h.nombre, h.apellido_paterno, h.apellido_materno].filter(Boolean).join(' ') },
    }))
  );
});

apiRouter.get('/hospitalizaciones/paciente/:pacienteId', async (req, res) => {
  const { rows } = await pool.query(
    'SELECT * FROM hospitalizaciones WHERE id_paciente = $1 ORDER BY fecha_ingreso DESC',
    [req.params.pacienteId]
  );
  res.json(rows.map((h) => ({ ...h, fecha_ingreso: toIso(h.fecha_ingreso), fecha_egreso: h.fecha_egreso ? toIso(h.fecha_egreso) : undefined })));
});

apiRouter.post('/hospitalizaciones', async (req, res) => {
  const { id_paciente, fecha_ingreso, fecha_egreso, habitacion, motivo } = req.body;
  const { rows } = await pool.query(
    `INSERT INTO hospitalizaciones (id_paciente, fecha_ingreso, fecha_egreso, habitacion, motivo)
     VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    [id_paciente, fecha_ingreso, fecha_egreso || null, habitacion, motivo]
  );
  res.status(201).json({ ...rows[0], fecha_ingreso: toIso(rows[0].fecha_ingreso) });
});

// ——— Facturas ———
apiRouter.get('/facturas', async (_req, res) => {
  const { rows } = await pool.query(
    `SELECT f.*, p.nombre, p.apellido_paterno, p.apellido_materno FROM facturas f
     JOIN pacientes p ON f.id_paciente = p.id_paciente ORDER BY f.fecha_emision DESC`
  );
  res.json(
    rows.map((f) => ({
      id_factura: f.id_factura,
      id_paciente: f.id_paciente,
      fecha_emision: toIso(f.fecha_emision),
      monto_total: Number(f.monto_total),
      estado: f.estado,
      paciente: { id_paciente: f.id_paciente, nombre_completo: [f.nombre, f.apellido_paterno, f.apellido_materno].filter(Boolean).join(' ') },
    }))
  );
});

apiRouter.post('/facturas', async (req, res) => {
  const { id_paciente, monto_total, estado, fecha_emision } = req.body;
  const { rows } = await pool.query(
    `INSERT INTO facturas (id_paciente, fecha_emision, monto_total, estado)
     VALUES ($1, COALESCE($2::timestamptz, NOW()), $3, $4) RETURNING *`,
    [id_paciente, fecha_emision, monto_total, estado || 'pendiente']
  );
  res.status(201).json({ ...rows[0], monto_total: Number(rows[0].monto_total), fecha_emision: toIso(rows[0].fecha_emision) });
});

apiRouter.put('/facturas/:id', async (req, res) => {
  const { estado, monto_total } = req.body;
  const { rows } = await pool.query(
    'UPDATE facturas SET estado = COALESCE($1, estado), monto_total = COALESCE($2, monto_total) WHERE id_factura = $3 RETURNING *',
    [estado, monto_total, req.params.id]
  );
  res.json({ ...rows[0], monto_total: Number(rows[0].monto_total) });
});

// ——— Pagos ———
apiRouter.get('/pagos', async (_req, res) => {
  const { rows } = await pool.query('SELECT * FROM pagos ORDER BY fecha_pago DESC');
  res.json(rows.map((p) => ({ ...p, monto: Number(p.monto), fecha_pago: toIso(p.fecha_pago) })));
});

apiRouter.get('/pagos/paciente/:pacienteId', async (req, res) => {
  const { rows } = await pool.query(
    `SELECT pg.* FROM pagos pg
     JOIN facturas f ON pg.id_factura = f.id_factura
     WHERE f.id_paciente = $1`,
    [req.params.pacienteId]
  );
  res.json(rows.map((p) => ({ ...p, monto: Number(p.monto), fecha_pago: toIso(p.fecha_pago) })));
});

apiRouter.post('/pagos', async (req, res) => {
  const { id_factura, monto, metodo_pago, fecha_pago } = req.body;
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const { rows } = await client.query(
      `INSERT INTO pagos (id_factura, fecha_pago, monto, metodo_pago)
       VALUES ($1, COALESCE($2::timestamptz, NOW()), $3, $4) RETURNING *`,
      [id_factura, fecha_pago, monto, metodo_pago]
    );
    const sum = await client.query(
      'SELECT COALESCE(SUM(monto),0) AS total FROM pagos WHERE id_factura = $1',
      [id_factura]
    );
    const factura = await client.query('SELECT monto_total FROM facturas WHERE id_factura = $1', [id_factura]);
    if (Number(sum.rows[0].total) >= Number(factura.rows[0].monto_total)) {
      await client.query(`UPDATE facturas SET estado = 'pagada' WHERE id_factura = $1`, [id_factura]);
    }
    await client.query('COMMIT');
    res.status(201).json({ ...rows[0], monto: Number(rows[0].monto), fecha_pago: toIso(rows[0].fecha_pago) });
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
});

// ——— Auditoría ———
apiRouter.get('/auditoria/accesos', async (_req, res) => {
  const { rows } = await pool.query(
    `SELECT b.*, u.username FROM bitacora_accesos b
     LEFT JOIN usuarios u ON b.id_usuario = u.id_usuario ORDER BY b.fecha_hora DESC LIMIT 200`
  );
  res.json(rows.map((b) => ({ ...b, fecha_hora: toIso(b.fecha_hora), usuario: b.username ? { username: b.username } : undefined })));
});

apiRouter.get('/auditoria/cambios', async (_req, res) => {
  const { rows } = await pool.query('SELECT * FROM auditoria_cambios ORDER BY fecha_hora DESC LIMIT 200');
  res.json(rows.map((a) => ({ ...a, fecha_hora: toIso(a.fecha_hora) })));
});

apiRouter.get('/respaldos', async (_req, res) => {
  const { rows } = await pool.query(
    `SELECT id_respaldo, fecha_inicio, fecha_fin, tipo, ruta_archivo,
            "tamaño_mb" AS tamano_mb, estatus FROM respaldos_realizados ORDER BY fecha_inicio DESC`
  );
  res.json(
    rows.map((r) => ({
      ...r,
      tamano_mb: r.tamano_mb != null ? Number(r.tamano_mb) : undefined,
      fecha_inicio: toIso(r.fecha_inicio),
      fecha_fin: r.fecha_fin ? toIso(r.fecha_fin) : undefined,
    }))
  );
});

apiRouter.post('/respaldos', async (req, res) => {
  const { tipo, ruta_archivo, estatus, fecha_inicio, fecha_fin, tamano_mb } = req.body;
  const { rows } = await pool.query(
    `INSERT INTO respaldos_realizados (fecha_inicio, fecha_fin, tipo, ruta_archivo, "tamaño_mb", estatus)
     VALUES (COALESCE($1::timestamptz,NOW()), $2, $3, $4, $5, $6) RETURNING id_respaldo, fecha_inicio, fecha_fin, tipo, ruta_archivo, "tamaño_mb" AS tamano_mb, estatus`,
    [fecha_inicio, fecha_fin, tipo, ruta_archivo, tamano_mb, estatus]
  );
  res.status(201).json(rows[0]);
});
