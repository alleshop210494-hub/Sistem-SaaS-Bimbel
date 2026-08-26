import { Pool } from '@neondatabase/serverless';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export default async function handler(req, res) {
  const tenantId = req.headers['x-tenant-id'] || 'bimbel-nusantara';

  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS courses (
        id SERIAL PRIMARY KEY,
        tenant_id VARCHAR(100),
        title VARCHAR(255),
        description TEXT,
        instructor VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
  } catch (err) {
    console.error('Gagal inisialisasi tabel courses:', err);
  }

  if (req.method === 'GET') {
    try {
      const result = await pool.query(
        'SELECT id, title, description, instructor FROM courses WHERE tenant_id = $1 ORDER BY id DESC',
        [tenantId]
      );
      return res.status(200).json({
        courses: result.rows
      });
    } catch (error) {
      return res.status(500).json({ error: 'Gagal mengambil data kursus dari Neon' });
    }
  }

  if (req.method === 'POST') {
    const { title, description, instructor } = req.body;
    try {
      await pool.query(
        'INSERT INTO courses (tenant_id, title, description, instructor) VALUES ($1, $2, $3, $4)',
        [tenantId, title, description, instructor]
      );
      const result = await pool.query(
        'SELECT id, title, description, instructor FROM courses WHERE tenant_id = $1 ORDER BY id DESC',
        [tenantId]
      );
      return res.status(200).json({ message: 'Kursus berhasil ditambahkan', courses: result.rows });
    } catch (error) {
      return res.status(500).json({ error: 'Gagal menyimpan data kursus' });
    }
  }

  return res.status(405).end();
}