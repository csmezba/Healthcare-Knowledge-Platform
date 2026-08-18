"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, BookOpen, ThumbsUp } from "lucide-react";
import { articles } from "@/lib/data";
import MedicineDatabase from "@/components/MedicineDatabase";
import DiseaseLibrary from "@/components/DiseaseLibrary";
import HealthCalculators from "@/components/HealthCalculators";
import MedicalEquipment from "@/components/MedicalEquipment";
import ExpertAuthors from "@/components/ExpertAuthors";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const featuredArticle = articles.find(a => a.id === "heart-wellness-guide") || articles[0];
  const secondaryArticles = articles.filter(a => a.id !== featuredArticle.id);

  const handleChipClick = (term: string) => {
    setSearchQuery(term);
    const element = document.getElementById("medicine-search-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full mx-auto py-8 space-y-12">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-slate-900 text-white rounded-3xl p-6 md:p-12 shadow-xl border border-slate-800" id="editorial-hero">
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-teal-500/10 blur-3xl pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left side: Search & Chips */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3.5 py-1 rounded-full text-xs font-semibold mb-3">
                <Sparkles className="h-3.5 w-3.5 fill-blue-300 text-slate-900" />
                <span>Premium Editorial Insights</span>
              </div>
              <h1 className="font-display font-black text-3xl md:text-5xl tracking-tight leading-tight">
                Trustworthy Medical Knowledge
              </h1>
              <p className="text-sm text-slate-300 leading-relaxed mt-3">
                Evidence-based guidelines, prescription insights, and diagnostic manuals authored and reviewed by certified medical experts.
              </p>
            </div>

            {/* Quick chips */}
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
            <Link href={`/articles/${featuredArticle.id}`}>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:border-blue-500/40 transition-all flex flex-col md:flex-row gap-5 p-5 group cursor-pointer">
                <div className="w-full md:w-48 h-48 rounded-xl overflow-hidden bg-slate-900 shrink-0">
                  <img 
                    src={featuredArticle.image} 
                    alt={featuredArticle.title} 
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-md bg-blue-500 text-white font-mono">
                        {featuredArticle.category}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">• {featuredArticle.readTime}</span>
                    </div>

                    <h3 className="font-display font-bold text-lg md:text-xl text-white group-hover:text-blue-300 transition-colors leading-snug">
                      {featuredArticle.title}
                    </h3>

                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 mt-2">
                      {featuredArticle.summary}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/10 pt-3 text-xs">
                    <div className="flex items-center gap-2">
                      <img 
                        src={featuredArticle.author.avatar} 
                        alt={featuredArticle.author.name} 
                        className="h-6 w-6 rounded-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <span className="text-slate-300 font-medium text-xs truncate max-w-36">{featuredArticle.author.name}</span>
                    </div>

                    <span className="text-blue-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Read Guideline <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* SECONDARY EDITORIAL ARTICLES GRID */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs text-blue-600 font-bold font-mono uppercase tracking-widest flex items-center gap-1.5 mb-1">
              <BookOpen className="h-4 w-4" />
              <span>Evidence-Based Literature</span>
            </span>
            <h2 className="font-display font-black text-2xl text-slate-950 tracking-tight">Clinical Insights & Guidelines</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {secondaryArticles.map(article => (
            <Link key={article.id} href={`/articles/${article.id}`}>
              <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full group cursor-pointer">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] bg-slate-100 text-slate-700 font-bold px-2.5 py-0.5 rounded-md font-mono">
                      {article.category}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">{article.readTime}</span>
                  </div>

                  <h3 className="font-display font-extrabold text-slate-900 text-lg group-hover:text-blue-600 transition-colors mb-2">
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 mb-4">
                    {article.summary}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-slate-50 pt-4 text-xs">
                  <span className="text-slate-400 font-medium">{article.author.name}</span>
                  <span className="text-blue-600 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Explore <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* MEDICINE ENCYCLOPEDIA SECTION */}
      <MedicineDatabase searchQuery={searchQuery} />

      {/* DISEASE LIBRARY SECTION */}
      <DiseaseLibrary />

      {/* HEALTH CALCULATORS SECTION */}
      <HealthCalculators />

      {/* MEDICAL EQUIPMENT SHOWCASE SECTION */}
      <MedicalEquipment />

      {/* EXPERT ADVISORY BOARD SECTION */}
      <ExpertAuthors />
    </div>
  );
}
