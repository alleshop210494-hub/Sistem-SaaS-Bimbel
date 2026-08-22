// src/services/api.js

export const apiService = {
  async getCourses() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, title: 'Matematika Dasar UTBK', category: 'Saintek', instructor: 'Budi Santoso, M.Pd', price: 'Gratis', rating: 4.8 },
          { id: 2, title: 'Fisika Kuantum & Mekanika', category: 'Saintek', instructor: 'Dr. Siti Aminah', price: 'Premium', rating: 4.9 },
          { id: 3, title: 'Bahasa Inggris Intensif', category: 'Soshum', instructor: 'John Doe, B.A.', price: 'Gratis', rating: 4.7 },
          { id: 4, title: 'Ekonomi & Akuntansi Dasar', category: 'Soshum', instructor: 'Rina Marlina, S.E.', price: 'Premium', rating: 4.6 }
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
    // Simulasi pengambilan data statistik siswa dari database cloud (Neon)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          completedCourses: 12,
          averageScore: 87.5,
          upcomingExams: 2,
          lastActivity: 'Matematika Dasar UTBK'
        });
      }, 500);
    });
  }
};