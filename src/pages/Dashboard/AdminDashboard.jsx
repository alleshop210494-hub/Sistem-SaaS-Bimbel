// src/pages/Dashboard/AdminDashboard.jsx - Full Code Connected to Backend & Neon (No LocalStorage)
import React, { useState, useEffect } from 'react';

export default function AdminDashboard({ tenantId = 'bimbel-nusantara' }) {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('classes');
  
  // Form input kelas baru
  const [classForm, setClassForm] = useState({ title: '', category: 'SMA / UTBK', instructor: '', price: '', zoomLink: '' });
  
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
      if (!res.ok) throw new Error('Gagal mengambil data dari server database.');
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
      
      if (!res.ok) throw new Error('Gagal menyimpan ke database Neon.');
      
      const data = await res.json();
      alert('Kelas & Link Zoom berhasil disimpan ke database Neon!');
      setClassForm({ title: '', category: 'SMA / UTBK', instructor: '', price: '', zoomLink: '' });
      if (data.classes) {
        setAdminData(prev => ({ ...prev, classes: data.classes }));
      } else {
        fetchAdminData();
      }
    } catch (err) {
      console.error(err);
      alert('Gagal menyimpan kelas. Pastikan server backend dan koneksi Neon aktif.');
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
      if (!res.ok) throw new Error('Gagal menyimpan SPP');
      alert('Data pembayaran SPP berhasil disimpan ke database Neon!');
      setSppForm({ studentName: '', month: 'Februari 2026', amount: '', status: 'Lunas' });
      fetchAdminData();
    } catch (err) {
      console.error(err);
      alert('Gagal menyimpan data SPP ke database.');
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
      if (!res.ok) throw new Error('Gagal menyimpan gaji');
      alert('Data gaji guru berhasil disimpan ke database Neon!');
      setSalaryForm({ teacherName: '', month: 'Februari 2026', amount: '', status: 'Pending' });
      fetchAdminData();
    } catch (err) {
      console.error(err);
      alert('Gagal menyimpan data gaji ke database.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-zinc-500 font-medium animate-pulse">Menghubungkan ke Database Neon...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Dashboard Admin Bimbel</h1>
          <p className="text-zinc-400 mt-1">Terhubung langsung dengan database cloud Neon.</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl text-zinc-300 text-sm font-semibold flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          Tenant: {tenantId}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 mb-8 border-b border-zinc-800 pb-4 overflow-x-auto">
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
                : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:bg-zinc-800 hover:text-white'
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
            <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 shadow-sm">
              <p className="text-sm font-medium text-zinc-400">Total Murid Aktif</p>
              <p className="text-3xl font-extrabold text-white mt-2">{adminData?.totalStudents || 0}</p>
            </div>
            <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 shadow-sm">
              <p className="text-sm font-medium text-zinc-400">Total Mentor Pengajar</p>
              <p className="text-3xl font-extrabold text-white mt-2">{adminData?.totalMentors || 0}</p>
            </div>
            <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 shadow-sm">
              <p className="text-sm font-medium text-zinc-400">Total Pendapatan SPP</p>
              <p className="text-2xl font-extrabold text-white mt-2">{adminData?.totalRevenue || 'Rp 0'}</p>
            </div>
            <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 shadow-sm">
              <p className="text-sm font-medium text-zinc-400">Status Neon DB</p>
              <p className="text-sm font-bold text-emerald-400 mt-3 bg-emerald-500/10 px-3 py-1 rounded-full inline-block">
                {adminData?.systemStatus || 'Connected'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: Classes & Zoom Management */}
      {activeTab === 'classes' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 shadow-sm h-fit">
            <h3 className="text-lg font-bold text-white mb-4">Input Kelas & Link Zoom</h3>
            <form onSubmit={handleAddClass} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Nama Mata Pelajaran / Kelas</label>
                <input 
                  type="text" 
                  required
                  placeholder="Contoh: Matematika UTBK SMA"
                  value={classForm.title}
                  onChange={(e) => setClassForm({ ...classForm, title: e.target.value })}
                  className="w-full px-4 py-2 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm text-white placeholder:text-zinc-500 bg-zinc-950"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Jenjang Pendidikan</label>
                <select 
                  value={classForm.category}
                  onChange={(e) => setClassForm({ ...classForm, category: e.target.value })}
                  className="w-full px-4 py-2 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm bg-zinc-950 text-white"
                >
                  <option value="SD">SD</option>
                  <option value="SMP">SMP</option>
                  <option value="SMA / UTBK">SMA / UTBK</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Nama Mentor Pengajar</label>
                <input 
                  type="text" 
                  required
                  placeholder="Contoh: Rudiansah S.pd"
                  value={classForm.instructor}
                  onChange={(e) => setClassForm({ ...classForm, instructor: e.target.value })}
                  className="w-full px-4 py-2 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm text-white placeholder:text-zinc-500 bg-zinc-950"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Biaya / Status Kelas</label>
                <input 
                  type="text" 
                  required
                  placeholder="Contoh: 234000"
                  value={classForm.price}
                  onChange={(e) => setClassForm({ ...classForm, price: e.target.value })}
                  className="w-full px-4 py-2 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm text-white placeholder:text-zinc-500 bg-zinc-950"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Link Zoom Meeting (URL)</label>
                <input 
                  type="url" 
                  required
                  placeholder="https://zoom.us/j/contoh12345"
                  value={classForm.zoomLink}
                  onChange={(e) => setClassForm({ ...classForm, zoomLink: e.target.value })}
                  className="w-full px-4 py-2 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm text-white placeholder:text-zinc-500 bg-zinc-950"
                />
              </div>
              <button 
                type="submit" 
                disabled={submitting}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50"
              >
                {submitting ? 'Menyimpan...' : 'Simpan ke Database Neon'}
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 bg-zinc-900 p-6 rounded-2xl border border-zinc-800 shadow-sm">
            <h3 className="text-lg font-bold text-white mb-4">Daftar Kelas dari Database Neon</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-800 text-xs text-zinc-400 uppercase tracking-wider">
                    <th className="py-3 px-4">Judul Kelas</th>
                    <th className="py-3 px-4">Jenjang</th>
                    <th className="py-3 px-4">Mentor</th>
                    <th className="py-3 px-4">Link Zoom</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 text-sm">
                  {adminData?.classes?.length > 0 ? (
                    adminData.classes.map((cls) => (
                      <tr key={cls.id} className="hover:bg-zinc-800/40">
                        <td className="py-3 px-4 font-semibold text-white">{cls.title}</td>
                        <td className="py-3 px-4">
                          <span className="px-2.5 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-xs font-semibold">
                            {cls.category}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-zinc-300">{cls.instructor}</td>
                        <td className="py-3 px-4">
                          {cls.zoomLink ? (
                            <a 
                              href={cls.zoomLink} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-3 py-1.5 rounded-lg hover:bg-indigo-500/20 transition-all inline-block truncate max-w-[150px]"
                            >
                              🔗 Buka Zoom
                            </a>
                          ) : (
                            <span className="text-xs text-zinc-500 italic">Belum diset</span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="py-8 text-center text-zinc-500">Belum ada data kelas di database Neon.</td>
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
        <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 shadow-sm">
          <h3 className="text-lg font-bold text-white mb-2">Manajemen Absensi Murid & Guru</h3>
          <p className="text-zinc-400 text-sm mb-6">Sinkronisasi data absensi langsung ke database Neon.</p>
        </div>
      )}

      {/* Tab Content: Finance */}
      {activeTab === 'finance' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 shadow-sm h-fit">
              <h3 className="text-lg font-bold text-white mb-2">Input Pembayaran SPP Murid</h3>
              <form onSubmit={handleAddSpp} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Nama Siswa</label>
                  <input 
                    type="text" 
                    required
                    value={sppForm.studentName}
                    onChange={(e) => setSppForm({ ...sppForm, studentName: e.target.value })}
                    className="w-full px-4 py-2 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-indigo-500 text-sm text-white bg-zinc-950"
                  />
                </div>
                <button type="submit" className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl">
                  Simpan SPP ke Neon
                </button>
              </form>
            </div>

            <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 shadow-sm h-fit">
              <h3 className="text-lg font-bold text-white mb-2">Input Gaji Guru / Mentor</h3>
              <form onSubmit={handleAddSalary} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Nama Guru / Mentor</label>
                  <input 
                    type="text" 
                    required
                    value={salaryForm.teacherName}
                    onChange={(e) => setSalaryForm({ ...salaryForm, teacherName: e.target.value })}
                    className="w-full px-4 py-2 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-indigo-500 text-sm text-white bg-zinc-950"
                  />
                </div>
                <button type="submit" className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl">
                  Simpan Gaji ke Neon
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}