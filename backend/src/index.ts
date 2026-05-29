import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { pool } from './db/pool';
import { authRouter } from './routes/auth';
import { apiRouter } from './routes/api';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());

app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', database: 'connected' });
  } catch {
    res.status(503).json({ status: 'error', database: 'disconnected' });
  }
});

app.use('/api/auth', authRouter);
app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`SIGEH API escuchando en http://localhost:${PORT}/api`);
  console.log(`Health: http://localhost:${PORT}/api/health`);
});
