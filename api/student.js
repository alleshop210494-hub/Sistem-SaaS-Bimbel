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
      // Mengambil data kursus / kelas aktif dari database Neon untuk tenant ini
      const courses = await sql`
        SELECT * FROM courses 
        WHERE tenant_id = ${tenantId} 
        ORDER BY id ASC
      `;

      return res.status(200).json({
        studentName: 'Siswa Bimbel SaaS',
        schoolLevel: 'SMA Kelas 12',
        completedCourses: 5,
        averageScore: '88.5',
        upcomingExams: 2,
        lastActivity: 'Matematika Dasar UTBK / SMA',
        classes: courses,
        schedules: [
          { id: 1, className: 'Matematika Dasar UTBK / SMA', teacher: 'Prof. Bambang Irawan', time: 'Senin, 15:00 WIB', room: 'Zoom Meeting Sesi 1' },
          { id: 2, className: 'Fisika Kuantum & Mekanika SMA', teacher: 'Rina Marlina, S.E.', time: 'Rabu, 16:30 WIB', room: 'Zoom Meeting Sesi 2' },
          { id: 3, className: 'Kimia Organik Lanjutan', teacher: 'Dr. Siti Aminah', time: 'Jumat, 14:00 WIB', room: 'Ruang Kelas 3B' }
        ],
        teachers: [
          { id: 1, name: 'Prof. Bambang Irawan', subject: 'Matematika Saintek', rating: '5.0', contact: 'bambang@bimbel.com' },
          { id: 2, name: 'Rina Marlina, S.E.', subject: 'Fisika & Saintek', rating: '4.6', contact: 'rina@bimbel.com' },
          { id: 3, name: 'Dr. Siti Aminah', subject: 'Kimia Komprehensif', rating: '4.9', contact: 'aminah@bimbel.com' }
        ],
        attendanceHistory: [
          { id: 1, date: '2026-06-01', className: 'Matematika Dasar', status: 'Hadir' },
          { id: 2, date: '2026-06-03', className: 'Fisika Kuantum', status: 'Hadir' },
          { id: 3, date: '2026-06-05', className: 'Kimia Organik', status: 'Izin' },
          { id: 4, date: '2026-06-08', className: 'Matematika Dasar', status: 'Hadir' }
        ]
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Student API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}