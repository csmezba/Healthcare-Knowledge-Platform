import React, { useState } from "react";
import { ShieldAlert, BookOpen, Clock, HeartHandshake, Eye, AlertCircle, X, CheckCircle } from "lucide-react";
import { Disease } from "../types";
import { diseases } from "../data";

export default function DiseaseLibrary() {
  const [activeDisease, setActiveDisease] = useState<Disease | null>(null);

  const getRiskColor = (level: "Low" | "Moderate" | "High" | "Critical") => {
    switch (level) {
      case "Low": return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "Moderate": return "bg-blue-50 text-blue-700 border-blue-100";
      case "High": return "bg-orange-50 text-orange-700 border-orange-100";
      case "Critical": return "bg-red-50 text-red-700 border-red-100";
    }
  };

  return (
    <div className="space-y-6" id="diseases-library">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs text-teal-600 font-bold font-mono uppercase tracking-widest flex items-center gap-1.5 mb-1">
            🦠 Medical Disease Library
          </span>
          <h3 className="font-display font-bold text-slate-900 text-xl tracking-tight">Standard Clinical Guidelines</h3>
          <p className="text-xs text-slate-400 mt-0.5">Peer-reviewed symptom logs and standard care pathways for acute & chronic pathology.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {diseases.map(disease => (
          <div 
            key={disease.id}
            className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className={`text-[10px] font-bold uppercase px-3 py-1 rounded-md border tracking-wide ${getRiskColor(disease.riskLevel)}`}>
                  {disease.riskLevel} Risk Level
                </span>
                <span className="text-[10px] text-slate-400 font-mono font-medium flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-slate-300" />
                  {disease.commonAge}
                </span>
              </div>

              <h4 className="font-display font-extrabold text-slate-900 text-lg mb-2">
                {disease.name}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-5">
                {disease.overview}
              </p>

              {/* Symptoms chips */}
              <div className="space-y-2 mb-5">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Signature Symptoms:</span>
                <div className="flex flex-wrap gap-1.5">
                  {disease.symptoms.map(s => (
                    <span key={s} className="text-[11px] font-medium bg-slate-50 text-slate-700 px-3 py-1 rounded-lg border border-slate-100">
                      • {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Standard Treatments */}
              <div className="space-y-2 mb-6">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Standard Care Interventions:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {disease.treatments.map(t => (
                    <div key={t} className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed">
                      <CheckCircle className="h-4 w-4 text-teal-500 shrink-0 mt-0.5" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveDisease(disease)}
              className="w-full bg-slate-50 hover:bg-teal-50 hover:text-teal-700 text-slate-700 border border-slate-100 text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <BookOpen className="h-4 w-4" />
              <span>Expand Guidelines</span>
            </button>
          </div>
        ))}
      </div>

      {/* DETAILED DISEASE POPUP OVERLAY */}
      {activeDisease && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative border border-slate-100">
            <button 
              onClick={() => setActiveDisease(null)}
              className="absolute top-5 right-5 p-2 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-900 rounded-full transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="p-6 md:p-8">
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-[10px] font-bold uppercase px-3 py-1 rounded-md border tracking-wide ${getRiskColor(activeDisease.riskLevel)}`}>
                  {activeDisease.riskLevel} Risk Level
                </span>
                <span className="text-xs text-slate-400 font-mono font-medium">• Guidelines</span>
              </div>

              <h3 className="font-display font-black text-slate-950 text-2xl tracking-tight mb-4">
                {activeDisease.name}
              </h3>

              <div className="space-y-6">
                <div>
                  <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Clinical Etiology</h5>
                  <p className="text-sm text-slate-700 leading-relaxed">{activeDisease.guideContent}</p>
                </div>

                <div>
                  <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Evidence-Based Prevention</h5>
                  <ul className="space-y-2">
                    {activeDisease.prevention.map((p, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed">
                        <span className="h-5 w-5 bg-teal-50 text-teal-600 rounded-md flex items-center justify-center font-bold font-mono text-[10px] shrink-0 mt-0.5">{i+1}</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 flex gap-3">
                  <ShieldAlert className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h6 className="text-xs font-bold text-amber-900 mb-0.5">When to seek professional diagnosis</h6>
                    <p className="text-xs text-amber-800 leading-relaxed">{activeDisease.whenToSeeDoctor}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border-t border-slate-100 p-5 flex justify-end">
              <button 
                onClick={() => setActiveDisease(null)}
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2.5 px-6 rounded-xl transition-colors cursor-pointer"
              >
                Close Guidelines
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
