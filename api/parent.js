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
        parentName: 'Bapak / Ibu Wali Murid',
        childName: 'Ahmad Fauzan',
        childSchoolLevel: 'SMA Kelas 12 (Saintek)',
        overallGradeAverage: '89.2',
        tuitionStatus: 'Lunas (Periode Juni 2026)',
        childSchedules: [
          { id: 1, className: 'Matematika Dasar UTBK / SMA', teacher: 'Prof. Bambang Irawan', time: 'Senin, 15:00 WIB', room: 'Zoom Online' },
          { id: 2, className: 'Fisika Kuantum & Mekanika SMA', teacher: 'Rina Marlina, S.E.', time: 'Rabu, 16:30 WIB', room: 'Ruang Kelas 2A' }
        ],
        childMentors: [
          { id: 1, name: 'Prof. Bambang Irawan', subject: 'Matematika Saintek', rating: '5.0', phone: '081234567890' },
          { id: 2, name: 'Rina Marlina, S.E.', subject: 'Fisika', rating: '4.6', phone: '081987654321' }
        ],
        childAttendance: [
          { id: 1, date: '2026-06-01', className: 'Matematika Dasar', status: 'Hadir' },
          { id: 2, date: '2026-06-03', className: 'Fisika Kuantum', status: 'Hadir' },
          { id: 3, date: '2026-06-05', className: 'Kimia Organik', status: 'Hadir' }
        ],
        childGrades: [
          { id: 1, subject: 'Matematika UTBK', score: 92, predicate: 'Sangat Baik', notes: 'Paham konsep turunan dan integral dengan sangat baik.' },
          { id: 2, subject: 'Fisika Mekanika', score: 88, predicate: 'Baik', notes: 'Tingkatkan ketelitian dalam perhitungan rumus gaya.' },
          { id: 3, subject: 'Kimia Organik', score: 87, predicate: 'Baik', notes: 'Kehadiran dan keaktifan sangat memuaskan.' }
        ],
        courses: courses
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Parent API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}