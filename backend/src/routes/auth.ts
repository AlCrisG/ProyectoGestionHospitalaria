import { Router, Request } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../db/pool';
import { mapRolNombre } from '../utils/mappers';

export const authRouter = Router();

async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  if (hash.startsWith('$2a$') || hash.startsWith('$2b$')) {
    return bcrypt.compare(plain, hash);
  }
  return plain === hash;
}

authRouter.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Usuario y contraseña requeridos' });
  }

  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0] || req.socket.remoteAddress || '';

  try {
    const result = await pool.query(
      `SELECT u.id_usuario, u.username, u.password_hash, u.activo, r.nombre AS rol_nombre
       FROM usuarios u
       JOIN roles r ON u.id_rol = r.id_rol
       WHERE u.username = $1`,
      [username]
    );

    const user = result.rows[0];
    let exitoso = false;

    if (user && user.activo && (await verifyPassword(password, user.password_hash))) {
      exitoso = true;
      const rol = mapRolNombre(user.rol_nombre);
      const secret = process.env.JWT_SECRET || 'sigeh-secret';
      const token = jwt.sign(
        { id_usuario: user.id_usuario, username: user.username, rol },
        secret,
        { expiresIn: '8h' }
      );

      await pool.query(
        `INSERT INTO bitacora_accesos (id_usuario, fecha_hora, ip_origen, exitoso)
         VALUES ($1, NOW(), $2, $3)`,
        [user.id_usuario, ip, true]
      );

      return res.json({
        id_usuario: user.id_usuario,
        username: user.username,
        rol,
        token,
      });
    }

    if (user?.id_usuario) {
      await pool.query(
        `INSERT INTO bitacora_accesos (id_usuario, fecha_hora, ip_origen, exitoso)
         VALUES ($1, NOW(), $2, false)`,
        [user.id_usuario, ip]
      );
    }

    return res.status(401).json({ message: 'Credenciales inválidas' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error al iniciar sesión' });
  }
});
