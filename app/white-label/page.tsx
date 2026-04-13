'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script'; // 🚀 ADDED FOR v3
import { 
  ArrowRight, Database, ShieldCheck, CheckCircle2, 
  Send, Network, Globe, Zap, LineChart, 
  Server, Fingerprint, Activity, Coins, 
  LayoutDashboard, Key, Users, CreditCard, PlayCircle, Loader2
} from 'lucide-react';

// ================= 1. FIBER NETWORK BACKGROUND =================
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
    const numberOfParticles = 120; 
    let mouse = { x: -1000, y: -1000 };

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    class Particle {
      x: number; y: number; size: number; speedX: number; speedY: number;
      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.7;
        this.speedY = (Math.random() - 0.5) * 0.7;
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
        ctx!.fillStyle = 'rgba(6, 182, 212, 0.2)';
        ctx!.fill();
      }
    }

    function init() {
      particlesArray = [];
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    }

    function animate() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        
        for (let j = i; j < particlesArray.length; j++) {
          const dx = particlesArray[i].x - particlesArray[j].x;
          const dy = particlesArray[i].y - particlesArray[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 110) { 
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
          ctx!.strokeStyle = `rgba(59, 130, 246, ${0.3 - distanceMouse/500})`;
          ctx!.lineWidth = 1;
          ctx!.moveTo(particlesArray[i].x, particlesArray[i].y);
          ctx!.lineTo(mouse.x, mouse.y);
          ctx!.stroke();
        }
      }
      requestAnimationFrame(animate);
    }

    init();
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-50" />;
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
          className="w-full h-auto object-contain rounded-xl opacity-95 hover:opacity-100 transition-opacity"
          priority
        />
      </div>

      <div className="absolute -top-12 -right-12 w-24 h-24 flex items-center justify-center animate-bounce-slow drop-shadow-[0_0_20px_rgba(255,255,255,0.15)] z-30">
        <Image src="/logos/spotify.png" alt="Spotify" fill className="object-contain" />
      </div>
      <div className="absolute -bottom-16 -left-12 w-32 h-32 flex items-center justify-center animate-bounce-slow delay-300 drop-shadow-[0_0_20px_rgba(255,255,255,0.15)] z-30">
        <Image src="/logos/Apple.png" alt="Apple Music" fill className="object-contain" />
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 -left-16 w-20 h-20 flex items-center justify-center animate-bounce-slow delay-500 drop-shadow-[0_0_20px_rgba(255,255,255,0.15)] z-30">
        <Image src="/logos/saavn.png" alt="JioSaavn" fill className="object-contain" />
      </div>
    </div>
  );
};

// ================= MAIN PAGE =================
export default function EnterprisePage() {
  const DASHBOARD_URL = 'https://app.tuneplusmusic.com'; 
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  // 🚀 v3 Submit Handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('loading');
    
    // Capturing form data before grecaptcha callback
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      // @ts-ignore
      if (!window.grecaptcha) {
        alert("Security system loading. Please try again in a second.");
        setFormStatus('idle');
        return;
      }

      // @ts-ignore
      window.grecaptcha.ready(async () => {
        try {
          // @ts-ignore
          const token = await window.grecaptcha.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, {action: 'submit'});
          
          const payload = { ...data, captchaToken: token };

          const res = await fetch('/api/send-demo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });

          if (res.ok) {
            setFormStatus('success');
          } else {
            setFormStatus('idle');
            alert("Failed to send request. Check backend console for SMTP or Captcha errors.");
          }
        } catch (captchaErr) {
          console.error(captchaErr);
          setFormStatus('idle');
          alert("Failed to generate security token.");
        }
      });
    } catch (err) {
      console.error(err);
      setFormStatus('idle');
      alert("Network Error: Could not reach the API.");
    }
  };

  return (
    <div className="min-h-screen bg-[#010205] text-slate-300 selection:bg-cyan-500/30 overflow-x-hidden relative">
      
      {/* 🚀 LOAD RECAPTCHA v3 SCRIPT IN BACKGROUND */}
      <Script 
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`} 
        strategy="afterInteractive" 
      />

      <FiberNetwork />
      
      {/* Marquee CSS */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: scroll 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />

      {/* Background Glow */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute top-[10%] left-1/4 w-[600px] h-[600px] bg-cyan-600/5 blur-[150px] rounded-full mix-blend-screen pointer-events-none"></div>
      </div>

      {/* ================= NAVBAR (FIXED LOGO SIZE) ================= */}
      <nav className="fixed top-0 w-full bg-[#010205]/90 backdrop-blur-xl border-b border-white/[0.05] z-50 transition-all">
        <div className="max-w-[1400px] mx-auto px-6 h-24 flex items-center justify-between relative z-10">
          <Link href="/" className="flex items-center gap-3 group h-12">
             <div className="relative w-48 h-full group-hover:scale-105 transition-transform">
                <Image src="/logos/tuneplus-logo.png" alt="TunePlus Logo" fill className="object-contain object-left drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]" priority/>
             </div>
          </Link>
          
          <div className="hidden xl:flex items-center gap-6 font-bold text-[11px] uppercase tracking-widest text-slate-500">
            <Link href="/features" className="hover:text-white transition-colors">Features</Link>
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <Link href="/splits" className="hover:text-white transition-colors">Splits</Link>
            <Link href="/accelerator" className="hover:text-white transition-colors">Accelerator</Link>
            <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="/stores" className="hover:text-white transition-colors">Stores</Link>
            <span className="text-white border-b-2 border-cyan-500 pb-1">White Label SaaS</span>
          </div>

          <div className="flex items-center gap-6">
            <a href={`${DASHBOARD_URL}/login`} className="hidden md:block font-bold text-[12px] uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Login</a>
            <a href="#demo" className="group relative overflow-hidden inline-flex bg-cyan-600 text-white px-8 py-3.5 rounded-full font-bold text-[12px] uppercase tracking-widest shadow-lg shadow-cyan-500/20">
               <span className="relative z-10 transition-colors group-hover:text-white">Request Demo</span>
               <div className="absolute inset-0 h-full w-0 bg-blue-600 transition-all duration-300 ease-out group-hover:w-full z-0"></div>
            </a>
          </div>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section className="relative pt-48 pb-20 px-6 text-center z-10">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-cyan-500/20 text-cyan-400 font-bold text-[10px] uppercase tracking-widest mb-10 bg-cyan-950/20 shadow-inner">
            <Server size={14}/> Tuneplus Distribution
          </div>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white mb-10 leading-[0.9]">
            Launch Your Brand.<br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Industry Scale.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 font-medium mb-12 max-w-3xl leading-relaxed">
            Run your own music aggregator or record label using TunePlus's uncompromised B2B infrastructure. Advanced royalty accounting, multi-user access, and direct DSP delivery.
          </p>
          <a href="#demo" className="group relative overflow-hidden inline-flex bg-white text-black px-12 py-5 rounded-full font-bold text-sm uppercase tracking-widest shadow-xl items-center gap-3">
             <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors">Schedule Enterprise Demo <ArrowRight size={18}/></span>
             <div className="absolute inset-0 h-full w-0 bg-cyan-600 transition-all duration-300 ease-out group-hover:w-full z-0"></div>
          </a>
        </div>
        <TiltImage />
      </section>

      {/* ================= SMOOTH RUNNING LOGOS ================= */}
      <section className="py-16 border-y border-white/5 bg-[#010205] overflow-hidden relative z-20 mt-20">
         <div className="text-center mb-10">
            <p className="text-[12px] font-bold uppercase tracking-[0.3em] text-slate-500">Infrastructure integrated with</p>
         </div>
         
         <div className="relative w-full flex overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#010205] to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#010205] to-transparent z-10"></div>

            <div className="animate-marquee flex items-center">
              <div className="flex items-center gap-24 px-12 shrink-0">
                <div className="relative w-24 h-12"><Image src="/logos/spotify.png" alt="Spotify" fill className="object-contain filter grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all cursor-pointer"/></div>
                <div className="relative w-24 h-12"><Image src="/logos/Apple.png" alt="Apple Music" fill className="object-contain filter grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all cursor-pointer"/></div>
                <div className="relative w-24 h-12"><Image src="/logos/dezzerrr.png" alt="Deezer" fill className="object-contain filter grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all cursor-pointer"/></div>
                <div className="relative w-24 h-12"><Image src="/logos/saavn.png" alt="JioSaavn" fill className="object-contain filter grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all cursor-pointer"/></div>
                <div className="relative w-24 h-12"><Image src="/logos/youtube.png" alt="YouTube Music" fill className="object-contain filter grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all cursor-pointer"/></div>
                <div className="relative w-24 h-12"><Image src="/logos/amazon.png" alt="Amazon Music" fill className="object-contain filter grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all cursor-pointer"/></div>
                <div className="relative w-24 h-12"><Image src="/logos/metaaaa.png" alt="Meta" fill className="object-contain filter grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all cursor-pointer"/></div>
                <div className="relative w-24 h-12"><Image src="/logos/tik-tok.png" alt="TikTok" fill className="object-contain filter grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all cursor-pointer"/></div>
              </div>
              <div className="flex items-center gap-24 px-12 shrink-0">
                <div className="relative w-24 h-12"><Image src="/logos/spotify.png" alt="Spotify" fill className="object-contain filter grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all cursor-pointer"/></div>
                <div className="relative w-24 h-12"><Image src="/logos/Apple.png" alt="Apple Music" fill className="object-contain filter grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all cursor-pointer"/></div>
                <div className="relative w-24 h-12"><Image src="/logos/dezzerrr.png" alt="Deezer" fill className="object-contain filter grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all cursor-pointer"/></div>
                <div className="relative w-24 h-12"><Image src="/logos/saavn.png" alt="JioSaavn" fill className="object-contain filter grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all cursor-pointer"/></div>
                <div className="relative w-24 h-12"><Image src="/logos/youtube.png" alt="YouTube Music" fill className="object-contain filter grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all cursor-pointer"/></div>
                <div className="relative w-24 h-12"><Image src="/logos/amazon.png" alt="Amazon Music" fill className="object-contain filter grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all cursor-pointer"/></div>
                <div className="relative w-24 h-12"><Image src="/logos/metaaaa.png" alt="Meta" fill className="object-contain filter grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all cursor-pointer"/></div>
                <div className="relative w-24 h-12"><Image src="/logos/tik-tok.png" alt="TikTok" fill className="object-contain filter grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all cursor-pointer"/></div>
              </div>
            </div>
         </div>
      </section>

      {/* ================= PRICING MODEL ================= */}
      <section id="pricing" className="py-32 px-6 max-w-[1200px] mx-auto relative z-10 border-t border-white/5 mt-20">
        <div className="text-center mb-20">
          <p className="text-[12px] font-bold uppercase tracking-widest text-cyan-500 mb-2">ECONOMICS</p>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white mb-6">
            The <span className="text-cyan-400">Coinbase</span> Model
          </h2>
          <p className="text-lg text-slate-400 font-medium max-w-2xl mx-auto">
            True Pay-As-You-Go infrastructure. No massive monthly retainers. You only pay for the exact bandwidth, uploads, and server nodes your active catalog consumes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#050b14]/50 backdrop-blur-xl border border-white/[0.08] rounded-3xl p-10 hover:bg-white/[0.02] hover:border-cyan-500/30 transition-all shadow-lg text-center md:text-left group overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-600/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-cyan-500/20 transition-all"></div>
            <div className="w-16 h-16 rounded-2xl bg-[#010205] border border-white/10 flex items-center justify-center mb-6 text-cyan-400 mx-auto md:mx-0 shadow-inner relative z-10 group-hover:scale-110 transition-transform">
              <Coins size={28}/>
            </div>
            <h3 className="text-xl font-bold uppercase text-white mb-4 tracking-tight relative z-10">Zero Fixed Overhead</h3>
            <p className="text-slate-400 text-sm leading-relaxed font-medium relative z-10">
              Eliminate the stress of massive monthly software fees. Your costs scale proportionately only when your business and catalog grow.
            </p>
          </div>

          <div className="bg-[#050b14]/50 backdrop-blur-xl border border-white/[0.08] rounded-3xl p-10 hover:bg-white/[0.02] hover:border-blue-500/30 transition-all shadow-lg text-center md:text-left group overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-blue-500/20 transition-all"></div>
            <div className="w-16 h-16 rounded-2xl bg-[#010205] border border-white/10 flex items-center justify-center mb-6 text-blue-400 mx-auto md:mx-0 shadow-inner relative z-10 group-hover:scale-110 transition-transform">
              <Activity size={28}/>
            </div>
            <h3 className="text-xl font-bold uppercase text-white mb-4 tracking-tight relative z-10">Scalable Infrastructure</h3>
            <p className="text-slate-400 text-sm leading-relaxed font-medium relative z-10">
              Purchase infrastructure fuel (Coins) upfront. Our smart system automatically manages delivery costs and global DSP syncs seamlessly.
            </p>
          </div>

          <div className="bg-[#050b14]/50 backdrop-blur-xl border border-white/[0.08] rounded-3xl p-10 hover:bg-white/[0.02] hover:border-emerald-500/30 transition-all shadow-lg text-center md:text-left group overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-emerald-500/20 transition-all"></div>
            <div className="w-16 h-16 rounded-2xl bg-[#010205] border border-white/10 flex items-center justify-center mb-6 text-emerald-400 mx-auto md:mx-0 shadow-inner relative z-10 group-hover:scale-110 transition-transform">
              <ShieldCheck size={28}/>
            </div>
            <h3 className="text-xl font-bold uppercase text-white mb-4 tracking-tight relative z-10">Transparent Billing</h3>
            <p className="text-slate-400 text-sm leading-relaxed font-medium relative z-10">
              Access a deep-dive ledger inside your admin panel. Track every micro-transaction, upload cost, and server maintenance fee in real-time.
            </p>
          </div>
        </div>
      </section>

      {/* ================= INFRASTRUCTURE FEATURES ================= */}
      <section id="infrastructure" className="py-24 px-6 max-w-[1400px] mx-auto relative z-10 border-t border-white/5">
        <div className="text-center mb-20">
          <p className="text-[12px] font-bold uppercase tracking-widest text-blue-500 mb-2">CAPABILITIES</p>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-6">
            Enterprise <span className="text-cyan-400">System Core</span>
          </h2>
          <p className="text-slate-400 font-medium text-lg max-w-3xl mx-auto">
            Everything a Record Label, Aggregator, or Studio needs to operate independently. We provide the backend engine, you take the spotlight.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard icon={Fingerprint} title="100% Custom Branding" desc="White label the entire dashboard. Map your custom domain, upload logos, and customize UI colors to match your brand exactly."/>
          <FeatureCard icon={Globe} title="Automated DSP Delivery" desc="Direct pipeline to Spotify, Apple Music, TikTok, and 150+ stores globally. Includes automated DDEX metadata validation."/>
          <FeatureCard icon={LineChart} title="Royalty Accounting Engine" desc="Ingest heavy, complex royalty reports automatically. Our engine calculates multi-tier splits, taxes, and generates statements in seconds."/>
          <FeatureCard icon={CreditCard} title="Custom Payout Gateways" desc="Integrate your own Stripe, PayPal, or Bank Transfer APIs. Set custom payout thresholds and manage invoices directly through the portal."/>
          <FeatureCard icon={Users} title="Role-Based Access Control" desc="Create nested accounts. Assign specific read/write permissions for Label Managers, Marketing Teams, and individual Artists securely."/>
          <FeatureCard icon={Key} title="Developer API Access" desc="Build your own custom apps or websites. Get secure REST API access to pull streaming data, catalog info, and push releases programmatically."/>
          <FeatureCard icon={LayoutDashboard} title="Artist Portals" desc="Give your artists a beautiful, secure login to view daily streaming trends, upload new tracks, and track their revenue independently."/>
          <FeatureCard icon={Database} title="Bulk Catalog Migration" desc="Switching from another distributor? Use our advanced bulk ingestion tools to migrate thousands of releases without losing stream counts."/>
          <FeatureCard icon={ShieldCheck} title="Content ID & Protection" desc="Integrated YouTube Content ID and Meta Rights Manager to monetize user-generated content and automatically protect your catalog's copyright."/>
        </div>
      </section>

      {/* ================= INDUSTRY LEVEL FORM ================= */}
      <section id="demo" className="py-24 px-6 max-w-4xl mx-auto relative z-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black uppercase tracking-tight text-white mb-4">Enterprise <span className="text-cyan-400">Onboarding</span></h2>
          <p className="text-slate-400 font-medium">Complete the form below to initiate the technical deployment review.</p>
        </div>

        {formStatus === 'success' ? (
          <div className="bg-emerald-900/10 border border-emerald-500/30 rounded-[2rem] p-16 text-center backdrop-blur-md shadow-2xl">
            <CheckCircle2 size={60} className="text-emerald-400 mx-auto mb-6" />
            <h3 className="text-3xl font-black text-white mb-4 uppercase">Transmission Success</h3>
            <p className="text-slate-400 mb-8">Our B2B team will review your company details and contact you shortly.</p>
            <button onClick={() => setFormStatus('idle')} className="text-cyan-400 font-bold uppercase text-xs tracking-widest border-b border-cyan-400 pb-1">Submit Another Request</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-[#050b14]/80 backdrop-blur-3xl rounded-[2.5rem] p-8 md:p-14 border border-white/[0.05] shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-8 relative overflow-hidden">
            
            <div className="md:col-span-2 bg-cyan-500/5 border border-cyan-500/20 rounded-2xl p-6 flex items-start gap-4 text-cyan-400 text-xs font-bold mb-2">
              <ShieldCheck size={24} className="shrink-0 mt-1 text-cyan-500"/>
              <p className="leading-relaxed">Secure Transmission: Your submission is encrypted.</p>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-2">Full Name</label>
              <input type="text" name="name" required className="bg-[#010205] border border-white/10 rounded-xl p-4 text-white focus:border-cyan-500 outline-none transition-all" placeholder="John Doe" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-2">Business Email</label>
              <input type="email" name="email" required className="bg-[#010205] border border-white/10 rounded-xl p-4 text-white focus:border-cyan-500 outline-none transition-all" placeholder="john@company.com" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-2">Company / Label Name</label>
              <input type="text" name="company" required className="bg-[#010205] border border-white/10 rounded-xl p-4 text-white focus:border-cyan-500 outline-none transition-all" placeholder="TunePlus Records" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-2">Current Catalog Size</label>
              <select name="catalogSize" required className="bg-[#010205] border border-white/10 rounded-xl p-4 text-white focus:border-cyan-500 outline-none transition-all appearance-none cursor-pointer">
                <option value="">Select Catalog Size</option>
                <option value="New Business">New Business / Startup</option>
                <option value="1-500">1 - 500 Songs</option>
                <option value="500-2000">500 - 2,000 Songs</option>
                <option value="2000+">2,000+ Songs</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-2">Phone Number</label>
              <input type="tel" name="phone" required className="bg-[#010205] border border-white/10 rounded-xl p-4 text-white focus:border-cyan-500 outline-none transition-all" placeholder="+91 98765 43210" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-2">Website (Optional)</label>
              <input type="url" name="website" className="bg-[#010205] border border-white/10 rounded-xl p-4 text-white focus:border-cyan-500 outline-none transition-all" placeholder="https://yourlabel.com" />
            </div>

            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-2">Business Requirements</label>
              <textarea name="message" required rows={4} className="bg-[#010205] border border-white/10 rounded-xl p-4 text-white focus:border-cyan-500 outline-none transition-all resize-none" placeholder="Briefly describe your distribution needs..."></textarea>
            </div>

            <button 
              type="submit" 
              disabled={formStatus === 'loading'} 
              className="md:col-span-2 mt-4 group relative overflow-hidden bg-cyan-600 text-white py-5 rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <span className="relative z-10 transition-colors group-hover:text-white flex items-center justify-center gap-2">
                 {formStatus === 'loading' ? 'Securing Transmission...' : <>Submit Enterprise Request <Send size={16}/></>}
              </span>
              {formStatus !== 'loading' && (
                 <div className="absolute inset-0 h-full w-0 bg-blue-600 transition-all duration-300 ease-out group-hover:w-full z-0"></div>
              )}
            </button>
            <div className="md:col-span-2 text-center text-[10px] text-slate-600 mt-2">
              This site is protected by reCAPTCHA and the Google 
              <a href="https://policies.google.com/privacy" className="text-cyan-500 hover:underline"> Privacy Policy</a> and 
              <a href="https://policies.google.com/terms" className="text-cyan-500 hover:underline"> Terms of Service</a> apply.
            </div>
          </form>
        )}
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#010205] pt-20 pb-10 border-t border-white/5 text-center md:text-left relative z-20">
         <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
          <div className="col-span-1 lg:col-span-1">
             <div className="flex items-center justify-center md:justify-start h-16 mb-6">
                <div className="relative w-40 h-full">
                  <Image src="/logos/tuneplus-logo.png" alt="TunePlus Logo" fill className="object-contain object-left md:object-left" />
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
              <a href="https://x.com/TuneplusMusic" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">X (Twitter)</a>
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
           </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="bg-[#050b14]/50 backdrop-blur-sm border border-white/[0.08] rounded-3xl p-8 hover:bg-white/[0.02] hover:border-cyan-500/30 transition-all duration-300 text-left group shadow-lg">
      <div className="w-14 h-14 rounded-2xl bg-[#010205] border border-white/10 flex items-center justify-center mb-6 text-cyan-500 group-hover:scale-110 transition-transform shadow-inner">
        <Icon size={24} strokeWidth={1.5} />
      </div>
      <h3 className="text-lg font-bold uppercase text-white mb-3 tracking-tight">{title}</h3>
      <p className="text-slate-400 text-sm font-medium leading-relaxed">{desc}</p>
    </div>
  );
}