'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Globe, BarChart3, ShieldCheck, 
  ArrowRight, Music, CheckCircle2, PlayCircle,
  Zap, Headphones, Users, Image as ImageIcon, Rocket, Play,
  Sparkles, Star, Bot, Plus, Minus
} from 'lucide-react';

// ================= 1. INTENSIFIED NETWORK FIBER =================
export const FiberNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray: any[] = [];
    const numberOfParticles = 250; 
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
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.speedY = (Math.random() - 0.5) * 0.8;
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
        ctx!.fillStyle = 'rgba(59, 130, 246, 0.4)';
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
          if (distance < 150) { 
            ctx!.beginPath();
            ctx!.strokeStyle = `rgba(59, 130, 246, ${0.25 - distance/1000})`; 
            ctx!.lineWidth = 0.5;
            ctx!.moveTo(particlesArray[i].x, particlesArray[i].y);
            ctx!.lineTo(particlesArray[j].x, particlesArray[j].y);
            ctx!.stroke();
          }
        }
        
        const dxMouse = particlesArray[i].x - mouse.x;
        const dyMouse = particlesArray[i].y - mouse.y;
        const distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distanceMouse < 250) { 
          ctx!.beginPath();
          ctx!.strokeStyle = `rgba(6, 182, 212, ${0.6 - distanceMouse/500})`; 
          ctx!.lineWidth = 1.5;
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


export default function TunePlusLandingPage() {
  const DASHBOARD_URL = 'https://app.tuneplusmusic.com'; 

  return (
    <div className="min-h-screen bg-[#02040a] font-sans text-slate-200 selection:bg-blue-500/30 overflow-x-hidden relative">
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: scroll 35s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />

      {/* Network Background */}
      <FiberNetwork />

      {/* Ambient Glows (Clean & Subtle) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-cyan-600/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none"></div>
      </div>

      {/* ================= PREMIUM NAVBAR ================= */}
      <nav className="fixed top-0 w-full bg-[#02040a]/90 backdrop-blur-xl border-b border-white/5 z-50 transition-all duration-300">
        <div className="max-w-[1400px] mx-auto px-6 h-24 flex items-center justify-between relative z-10">
          <Link href="/" className="flex items-center gap-3 group cursor-pointer h-full py-4">
             <div className="relative w-48 h-full group-hover:scale-105 transition-transform">
                <Image 
                  src="/logos/tuneplus-logo.png" 
                  alt="TunePlus Logo" 
                  fill
                  className="object-contain object-left drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                  priority
                />
             </div>
          </Link>
          
          <div className="hidden lg:flex items-center gap-8 font-bold text-[12px] uppercase tracking-widest text-slate-400">
            <Link href="/features" className="hover:text-white transition-colors">Features</Link>
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <Link href="/splits" className="hover:text-white transition-colors">Splits</Link>
            <Link href="/accelerator" className="hover:text-white transition-colors">Accelerator</Link>
            <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="/stores" className="hover:text-white transition-colors">Stores</Link>
            <Link href="/white-label" className="text-cyan-400 hover:text-cyan-300 transition-colors drop-shadow-[0_0_5px_rgba(6,182,212,0.5)]">White Label SaaS</Link>
          </div>

          <div className="flex items-center gap-6">
            <a href={`${DASHBOARD_URL}/login`} className="hidden md:block font-bold text-[12px] uppercase tracking-widest text-slate-400 hover:text-white transition-colors">
              Login
            </a>
            {/* SWEEP BUTTON */}
            <a href={`${DASHBOARD_URL}/signup`} className="group relative overflow-hidden inline-flex bg-cyan-600 text-white px-8 py-3.5 rounded-full font-bold text-[12px] uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              <span className="relative z-10 transition-colors group-hover:text-white">Sign Up Free</span>
              <div className="absolute inset-0 h-full w-0 bg-blue-600 transition-all duration-300 ease-out group-hover:w-full z-0"></div>
            </a>
          </div>
        </div>
      </nav>

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-32 px-6 flex items-center justify-center overflow-hidden min-h-[90vh] z-10">
        <div className="relative z-10 max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          
          <div className="text-center lg:text-left order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold text-[11px] uppercase tracking-widest mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(37,99,235,0.1)]">
              <Zap size={14} className="text-amber-400"/> Powered by TunePlus V3
            </div>
            
            <h1 className="text-6xl md:text-7xl lg:text-[5.5rem] font-black tracking-tight uppercase leading-[0.95] mb-8 text-white">
              Deliver Your Music <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Worldwide.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 font-medium mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Get your music on Spotify, Apple Music, YouTube, JioSaavn, and 150+ more stores. 
              Keep 100% ownership of your music and stay in control of your career. 
              Unlimited Releases starting at <strong className="text-white">₹999*/year.</strong>
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
              {/* SWEEP BUTTON */}
              <a href={`${DASHBOARD_URL}/signup`} className="w-full sm:w-auto group relative overflow-hidden inline-flex bg-cyan-600 text-white px-12 py-5 rounded-full font-bold text-sm uppercase tracking-widest transition-all duration-300 shadow-[0_0_40px_rgba(6,182,212,0.4)] items-center justify-center gap-3">
                <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors">Start Now <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/></span>
                <div className="absolute inset-0 h-full w-0 bg-blue-600 transition-all duration-300 ease-out group-hover:w-full z-0"></div>
              </a>

              <div className="flex items-center gap-3 cursor-pointer group">
                 <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md group-hover:bg-white/10 transition-colors">
                   <Play size={18} className="text-slate-300 ml-1 group-hover:text-white transition-colors"/>
                 </div>
                 <div className="text-left">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Watch Video</p>
                    <p className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">How it works</p>
                 </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative w-full h-[400px] lg:h-[600px] flex items-center justify-center">
             
             {/* ====== FIX: Perfect Fade at the bottom ====== */}
             <div className="relative w-full h-full z-20 flex items-end justify-center transform hover:scale-105 transition-transform duration-700">
                <div className="relative w-full h-full" style={{ WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 15%)', maskImage: 'linear-gradient(to top, transparent 0%, black 15%)' }}>
                   <Image src="/team/home image.png" alt="Artist Singing" fill className="object-contain object-bottom drop-shadow-2xl" priority />
                </div>
             </div>

             {/* RAW FLOATING LOGOS */}
             <div className="absolute top-10 right-10 lg:-right-10 w-20 h-20 z-30 animate-bounce-slow drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
               <Image src="/logos/spotify.png" alt="Spotify" fill className="object-contain" />
             </div>
             <div className="absolute bottom-20 left-0 lg:-left-10 w-24 h-24 z-30 animate-bounce-slow delay-300 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
               <Image src="/logos/Apple.png" alt="Apple Music" fill className="object-contain" />
             </div>
             <div className="absolute top-1/2 -translate-y-1/2 -right-4 lg:-right-16 w-16 h-16 z-30 animate-bounce-slow delay-500 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
               <Image src="/logos/tik-tok.png" alt="TikTok" fill className="object-contain" />
             </div>
          </div>
        </div>
      </section>

      {/* ================= SECONDARY HEADLINE ================= */}
      <section className="py-24 px-6 border-y border-white/5 bg-[#030814]/50 backdrop-blur-sm text-center relative z-10">
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase text-white mb-6">
            <span className="text-blue-500 drop-shadow-[0_0_15px_rgba(37,99,235,0.5)]">Unlimited Distribution</span> Starting at ₹999*/year
          </h2>
          <p className="text-slate-400 text-lg font-medium leading-relaxed">
            Increase the reach of your music across the most popular stores & platforms like Spotify, Apple Music, YouTube and many more. Empower yourself with unlimited distribution opportunities, and get your music heard by a global audience.
            <br/><br/>
            <strong className="text-white font-bold bg-white/5 px-6 py-3 rounded-xl inline-block border border-white/10 shadow-sm">Keep 100% ownership of your music, maintaining creative control and authority in your music career.</strong>
          </p>
        </div>
      </section>

      {/* ================= STORES TAPE (FULL COLOR) ================= */}
      <section className="py-16 bg-transparent border-b border-white/5 overflow-hidden relative z-10">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex justify-between items-center mb-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">150+ Digital Stores & Platforms</p>
            {/* SWEEP BUTTON */}
            <Link href="/stores" className="group relative overflow-hidden inline-flex bg-cyan-600/20 border border-cyan-500/30 text-white px-6 py-2.5 rounded-full font-bold text-[11px] uppercase tracking-widest transition-all shadow-sm">
              <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors">View All Stores <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/></span>
              <div className="absolute inset-0 h-full w-0 bg-blue-600 transition-all duration-300 ease-out group-hover:w-full z-0"></div>
            </Link>
          </div>
          
          <div className="relative w-full flex overflow-hidden py-4">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#02040a] to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#02040a] to-transparent z-10"></div>

            <div className="animate-marquee flex items-center">
              <div className="flex items-center gap-24 px-12 shrink-0">
                <Image src="/logos/spotify.png" alt="Spotify" width={120} height={40} className="object-contain hover:scale-110 transition-transform cursor-pointer drop-shadow-md"/>
                <Image src="/logos/Apple.png" alt="Apple Music" width={120} height={40} className="object-contain hover:scale-110 transition-transform cursor-pointer drop-shadow-md"/>
                <Image src="/logos/youtube.png" alt="YouTube" width={120} height={40} className="object-contain hover:scale-110 transition-transform cursor-pointer drop-shadow-md"/>
                <Image src="/logos/amazon.png" alt="Amazon Music" width={120} height={40} className="object-contain hover:scale-110 transition-transform cursor-pointer drop-shadow-md"/>
                <Image src="/logos/metaaaa.png" alt="Meta" width={120} height={40} className="object-contain hover:scale-110 transition-transform cursor-pointer drop-shadow-md"/>
                <Image src="/logos/saavn.png" alt="JioSaavn" width={120} height={40} className="object-contain hover:scale-110 transition-transform cursor-pointer drop-shadow-md"/>
              </div>
              <div className="flex items-center gap-24 px-12 shrink-0">
                <Image src="/logos/spotify.png" alt="Spotify" width={120} height={40} className="object-contain hover:scale-110 transition-transform cursor-pointer drop-shadow-md"/>
                <Image src="/logos/Apple.png" alt="Apple Music" width={120} height={40} className="object-contain hover:scale-110 transition-transform cursor-pointer drop-shadow-md"/>
                <Image src="/logos/youtube.png" alt="YouTube" width={120} height={40} className="object-contain hover:scale-110 transition-transform cursor-pointer drop-shadow-md"/>
                <Image src="/logos/amazon.png" alt="Amazon Music" width={120} height={40} className="object-contain hover:scale-110 transition-transform cursor-pointer drop-shadow-md"/>
                <Image src="/logos/metaaaa.png" alt="Meta" width={120} height={40} className="object-contain hover:scale-110 transition-transform cursor-pointer drop-shadow-md"/>
                <Image src="/logos/saavn.png" alt="JioSaavn" width={120} height={40} className="object-contain hover:scale-110 transition-transform cursor-pointer drop-shadow-md"/>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHAT IS TUNEPLUS ================= */}
      <section className="py-32 px-6 max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center gap-20 relative z-10">
        <div className="flex-1 w-full relative perspective-1000">
           <div className="absolute inset-0 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
           
           <div className="relative z-10 w-full aspect-square md:aspect-[4/3] lg:aspect-square transform rotate-y-[-5deg] rotate-x-[5deg] hover:rotate-y-0 hover:rotate-x-0 transition-transform duration-700 group flex items-center justify-center">
              
              {/* Global Reach Map Image */}
              <Image 
                src="/team/Global Reach.png" 
                alt="Global Reach Map" 
                fill 
                className="object-contain object-center drop-shadow-[0_0_40px_rgba(59,130,246,0.3)] group-hover:scale-105 transition-all duration-700" 
              />

           </div>
        </div>

        <div className="flex-1 text-left lg:pl-10">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300 font-bold text-[10px] uppercase tracking-widest mb-8 backdrop-blur-sm">
            <Globe size={14} className="text-blue-500"/> The Global Platform
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white mb-8 leading-[0.9]">
            What is <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">TunePlus?</span>
          </h2>
          <p className="text-xl text-slate-400 font-medium mb-12 leading-relaxed">
            TunePlus is the ultimate global platform for independent musicians to build audiences and careers. We offer blazing-fast technology and services across digital distribution and a range of powerful promotional tools.
          </p>
          
          {/* SWEEP BUTTON */}
          <a href={`${DASHBOARD_URL}/signup`} className="group relative overflow-hidden inline-flex bg-cyan-600 text-white px-12 py-5 rounded-full font-bold text-sm uppercase tracking-widest shadow-[0_0_40px_rgba(6,182,212,0.4)] items-center gap-3">
            <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors">Sell Your Music Now <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/></span>
            <div className="absolute inset-0 h-full w-0 bg-blue-600 transition-all duration-300 ease-out group-hover:w-full z-0"></div>
          </a>

        </div>
      </section>

      {/* ================= WHY CHOOSE TUNEPLUS (MADVERSE STYLE CLEAN BLOCKS) ================= */}
      <section className="py-32 px-6 border-y border-white/5 relative z-10">
        <div className="max-w-[1400px] mx-auto relative">
          <div className="mb-20">
            <p className="text-[12px] font-bold uppercase tracking-widest text-blue-500 mb-2">FEATURES</p>
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tight text-white mb-6 drop-shadow-md">
              All The Essentials, <br/>Right At Your Fingertips
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16">
            <CleanFeatureBlock 
              icon={Globe} 
              title="Unlimited Distribution" 
              desc="Unlimited music distribution worldwide to all major platforms seamlessly." 
            />
            <CleanFeatureBlock 
              icon={Headphones} 
              title="150+ Digital Stores" 
              desc="Direct pipeline to 150+ digital stores and streaming services globally." 
            />
            <CleanFeatureBlock 
              icon={ShieldCheck} 
              title="Zero Hidden Fees" 
              desc="No annual fee for releases on social platforms like Instagram & TikTok." 
            />
            <CleanFeatureBlock 
              icon={BarChart3} 
              title="Detailed Analytics" 
              desc="Crystal-clear sales and streaming data to guide your future music strategy." 
            />
          </div>
          
          <div className="mt-20">
            {/* SWEEP BUTTON */}
            <a href={`${DASHBOARD_URL}/signup`} className="group relative overflow-hidden inline-flex items-center justify-center gap-3 bg-cyan-600 text-white px-12 py-5 rounded-full font-bold text-sm uppercase tracking-widest transition-all duration-300 shadow-[0_0_40px_rgba(6,182,212,0.3)]">
              <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors">Join TunePlus <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/></span>
              <div className="absolute inset-0 h-full w-0 bg-blue-600 transition-all duration-300 ease-out group-hover:w-full z-0"></div>
            </a>
          </div>
        </div>
      </section>

      {/* ================= HALL OF FAME / SUCCESS STORIES ================= */}
      <section className="py-32 px-6 max-w-[1400px] mx-auto relative z-10">
        <div className="text-center mb-16">
           <p className="text-[12px] font-bold uppercase tracking-widest text-amber-500 mb-2">SUCCESS STORIES</p>
           <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tight text-white mb-6">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-600">Hall of Fame</span>
           </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="bg-[#050b14]/50 border border-white/10 rounded-[2rem] overflow-hidden group hover:border-amber-500/30 transition-all duration-500 shadow-xl backdrop-blur-sm">
              <div className="h-72 w-full bg-slate-800 relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-t from-[#050b14] to-transparent z-10"></div>
                 <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1493225457124-a1a2a5f59043?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center group-hover:scale-105 transition-transform duration-700 opacity-50"></div>
              </div>
              <div className="p-10 relative z-20 -mt-20">
                 <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-4">First South-Asian Track on Global TV</h3>
                 <p className="text-slate-400 font-medium leading-relaxed">
                    TunePlus helped an independent artist secure a massive sync deal, getting their debut hip-hop track featured on a globally recognized reality TV show, unlocking millions of new listeners worldwide overnight.
                 </p>
              </div>
           </div>

           <div className="bg-[#050b14]/50 border border-white/10 rounded-[2rem] overflow-hidden group hover:border-blue-500/30 transition-all duration-500 shadow-xl backdrop-blur-sm">
              <div className="h-72 w-full bg-slate-800 relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-t from-[#050b14] to-transparent z-10"></div>
                 <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center group-hover:scale-105 transition-transform duration-700 opacity-50"></div>
              </div>
              <div className="p-10 relative z-20 -mt-20">
                 <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-4">20M+ Streams Breakthrough</h3>
                 <p className="text-slate-400 font-medium leading-relaxed">
                    A breakout hit from a rising independent rapper crossed the 20M+ streams mark. By leveraging our editorial pitching and accelerator tools, the track shifted from niche underground to mainstream dominance.
                 </p>
              </div>
           </div>
        </div>
      </section>

      {/* ================= AI MUSIC NAVIGATOR ================= */}
      <section className="py-20 px-6 max-w-[1200px] mx-auto relative z-10 mb-20">
         <div className="bg-[#050b14]/80 backdrop-blur-xl border border-cyan-500/20 rounded-[3rem] p-10 lg:p-16 flex flex-col lg:flex-row items-center gap-12 shadow-[0_20px_50px_rgba(6,182,212,0.1)] relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
            
            <div className="flex-1 relative z-10">
               <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-6">
                 Meet <span className="text-cyan-400">TuneAI</span> <br/>
                 <span className="text-2xl text-slate-300">Your Music Navigator</span>
               </h2>
               <p className="text-slate-400 font-medium text-lg leading-relaxed mb-8">
                 No more confusion, no more guesswork. TuneAI will help you break down industry jargon, simplify releases, and answer all your music industry questions instantly inside your dashboard.
               </p>
               <div className="flex items-center gap-4">
                  {/* SWEEP BUTTON */}
                  <a href={`${DASHBOARD_URL}/login`} className="group relative overflow-hidden inline-flex bg-cyan-600 text-white px-8 py-3.5 rounded-full font-bold text-sm uppercase tracking-widest shadow-[0_0_20px_rgba(6,182,212,0.3)] items-center gap-2">
                    <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors"><Bot size={18}/> Ask TuneAI</span>
                    <div className="absolute inset-0 h-full w-0 bg-blue-600 transition-all duration-300 ease-out group-hover:w-full z-0"></div>
                  </a>
               </div>
            </div>

            <div className="flex-1 w-full relative h-[300px] flex items-center justify-center">
               <div className="absolute w-[200px] h-[200px] bg-cyan-500/10 rounded-full blur-[50px] animate-pulse"></div>
               
               <div className="bg-[#02040a] border border-white/10 rounded-2xl p-6 w-full max-w-sm relative z-10 shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                  <div className="flex items-center gap-3 mb-4">
                     <div className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center"><Bot size={16} className="text-white"/></div>
                     <p className="text-xs font-bold text-slate-300 uppercase tracking-widest">TuneAI</p>
                  </div>
                  <p className="text-sm font-medium text-slate-400">
                     "What is an ISRC code and why do I need it?"
                  </p>
               </div>

               <div className="bg-[#050b14] border border-slate-800 rounded-2xl p-6 w-full max-w-sm absolute -bottom-8 right-0 z-20 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                  <p className="text-sm font-medium text-slate-300">
                     An ISRC (International Standard Recording Code) is a unique digital fingerprint for your track. Don't worry, TunePlus generates it for you automatically! 🚀
                  </p>
               </div>
            </div>
         </div>
      </section>

      {/* ================= ACCELERATOR & TOOLS (CLEAN STYLE) ================= */}
      <section className="py-32 px-6 max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10 border-t border-white/5">
        
        <div className="bg-transparent border border-white/10 rounded-[2.5rem] p-12 text-left relative overflow-hidden group hover:bg-white/[0.02] transition-colors duration-500">
          <div className="relative z-10">
            <div className="mb-8 text-blue-500">
              <ImageIcon size={40} strokeWidth={1.5}/>
            </div>
            <h3 className="text-4xl font-black uppercase tracking-tight text-white mb-6">Be Your Own <br/><span className="text-blue-500">Designer</span></h3>
            <p className="text-slate-400 font-medium mb-12 text-lg leading-relaxed max-w-md">
              Create your Cover Art with Layouts, Images, Presets, Filters, Fonts, and Overlays. Customize your TunePlus Cover Art seamlessly during the upload process.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              {/* SWEEP BUTTON */}
              <a href={`${DASHBOARD_URL}/signup`} className="group relative overflow-hidden inline-flex bg-white text-black px-10 py-4 rounded-full font-bold text-xs uppercase tracking-widest shadow-[0_0_30px_rgba(6,182,212,0.3)] items-center gap-2">
                <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors">Sign Up Now</span>
                <div className="absolute inset-0 h-full w-0 bg-blue-600 transition-all duration-300 ease-out group-hover:w-full z-0"></div>
              </a>
            </div>
          </div>
        </div>

        <div className="bg-transparent border border-white/10 rounded-[2.5rem] p-12 text-left relative overflow-hidden group hover:bg-white/[0.02] transition-colors duration-500">
          <div className="relative z-10">
            <div className="mb-8 text-amber-500">
              <Rocket size={40} strokeWidth={1.5}/>
            </div>
            <div className="inline-block bg-amber-500/10 text-amber-400 px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest mb-6 border border-amber-500/20">TunePlus Accelerator</div>
            <h3 className="text-4xl font-black uppercase tracking-tight text-white mb-2 leading-[0.9]">Reach More Fans.</h3>
            <h3 className="text-4xl font-black uppercase tracking-tight text-blue-400 mb-8 leading-[0.9]">Increase Streams.</h3>
            <p className="text-slate-400 font-medium mb-12 text-lg leading-relaxed max-w-md">
              Join TunePlus to access the Accelerator platform and speed up your success! TunePlus leverages innovative tools to elevate tracks for greater audience reach.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              {/* SWEEP BUTTON */}
              <a href={`${DASHBOARD_URL}/signup`} className="group relative overflow-hidden inline-flex bg-cyan-600 text-white px-10 py-4 rounded-full font-bold text-xs uppercase tracking-widest shadow-[0_0_30px_rgba(6,182,212,0.3)] items-center gap-2">
                <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors">Sign Up</span>
                <div className="absolute inset-0 h-full w-0 bg-blue-600 transition-all duration-300 ease-out group-hover:w-full z-0"></div>
              </a>
            </div>
          </div>
        </div>

      </section>

      {/* ================= FREQUENTLY ASKED QUESTIONS (FAQ) ================= */}
      <section className="py-24 px-6 max-w-[900px] mx-auto z-10 relative border-t border-white/5">
        <div className="mb-16">
          <p className="text-[12px] font-bold uppercase tracking-widest text-blue-500 mb-2">FAQS</p>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-6">
            Frequently Asked <br/>Questions
          </h2>
        </div>

        <div className="flex flex-col border-t border-white/10">
          <FAQItem 
            question="What is music distribution, and why is it important?" 
            answer="Music distribution involves getting your music onto various platforms and streaming services like Spotify and Apple Music so it can be accessed by listeners worldwide. For independent artists, it's crucial because it ensures your music reaches a broader audience, maximizes your exposure, and helps you manage your music royalties efficiently."
          />
          <FAQItem 
            question="How long does it take for my music to go live?" 
            answer="With our Fast Lane Delivery, your music can go live on major platforms like Spotify and Apple Music in as little as 24-48 hours. However, we recommend submitting your release at least 2 weeks in advance to ensure pitching opportunities."
          />
          <FAQItem 
            question="Do I keep 100% of my royalties?" 
            answer="Yes! TunePlus operates on a transparent model. Depending on the plan you choose, you keep up to 100% of your streaming revenue and master rights. No hidden cuts, no hostage contracts."
          />
          <FAQItem 
            question="Can I migrate my catalog from another distributor?" 
            answer="Absolutely. You can migrate your entire catalog to TunePlus without losing your play counts or playlist placements. Simply use the exact same audio files, metadata, and ISRC codes when uploading your tracks to our platform."
          />
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-black pt-20 pb-10 border-t border-white/5 text-center md:text-left relative z-20">
         <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
          <div className="col-span-1 lg:col-span-1">
             <div className="flex items-center justify-center md:justify-start h-16 mb-6">
                <div className="relative w-40 h-full">
                  <Image 
                    src="/logos/tuneplus-logo.png" 
                    alt="TunePlus Logo" 
                    fill 
                    className="object-contain object-left md:object-left" 
                  />
                </div>
             </div>
             <p className="text-slate-500 font-medium text-sm pr-4">Empowering independent artists globally with premium distribution and uncompromised royalty collection since 2017.</p>
          </div>
          
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8 text-slate-600">Learn About TunePlus</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-400">
              <li><Link href="/about" className="hover:text-cyan-400 transition-colors">About TunePlus</Link></li>
              <li><Link href="/leadership" className="hover:text-cyan-400 transition-colors">Leadership</Link></li>
              <li><Link href="/terms-and-conditions" className="hover:text-cyan-400 transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/refund-policy" className="hover:text-cyan-400 transition-colors">Refund Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8 text-slate-600">Distribute</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-400">
              <li><a href={`${DASHBOARD_URL}/signup`} className="hover:text-cyan-400 transition-colors">Join TunePlus</a></li>
              <li><Link href="/features" className="hover:text-cyan-400 transition-colors">Features</Link></li>
              <li><Link href="/services" className="hover:text-cyan-400 transition-colors">Services</Link></li>
              <li><Link href="/splits" className="hover:text-cyan-400 transition-colors">Splits</Link></li>
              <li><Link href="/accelerator" className="hover:text-cyan-400 transition-colors">Accelerator</Link></li>
              <li><Link href="/pricing" className="hover:text-cyan-400 transition-colors">Pricing & Plans</Link></li>
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

        <div className="max-w-[1400px] mx-auto px-6 pt-8 border-t border-slate-800/50 flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
             © {new Date().getFullYear()} TunePlus Music. All rights reserved.
           </div>
           <div className="flex items-center gap-8 text-[10px] font-bold uppercase tracking-widest text-slate-500">
              <a href="https://www.facebook.com/profile.php?id=61557369243454" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Facebook</a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">X (Twitter)</a>
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
           </div>
        </div>
      </footer>

    </div>
  );
}

// ================= PREMIUM HELPER COMPONENTS =================

function CleanFeatureBlock({ icon: Icon, title, desc }: any) {
  return (
    <div className="text-left group">
      <div className="mb-6 text-blue-500">
         <Icon size={32} strokeWidth={1.5} className="group-hover:text-cyan-400 transition-colors duration-300" />
      </div>
      <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-3">{title}</h3>
      <p className="text-slate-400 font-medium leading-relaxed text-sm">{desc}</p>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div 
      className="border-b border-white/10 py-6 cursor-pointer group" 
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex justify-between items-center gap-6">
        <h4 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{question}</h4>
        <div className="shrink-0 text-slate-500">
          {isOpen ? <Minus size={20} className="text-cyan-500" /> : <Plus size={20} className="group-hover:text-blue-400 transition-colors" />}
        </div>
      </div>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
        <p className="text-slate-400 font-medium leading-relaxed text-base">
          {answer}
        </p>
      </div>
    </div>
  );
}