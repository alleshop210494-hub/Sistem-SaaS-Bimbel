import React, { useState, useEffect } from 'react';

export default function Dashboard({ tenantId = 'default-bimbel' }) {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview'); // overview, schedule, classes, teachers, attendance

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const res = await fetch('/api/student', {
          headers: { 'x-tenant-id': tenantId }
        });
        const data = await res.json();
        setStudentData(data);
      } catch (err) {
        console.error("Gagal memuat data murid:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudentData();
  }, [tenantId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-zinc-500 font-medium animate-pulse">Memuat Dashboard Murid...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-2xl p-8 text-white mb-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Halo, {studentData?.studentName || 'Siswa'}! 👋</h1>
        <p className="text-zinc-400 mt-2 text-sm sm:text-base">
          Jenjang: <span className="text-white font-medium">{studentData?.schoolLevel}</span> | Siap tingkatkan prestasi akademikmu hari ini.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 mb-8 border-b border-zinc-200 pb-4 overflow-x-auto">
        {[
          { id: 'overview', label: 'Ringkasan Dashboard' },
          { id: 'schedule', label: 'Jadwal Bimbel' },
          { id: 'classes', label: 'Kelas Aktif' },
          { id: 'teachers', label: 'Daftar Guru' },
          { id: 'attendance', label: 'Riwayat Absensi' }
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
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Modul Selesai</p>
              <p className="text-3xl font-extrabold text-zinc-900 mt-2">{studentData?.completedCourses || 0}</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Rata-rata Nilai</p>
              <p className="text-3xl font-extrabold text-emerald-600 mt-2">{studentData?.averageScore || '0'}</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Tryout Mendatang</p>
              <p className="text-3xl font-extrabold text-amber-600 mt-2">{studentData?.upcomingExams || 0}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h3 className="font-bold text-lg text-zinc-900 mb-4">Aktivitas Terakhir</h3>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-zinc-50 rounded-xl border border-zinc-100 gap-4">
              <div>
                <p className="font-semibold text-zinc-900">{studentData?.lastActivity}</p>
                <p className="text-xs text-zinc-500 mt-0.5">Terakhir diakses dan disinkronkan dari database cloud</p>
              </div>
              <button 
                onClick={() => setActiveTab('schedule')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-4 py-2 rounded-xl shadow-sm transition-all cursor-pointer"
              >
                Lihat Jadwal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: Schedule (Jadwal Bimbel) */}
      {activeTab === 'schedule' && (
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <h3 className="text-lg font-bold text-zinc-900 mb-2">Jadwal Sesi Bimbel Anda</h3>
          <p className="text-zinc-500 text-sm mb-6">Pastikan hadir tepat waktu pada sesi kelas online maupun offline.</p>
          <div className="space-y-4">
            {studentData?.schedules?.map((sch) => (
              <div key={sch.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 bg-zinc-50 border border-zinc-200/60 rounded-xl gap-4">
                <div>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100">
                    {sch.time}
                  </span>
                  <h4 className="font-bold text-base text-zinc-900 mt-2">{sch.className}</h4>
                  <p className="text-sm text-zinc-500 mt-0.5">Pengajar: <span className="font-medium text-zinc-700">{sch.teacher}</span></p>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
                    {sch.room}
                  </span>
                  <button 
                    onClick={() => alert(`Masuk ke ruang: ${sch.room}`)}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-sm transition-all cursor-pointer"
                  >
                    Masuk Kelas
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content: Classes (Kelas) */}
      {activeTab === 'classes' && (
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <h3 className="text-lg font-bold text-zinc-900 mb-2">Daftar Modul & Kelas</h3>
          <p className="text-zinc-500 text-sm mb-6">Materi pelajaran yang terdaftar untuk akun Anda.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {studentData?.classes?.map((cls) => (
              <div key={cls.id} className="p-5 bg-zinc-50 border border-zinc-200/80 rounded-2xl flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-full">
                    Kelas {cls.category}
                  </span>
                  <h4 className="font-bold text-base text-zinc-900 mt-3">{cls.title}</h4>
                  <p className="text-xs text-zinc-500 mt-1">Mentor: {cls.instructor}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-zinc-200/60 flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-600">{cls.price}</span>
                  <button 
                    onClick={() => alert(`Membuka modul: ${cls.title}`)}
                    className="text-xs font-semibold bg-white border border-zinc-200 px-3 py-1.5 rounded-lg text-zinc-700 hover:bg-zinc-100 transition-all cursor-pointer"
                  >
                    Buka Modul
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content: Teachers (Guru Pengajar) */}
      {activeTab === 'teachers' && (
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <h3 className="text-lg font-bold text-zinc-900 mb-2">Daftar Guru / Mentor Pengajar</h3>
          <p className="text-zinc-500 text-sm mb-6">Konsultasikan kesulitan belajar langsung dengan mentor ahli.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {studentData?.teachers?.map((t) => (
              <div key={t.id} className="p-5 bg-zinc-50 border border-zinc-200/80 rounded-2xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-amber-500">⭐ {t.rating}</span>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-zinc-200 text-zinc-700 rounded-full">{t.subject}</span>
                </div>
                <h4 className="font-bold text-base text-zinc-900">{t.name}</h4>
                <p className="text-xs text-zinc-500 mt-1">Email: {t.contact}</p>
                <button 
                  onClick={() => alert(`Menghubungkan ke chat mentor ${t.name}`)}
                  className="mt-4 w-full py-2 bg-white border border-zinc-300 text-zinc-700 text-xs font-semibold rounded-xl hover:bg-zinc-100 transition-all cursor-pointer"
                >
                  Kirim Pesan Konsultasi
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content: Attendance (Riwayat Absensi) */}
      {activeTab === 'attendance' && (
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <h3 className="text-lg font-bold text-zinc-900 mb-2">Riwayat Absensi Kehadiran</h3>
          <p className="text-zinc-500 text-sm mb-6">Catatan kehadiran Anda pada setiap sesi pertemuan bimbingan.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-200 text-xs text-zinc-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Tanggal</th>
                  <th className="py-3 px-4">Mata Pelajaran / Kelas</th>
                  <th className="py-3 px-4">Status Kehadiran</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-sm">
                {studentData?.attendanceHistory?.map((att) => (
                  <tr key={att.id} className="hover:bg-zinc-50/50">
                    <td className="py-3 px-4 text-zinc-600">{att.date}</td>
                    <td className="py-3 px-4 font-semibold text-zinc-900">{att.className}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        att.status === 'Hadir' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-amber-50 text-amber-700 border border-amber-100'
                      }`}>
                        {att.status}
                      </span>
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