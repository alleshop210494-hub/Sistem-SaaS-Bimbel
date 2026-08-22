import React, { useState, useEffect } from 'react';

export default function ParentDashboard({ tenantId = 'default-bimbel' }) {
  const [parentData, setParentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview'); // overview, schedule, mentors, attendance, grades

  useEffect(() => {
    const fetchParentData = async () => {
      try {
        const res = await fetch('/api/parent', {
          headers: { 'x-tenant-id': tenantId }
        });
        const data = await res.json();
        setParentData(data);
      } catch (err) {
        console.error("Gagal memuat data orang tua:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchParentData();
  }, [tenantId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-zinc-500 font-medium animate-pulse">Memuat Dashboard Wali Murid...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Banner Profil Anak */}
      <div className="bg-gradient-to-r from-emerald-900 to-zinc-900 rounded-2xl p-8 text-white mb-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full border border-emerald-500/30">
              Portal Orang Tua / Wali
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-3">
              Putra/Putri: {parentData?.childName || 'Siswa'}
            </h1>
            <p className="text-zinc-300 mt-1 text-sm sm:text-base">
              Jenjang: <span className="text-white font-medium">{parentData?.childSchoolLevel}</span>
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-xl border border-white/10">
            <p className="text-xs text-zinc-300">Status Pembayaran SPP</p>
            <p className="text-sm font-bold text-emerald-400 mt-0.5">{parentData?.tuitionStatus}</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 mb-8 border-b border-zinc-200 pb-4 overflow-x-auto">
        {[
          { id: 'overview', label: 'Ringkasan Nilai & Anak' },
          { id: 'schedule', label: 'Jadwal Kelas Anak' },
          { id: 'mentors', label: 'Mentor Pengajar' },
          { id: 'attendance', label: 'Absensi Anak' },
          { id: 'grades', label: 'Detail Nilai & Rapor' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all cursor-pointer whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-emerald-600 text-white shadow-sm'
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
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Rata-rata Nilai Anak</p>
              <p className="text-3xl font-extrabold text-emerald-600 mt-2">{parentData?.overallGradeAverage || '0'}</p>
              <span className="text-xs text-zinc-400 mt-1 block">Predikat Sangat Memuaskan</span>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Total Jadwal Aktif</p>
              <p className="text-3xl font-extrabold text-zinc-900 mt-2">{parentData?.childSchedules?.length || 0} Sesi</p>
              <span className="text-xs text-zinc-400 mt-1 block">Minggu berjalan</span>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Kehadiran Absensi</p>
              <p className="text-3xl font-extrabold text-indigo-600 mt-2">100%</p>
              <span className="text-xs text-emerald-600 font-semibold mt-1 block">Tidak ada catatan alfa</span>
            </div>
          </div>

          {/* Ringkasan Nilai Singkat */}
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-zinc-900">Rekap Nilai Terbaru</h3>
              <button 
                onClick={() => setActiveTab('grades')}
                className="text-xs font-semibold text-emerald-600 hover:underline cursor-pointer"
              >
                Lihat Selengkapnya →
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {parentData?.childGrades?.map((grade) => (
                <div key={grade.id} className="p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                  <p className="text-xs font-semibold text-zinc-500">{grade.subject}</p>
                  <p className="text-2xl font-extrabold text-zinc-900 mt-1">{grade.score}</p>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded mt-2 inline-block">
                    {grade.predicate}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: Schedule */}
      {activeTab === 'schedule' && (
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <h3 className="text-lg font-bold text-zinc-900 mb-2">Jadwal Kelas Anak</h3>
          <p className="text-zinc-500 text-sm mb-6">Pantau waktu anak Anda mengikuti bimbingan belajar.</p>
          <div className="space-y-4">
            {parentData?.childSchedules?.map((sch) => (
              <div key={sch.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 bg-zinc-50 border border-zinc-200/60 rounded-xl gap-4">
                <div>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100">
                    {sch.time}
                  </span>
                  <h4 className="font-bold text-base text-zinc-900 mt-2">{sch.className}</h4>
                  <p className="text-sm text-zinc-500 mt-0.5">Mentor: <span className="font-medium text-zinc-700">{sch.teacher}</span></p>
                </div>
                <span className="text-xs font-bold text-zinc-700 bg-zinc-200/70 px-3 py-1.5 rounded-lg">
                  Ruang: {sch.room}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content: Mentors */}
      {activeTab === 'mentors' && (
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <h3 className="text-lg font-bold text-zinc-900 mb-2">Daftar Mentor Pengajar Anak</h3>
          <p className="text-zinc-500 text-sm mb-6">Informasi pengajar yang membimbing putra/putri Anda.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {parentData?.childMentors?.map((m) => (
              <div key={m.id} className="p-5 bg-zinc-50 border border-zinc-200/80 rounded-2xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-amber-500">⭐ {m.rating}</span>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full">{m.subject}</span>
                </div>
                <h4 className="font-bold text-base text-zinc-900">{m.name}</h4>
                <p className="text-xs text-zinc-500 mt-1">Kontak: {m.phone}</p>
                <button 
                  onClick={() => alert(`Menghubungi mentor ${m.name}`)}
                  className="mt-4 w-full py-2 bg-white border border-zinc-300 text-zinc-700 text-xs font-semibold rounded-xl hover:bg-zinc-100 transition-all cursor-pointer"
                >
                  Hubungi Mentor
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content: Attendance */}
      {activeTab === 'attendance' && (
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <h3 className="text-lg font-bold text-zinc-900 mb-2">Riwayat Kehadiran Anak</h3>
          <p className="text-zinc-500 text-sm mb-6">Catatan kehadiran anak secara real-time dari sistem.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-200 text-xs text-zinc-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Tanggal</th>
                  <th className="py-3 px-4">Mata Pelajaran</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-sm">
                {parentData?.childAttendance?.map((att) => (
                  <tr key={att.id} className="hover:bg-zinc-50/50">
                    <td className="py-3 px-4 text-zinc-600">{att.date}</td>
                    <td className="py-3 px-4 font-semibold text-zinc-900">{att.className}</td>
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
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

      {/* Tab Content: Grades */}
      {activeTab === 'grades' && (
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <h3 className="text-lg font-bold text-zinc-900 mb-2">Dashboard Nilai & Rapor Akademik Anak</h3>
          <p className="text-zinc-500 text-sm mb-6">Evaluasi lengkap hasil belajar anak dari setiap ujian dan tryout.</p>
          <div className="space-y-4">
            {parentData?.childGrades?.map((grade) => (
              <div key={grade.id} className="p-5 bg-zinc-50 border border-zinc-200 rounded-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-base text-zinc-900">{grade.subject}</h4>
                    <p className="text-xs text-zinc-500 mt-0.5">{grade.notes}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 font-bold text-xs rounded-full">
                      {grade.predicate}
                    </span>
                    <span className="text-2xl font-extrabold text-zinc-900">{grade.score}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}