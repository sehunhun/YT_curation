
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full border-t border-white/10 py-10 px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6 text-gray-500 text-sm font-medium bg-background/85 backdrop-blur-lg">
      {/* Footer 상단 그라데이션 오버레이 */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-background/60 pointer-events-none" />
      <div className="relative z-10 w-full flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-1">
        <span>© {currentYear} Aether Minimalist Service. All rights reserved.</span>
      </div>
      
      <div className="flex items-center gap-8">
        <a href="#" className="hover:text-primary transition-colors">Twitter</a>
        <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
        <a href="#" className="hover:text-primary transition-colors">Privacy</a>
        <a href="#" className="hover:text-primary transition-colors">Terms</a>
      </div>
      </div>
    </footer>
  );
};

export default Footer;
