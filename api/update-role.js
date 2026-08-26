// api/update-role.js - Full Code Connected to Neon
import { Pool } from '@neondatabase/serverless';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export default async function handler(req, res) {
  const tenantId = req.headers['x-tenant-id'] || 'bimbel-nusantara';

  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_roles (
        id SERIAL PRIMARY KEY,
        tenant_id VARCHAR(100),
        user_email VARCHAR(255),
        role VARCHAR(50),
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(tenant_id, user_email)
      );
    `);
  } catch (err) {
    console.error('Gagal inisialisasi tabel user_roles:', err);
  }

  if (req.method === 'POST') {
    const { email, role } = req.body;
    try {
      await pool.query(
        `INSERT INTO user_roles (tenant_id, user_email, role) 
         VALUES ($1, $2, $3)
         ON CONFLICT (tenant_id, user_email) DO UPDATE SET role = EXCLUDED.role`,
        [tenantId, email, role]
      );
      return res.status(200).json({ message: 'Role berhasil diperbarui di Neon' });
    } catch (error) {
      console.error('Error updating role:', error);
      return res.status(500).json({ error: 'Gagal memperbarui role di database Neon' });
    }
  }

  if (req.method === 'GET') {
    const { email } = req.query;
    try {
      const result = await pool.query(
        'SELECT role FROM user_roles WHERE tenant_id = $1 AND user_email = $2',
        [tenantId, email]
      );
      return res.status(200).json({ role: result.rows[0]?.role || 'student' });
    } catch (error) {
      return res.status(500).json({ error: 'Gagal mengambil data role dari Neon' });
    }
  }

  return res.status(405).setHeader('Allow', ['GET', 'POST']).end(`Method ${req.method} Not Allowed`);
}