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
      const classes = await sql`
        SELECT * FROM courses 
        WHERE tenant_id = ${tenantId} 
        ORDER BY id DESC
      `;

      return res.status(200).json({
        adminName: 'Admin Pemilik Bimbel',
        totalStudents: 1250,
        totalMentors: 42,
        totalRevenue: 'Rp 125.400.000',
        systemStatus: 'Optimal & Terisolasi (Neon + Vercel)',
        classes: classes,
        recentActivities: [
          { id: 1, text: 'Input kelas baru berhasil disinkronisasi ke database', time: 'Baru saja' },
          { id: 2, text: 'Verifikasi pembayaran SPP murid gelombang 1 selesai', time: '2 jam lalu' },
          { id: 3, text: 'Rekapitulasi absensi mingguan guru diperbarui', time: '5 jam lalu' }
        ]
      });
    }

    if (req.method === 'POST') {
      const { action, title, category, instructor, price } = req.body;
      
      if (action === 'add_class') {
        const newClass = await sql`
          INSERT INTO courses (tenant_id, title, category, instructor, price)
          VALUES (${tenantId}, ${title}, ${category}, ${instructor}, ${price})
          RETURNING *
        `;
        return res.status(201).json({ message: 'Kelas berhasil ditambahkan', data: newClass[0] });
      }

      return res.status(400).json({ error: 'Aksi tidak dikenali' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Admin API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}