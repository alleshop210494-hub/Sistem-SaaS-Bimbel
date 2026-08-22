import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:flex sm:justify-between sm:text-left">
        <div className="mb-4 sm:mb-0">
          <h2 className="text-lg font-bold text-blue-400">BimbelOnline</h2>
          <p className="text-sm text-gray-400 mt-1">
            Solusi belajar interaktif dan fleksibel berbasis cloud.
          </p>
        </div>
        <div className="text-sm text-gray-400">
          <p>&copy; 2026 BimbelOnline. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
