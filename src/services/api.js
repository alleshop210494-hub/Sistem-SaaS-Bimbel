// src/services/api.js

export const apiService = {
  async getCourses() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, title: 'Matematika Kelas 6 SD', category: 'SD', instructor: 'Budi Santoso, M.Pd', price: 'Gratis', rating: 4.8 },
          { id: 2, title: 'IPA Terpadu Kelas 9 SMP', category: 'SMP', instructor: 'Dr. Siti Aminah', price: 'Gratis', rating: 4.9 },
          { id: 3, title: 'Matematika Dasar UTBK / SMA', category: 'SMA', instructor: 'John Doe, B.A.', price: 'Premium', rating: 4.7 },
          { id: 4, title: 'Fisika Kuantum & Mekanika SMA', category: 'SMA', instructor: 'Rina Marlina, S.E.', price: 'Premium', rating: 4.6 }
        ]);
      }, 400);
    });
  },
  
  async getExamQuestions() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, question: 'Berapakah nilai dari 2 + 2 x 2?', options: ['6', '8', '4', '2'], answer: '6' },
          { id: 2, question: 'Ibu kota negara Indonesia yang baru bernama?', options: ['Jakarta', 'Bandung', 'Ibu Kota Nusantara (IKN)', 'Surabaya'], answer: 'Ibu Kota Nusantara (IKN)' },
          { id: 3, question: 'Unsur kimia dengan simbol O adalah?', options: ['Oksigen', 'Osmium', 'Ozon', 'Oksida'], answer: 'Oksigen' }
        ]);
      }, 400);
    });
  },

  async getDashboardData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          studentName: 'Ahmad Siswa',
          schoolLevel: 'SMA Kelas 12',
          completedCourses: 5,
          averageScore: 88.0,
          upcomingExams: 2,
          lastActivity: 'Matematika Dasar UTBK / SMA'
        });
      }, 500);
    });
  },

  async getMentorDashboardData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          mentorName: 'Budi Santoso, M.Pd',
          totalActiveClasses: 3,
          totalStudents: 145,
          averageStudentRating: 4.8,
          activeClasses: [
            { id: 101, title: 'Matematika Kelas 6 SD - Reguler', schedule: 'Senin, 15:00 WIB', studentsEnrolled: 45 },
            { id: 102, title: 'Persiapan Olimpiade Sains SD', schedule: 'Rabu, 16:30 WIB', studentsEnrolled: 20 },
            { id: 103, title: 'Matematika Dasar UTBK / SMA', schedule: 'Sabtu, 10:00 WIB', studentsEnrolled: 80 }
          ]
        });
      }, 500);
    });
  },

  async getAdminDashboardData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          adminName: 'Admin Utama (Owner)',
          totalStudents: 1250,
          totalMentors: 42,
          totalRevenue: 'Rp 125.400.000',
          systemStatus: 'Optimal (Cloud Neon DB Connected)',
          recentActivities: [
            { id: 1, text: 'Pendaftaran mentor baru: Dr. Hendra, M.Sc', time: '10 menit lalu' },
            { id: 2, text: 'Tryout serentak SD-SMA gelombang 2 dimulai', time: '1 jam lalu' },
            { id: 3, text: 'Backup database cloud berhasil dilakukan', time: '5 jam lalu' }
          ]
        });
      }, 500);
    });
  }
};