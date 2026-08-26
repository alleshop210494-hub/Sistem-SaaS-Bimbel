// src/App.jsx - Full Combined Code with Role-Based Access Control (RBAC)
import React, { useState } from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";

// Impor komponen dashboard untuk masing-masing role
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import Dashboard from './pages/Dashboard/Dashboard';
import ParentDashboard from './pages/Dashboard/ParentDashboard';
import TeacherDashboard from './pages/Dashboard/TeacherDashboard';

export default function App() {
  const { user } = useUser();
  
  // Mengambil role dari Clerk publicMetadata (default ke 'student' jika belum diatur)
  // Anda bisa mengganti simulasi ini dengan: user?.publicMetadata?.role || 'student'
  const [currentRole, setCurrentRole] = useState('student'); 
  const [tenantId, setTenantId] = useState('bimbel-nusantara');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Deteksi role asli dari user metadata jika tersedia
  const userRole = user?.publicMetadata?.role || currentRole;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* 1. STATE BELUM LOGIN (Landing Page Auth) */}
      <SignedOut>
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-xl mx-auto">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-3xl font-extrabold shadow-lg shadow-indigo-500/30 mb-6 text-white">
            B
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">SaaS Bimbel Multi-Tenant</h1>
          <p className="text-zinc-400 mt-3 text-sm sm:text-base leading-relaxed">
            Platform manajemen bimbingan belajar profesional dengan keamanan terisolasi untuk Murid, Orang Tua, Guru, dan Admin.
          </p>
          <div className="mt-8">
            <SignInButton mode="modal">
              <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/25 transition-all cursor-pointer">
                Masuk ke Portal Bimbel
              </button>
            </SignInButton>
          </div>
        </div>
      </SignedOut>

      {/* 2. STATE SUDAH LOGIN (Tampilan Web App Berdasarkan Role) */}
      <SignedIn>
        <div className="flex h-screen overflow-hidden bg-zinc-900">
          
          {/* SIDEBAR NAVIGATION */}
          <aside className={`w-64 bg-zinc-950 border-r border-zinc-800 flex flex-col transition-all duration-300 z-20 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0 md:w-20'}`}>
            
            {/* Logo & Workspace Name */}
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

            {/* Menu Navigasi Berdasarkan Hak Akses Role */}
            <div className="flex-1 overflow-y-auto p-3 space-y-1">
              <p className={`text-[10px] uppercase tracking-wider font-bold text-zinc-400 mb-2 px-2 ${!sidebarOpen && 'md:hidden'}`}>
                Menu Utama ({userRole.toUpperCase()})
              </p>

              {/* Tampilkan menu eksklusif sesuai role pengguna */}
              {userRole === 'student' && (
                <div className="space-y-1">
                  <div className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-white bg-indigo-600">
                    <span>🎓</span>
                    <span className={`${!sidebarOpen && 'md:hidden'}`}>Dashboard Murid</span>
                  </div>
                </div>
              )}

              {userRole === 'parent' && (
                <div className="space-y-1">
                  <div className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-white bg-emerald-600">
                    <span>👨‍👩‍👦</span>
                    <span className={`${!sidebarOpen && 'md:hidden'}`}>Portal Orang Tua</span>
                  </div>
                </div>
              )}

              {userRole === 'teacher' && (
                <div className="space-y-1">
                  <div className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-white bg-indigo-600">
                    <span>👨‍🏫</span>
                    <span className={`${!sidebarOpen && 'md:hidden'}`}>Portal Guru / Mentor</span>
                  </div>
                </div>
              )}

              {userRole === 'admin' && (
                <div className="space-y-1">
                  <div className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-white bg-zinc-800 border border-zinc-700">
                    <span>⚙️</span>
                    <span className={`${!sidebarOpen && 'md:hidden'}`}>Admin & Semua Data</span>
                  </div>
                </div>
              )}

              {/* Panel Simulasi / Debug untuk pengujian lokal (Opsional) */}
              <div className="pt-6 border-t border-zinc-800/80 mt-6">
                <p className={`text-[10px] uppercase tracking-wider font-bold text-zinc-400 mb-2 px-2 ${!sidebarOpen && 'md:hidden'}`}>
                  Simulasi Ganti Role
                </p>
                <div className="grid grid-cols-2 gap-1">
                  {['student', 'parent', 'teacher', 'admin'].map((r) => (
                    <button
                      key={r}
                      onClick={() => setCurrentRole(r)}
                      className={`px-2 py-1.5 rounded-lg text-[10px] font-semibold uppercase transition-all cursor-pointer ${
                        currentRole === r ? 'bg-indigo-600 text-white' : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* User Profile di Bawah Sidebar */}
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

          {/* MAIN CONTENT AREA */}
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-zinc-950">
            
            {/* TOP BAR */}
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
                    Akses Aktif: {userRole.toUpperCase()} Workspace
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center bg-zinc-950 border border-zinc-800 px-3 py-1.5 rounded-xl text-xs text-zinc-400">
                  <span className="text-zinc-300 font-semibold mr-2">Tenant:</span> {tenantId}
                </div>
              </div>
            </header>

            {/* DYNAMIC WORKSPACE CONTENT: Memastikan hanya merender sesuai role */}
            <main className="flex-1 overflow-y-auto bg-zinc-950 p-4 sm:p-8">
              <div className="max-w-7xl mx-auto">
                {userRole === 'admin' && <AdminDashboard tenantId={tenantId} />}
                {userRole === 'student' && <Dashboard tenantId={tenantId} />}
                {userRole === 'parent' && <ParentDashboard tenantId={tenantId} />}
                {userRole === 'teacher' && <TeacherDashboard tenantId={tenantId} />}
              </div>
            </main>

          </div>

        </div>
      </SignedIn>

    </div>
  );
}