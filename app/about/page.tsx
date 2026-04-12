'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Rocket, ShieldCheck, Globe, Users, Clock, Banknote, ArrowRight, Zap } from 'lucide-react';

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

export default function AboutPage() {
  const DASHBOARD_URL = 'https://app.tuneplusmusic.com'; 
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#010205] font-sans text-slate-300 selection:bg-cyan-500/30 overflow-x-hidden relative">
      
      <FiberNetwork />
      
      {/* Ambient Glows */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute top-[10%] right-1/4 w-[600px] h-[500px] bg-blue-600/5 blur-[150px] rounded-[100%] mix-blend-screen pointer-events-none"></div>
         <div className="absolute bottom-[10%] left-1/4 w-[500px] h-[400px] bg-cyan-600/5 blur-[150px] rounded-[100%] mix-blend-screen pointer-events-none"></div>
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
            <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="/stores" className="hover:text-white transition-colors">Stores</Link>
            <Link href="/white-label" className="text-cyan-400 hover:text-cyan-300 transition-colors drop-shadow-[0_0_5px_rgba(6,182,212,0.5)]">White Label SaaS</Link>
          </div>

          <div className="flex items-center gap-6">
            <a href={`${DASHBOARD_URL}/login`} className="hidden md:block font-bold text-[12px] uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Login</a>
            <a href={`${DASHBOARD_URL}/signup`} className="group relative overflow-hidden inline-flex bg-cyan-600 text-white px-8 py-3.5 rounded-full font-bold text-[12px] uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              <span className="relative z-10 transition-colors group-hover:text-white">Sign Up Free</span>
              <div className="absolute inset-0 h-full w-0 bg-blue-600 transition-all duration-300 ease-out group-hover:w-full z-0"></div>
            </a>
          </div>
        </div>
      </nav>

      {/* ================= HEADER SECTION ================= */}
      <section className="relative pt-48 pb-20 px-6 text-center z-10 border-b border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-cyan-500/20 text-cyan-400 font-bold text-[10px] uppercase tracking-widest mb-8 bg-cyan-950/20 shadow-inner backdrop-blur-md">
            <Zap size={14}/> Established 2017
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight uppercase text-white mb-8 leading-[0.9]">
            Born From Frustration.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Built For Independence.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 font-medium leading-relaxed max-w-3xl mx-auto">
            We saw independent artists struggling to get their music heard without selling their souls to record labels. So, we built TunePlus. A platform that gives the power, the revenue, and the control back to the creator.
          </p>
        </div>
      </section>

      {/* ================= THE ORIGIN STORY ================= */}
      <section className="py-32 px-6 max-w-[1200px] mx-auto z-10 relative">
        <div className="bg-[#050b14]/70 backdrop-blur-xl border border-white/[0.08] p-10 md:p-16 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-600/5 blur-[120px] rounded-full pointer-events-none"></div>
           
           <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-12 border-b border-white/5 pb-8 relative z-10">
              The System Was <span className="text-cyan-500">Broken.</span>
           </h3>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-slate-400 font-medium leading-relaxed text-base relative z-10">
              <div>
                 <p className="mb-6">
                   Back in 2017, the music industry was gatekept by traditional record labels. An independent artist couldn't just upload their hard work directly to streaming platforms like Spotify or Apple Music. They were forced to beg labels, sign away their master rights, and settle for pennies on the dollar.
                 </p>
                 <p>
                   Even worse, if an artist needed to fix a simple typo in their song title (metadata), they had to wait weeks for a label representative to reply to emails. Releasing a song took 5 to 10 agonizing days. <strong className="text-slate-200 font-bold">The artists were doing all the work, but had zero control.</strong>
                 </p>
              </div>
              <div className="md:border-l md:border-white/5 md:pl-12">
                 <p className="mb-6">
                   <strong className="text-cyan-400 font-bold text-lg block mb-2">That's why TunePlus was born.</strong> 
                   We decided to build a master infrastructure that cuts out the middleman entirely, leveling the playing field for independent creators worldwide.
                 </p>
                 <p>
                   Today, with TunePlus, your music goes live across 150+ global stores in record time. You own 100% of your copyright. You update your metadata instantly from a self-serve dashboard. No begging, no waiting, no hidden fees. Just pure, uncompromised independence.
                 </p>
              </div>
           </div>
        </div>
      </section>

      {/* ================= THE TUNEPLUS GUARANTEE (Hooks) ================= */}
      <section className="py-24 px-6 max-w-[1400px] mx-auto z-10 relative border-t border-white/5">
        <div className="text-center mb-20">
          <p className="text-[12px] font-bold uppercase tracking-widest text-cyan-500 mb-2">Our Promise</p>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">The TunePlus <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Guarantee</span></h2>
          <p className="text-slate-400 font-medium text-lg">Why thousands of artists trust us with their life's work.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           
           {/* Hook 1: Anti-Takedown */}
           <div className="bg-[#050b14]/50 border border-white/[0.08] p-10 rounded-3xl backdrop-blur-md hover:bg-[#050b14]/80 hover:border-emerald-500/30 transition-all duration-500 shadow-lg group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-16 h-16 bg-[#010205] border border-white/10 rounded-2xl flex items-center justify-center text-emerald-500 mb-8 group-hover:scale-110 transition-transform duration-500 shadow-inner relative z-10">
                 <ShieldCheck size={28} />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-4 relative z-10">No Hostage Takedowns</h3>
              <p className="text-slate-400 font-medium leading-relaxed text-sm relative z-10">
                Other distributors delete your music the second your subscription expires. <strong className="text-emerald-400">Not us.</strong> Even if your plan lapses, your music stays live and continues to generate lifetime revenue until you explicitly confirm a takedown.
              </p>
           </div>

           {/* Hook 2: Speed */}
           <div className="bg-[#050b14]/50 border border-white/[0.08] p-10 rounded-3xl backdrop-blur-md hover:bg-[#050b14]/80 hover:border-blue-500/30 transition-all duration-500 shadow-lg group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-16 h-16 bg-[#010205] border border-white/10 rounded-2xl flex items-center justify-center text-blue-500 mb-8 group-hover:scale-110 transition-transform duration-500 shadow-inner relative z-10">
                 <Clock size={28} />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-4 relative z-10">Instant Self-Serve Rights</h3>
              <p className="text-slate-400 font-medium leading-relaxed text-sm relative z-10">
                Tired of waiting days for support teams to fix your song's name? Our Self-Serve Rights Commander lets you edit metadata, lyrics, and profiles instantly from your dashboard.
              </p>
           </div>

           {/* Hook 3: Transparency */}
           <div className="bg-[#050b14]/50 border border-white/[0.08] p-10 rounded-3xl backdrop-blur-md hover:bg-[#050b14]/80 hover:border-cyan-500/30 transition-all duration-500 shadow-lg group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-16 h-16 bg-[#010205] border border-white/10 rounded-2xl flex items-center justify-center text-cyan-500 mb-8 group-hover:scale-110 transition-transform duration-500 shadow-inner relative z-10">
                 <Banknote size={28} />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-4 relative z-10">100% Transparent Royalties</h3>
              <p className="text-slate-400 font-medium leading-relaxed text-sm relative z-10">
                We believe what you earn is yours. Access crystal-clear, daily streaming analytics and automated monthly payout ledgers. No hidden accounting tricks, just your money.
              </p>
           </div>

        </div>

        <div className="text-center mt-24">
          <a href={`${DASHBOARD_URL}/signup`} className="group relative overflow-hidden inline-flex bg-cyan-600 text-white px-12 py-5 rounded-full font-bold text-xs uppercase tracking-widest shadow-[0_0_40px_rgba(6,182,212,0.4)]">
            <span className="relative z-10 transition-colors group-hover:text-white flex items-center gap-2">Take Control Of Your Music <ArrowRight size={16}/></span>
            <div className="absolute inset-0 h-full w-0 bg-blue-600 transition-all duration-300 ease-out group-hover:w-full z-0"></div>
          </a>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#010205] pt-20 pb-10 border-t border-white/5 text-center md:text-left relative z-20">
         <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
          <div className="col-span-1 lg:col-span-1">
             <div className="flex items-center justify-center md:justify-start gap-2 mb-6 h-12">
               <div className="relative w-40 h-full">
                  <Image src="/logos/tuneplus-logo.png" alt="TunePlus Logo" fill className="object-contain object-left md:object-left" />
               </div>
             </div>
             <p className="text-slate-500 font-medium text-sm pr-4">Empowering independent artists globally with premium distribution and uncompromised royalty collection since 2017.</p>
          </div>
          
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8 text-slate-600">Learn About TunePlus</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-400">
              <li><span className="text-cyan-500 transition-colors drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">About TunePlus</span></li>
              <li><Link href="/leadership" className="hover:text-cyan-400 transition-colors">Leadership</Link></li>
              <li><Link href="/terms-and-conditions" className="hover:text-cyan-400 transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link></li>
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
              <a href="https://x.com/TuneplusMusic" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">X (Twitter)</a>
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
           </div>
        </div>
      </footer>

    </div>
  );
}