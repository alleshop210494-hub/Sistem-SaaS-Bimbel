import React, { useState } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home/Home';
import CourseList from './pages/Courses/CourseList';
import Dashboard from './pages/Dashboard/Dashboard';
import MentorDashboard from './pages/Dashboard/MentorDashboard';
import AdminDashboard from './pages/Dashboard/AdminDashboard';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  // Peran pengguna: 'student', 'mentor', atau 'admin'
  const [userRole, setUserRole] = useState('student');

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Home setActivePage={setActivePage} />;
      case 'courses':
        return <CourseList />;
      case 'dashboard':
        if (userRole === 'admin') return <AdminDashboard />;
        if (userRole === 'mentor') return <MentorDashboard />;
        return <Dashboard />;
      case 'profile':
        return (
          <div className="p-8 text-center min-h-[60vh] flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold text-gray-800">Pengaturan Peran Akun</h2>
            <p className="text-gray-600 mt-2 mb-6">
              Simulasi Hak Akses Saat Ini: <strong className="uppercase text-blue-600">{userRole}</strong>
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button 
                onClick={() => setUserRole('student')}
                className={`px-4 py-2 rounded-lg font-medium cursor-pointer ${userRole === 'student' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                Mode Siswa
              </button>
              <button 
                onClick={() => setUserRole('mentor')}
                className={`px-4 py-2 rounded-lg font-medium cursor-pointer ${userRole === 'mentor' ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                Mode Mentor
              </button>
              <button 
                onClick={() => setUserRole('admin')}
                className={`px-4 py-2 rounded-lg font-medium cursor-pointer ${userRole === 'admin' ? 'bg-purple-700 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                Mode Pemilik / Admin
              </button>
            </div>
            <p className="text-sm text-gray-400 mt-8 max-w-md">
              (Tombol di atas mensimulasikan otorisasi peran multi-role yang nantinya akan dikelola otomatis oleh Clerk Auth di cloud).
            </p>
          </div>
        );
      default:
        return <Home setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      <main className="flex-grow">{renderPage()}</main>
      <Footer />
    </div>
  );
}