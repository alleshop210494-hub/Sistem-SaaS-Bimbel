// src/App.jsx - Full Combined Code with Interactive Admin Sidebar Tabs
import React, { useState } from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";

import AdminDashboard from './pages/Dashboard/AdminDashboard';
import Dashboard from './pages/Dashboard/Dashboard';
import ParentDashboard from './pages/Dashboard/ParentDashboard';
import TeacherDashboard from './pages/Dashboard/TeacherDashboard';

export default function App() {
  const { user } = useUser();
  const [tenantId, setTenantId] = useState('bimbel-nusantara');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  
  // State untuk mengontrol tab aktif khusus Admin
  const [adminTab, setAdminTab] = useState('dashboard');

  const userRole = user?.publicMetadata?.role;

  // Fungsi untuk mengirim permintaan simpan role secara aman melalui backend API
  const handleSelectRole = async (selectedRole) => {
    try {
      setIsUpdating(true);
      
      const response = await fetch('/api/update-role', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          role: selectedRole,
        }),
      });

      if (!response.ok) {
        throw new Error('Gagal menyimpan role ke server');
      }

      // Muat ulang halaman agar sesi/metadata terbaru terbaca oleh Clerk
      window.location.reload();
    } catch (error) {
      console.error("Gagal menyimpan role:", error);
      setIsUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* 1. STATE BELUM LOGIN */}
      <SignedOut>
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-xl mx-auto">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-3xl font-extrabold shadow-lg shadow-indigo-500/30 mb-6 text-white">
            B
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">SaaS Bimbel Multi-Tenant</h1>
          <p className="text-zinc-400 mt-3 text-sm sm:text-base leading-relaxed">
            Platform manajemen bimbingan belajar profesional dengan portal terisolasi untuk Murid, Orang Tua, Guru, dan Admin.
          </p>
          <div className="mt-8">
            <SignInButton mode="modal">
              <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/25 transition-all cursor-pointer">
                Masuk / Daftar Akun
              </button>
            </SignInButton>
          </div>
        </div>
      </SignedOut>

      {/* 2. STATE SUDAH LOGIN */}
      <SignedIn>
        {!userRole ? (
          /* LAYAR ONBOARDING PEMILIHAN PERAN */
          <div className="flex-1 flex flex-col items-center justify-center p-6 bg-zinc-950">
            <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl text-center">
              <div className="w-12 h-12 bg-indigo-600/20 text-indigo-400 rounded-xl flex items-center justify-center text-xl font-bold mx-auto mb-4">
                👋
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Selamat Datang di Bimbel Hub!</h2>
              <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                Silakan pilih peran atau status Anda di dalam sistem agar kami dapat menyiapkan halaman dan hak akses input data yang tepat:
              </p>

              <div className="space-y-3">
                <button
                  disabled={isUpdating}
                  onClick={() => handleSelectRole('student')}
                  className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
                >
                  <span>🎓</span> Saya sebagai Murid
                </button>
                
                <button
                  disabled={isUpdating}
                  onClick={() => handleSelectRole('parent')}
                  className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
                >
                  <span>👨‍👩‍👦</span> Saya sebagai Orang Tua
                </button>

                <button
                  disabled={isUpdating}
                  onClick={() => handleSelectRole('teacher')}
                  className="w-full py-3 px-4 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
                >
                  <span>👨‍🏫</span> Saya sebagai Guru / Mentor
                </button>

                <button
                  disabled={isUpdating}
                  onClick={() => handleSelectRole('admin')}
                  className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
                >
                  <span>🛡️</span> Saya sebagai Admin
                </button>
              </div>

              {isUpdating && (
                <p className="text-xs text-indigo-400 mt-4 animate-pulse">Menyimpan pilihan peran Anda ke server...</p>
              )}
            </div>
          </div>
        ) : (
          /* DASHBOARD UTAMA SESUAI PERAN */
          <div className="flex h-screen overflow-hidden bg-zinc-900">
            
            <aside className={`w-64 bg-zinc-950 border-r border-zinc-800 flex flex-col transition-all duration-300 z-20 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0 md:w-20'}`}>
              
              <div className="p-4 border-b border-zinc-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center font-bold text-white shrink-0 shadow-md">
                    B
                  </div>
                  <div className={`transition-opacity duration-200 ${!sidebarOpen && 'md:hidden'}`}>
                    <h2 className="font-bold text-sm text-zinc-100 truncate">Bimbel Hub</h2>
                    <p className="text-[11px] text-zinc-400 truncate">Tenant: {tenantId}</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-3 space-y-2">
                <p className={`text-[10px] uppercase tracking-wider font-bold text-zinc-400 mb-2 px-2 ${!sidebarOpen && 'md:hidden'}`}>
                  Menu Navigasi ({userRole.toUpperCase()})
                </p>

                {userRole === 'student' && (
                  <div className="space-y-1">
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-white bg-indigo-600 text-left cursor-pointer">
                      <span>🎓</span>
                      <span className={`${!sidebarOpen && 'md:hidden'}`}>Dashboard Murid</span>
                    </button>
                  </div>
                )}

                {userRole === 'parent' && (
                  <div className="space-y-1">
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-white bg-emerald-600 text-left cursor-pointer">
                      <span>👨‍👩‍👦</span>
                      <span className={`${!sidebarOpen && 'md:hidden'}`}>Portal Orang Tua</span>
                    </button>
                  </div>
                )}

                {userRole === 'teacher' && (
                  <div className="space-y-1">
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-white bg-amber-600 text-left cursor-pointer">
                      <span>👨‍🏫</span>
                      <span className={`${!sidebarOpen && 'md:hidden'}`}>Portal Guru / Mentor</span>
                    </button>
                  </div>
                )}

                {userRole === 'admin' && (
                  <div className="space-y-1">
                    {/* Tab Admin Utama */}
                    <button 
                      onClick={() => setAdminTab('dashboard')}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-left transition-all cursor-pointer ${
                        adminTab === 'dashboard' 
                          ? 'bg-purple-600 text-white shadow-md' 
                          : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
                      }`}
                    >
                      <span>🛡️</span>
                      <span className={`${!sidebarOpen && 'md:hidden'}`}>Admin Utama</span>
                    </button>

                    {/* Tab Kelola Guru, Murid & Kelas */}
                    <button 
                      onClick={() => setAdminTab('manage')}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-left transition-all cursor-pointer ${
                        adminTab === 'manage' 
                          ? 'bg-purple-600 text-white shadow-md' 
                          : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
                      }`}
                    >
                      <span>⚙️</span>
                      <span className={`${!sidebarOpen && 'md:hidden'}`}>Kelola Guru, Murid & Kelas</span>
                    </button>

                    {/* Tab Pengaturan SPP & Data */}
                    <button 
                      onClick={() => setAdminTab('settings')}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-left transition-all cursor-pointer ${
                        adminTab === 'settings' 
                          ? 'bg-purple-600 text-white shadow-md' 
                          : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
                      }`}
                    >
                      <span>💰</span>
                      <span className={`${!sidebarOpen && 'md:hidden'}`}>Pengaturan SPP & Data</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="p-3 border-t border-zinc-800/80 flex items-center justify-between bg-zinc-950/50">
                <div className="flex items-center gap-3 overflow-hidden">
                  <UserButton afterSignOutUrl="/" />
                  <div className={`text-xs overflow-hidden ${!sidebarOpen && 'md:hidden'}`}>
                    <p className="font-semibold text-zinc-200 truncate">{user?.fullName || 'Pengguna'}</p>
                    <p className="text-[10px] text-emerald-400 font-medium capitalize">Role: {userRole}</p>
                  </div>
                </div>
              </div>
            </aside>

            <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-zinc-950">
              
              <header className="h-16 bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800 flex items-center justify-between px-6 z-10">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-lg transition-all cursor-pointer"
                    title="Toggle Sidebar"
                  >
                    ☰
                  </button>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-xs font-semibold text-zinc-400 tracking-wide uppercase">
                      Workspace: {userRole.toUpperCase()} {userRole === 'admin' ? `(${adminTab})` : ''}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex items-center bg-zinc-950 border border-zinc-800 px-3 py-1.5 rounded-xl text-xs text-zinc-400">
                    <span className="text-zinc-300 font-semibold mr-2">Tenant:</span> {tenantId}
                  </div>
                </div>
              </header>

              <main className="flex-1 overflow-y-auto bg-zinc-950 p-4 sm:p-8">
                <div className="max-w-7xl mx-auto">
                  {userRole === 'admin' && (
                    <>
                      {adminTab === 'dashboard' && <AdminDashboard tenantId={tenantId} />}
                      {adminTab === 'manage' && (
                        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl">
                          <h2 className="text-xl font-bold text-white mb-2">Kelola Guru, Murid & Kelas</h2>
                          <p className="text-zinc-400 text-sm">Panel manajemen data master guru, pendaftaran murid, serta pengaturan kelas bimbingan.</p>
                        </div>
                      )}
                      {adminTab === 'settings' && (
                        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl">
                          <h2 className="text-xl font-bold text-white mb-2">Pengaturan SPP & Data</h2>
                          <p className="text-zinc-400 text-sm">Panel konfigurasi tarif pembayaran SPP bulanan, pencatatan transaksi, dan pengelolaan database.</p>
                        </div>
                      )}
                    </>
                  )}
                  {userRole === 'student' && <Dashboard tenantId={tenantId} />}
                  {userRole === 'parent' && <ParentDashboard tenantId={tenantId} />}
                  {userRole === 'teacher' && <TeacherDashboard tenantId={tenantId} />}
                </div>
              </main>

            </div>

          </div>
        )}
      </SignedIn>

    </div>
  );
}