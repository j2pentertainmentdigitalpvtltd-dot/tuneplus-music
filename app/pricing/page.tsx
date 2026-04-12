'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Check, X, Plus, Minus, ArrowRight, Zap, Info
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

export default function PricingPage() {
  const DASHBOARD_URL = 'https://app.tuneplusmusic.com'; 
  const [activeTab, setActiveTab] = useState<'artists' | 'labels'>('artists');
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
                <Image src="/logos/tuneplus-logo.png" alt="TunePlus Logo" fill className="object-contain object-left drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]" priority/>
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
          <p className="text-[12px] font-bold uppercase tracking-widest text-cyan-500 mb-4">Pricing</p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white mb-6">
            Find The Right <br/>Plan For Your Needs
          </h1>
          <p className="text-lg text-slate-400 font-medium mb-12">
            No matter where you're on your music journey, we have a plan.
          </p>

          {/* TABS */}
          <div className="flex items-center gap-6 border-b border-white/10 mb-16">
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
          
          {/* ARTIST PLANS */}
          {activeTab === 'artists' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 items-stretch">
              
              {/* STAR PLAN */}
              <div className="bg-[#050b14]/50 backdrop-blur-md border border-white/[0.08] rounded-3xl p-8 flex flex-col hover:border-cyan-500/30 transition-all shadow-lg hover:shadow-cyan-500/10">
                <h3 className="text-xl font-bold uppercase tracking-widest text-white mb-2">TunePlus <span className="text-cyan-500">Star</span></h3>
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-4xl font-black text-white tracking-tighter">₹198</span>
                  <span className="text-slate-500 font-medium text-xs mb-1">/ MONTH</span>
                </div>
                <p className="text-slate-400 text-sm font-medium mb-8 pb-8 border-b border-white/10">For artists ready to grow</p>
                <a href={`${DASHBOARD_URL}/signup`} className="w-full py-3.5 text-center rounded-xl bg-transparent border border-slate-700 text-white font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-all mb-8">Get Started</a>
                
                <p className="text-xs font-bold text-white mb-4">Everything in TunePlus Rise, plus</p>
                <ul className="space-y-4 flex-1">
                  <FeatureItem text="Keep 95% of your earnings" tooltip="Retain a higher percentage of royalties for maximum earnings." />
                  <FeatureItem text="Access to funding & marketing budgets" tooltip="Get funding and advances based on your streaming revenue." />
                  <FeatureItem text="Release within 7 days" tooltip="Your music goes live on stores much faster." />
                  <FeatureItem text="Catalog migration" tooltip="Migrate your existing catalog to TunePlus without losing play counts." />
                  <FeatureItem text="Editorial playlist pitching (4 releases/year)" tooltip="Access our promotional services to get your music playlisted." />
                  <FeatureItem text="TunePlus social media & playlist promotion" tooltip="We push your tracks on our networks." />
                  <FeatureItem text="YouTube Official Artist Channel" tooltip="Set up and manage your official artist channel on YouTube." />
                  <FeatureItem text="Full access to Cover Art Studio" tooltip="Design your covers with unlimited premium templates." />
                  <FeatureItem text="Dolby Atmos distribution" tooltip="Distribute your music in Dolby Atmos for an immersive experience." />
                  <FeatureItem text="Access to all upcoming features" tooltip="Be the first to try new tools." />
                  <FeatureItem text="Spotify Discovery Mode" tooltip="Opt-in to Spotify's Discovery Mode to reach new listeners." />
                  <FeatureItem text="Sync licensing (TV, movies, commercials, games)" tooltip="Get your music featured in media." />
                </ul>
              </div>

              {/* RISE PLAN (RECOMMENDED) */}
              <div className="bg-[#010205] border border-cyan-500/50 rounded-3xl p-8 flex flex-col shadow-[0_0_40px_rgba(6,182,212,0.1)] relative">
                <h3 className="text-xl font-bold uppercase tracking-widest text-white mb-2">TunePlus <span className="text-cyan-400">Rise</span></h3>
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-4xl font-black text-white tracking-tighter">₹82</span>
                  <span className="text-slate-500 font-medium text-xs mb-1">/ MONTH</span>
                </div>
                <p className="text-slate-400 text-sm font-medium mb-8 pb-8 border-b border-cyan-500/20">For new artists starting out</p>
                
                <a href={`${DASHBOARD_URL}/signup`} className="w-full group relative overflow-hidden inline-flex bg-cyan-600 text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-cyan-500/20 justify-center mb-8">
                   <span className="relative z-10 transition-colors group-hover:text-white">Get Started</span>
                   <div className="absolute inset-0 h-full w-0 bg-blue-600 transition-all duration-300 ease-out group-hover:w-full z-0"></div>
                </a>
                
                <p className="text-xs font-bold text-white mb-4">Everything in TunePlus Free, plus</p>
                <ul className="space-y-4 flex-1">
                  <FeatureItem text="Keep 90% of your earnings" color="text-cyan-400" tooltip="You keep 90% of all streaming royalties."/>
                  <FeatureItem text="Monetize UGC on Meta, TikTok, and YouTube" color="text-cyan-400" tooltip="Earn money when your music is used in short-form videos."/>
                  <FeatureItem text="All-in-one analytics dashboard" color="text-cyan-400" tooltip="Track streams and revenue daily."/>
                  <FeatureItem text="3-day support response time" color="text-cyan-400" tooltip="Priority support over free users."/>
                  <FeatureItem text="On demand royalty payouts" color="text-cyan-400" tooltip="Withdraw funds anytime."/>
                  <FeatureItem text="Unlimited release to all major DSPs" color="text-cyan-400" tooltip="Distribute to Spotify, Apple, and 150+ more."/>
                  <FeatureItem text="Release within 14 days" color="text-cyan-400" tooltip="Standard processing time for releases."/>
                  <FeatureItem text="Royalty splits at source" color="text-cyan-400" tooltip="Automatically split revenue with collaborators."/>
                  <FeatureItem text="YouTube Content ID" color="text-cyan-400" tooltip="Claim royalties for videos using your audio."/>
                  <FeatureItem text="Music video distribution" color="text-cyan-400" tooltip="Distribute videos to VEVO, Apple Music, Tidal."/>
                  <FeatureItem text="Fan Links (Pre-save, master link)" color="text-cyan-400" tooltip="Smart links for your releases."/>
                  <FeatureItem text="Access to Express Ads" color="text-cyan-400" tooltip="Run ad campaigns from the dashboard."/>
                </ul>
              </div>

              {/* FREE PLAN */}
              <div className="bg-[#050b14]/50 backdrop-blur-md border border-white/[0.08] rounded-3xl p-8 flex flex-col hover:border-slate-500/30 transition-all shadow-lg hover:shadow-white/5">
                <h3 className="text-xl font-bold uppercase tracking-widest text-white mb-2">TunePlus <span className="text-slate-400">Free</span></h3>
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-4xl font-black text-white tracking-tighter">FREE</span>
                  <span className="text-slate-500 font-medium text-xs mb-1">/ FOREVER</span>
                </div>
                <p className="text-slate-400 text-sm font-medium mb-8 pb-8 border-b border-white/10">For artists trying it out</p>
                <a href={`${DASHBOARD_URL}/signup`} className="w-full py-3.5 text-center rounded-xl bg-transparent border border-slate-700 text-white font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-all mb-8">Get Started</a>
                
                <ul className="space-y-4 flex-1">
                  <FeatureItem text="Free one-time access to AI Cover Art Studio" tooltip="Try our AI designer once for free."/>
                  <FeatureItem text="Link in Bio for easy promotion" tooltip="A centralized page for all your links."/>
                  <FeatureItem text="AI Mastering" tooltip="Automated mastering for your tracks."/>
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
                <p className="text-slate-400 text-sm font-medium mb-8 pb-8 border-b border-white/10">Perfect for independent labels</p>
                
                <a href={`${DASHBOARD_URL}/signup`} className="w-full group relative overflow-hidden inline-flex bg-cyan-600 text-white py-4 rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-cyan-500/20 justify-center mb-8">
                   <span className="relative z-10 transition-colors group-hover:text-white">Get Started</span>
                   <div className="absolute inset-0 h-full w-0 bg-blue-600 transition-all duration-300 ease-out group-hover:w-full z-0"></div>
                </a>
                
                <ul className="space-y-4 flex-1">
                  <FeatureItem text="Unlimited artists for your roster" color="text-cyan-400" tooltip="Manage unlimited artists under one account."/>
                  <FeatureItem text="Keep 95% of royalties" color="text-cyan-400" tooltip="High revenue share for labels."/>
                  <FeatureItem text="Single-user access" color="text-cyan-400" tooltip="One admin login."/>
                  <FeatureItem text="Analytics dashboard" color="text-cyan-400" tooltip="Track performance across all artists."/>
                  <FeatureItem text="Email support" color="text-cyan-400" tooltip="Standard email ticketing."/>
                  <FeatureItem text="Release management" color="text-cyan-400" tooltip="Centralized release hub."/>
                  <FeatureItem text="Basic label branding" color="text-cyan-400" tooltip="Your label name on releases."/>
                  <FeatureItem text="Standard processing time" color="text-cyan-400" tooltip="Normal review queue."/>
                  <FeatureItem text="Editorial playlist pitching" color="text-cyan-400" tooltip="Submit tracks for editorial consideration."/>
                  <FeatureItem text="TunePlus social media promotion" color="text-cyan-400" tooltip="Get featured on our pages."/>
                  <FeatureItem text="YouTube Official Artist Channel" color="text-cyan-400" tooltip="Manage OACs for your artists."/>
                  <FeatureItem text="Full access to Cover Art Studio" color="text-cyan-400" tooltip="Unlimited templates."/>
                  <FeatureItem text="Catalog Migration" color="text-cyan-400" tooltip="Move existing catalogs easily."/>
                  <FeatureItem text="Dolby Atmos distribution" color="text-cyan-400" tooltip="Spatial audio support."/>
                  <FeatureItem text="15% off first campaign with Groover" color="text-cyan-400" tooltip="Discount on promotional campaigns."/>
                  <FeatureItem text="Spotify Discovery Mode" color="text-cyan-400" tooltip="Opt-in to Spotify's algorithm booster."/>
                  <FeatureItem text="Sync licensing" color="text-cyan-400" tooltip="Opportunities for TV/Film placement."/>
                  <FeatureItem text="Access to Express Ads" color="text-cyan-400" tooltip="Run ad campaigns directly."/>
                </ul>
              </div>

              {/* ENTERPRISE PLAN */}
              <div className="bg-[#050b14]/50 backdrop-blur-md border border-white/[0.08] rounded-3xl p-10 flex flex-col hover:border-cyan-500/30 transition-all shadow-lg">
                <h3 className="text-xl font-bold uppercase tracking-widest text-white mb-2">TunePlus <span className="text-cyan-500">Enterprise</span></h3>
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-4xl md:text-5xl font-black text-white tracking-tighter">Custom</span>
                </div>
                <p className="text-slate-400 text-sm font-medium mb-8 pb-8 border-b border-white/10 mt-1">For established labels</p>
                <a href="/white-label#demo" className="w-full py-4 text-center rounded-xl bg-transparent border border-slate-700 text-white font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-all mb-8">Get a quote</a>
                
                <p className="text-xs font-bold text-white mb-4">Everything in Label, plus</p>
                <ul className="space-y-4 flex-1">
                  <FeatureItem text="Keep 100% ownership" tooltip="Zero commission."/>
                  <FeatureItem text="Multiple team member accounts" tooltip="Add managers, finance, marketing accounts."/>
                  <FeatureItem text="Advanced analytics & reporting" tooltip="Deep dive data for large catalogs."/>
                  <FeatureItem text="Priority email & phone support" tooltip="Skip the queue."/>
                  <FeatureItem text="Priority release processing" tooltip="Fastest delivery."/>
                  <FeatureItem text="Dedicated account manager" tooltip="A personal rep for your label."/>
                  <FeatureItem text="Marketing Solutions with IMPACT Lite" tooltip="Advanced marketing tools."/>
                  <FeatureItem text="Hassle-Free Catalog Migration" tooltip="We handle the transfer for you."/>
                  <FeatureItem text="Priority access to upcoming features" tooltip="Beta access."/>
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
              {activeTab === 'artists' ? (
                <tr className="border-b border-white/10">
                  <th className="p-6 text-sm font-bold uppercase tracking-widest text-slate-500 w-1/3 bg-transparent"></th>
                  <th className="p-6 text-sm font-bold uppercase tracking-widest text-white text-center">TUNEPLUS STAR</th>
                  <th className="p-6 text-sm font-bold uppercase tracking-widest text-cyan-400 text-center">TUNEPLUS RISE</th>
                </tr>
              ) : (
                <tr className="border-b border-white/10">
                  <th className="p-6 text-sm font-bold uppercase tracking-widest text-slate-500 w-1/3 bg-transparent"></th>
                  <th className="p-6 text-sm font-bold uppercase tracking-widest text-white text-center">TUNEPLUS LABEL</th>
                  <th className="p-6 text-sm font-bold uppercase tracking-widest text-cyan-400 text-center">TUNEPLUS ENTERPRISE</th>
                </tr>
              )}
            </thead>
            <tbody className="divide-y divide-white/5 text-sm font-medium text-slate-300">
              
              {/* ARTIST COMPARISON DATA */}
              {activeTab === 'artists' && (
                <>
                  <ComparisonRow title="Royalty Share" col1="95%" col2="90%" />
                  <ComparisonRow title="No. of Releases" col1="Unlimited" col2="Unlimited" />
                  <ComparisonRow title="UGC (Meta, TikTok, YouTube) Monetization" col1={true} col2={true} />
                  <ComparisonRow title="Distribution to all Major DSPs" col1={true} col2={true} />
                  <ComparisonRow title="All in One Analytics" col1={true} col2={true} />
                  <ComparisonRow title="Custom Release Date" col1="After 7 Days" col2="After 14 Days" />
                  <ComparisonRow title="On Demand Royalty Payouts" col1={true} col2={true} />
                  <ComparisonRow title="Artist Help Center" col1={true} col2={true} />
                  <ComparisonRow title="Royalty Splits at Source" col1={true} col2={true} />
                  <ComparisonRow title="Access to Music Video Distribution" col1={true} col2={true} />
                  <ComparisonRow title="Custom Label Name" col1={true} col2={false} />
                  <ComparisonRow title="Dolby Atmos Distribution" col1={true} col2={false} />
                  <ComparisonRow title="Fan Links (Pre save, master link)" col1={true} col2={true} />
                  <ComparisonRow title="Link in Bio (Micro website builder)" col1={true} col2={true} />
                  <ComparisonRow title="YouTube Content ID" col1={true} col2={true} />
                  <ComparisonRow title="Spotify Discovery Mode" col1={true} col2={false} />
                  <ComparisonRow title="YouTube Official Artist Channel" col1={true} col2={false} />
                </>
              )}

              {/* LABEL COMPARISON DATA */}
              {activeTab === 'labels' && (
                <>
                  <ComparisonRow title="No. of Artists" col1="Unlimited" col2="Unlimited" />
                  <ComparisonRow title="Royalty Share" col1="95%" col2="Custom" />
                  <ComparisonRow title="User Access" col1="Single-user" col2="Multiple team members" />
                  <ComparisonRow title="Analytics Dashboard" col1={true} col2="Advanced Analytics & Reporting" />
                  <ComparisonRow title="Support" col1="Email support" col2="Priority email & phone support" />
                  <ComparisonRow title="Release Management" col1={true} col2={true} />
                  <ComparisonRow title="Label Branding" col1="Basic" col2="Custom" />
                  <ComparisonRow title="Processing Time" col1="Standard" col2="Priority" />
                  <ComparisonRow title="Editorial Playlist Pitching" col1={true} col2={true} />
                  <ComparisonRow title="TunePlus Social Media & Playlist Promotion" col1={true} col2={true} />
                  <ComparisonRow title="YouTube Official Artist Channel" col1={true} col2={true} />
                  <ComparisonRow title="Cover Art Studio" col1="Full Access" col2="Full Access" />
                  <ComparisonRow title="Dolby Atmos Distribution" col1={true} col2={true} />
                  <ComparisonRow title="Groover Campaign Discount" col1="15% off first campaign" col2={true} />
                  <ComparisonRow title="Spotify Discovery Mode" col1={true} col2={true} />
                  <ComparisonRow title="Sync Licensing (TV, Movies, Commercials, Video games)" col1={true} col2={true} />
                  <ComparisonRow title="Early Access to Express Ads" col1={true} col2={true} />
                  <ComparisonRow title="Catalog Migration" col1={true} col2={true} />
                  <ComparisonRow title="Marketing Solutions" col1={false} col2="IMPACT Lite" />
                  <ComparisonRow title="Dedicated Account Manager" col1={false} col2={true} />
                  <ComparisonRow title="Upcoming Features Access" col1={false} col2={true} />
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
            question="What's the difference between the Rise and Star plans?" 
            answer="Rise is ₹82/month with unlimited releases, YouTube Content ID, and 90% royalties. Star is ₹198/month with sync opportunities, funding access, editorial playlist pitching, and 95% royalties."
          />
          <FAQItem 
            question="Do I keep 100% ownership of my music?" 
            answer="Yes! You retain full ownership of your masters and copyrights, no matter the plan."
          />
          <FAQItem 
            question="Can I upgrade my plan later?" 
            answer="Absolutely! You can switch to a higher plan anytime to unlock more benefits directly from your dashboard."
          />
          <FAQItem 
            question="How do royalty payouts work?" 
            answer="Royalties are credited monthly, and you can cash out directly to your bank account whenever your earnings are available."
          />
          <FAQItem 
            question="Is there a refund policy?" 
            answer="No refunds, but you can cancel anytime and still keep all your earnings."
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
        <div className="relative flex-shrink-0 mt-0.5">
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