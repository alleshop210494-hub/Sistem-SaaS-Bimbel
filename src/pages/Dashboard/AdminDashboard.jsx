// src/pages/Dashboard/AdminDashboard.jsx - Full Combined Code
import React from 'react';

export default function AdminDashboard({ tenantId, activeTab = 'dashboard' }) {
  return (
    <div>
      {/* 1. TAB ADMIN UTAMA */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-2">Dashboard Utama Admin</h2>
            <p className="text-zinc-400 text-sm">Ringkasan aktivitas dan statistik operasional untuk tenant <span className="text-purple-400 font-semibold">{tenantId}</span>.</p>
          </div>
        </div>
      )}

      {/* 2. TAB KELOLA GURU, MURID & KELAS */}
      {activeTab === 'manage' && (
        <div className="space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-xl font-bold text-white">Kelola Guru & Murid</h2>
                <p className="text-zinc-400 text-sm">Daftar entitas terdaftar dalam sistem tenant {tenantId}</p>
              </div>
              <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold rounded-xl transition-all cursor-pointer">
                + Tambah Data Baru
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-zinc-950 border border-zinc-800/80 p-4 rounded-xl">
                <h3 className="text-sm font-semibold text-zinc-200 mb-3 flex items-center gap-2">
                  <span>👨‍🏫</span> Daftar Guru / Mentor Aktif
                </h3>
                <ul className="space-y-2 text-xs text-zinc-400">
                  <li className="flex justify-between p-2 bg-zinc-900 rounded-lg">
                    <span>Budi Santoso, S.Pd (Matematika)</span>
                    <span className="text-emerald-400">Aktif</span>
                  </li>
                  <li className="flex justify-between p-2 bg-zinc-900 rounded-lg">
                    <span>Siti Aminah, M.Sc (Fisika)</span>
                    <span className="text-emerald-400">Aktif</span>
                  </li>
                </ul>
              </div>

              <div className="bg-zinc-950 border border-zinc-800/80 p-4 rounded-xl">
                <h3 className="text-sm font-semibold text-zinc-200 mb-3 flex items-center gap-2">
                  <span>🎓</span> Daftar Murid Terdaftar
                </h3>
                <ul className="space-y-2 text-xs text-zinc-400">
                  <li className="flex justify-between p-2 bg-zinc-900 rounded-lg">
                    <span>Andi Pratama (Kelas 12 IPA)</span>
                    <span className="text-indigo-400">Terverifikasi</span>
                  </li>
                  <li className="flex justify-between p-2 bg-zinc-900 rounded-lg">
                    <span>Dewi Lestari (Kelas 11 IPS)</span>
                    <span className="text-indigo-400">Terverifikasi</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. TAB PENGATURAN SPP & DATA */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-2">Pengaturan SPP & Konfigurasi Sistem</h2>
            <p className="text-zinc-400 text-sm mb-6">Atur nominal tagihan bulanan dan parameter database untuk tenant {tenantId}.</p>

            <div className="space-y-4 max-w-xl">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Nominal SPP Bulanan (Rp)</label>
                <input 
                  type="text" 
                  defaultValue="350.000" 
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Status Koneksi Database (Neon PostgreSQL)</label>
                <div className="flex items-center gap-2 p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-emerald-400 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Terhubung Aman ke Neon DB (Multi-Tenant Active)
                </div>
              </div>

              <button className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold rounded-xl transition-all cursor-pointer">
                Simpan Perubahan Pengaturan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}