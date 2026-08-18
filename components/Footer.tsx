import React from "react";
import Link from "next/link";
import { Heart, ShieldAlert, BookOpen, Activity, Sparkles, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 text-sm mt-16 border-t border-slate-800" id="takecare-footer">
      <div className="max-w-[95%] md:max-w-[88%] lg:max-w-[80%] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800/80">
          
          {/* Col 1: Brand & Tagline */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-900/50">
                <Heart className="h-5 w-5 fill-white" />
              </div>
              <span className="font-display font-extrabold text-xl text-white tracking-tight">
                TakeCare
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              TakeCare is an ultra-premium healthcare publication and medical decision support platform. Dedicated to translating complex clinical literature into clear, actionable health insights.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-slate-300 font-medium">
              <span className="flex items-center gap-1"><Sparkles className="h-3.5 w-3.5 text-blue-400" /> Evidence-Based</span>
              <span className="flex items-center gap-1"><BookOpen className="h-3.5 w-3.5 text-teal-400" /> Peer Reviewed</span>
              <span className="flex items-center gap-1"><Activity className="h-3.5 w-3.5 text-indigo-400" /> HIPAA Compliant Architecture</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="font-display font-bold text-white text-sm mb-3">Knowledge Centers</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><Link href="/medicines" className="hover:text-blue-400 transition-colors">Medicine Encyclopedia</Link></li>
              <li><Link href="/diseases" className="hover:text-blue-400 transition-colors">Disease Library</Link></li>
              <li><Link href="/equipment" className="hover:text-blue-400 transition-colors">Medical Equipment Showcase</Link></li>
              <li><Link href="/calculators" className="hover:text-blue-400 transition-colors">Interactive Calculators</Link></li>
              <li><Link href="/ai-assistant" className="hover:text-blue-400 transition-colors">AI Health Assistant</Link></li>
            </ul>
          </div>

          {/* Col 3: Medical Editorial Board */}
          <div>
            <h4 className="font-display font-bold text-white text-sm mb-3">Advisory Board</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><Link href="/authors" className="hover:text-blue-400 transition-colors">Dr. Sarah Jenkins (Cardiology)</Link></li>
              <li><Link href="/authors" className="hover:text-blue-400 transition-colors">Dr. James Vance (Pharmacology)</Link></li>
              <li><Link href="/authors" className="hover:text-blue-400 transition-colors">Dr. Marcus Thorne (Pediatrics)</Link></li>
              <li><Link href="/authors" className="hover:text-blue-400 transition-colors">Elena Rostova (Clinical Nutrition)</Link></li>
              <li><Link href="/authors" className="hover:text-blue-400 transition-colors">Editorial Integrity Guidelines</Link></li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 className="font-display font-bold text-white text-sm mb-3">Medical Briefing</h4>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Subscribe for weekly clinical summaries, drug recall alerts, and longevity protocols.
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Doctor or Patient email..." 
                className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 flex-1"
              />
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer">
                Join
              </button>
            </div>
          </div>

        </div>

        {/* Emergency Medical Disclaimer */}
        <div className="pt-8 pb-6 flex flex-col md:flex-row items-start md:items-center gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80 my-6">
          <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl shrink-0">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <div className="text-xs text-slate-400 leading-relaxed">
            <span className="font-bold text-slate-200 block mb-0.5">Medical Disclaimer & Emergency Notice</span>
            TakeCare's content, interactive health tools, and AI Assistant are for informational and educational purposes only. They do not constitute professional medical advice, diagnosis, or treatment. If you are experiencing a medical emergency, call 911 (or your local emergency number) immediately or visit the nearest emergency room.
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4 pt-4 border-t border-slate-900">
          <p>© {new Date().getFullYear()} TakeCare Healthcare Knowledge Platform. All rights reserved.</p>
          <div className="flex items-center gap-6 font-mono text-[11px]">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Editorial Disclosures</span>
            <span>HIPAA Statement</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
