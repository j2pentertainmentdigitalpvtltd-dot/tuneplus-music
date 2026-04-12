'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { 
  Search, BookOpen, Music, 
  Globe, PlayCircle, Settings, 
  CreditCard, ShieldCheck, ChevronRight,
  MessageCircle, HelpCircle, ArrowLeft,
  FileText
} from 'lucide-react';

// ================= CATEGORIES & ARTICLES DATA =================
const categoriesMeta = [
  { id: 'distribution', title: "Music Distribution", icon: Music, desc: "Uploading, formatting, and managing your releases." },
  { id: 'stores', title: "Store Partners", icon: Globe, desc: "Spotify, Apple Music, and mapping issues." },
  { id: 'youtube', title: "YouTube Content ID", icon: PlayCircle, desc: "Monetization and copyright claims." },
  { id: 'earnings', title: "Earnings & Payouts", icon: CreditCard, desc: "Royalties, wallet balance, and withdrawals." },
  { id: 'account', title: "Account Settings", icon: Settings, desc: "Security, passwords, and KYC/Bank details." },
  { id: 'copyright', title: "Copyright & Anti-Fraud", icon: ShieldCheck, desc: "Artificial streaming rules and DMCA." }
];

const articlesData = {
  distribution: [
    { id: 'd1', title: "Comprehensive Guide to Uploading Your Release", content: "Uploading your music is a streamlined 6-step process:\n\n1. Release Info: Add your Core Details, Metadata, and auto-generate or provide your UPC.\n2. Upload: Add your high-quality audio files (Strictly WAV or FLAC).\n3. Tracks: Manage metadata for individual tracks, add contributors (Lyricist, Composer), and ISRC.\n4. Store: Select DSP delivery platforms like Spotify, Apple Music, and JioSaavn.\n5. Release Date: Schedule your release at least 14 days ahead for playlist pitching.\n6. Submission: Verify your mapping and submit to our content review team." },
    { id: 'd2', title: "Audio & Artwork Format Guidelines", content: "To guarantee smooth delivery, your assets must meet strict standards.\n\nAudio Requirements:\n- 16-bit or 24-bit WAV or FLAC only.\n- 44.1 kHz sample rate or higher.\n- MP3s are strictly prohibited.\n\nArtwork Requirements:\n- Exactly 3000x3000 pixels (JPG/PNG).\n- The text on the artwork MUST exactly match your release title and artist name.\n- No social media logos, URLs, or barcodes allowed." }
  ],
  stores: [
    { id: 's1', title: "How to Fix Artist Profile Mapping Issues", content: "If your music appears on another artist's page with the same name, do not take it down. Contact our support team with:\n\n1. Your Release UPC.\n2. The link to the incorrect profile where the music is currently.\n3. Your correct profile link.\n\nWe will submit a direct ticket to the stores. This usually takes 3-7 business days to fix." },
    { id: 's2', title: "Delivery Timelines: When will my music go live?", content: "After submission, our Content Review team checks your release within 1-3 business days. Once approved and delivered, stores take an additional 2-5 days to process and make the release live on their platforms." }
  ],
  youtube: [
    { id: 'y1', title: "YouTube Content ID Requirements & Monetization", content: "Content ID scans YouTube for videos using your music so you can earn ad revenue. To be eligible, you MUST own 100% exclusive rights to the audio.\n\nThe following will be REJECTED:\n- Free downloaded beats.\n- Non-exclusive leased beats.\n- Uncleared vocal samples or movie dialogues.\n- Unmodified loop pack samples (e.g., Splice).\n- Public domain recordings." }
  ],
  earnings: [
    { id: 'e1', title: "Managing Your Wallet & Master Settlements", content: "Streaming platforms do not pay in real-time; there is an industry-standard 2-3 month reporting delay. For example, streams from January are typically audited by DSPs and deposited into your TunePlus Wallet in late March or early April." },
    { id: 'e2', title: "How to Withdraw Your Funds", content: "Navigate to Account Settings > Payment Hub to add your Primary Bank Account and KYC details.\n\nOnce your 'Available to Withdraw' balance reaches the $50 minimum threshold, go to the Wallet tab and click 'Request Payout'. Funds are transferred within 3-5 business days." }
  ],
  account: [
    { id: 'a1', title: "Changing your Password and Security Settings", content: "Go to Account Settings > Security & Access to update your password or enable Two-Factor Authentication (2FA) for extra protection. If you are locked out, use the 'Forgot Password' link on the login screen." },
    { id: 'a2', title: "Updating your Financial Configuration", content: "Before you can withdraw royalties, you must complete your Identity and Bank verification. Navigate to Account Settings > Payment Hub to securely upload your Bank details, Tax ID/PAN, and complete your KYC for tax compliance." }
  ],
  copyright: [
    { id: 'c1', title: "Anti-Fraud Policy: Artificial Streaming & Penalties", content: "TunePlus enforces a strict zero-tolerance policy for artificial streaming (bots, click farms, paid playlist promo).\n\nViolations will result in:\n- Immediate release takedowns.\n- Severe financial fines charged by DSPs deducted directly from your wallet.\n- Permanent account suspension without appeal." },
    { id: 'c2', title: "Copyright Infringement & Duplicate Content Policy", content: "You legally certify that you own 100% of the copyrights upon submission. Uploading music belonging to others, unauthorized remixes, or uncleared samples will trigger a DMCA strike.\n\nFurthermore, uploading the exact same audio file multiple times to manipulate algorithms (Duplicate Content Spam) will trigger an automatic account suspension." }
  ]
};

// Flatten articles for global search
const allArticles = Object.entries(articlesData).flatMap(([catId, articles]) => 
  articles.map(article => ({ ...article, categoryId: catId }))
);

export default function ProfessionalHelpCenter() {
  // State Management for TuneCore-like deep navigation
  const [currentView, setCurrentView] = useState<'home' | 'category' | 'article' | 'search'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Search Logic
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim().length > 1) {
      setCurrentView('search');
    } else if (currentView === 'search') {
      setCurrentView('home');
    }
  };

  const searchResults = useMemo(() => {
    if (!searchQuery) return [];
    const lowerQuery = searchQuery.toLowerCase();
    return allArticles.filter(a => 
      a.title.toLowerCase().includes(lowerQuery) || 
      a.content.toLowerCase().includes(lowerQuery)
    );
  }, [searchQuery]);

  // Navigation Handlers
  const openCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentView('category');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openArticle = (article: any, fromView: 'category' | 'search' | 'home' = 'category') => {
    setSelectedArticle({ ...article, fromView });
    if (!selectedCategory && article.categoryId) {
      setSelectedCategory(article.categoryId);
    }
    setCurrentView('article');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    if (currentView === 'article') {
      if (selectedArticle?.fromView === 'search') setCurrentView('search');
      else setCurrentView('category');
    } else if (currentView === 'category' || currentView === 'search') {
      setCurrentView('home');
      setSearchQuery("");
      setSelectedCategory(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getCategoryMeta = (id: string) => categoriesMeta.find(c => c.id === id);
  const activeCatMeta = selectedCategory ? getCategoryMeta(selectedCategory) : null;

  return (
    <div className="min-h-screen bg-[#02040a] font-sans text-slate-200 selection:bg-cyan-500/30 flex flex-col">
      
      {/* ================= TAWK.TO SCRIPT ================= */}
      <Script
        id="tawk-to"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/66562ae6981b6c564775e749/1hv09f5j0';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
            })();
          `,
        }}
      />

      {/* ================= HEADER ================= */}
      <nav className="w-full bg-[#02040a]/90 backdrop-blur-md border-b border-white/5 py-5 px-6 flex items-center justify-between sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto w-full flex items-center">
          <button onClick={() => { setCurrentView('home'); setSearchQuery(""); }} className="flex items-center gap-4 hover:opacity-80 transition-opacity">
            <img src="/logos/tuneplus-logo.png" alt="TunePlus" className="h-8 w-auto object-contain" />
            <div className="h-5 w-px bg-white/20"></div>
            <span className="text-sm font-bold tracking-widest text-slate-400 uppercase flex items-center gap-2">
              <HelpCircle size={16} className="text-cyan-500"/> Help Center
            </span>
          </button>
        </div>
      </nav>

      {/* ================= SEARCH HERO (Always visible except in Article view) ================= */}
      {currentView !== 'article' && (
        <section className="bg-[#050b14] border-b border-white/5 pt-20 pb-16 px-6 relative overflow-hidden transition-all">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-600/10 blur-[150px] rounded-full pointer-events-none"></div>
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tight">
              How can we help today?
            </h1>
            <div className="relative w-full shadow-2xl">
              <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                <Search className="h-6 w-6 text-slate-400" />
              </div>
              <input 
                type="text" 
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search for guides, policies, or issues..." 
                className="w-full bg-[#02040a] border border-white/10 rounded-full py-5 pl-16 pr-6 text-white text-lg placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all shadow-inner"
              />
            </div>
          </div>
        </section>
      )}

      {/* ================= MAIN CONTENT AREA ================= */}
      <main className="flex-grow flex flex-col items-center w-full">

        {/* ---------------- VIEW: HOME (Grid) ---------------- */}
        {currentView === 'home' && (
          <section className="py-16 px-6 max-w-[1200px] w-full animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoriesMeta.map((cat) => (
                <div 
                  key={cat.id} onClick={() => openCategory(cat.id)}
                  className="bg-[#050b14] border border-white/5 rounded-2xl p-8 hover:bg-[#0a1122] hover:border-cyan-500/40 transition-all duration-300 cursor-pointer group shadow-lg flex flex-col h-full"
                >
                  <div className="w-14 h-14 bg-[#02040a] border border-white/10 rounded-xl flex items-center justify-center mb-6 text-slate-300 group-hover:text-cyan-400 group-hover:scale-110 transition-all shadow-inner">
                    <cat.icon size={26} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{cat.title}</h3>
                  <p className="text-slate-400 text-sm font-medium leading-relaxed mb-6 flex-grow">{cat.desc}</p>
                  <div className="flex items-center text-cyan-500 text-sm font-bold mt-auto opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                    View Articles <ChevronRight size={16} className="ml-1"/>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ---------------- VIEW: SEARCH RESULTS ---------------- */}
        {currentView === 'search' && (
          <section className="py-16 px-6 max-w-[900px] w-full animate-in fade-in duration-300">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
              <h2 className="text-2xl font-black text-white">Search Results for "{searchQuery}"</h2>
              <span className="text-slate-500 font-medium">{searchResults.length} found</span>
            </div>
            
            {searchResults.length > 0 ? (
              <div className="flex flex-col gap-3">
                {searchResults.map((article, idx) => {
                  const catMeta = getCategoryMeta(article.categoryId);
                  return (
                    <div key={idx} onClick={() => openArticle(article, 'search')} className="bg-[#050b14] border border-white/5 p-6 rounded-2xl hover:border-cyan-500/30 hover:bg-[#0a1122] transition-all cursor-pointer group flex items-start gap-4">
                      <FileText className="text-slate-500 group-hover:text-cyan-400 mt-1 shrink-0" size={24}/>
                      <div>
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{article.title}</h3>
                        <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">{catMeta?.title}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20 bg-[#050b14] rounded-3xl border border-white/5">
                <Search className="mx-auto h-16 w-16 text-slate-600 mb-4 opacity-50" />
                <h3 className="text-xl font-bold text-white mb-2">No articles found</h3>
                <p className="text-slate-500">Try adjusting your search terms or browse our categories.</p>
              </div>
            )}
          </section>
        )}

        {/* ---------------- VIEW: CATEGORY LIST ---------------- */}
        {currentView === 'category' && activeCatMeta && (
          <section className="py-16 px-6 max-w-[900px] w-full animate-in slide-in-from-right-4 duration-300">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm font-bold text-slate-500 uppercase tracking-wider mb-8">
              <button onClick={goBack} className="hover:text-white flex items-center gap-1"><ArrowLeft size={16}/> Home</button>
              <ChevronRight size={14} className="text-slate-700"/>
              <span className="text-cyan-500">{activeCatMeta.title}</span>
            </div>

            <div className="mb-10 pb-6 border-b border-white/10 flex items-center gap-6">
               <div className="w-16 h-16 bg-cyan-500/10 border border-cyan-500/30 rounded-2xl flex items-center justify-center text-cyan-400">
                 <activeCatMeta.icon size={32} />
               </div>
               <div>
                 <h2 className="text-3xl font-black text-white tracking-tight mb-2">{activeCatMeta.title}</h2>
                 <p className="text-slate-400 text-lg">{activeCatMeta.desc}</p>
               </div>
            </div>

            <div className="flex flex-col gap-3">
              {articlesData[selectedCategory as keyof typeof articlesData]?.map((article, idx) => (
                <div key={idx} onClick={() => openArticle(article, 'category')} className="bg-[#050b14] border border-white/5 p-6 rounded-2xl hover:border-cyan-500/30 hover:bg-[#0a1122] transition-all cursor-pointer group flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-4">
                     <BookOpen className="text-slate-600 group-hover:text-cyan-400 transition-colors" size={20}/>
                     <h3 className="text-lg font-bold text-slate-200 group-hover:text-white transition-colors">{article.title}</h3>
                  </div>
                  <ChevronRight size={20} className="text-slate-600 group-hover:text-cyan-400 transition-colors" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ---------------- VIEW: FULL ARTICLE PAGE ---------------- */}
        {currentView === 'article' && selectedArticle && (
          <section className="py-16 px-6 max-w-[800px] w-full animate-in slide-in-from-bottom-4 duration-300">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs md:text-sm font-bold text-slate-500 uppercase tracking-wider mb-10 overflow-x-auto whitespace-nowrap pb-2">
              <button onClick={() => { setCurrentView('home'); setSearchQuery(""); }} className="hover:text-white">Home</button>
              <ChevronRight size={14} className="text-slate-700 shrink-0"/>
              <button onClick={() => setCurrentView('category')} className="hover:text-white">{activeCatMeta?.title}</button>
              <ChevronRight size={14} className="text-slate-700 shrink-0"/>
              <span className="text-cyan-500">{selectedArticle.title}</span>
            </div>

            <article className="bg-[#050b14] border border-white/5 rounded-[2.5rem] p-8 md:p-14 shadow-2xl relative">
              {/* Back Button */}
              <button onClick={goBack} className="absolute top-8 left-8 w-10 h-10 bg-[#02040a] border border-white/10 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:border-cyan-500 transition-colors">
                 <ArrowLeft size={20}/>
              </button>

              <h1 className="text-3xl md:text-4xl font-black text-white mb-8 mt-12 leading-tight tracking-tight">
                {selectedArticle.title}
              </h1>
              
              <div className="w-full h-px bg-white/10 mb-10"></div>
              
              <div className="prose prose-invert prose-cyan max-w-none">
                {/* Formatting Content with line breaks */}
                {selectedArticle.content.split('\n').map((paragraph: string, idx: number) => (
                  <p key={idx} className="text-slate-300 text-base md:text-lg leading-relaxed mb-6 font-medium">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Feedback Section (UI Only) */}
              <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
                 <span className="text-slate-400 font-bold text-sm">Was this article helpful?</span>
                 <div className="flex gap-4">
                    <button className="px-8 py-2.5 rounded-full border border-white/10 text-white hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:text-emerald-400 transition-colors text-sm font-bold">Yes</button>
                    <button className="px-8 py-2.5 rounded-full border border-white/10 text-white hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 transition-colors text-sm font-bold">No</button>
                 </div>
              </div>
            </article>
          </section>
        )}
        
      </main>

      {/* ================= BOTTOM CTA ================= */}
      <section className="py-20 px-6 mt-auto border-t border-white/5 bg-[#02040a]">
         <div className="max-w-[800px] mx-auto text-center flex flex-col items-center">
            <h3 className="text-2xl font-black text-white mb-4">Can't find what you're looking for?</h3>
            <p className="text-slate-400 mb-8 max-w-md">Our dedicated enterprise support team is available to assist you. Start a live chat to connect with a human agent.</p>
            <button 
              onClick={() => {
                 if (typeof window !== 'undefined' && (window as any).Tawk_API) {
                    (window as any).Tawk_API.toggle();
                 } else {
                    alert("Chat widget is loading. Please wait a few seconds...");
                 }
              }} 
              className="bg-white text-black px-8 py-3.5 rounded-full font-black text-[13px] uppercase tracking-widest hover:bg-cyan-400 hover:text-black transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]"
            >
              Start Live Chat
            </button>
         </div>
      </section>

      <footer className="bg-[#02040a] py-8 border-t border-white/5 text-center">
        <p className="text-slate-600 text-[11px] font-bold uppercase tracking-widest">
          © {new Date().getFullYear()} TunePlus Music Support. All Rights Reserved.
        </p>
      </footer>

    </div>
  );
}