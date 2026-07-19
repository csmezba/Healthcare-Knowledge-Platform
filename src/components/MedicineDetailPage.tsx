import React from "react";
import { ArrowLeft, ShieldAlert, Heart, Calendar, BookOpen, Clock, AlertTriangle, AlertCircle, Info, Check } from "lucide-react";
import { Medicine } from "../types";

interface MedicineDetailPageProps {
  medicine: Medicine;
  onBack: () => void;
}

export default function MedicineDetailPage({ medicine, onBack }: MedicineDetailPageProps) {
  return (
    <div className="space-y-8" id="medicine-detail-page">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-1.5 text-slate-500 hover:text-slate-900 font-sans font-semibold text-xs cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Encyclopedia</span>
        </button>

        <span className="text-[10px] text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-md font-bold uppercase tracking-wide">
          {medicine.prescriptionStatus}
        </span>
      </div>

      {/* Drug Hero Header */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row gap-6 items-center">
        <div className="w-full md:w-48 h-48 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 flex items-center justify-center p-4 shadow-inner shrink-0">
          <img 
            src={medicine.image} 
            alt={medicine.name} 
            className="h-full w-full object-contain mix-blend-multiply rounded-xl referrerPolicy='no-referrer'"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex-1 space-y-3 text-center md:text-left">
          <div>
            <h1 className="font-display font-black text-slate-950 text-2xl md:text-3xl tracking-tight">
              {medicine.name}
            </h1>
            <p className="text-xs text-blue-600 font-bold mt-1 font-mono tracking-wide">{medicine.genericName}</p>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed font-medium">
            {medicine.overview}
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-1.5 pt-1">
            {medicine.brandNames.map(b => (
              <span key={b} className="text-[10px] bg-slate-100 text-slate-700 px-3 py-1 rounded-full border border-slate-200/60 font-bold">
                Brand: {b}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Uses, Dosage, Administration */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Approved Uses */}
          <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm space-y-4">
            <h3 className="font-display font-bold text-slate-950 text-base flex items-center gap-2">
              <Check className="h-5 w-5 text-emerald-500 stroke-[3]" />
              <span>Approved Clinical Indications</span>
            </h3>
            <ul className="space-y-2.5 pl-1">
              {medicine.uses.map((use, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-700 leading-relaxed">
                  <span className="h-5 w-5 bg-emerald-50 text-emerald-600 rounded-md flex items-center justify-center font-bold font-mono text-[10px] shrink-0 mt-0.5">✓</span>
                  <span>{use}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Dosing Guidelines */}
          <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm space-y-4">
            <h3 className="font-display font-bold text-slate-950 text-base flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              <span>Standard Dosing Reference</span>
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 font-medium">
              {medicine.dosage}
            </p>
            <div className="p-3 bg-blue-50/40 rounded-xl border border-blue-50 flex gap-2">
              <Info className="h-4.5 w-4.5 text-blue-500 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-600 leading-relaxed">Dosing adjustments are routinely made based on renal clearance, pediatric weight scales, or compound therapeutic response targets.</p>
            </div>
          </div>

          {/* Administration Guidelines */}
          <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm space-y-4">
            <h3 className="font-display font-bold text-slate-950 text-base flex items-center gap-2">
              <Clock className="h-5 w-5 text-slate-500" />
              <span>Administration Protocols</span>
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              {medicine.administration}
            </p>
          </div>

          {/* Side Effects Matrix */}
          <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm space-y-4">
            <h3 className="font-display font-bold text-slate-950 text-base flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              <span>Adverse Reactions Matrix</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {medicine.sideEffects.map((side, i) => (
                <div key={i} className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex justify-between items-center">
                  <span className="text-xs text-slate-800 font-bold">{side.symptom}</span>
                  <span className={`text-[9px] font-bold uppercase px-2.5 py-0.5 rounded-full border ${
                    side.severity === "Severe" ? "bg-red-50 text-red-700 border-red-100" :
                    side.severity === "Rare" ? "bg-amber-50 text-amber-700 border-amber-100" :
                    "bg-slate-100 text-slate-600 border-slate-200"
                  }`}>
                    {side.severity}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Side: Warnings and Demographic Advisory */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Black Box Warnings */}
          <div className="bg-red-50 border border-red-100 p-5 rounded-3xl space-y-3.5">
            <h4 className="font-display font-bold text-red-950 text-sm flex items-center gap-1.5">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <span>Critical Safety Warnings</span>
            </h4>
            <div className="space-y-3 text-xs text-red-900 leading-relaxed font-medium">
              {medicine.warnings.map((warn, idx) => (
                <p key={idx} className="bg-white/80 border border-red-100 p-3 rounded-xl shadow-sm">
                  {warn}
                </p>
              ))}
            </div>
          </div>

          {/* Demographic Advisories */}
          <div className="bg-white border border-slate-100 p-5 rounded-3xl space-y-4 shadow-sm">
            <h4 className="font-display font-extrabold text-slate-950 text-sm border-b border-slate-50 pb-2.5">
              Demographic Advisories
            </h4>

            <div className="space-y-3 text-xs leading-relaxed">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100/60">
                <span className="font-bold text-slate-900 block mb-0.5">Pregnancy & Lactation</span>
                <p className="text-slate-600">{medicine.pregnancy}</p>
                <p className="text-slate-600 mt-1.5 border-t border-slate-200/50 pt-1">{medicine.breastfeeding}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100/60">
                <span className="font-bold text-slate-900 block mb-0.5">Pediatric Considerations</span>
                <p className="text-slate-600">{medicine.children}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100/60">
                <span className="font-bold text-slate-900 block mb-0.5">Geriatric Use</span>
                <p className="text-slate-600">{medicine.elderly}</p>
              </div>
            </div>
          </div>

          {/* Drug Interactions */}
          <div className="bg-white border border-slate-100 p-5 rounded-3xl space-y-4 shadow-sm">
            <h4 className="font-display font-extrabold text-slate-950 text-sm border-b border-slate-50 pb-2.5">
              Active Interactions
            </h4>
            
            <div className="space-y-3 text-xs leading-relaxed">
              <div>
                <span className="font-bold text-amber-700 block mb-0.5">Drug-Drug Interactions</span>
                <div className="space-y-1 mt-1">
                  {medicine.drugInteractions.map((i, idx) => (
                    <div key={idx} className="bg-amber-50/50 p-2 rounded-lg border border-amber-50 text-slate-700">
                      • {i}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-900 block mb-0.5">Food Interaction</span>
                <p className="text-slate-600">{medicine.foodInteractions[0]}</p>
              </div>

              <div>
                <span className="font-bold text-rose-700 block mb-0.5">Alcohol Interaction</span>
                <p className="text-rose-950 bg-rose-50/50 border border-rose-50 p-2 rounded-lg font-medium">{medicine.alcoholInteraction}</p>
              </div>
            </div>
          </div>

          {/* Storage & Dispersal */}
          <div className="bg-slate-50 border border-slate-100 p-5 rounded-3xl text-xs leading-relaxed">
            <span className="font-bold text-slate-900 block mb-1">Clinical Storage Protocols</span>
            <p className="text-slate-600">{medicine.storage}</p>
          </div>

        </div>

      </div>
    </div>
  );
}
