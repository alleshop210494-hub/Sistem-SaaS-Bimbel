import React, { useState } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home/Home';
import CourseList from './pages/Courses/CourseList';
import ExamRoom from './pages/Exam/ExamRoom';
import Dashboard from './pages/Dashboard/Dashboard';

export default function App() {
  const [activePage, setActivePage] = useState('home');

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Home setActivePage={setActivePage} />;
      case 'courses':
        return <CourseList />;
      case 'exam':
        return <ExamRoom />;
      case 'dashboard':
        return <Dashboard />;
      case 'profile':
        return (
          <div className="p-8 text-center min-h-[60vh] flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-gray-800">Profil Pengguna</h2>
            <p className="text-gray-600 mt-2">Kelola informasi akun Anda yang divalidasi melalui Clerk Auth.</p>
          </div>
        );
      default:
        return <Home setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      <main className="flex-grow">{renderPage()}</main>
      <Footer />
    </div>
  );
}