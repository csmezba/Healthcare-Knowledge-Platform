"use client";

import React, { useState } from "react";
import { Star, Shield, Eye, RefreshCw, Sparkles, X, Check } from "lucide-react";
import { Equipment } from "@/lib/types";
import { medicalEquipment } from "@/lib/data";

export default function MedicalEquipment() {
  const [activeEquipment, setActiveEquipment] = useState<Equipment | null>(null);
  const [selectedRange, setSelectedRange] = useState<string>("All");

  const filteredEquipment = medicalEquipment.filter(item => {
    return selectedRange === "All" || item.priceRange === selectedRange;
  });

  return (
    <div className="space-y-6 w-full mx-auto py-4" id="equipment-showcase">
      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs text-indigo-600 font-bold font-mono uppercase tracking-widest flex items-center gap-1.5 mb-1">
            🩻 Diagnostic Hardware
          </span>
          <h3 className="font-display font-bold text-slate-900 text-xl tracking-tight">Medical Equipment Showcase</h3>
          <p className="text-xs text-slate-400 mt-0.5">Explore standard diagnostic and respiratory wellness devices with verified clinical specifications.</p>
        </div>

        {/* Price filter */}
        <div className="flex bg-slate-50 p-1.5 rounded-xl border border-slate-200 shrink-0 self-start md:self-auto">
          {["All", "Mid-range", "Premium"].map(tier => (
            <button
              key={tier}
              onClick={() => setSelectedRange(tier)}
              className={`text-xs font-bold px-4 py-2 rounded-lg transition-all cursor-pointer ${
                selectedRange === tier ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {tier === "All" ? "All Price Ranges" : tier}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEquipment.map(item => (
          <div 
            key={item.id}
            className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all p-6 flex flex-col justify-between"
          >
            <div>
              {/* Category and ratings */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-[10px] text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-md font-bold uppercase tracking-wide">
                  {item.category}
                </span>
                
                <div className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-bold text-slate-800">{item.rating}</span>
                  <span className="text-[10px] text-slate-400 font-medium">({item.reviewsCount} reviews)</span>
                </div>
              </div>

              <h4 className="font-display font-extrabold text-slate-900 text-base mb-1.5">{item.name}</h4>
              <p className="text-xs text-slate-400 font-mono font-medium mb-4">Tier: <span className="text-indigo-600 font-bold">{item.priceRange}</span></p>

              {/* Specs previews */}
              <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-100/60 mb-5">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Clinical Metrics Checklist:</span>
                <div className="space-y-1.5">
                  {item.specs.slice(0, 3).map((spec, i) => (
                    <div key={i} className="flex justify-between items-center text-xs">
                      <span className="text-slate-500 font-medium">{spec.label}</span>
                      <span className="text-slate-800 font-mono font-semibold text-[11px]">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div className="space-y-2 mb-6">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Key Advantages:</span>
                <div className="space-y-1">
                  {item.benefits.slice(0, 2).map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed">
                      <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveEquipment(item)}
              className="w-full bg-slate-900 hover:bg-indigo-600 text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Eye className="h-4 w-4" />
              <span>Diagnostic Details & Manual</span>
            </button>
          </div>
        ))}
      </div>

      {/* DETAILED MEDICAL EQUIPMENT POPUP */}
      {activeEquipment && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative border border-slate-100">
            <button 
              onClick={() => setActiveEquipment(null)}
              className="absolute top-5 right-5 p-2 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-900 rounded-full transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-md font-bold uppercase tracking-wide">
                  {activeEquipment.category}
                </span>
                <span className="text-xs text-slate-400 font-mono font-medium">Verified Specifications</span>
              </div>

              <h3 className="font-display font-black text-slate-950 text-xl tracking-tight mb-4">
                {activeEquipment.name}
              </h3>

              <div className="space-y-6">
                <div>
                  <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Technical Specifications</h5>
                  <div className="bg-slate-50 rounded-2xl border border-slate-100 divide-y divide-slate-100 overflow-hidden">
                    {activeEquipment.specs.map((spec, i) => (
                      <div key={i} className="flex justify-between items-center text-xs p-3 px-4">
                        <span className="text-slate-500 font-medium">{spec.label}</span>
                        <span className="text-slate-800 font-mono font-semibold">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Primary Advantages</h5>
                  <div className="space-y-2">
                    {activeEquipment.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed">
                        <Check className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Aseptic Operating Checklist</h5>
                  <ol className="space-y-2 bg-blue-50/30 p-4 rounded-2xl border border-blue-50">
                    {activeEquipment.usageGuide.map((step, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                        <span className="font-mono font-extrabold text-blue-600 shrink-0">{i+1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <h6 className="text-xs font-bold text-slate-900 mb-1 flex items-center gap-1">
                      <RefreshCw className="h-3.5 w-3.5 text-indigo-500" />
                      <span>Maintenance Protocol</span>
                    </h6>
                    <p className="text-[11px] text-slate-600 leading-relaxed">{activeEquipment.maintenance}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <h6 className="text-xs font-bold text-slate-900 mb-1 flex items-center gap-1">
                      <Shield className="h-3.5 w-3.5 text-indigo-500" />
                      <span>Aseptic Cleaning</span>
                    </h6>
                    <p className="text-[11px] text-slate-600 leading-relaxed">{activeEquipment.cleaning}</p>
                  </div>
                </div>

                <div className="p-4 bg-indigo-50/50 border border-indigo-100 rounded-2xl">
                  <h6 className="text-xs font-bold text-indigo-950 mb-1 flex items-center gap-1.5 font-display">
                    <Sparkles className="h-4 w-4 fill-indigo-600 text-indigo-200" />
                    <span>Clinical Buying Guidance</span>
                  </h6>
                  <p className="text-xs text-indigo-900 leading-relaxed">{activeEquipment.buyingGuide}</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border-t border-slate-100 p-5 flex justify-end">
              <button 
                onClick={() => setActiveEquipment(null)}
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2.5 px-6 rounded-xl transition-colors cursor-pointer"
              >
                Close Specifications
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
