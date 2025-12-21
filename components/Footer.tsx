
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto py-16 px-6 border-t border-neutral-100">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="text-center md:text-left">
          <p className="text-sm font-bold text-neutral-900 uppercase tracking-widest">PolicyPulse</p>
          <p className="text-xs text-neutral-300 mt-2 font-medium">© {new Date().getFullYear()} Clarity Labs. Intelligence by Design.</p>
        </div>
        <div className="flex gap-10 text-[10px] font-black text-neutral-300 uppercase tracking-[0.2em]">
          <a href="#" className="hover:text-neutral-900 transition-colors">Legal</a>
          <a href="#" className="hover:text-neutral-900 transition-colors">Privacy</a>
          <a href="#" className="hover:text-neutral-900 transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
