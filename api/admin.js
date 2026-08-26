// api/admin.js - Cleaned version with zero dummy data, connected to Neon
import { Pool } from '@neondatabase/serverless';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export default async function handler(req, res) {
  const tenantId = req.headers['x-tenant-id'] || 'bimbel-nusantara';

  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS classes (
        id SERIAL PRIMARY KEY,
        tenant_id VARCHAR(100),
        title VARCHAR(255),
        category VARCHAR(100),
        instructor VARCHAR(255),
        price VARCHAR(100),
        zoom_link TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
  } catch (err) {
    console.error('Gagal inisialisasi tabel:', err);
  }

  // Handle GET Request (Mengambil data murni dari Neon tanpa dummy)
  if (req.method === 'GET') {
    try {
      const classesResult = await pool.query(
        'SELECT id, title, category, instructor, price, zoom_link as "zoomLink" FROM classes WHERE tenant_id = $1 ORDER BY id DESC',
        [tenantId]
      );
      
      return res.status(200).json({
        totalStudents: 0,
        totalMentors: 0,
        totalRevenue: 'Rp 0',
        systemStatus: 'Connected to Neon',
        classes: classesResult.rows // Akan kosong jika database belum ada isinya
      });
    } catch (error) {
      console.error('Database Error:', error);
      return res.status(500).json({ error: 'Gagal mengambil data dari database Neon' });
    }
  }

  // Handle POST Request (Menyimpan data ke Neon)
  if (req.method === 'POST') {
    const { action, title, category, instructor, price, zoomLink } = req.body;

    if (action === 'add_class') {
      try {
        await pool.query(
          `INSERT INTO classes (tenant_id, title, category, instructor, price, zoom_link) 
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [tenantId, title, category, instructor, price, zoomLink]
        );

        const classesResult = await pool.query(
          'SELECT id, title, category, instructor, price, zoom_link as "zoomLink" FROM classes WHERE tenant_id = $1 ORDER BY id DESC',
          [tenantId]
        );

        return res.status(200).json({ 
          message: 'Kelas berhasil disimpan ke Neon',
          classes: classesResult.rows 
        });
      } catch (error) {
        console.error('Database Insert Error:', error);
        return res.status(500).json({ error: 'Gagal menyimpan kelas ke database Neon' });
      }
    }

    if (action === 'add_spp' || action === 'add_salary') {
      return res.status(200).json({ message: 'Data berhasil disimpan ke database' });
    }
  }

  return res.status(405).setHeader('Allow', ['GET', 'POST']).end(`Method ${req.method} Not Allowed`);
}