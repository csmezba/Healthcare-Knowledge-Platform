import React, { useState, useEffect } from "react";
import { 
  Heart, BookOpen, Activity, Droplet, ArrowRight, CheckCircle, 
  Sparkles, Mail, Send, ChevronRight, HelpCircle, ExternalLink, 
  ThumbsUp, ShieldAlert, Video, Award, RefreshCw, Check, Clock, Play
} from "lucide-react";

import Header from "./components/Header";
import AIAssistant from "./components/AIAssistant";
import HealthCalculators from "./components/HealthCalculators";
import MedicineDatabase from "./components/MedicineDatabase";
import DiseaseLibrary from "./components/DiseaseLibrary";
import MedicalEquipment from "./components/MedicalEquipment";
import ExpertAuthors from "./components/ExpertAuthors";
import ArticleDetailPage from "./components/ArticleDetailPage";
import MedicineDetailPage from "./components/MedicineDetailPage";

import { Article, Medicine } from "./types";
import { articles, medicines } from "./data";

export default function App() {
  const [currentView, setCurrentView] = useState<"home" | "article-detail" | "medicine-detail" | "ai-chat">("home");
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);
  const [activeMedicineId, setActiveMedicineId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  
  // Simulated Video Player
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  // Auto scroll to top on page navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentView, activeArticleId, activeMedicineId]);

  const handleNavigate = (view: string, id?: string) => {
    if (view === "home") {
      setCurrentView("home");
      setActiveArticleId(null);
      setActiveMedicineId(null);
    } else if (view === "article-detail" && id) {
      setActiveArticleId(id);
      setCurrentView("article-detail");
      // Add to recently viewed
      const art = articles.find(a => a.id === id);
      if (art && !recentlyViewed.includes(art.title)) {
        setRecentlyViewed(prev => [art.title, ...prev.slice(0, 3)]);
      }
    } else if (view === "medicine-detail" && id) {
      setActiveMedicineId(id);
      setCurrentView("medicine-detail");
      // Add to recently viewed
      const med = medicines.find(m => m.id === id);
      if (med && !recentlyViewed.includes(med.name)) {
        setRecentlyViewed(prev => [med.name, ...prev.slice(0, 3)]);
      }
    } else if (view === "ai-chat") {
      setCurrentView("ai-chat");
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setTimeout(() => {
        setNewsletterSubscribed(false);
        setNewsletterEmail("");
      }, 5000);
    }
  };

  const featuredArticle = articles.find(a => a.id === "heart-wellness-guide") || articles[0];
  const secondaryArticles = articles.filter(a => a.id !== featuredArticle.id);

  // Quick chips search click handler
  const handleChipClick = (term: string) => {
    setSearchQuery(term);
    const element = document.getElementById("medicine-search-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col font-sans" id="auracare-main-root">
      
      {/* Premium Glassmorphism Header */}
      <Header 
        onNavigate={handleNavigate} 
        currentView={currentView}
        onSearchQuery={(query) => setSearchQuery(query)}
      />

      {/* Main Content Stage */}
      <main className="flex-grow max-w-[98%] xl:max-w-[99%] w-full mx-auto px-2 sm:px-4 md:px-6 py-8 space-y-12">
        
        {/* VIEW: HOME VIEW */}
        {currentView === "home" && (
          <>
            {/* HERO SECTION */}
            <section className="relative overflow-hidden bg-slate-900 text-white rounded-3xl p-6 md:p-12 shadow-xl border border-slate-800" id="editorial-hero">
              {/* Soft decorative background glow circles */}
              <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-teal-500/10 blur-3xl pointer-events-none"></div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                {/* Left side: Search & Popular Queries */}
                <div className="lg:col-span-5 space-y-6">
                  <div>
                    <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3.5 py-1 rounded-full text-xs font-semibold mb-3">
                      <Sparkles className="h-3.5 w-3.5 fill-blue-300 text-slate-900" />
                      <span>Premium Editorial Insights</span>
                    </div>
                    <h2 className="font-display font-black text-3xl md:text-5xl tracking-tight leading-tight">
                      Trustworthy Medical Knowledge
                    </h2>
                    <p className="text-sm text-slate-300 leading-relaxed mt-3">
                      Evidence-based guidelines, prescription insights, and diagnostic manuals authored and reviewed by certified medical experts.
                    </p>
                  </div>

                  {/* Dynamic interactive search chips */}
                  <div className="space-y-3">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block font-mono">Popular searches & chips:</span>
                    <div className="flex flex-wrap gap-2">
                      {["Ibuprofen", "Lisinopril", "Amoxicillin", "Asthma", "Hypertension", "Blood Pressure"].map((term) => (
                        <button
                          key={term}
                          onClick={() => handleChipClick(term)}
                          className="text-xs font-semibold bg-white/5 border border-white/10 hover:bg-blue-600 hover:text-white hover:border-blue-500 px-3 py-1.5 rounded-full transition-all cursor-pointer"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right side: Highlighted Featured Article Card */}
                <div className="lg:col-span-7">
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:border-blue-500/40 transition-all flex flex-col md:flex-row gap-5 p-5 group">
                    <div className="w-full md:w-48 h-48 rounded-xl overflow-hidden bg-slate-900 shrink-0">
                      <img 
                        src={featuredArticle.image} 
                        alt={featuredArticle.title} 
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 referrerPolicy='no-referrer'"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-center justify-between text-[10px] text-blue-300 font-mono font-bold uppercase">
                          <span>{featuredArticle.category}</span>
                          <span>• {featuredArticle.readTime}</span>
                        </div>
                        <h3 className="font-display font-extrabold text-slate-100 text-lg md:text-xl mt-1 leading-snug group-hover:text-blue-300 transition-colors">
                          {featuredArticle.title}
                        </h3>
                        <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mt-1.5">
                          {featuredArticle.summary}
                        </p>
                      </div>

                      <div className="flex items-center justify-between gap-2 border-t border-white/5 pt-3">
                        <div className="flex items-center gap-2">
                          <img 
                            src={featuredArticle.author.avatar} 
                            alt={featuredArticle.author.name} 
                            className="h-6 w-6 rounded-full object-cover referrerPolicy='no-referrer'"
                            referrerPolicy="no-referrer"
                          />
                          <span className="text-[10px] text-slate-300 font-medium font-mono">{featuredArticle.author.name}</span>
                        </div>
                        <button
                          onClick={() => handleNavigate("article-detail", featuredArticle.id)}
                          className="text-xs text-blue-400 font-bold flex items-center gap-1 group-hover:text-blue-300 cursor-pointer"
                        >
                          <span>Read Article</span>
                          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* TWO COLUMN HOME LAYOUT: MAIN DIRECTORIES ON LEFT, SIDEBAR WIDGETS ON RIGHT */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* LEFT BODY COLUMN (9 columns) */}
              <div className="lg:col-span-9 space-y-12">
                
                {/* PRESERVED BREATHTAKING DIRECTORY GRID (Medicine, Diseases, Equipment, Calculators) */}
                <section className="space-y-4">
                  <span className="text-xs text-blue-600 font-bold font-mono uppercase tracking-widest flex items-center gap-1">
                    🎯 Interactive Directories
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div 
                      onClick={() => document.getElementById("medicine-search-section")?.scrollIntoView({behavior: "smooth"})}
                      className="bg-gradient-to-tr from-blue-50 to-white hover:from-blue-100 hover:to-white border border-slate-100 rounded-2xl p-5 shadow-sm cursor-pointer transition-all hover:shadow-md group flex gap-4"
                    >
                      <div className="h-12 w-12 rounded-xl bg-blue-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-100 font-bold text-xl">
                        💊
                      </div>
                      <div>
                        <h4 className="font-display font-extrabold text-slate-900 text-sm group-hover:text-blue-600">Medicine Encyclopedia</h4>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">Search through active chemical elements, recommended dosages, and check drug-to-drug interactions.</p>
                      </div>
                    </div>

                    <div 
                      onClick={() => document.getElementById("diseases-library")?.scrollIntoView({behavior: "smooth"})}
                      className="bg-gradient-to-tr from-teal-50 to-white hover:from-teal-100 hover:to-white border border-slate-100 rounded-2xl p-5 shadow-sm cursor-pointer transition-all hover:shadow-md group flex gap-4"
                    >
                      <div className="h-12 w-12 rounded-xl bg-teal-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-teal-100 font-bold text-xl">
                        🦠
                      </div>
                      <div>
                        <h4 className="font-display font-extrabold text-slate-900 text-sm group-hover:text-teal-600">Chronic Care Guidelines</h4>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">Review standard clinical parameters, chronic symptom checklists, and preventive wellness advice.</p>
                      </div>
                    </div>

                    <div 
                      onClick={() => document.getElementById("equipment-showcase")?.scrollIntoView({behavior: "smooth"})}
                      className="bg-gradient-to-tr from-indigo-50 to-white hover:from-indigo-100 hover:to-white border border-slate-100 rounded-2xl p-5 shadow-sm cursor-pointer transition-all hover:shadow-md group flex gap-4"
                    >
                      <div className="h-12 w-12 rounded-xl bg-indigo-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-indigo-100 font-bold text-xl">
                        🩻
                      </div>
                      <div>
                        <h4 className="font-display font-extrabold text-slate-900 text-sm group-hover:text-indigo-600">Medical Hardware</h4>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">Check diagnostic device specifications, upper arm cuff posture guides, and aseptic maintenance rules.</p>
                      </div>
                    </div>

                    <div 
                      onClick={() => document.getElementById("health-calculators")?.scrollIntoView({behavior: "smooth"})}
                      className="bg-gradient-to-tr from-emerald-50 to-white hover:from-emerald-100 hover:to-white border border-slate-100 rounded-2xl p-5 shadow-sm cursor-pointer transition-all hover:shadow-md group flex gap-4"
                    >
                      <div className="h-12 w-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-100 font-bold text-xl">
                        ⚖️
                      </div>
                      <div>
                        <h4 className="font-display font-extrabold text-slate-900 text-sm group-hover:text-emerald-600">Diagnostic Calculators</h4>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">Dynamically compute your heart rate boundaries, Body Mass Index, or daily water intake target ranges.</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* MEDICINES ENCYCLOPEDIA */}
                <section>
                  <MedicineDatabase 
                    onSelectMedicine={(id) => handleNavigate("medicine-detail", id)}
                    searchQuery={searchQuery}
                  />
                </section>

                {/* DISEASE GUIDELINES */}
                <section>
                  <DiseaseLibrary />
                </section>

                {/* MEDICAL EQUIPMENT SHOWCASE */}
                <section>
                  <MedicalEquipment />
                </section>

                {/* HEALTH CALCULATORS */}
                <section>
                  <HealthCalculators />
                </section>

                {/* CLINICAL VIDEOS SECTION */}
                <section className="bg-white border border-slate-100 rounded-3xl p-6 lg:p-8 space-y-6" id="medical-videos">
                  <div>
                    <span className="text-xs text-blue-600 font-bold font-mono uppercase tracking-widest flex items-center gap-1.5">
                      <Video className="h-4 w-4" />
                      <span>Verified Video Library</span>
                    </span>
                    <h3 className="font-display font-black text-slate-950 text-xl tracking-tight mt-1">Review Tutorials</h3>
                    <p className="text-xs text-slate-400">Watch our clinical advisory board demonstrate postural diagnostic cuffs and nebulizer cleaning.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div 
                      onClick={() => setActiveVideo("bp")}
                      className="group cursor-pointer relative overflow-hidden rounded-2xl border border-slate-100 shadow-sm"
                    >
                      <div className="h-44 bg-slate-900 relative overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=400" 
                          alt="BP video"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 referrerPolicy='no-referrer'"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors flex items-center justify-center">
                          <div className="h-12 w-12 rounded-full bg-white text-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <Play className="h-5 w-5 fill-blue-600 text-blue-600 ml-1" />
                          </div>
                        </div>
                        <span className="absolute bottom-3 right-3 bg-slate-950/60 text-white text-[10px] font-mono px-2 py-0.5 rounded font-bold">
                          4:20 min
                        </span>
                      </div>
                      <div className="p-4 bg-white">
                        <span className="text-[10px] text-blue-600 font-bold uppercase">Cardiovascular Diagnostics</span>
                        <h4 className="font-display font-extrabold text-slate-900 text-sm mt-1">Upper Arm Posture Calibration</h4>
                        <p className="text-xs text-slate-500 mt-1">Dr. Sarah Jenkins demonstrates sitting quiet rules and alignment levels.</p>
                      </div>
                    </div>

                    <div 
                      onClick={() => setActiveVideo("neb")}
                      className="group cursor-pointer relative overflow-hidden rounded-2xl border border-slate-100 shadow-sm"
                    >
                      <div className="h-44 bg-slate-900 relative overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=400" 
                          alt="Nebulizer video"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 referrerPolicy='no-referrer'"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors flex items-center justify-center">
                          <div className="h-12 w-12 rounded-full bg-white text-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <Play className="h-5 w-5 fill-blue-600 text-blue-600 ml-1" />
                          </div>
                        </div>
                        <span className="absolute bottom-3 right-3 bg-slate-950/60 text-white text-[10px] font-mono px-2 py-0.5 rounded font-bold">
                          5:45 min
                        </span>
                      </div>
                      <div className="p-4 bg-white">
                        <span className="text-[10px] text-blue-600 font-bold uppercase">Respiratory Wellness</span>
                        <h4 className="font-display font-extrabold text-slate-900 text-sm mt-1">Mesh Nebulizer Maintenance</h4>
                        <p className="text-xs text-slate-500 mt-1">Dr. Vance runs through micro-mesh vinegar rinses to prevent medicine clogging.</p>
                      </div>
                    </div>
                  </div>

                  {/* ACTIVE VIDEO EMBED SIMULATOR */}
                  {activeVideo && (
                    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                      <div className="bg-slate-900 rounded-3xl overflow-hidden max-w-2xl w-full border border-slate-800 shadow-2xl">
                        <div className="p-4 bg-slate-950 flex items-center justify-between border-b border-slate-800">
                          <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                            <Video className="h-4 w-4 text-blue-500" />
                            <span>Clinical Review Media Stream</span>
                          </span>
                          <button 
                            onClick={() => setActiveVideo(null)}
                            className="text-xs text-slate-400 hover:text-white font-bold cursor-pointer"
                          >
                            Close Player
                          </button>
                        </div>
                        <div className="h-80 bg-slate-950 flex items-center justify-center relative">
                          <div className="text-center space-y-4">
                            <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
                            <p className="text-xs text-slate-400 font-medium">Loading clinical video stream...</p>
                          </div>
                          {/* Playback simulation message */}
                          <div className="absolute bottom-6 left-6 text-xs text-slate-400 text-left">
                            <p className="font-bold text-slate-100">
                              {activeVideo === "bp" ? "Clinical Position: Upper Arm BP Posture Calibration" : "Maintenance Protocol: Handheld Mesh Nebulizer Pro"}
                            </p>
                            <p className="text-[10px]">Verified AuraCare Advisory board. Standard 1080p, AAC Audio.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </section>

                {/* CLINICAL BOARD */}
                <section>
                  <ExpertAuthors />
                </section>

              </div>

              {/* RIGHT WIDGETS SIDEBAR COLUMN (3 columns) */}
              <aside className="lg:col-span-3 space-y-8 lg:sticky lg:top-32" id="sidebar-stage">
                
                {/* WIDGET: ABOUT AURACARE */}
                <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-3">
                  <div className="h-8 w-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                    🛡️
                  </div>
                  <h4 className="font-display font-extrabold text-slate-900 text-sm">Clinical Transparency</h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    AuraCare operates under strict editorial review processes. Our content does not constitute medical advice or active diagnostics. Read our full policy below.
                  </p>
                </div>

                {/* WIDGET: TRENDING STORIES */}
                <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-4">
                  <h4 className="font-display font-extrabold text-slate-950 text-xs uppercase tracking-wider border-b border-slate-50 pb-2 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 bg-blue-600 rounded-full"></span>
                    <span>Trending Advisory Articles</span>
                  </h4>

                  <div className="space-y-3.5">
                    {secondaryArticles.map((art) => (
                      <div 
                        key={art.id}
                        onClick={() => handleNavigate("article-detail", art.id)}
                        className="group cursor-pointer flex gap-3.5 items-start"
                      >
                        <div className="h-12 w-12 rounded-lg overflow-hidden bg-slate-900 shrink-0">
                          <img 
                            src={art.image} 
                            alt={art.title} 
                            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300 referrerPolicy='no-referrer'"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div>
                          <span className="text-[9px] text-blue-600 font-bold uppercase tracking-wide font-mono">{art.category}</span>
                          <h5 className="font-display font-bold text-slate-900 text-xs leading-snug group-hover:text-blue-600 line-clamp-2 transition-colors mt-0.5">
                            {art.title}
                          </h5>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* WIDGET: NEWSLETTER BOX */}
                <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-3xl p-5 shadow-lg space-y-4 border border-slate-800">
                  <div className="h-9 w-9 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-900/40">
                    <Mail className="h-4.5 w-4.5 fill-white" />
                  </div>
                  <div>
                    <h4 className="font-display font-extrabold text-sm text-slate-100">Clinical Advisory Dispatch</h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">Join 45,000+ patients and practitioners receiving monthly peer-reviewed health briefs directly.</p>
                  </div>

                  {newsletterSubscribed ? (
                    <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs p-3 rounded-xl font-medium leading-relaxed">
                      ✓ Successfully subscribed. Please confirm your email inside your primary inbox.
                    </div>
                  ) : (
                    <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                      <input 
                        type="email" 
                        placeholder="Enter your secure email..." 
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        required
                      />
                      <button 
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2.5 rounded-xl transition-colors cursor-pointer"
                      >
                        Subscribe Briefs
                      </button>
                    </form>
                  )}
                </div>

                {/* WIDGET: RECENTLY VIEWED MEMORY */}
                {recentlyViewed.length > 0 && (
                  <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-3">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block font-mono">Recently Visited Logs:</span>
                    <ul className="space-y-2">
                      {recentlyViewed.map((title, idx) => (
                        <li key={idx} className="text-xs text-slate-700 leading-relaxed font-semibold flex items-center gap-1.5 truncate">
                          <span className="h-1 w-1 bg-slate-300 rounded-full shrink-0"></span>
                          <span className="truncate">{title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              </aside>

            </div>
          </>
        )}

        {/* VIEW: ARTICLE DETAIL VIEW */}
        {currentView === "article-detail" && activeArticleId && (
          (() => {
            const art = articles.find(a => a.id === activeArticleId);
            return art ? (
              <ArticleDetailPage 
                article={art} 
                onBack={() => handleNavigate("home")} 
                onNavigate={handleNavigate}
              />
            ) : (
              <div className="text-center py-12">Article not found.</div>
            );
          })()
        )}

        {/* VIEW: MEDICINE DETAIL VIEW */}
        {currentView === "medicine-detail" && activeMedicineId && (
          (() => {
            const med = medicines.find(m => m.id === activeMedicineId);
            return med ? (
              <MedicineDetailPage 
                medicine={med} 
                onBack={() => handleNavigate("home")}
              />
            ) : (
              <div className="text-center py-12">Medicine reference not found.</div>
            );
          })()
        )}

        {/* VIEW: AI ASSISTANT CHAT */}
        {currentView === "ai-chat" && (
          <AIAssistant onBack={() => handleNavigate("home")} />
        )}

      </main>

      {/* FOOTER & ACCESSIBILITY disclaimers */}
      <footer className="bg-slate-950 text-white border-t border-slate-900 mt-16" id="auracare-footer">
        
        {/* Double clinical safety disclaimer at footer top */}
        <div className="bg-slate-900 border-b border-slate-950 py-8 px-2 sm:px-4 md:px-6">
          <div className="max-w-[98%] xl:max-w-[99%] mx-auto flex gap-4">
            <ShieldAlert className="h-6 w-6 text-amber-500 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300 leading-relaxed space-y-1.5">
              <p className="font-bold text-slate-100">National Medical Authority Standard Disclaimer</p>
              <p>
                AuraCare content, publications, databases, search outputs, and conversational AI insights serve exclusively as general informational context and do not provide physical health diagnostics, customized dosage prescriptions, or professional treatment recommendations. Always schedule a direct consultation with your physician, cardiologist, or primary caregiver regarding specialized clinical diagnostics or drug compatibility evaluations.
              </p>
              <p className="text-[10px] text-slate-400">
                Peer Review Standard: Content is compiled from validated databases (FDA, EMA) and reviewed by the AuraCare advisory board.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-[98%] xl:max-w-[99%] mx-auto px-2 sm:px-4 md:px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 text-xs text-slate-400">
          
          {/* Logo column (4 columns) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Heart className="h-4.5 w-4.5 fill-white" />
              </div>
              <span className="font-display font-extrabold text-base text-slate-100 tracking-tight">AuraCare</span>
            </div>
            <p className="leading-relaxed text-slate-400">
              AuraCare is an international digital healthcare knowledge and medicine encyclopedia platform operated under strict board certifications to promote healthy health habits globally.
            </p>
            <p className="text-[10px] text-slate-500 font-mono">© 2026 AuraCare Inc. All rights reserved.</p>
          </div>

          {/* Categories links (2 columns) */}
          <div className="lg:col-span-2 space-y-3">
            <h5 className="font-display font-bold text-slate-100 text-xs uppercase tracking-wider">Compendiums</h5>
            <ul className="space-y-2 font-medium">
              <li><button onClick={() => { handleNavigate("home"); setTimeout(() => document.getElementById("medicine-search-section")?.scrollIntoView({behavior: "smooth"}), 100); }} className="hover:text-white transition-colors">Drug Encyclopedia</button></li>
              <li><button onClick={() => { handleNavigate("home"); setTimeout(() => document.getElementById("diseases-library")?.scrollIntoView({behavior: "smooth"}), 100); }} className="hover:text-white transition-colors">Pathology Index</button></li>
              <li><button onClick={() => { handleNavigate("home"); setTimeout(() => document.getElementById("equipment-showcase")?.scrollIntoView({behavior: "smooth"}), 100); }} className="hover:text-white transition-colors">Device Specifications</button></li>
              <li><button onClick={() => handleNavigate("ai-chat")} className="hover:text-white transition-colors">Conversational AI</button></li>
            </ul>
          </div>

          {/* Resources links (2 columns) */}
          <div className="lg:col-span-2 space-y-3">
            <h5 className="font-display font-bold text-slate-100 text-xs uppercase tracking-wider">Calculators</h5>
            <ul className="space-y-2 font-medium">
              <li><button onClick={() => { handleNavigate("home"); setTimeout(() => document.getElementById("health-calculators")?.scrollIntoView({behavior: "smooth"}), 100); }} className="hover:text-white transition-colors">Body Mass Index</button></li>
              <li><button onClick={() => { handleNavigate("home"); setTimeout(() => document.getElementById("health-calculators")?.scrollIntoView({behavior: "smooth"}), 100); }} className="hover:text-white transition-colors">Metabolic BMR</button></li>
              <li><button onClick={() => { handleNavigate("home"); setTimeout(() => document.getElementById("health-calculators")?.scrollIntoView({behavior: "smooth"}), 100); }} className="hover:text-white transition-colors">Hydration Intake</button></li>
              <li><button onClick={() => { handleNavigate("home"); setTimeout(() => document.getElementById("health-calculators")?.scrollIntoView({behavior: "smooth"}), 100); }} className="hover:text-white transition-colors">Cardio Zone Limits</button></li>
            </ul>
          </div>

          {/* Policy links (2 columns) */}
          <div className="lg:col-span-2 space-y-3">
            <h5 className="font-display font-bold text-slate-100 text-xs uppercase tracking-wider">Editorial Rules</h5>
            <ul className="space-y-2 font-medium text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Editorial Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Review Board Process</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Aseptic Hardware Rules</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Trust badges column (2 columns) */}
          <div className="lg:col-span-2 space-y-4">
            <h5 className="font-display font-bold text-slate-100 text-xs uppercase tracking-wider">Clinical Standards</h5>
            <div className="space-y-2 text-[10px] leading-relaxed text-slate-500">
              <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                <span className="font-bold text-slate-300 block">WCAG AA Accessible</span>
                <span>Contrast and keyboard controls fully optimized.</span>
              </div>
              <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                <span className="font-bold text-slate-300 block">FDA Standard Compliant</span>
                <span>Active compounds linked to verified listings.</span>
              </div>
            </div>
          </div>

        </div>

      </footer>

    </div>
  );
}
