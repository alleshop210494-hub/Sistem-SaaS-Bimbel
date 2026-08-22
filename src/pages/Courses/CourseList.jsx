import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';

export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await apiService.getCourses();
        setCourses(data);
      } catch (error) {
        console.error('Gagal memuat kursus:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-gray-500 font-medium animate-pulse">
          Memuat daftar kursus dari cloud database...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900">
          Daftar Kursus & Materi Bimbel
        </h1>
        <p className="text-gray-600 mt-2">
          Pilih mata pelajaran terbaik untuk meningkatkan prestasi akademikmu.
        </p>
      </div>

      {/* Grid Responsif: 1 kolom di HP, 2 di Tablet/iPad, 4 di Laptop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col justify-between hover:shadow-lg transition-shadow"
          >
            <div className="p-5">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-semibold px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full">
                  {course.category}
                </span>
                <span className="text-sm font-bold text-yellow-500">
                  ⭐ {course.rating}
                </span>
              </div>
              <h3 className="font-bold text-lg text-gray-800 mb-1">
                {course.title}
              </h3>
              <p className="text-sm text-gray-500">
                Pengajar: {course.instructor}
              </p>
            </div>
            <div className="px-5 pb-5 pt-2 border-t border-gray-50 flex items-center justify-between">
              <span className="font-semibold text-blue-600 text-sm">
                {course.price}
              </span>
              <button
                onClick={() => alert(`Memulai belajar: ${course.title}`)}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors cursor-pointer"
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
