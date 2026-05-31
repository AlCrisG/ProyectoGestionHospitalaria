import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

pool.connect()
    .then(() => console.log('✅ Conexión exitosa a SIGEH DB en la nube'))
    .catch((err) => console.error('❌ Error conectando a la base de datos:', err.stack));