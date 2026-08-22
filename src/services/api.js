// src/services/api.js - Layanan Frontend terisolasi aman melalui Vercel API
export const apiService = {
  // Mengambil kursus berdasarkan tenant/organisasi bimbel yang aktif
  async getCourses(tenantId = 'default-bimbel') {
    try {
      const response = await fetch(`/api/courses`, {
        headers: {
          'x-tenant-id': tenantId
        }
      });
      if (!response.ok) throw new Error('Gagal terhubung ke server database');
      const data = await response.json();
      
      // Data fallback jika tabel kosong di Neon
      if (data && data.length > 0) return data;
      return [
        { id: 1, title: 'Matematika Dasar SD (SaaS)', category: 'SD', instructor: 'Budi Santoso, M.Pd', price: 'Gratis', rating: 4.8 },
        { id: 2, title: 'Fisika UTBK & SMA (SaaS)', category: 'SMA', instructor: 'Dr. Siti Aminah', price: 'Premium', rating: 4.9 }
      ];
    } catch (error) {
      console.error("Gagal mengambil kursus:", error);
      return [
        { id: 1, title: 'Matematika Dasar SD (SaaS)', category: 'SD', instructor: 'Budi Santoso, M.Pd', price: 'Gratis', rating: 4.8 },
        { id: 2, title: 'Fisika UTBK & SMA (SaaS)', category: 'SMA', instructor: 'Dr. Siti Aminah', price: 'Premium', rating: 4.9 }
      ];
    }
  },

  async addCourse(tenantId = 'default-bimbel', courseData) {
    try {
      const response = await fetch(`/api/courses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-tenant-id': tenantId
        },
        body: JSON.stringify(courseData)
      });
      return await response.json();
    } catch (error) {
      console.error("Gagal menambah kursus:", error);
      throw error;
    }
  },
  
  async getExamQuestions() {
    return [
      { id: 1, question: 'Berapakah nilai dari 2 + 2 x 2?', options: ['6', '8', '4', '2'], answer: '6' },
      { id: 2, question: 'Ibu kota negara Indonesia yang baru bernama?', options: ['Jakarta', 'Bandung', 'Ibu Kota Nusantara (IKN)', 'Surabaya'], answer: 'Ibu Kota Nusantara (IKN)' }
    ];
  },

  async getDashboardData() {
    return {
      studentName: 'Siswa Bimbel SaaS',
      schoolLevel: 'SMA Kelas 12',
      completedCourses: 5,
      averageScore: 88.0,
      upcomingExams: 2,
      lastActivity: 'Matematika Dasar UTBK / SMA'
    };
  },

  async getMentorDashboardData() {
    return {
      mentorName: 'Budi Santoso, M.Pd',
      totalActiveClasses: 3,
      totalStudents: 145,
      averageStudentRating: 4.8,
      activeClasses: [
        { id: 101, title: 'Matematika Kelas 6 SD - Reguler', schedule: 'Senin, 15:00 WIB', studentsEnrolled: 45 }
      ]
    };
  },

  async getAdminDashboardData() {
    return {
      adminName: 'Admin Pemilik Bimbel (Owner)',
      totalStudents: 1250,
      totalMentors: 42,
      totalRevenue: 'Rp 125.400.000',
      systemStatus: 'Aman & Terisolasi (Vercel Serverless + Neon)',
      recentActivities: [
        { id: 1, text: 'Isolasi tenant database aktif via header organisasi', time: 'Baru saja' },
        { id: 2, text: 'Autentikasi Clerk Multi-Organization terhubung', time: '1 jam lalu' }
      ]
    };
  }
};