import 'dotenv/config';
import pg from 'pg';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

async function main() {
  const users = await pool.query('SELECT u.id_usuario, u.username, u.activo, r.nombre as rol FROM usuarios u JOIN roles r ON u.id_rol = r.id_rol LIMIT 10');
  console.log('usuarios:', users.rows);
  const pac = await pool.query('SELECT * FROM pacientes LIMIT 2');
  console.log('pacientes sample:', pac.rows);
  await pool.end();
}

main().catch(console.error);
