'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRight, Rocket, TrendingUp, 
  Target, PlayCircle, Zap, Globe, 
  Play, ChevronRight
} from 'lucide-react';

// ================= 1. STANDARD NETWORK FIBER BACKGROUND =================
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
        ctx!.fillStyle = 'rgba(6, 182, 212, 0.3)'; // Cyan particles (Standard)
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
            ctx!.strokeStyle = `rgba(6, 182, 212, ${0.15 - distance/800})`; // Cyan lines (Standard)
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
          ctx!.strokeStyle = `rgba(59, 130, 246, ${0.4 - distanceMouse/500})`; // Blue interaction (Standard)
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

// ================= MAIN COMPONENT =================
export default function AcceleratorPage() {
  const DASHBOARD_URL = 'https://app.tuneplusmusic.com'; 
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#02040a] font-sans text-slate-200 selection:bg-cyan-500/30 overflow-x-hidden relative">
      
      <FiberNetwork />

      {/* Ambient Glows (Standardized to Cyan/Blue) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] right-0 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full mix-blend-screen"></div>
        <div className="absolute bottom-[10%] left-0 w-[500px] h-[500px] bg-cyan-600/10 blur-[150px] rounded-full mix-blend-screen"></div>
      </div>

      {/* ================= STANDARD NAVBAR ================= */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#02040a]/90 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between relative z-10">
          <Link href="/" className="flex items-center gap-3 group h-12">
             <div className="relative w-48 h-full group-hover:scale-105 transition-transform">
                <Image src="/logos/tuneplus-logo.png" alt="TunePlus Logo" fill className="object-contain object-left drop-shadow-[0_0_10px_rgba(6,182,212,0.3)]" priority/>
             </div>
          </Link>
          
          <div className="hidden xl:flex items-center gap-6 font-bold text-[11px] uppercase tracking-widest text-slate-400">
            <Link href="/features" className="hover:text-white transition-colors">Features</Link>
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <Link href="/splits" className="hover:text-white transition-colors">Splits</Link>
            <span className="text-white border-b-2 border-cyan-500 pb-1">Accelerator</span>
            <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
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
      <section className="relative pt-48 pb-20 px-6 text-center z-10">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-black text-[10px] uppercase tracking-widest mb-10 shadow-[0_0_20px_rgba(6,182,212,0.2)] backdrop-blur-md">
            <Zap size={14} className="animate-pulse"/> TunePlus Accelerator 4.0
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-black uppercase tracking-tight text-white mb-6 leading-[0.95] drop-shadow-2xl">
            How Artists <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Grow Faster.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 font-medium mb-12 max-w-3xl mx-auto leading-relaxed">
            TunePlus Accelerator is the powerhouse platform that develops independent artists. We force algorithmic triggers to accelerate your career through global discovery.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href={`${DASHBOARD_URL}/signup`} className="group relative overflow-hidden inline-flex bg-cyan-600 text-white px-14 py-5 rounded-full font-black text-sm uppercase tracking-widest transition-all duration-300 shadow-[0_0_40px_rgba(6,182,212,0.4)] items-center gap-3 hover:-translate-y-1">
              <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors">Start Campaign <ArrowRight size={18}/></span>
              <div className="absolute inset-0 h-full w-0 bg-blue-600 transition-all duration-300 ease-out group-hover:w-full z-0"></div>
            </a>
            <a href="#case-studies" className="group relative overflow-hidden inline-flex bg-transparent border border-white/20 text-white px-14 py-5 rounded-full font-black text-sm uppercase tracking-widest transition-all duration-300 items-center gap-3 hover:bg-white/5">
              <PlayCircle size={18}/> Watch Video
            </a>
          </div>
        </div>
      </section>

      {/* ================= STATS SECTION ================= */}
      <section className="py-24 border-y border-white/5 bg-[#050b14]/50 relative z-20">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">The Numbers Speak <span className="text-cyan-400">For Themselves</span></h2>
            <p className="text-slate-400 font-medium">Real results from our active accelerator campaigns.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="bg-[#02040a] p-10 rounded-3xl border border-white/10 hover:border-cyan-500/50 transition-colors group relative overflow-hidden shadow-lg">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500"><TrendingUp size={80} className="text-cyan-500"/></div>
              <h4 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-2 relative z-10">24B+</h4>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest relative z-10 mb-4">Stream Growth</p>
              <p className="text-slate-500 font-medium text-sm leading-relaxed relative z-10">Over the past year, the program has contributed to massive stream boosts for activated tracks.</p>
            </div>
            
            <div className="bg-[#02040a] p-10 rounded-3xl border border-white/10 hover:border-blue-500/50 transition-colors group relative overflow-hidden shadow-lg">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500"><Globe size={80} className="text-blue-500"/></div>
              <h4 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-2 relative z-10">2.8B</h4>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest relative z-10 mb-4">Artist Discoveries</p>
              <p className="text-slate-500 font-medium text-sm leading-relaxed relative z-10">It has driven over 2.8 billion artist discoveries over the past year across global platforms.</p>
            </div>
            
            <div className="bg-[#02040a] p-10 rounded-3xl border border-white/10 hover:border-cyan-500/50 transition-colors group relative overflow-hidden shadow-lg">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500"><Target size={80} className="text-cyan-500"/></div>
              <h4 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-2 relative z-10">500K+</h4>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest relative z-10 mb-4">Career Advancements</p>
              <p className="text-slate-500 font-medium text-sm leading-relaxed relative z-10">Independent artists have joined the program and seen unprecedented algorithmic reach.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= EXPLANATION GRAPHIC ================= */}
      <section className="py-32 px-6 max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center gap-20 relative z-20">
        <div className="flex-1 lg:pr-10">
          <div className="inline-block bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 border border-blue-500/20">Platform Discovery</div>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-6">
            Enhanced <br/><span className="text-blue-500">Targeting.</span>
          </h2>
          <p className="text-lg text-slate-400 font-medium mb-12 leading-relaxed">
            TunePlus Accelerator turns platform discovery programs into a managed growth engine for your catalog, powered by real-time data.
          </p>

          <div className="space-y-8">
            <div className="flex gap-6 items-start group">
              <div className="text-4xl font-black text-blue-500 opacity-50 group-hover:opacity-100 transition-opacity">1</div>
              <div>
                <h3 className="text-xl font-bold uppercase text-white mb-2">Smart Prioritization</h3>
                <p className="text-slate-400 font-medium text-sm leading-relaxed">We choose the tracks most likely to perform, ensuring your strongest songs get the boost.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start group">
              <div className="text-4xl font-black text-cyan-500 opacity-50 group-hover:opacity-100 transition-opacity">2</div>
              <div>
                <h3 className="text-xl font-bold uppercase text-white mb-2">Ongoing Optimization</h3>
                <p className="text-slate-400 font-medium text-sm leading-relaxed">Our algorithm monitors performance and adjusts selection to maintain momentum.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start group">
              <div className="text-4xl font-black text-blue-400 opacity-50 group-hover:opacity-100 transition-opacity">3</div>
              <div>
                <h3 className="text-xl font-bold uppercase text-white mb-2">Higher Visibility</h3>
                <p className="text-slate-400 font-medium text-sm leading-relaxed">Reach engaged listeners who convert into long-term fans through targeted algorithmic push.</p>
              </div>
            </div>
          </div>
        </div>

        {/* UI Mockup / Graph */}
        <div className="flex-1 w-full relative">
          <div className="absolute inset-0 bg-blue-600/20 blur-[100px] rounded-full pointer-events-none"></div>
          <div className="bg-[#050b14] border border-white/10 rounded-[3rem] p-10 shadow-[0_40px_100px_rgba(0,0,0,0.5)] relative overflow-hidden z-10 w-full aspect-square md:aspect-auto md:h-[600px] flex flex-col">
            <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-6">
              <div>
                <h4 className="text-xl font-black uppercase tracking-tight text-white">Stream Velocity</h4>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Live Tracking</p>
              </div>
              <div className="bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest border border-emerald-500/30 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Active Push
              </div>
            </div>

            {/* Immersive Graph Representation */}
            <div className="flex-1 flex items-end gap-3 relative pb-10">
              {/* Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between border-l border-b border-white/5 pb-10 pl-2">
                {[100, 75, 50, 25, 0].map(val => (
                  <div key={val} className="w-full h-[1px] bg-white/5 relative">
                    <span className="absolute -left-10 -top-2 text-[10px] font-bold text-slate-600">{val}k</span>
                  </div>
                ))}
              </div>
              
              {/* Bars */}
              <div className="relative z-10 w-full h-full flex items-end gap-2 px-4">
                {[15, 20, 25, 30, 85, 95, 100, 90, 80, 75].map((height, i) => (
                  <div key={i} className="flex-1 w-full bg-white/5 rounded-t-md relative group transition-all duration-500 hover:bg-white/10" style={{ height: '100%' }}>
                    <div 
                      className={`absolute bottom-0 w-full rounded-t-md transition-all duration-1000 ${i > 3 ? 'bg-gradient-to-t from-blue-600 to-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.4)]' : 'bg-slate-700'}`} 
                      style={{ height: `${height}%` }}
                    >
                      {i > 3 && <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-black text-white bg-blue-600 px-2 py-1 rounded">+{height}K</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-auto flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-widest">
              <span className="flex items-center gap-2"><div className="w-3 h-3 bg-slate-700 rounded-sm"></div> Organic Streams</span>
              <span className="flex items-center gap-2 text-cyan-400"><div className="w-3 h-3 bg-gradient-to-t from-blue-600 to-cyan-400 rounded-sm"></div> Accelerator Push</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CASE STUDIES ================= */}
      <section id="case-studies" className="py-32 bg-[#02040a] border-y border-white/5 relative z-20">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <div>
              <p className="text-[12px] font-bold uppercase tracking-widest text-blue-500 mb-2">Case Studies</p>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-none">See It In <br/><span className="text-cyan-400">Action.</span></h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group relative h-[500px] rounded-[2.5rem] border border-white/10 overflow-hidden cursor-pointer">
              <div className="absolute inset-0 bg-slate-900 bg-[url('https://images.unsplash.com/photo-1493225457124-a1a2a5f5f928?q=80&w=2070')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-[#02040a]/80 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 w-full p-10">
                <div className="bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full w-fit mb-4">Hip-Hop</div>
                <h3 className="text-3xl font-black uppercase tracking-tight text-white mb-4">BFB D</h3>
                <div className="flex items-center gap-8 mb-6">
                  <div>
                    <p className="text-2xl font-black text-cyan-400 tracking-tight">200M+</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Accelerated</p>
                  </div>
                  <div>
                    <p className="text-2xl font-black text-cyan-400 tracking-tight">1.2M+</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Listeners</p>
                  </div>
                </div>
                <p className="text-sm font-medium text-slate-300 leading-relaxed mb-6">"TunePlus helped me stay independent for real. Getting my money fast kept my whole grind funded, and they've been a big part of helping my songs catch fire online."</p>
              </div>
            </div>

            <div className="group relative h-[500px] rounded-[2.5rem] border border-white/10 overflow-hidden cursor-pointer">
              <div className="absolute inset-0 bg-slate-900 bg-[url('https://images.unsplash.com/photo-1516280440502-65f53632039d?q=80&w=2070')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-[#02040a]/80 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 w-full p-10">
                <div className="bg-cyan-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full w-fit mb-4">Electronic</div>
                <h3 className="text-3xl font-black uppercase tracking-tight text-white mb-4">Zolaa Bloud</h3>
                <div className="flex items-center gap-8 mb-6">
                  <div>
                    <p className="text-2xl font-black text-cyan-400 tracking-tight">8M+</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">TCA Streams</p>
                  </div>
                  <div>
                    <p className="text-2xl font-black text-cyan-400 tracking-tight">80K+</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">New Followers</p>
                  </div>
                </div>
                <p className="text-sm font-medium text-slate-300 leading-relaxed mb-6">"The platform helped put us back on people's radar after a relatively quiet period of writing. Seeing those songs get a second life has been really exciting."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL MASSIVE CTA ================= */}
      <section className="py-32 px-6 text-center relative overflow-hidden z-20 bg-[#050b14]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-600/10 blur-[150px] rounded-full pointer-events-none"></div>
        
        <div className="relative z-10 max-w-[1400px] mx-auto flex flex-col items-center">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white mb-6 leading-[0.95]">
            More Artists. <br/>
            More <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Growth.</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-400 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
            Over half a million independent artists around the world have signed up for Accelerator. It's time to level up your success.
          </p>
          <a href={`${DASHBOARD_URL}/signup`} className="group relative overflow-hidden inline-flex bg-cyan-600 text-white px-12 py-5 rounded-full font-bold text-sm uppercase tracking-widest transition-all duration-300 shadow-[0_0_40px_rgba(6,182,212,0.4)] items-center gap-3 hover:-translate-y-1">
            <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors">Activate Accelerator <Rocket size={18}/></span>
            <div className="absolute inset-0 h-full w-0 bg-blue-600 transition-all duration-300 ease-out group-hover:w-full z-0"></div>
          </a>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-black pt-20 pb-10 border-t border-white/5 text-center md:text-left relative z-20">
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
             <div className="flex items-center justify-center md:justify-start gap-2 mb-6 h-12">
               <div className="relative w-40 h-full">
                  <Image src="/logos/tuneplus-logo.png" alt="TunePlus Logo" fill className="object-contain object-left md:object-left" />
               </div>
             </div>
             <p className="text-slate-500 font-medium text-sm pr-4">Empowering independent artists globally with premium distribution, algorithmic growth, and uncompromised royalty collection.</p>
          </div>
          
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6 text-slate-600">Learn About TunePlus</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-400">
              <li><Link href="/about" className="hover:text-cyan-400 transition-colors">About Us</Link></li>
              <li><Link href="/leadership" className="hover:text-cyan-400 transition-colors">Leadership</Link></li>
              <li><Link href="/terms-and-conditions" className="hover:text-cyan-400 transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6 text-slate-600">Distribute</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-400">
              <li><a href={`${DASHBOARD_URL}/signup`} className="hover:text-cyan-400 transition-colors">Join TunePlus</a></li>
              <li><Link href="/features" className="hover:text-cyan-400 transition-colors">Features</Link></li>
              <li><Link href="/services" className="hover:text-cyan-400 transition-colors">Services</Link></li>
              <li><Link href="/splits" className="hover:text-cyan-400 transition-colors">Splits</Link></li>
              <li><span className="text-cyan-500 transition-colors">Accelerator</span></li>
              <li><Link href="/pricing" className="hover:text-cyan-400 transition-colors">Pricing & Plans</Link></li>
              <li><Link href="/white-label" className="hover:text-cyan-400 transition-colors text-cyan-500">White Label SaaS</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6 text-slate-600">Account Services</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-400">
              <li><a href={`${DASHBOARD_URL}/login`} className="hover:text-cyan-400 transition-colors">Login</a></li>
              <li><Link href="/contact" className="hover:text-cyan-400 transition-colors">Contact Support</Link></li>
            </ul>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
           <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
             © {new Date().getFullYear()} TunePlus Music. All rights reserved.
           </div>
           <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-slate-500">
              <a href="https://www.facebook.com/profile.php?id=61557369243454" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Facebook</a>
              <a href="https://x.com/TuneplusMusic" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">X (Twitter)</a>
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
           </div>
        </div>
      </footer>

    </div>
  );
}