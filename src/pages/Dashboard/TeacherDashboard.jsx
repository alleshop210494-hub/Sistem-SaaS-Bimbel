import React, { useState, useEffect } from 'react';

export default function TeacherDashboard({ tenantId = 'default-bimbel' }) {
  const [teacherData, setTeacherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview'); // overview, schedules, classes, attendance

  const fetchTeacherData = async () => {
    try {
      const res = await fetch('/api/teacher', {
        headers: { 'x-tenant-id': tenantId }
      });
      const data = await res.json();
      setTeacherData(data);
    } catch (err) {
      console.error("Gagal memuat data guru:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeacherData();
  }, [tenantId]);

  const handleAttendanceChange = async (studentId, status) => {
    try {
      const res = await fetch('/api/teacher', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-tenant-id': tenantId
        },
        body: JSON.stringify({ action: 'update_attendance', studentId, status })
      });
      if (res.ok) {
        alert(`Status absensi berhasil diperbarui!`);
        fetchTeacherData();
      }
    } catch (err) {
      console.error("Gagal memperbarui absensi:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-zinc-500 font-medium animate-pulse">Memuat Dashboard Guru / Mentor...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Banner Mentor */}
      <div className="bg-gradient-to-r from-indigo-900 to-zinc-900 rounded-2xl p-8 text-white mb-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full border border-indigo-500/30">
              Portal Guru & Mentor Profesional
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-3">
              Selamat Datang, {teacherData?.teacherName || 'Guru'}! 👨‍🏫
            </h1>
            <p className="text-zinc-300 mt-1 text-sm sm:text-base">
              Bidang Pengajar: <span className="text-white font-medium">{teacherData?.teacherSubject}</span>
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-xl border border-white/10 flex items-center gap-3">
            <span className="text-xl">⭐</span>
            <div>
              <p className="text-xs text-zinc-300">Rating Pengajar</p>
              <p className="text-sm font-bold text-white">{teacherData?.averageTeacherRating} / 5.0</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 mb-8 border-b border-zinc-200 pb-4 overflow-x-auto">
        {[
          { id: 'overview', label: 'Ringkasan Pengajar' },
          { id: 'schedules', label: 'Jadwal Mengajar' },
          { id: 'classes', label: 'Kelas Diampu' },
          { id: 'attendance', label: 'Kelola Absensi Siswa' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all cursor-pointer whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Total Kelas Aktif</p>
              <p className="text-3xl font-extrabold text-zinc-900 mt-2">{teacherData?.totalActiveClasses || 0}</p>
              <span className="text-xs text-indigo-600 font-semibold mt-1 block">Kelas bimbingan berjalan</span>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Total Siswa Bimbingan</p>
              <p className="text-3xl font-extrabold text-emerald-600 mt-2">{teacherData?.totalStudentsEnrolled || 0}</p>
              <span className="text-xs text-zinc-400 mt-1 block">Terdaftar di kelas Anda</span>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Status Sinkronisasi</p>
              <p className="text-sm font-bold text-emerald-600 mt-3 bg-emerald-50 px-3 py-1 rounded-full inline-block">
                Neon DB Terhubung Aman
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h3 className="font-bold text-lg text-zinc-900 mb-4">Aksi Cepat Guru</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button 
                onClick={() => setActiveTab('attendance')}
                className="p-4 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 rounded-xl text-left transition-all cursor-pointer"
              >
                <h4 className="font-bold text-indigo-900">Input Absensi Sesi Hari Ini</h4>
                <p className="text-xs text-indigo-600 mt-1">Catat kehadiran siswa secara digital real-time.</p>
              </button>
              <button 
                onClick={() => setActiveTab('schedules')}
                className="p-4 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 rounded-xl text-left transition-all cursor-pointer"
              >
                <h4 className="font-bold text-zinc-900">Lihat Jadwal Mengajar Lengkap</h4>
                <p className="text-xs text-zinc-500 mt-1">Periksa jam dan ruang kelas tatap muka atau online.</p>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: Schedules */}
      {activeTab === 'schedules' && (
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <h3 className="text-lg font-bold text-zinc-900 mb-2">Jadwal Mengajar Anda</h3>
          <p className="text-zinc-500 text-sm mb-6">Daftar sesi kelas yang diampu minggu ini.</p>
          <div className="space-y-4">
            {teacherData?.teachingSchedules?.map((sch) => (
              <div key={sch.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 bg-zinc-50 border border-zinc-200/60 rounded-xl gap-4">
                <div>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100">
                    {sch.time}
                  </span>
                  <h4 className="font-bold text-base text-zinc-900 mt-2">{sch.className}</h4>
                  <p className="text-sm text-zinc-500 mt-0.5">Jumlah Siswa: <span className="font-medium text-zinc-700">{sch.studentsCount} Siswa</span></p>
                </div>
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100">
                  {sch.room}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content: Classes */}
      {activeTab === 'classes' && (
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <h3 className="text-lg font-bold text-zinc-900 mb-2">Modul Kelas yang Diampu</h3>
          <p className="text-zinc-500 text-sm mb-6">Daftar mata pelajaran dan kurikulum yang Anda pegang.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teacherData?.courses?.map((cls) => (
              <div key={cls.id} className="p-5 bg-zinc-50 border border-zinc-200/80 rounded-2xl flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-full">
                    Jenjang {cls.category}
                  </span>
                  <h4 className="font-bold text-base text-zinc-900 mt-3">{cls.title}</h4>
                  <p className="text-xs text-zinc-500 mt-1">Pengajar Utama: {cls.instructor}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-zinc-200/60 flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-600">Aktif</span>
                  <button 
                    onClick={() => alert(`Mengelola materi kelas: ${cls.title}`)}
                    className="text-xs font-semibold bg-white border border-zinc-200 px-3 py-1.5 rounded-lg text-zinc-700 hover:bg-zinc-100 transition-all cursor-pointer"
                  >
                    Kelola Materi
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content: Attendance (Kelola Absensi Siswa) */}
      {activeTab === 'attendance' && (
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <h3 className="text-lg font-bold text-zinc-900 mb-2">Input & Kelola Absensi Siswa</h3>
          <p className="text-zinc-500 text-sm mb-6">Perbarui status kehadiran siswa pada sesi kelas yang sedang berlangsung.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-200 text-xs text-zinc-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Nama Siswa</th>
                  <th className="py-3 px-4">Jenjang / Kelas</th>
                  <th className="py-3 px-4">Status Kehadiran</th>
                  <th className="py-3 px-4 text-right">Aksi Ubah Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-sm">
                {teacherData?.studentsToAttend?.map((st) => (
                  <tr key={st.id} className="hover:bg-zinc-50/50">
                    <td className="py-3 px-4 font-semibold text-zinc-900">{st.name}</td>
                    <td className="py-3 px-4 text-zinc-600">{st.school}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        st.status === 'Hadir' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-amber-50 text-amber-700 border border-amber-100'
                      }`}>
                        {st.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button 
                        onClick={() => handleAttendanceChange(st.id, 'Hadir')}
                        className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700 transition-all cursor-pointer"
                      >
                        Hadir
                      </button>
                      <button 
                        onClick={() => handleAttendanceChange(st.id, 'Izin')}
                        className="px-3 py-1 bg-amber-500 text-white rounded-lg text-xs font-semibold hover:bg-amber-600 transition-all cursor-pointer"
                      >
                        Izin
                      </button>
                      <button 
                        onClick={() => handleAttendanceChange(st.id, 'Alfa')}
                        className="px-3 py-1 bg-rose-600 text-white rounded-lg text-xs font-semibold hover:bg-rose-700 transition-all cursor-pointer"
                      >
                        Alfa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}