import React from 'react';

export default function Home({ setActivePage }) {
  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center text-center px-4 py-12 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-3xl">
        <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
          Platform Belajar Online No. 1
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 mt-4 leading-tight">
          Raih Impian Akademikmu Bersama{' '}
          <span className="text-blue-600">BimbelOnline</span>
        </h1>
        <p className="text-base sm:text-lg text-gray-600 mt-4">
          Nikmati kemudahan belajar interaktif, materi terstruktur, dan tryout
          ujian online kapan saja serta di mana saja.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => setActivePage('courses')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg shadow-md transition-all"
          >
            Mulai Belajar Sekarang
          </button>
          <button
            onClick={() => setActivePage('exam')}
            className="bg-white hover:bg-gray-50 text-blue-600 border border-blue-600 font-medium px-6 py-3 rounded-lg transition-all"
          >
            Coba Tryout Ujian
          </button>
        </div>
      </div>
    </div>
  );
}
