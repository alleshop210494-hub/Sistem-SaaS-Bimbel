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
        <p className="text-zinc-500 font-medium animate-pulse">Memuat dashboard...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-2xl p-8 text-white mb-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Selamat Datang, {stats.studentName}! 👋</h1>
        <p className="text-zinc-400 mt-2 text-sm sm:text-base">Jenjang: <span className="text-white font-medium">{stats.schoolLevel}</span> | Siap tingkatkan prestasi akademikmu hari ini.</p>
      </div>
      
      {/* Statistik Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-200/80">
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Modul Selesai</p>
          <p className="text-3xl font-extrabold text-zinc-900 mt-2">{stats.completedCourses}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-200/80">
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Rata-rata Nilai</p>
          <p className="text-3xl font-extrabold text-emerald-600 mt-2">{stats.averageScore}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-200/80">
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Tryout Mendatang</p>
          <p className="text-3xl font-extrabold text-amber-600 mt-2">{stats.upcomingExams}</p>
        </div>
      </div>

      {/* Aktivitas Terakhir */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-200/80">
        <h3 className="font-bold text-lg text-zinc-900 mb-4">Aktivitas Terakhir</h3>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-zinc-50 rounded-xl border border-zinc-100 gap-4">
          <div>
            <p className="font-semibold text-zinc-900">{stats.lastActivity}</p>
            <p className="text-xs text-zinc-500 mt-0.5">Terakhir diakses kemarin</p>
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-4 py-2 rounded-xl shadow-sm transition-all cursor-pointer">
            Lanjut Belajar
          </button>
        </div>
      </div>
    </div>
  );
}