import 'dotenv/config';
import pg from 'pg';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

async function main() {
  const tables = await pool.query(`
    SELECT table_name FROM information_schema.tables
    WHERE table_schema = 'public' ORDER BY table_name
  `);
  console.log('Tables:', tables.rows.map((r) => r.table_name));
  for (const { table_name } of tables.rows) {
    const cols = await pool.query(
      `SELECT column_name, data_type FROM information_schema.columns WHERE table_name = $1 ORDER BY ordinal_position`,
      [table_name]
    );
    console.log(`\n${table_name}:`, cols.rows);
  }
  await pool.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
