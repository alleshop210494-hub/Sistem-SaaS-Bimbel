import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  // Set header CORS untuk keamanan akses API
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
    
    // Isolasi tenant berdasarkan header yang dikirim frontend (berasal dari Clerk Organization ID)
    const tenantId = req.headers['x-tenant-id'] || 'default-bimbel';

    if (req.method === 'GET') {
      const courses = await sql`
        SELECT * FROM courses 
        WHERE tenant_id = ${tenantId} 
        ORDER BY id ASC
      `;
      return res.status(200).json(courses);
    }

    if (req.method === 'POST') {
      const { title, category, instructor, price } = req.body;
      const newCourse = await sql`
        INSERT INTO courses (tenant_id, title, category, instructor, price)
        VALUES (${tenantId}, ${title}, ${category}, ${instructor}, ${price})
        RETURNING *
      `;
      return res.status(201).json(newCourse[0]);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Serverless Database Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}