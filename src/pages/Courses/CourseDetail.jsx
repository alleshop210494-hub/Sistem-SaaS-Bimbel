import React from 'react';

export default function CourseDetail({ course, onBack }) {
  if (!course) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button 
        onClick={onBack}
        className="mb-6 inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
      >
        &larr; Kembali ke Daftar Kursus
      </button>

      <div className="bg-white rounded-2xl shadow-sm border border-zinc-200/80 p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <span className="text-xs font-semibold px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100">
            Kelas {course.category}
          </span>
          <span className="text-sm font-bold text-amber-500">⭐ {course.rating} / 5.0</span>
        </div>

        <h1 className="text-3xl font-extrabold text-zinc-900 mb-3">{course.title}</h1>
        <p className="text-zinc-600 mb-6 text-base">Mentor Pengajar: <span className="font-semibold text-zinc-800">{course.instructor}</span></p>

        <div className="border-t border-zinc-100 pt-6 mt-6">
          <h3 className="font-bold text-lg text-zinc-900 mb-3">Deskripsi & Materi Pembelajaran</h3>
          <p className="text-zinc-600 leading-relaxed mb-6">
            Modul komprehensif dirancang khusus untuk siswa tingkat {course.category}. Berisi video pembelajaran interaktif, latihan soal berkala, serta pembahasan mendalam bersama mentor ahli.
          </p>

          <div className="bg-zinc-50 p-6 rounded-xl border border-zinc-200/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs text-zinc-500 uppercase font-bold tracking-wider">Status Akses Modul</p>
              <p className="text-xl font-extrabold text-indigo-600 mt-1">{course.price}</p>
            </div>
            <button 
              onClick={() => alert(`Anda berhasil bergabung ke kelas: ${course.title}`)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition-all cursor-pointer w-full sm:w-auto"
            >
              Mulai Belajar Sekarang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}