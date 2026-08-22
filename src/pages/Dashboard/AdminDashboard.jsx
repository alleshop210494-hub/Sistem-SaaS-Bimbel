import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';

export default function AdminDashboard() {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const data = await apiService.getAdminDashboardData();
        setAdminData(data);
      } catch (error) {
        console.error("Gagal memuat data admin:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-gray-500 font-medium animate-pulse">Memuat panel pemilik bimbel...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-gradient-to-r from-purple-700 to-indigo-800 rounded-2xl p-6 sm:p-8 text-white mb-8 shadow-md">
        <h1 className="text-2xl sm:text-3xl font-bold">Halo, {adminData.adminName}! 👑</h1>
        <p className="text-purple-200 mt-1">Pusat Kendali & Monitoring Bisnis Bimbel | Status Sistem: <span className="text-green-300 font-semibold">{adminData.systemStatus}</span></p>
      </div>
      
      {/* Statistik Global Pemilik Bimbel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm uppercase tracking-wider font-semibold">Total Seluruh Siswa</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">{adminData.totalStudents} Siswa</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm uppercase tracking-wider font-semibold">Total Mentor Aktif</p>
          <p className="text-3xl font-bold text-emerald-600 mt-2">{adminData.totalMentors} Pengajar</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm uppercase tracking-wider font-semibold">Estimasi Pendapatan</p>
          <p className="text-3xl font-bold text-purple-600 mt-2">{adminData.totalRevenue}</p>
        </div>
      </div>

      {/* Aktivitas Sistem Terbaru */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-bold text-lg text-gray-800 mb-4">Log & Aktivitas Sistem Terbaru</h3>
        <div className="space-y-4">
          {adminData.recentActivities.map((act) => (
            <div key={act.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border-l-4 border-purple-600">
              <p className="font-medium text-gray-800 text-sm sm:text-base">{act.text}</p>
              <span className="text-xs text-gray-400 font-medium whitespace-nowrap ml-4">{act.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}