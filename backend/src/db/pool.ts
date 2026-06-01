import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool(
    process.env.DATABASE_URL
        ? { connectionString: process.env.DATABASE_URL }
        : {
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
        }
);

pool.connect()
    .then(() => console.log('✅ Conexión exitosa a SIGEH DB en la nube'))
    .catch((err) => console.error('❌ Error conectando a la base de datos:', err.stack));