import React from 'react';

export default function Home({ setActivePage }) {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-zinc-50 flex flex-col justify-between">
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-32">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-6 tracking-wide uppercase">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
            Platform Edukasi Modern & Cloud-Native
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-zinc-900 tracking-tight max-w-4xl mx-auto leading-[1.15]">
            Transformasi Cara Belajar & Mengelola <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Bimbel Anda</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-zinc-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Sistem manajemen pembelajaran interaktif berbasis cloud untuk jenjang SD, SMP, SMA, dan persiapan UTBK berstandar tinggi.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => setActivePage('courses')}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg shadow-indigo-600/25 transition-all duration-200 cursor-pointer"
            >
              Jelajahi Kursus Belajar
            </button>
            <button
              onClick={() => setActivePage('dashboard')}
              className="px-6 py-3 rounded-xl bg-white hover:bg-zinc-100 text-zinc-800 font-semibold border border-zinc-200 shadow-sm transition-all duration-200 cursor-pointer"
            >
              Buka Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="bg-white border-t border-zinc-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Kurikulum Berjenjang', desc: 'Materi terstruktur khusus dari tingkat SD, SMP, hingga SMA dan persiapan masuk PTN.' },
              { title: 'Multi-Role System', desc: 'Hak akses terintegrasi khusus untuk Siswa, Mentor pengajar, hingga Pemilik Bimbel.' },
              { title: 'Cloud Database Ready', desc: 'Infrastruktur modern dengan performa tinggi yang aman, cepat, dan responsif.' }
            ].map((feat, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/60 hover:border-indigo-500/40 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold mb-4">
                  0{idx + 1}
                </div>
                <h3 className="font-bold text-zinc-900 text-lg mb-2">{feat.title}</h3>
                <p className="text-zinc-600 text-sm leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}