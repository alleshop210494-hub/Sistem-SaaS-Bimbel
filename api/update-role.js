// api/update-role.js
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
  
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    try {
      let body = req.body;
      if (typeof body === 'string') {
        try {
          body = JSON.parse(body);
        } catch (e) {
          body = {};
        }
      }
  
      const userId = body?.userId;
      const role = body?.role;
  
      if (!userId || !role) {
        return res.status(400).json({ error: 'User ID dan role wajib diisi' });
      }
  
      const secretKey = process.env.CLERK_SECRET_KEY;
      if (!secretKey) {
        console.error('CLERK_SECRET_KEY tidak ditemukan di environment Vercel.');
        return res.status(500).json({ error: 'Konfigurasi server error: CLERK_SECRET_KEY kosong' });
      }
  
      // Menggunakan endpoint khusus /metadata sesuai spesifikasi terbaru Clerk API
      const clerkResponse = await fetch(`https://api.clerk.com/v1/users/${userId}/metadata`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${secretKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          public_metadata: {
            role: role,
          },
        }),
      });
  
      const clerkData = await clerkResponse.json();
  
      if (!clerkResponse.ok) {
        console.error('Clerk API Error Response:', clerkData);
        return res.status(clerkResponse.status).json({ 
          error: 'Gagal memperbarui role di Clerk', 
          details: clerkData 
        });
      }
  
      return res.status(200).json({ message: 'Role berhasil diperbarui di server', data: clerkData });
    } catch (error) {
      console.error('Update Role API Catch Error:', error);
      return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
  }