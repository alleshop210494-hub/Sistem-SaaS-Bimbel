import { Pool } from '@neondatabase/serverless';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export default async function handler(req, res) {
  const tenantId = req.headers['x-tenant-id'] || 'bimbel-nusantara';

  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS parents (
        id SERIAL PRIMARY KEY,
        tenant_id VARCHAR(100),
        parent_name VARCHAR(255),
        student_name VARCHAR(255),
        phone VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
  } catch (err) {
    console.error('Gagal inisialisasi tabel parents:', err);
  }

  if (req.method === 'GET') {
    try {
      const result = await pool.query(
        'SELECT id, parent_name as "parentName", student_name as "studentName", phone FROM parents WHERE tenant_id = $1 ORDER BY id DESC',
        [tenantId]
      );
      return res.status(200).json({
        parents: result.rows
      });
    } catch (error) {
      return res.status(500).json({ error: 'Gagal mengambil data orang tua dari Neon' });
    }
  }

  if (req.method === 'POST') {
    const { parentName, studentName, phone } = req.body;
    try {
      await pool.query(
        'INSERT INTO parents (tenant_id, parent_name, student_name, phone) VALUES ($1, $2, $3, $4)',
        [tenantId, parentName, studentName, phone]
      );
      const result = await pool.query(
        'SELECT id, parent_name as "parentName", student_name as "studentName", phone FROM parents WHERE tenant_id = $1 ORDER BY id DESC',
        [tenantId]
      );
      return res.status(200).json({ message: 'Data orang tua berhasil ditambahkan', parents: result.rows });
    } catch (error) {
      return res.status(500).json({ error: 'Gagal menyimpan data orang tua' });
    }
  }

  return res.status(405).end();
}