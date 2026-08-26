import { Pool } from '@neondatabase/serverless';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export default async function handler(req, res) {
  const tenantId = req.headers['x-tenant-id'] || 'bimbel-nusantara';

  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS teachers (
        id SERIAL PRIMARY KEY,
        tenant_id VARCHAR(100),
        name VARCHAR(255),
        subject VARCHAR(100),
        status VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
  } catch (err) {
    console.error('Gagal inisialisasi tabel teachers:', err);
  }

  if (req.method === 'GET') {
    try {
      const result = await pool.query(
        'SELECT id, name, subject, status FROM teachers WHERE tenant_id = $1 ORDER BY id DESC',
        [tenantId]
      );
      return res.status(200).json({
        totalTeachers: result.rows.length,
        teachers: result.rows
      });
    } catch (error) {
      return res.status(500).json({ error: 'Gagal mengambil data guru dari Neon' });
    }
  }

  if (req.method === 'POST') {
    const { name, subject, status } = req.body;
    try {
      await pool.query(
        'INSERT INTO teachers (tenant_id, name, subject, status) VALUES ($1, $2, $3, $4)',
        [tenantId, name, subject, status || 'Aktif']
      );
      const result = await pool.query(
        'SELECT id, name, subject, status FROM teachers WHERE tenant_id = $1 ORDER BY id DESC',
        [tenantId]
      );
      return res.status(200).json({ message: 'Guru berhasil ditambahkan', teachers: result.rows });
    } catch (error) {
      return res.status(500).json({ error: 'Gagal menyimpan data guru' });
    }
  }

  return res.status(405).end();
}