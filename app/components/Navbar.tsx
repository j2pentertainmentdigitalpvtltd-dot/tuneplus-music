'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const DASHBOARD_URL = 'https://app.tuneplusmusic.com'; 
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled || mobileMenuOpen ? 'bg-[#010205]/95 backdrop-blur-xl border-b border-white/[0.05] py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between relative z-10">
        <Link href="/" className="flex items-center gap-3 group h-12">
           <div className="relative w-48 h-full group-hover:scale-105 transition-transform">
              <Image src="/logos/tuneplus-logo.png" alt="TunePlus Logo" fill className="object-contain object-left drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]" priority/>
           </div>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden xl:flex items-center gap-6 font-bold text-[11px] uppercase tracking-widest text-slate-400">
          <Link href="/features" className="hover:text-white transition-colors">Features</Link>
          <Link href="/services" className="hover:text-white transition-colors">Services</Link>
          <Link href="/splits" className="hover:text-white transition-colors">Splits</Link>
          <Link href="/accelerator" className="hover:text-white transition-colors">Accelerator</Link>
          <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
          <Link href="/stores" className="hover:text-white transition-colors">Stores</Link>
          <Link href="/white-label" className="text-cyan-400 hover:text-cyan-300 transition-colors drop-shadow-[0_0_5px_rgba(6,182,212,0.5)]">White Label SaaS</Link>
        </div>

        <div className="hidden xl:flex items-center gap-6">
          <a href={`${DASHBOARD_URL}/login`} className="font-bold text-[12px] uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Login</a>
          <a href={`${DASHBOARD_URL}/signup`} className="group relative overflow-hidden inline-flex bg-cyan-600 text-white px-8 py-3.5 rounded-full font-bold text-[12px] uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]">
            <span className="relative z-10 transition-colors group-hover:text-white">Sign Up Free</span>
            <div className="absolute inset-0 h-full w-0 bg-blue-600 transition-all duration-300 ease-out group-hover:w-full z-0"></div>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          className="xl:hidden text-white p-2 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} className="text-cyan-400" /> : <Menu size={28} className="text-white" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden absolute top-full left-0 w-full bg-[#010205]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl py-6 px-6 flex flex-col gap-6">
          <Link href="/features" onClick={closeMobileMenu} className="font-bold text-[13px] uppercase tracking-widest text-slate-300 hover:text-white">Features</Link>
          <Link href="/services" onClick={closeMobileMenu} className="font-bold text-[13px] uppercase tracking-widest text-slate-300 hover:text-white">Services</Link>
          <Link href="/splits" onClick={closeMobileMenu} className="font-bold text-[13px] uppercase tracking-widest text-slate-300 hover:text-white">Splits</Link>
          <Link href="/accelerator" onClick={closeMobileMenu} className="font-bold text-[13px] uppercase tracking-widest text-slate-300 hover:text-white">Accelerator</Link>
          <Link href="/pricing" onClick={closeMobileMenu} className="font-bold text-[13px] uppercase tracking-widest text-slate-300 hover:text-white">Pricing</Link>
          <Link href="/stores" onClick={closeMobileMenu} className="font-bold text-[13px] uppercase tracking-widest text-slate-300 hover:text-white">Stores</Link>
          <Link href="/white-label" onClick={closeMobileMenu} className="font-bold text-[13px] uppercase tracking-widest text-cyan-400 drop-shadow-[0_0_5px_rgba(6,182,212,0.5)]">White Label SaaS</Link>
          
          <div className="w-full h-[1px] bg-white/10 my-2"></div>
          
          <a href={`${DASHBOARD_URL}/login`} onClick={closeMobileMenu} className="font-bold text-[13px] uppercase tracking-widest text-slate-300 hover:text-white">Login</a>
          <a href={`${DASHBOARD_URL}/signup`} onClick={closeMobileMenu} className="bg-cyan-600 text-white text-center px-8 py-4 rounded-full font-bold text-[13px] uppercase tracking-widest shadow-[0_0_20px_rgba(6,182,212,0.3)]">
            Sign Up Free
          </a>
        </div>
      )}
    </nav>
  );
}