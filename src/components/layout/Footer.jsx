import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-400 border-t border-zinc-800 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
            S
          </div>
          <span className="text-white font-semibold tracking-tight">BimbelSaaS Platform</span>
        </div>
        <p className="text-sm text-zinc-500">
          &copy; {new Date().getFullYear()} BimbelSaaS. Seluruh hak cipta dilindungi.
        </p>
      </div>
    </footer>
  );
}