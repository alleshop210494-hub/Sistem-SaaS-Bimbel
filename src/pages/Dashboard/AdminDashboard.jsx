// src/pages/Dashboard/AdminDashboard.jsx - Full Code with Zoom Link Support
import React, { useState, useEffect } from 'react';

export default function AdminDashboard({ tenantId = 'default-bimbel' }) {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview'); // overview, classes, attendance, finance
  
  // Form input kelas baru (ditambah zoomLink)
  const [classForm, setClassForm] = useState({ title: '', category: 'SD', instructor: '', price: '', zoomLink: '' });
  
  // Form input SPP Murid
  const [sppForm, setSppForm] = useState({ studentName: '', month: 'Februari 2026', amount: '', status: 'Lunas' });
  
  // Form input Gaji Guru
  const [salaryForm, setSalaryForm] = useState({ teacherName: '', month: 'Februari 2026', amount: '', status: 'Pending' });

  const [submitting, setSubmitting] = useState(false);

  const fetchAdminData = async () => {
    try {
      const res = await fetch('/api/admin', {
        headers: { 'x-tenant-id': tenantId }
      });
      const data = await res.json();
      setAdminData(data);
    } catch (err) {
      console.error("Gagal memuat data admin:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, [tenantId]);

  const handleAddClass = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-tenant-id': tenantId
        },
        body: JSON.stringify({ action: 'add_class', ...classForm })
      });
      if (res.ok) {
        alert('Kelas & Link Zoom berhasil disimpan ke database!');
        setClassForm({ title: '', category: 'SD', instructor: '', price: '', zoomLink: '' });
        fetchAdminData();
      } else {
        alert('Gagal menambahkan kelas.');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddSpp = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-tenant-id': tenantId
        },
        body: JSON.stringify({ action: 'add_spp', ...sppForm })
      });
      if (res.ok) {
        alert('Data pembayaran SPP berhasil disimpan!');
        setSppForm({ studentName: '', month: 'Februari 2026', amount: '', status: 'Lunas' });
        fetchAdminData();
      } else {
        alert('Gagal menyimpan data SPP.');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddSalary = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-tenant-id': tenantId
        },
        body: JSON.stringify({ action: 'add_salary', ...salaryForm })
      });
      if (res.ok) {
        alert('Data gaji guru berhasil disimpan!');
        setSalaryForm({ teacherName: '', month: 'Februari 2026', amount: '', status: 'Pending' });
        fetchAdminData();
      } else {
        alert('Gagal menyimpan data gaji guru.');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-zinc-500 font-medium animate-pulse">Memuat Dashboard Admin yang aman...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight">Dashboard Admin Bimbel</h1>
          <p className="text-zinc-500 mt-1">Kelola operasional, kelas, absensi, SPP murid, dan gaji pengajar secara terpusat.</p>
        </div>
        <div className="bg-indigo-50 border border-indigo-100 px-4 py-2 rounded-xl text-indigo-700 text-sm font-semibold flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          Tenant ID: {tenantId}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 mb-8 border-b border-zinc-200 pb-4 overflow-x-auto">
        {[
          { id: 'overview', label: 'Ringkasan Statistik' },
          { id: 'classes', label: 'Manajemen Kelas & Zoom' },
          { id: 'attendance', label: 'Absensi Terpusat' },
          { id: 'finance', label: 'SPP & Gaji Guru' }
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
              <p className="text-sm font-medium text-zinc-500">Total Murid Aktif</p>
              <p className="text-3xl font-extrabold text-zinc-900 mt-2">{adminData?.totalStudents || 0}</p>
              <span className="text-xs text-emerald-600 font-semibold mt-2 inline-block">+12% bulan ini</span>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
              <p className="text-sm font-medium text-zinc-500">Total Mentor Pengajar</p>
              <p className="text-3xl font-extrabold text-zinc-900 mt-2">{adminData?.totalMentors || 0}</p>
              <span className="text-xs text-indigo-600 font-semibold mt-2 inline-block">Aktif mengajar</span>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
              <p className="text-sm font-medium text-zinc-500">Total Pendapatan SPP</p>
              <p className="text-2xl font-extrabold text-zinc-900 mt-2">{adminData?.totalRevenue || 'Rp 0'}</p>
              <span className="text-xs text-emerald-600 font-semibold mt-2 inline-block">Lunas terverifikasi</span>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
              <p className="text-sm font-medium text-zinc-500">Status Sistem Cloud</p>
              <p className="text-sm font-bold text-emerald-600 mt-3 bg-emerald-50 px-3 py-1 rounded-full inline-block">
                {adminData?.systemStatus || 'Online'}
              </p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-zinc-900 mb-4">Aktivitas & Log Sistem Terbaru</h3>
            <div className="space-y-4">
              {adminData?.recentActivities?.map((act) => (
                <div key={act.id} className="flex items-center justify-between py-3 border-b border-zinc-100 last:border-none">
                  <p className="text-sm text-zinc-700">{act.text}</p>
                  <span className="text-xs text-zinc-400 font-medium">{act.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: Classes & Zoom Management */}
      {activeTab === 'classes' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Input Kelas & Zoom */}
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm h-fit">
            <h3 className="text-lg font-bold text-zinc-900 mb-4">Input Kelas & Link Zoom</h3>
            <form onSubmit={handleAddClass} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Nama Mata Pelajaran / Kelas</label>
                <input 
                  type="text" 
                  required
                  placeholder="Contoh: Matematika UTBK SMA"
                  value={classForm.title}
                  onChange={(e) => setClassForm({ ...classForm, title: e.target.value })}
                  className="w-full px-4 py-2 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm text-zinc-900 placeholder:text-zinc-400 bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Jenjang Pendidikan</label>
                <select 
                  value={classForm.category}
                  onChange={(e) => setClassForm({ ...classForm, category: e.target.value })}
                  className="w-full px-4 py-2 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm bg-white text-zinc-900"
                >
                  <option value="SD">SD</option>
                  <option value="SMP">SMP</option>
                  <option value="SMA">SMA / UTBK</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Nama Mentor Pengajar</label>
                <input 
                  type="text" 
                  required
                  placeholder="Contoh: Budi Santoso, M.Pd"
                  value={classForm.instructor}
                  onChange={(e) => setClassForm({ ...classForm, instructor: e.target.value })}
                  className="w-full px-4 py-2 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm text-zinc-900 placeholder:text-zinc-400 bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Biaya / Status Kelas</label>
                <input 
                  type="text" 
                  required
                  placeholder="Contoh: Rp 250.000 atau Gratis"
                  value={classForm.price}
                  onChange={(e) => setClassForm({ ...classForm, price: e.target.value })}
                  className="w-full px-4 py-2 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm text-zinc-900 placeholder:text-zinc-400 bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Link Zoom Meeting (URL)</label>
                <input 
                  type="url" 
                  required
                  placeholder="https://zoom.us/j/contoh12345"
                  value={classForm.zoomLink}
                  onChange={(e) => setClassForm({ ...classForm, zoomLink: e.target.value })}
                  className="w-full px-4 py-2 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm text-zinc-900 placeholder:text-zinc-400 bg-white"
                />
                <p className="text-[11px] text-zinc-400 mt-1">Link ini akan otomatis menjadi tombol 'Masuk Kelas' di portal siswa.</p>
              </div>
              <button 
                type="submit" 
                disabled={submitting}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50"
              >
                {submitting ? 'Menyimpan ke Database...' : 'Simpan Kelas & Link Zoom'}
              </button>
            </form>
          </div>

          {/* Daftar Kelas & Link Zoom di Database */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h3 className="text-lg font-bold text-zinc-900 mb-4">Daftar Kelas & Status Link Zoom</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-200 text-xs text-zinc-500 uppercase tracking-wider">
                    <th className="py-3 px-4">Judul Kelas</th>
                    <th className="py-3 px-4">Jenjang</th>
                    <th className="py-3 px-4">Mentor</th>
                    <th className="py-3 px-4">Link Zoom</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 text-sm">
                  {adminData?.classes?.length > 0 ? (
                    adminData.classes.map((cls) => (
                      <tr key={cls.id} className="hover:bg-zinc-50/50">
                        <td className="py-3 px-4 font-semibold text-zinc-900">{cls.title}</td>
                        <td className="py-3 px-4">
                          <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-semibold">
                            {cls.category}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-zinc-600">{cls.instructor}</td>
                        <td className="py-3 px-4">
                          {cls.zoomLink ? (
                            <a 
                              href={cls.zoomLink} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-all inline-block truncate max-w-[150px]"
                              title={cls.zoomLink}
                            >
                              🔗 Buka Zoom
                            </a>
                          ) : (
                            <span className="text-xs text-zinc-400 italic">Belum diset</span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="py-6 text-center text-zinc-400">Belum ada kelas yang diinput.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: Attendance */}
      {activeTab === 'attendance' && (
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <h3 className="text-lg font-bold text-zinc-900 mb-2">Manajemen Absensi Murid & Guru</h3>
          <p className="text-zinc-500 text-sm mb-6">Rekapitulasi kehadiran harian seluruh sesi bimbingan belajar.</p>
          <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-8 text-center">
            <p className="text-zinc-600 font-medium">Modul absensi terpusat siap merekam data kehadiran siswa per sesi kelas.</p>
            <button 
              onClick={() => alert('Fitur rekap absensi massal diaktifkan.')}
              className="mt-4 px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold text-sm hover:bg-indigo-700 transition-all cursor-pointer"
            >
              Unduh Rekap Absensi (CSV / Excel)
            </button>
          </div>
        </div>
      )}

      {/* Tab Content: Finance */}
      {activeTab === 'finance' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm h-fit">
              <h3 className="text-lg font-bold text-zinc-900 mb-2">Input Pembayaran SPP Murid</h3>
              <p className="text-zinc-500 text-sm mb-4">Catat atau perbarui status pembayaran SPP bulanan siswa.</p>
              <form onSubmit={handleAddSpp} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Nama Siswa</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Contoh: Ahmad Fauzan"
                    value={sppForm.studentName}
                    onChange={(e) => setSppForm({ ...sppForm, studentName: e.target.value })}
                    className="w-full px-4 py-2 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm text-zinc-900 placeholder:text-zinc-400 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Bulan Tagihan</label>
                  <input 
                    type="text" 
                    required
                    value={sppForm.month}
                    onChange={(e) => setSppForm({ ...sppForm, month: e.target.value })}
                    className="w-full px-4 py-2 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm text-zinc-900 placeholder:text-zinc-400 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Nominal (Rp)</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Contoh: 350.000"
                    value={sppForm.amount}
                    onChange={(e) => setSppForm({ ...sppForm, amount: e.target.value })}
                    className="w-full px-4 py-2 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm text-zinc-900 placeholder:text-zinc-400 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Status Pembayaran</label>
                  <select 
                    value={sppForm.status}
                    onChange={(e) => setSppForm({ ...sppForm, status: e.target.value })}
                    className="w-full px-4 py-2 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm bg-white text-zinc-900"
                  >
                    <option value="Lunas">Lunas</option>
                    <option value="Pending">Pending (Belum Lunas)</option>
                  </select>
                </div>
                <button 
                  type="submit" 
                  disabled={submitting}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50"
                >
                  {submitting ? 'Menyimpan...' : 'Simpan Pembayaran SPP'}
                </button>
              </form>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm h-fit">
              <h3 className="text-lg font-bold text-zinc-900 mb-2">Input Gaji Guru / Mentor</h3>
              <p className="text-zinc-500 text-sm mb-4">Catat honorarium dan perbarui status pencairan gaji pengajar.</p>
              <form onSubmit={handleAddSalary} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Nama Guru / Mentor</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Contoh: Budi Santoso, M.Pd"
                    value={salaryForm.teacherName}
                    onChange={(e) => setSalaryForm({ ...salaryForm, teacherName: e.target.value })}
                    className="w-full px-4 py-2 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm text-zinc-900 placeholder:text-zinc-400 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Periode Gaji (Bulan)</label>
                  <input 
                    type="text" 
                    required
                    value={salaryForm.month}
                    onChange={(e) => setSalaryForm({ ...salaryForm, month: e.target.value })}
                    className="w-full px-4 py-2 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm text-zinc-900 placeholder:text-zinc-400 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Nominal Gaji (Rp)</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Contoh: 3.500.000"
                    value={salaryForm.amount}
                    onChange={(e) => setSalaryForm({ ...salaryForm, amount: e.target.value })}
                    className="w-full px-4 py-2 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm text-zinc-900 placeholder:text-zinc-400 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Status Pencairan Gaji</label>
                  <select 
                    value={salaryForm.status}
                    onChange={(e) => setSalaryForm({ ...salaryForm, status: e.target.value })}
                    className="w-full px-4 py-2 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm bg-white text-zinc-900"
                  >
                    <option value="Paid">Sudah Dibayar (Paid)</option>
                    <option value="Pending">Pending (Belum Dicairkan)</option>
                  </select>
                </div>
                <button 
                  type="submit" 
                  disabled={submitting}
                  className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50"
                >
                  {submitting ? 'Menyimpan...' : 'Simpan Data Gaji Guru'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}