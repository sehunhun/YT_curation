
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/5 py-10 px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6 text-gray-500 text-sm font-medium bg-background">
      <div className="flex items-center gap-1">
        <span>© {currentYear} Aether Minimalist Service. All rights reserved.</span>
      </div>
      
      <div className="flex items-center gap-8">
        <a href="#" className="hover:text-primary transition-colors">Twitter</a>
        <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
        <a href="#" className="hover:text-primary transition-colors">Privacy</a>
        <a href="#" className="hover:text-primary transition-colors">Terms</a>
      </div>
    </footer>
  );
};

export default Footer;
