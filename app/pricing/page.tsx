'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Check, X, Plus, Minus, ArrowRight, Zap, Info, ShieldCheck, Crown
} from 'lucide-react';

// ================= STANDARD NETWORK FIBER BACKGROUND =================
const FiberNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray: any[] = [];
    const numberOfParticles = 150; 
    let mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    class Particle {
      x: number; y: number; size: number; speedX: number; speedY: number;
      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas!.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas!.height) this.speedY *= -1;
      }
      draw() {
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fillStyle = 'rgba(6, 182, 212, 0.3)';
        ctx!.fill();
      }
    }

    function init() {
      particlesArray = [];
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    }

    let animationFrameId: number;

    function animate() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        
        for (let j = i; j < particlesArray.length; j++) {
          const dx = particlesArray[i].x - particlesArray[j].x;
          const dy = particlesArray[i].y - particlesArray[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 120) { 
            ctx!.beginPath();
            ctx!.strokeStyle = `rgba(6, 182, 212, ${0.15 - distance/800})`; 
            ctx!.lineWidth = 0.5;
            ctx!.moveTo(particlesArray[i].x, particlesArray[i].y);
            ctx!.lineTo(particlesArray[j].x, particlesArray[j].y);
            ctx!.stroke();
          }
        }
        
        const dxMouse = particlesArray[i].x - mouse.x;
        const dyMouse = particlesArray[i].y - mouse.y;
        const distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distanceMouse < 200) { 
          ctx!.beginPath();
          ctx!.strokeStyle = `rgba(59, 130, 246, ${0.4 - distanceMouse/500})`; 
          ctx!.lineWidth = 1;
          ctx!.moveTo(particlesArray[i].x, particlesArray[i].y);
          ctx!.lineTo(mouse.x, mouse.y);
          ctx!.stroke();
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    }

    init();
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
};

// ================= 2. 3D TILT IMAGE COMPONENT =================
const TiltImage = () => {
  const [style, setStyle] = useState({ transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)' });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    const rotateX = y * -10; 
    const rotateY = x * 10;
    setStyle({ transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)` });
  };

  const handleMouseLeave = () => {
    setStyle({ transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)' });
  };

  return (
    <div 
      className="relative w-full max-w-5xl mx-auto rounded-[2rem] p-1 bg-gradient-to-b from-cyan-500/20 to-transparent backdrop-blur-sm border border-cyan-500/30 shadow-[0_0_80px_rgba(6,182,212,0.2)] transition-all duration-200 ease-out z-20 mt-16"
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="w-full relative rounded-[1.8rem] overflow-hidden border border-[#0a1122] shadow-2xl bg-[#0a1122] flex items-center justify-center p-2">
        <Image 
          src="/images/Admin Dashboard.png" 
          alt="TunePlus White Label Dashboard Mockup" 
          width={1200}
          height={800}
          sizes="(max-width: 1200px) 100vw, 1200px"
          className="w-full h-auto object-contain rounded-xl opacity-95 hover:opacity-100 transition-opacity"
          priority
        />
      </div>

      <div className="absolute -top-12 -right-12 w-24 h-24 flex items-center justify-center animate-bounce-slow drop-shadow-[0_0_20px_rgba(255,255,255,0.15)] z-30">
        <Image src="/logos/spotify.png" alt="Spotify" fill sizes="96px" className="object-contain" />
      </div>
      <div className="absolute -bottom-16 -left-12 w-32 h-32 flex items-center justify-center animate-bounce-slow delay-300 drop-shadow-[0_0_20px_rgba(255,255,255,0.15)] z-30">
        <Image src="/logos/Apple.png" alt="Apple Music" fill sizes="128px" className="object-contain" />
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 -left-16 w-20 h-20 flex items-center justify-center animate-bounce-slow delay-500 drop-shadow-[0_0_20px_rgba(255,255,255,0.15)] z-30">
        <Image src="/logos/saavn.png" alt="JioSaavn" fill sizes="80px" className="object-contain" />
      </div>
    </div>
  );
};

export default function PricingPage() {
  const DASHBOARD_URL = 'https://app.tuneplusmusic.com'; 
  const [activeTab, setActiveTab] = useState<'pay-per-release' | 'artists' | 'labels'>('pay-per-release');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#010205] font-sans text-slate-300 selection:bg-cyan-500/30 overflow-x-hidden relative">
      
      <FiberNetwork />

      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/5 blur-[150px] rounded-[100%] mix-blend-screen pointer-events-none"></div>
      </div>

      {/* ================= PREMIUM NAVBAR ================= */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#010205]/90 backdrop-blur-xl border-b border-white/[0.05] py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between relative z-10">
          <Link href="/" className="flex items-center gap-3 group h-12">
             <div className="relative w-48 h-full group-hover:scale-105 transition-transform">
                <Image src="/logos/tuneplus-logo.png" alt="TunePlus Logo" fill sizes="192px" className="object-contain object-left drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]" priority/>
             </div>
          </Link>
          
          <div className="hidden xl:flex items-center gap-6 font-bold text-[11px] uppercase tracking-widest text-slate-400">
            <Link href="/features" className="hover:text-white transition-colors">Features</Link>
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <Link href="/splits" className="hover:text-white transition-colors">Splits</Link>
            <Link href="/accelerator" className="hover:text-white transition-colors">Accelerator</Link>
            <span className="text-white border-b-2 border-cyan-500 pb-1">Pricing</span>
            <Link href="/stores" className="hover:text-white transition-colors">Stores</Link>
            <Link href="/white-label" className="text-cyan-400 hover:text-cyan-300 transition-colors drop-shadow-[0_0_5px_rgba(6,182,212,0.5)]">White Label SaaS</Link>
          </div>

          <div className="flex items-center gap-6">
            <a href={`${DASHBOARD_URL}/login`} className="hidden md:block font-bold text-[12px] uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Login</a>
            <a href={`${DASHBOARD_URL}/signup`} className="group relative overflow-hidden inline-flex bg-cyan-600 text-white px-8 py-3.5 rounded-full font-bold text-[12px] uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              <span className="relative z-10 transition-colors group-hover:text-white">Sign Up Free</span>
              <div className="absolute inset-0 h-full w-0 bg-blue-600 transition-all duration-300 ease-out group-hover:w-full z-0"></div>
            </a>
          </div>
        </div>
      </nav>

      {/* ================= HERO SECTION ================= */}
      <section className="pt-48 pb-12 px-6 text-center relative z-10">
        <div className="max-w-[1200px] mx-auto text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-cyan-500/20 text-cyan-400 font-bold text-[10px] uppercase tracking-widest mb-6 bg-cyan-950/20 shadow-inner">
            <ShieldCheck size={14}/> 100% Secure & Transparent
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white mb-6">
            Find The Right <br/>Plan For Your Needs
          </h1>
          <p className="text-lg text-slate-400 font-medium mb-12 max-w-2xl">
            No hidden fees. No sneaky contracts. Keep 100% of your rights and scale your music journey with industry-leading tools.
          </p>

          {/* 🚀 UPDATED TABS */}
          <div className="flex flex-wrap items-center gap-6 border-b border-white/10 mb-16">
            <button 
              onClick={() => setActiveTab('pay-per-release')}
              className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative ${activeTab === 'pay-per-release' ? 'text-white border-b-2 border-yellow-400' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Pay Per Release <span className="absolute -top-3 -right-6 text-[8px] bg-yellow-500 text-black px-1.5 py-0.5 rounded-sm animate-pulse">HOT</span>
            </button>
            <button 
              onClick={() => setActiveTab('artists')}
              className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all ${activeTab === 'artists' ? 'text-white border-b-2 border-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Plans for Artists
            </button>
            <button 
              onClick={() => setActiveTab('labels')}
              className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all ${activeTab === 'labels' ? 'text-white border-b-2 border-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Plans for Labels
            </button>
          </div>
        </div>
      </section>

      {/* ================= PRICING CARDS ================= */}
      <section className="pb-24 px-6 relative z-10">
        <div className="max-w-[1200px] mx-auto">
          
          {/* 🔥 PAY PER RELEASE PLANS (HIGH PROFIT / HIGH VALUE SECTION) */}
          {activeTab === 'pay-per-release' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 items-stretch">
              
              {/* SINGLE PLAN */}
              <div className="bg-[#050b14]/50 backdrop-blur-md border border-white/[0.08] rounded-3xl p-10 flex flex-col hover:border-yellow-500/30 transition-all shadow-lg hover:shadow-yellow-500/10 relative">
                <h3 className="text-xl font-bold uppercase tracking-widest text-white mb-2">Release a <span className="text-yellow-500">Single</span></h3>
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-5xl font-black text-white tracking-tighter">₹499</span>
                  <span className="text-slate-500 font-medium text-xs mb-2">/ ONE-TIME</span>
                </div>
                <p className="text-slate-400 text-sm font-medium mb-8 pb-8 border-b border-white/10">1 to 2 Tracks. Pay once, keep it online forever.</p>
                
                <a href={`${DASHBOARD_URL}/signup`} className="w-full py-4 text-center rounded-xl bg-transparent border border-slate-700 text-white font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-all mb-8">Distribute Single</a>
                
                <p className="text-xs font-bold text-white mb-4 flex items-center gap-2"><Crown size={14} className="text-yellow-500"/> Ultimate Value Perks:</p>
                <ul className="space-y-4 flex-1">
                  <FeatureItem text="Keep 100% of your earnings" color="text-yellow-500" tooltip="Zero commission. Every penny you make is yours to keep."/>
                  <FeatureItem text="Lifetime Distribution" color="text-yellow-500" tooltip="No annual renewal fees. Your music stays online forever."/>
                  <FeatureItem text="Priority Release (24-48 hrs)" color="text-yellow-500" tooltip="Skip the line. Get your music on stores at lightning speed."/>
                  <FeatureItem text="YouTube Content ID Included" color="text-yellow-500" tooltip="Automatically claim royalties for ANY video using your audio."/>
                  <FeatureItem text="Free ISRC & UPC Codes" color="text-yellow-500" tooltip="Industry-standard tracking codes automatically generated for free."/>
                  <FeatureItem text="Lyrics & Credits Distribution" color="text-yellow-500" tooltip="Send synced lyrics to Spotify, Apple Music, and Instagram."/>
                  <FeatureItem text="Dedicated Email Support" color="text-yellow-500" tooltip="Direct support from our distribution experts."/>
                </ul>
              </div>

              {/* ALBUM / EP PLAN (RECOMMENDED) */}
              <div className="bg-[#010205] border border-yellow-500/50 rounded-3xl p-10 flex flex-col shadow-[0_0_40px_rgba(234,179,8,0.1)] relative transform md:-translate-y-4">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-yellow-600 to-orange-600 text-white text-[10px] font-bold uppercase tracking-widest py-1.5 px-4 rounded-full shadow-lg">
                  Best Value
                </div>
                <h3 className="text-xl font-bold uppercase tracking-widest text-white mb-2">Release an <span className="text-yellow-400">Album / EP</span></h3>
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-5xl font-black text-white tracking-tighter">₹799</span>
                  <span className="text-slate-500 font-medium text-xs mb-2">/ ONE-TIME</span>
                </div>
                <p className="text-slate-400 text-sm font-medium mb-8 pb-8 border-b border-yellow-500/20">3+ Tracks. The ultimate package for serious drops.</p>
                
                <a href={`${DASHBOARD_URL}/signup`} className="w-full group relative overflow-hidden inline-flex bg-yellow-600 text-white py-4 rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-yellow-500/20 justify-center mb-8">
                   <span className="relative z-10 transition-colors group-hover:text-white">Distribute Album</span>
                   <div className="absolute inset-0 h-full w-0 bg-orange-600 transition-all duration-300 ease-out group-hover:w-full z-0"></div>
                </a>
                
                <p className="text-xs font-bold text-white mb-4 flex items-center gap-2"><Crown size={14} className="text-yellow-400"/> Everything in Single, plus:</p>
                <ul className="space-y-4 flex-1">
                  <FeatureItem text="Keep 100% of your earnings" color="text-yellow-400" tooltip="Zero commission. Every penny you make is yours to keep."/>
                  <FeatureItem text="Lifetime Distribution for whole Album" color="text-yellow-400" tooltip="No annual renewal fees. Your album stays online forever."/>
                  <FeatureItem text="Free Vevo Channel Creation" color="text-yellow-400" tooltip="Get your own Official Vevo channel on YouTube for premium music videos."/>
                  <FeatureItem text="Spotify Discovery Mode Eligibility" color="text-yellow-400" tooltip="Opt-in to Spotify's Discovery Mode to rapidly reach new listeners."/>
                  <FeatureItem text="Editorial Playlist Pitching" color="text-yellow-400" tooltip="Access our promotional services to get your album playlisted."/>
                  <FeatureItem text="Dolby Atmos & High-Res Uploads" color="text-yellow-400" tooltip="Deliver studio-quality lossless audio to stores."/>
                  <FeatureItem text="Priority WhatsApp Support" color="text-yellow-400" tooltip="Direct chat support with our distribution experts."/>
                </ul>
              </div>

            </div>
          )}

          {/* ARTIST PLANS (SUBSCRIPTIONS) */}
          {activeTab === 'artists' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 items-stretch">
              
              {/* STAR PLAN */}
              <div className="bg-[#050b14]/50 backdrop-blur-md border border-white/[0.08] rounded-3xl p-8 flex flex-col hover:border-cyan-500/30 transition-all shadow-lg hover:shadow-cyan-500/10">
                <h3 className="text-xl font-bold uppercase tracking-widest text-white mb-2">TunePlus <span className="text-cyan-500">Star</span></h3>
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-4xl font-black text-white tracking-tighter">₹299</span>
                  <span className="text-slate-500 font-medium text-xs mb-1">/ MONTH</span>
                </div>
                <p className="text-slate-400 text-sm font-medium mb-8 pb-8 border-b border-white/10">For artists ready to dominate</p>
                <a href={`${DASHBOARD_URL}/signup`} className="w-full py-3.5 text-center rounded-xl bg-transparent border border-slate-700 text-white font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-all mb-8">Get Started</a>
                
                <p className="text-xs font-bold text-white mb-4 flex items-center gap-2"><Zap size={14} className="text-yellow-500"/> Everything in Rise, plus:</p>
                <ul className="space-y-4 flex-1">
                  <FeatureItem text="Keep 95% of your earnings" tooltip="Retain a higher percentage of royalties for maximum earnings." />
                  <FeatureItem text="Fast-Track Release (24-48 hrs)" tooltip="Your music goes live on stores much faster, skip the queue." />
                  <FeatureItem text="Sync Licensing Opportunities" tooltip="Get your music placed in TV, Movies, and Video Games for upfront payouts." />
                  <FeatureItem text="Vevo Channel Creation & Uploads" tooltip="Get your own Official Vevo channel on YouTube for premium music videos." />
                  <FeatureItem text="Editorial Playlist Pitching (4/year)" tooltip="Access our promotional services to get your music playlisted on Spotify & Apple." />
                  <FeatureItem text="Dolby Atmos / Spatial Audio" tooltip="Upload immersive 3D audio tracks supported by Apple Music." />
                  <FeatureItem text="Dedicated WhatsApp Support" tooltip="Direct, 1-on-1 chat support with our distribution experts." />
                  <FeatureItem text="1 Custom Label Name" tooltip="Release under your own independent label brand." />
                  <FeatureItem text="Spotify Discovery Mode" tooltip="Opt-in to Spotify's Discovery Mode to rapidly reach new listeners." />
                  <FeatureItem text="Hassle-free Catalog migration" tooltip="Migrate your existing catalog to TunePlus without losing play counts or playlists." />
                </ul>
              </div>

              {/* RISE PLAN (RECOMMENDED) */}
              <div className="bg-[#010205] border border-cyan-500/50 rounded-3xl p-8 flex flex-col shadow-[0_0_40px_rgba(6,182,212,0.1)] relative transform md:-translate-y-4">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-[10px] font-bold uppercase tracking-widest py-1.5 px-4 rounded-full shadow-lg">
                  Most Popular
                </div>
                <h3 className="text-xl font-bold uppercase tracking-widest text-white mb-2">TunePlus <span className="text-cyan-400">Rise</span></h3>
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-4xl font-black text-white tracking-tighter">₹99</span>
                  <span className="text-slate-500 font-medium text-xs mb-1">/ MONTH</span>
                </div>
                <p className="text-slate-400 text-sm font-medium mb-8 pb-8 border-b border-cyan-500/20">The perfect balance of power & price</p>
                
                <a href={`${DASHBOARD_URL}/signup`} className="w-full group relative overflow-hidden inline-flex bg-cyan-600 text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-cyan-500/20 justify-center mb-8">
                   <span className="relative z-10 transition-colors group-hover:text-white">Get Started</span>
                   <div className="absolute inset-0 h-full w-0 bg-blue-600 transition-all duration-300 ease-out group-hover:w-full z-0"></div>
                </a>
                
                <p className="text-xs font-bold text-white mb-4">Everything in Free, plus:</p>
                <ul className="space-y-4 flex-1">
                  <FeatureItem text="Keep 95% of your earnings" color="text-cyan-400" tooltip="You keep 95% of all streaming and download royalties."/>
                  <FeatureItem text="Unlimited Releases to 150+ DSPs" color="text-cyan-400" tooltip="Distribute unlimited tracks to Spotify, Apple, JioSaavn, Amazon, and more."/>
                  <FeatureItem text="Monetize UGC (Meta, TikTok, YouTube)" color="text-cyan-400" tooltip="Earn money when your music is used in short-form videos and reels."/>
                  <FeatureItem text="Free ISRC & UPC Codes" color="text-cyan-400" tooltip="Industry-standard tracking codes automatically generated for free."/>
                  <FeatureItem text="Lyrics & Credits Distribution" color="text-cyan-400" tooltip="Send synced lyrics to Spotify, Apple Music, and Instagram."/>
                  <FeatureItem text="Anti-Fraud & Copyright Protection" color="text-cyan-400" tooltip="Advanced scanning to protect your music from unauthorized re-uploads."/>
                  <FeatureItem text="YouTube Content ID" color="text-cyan-400" tooltip="Automatically claim royalties for ANY video using your audio."/>
                  <FeatureItem text="High-Res Audio Uploads (WAV/FLAC)" color="text-cyan-400" tooltip="Deliver studio-quality lossless audio to stores."/>
                  <FeatureItem text="Royalty Splits at Source" color="text-cyan-400" tooltip="Automatically split revenue with producers and collaborators."/>
                  <FeatureItem text="On-demand Royalty Payouts" color="text-cyan-400" tooltip="Withdraw your available funds straight to your bank account anytime."/>
                  <FeatureItem text="Advanced Analytics Dashboard" color="text-cyan-400" tooltip="Track daily streams, playlist adds, and global audience data."/>
                  <FeatureItem text="3-Day Priority Support" color="text-cyan-400" tooltip="Skip the free tier queue with faster ticket resolution."/>
                </ul>
              </div>

              {/* FREE PLAN */}
              <div className="bg-[#050b14]/50 backdrop-blur-md border border-white/[0.08] rounded-3xl p-8 flex flex-col hover:border-slate-500/30 transition-all shadow-lg hover:shadow-white/5">
                <h3 className="text-xl font-bold uppercase tracking-widest text-white mb-2">TunePlus <span className="text-slate-400">Free</span></h3>
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-4xl font-black text-white tracking-tighter">FREE</span>
                  <span className="text-slate-500 font-medium text-xs mb-1">/ FOREVER</span>
                </div>
                <p className="text-slate-400 text-sm font-medium mb-8 pb-8 border-b border-white/10">For artists testing the waters</p>
                <a href={`${DASHBOARD_URL}/signup`} className="w-full py-3.5 text-center rounded-xl bg-transparent border border-slate-700 text-white font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-all mb-8">Sign Up Free</a>
                
                <ul className="space-y-4 flex-1">
                  <FeatureItem text="Basic Distribution to Select Stores" tooltip="Release to a limited set of DSPs."/>
                  <FeatureItem text="Keep 80% of your earnings" tooltip="Standard commission rate for free users."/>
                  <FeatureItem text="Free ISRC & UPC Codes" tooltip="Essential tracking codes provided at no cost."/>
                  <FeatureItem text="Fan Links (Smart Links)" tooltip="A centralized page for all your music links to share with fans."/>
                  <FeatureItem text="Standard Support" tooltip="Basic email support queue."/>
                </ul>
              </div>

            </div>
          )}

          {/* LABEL PLANS */}
          {activeTab === 'labels' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 items-stretch">
              
              {/* LABEL PLAN */}
              <div className="bg-[#010205] border border-cyan-500/50 rounded-3xl p-10 flex flex-col shadow-[0_0_40px_rgba(6,182,212,0.1)]">
                <h3 className="text-xl font-bold uppercase tracking-widest text-white mb-2">TunePlus <span className="text-cyan-400">Label</span></h3>
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-5xl font-black text-white tracking-tighter">₹572</span>
                  <span className="text-slate-500 font-medium text-xs mb-2">/ MONTH</span>
                </div>
                <p className="text-slate-400 text-sm font-medium mb-8 pb-8 border-b border-white/10">Perfect for growing independent labels</p>
                
                <a href={`${DASHBOARD_URL}/signup`} className="w-full group relative overflow-hidden inline-flex bg-cyan-600 text-white py-4 rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-cyan-500/20 justify-center mb-8">
                   <span className="relative z-10 transition-colors group-hover:text-white">Get Started</span>
                   <div className="absolute inset-0 h-full w-0 bg-blue-600 transition-all duration-300 ease-out group-hover:w-full z-0"></div>
                </a>
                
                <ul className="space-y-4 flex-1">
                  <FeatureItem text="Unlimited Artists & Releases" color="text-cyan-400" tooltip="Manage unlimited artists under one centralized label account."/>
                  <FeatureItem text="Keep 95% of all royalties" color="text-cyan-400" tooltip="High revenue share optimized for label margins."/>
                  <FeatureItem text="Sub-Label Management" color="text-cyan-400" tooltip="Create and organize releases under different sub-labels."/>
                  <FeatureItem text="Advanced Accounting Exports (CSV/PDF)" color="text-cyan-400" tooltip="Download detailed royalty reports for easy payout distribution."/>
                  <FeatureItem text="Priority DSP Pitching" color="text-cyan-400" tooltip="Direct editorial pitching support for your roster's top priority tracks."/>
                  <FeatureItem text="Vevo Channel Creation" color="text-cyan-400" tooltip="Setup official Vevo channels for your top artists."/>
                  <FeatureItem text="YouTube Official Artist Channels" color="text-cyan-400" tooltip="Convert standard channels to OACs effortlessly."/>
                  <FeatureItem text="Single-user admin access" color="text-cyan-400" tooltip="One powerful master login for the label manager."/>
                  <FeatureItem text="Hassle-Free Bulk Catalog Migration" color="text-cyan-400" tooltip="We help you move massive catalogs from other distributors without losing stats."/>
                  <FeatureItem text="Dolby Atmos & High-Res Audio" color="text-cyan-400" tooltip="Deliver premium spatial audio to Apple Music and Amazon."/>
                  <FeatureItem text="Sync Licensing & Ad Support" color="text-cyan-400" tooltip="Submit tracks for TV/Film and access direct ad-buying tools."/>
                </ul>
              </div>

              {/* ENTERPRISE PLAN */}
              <div className="bg-[#050b14]/50 backdrop-blur-md border border-white/[0.08] rounded-3xl p-10 flex flex-col hover:border-cyan-500/30 transition-all shadow-lg">
                <h3 className="text-xl font-bold uppercase tracking-widest text-white mb-2">TunePlus <span className="text-cyan-500">Enterprise</span></h3>
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-4xl md:text-5xl font-black text-white tracking-tighter">Custom</span>
                </div>
                <p className="text-slate-400 text-sm font-medium mb-8 pb-8 border-b border-white/10 mt-1">For established labels & aggregators</p>
                <a href="/white-label#demo" className="w-full py-4 text-center rounded-xl bg-transparent border border-slate-700 text-white font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-all mb-8">Get a Quote</a>
                
                <p className="text-xs font-bold text-white mb-4">Everything in Label, plus:</p>
                <ul className="space-y-4 flex-1">
                  <FeatureItem text="Keep 100% ownership" tooltip="Zero commission options available on custom contracts."/>
                  <FeatureItem text="API Access & Integration" tooltip="Connect our distribution engine directly to your own software or website."/>
                  <FeatureItem text="White-Label Dashboard Options" tooltip="Provide your artists with a dashboard featuring YOUR branding, not ours."/>
                  <FeatureItem text="Multiple Team Member Accounts" tooltip="Assign roles (Admin, Finance, Marketing) with custom permissions."/>
                  <FeatureItem text="Dedicated Account Manager" tooltip="A personal representative for instant, skip-the-line assistance."/>
                  <FeatureItem text="Priority 12-Hour Release Processing" tooltip="The absolute fastest delivery pipeline to DSPs."/>
                  <FeatureItem text="Advanced Marketing with IMPACT Lite" tooltip="Access premium, data-driven marketing and retargeting tools."/>
                  <FeatureItem text="Custom Contract & Split Tools" tooltip="Advanced legal and royalty splitting configurations."/>
                </ul>
              </div>

            </div>
          )}

        </div>
      </section>

      {/* ================= DETAILED COMPARISON TABLE ================= */}
      <section className="py-24 px-6 max-w-[1200px] mx-auto border-t border-white/5 relative z-10">
        <div className="mb-16 text-center md:text-left">
          <p className="text-[12px] font-bold uppercase tracking-widest text-slate-500 mb-2">COMPARISON</p>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-6">Compare Plans</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              {activeTab === 'pay-per-release' ? (
                <tr className="border-b border-white/10">
                  <th className="p-6 text-sm font-bold uppercase tracking-widest text-slate-500 w-1/3 bg-transparent">Feature</th>
                  <th className="p-6 text-sm font-bold uppercase tracking-widest text-white text-center">SINGLE (₹499)</th>
                  <th className="p-6 text-sm font-bold uppercase tracking-widest text-yellow-400 text-center">ALBUM (₹799)</th>
                </tr>
              ) : activeTab === 'artists' ? (
                <tr className="border-b border-white/10">
                  <th className="p-6 text-sm font-bold uppercase tracking-widest text-slate-500 w-1/3 bg-transparent">Feature</th>
                  <th className="p-6 text-sm font-bold uppercase tracking-widest text-white text-center">TUNEPLUS STAR</th>
                  <th className="p-6 text-sm font-bold uppercase tracking-widest text-cyan-400 text-center">TUNEPLUS RISE</th>
                </tr>
              ) : (
                <tr className="border-b border-white/10">
                  <th className="p-6 text-sm font-bold uppercase tracking-widest text-slate-500 w-1/3 bg-transparent">Feature</th>
                  <th className="p-6 text-sm font-bold uppercase tracking-widest text-white text-center">TUNEPLUS LABEL</th>
                  <th className="p-6 text-sm font-bold uppercase tracking-widest text-cyan-400 text-center">TUNEPLUS ENTERPRISE</th>
                </tr>
              )}
            </thead>
            <tbody className="divide-y divide-white/5 text-sm font-medium text-slate-300">
              
              {/* PAY PER RELEASE DATA */}
              {activeTab === 'pay-per-release' && (
                <>
                  <ComparisonRow title="Royalty Share" col1="100%" col2="100%" />
                  <ComparisonRow title="No. of Tracks" col1="1 to 2 Tracks" col2="3+ Tracks" />
                  <ComparisonRow title="Billing Model" col1="One-Time Payment" col2="One-Time Payment" />
                  <ComparisonRow title="Lifetime Distribution" col1={true} col2={true} />
                  <ComparisonRow title="Free ISRC & UPC Codes" col1={true} col2={true} />
                  <ComparisonRow title="Distribution to all Major DSPs" col1={true} col2={true} />
                  <ComparisonRow title="UGC Monetization" col1={true} col2={true} />
                  <ComparisonRow title="Lyrics & Credits Distribution" col1={true} col2={true} />
                  <ComparisonRow title="Anti-Fraud Protection" col1={true} col2={true} />
                  <ComparisonRow title="All in One Analytics" col1={true} col2={true} />
                  <ComparisonRow title="Custom Release Date" col1="Fast Track" col2="Fast Track" />
                  <ComparisonRow title="On Demand Royalty Payouts" col1={true} col2={true} />
                  <ComparisonRow title="Support SLA" col1="Email Support" col2="WhatsApp Priority" />
                  <ComparisonRow title="Vevo Channel Creation" col1={false} col2={true} />
                  <ComparisonRow title="Dolby Atmos & High-Res Audio" col1={false} col2={true} />
                  <ComparisonRow title="YouTube Content ID" col1={true} col2={true} />
                  <ComparisonRow title="Spotify Discovery Mode" col1={false} col2={true} />
                  <ComparisonRow title="Editorial Playlist Pitching" col1={false} col2={true} />
                </>
              )}

              {/* ARTIST COMPARISON DATA */}
              {activeTab === 'artists' && (
                <>
                  <ComparisonRow title="Royalty Share" col1="95%" col2="95%" />
                  <ComparisonRow title="No. of Releases" col1="Unlimited" col2="Unlimited" />
                  <ComparisonRow title="Free ISRC & UPC Codes" col1={true} col2={true} />
                  <ComparisonRow title="Distribution to all Major DSPs" col1={true} col2={true} />
                  <ComparisonRow title="UGC (Meta, TikTok, YouTube) Monetization" col1={true} col2={true} />
                  <ComparisonRow title="Lyrics & Credits Distribution" col1={true} col2={true} />
                  <ComparisonRow title="Anti-Fraud Protection" col1={true} col2={true} />
                  <ComparisonRow title="All in One Analytics" col1={true} col2={true} />
                  <ComparisonRow title="Custom Release Date" col1="Fast Track (24-48 hrs)" col2="Standard (7 Days)" />
                  <ComparisonRow title="On Demand Royalty Payouts" col1={true} col2={true} />
                  <ComparisonRow title="Royalty Splits at Source" col1={true} col2={true} />
                  <ComparisonRow title="Support SLA" col1="Dedicated Support" col2="3-Day Email" />
                  <ComparisonRow title="Vevo Channel Creation" col1={true} col2={false} />
                  <ComparisonRow title="Sync Licensing Opportunities" col1={true} col2={false} />
                  <ComparisonRow title="Custom Label Name" col1={true} col2={false} />
                  <ComparisonRow title="Dolby Atmos & High-Res Audio" col1={true} col2={true} />
                  <ComparisonRow title="Fan Links & Link in Bio" col1={true} col2={true} />
                  <ComparisonRow title="YouTube Content ID" col1={true} col2={true} />
                  <ComparisonRow title="Spotify Discovery Mode" col1={true} col2={false} />
                  <ComparisonRow title="YouTube Official Artist Channel" col1={true} col2={false} />
                </>
              )}

              {/* LABEL COMPARISON DATA */}
              {activeTab === 'labels' && (
                <>
                  <ComparisonRow title="No. of Artists" col1="Unlimited" col2="Unlimited" />
                  <ComparisonRow title="Royalty Share" col1="95%" col2="Custom (Up to 100%)" />
                  <ComparisonRow title="User Access" col1="Single-user" col2="Multiple Role-Based Teams" />
                  <ComparisonRow title="Sub-Label Management" col1={true} col2={true} />
                  <ComparisonRow title="Advanced Accounting Exports" col1={true} col2="Custom Financials" />
                  <ComparisonRow title="Analytics Dashboard" col1={true} col2="Advanced Deep-Dive Data" />
                  <ComparisonRow title="Support" col1="Email support" col2="Dedicated Account Manager" />
                  <ComparisonRow title="White-Label Dashboard" col1={false} col2={true} />
                  <ComparisonRow title="API Access" col1={false} col2={true} />
                  <ComparisonRow title="Processing Time" col1="Standard" col2="Priority (12 hrs)" />
                  <ComparisonRow title="Editorial Playlist Pitching" col1="Standard Priority" col2="High Priority" />
                  <ComparisonRow title="YouTube Official Artist Channel & Vevo" col1={true} col2={true} />
                  <ComparisonRow title="Dolby Atmos & Spatial Audio" col1={true} col2={true} />
                  <ComparisonRow title="Spotify Discovery Mode" col1={true} col2={true} />
                  <ComparisonRow title="Sync Licensing (TV, Movies, Games)" col1={true} col2={true} />
                  <ComparisonRow title="Catalog Migration Services" col1="Self-Serve / Guided" col2="Fully Managed" />
                  <ComparisonRow title="Marketing Solutions" col1={false} col2="IMPACT Lite" />
                </>
              )}

            </tbody>
          </table>
        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section className="py-24 px-6 max-w-[900px] mx-auto z-10 relative border-t border-white/5">
        <div className="mb-16 text-center md:text-left">
          <p className="text-[12px] font-bold uppercase tracking-widest text-cyan-500 mb-2">FAQS</p>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-6">
            Frequently Asked <br/>Questions
          </h2>
          <p className="text-slate-400 font-medium text-base">Explore common questions about TunePlus plans.</p>
        </div>

        <div className="flex flex-col border-t border-white/10">
          <FAQItem 
            question="Why should I choose Pay-Per-Release instead of a Subscription?" 
            answer="Pay-Per-Release is perfect if you want to pay once and never worry about annual fees. You keep 100% of your royalties forever. Subscriptions are better if you release music constantly (like every month) and want a low monthly cost for unlimited uploads."
          />
          <FAQItem 
            question="What's the difference between the Rise and Star plans?" 
            answer="Rise is ₹99/month with unlimited releases, ISRC codes, YouTube Content ID, and 95% royalties. Star is ₹299/month designed for serious professionals, offering fast-track releases, WhatsApp support, Vevo channel creation, Sync opportunities, and 95% royalties."
          />
          <FAQItem 
            question="Are ISRC and UPC codes really free?" 
            answer="Yes! Unlike some competitors, we automatically generate and assign free industry-standard ISRC and UPC codes for all your releases across all our plans (including the Free tier)."
          />
          <FAQItem 
            question="Do I keep 100% ownership of my music?" 
            answer="Absolutely. You retain 100% ownership of your masters and copyrights. We are just your distribution partner, we don't own your art."
          />
          <FAQItem 
            question="Can I upgrade my plan later?" 
            answer="Yes! You can easily upgrade from Free to Rise, or Rise to Star anytime directly from your dashboard to unlock more premium tools."
          />
          <FAQItem 
            question="How do royalty payouts work?" 
            answer="Royalties are collected from stores and credited to your account monthly. You can request a payout straight to your bank account anytime your balance is ready."
          />
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#010205] pt-24 pb-12 border-t border-white/5 text-center md:text-left relative z-20">
         <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
          <div className="col-span-1 lg:col-span-1">
             <div className="flex items-center justify-center md:justify-start h-16 mb-6">
                <div className="relative w-40 h-full">
                  <Image src="/logos/tuneplus-logo.png" alt="TunePlus Logo" fill className="object-contain object-left md:object-left" />
                </div>
             </div>
             <p className="text-slate-500 font-medium text-sm pr-4 leading-relaxed">Empowering independent artists globally with premium distribution and uncompromised royalty collection since 2017.</p>
          </div>
          
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8 text-slate-600">Legal & Policy</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-400">
              <li><Link href="/terms-and-conditions" className="hover:text-cyan-400 transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/refund-policy" className="hover:text-cyan-400 transition-colors">Refund Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8 text-slate-600">Make Money With Us</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-400">
              <li><a href={`${DASHBOARD_URL}/signup`} className="hover:text-cyan-400 transition-colors">Create Your Account</a></li>
              <li><Link href="/features" className="hover:text-cyan-400 transition-colors">Features</Link></li>
              <li><Link href="/services" className="hover:text-cyan-400 transition-colors">Services</Link></li>
              <li><Link href="/splits" className="hover:text-cyan-400 transition-colors">Splits</Link></li>
              <li><Link href="/accelerator" className="hover:text-cyan-400 transition-colors">Accelerator</Link></li>
              <li><span className="text-cyan-500 transition-colors">Pricing & Plans</span></li>
              <li><Link href="/white-label" className="hover:text-cyan-400 transition-colors text-cyan-500">White Label SaaS</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8 text-slate-600">Account Services</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-400">
              <li><a href={`${DASHBOARD_URL}/login`} className="hover:text-cyan-400 transition-colors">Login</a></li>
              <li><Link href="/contact" className="hover:text-cyan-400 transition-colors">Contact Support</Link></li>
            </ul>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 pt-10 border-t border-slate-800/50 flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="text-slate-500 text-[11px] font-bold uppercase tracking-widest">
             © {new Date().getFullYear()} TunePlus Music. All rights reserved.
           </div>
           <div className="flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-slate-500">
              <a href="https://www.facebook.com/profile.php?id=61557369243454" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Facebook</a>
              <a href="https://x.com/TuneplusMusic" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">X (Twitter)</a>
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
           </div>
        </div>
      </footer>

    </div>
  );
}

// ================= HELPER COMPONENTS =================

function FeatureItem({ text, color = "text-slate-400", tooltip }: { text: string, color?: string, tooltip?: string }) {
  return (
    <li className="flex items-start justify-between gap-3 text-sm font-medium text-slate-300 group/item relative">
      <div className="flex items-start gap-3">
        <Check className={`${color} shrink-0 mt-0.5`} size={18}/> 
        <span className="leading-snug">{text}</span>
      </div>
      
      {/* THE "i" INFO BUTTON & TOOLTIP */}
      {tooltip && (
        <div className="relative flex-shrink-0 mt-0.5 z-10">
          <Info size={16} className="text-slate-500 hover:text-white cursor-help transition-colors" />
          <div className="absolute right-0 bottom-full mb-2 w-48 p-3 bg-[#1e293b] text-slate-200 text-xs rounded-lg shadow-xl opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all duration-200 z-50 border border-slate-700 pointer-events-none">
            {tooltip}
            <div className="absolute top-full right-1.5 -mt-1 border-4 border-transparent border-t-[#1e293b]"></div>
          </div>
        </div>
      )}
    </li>
  );
}

function ComparisonRow({ title, col1, col2 }: { title: string, col1: any, col2: any }) {
  const renderValue = (val: any, activeColor: string) => {
    if (typeof val === 'boolean') {
      return val ? <Check className={`mx-auto ${activeColor}`} size={20}/> : <X className="mx-auto text-slate-600" size={20}/>;
    }
    return <span className={`font-bold ${activeColor}`}>{val}</span>;
  };

  return (
    <tr className="hover:bg-white/[0.02] transition-colors border-b border-white/5">
      <td className="p-6 font-medium text-slate-300">{title}</td>
      <td className="p-6 text-center">{renderValue(col1, 'text-white')}</td>
      <td className="p-6 text-center">{renderValue(col2, 'text-cyan-400')}</td>
    </tr>
  );
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div 
      className="border-b border-white/[0.08] py-6 cursor-pointer group" 
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex justify-between items-center gap-6">
        <h4 className="text-lg font-bold text-slate-200 group-hover:text-cyan-400 transition-colors duration-300 leading-tight">{question}</h4>
        <div className="shrink-0 text-slate-500 transition-transform duration-300">
          {isOpen ? <Minus size={20} className="text-cyan-500" /> : <Plus size={20} className="group-hover:text-cyan-400" />}
        </div>
      </div>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
        <p className="text-slate-400 font-medium leading-relaxed text-base border-l-2 border-cyan-500/50 pl-4">
          {answer}
        </p>
      </div>
    </div>
  );
}