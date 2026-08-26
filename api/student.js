import { Pool } from '@neondatabase/serverless';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export default async function handler(req, res) {
  const tenantId = req.headers['x-tenant-id'] || 'bimbel-nusantara';

  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS students (
        id SERIAL PRIMARY KEY,
        tenant_id VARCHAR(100),
        name VARCHAR(255),
        grade VARCHAR(50),
        parent_name VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
  } catch (err) {
    console.error('Gagal inisialisasi tabel students:', err);
  }

  if (req.method === 'GET') {
    try {
      const result = await pool.query(
        'SELECT id, name, grade, parent_name as "parentName" FROM students WHERE tenant_id = $1 ORDER BY id DESC',
        [tenantId]
      );
      return res.status(200).json({
        totalStudents: result.rows.length,
        students: result.rows
      });
    } catch (error) {
      return res.status(500).json({ error: 'Gagal mengambil data murid dari Neon' });
    }
  }

  if (req.method === 'POST') {
    const { name, grade, parentName } = req.body;
    try {
      await pool.query(
        'INSERT INTO students (tenant_id, name, grade, parent_name) VALUES ($1, $2, $3, $4)',
        [tenantId, name, grade, parentName]
      );
      const result = await pool.query(
        'SELECT id, name, grade, parent_name as "parentName" FROM students WHERE tenant_id = $1 ORDER BY id DESC',
        [tenantId]
      );
      return res.status(200).json({ message: 'Murid berhasil ditambahkan', students: result.rows });
    } catch (error) {
      return res.status(500).json({ error: 'Gagal menyimpan data murid' });
    }
  }

  return res.status(405).end();
}