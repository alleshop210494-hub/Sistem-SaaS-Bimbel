import React from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

export default function Navbar({ activePage, setActivePage }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-zinc-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold shadow-sm shadow-indigo-500/35">
            S
          </div>
          <span 
            onClick={() => setActivePage('home')}
            className="font-bold text-lg text-zinc-900 tracking-tight cursor-pointer"
          >
            Bimbel<span className="text-indigo-600">SaaS</span>
          </span>
        </div>
        
        <nav className="hidden md:flex items-center gap-1 bg-zinc-100/80 p-1 rounded-xl border border-zinc-200/50">
          {[
            { id: 'home', label: 'Beranda' },
            { id: 'courses', label: 'Kursus' },
            { id: 'dashboard', label: 'Dashboard' },
            { id: 'profile', label: 'Profil' },
          ].map((tab) => {
            const isActive = activePage === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActivePage(tab.id)}
                className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-white text-zinc-900 shadow-sm font-semibold' 
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/50'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Auth Clerk Section */}
        <div className="flex items-center gap-3">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-sm transition-all cursor-pointer">
                Masuk / Daftar
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}