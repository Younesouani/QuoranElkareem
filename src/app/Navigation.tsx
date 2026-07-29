'use client';

import Link from 'next/link';
import { BookOpen, Users, Globe } from 'lucide-react';

interface NavigationProps {
  lang: 'en' | 'ar';
  setLang: (lang: 'en' | 'ar') => void;
  liveVisitors: number;
}

export default function Navigation({ lang, setLang, liveVisitors }: NavigationProps) {
  const isAr = lang === 'ar';

  return (
    <nav className="w-full border-b border-amber-500/20 bg-neutral-900/60 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 text-amber-300 font-bold text-lg hover:opacity-90 transition-opacity">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-neutral-950 font-black shadow-md shadow-amber-500/20">
            <BookOpen className="w-5 h-5" />
          </div>
          <span>{isAr ? 'القرآن الكريم' : 'Quran App'}</span>
        </Link>

        {/* Right Side: Live Visitors Badge + Language Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Live Visitor Indicator Badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <Users className="w-3.5 h-3.5 text-amber-400" />
            <span>{liveVisitors}</span>
          </div>

          {/* Language Toggle Button */}
          <button
            onClick={() => setLang(isAr ? 'en' : 'ar')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-amber-500/30 bg-neutral-950 text-amber-300 hover:bg-neutral-800 text-xs font-semibold transition-all cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span>{isAr ? 'English' : 'العربية'}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
