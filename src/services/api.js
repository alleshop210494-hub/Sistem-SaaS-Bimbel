// src/services/api.js

export const apiService = {
  async getCourses() {
    // Simulasi mengambil data dari Neon DB / Backend Cloud secara asynchronous
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            title: 'Matematika Dasar UTBK',
            category: 'Saintek',
            instructor: 'Budi Santoso, M.Pd',
            price: 'Gratis',
            rating: 4.8,
          },
          {
            id: 2,
            title: 'Fisika Kuantum & Mekanika',
            category: 'Saintek',
            instructor: 'Dr. Siti Aminah',
            price: 'Premium',
            rating: 4.9,
          },
          {
            id: 3,
            title: 'Bahasa Inggris Intensif',
            category: 'Soshum',
            instructor: 'John Doe, B.A.',
            price: 'Gratis',
            rating: 4.7,
          },
          {
            id: 4,
            title: 'Ekonomi & Akuntansi Dasar',
            category: 'Soshum',
            instructor: 'Rina Marlina, S.E.',
            price: 'Premium',
            rating: 4.6,
          },
        ]);
      }, 400);
    });
  },

  async getUserProgress(userId) {
    // Simulasi mengambil data progress belajar siswa
    return {
      completedCourses: 2,
      ongoingCourses: 3,
      averageScore: 85.5,
    };
  },

  async getExamQuestions() {
    // Simulasi mengambil soal ujian online dari cloud database
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            question: 'Berapakah nilai dari 2 + 2 x 2?',
            options: ['6', '8', '4', '2'],
            answer: '6',
          },
          {
            id: 2,
            question: 'Ibu kota negara Indonesia yang baru bernama?',
            options: [
              'Jakarta',
              'Bandung',
              'Ibu Kota Nusantara (IKN)',
              'Surabaya',
            ],
            answer: 'Ibu Kota Nusantara (IKN)',
          },
          {
            id: 3,
            question: 'Unsur kimia dengan simbol O adalah?',
            options: ['Oksigen', 'Osmium', 'Ozon', 'Oksida'],
            answer: 'Oksigen',
          },
        ]);
      }, 400);
    });
  },
};
