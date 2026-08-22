import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';

export default function MentorDashboard() {
  const [mentorData, setMentorData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMentorData = async () => {
      try {
        const data = await apiService.getMentorDashboardData();
        setMentorData(data);
      } catch (error) {
        console.error("Gagal memuat data dashboard mentor:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMentorData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-gray-500 font-medium animate-pulse">Memuat panel manajemen mentor...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 sm:p-8 text-white mb-8 shadow-md">
        <h1 className="text-2xl sm:text-3xl font-bold">Halo, {mentorData.mentorName}! 👋</h1>
        <p className="text-emerald-100 mt-1">Panel Pengajar | Kelola kelas dan pantau perkembangan siswa Anda.</p>
      </div>
      
      {/* Statistik Utama Mentor */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm uppercase tracking-wider font-semibold">Kelas Aktif</p>
          <p className="text-3xl font-bold text-emerald-600 mt-2">{mentorData.totalActiveClasses}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm uppercase tracking-wider font-semibold">Total Siswa Diajar</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">{mentorData.totalStudents}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm uppercase tracking-wider font-semibold">Rating Rata-rata</p>
          <p className="text-3xl font-bold text-yellow-500 mt-2">⭐ {mentorData.averageStudentRating}</p>
        </div>
      </div>

      {/* Daftar Kelas yang Diampu */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-lg text-gray-800">Daftar Kelas Anda</h3>
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors cursor-pointer">
            + Buat Kelas Baru
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-sm">
                <th className="px-6 py-4 font-semibold border-b">Nama Kelas</th>
                <th className="px-6 py-4 font-semibold border-b">Jadwal Sesi Berikutnya</th>
                <th className="px-6 py-4 font-semibold border-b">Jumlah Siswa</th>
                <th className="px-6 py-4 font-semibold border-b text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {mentorData.activeClasses.map((cls) => (
                <tr key={cls.id} className="hover:bg-gray-50 border-b border-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-800">{cls.title}</td>
                  <td className="px-6 py-4 text-gray-600 text-sm">{cls.schedule}</td>
                  <td className="px-6 py-4 text-gray-600 text-sm">
                    <span className="bg-blue-50 text-blue-700 py-1 px-3 rounded-full font-medium">
                      {cls.studentsEnrolled} Siswa
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-emerald-600 hover:text-emerald-800 font-medium text-sm mx-2">Kelola</button>
                    <button className="text-blue-600 hover:text-blue-800 font-medium text-sm mx-2">Mulai Sesi</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}