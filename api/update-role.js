// api/update-role.js
import { createClerkClient } from '@clerk/backend';

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
    const { userId, role } = req.body;

    if (!userId || !role) {
      return res.status(400).json({ error: 'User ID dan role wajib diisi' });
    }

    // Inisialisasi Clerk Backend Client menggunakan Secret Key dari environment (.env)
    const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

    // Perbarui publicMetadata pengguna secara aman di sisi server
    await clerk.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: role,
      },
    });

    return res.status(200).json({ message: 'Role berhasil diperbarui di server' });
  } catch (error) {
    console.error('Update Role API Error:', error);
    return res.status(500).json({ error: 'Gagal memperbarui role di server' });
  }
}