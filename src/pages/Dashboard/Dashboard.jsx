import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiService.getDashboardData();
        setStats(data);
      } catch (error) {
        console.error("Gagal memuat data dashboard:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-gray-500 font-medium animate-pulse">Menghubungkan ke server cloud...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Selamat Datang Kembali!</h1>
      
      {/* Statistik Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm uppercase tracking-wider font-semibold">Kursus Selesai</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">{stats.completedCourses}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm uppercase tracking-wider font-semibold">Rata-rata Nilai</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{stats.averageScore}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm uppercase tracking-wider font-semibold">Ujian Mendatang</p>
          <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.upcomingExams}</p>
        </div>
      </div>

      {/* Aktivitas Terakhir */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-lg text-gray-800 mb-4">Aktivitas Terakhir</h3>
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="font-medium text-gray-800">Melanjutkan belajar: {stats.lastActivity}</p>
            <p className="text-sm text-gray-500">2 jam yang lalu</p>
          </div>
          <button className="text-blue-600 font-medium text-sm hover:underline">Lanjut Belajar</button>
        </div>
      </div>
    </div>
  );
}