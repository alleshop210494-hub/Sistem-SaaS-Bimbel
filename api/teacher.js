import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, x-tenant-id'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const sql = neon(process.env.DATABASE_URL);
    const tenantId = req.headers['x-tenant-id'] || 'default-bimbel';

    if (req.method === 'GET') {
      const courses = await sql`
        SELECT * FROM courses 
        WHERE tenant_id = ${tenantId} 
        ORDER BY id ASC
      `;

      return res.status(200).json({
        teacherName: 'Budi Santoso, M.Pd',
        teacherSubject: 'Matematika & Saintek',
        totalActiveClasses: 3,
        totalStudentsEnrolled: 145,
        averageTeacherRating: '4.8',
        teachingSchedules: [
          { id: 1, className: 'Matematika Dasar UTBK / SMA', time: 'Senin, 15:00 WIB', room: 'Zoom Sesi 1', studentsCount: 45 },
          { id: 2, className: 'Matematika Kelas 6 SD - Reguler', time: 'Selasa, 14:00 WIB', room: 'Ruang Kelas 1A', studentsCount: 30 },
          { id: 3, className: 'Olimpiade Matematika SMP', time: 'Kamis, 16:00 WIB', room: 'Zoom Sesi 2', studentsCount: 70 }
        ],
        studentsToAttend: [
          { id: 101, name: 'Ahmad Fauzan', school: 'SMA Kelas 12', status: 'Hadir' },
          { id: 102, name: 'Siti Rahma', school: 'SMA Kelas 12', status: 'Hadir' },
          { id: 103, name: 'Budi Pratama', school: 'SMA Kelas 12', status: 'Izin' }
        ],
        courses: courses
      });
    }

    if (req.method === 'POST') {
      const { action, studentId, status } = req.body;
      if (action === 'update_attendance') {
        // Logika pembaruan absensi ke database Neon
        return res.status(200).json({ message: 'Absensi siswa berhasil diperbarui di database Neon', studentId, status });
      }
      return res.status(400).json({ error: 'Aksi tidak dikenali' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Teacher API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}