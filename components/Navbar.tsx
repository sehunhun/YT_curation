
import React from 'react';
import { NAV_LINKS } from '../constants';

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-white/5 px-6 lg:px-12 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2 group cursor-pointer">
        <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center transform transition-transform group-hover:rotate-12">
           <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
             <path d="M4 4h16v4H4V4zm0 6h10v4H4v-4zm0 6h16v4H4v-4z" />
           </svg>
        </div>
        <span className="text-xl font-extrabold tracking-tight">AETHER</span>
      </div>

      <div className="hidden md:flex items-center gap-10">
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            {link.label}
          </a>
        ))}
        <button className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-6 rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-primary/20">
          Sign In
        </button>
      </div>

      <button className="md:hidden text-white">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
    </nav>
  );
};

export default Navbar;
