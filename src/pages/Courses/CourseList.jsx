import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';

export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState('Semua');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await apiService.getCourses();
        setCourses(data);
      } catch (error) {
        console.error("Gagal memuat kursus:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const filteredCourses = selectedLevel === 'Semua' 
    ? courses 
    : courses.filter(c => c.category === selectedLevel);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-zinc-500 font-medium animate-pulse">Memuat modul pembelajaran...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight">Modul Belajar Siswa (SD - SMA)</h1>
        <p className="text-zinc-600 mt-2 max-w-xl mx-auto">Pilih materi pelajaran berkualitas tinggi sesuai jenjang pendidikanmu.</p>
      </div>

      {/* Filter Jenjang */}
      <div className="flex justify-center gap-2 mb-10 flex-wrap">
        {['Semua', 'SD', 'SMP', 'SMA'].map((level) => (
          <button
            key={level}
            onClick={() => setSelectedLevel(level)}
            className={`px-4 py-2 rounded-xl font-medium text-sm transition-all cursor-pointer ${
              selectedLevel === level
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-50'
            }`}
          >
            Jenjang {level}
          </button>
        ))}
      </div>

      {/* Grid Kursus Responsif */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-zinc-200/80 overflow-hidden flex flex-col justify-between transition-all duration-300 group">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-semibold px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100">
                  Kelas {course.category}
                </span>
                <span className="text-sm font-bold text-amber-500 flex items-center gap-1">⭐ {course.rating}</span>
              </div>
              <h3 className="font-bold text-lg text-zinc-900 mb-2 group-hover:text-indigo-600 transition-colors">{course.title}</h3>
              <p className="text-sm text-zinc-500">Mentor: <span className="text-zinc-700 font-medium">{course.instructor}</span></p>
            </div>
            <div className="px-6 pb-6 pt-3 border-t border-zinc-100 flex items-center justify-between bg-zinc-50/50">
              <span className="font-bold text-indigo-600 text-sm">{course.price}</span>
              <button 
                onClick={() => alert(`Masuk ke materi: ${course.title}`)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-sm transition-all cursor-pointer"
              >
                Pelajari
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}