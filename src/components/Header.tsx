import React, { useState } from "react";
import { Search, Heart, Globe, Moon, Sun, User, Bell, ChevronDown, Sparkles } from "lucide-react";

interface HeaderProps {
  onNavigate: (view: string, id?: string) => void;
  currentView: string;
  onSearchQuery: (query: string) => void;
}

export default function Header({ onNavigate, currentView, onSearchQuery }: HeaderProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState("EN");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Since we are maintaining a single polished high-contrast theme, we'll demonstrate a visual indicator
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      onSearchQuery(searchValue);
      onNavigate("home");
      // Scroll to medicine database or search outcomes
      const element = document.getElementById("medicine-search-section");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm" id="auracare-header">
      {/* Breaking Medical News Ticker */}
      <div className="bg-blue-600 text-white text-xs py-2 px-4 overflow-hidden relative flex items-center gap-3">
        <span className="font-mono bg-blue-700 font-bold px-2 py-0.5 rounded uppercase tracking-wider shrink-0 text-[10px]">
          Breaking News
        </span>
        <div className="animate-pulse flex-1 truncate font-medium">
          New FDA guidance issued for OTC continuous glucose monitors (CGM) usage • Study reveals 150 min of Zone 2 cardio reduces arterial plaque build-up by 22% • AuraCare advisory board releases pediatric influenza care protocol.
        </div>
        <div className="text-[10px] text-blue-100 font-mono hidden md:block">
          UTC 15:30
        </div>
      </div>

      <div className="max-w-[98%] xl:max-w-[99%] mx-auto px-2 sm:px-4 md:px-6 h-18 flex items-center justify-between gap-4">
        {/* Logo and Brand */}
        <div 
          className="flex items-center gap-2.5 cursor-pointer shrink-0" 
          onClick={() => onNavigate("home")}
          id="brand-logo"
        >
          <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-200">
            <Heart className="h-5 w-5 fill-white animate-pulse" />
          </div>
          <div>
            <span className="font-display font-extrabold text-lg text-slate-950 tracking-tight flex items-center gap-1.5">
              AuraCare
              <span className="text-[10px] bg-emerald-500/10 text-emerald-600 px-1.5 py-0.5 rounded-full font-mono font-medium">
                Verified
              </span>
            </span>
            <p className="text-[10px] text-slate-500 font-medium tracking-wide">HEALTH KNOWLEDGE HUB</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="hidden lg:flex items-center gap-8 font-sans font-medium text-sm text-slate-600">
          <button 
            onClick={() => onNavigate("home")} 
            className={`hover:text-blue-600 transition-colors py-2 relative ${currentView === "home" ? "text-blue-600 border-b-2 border-blue-600" : ""}`}
          >
            Home & Insights
          </button>
          
          {/* Categories Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setCategoryMenuOpen(!categoryMenuOpen)}
              onMouseEnter={() => setCategoryMenuOpen(true)}
              className="hover:text-blue-600 transition-colors py-2 flex items-center gap-1"
            >
              Directories <ChevronDown className="h-4 w-4" />
            </button>
            {categoryMenuOpen && (
              <div 
                className="absolute left-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-slate-100 p-2 z-50 flex flex-col gap-1"
                onMouseLeave={() => setCategoryMenuOpen(false)}
              >
                <button 
                  onClick={() => { onNavigate("home"); setCategoryMenuOpen(false); setTimeout(() => document.getElementById("medicine-search-section")?.scrollIntoView({behavior: "smooth"}), 100); }}
                  className="flex items-center gap-3 p-2.5 hover:bg-slate-50 rounded-lg text-left text-slate-700 text-sm transition-all"
                >
                  <span className="p-1 bg-blue-50 text-blue-600 rounded">💊</span>
                  <div>
                    <p className="font-semibold text-slate-900">Medicine Encyclopedia</p>
                    <p className="text-xs text-slate-400">OTC & prescription databases</p>
                  </div>
                </button>
                <button 
                  onClick={() => { onNavigate("home"); setCategoryMenuOpen(false); setTimeout(() => document.getElementById("diseases-library")?.scrollIntoView({behavior: "smooth"}), 100); }}
                  className="flex items-center gap-3 p-2.5 hover:bg-slate-50 rounded-lg text-left text-slate-700 text-sm transition-all"
                >
                  <span className="p-1 bg-teal-50 text-teal-600 rounded">🦠</span>
                  <div>
                    <p className="font-semibold text-slate-900">Disease Guidelines</p>
                    <p className="text-xs text-slate-400">Clinical symptom indices</p>
                  </div>
                </button>
                <button 
                  onClick={() => { onNavigate("home"); setCategoryMenuOpen(false); setTimeout(() => document.getElementById("equipment-showcase")?.scrollIntoView({behavior: "smooth"}), 100); }}
                  className="flex items-center gap-3 p-2.5 hover:bg-slate-50 rounded-lg text-left text-slate-700 text-sm transition-all"
                >
                  <span className="p-1 bg-indigo-50 text-indigo-600 rounded">🩻</span>
                  <div>
                    <p className="font-semibold text-slate-900">Medical Equipment</p>
                    <p className="text-xs text-slate-400">Diagnostic device metrics</p>
                  </div>
                </button>
              </div>
            )}
          </div>

          <button 
            onClick={() => { onNavigate("home"); setTimeout(() => document.getElementById("health-calculators")?.scrollIntoView({behavior: "smooth"}), 100); }}
            className="hover:text-blue-600 transition-colors py-2"
          >
            Health Calculators
          </button>
          
          <button 
            onClick={() => { onNavigate("home"); setTimeout(() => document.getElementById("expert-authors")?.scrollIntoView({behavior: "smooth"}), 100); }}
            className="hover:text-blue-600 transition-colors py-2"
          >
            Advisory Board
          </button>
        </nav>

        {/* Right Section Tools */}
        <div className="flex items-center gap-3">
          {/* Custom Search Form */}
          <form onSubmit={handleSearchSubmit} className="relative hidden md:block">
            <input 
              type="text" 
              placeholder="Search medicines, diseases, guidelines..." 
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-64 lg:w-80 bg-slate-50 border border-slate-200 rounded-full py-2 pl-4 pr-10 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-800"
            />
            <button type="submit" className="absolute right-3 top-2.5 text-slate-400 hover:text-blue-600">
              <Search className="h-4 w-4" />
            </button>
          </form>

          {/* Quick AI Trigger */}
          <button 
            onClick={() => onNavigate("ai-chat")} 
            className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-md shadow-blue-100 hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all cursor-pointer animate-shimmer"
            id="ai-assistant-btn"
          >
            <Sparkles className="h-3.5 w-3.5 fill-white text-indigo-200" />
            <span>AI Assistant</span>
          </button>

          {/* Language Switch */}
          <button 
            onClick={() => setLanguage(language === "EN" ? "ES" : "EN")}
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg text-xs font-bold font-mono transition-colors"
            title="Switch Language"
          >
            <Globe className="h-4.5 w-4.5 inline mr-1" />
            {language}
          </button>

          {/* Notification Alert */}
          <div className="relative">
            <button 
              onClick={() => setNotificationOpen(!notificationOpen)}
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors relative"
            >
              <Bell className="h-4.5 w-4.5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            {notificationOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-100 p-4 z-50">
                <h4 className="font-display font-semibold text-sm text-slate-900 border-b border-slate-100 pb-2 flex items-center justify-between">
                  <span>Advisory Bulletins</span>
                  <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-mono">1 New</span>
                </h4>
                <div className="mt-3 flex gap-3 text-xs leading-relaxed text-slate-600 hover:bg-slate-50 p-2 rounded-lg transition-colors cursor-pointer">
                  <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">🌡️</div>
                  <div>
                    <p className="font-semibold text-slate-900">Pediatric Respiratory Guideline</p>
                    <p className="text-slate-500 mt-0.5">Updated Nebulizer cleaning protocol published by Dr. Thorne.</p>
                    <span className="text-[10px] text-slate-400 font-mono mt-1 block">10 mins ago</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Status / Avatar */}
          <div className="h-8 w-8 rounded-full bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center text-slate-600 text-sm font-semibold hover:border-blue-500 cursor-pointer transition-colors">
            <User className="h-4 w-4" />
          </div>
        </div>
      </div>
    </header>
  );
}
