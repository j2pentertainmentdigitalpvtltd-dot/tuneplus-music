'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Music, ArrowRight, Globe, ShieldCheck, 
  PlayCircle, CheckCircle2, MonitorPlay, 
  UploadCloud, DollarSign, BarChart3, Headphones
} from 'lucide-react';

export default function SellYourMusicPage() {
  const DASHBOARD_URL = 'https://app.tuneplusmusic.com'; 

  return (
    <div className="min-h-screen bg-[#020617] font-sans text-slate-200 selection:bg-blue-500/30 text-left overflow-x-hidden">
      
      {/* ================= NAVBAR ================= */}
      <nav className="fixed top-0 w-full bg-[#020617]/80 backdrop-blur-xl border-b border-white/5 z-50 transition-all duration-300">
        <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-500/20">
              <Music size={22} />
            </div>
            <span className="text-2xl font-black tracking-tighter italic uppercase text-white">
              Tune<span className="text-blue-500">Plus</span>
            </span>
          </Link>
          
          <div className="hidden lg:flex items-center gap-8 font-black text-[11px] uppercase tracking-widest text-slate-400">
            <Link href="/sell-your-music" className="text-white transition-colors">Sell Your Music</Link>
            <Link href="/services" className="hover:text-white transition-colors">Artist Services</Link>
            <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="/splits" className="hover:text-white transition-colors">Splits</Link>
            <Link href="/accelerator" className="hover:text-white transition-colors">Accelerator</Link>
          </div>

          <div className="flex items-center gap-6">
            <a href={`${DASHBOARD_URL}/login`} className="hidden md:block font-black text-[11px] uppercase tracking-widest text-slate-400 hover:text-white transition-colors">
              Login
            </a>
            <a href={`${DASHBOARD_URL}/signup`} className="bg-blue-600 text-white px-8 py-3 rounded-full font-black text-[11px] uppercase tracking-widest hover:bg-blue-500 hover:-translate-y-0.5 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)]">
              Sign Up Free
            </a>
          </div>
        </div>
      </nav>

      {/* ================= CINEMATIC HERO SECTION ================= */}
      <section className="relative pt-48 pb-32 px-6 flex flex-col items-center justify-center text-center overflow-hidden min-h-[95vh]">
        {/* Deep Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-to-r from-blue-600/20 to-cyan-500/20 blur-[150px] rounded-full pointer-events-none"></div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-black text-[10px] uppercase tracking-widest mb-8">
            <Globe size={14}/> Unlimited Global Distribution
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-black italic uppercase tracking-tighter text-white mb-6 leading-[0.9]">
            Release Music.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Retain Rights.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-400 font-medium mb-12 max-w-3xl mx-auto leading-relaxed">
            Get your music on Spotify, Apple Music, YouTube, JioSaavn, Baahi, and 150+ stores worldwide. Keep 100% of your ownership and stay in total control.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href={`${DASHBOARD_URL}/signup`} className="w-full sm:w-auto bg-blue-600 text-white px-14 py-6 rounded-full font-black text-sm uppercase tracking-[0.2em] hover:bg-blue-500 transition-all shadow-[0_0_50px_rgba(37,99,235,0.4)] flex items-center justify-center gap-3">
              Start Distributing <ArrowRight size={18} />
            </a>
            <a href="#how-it-works" className="w-full sm:w-auto bg-transparent border border-white/20 text-white px-14 py-6 rounded-full font-black text-sm uppercase tracking-[0.2em] hover:bg-white/5 transition-all flex items-center justify-center gap-3">
              See How It Works
            </a>
          </div>
        </div>
      </section>

      {/* ================= 150+ STORES LOGOS (TuneCore Style) ================= */}
      <section className="py-16 bg-[#050b14] border-y border-white/5 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            <h3 className="text-3xl font-black italic tracking-tighter text-white">Spotify</h3>
            <h3 className="text-3xl font-black italic tracking-tighter text-white">Apple Music</h3>
            <h3 className="text-3xl font-black italic tracking-tighter text-white">YouTube</h3>
            <h3 className="text-3xl font-black italic tracking-tighter text-white">JioSaavn</h3>
            <h3 className="text-3xl font-black italic tracking-tighter text-white">Instagram</h3>
            <h3 className="text-3xl font-black italic tracking-tighter text-white">TikTok</h3>
            <h3 className="text-3xl font-black italic tracking-tighter text-white">Baahi</h3>
          </div>
        </div>
      </section>

      {/* ================= HOW TO SELL YOUR MUSIC (Step by Step) ================= */}
      <section id="how-it-works" className="py-32 px-6 max-w-[1400px] mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white mb-6">How to Sell Your <span className="text-blue-500">Music</span> Online</h2>
          <p className="text-lg text-slate-400 font-medium max-w-3xl mx-auto leading-relaxed">
            Before modern platforms, artists needed a label to get their music sold online. We are disrupting the industry by partnering directly with Digital Stores to allow any musician to sell their songs worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Step 1 */}
          <div className="bg-[#0a1122] rounded-[3rem] p-12 border border-slate-800 relative hover:-translate-y-2 transition-transform duration-300">
            <div className="text-8xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-slate-800 to-transparent absolute top-6 right-6 pointer-events-none">1</div>
            <div className="w-20 h-20 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 mb-8 border border-blue-500/20">
              <UploadCloud size={40} />
            </div>
            <h3 className="text-2xl font-black italic uppercase text-white mb-4">Upload Your Music</h3>
            <p className="text-slate-400 font-medium leading-relaxed">
              Upload your tracks, artwork, and release information in minutes. Our intuitive dashboard makes submitting your music a breeze.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-[#0a1122] rounded-[3rem] p-12 border border-slate-800 relative hover:-translate-y-2 transition-transform duration-300">
            <div className="text-8xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-slate-800 to-transparent absolute top-6 right-6 pointer-events-none">2</div>
            <div className="w-20 h-20 bg-cyan-500/10 rounded-2xl flex items-center justify-center text-cyan-500 mb-8 border border-cyan-500/20">
              <Globe size={40} />
            </div>
            <h3 className="text-2xl font-black italic uppercase text-white mb-4">We Deliver Globally</h3>
            <p className="text-slate-400 font-medium leading-relaxed">
              We encode your audio and deliver your release to Spotify, Apple Music, TikTok, and 150+ other digital stores within 24-48 hours.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-[#0a1122] rounded-[3rem] p-12 border border-slate-800 relative hover:-translate-y-2 transition-transform duration-300">
            <div className="text-8xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-slate-800 to-transparent absolute top-6 right-6 pointer-events-none">3</div>
            <div className="w-20 h-20 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 mb-8 border border-emerald-500/20">
              <DollarSign size={40} />
            </div>
            <h3 className="text-2xl font-black italic uppercase text-white mb-4">You Get Paid</h3>
            <p className="text-slate-400 font-medium leading-relaxed">
              Every time you get streamed or downloaded, you earn money. We collect your royalties and put them directly into your TunePlus account.
            </p>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE TUNEPLUS ================= */}
      <section className="py-24 px-6 bg-[#050b14] border-y border-white/5">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1">
            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white mb-8">
              Built For The <br/><span className="text-blue-500">Independent Artist.</span>
            </h2>
            <p className="text-xl text-slate-400 font-medium mb-10 leading-relaxed">
              TunePlus provides everything you need to manage your music career, from release to revenue, all in one powerful dashboard.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="text-blue-500 shrink-0 mt-1" size={24} />
                <div>
                  <h4 className="text-lg font-black uppercase text-white">Keep 100% of Your Rights</h4>
                  <p className="text-slate-400 font-medium">You are the boss. You retain full ownership of your masters.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="text-blue-500 shrink-0 mt-1" size={24} />
                <div>
                  <h4 className="text-lg font-black uppercase text-white">Free ISRC & UPC Codes</h4>
                  <p className="text-slate-400 font-medium">We provide free, unique barcodes for every single release.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="text-blue-500 shrink-0 mt-1" size={24} />
                <div>
                  <h4 className="text-lg font-black uppercase text-white">Daily Trend Reports</h4>
                  <p className="text-slate-400 font-medium">See exactly where your streams are coming from with advanced analytics.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Mockup */}
          <div className="flex-1 w-full relative">
            <div className="absolute inset-0 bg-blue-600/20 blur-[100px] rounded-full pointer-events-none"></div>
            <div className="bg-[#0a1122] border border-slate-800 rounded-[3rem] p-10 shadow-2xl relative z-10">
              <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-6">
                <div>
                  <h4 className="text-2xl font-black italic uppercase tracking-tight text-white">Live Analytics</h4>
                </div>
                <BarChart3 className="text-blue-500" size={28}/>
              </div>
              
              <div className="space-y-4">
                <div className="bg-[#020617] p-5 rounded-2xl border border-slate-800 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <Headphones className="text-slate-400" size={24}/>
                    <span className="font-bold text-white">Total Streams</span>
                  </div>
                  <span className="text-2xl font-black text-blue-400 italic">2.4M</span>
                </div>
                <div className="bg-[#020617] p-5 rounded-2xl border border-slate-800 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <DollarSign className="text-slate-400" size={24}/>
                    <span className="font-bold text-white">Revenue Pending</span>
                  </div>
                  <span className="text-2xl font-black text-emerald-400 italic">₹45,200</span>
                </div>
                <div className="bg-[#020617] p-5 rounded-2xl border border-slate-800 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <MonitorPlay className="text-slate-400" size={24}/>
                    <span className="font-bold text-white">Top Store</span>
                  </div>
                  <span className="text-xl font-black text-white italic">Spotify</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= BOTTOM CTA ================= */}
      <section className="py-32 px-6 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-600/30 to-cyan-600/30 blur-[150px] rounded-full pointer-events-none"></div>
        <div className="relative z-10">
          <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-white mb-6">Ready to make <br/><span className="text-blue-500">history?</span></h2>
          <a href={`${DASHBOARD_URL}/signup`} className="inline-flex bg-white text-black px-14 py-6 rounded-full font-black text-sm uppercase tracking-[0.2em] hover:bg-slate-200 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)] items-center gap-3">
            Create Your Account <ArrowRight size={18} />
          </a>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-black pt-20 pb-10 border-t border-white/10 text-center md:text-left">
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
             <div className="flex items-center justify-center md:justify-start gap-2 mb-6">
                <div className="bg-blue-600 p-1.5 rounded-lg text-white">
                  <Music size={20} />
                </div>
                <span className="text-xl font-black tracking-tighter uppercase italic text-white">
                  Tune<span className="text-blue-500">Plus</span>
                </span>
             </div>
          </div>
          
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6">Learn About TunePlus</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-400">
              <li><Link href="/about" className="hover:text-blue-400 transition-colors">About TunePlus</Link></li>
              <li><Link href="/leadership" className="hover:text-blue-400 transition-colors">Leadership</Link></li>
              <li><Link href="/careers" className="hover:text-blue-400 transition-colors">Careers</Link></li>
              <li><Link href="/terms" className="hover:text-blue-400 transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6">Make Money With Us</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-400">
              <li><a href={`${DASHBOARD_URL}/signup`} className="hover:text-blue-400 transition-colors">Create Your Account</a></li>
              <li><Link href="/sell-your-music" className="text-blue-400 transition-colors">Sell Your Music</Link></li>
              <li><Link href="/services" className="hover:text-blue-400 transition-colors">Artist Services</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6">Account Services</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-400">
              <li><a href={`${DASHBOARD_URL}/login`} className="hover:text-blue-400 transition-colors">Login</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Help</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
           <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
             © {new Date().getFullYear()} TunePlus Music. All rights reserved.
           </div>
           <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-slate-500">
              <a href="#" className="hover:text-white transition-colors">Facebook</a>
              <a href="#" className="hover:text-white transition-colors">X (Twitter)</a>
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
           </div>
        </div>
      </footer>

    </div>
  );
}