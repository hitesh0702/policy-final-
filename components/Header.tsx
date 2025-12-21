
import React from 'react';
import { Link } from 'react-router-dom';
import ShieldCheckIcon from './icons/ShieldCheckIcon';
import { supabase } from '../lib/supabase';

const Header: React.FC = () => {
  return (
    <header className="fixed top-8 left-0 right-0 z-50 px-6">
      <div className="glass-nav max-w-4xl mx-auto flex h-14 items-center justify-between rounded-full px-8 shadow-sm border border-neutral-100/50">
        <Link to="/" className="flex items-center space-x-2 group">
          <ShieldCheckIcon className="h-5 w-5 text-neutral-900 transition-transform group-hover:scale-110" />
          <span className="text-lg font-bold tracking-tight text-neutral-900">
            Policy<span className="font-medium opacity-40">Pulse</span>
          </span>
        </Link>
        <button
  onClick={() => supabase.auth.signInWithOtp({ email: prompt("Enter email")! })}
  className="px-4 py-2 rounded-full bg-black text-white text-sm font-bold"
>
  Sign In
</button>
        <nav className="flex items-center space-x-8 text-[12px] font-bold text-neutral-400 uppercase tracking-widest">
          <Link to="/" className="hover:text-neutral-900 transition-colors">Scan</Link>
          <button className="bg-neutral-900 text-white px-5 py-2 rounded-full text-[10px] font-bold hover:bg-neutral-800 transition-all shadow-lg shadow-neutral-900/10">
            Get Pro
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
