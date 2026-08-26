// src/App.jsx - Full Combined Code for SaaS Web App Layout (App Shell)
import React, { useState } from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

// Impor komponen dashboard yang sudah kita buat
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import Dashboard from './pages/Dashboard/Dashboard';
import ParentDashboard from './pages/Dashboard/ParentDashboard';
import TeacherDashboard from './pages/Dashboard/TeacherDashboard';

export default function App() {
  // Simulasi pemilihan role untuk demo SaaS (bisa diintegrasikan dengan metadata Clerk nantinya)
  const [currentRole, setCurrentRole] = useState('student'); // 'admin' | 'student' | 'parent' | 'teacher'
  const [tenantId, setTenantId] = useState('bimbel-nusantara');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* 1. STATE BELUM LOGIN (Landing Page khusus Auth/Login) */}
      <SignedOut>
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-xl mx-auto">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-3xl font-extrabold shadow-lg shadow-indigo-500/30 mb-6">
            B
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">SaaS Bimbel Multi-Tenant</h1>
          <p className="text-zinc-400 mt-3 text-sm sm:text-base leading-relaxed">
            Platform manajemen bimbingan belajar profesional yang aman, terisolasi, dan terintegrasi penuh dengan Cloud Database Neon & Vercel Serverless.
          </p>
          <div className="mt-8">
            <SignInButton mode="modal">
              <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/20 transition-all cursor-pointer">
                Masuk ke Aplikasi Workspace
              </button>
            </SignInButton>
          </div>
        </div>
      </SignedOut>

      {/* 2. STATE SUDAH LOGIN (Tampilan Web App / Dashboard Workspace) */}
      <SignedIn>
        <div className="flex h-screen overflow-hidden bg-zinc-900">
          
          {/* SIDEBAR NAVIGATION (Khas Web App) */}
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

            {/* Role Switcher untuk Demo SaaS */}
            <div className="p-3 border-b border-zinc-800/80">
              <p className={`text-[10px] uppercase tracking-wider font-bold text-zinc-300 mb-2 px-2 ${!sidebarOpen && 'md:hidden'}`}>
                Simulasi Role App
              </p>
              <div className="space-y-1">
                {[
                  { id: 'student', label: 'Murid', icon: '🎓' },
                  { id: 'parent', label: 'Orang Tua', icon: '👨‍👩‍👦' },
                  { id: 'teacher', label: 'Guru / Mentor', icon: '👨‍🏫' },
                  { id: 'admin', label: 'Admin Bimbel', icon: '⚙️' }
                ].map((role) => (
                  <button
                    key={role.id}
                    onClick={() => setCurrentRole(role.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      currentRole === role.id 
                        ? 'bg-indigo-600 text-white shadow-sm' 
                        : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
                    }`}
                  >
                    <span className="text-base">{role.icon}</span>
                    <span className={`${!sidebarOpen && 'md:hidden'}`}>{role.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation Links Utama */}
            <div className="flex-1 overflow-y-auto p-3 space-y-1">
              <p className={`text-[10px] uppercase tracking-wider font-bold text-zinc-300 mb-2 px-2 ${!sidebarOpen && 'md:hidden'}`}>
                Menu Utama
              </p>
              <a 
                href="#dashboard" 
                onClick={(e) => e.preventDefault()}
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-zinc-300 bg-zinc-900/80 border border-zinc-800"
              >
                <span>📊</span>
                <span className={`${!sidebarOpen && 'md:hidden'}`}>Dashboard Workspace</span>
              </a>
              <a 
                href="#settings" 
                onClick={(e) => e.preventDefault()}
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200 transition-all"
              >
                <span>🔒</span>
                <span className={`${!sidebarOpen && 'md:hidden'}`}>Keamanan & Tenant</span>
              </a>
            </div>

            {/* User Profile di Bawah Sidebar */}
            <div className="p-3 border-t border-zinc-800/80 flex items-center justify-between bg-zinc-950/50">
              <div className="flex items-center gap-3 overflow-hidden">
                <UserButton afterSignOutUrl="/" />
                <div className={`text-xs overflow-hidden ${!sidebarOpen && 'md:hidden'}`}>
                  <p className="font-semibold text-zinc-200 truncate">Akun Aktif</p>
                  <p className="text-[10px] text-emerald-400 font-medium">Online (Terisolasi)</p>
                </div>
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT AREA (Khas Web App Workspace) */}
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
                    Mode Web App SaaS Active ({currentRole.toUpperCase()})
                  </span>
                </div>
              </div>

              {/* Status Tenant & Search Bar Mini */}
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center bg-zinc-950 border border-zinc-800 px-3 py-1.5 rounded-xl text-xs text-zinc-400">
                  <span className="text-zinc-300 font-semibold mr-2">Tenant:</span> {tenantId}
                </div>
              </div>
            </header>

            {/* DYNAMIC WORKSPACE CONTENT SESUAI ROLE */}
            <main className="flex-1 overflow-y-auto bg-zinc-950 p-4 sm:p-8">
              <div className="max-w-7xl mx-auto">
                {currentRole === 'admin' && <AdminDashboard tenantId={tenantId} />}
                {currentRole === 'student' && <Dashboard tenantId={tenantId} />}
                {currentRole === 'parent' && <ParentDashboard tenantId={tenantId} />}
                {currentRole === 'teacher' && <TeacherDashboard tenantId={tenantId} />}
              </div>
            </main>

          </div>

        </div>
      </SignedIn>

    </div>
  );
}