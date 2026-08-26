// api/admin.js - Full Complete Code for All Admin Tables Connected to Neon
import { Pool } from '@neondatabase/serverless';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export default async function handler(req, res) {
  const tenantId = req.headers['x-tenant-id'] || 'bimbel-nusantara';

  try {
    // Inisialisasi semua tabel yang dibutuhkan oleh admin secara otomatis
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

      CREATE TABLE IF NOT EXISTS spp_payments (
        id SERIAL PRIMARY KEY,
        tenant_id VARCHAR(100),
        student_name VARCHAR(255),
        month VARCHAR(100),
        amount VARCHAR(100),
        status VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS teacher_salaries (
        id SERIAL PRIMARY KEY,
        tenant_id VARCHAR(100),
        teacher_name VARCHAR(255),
        month VARCHAR(100),
        amount VARCHAR(100),
        status VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS attendances (
        id SERIAL PRIMARY KEY,
        tenant_id VARCHAR(100),
        person_name VARCHAR(255),
        role VARCHAR(50),
        status VARCHAR(50),
        date VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
  } catch (err) {
    console.error('Gagal inisialisasi tabel admin:', err);
  }

  // Handle GET Request (Mengambil data murni dari Neon tanpa dummy)
  if (req.method === 'GET') {
    try {
      const studentsRes = await pool.query('SELECT COUNT(*) FROM students WHERE tenant_id = $1', [tenantId]);
      const teachersRes = await pool.query('SELECT COUNT(*) FROM teachers WHERE tenant_id = $1', [tenantId]);
      
      const classesResult = await pool.query(
        'SELECT id, title, category, instructor, price, zoom_link as "zoomLink" FROM classes WHERE tenant_id = $1 ORDER BY id DESC',
        [tenantId]
      );

      const sppResult = await pool.query(
        'SELECT id, student_name as "studentName", month, amount, status FROM spp_payments WHERE tenant_id = $1 ORDER BY id DESC',
        [tenantId]
      );

      const salaryResult = await pool.query(
        'SELECT id, teacher_name as "teacherName", month, amount, status FROM teacher_salaries WHERE tenant_id = $1 ORDER BY id DESC',
        [tenantId]
      );

      const attendanceResult = await pool.query(
        'SELECT id, person_name as "personName", role, status, date FROM attendances WHERE tenant_id = $1 ORDER BY id DESC',
        [tenantId]
      );
      
      return res.status(200).json({
        totalStudents: parseInt(studentsRes.rows[0].count) || 0,
        totalMentors: parseInt(teachersRes.rows[0].count) || 0,
        totalRevenue: 'Rp 0',
        systemStatus: 'Connected to Neon',
        classes: classesResult.rows,
        spp: sppResult.rows,
        salaries: salaryResult.rows,
        attendances: attendanceResult.rows
      });
    } catch (error) {
      console.error('Database Error:', error);
      return res.status(500).json({ error: 'Gagal mengambil data dari database Neon' });
    }
  }

  // Handle POST Request (Menyimpan data ke tabel-tabel Neon sesuai aksi)
  if (req.method === 'POST') {
    const { action, title, category, instructor, price, zoomLink, studentName, month, amount, status, teacherName, personName, role, date } = req.body;

    try {
      if (action === 'add_class') {
        await pool.query(
          `INSERT INTO classes (tenant_id, title, category, instructor, price, zoom_link) VALUES ($1, $2, $3, $4, $5, $6)`,
          [tenantId, title, category, instructor, price, zoomLink]
        );
      } else if (action === 'add_spp') {
        await pool.query(
          `INSERT INTO spp_payments (tenant_id, student_name, month, amount, status) VALUES ($1, $2, $3, $4, $5)`,
          [tenantId, studentName, month, amount, status]
        );
      } else if (action === 'add_salary') {
        await pool.query(
          `INSERT INTO teacher_salaries (tenant_id, teacher_name, month, amount, status) VALUES ($1, $2, $3, $4, $5)`,
          [tenantId, teacherName, month, amount, status]
        );
      } else if (action === 'add_attendance') {
        await pool.query(
          `INSERT INTO attendances (tenant_id, person_name, role, status, date) VALUES ($1, $2, $3, $4, $5)`,
          [tenantId, personName, role, status, date]
        );
      }

      // Ambil kembali data kelas terbaru setelah insert
      const classesResult = await pool.query(
        'SELECT id, title, category, instructor, price, zoom_link as "zoomLink" FROM classes WHERE tenant_id = $1 ORDER BY id DESC',
        [tenantId]
      );

      return res.status(200).json({ 
        message: 'Data berhasil disimpan ke Neon',
        classes: classesResult.rows 
      });
    } catch (error) {
      console.error('Database Insert Error:', error);
      return res.status(500).json({ error: 'Gagal menyimpan data ke database Neon' });
    }
  }

  return res.status(405).setHeader('Allow', ['GET', 'POST']).end(`Method ${req.method} Not Allowed`);
}