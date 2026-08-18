"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Eye, ArrowRightLeft, AlertTriangle, Scale, Check } from "lucide-react";
import { Medicine } from "@/lib/types";
import { medicines } from "@/lib/data";

interface MedicineDatabaseProps {
  onSelectMedicine?: (id: string) => void;
  searchQuery?: string;
}

export default function MedicineDatabase({ onSelectMedicine, searchQuery = "" }: MedicineDatabaseProps) {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState(searchQuery || "");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [compareList, setCompareList] = useState<Medicine[]>([]);

  React.useEffect(() => {
    if (searchQuery) setSearchTerm(searchQuery);
  }, [searchQuery]);

  const handleSelect = (id: string) => {
    if (onSelectMedicine) {
      onSelectMedicine(id);
    } else {
      router.push(`/medicines/${id}`);
    }
  };

  const handleToggleCompare = (medicine: Medicine) => {
    if (compareList.some(item => item.id === medicine.id)) {
      setCompareList(compareList.filter(item => item.id !== medicine.id));
    } else {
      if (compareList.length >= 2) {
        alert("You can compare up to 2 drugs side-by-side.");
        return;
      }
      setCompareList([...compareList, medicine]);
    }
  };

  const types = ["All", "Analgesic / Anti-inflammatory", "Antihypertensive / ACE Inhibitor", "Antibiotic / Antibacterial"];
  const statuses = ["All", "Over-the-Counter (OTC)", "Rx - Prescription Required"];

  const filteredMedicines = medicines.filter(med => {
    const matchesSearch = med.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          med.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          med.brandNames.some(b => b.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = selectedType === "All" || med.type === selectedType;
    const matchesStatus = selectedStatus === "All" || med.prescriptionStatus === selectedStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6 w-full mx-auto py-4" id="medicine-search-section">
      {/* Search and Filters Header */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-5">
          <div>
            <span className="text-xs text-blue-600 font-bold font-mono uppercase tracking-widest flex items-center gap-1.5 mb-1">
              🧬 Clinical Drug Compendium
            </span>
            <h3 className="font-display font-bold text-slate-900 text-xl tracking-tight">Medicine Encyclopedia</h3>
            <p className="text-xs text-slate-400 mt-0.5">Explore active ingredients, prescription statuses, and compare safety guidelines.</p>
          </div>

          <div className="relative shrink-0 w-full md:w-80">
            <input
              type="text"
              placeholder="Search by brand name or chemical entity..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-4 pr-10 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-800 font-medium"
            />
            <Search className="absolute right-3.5 top-3 h-4 w-4 text-slate-400" />
          </div>
        </div>

        {/* Filter Badges Row */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase mr-2 tracking-wide">Category:</span>
            {types.map(t => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`text-xs px-3.5 py-1.5 rounded-full font-semibold border transition-all cursor-pointer ${
                  selectedType === t 
                    ? "bg-blue-600 border-blue-600 text-white shadow-sm" 
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {t === "All" ? "All Therapeutic Types" : t.split(" / ")[0]}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase mr-2 tracking-wide">Status:</span>
            {statuses.map(s => (
              <button
                key={s}
                onClick={() => setSelectedStatus(s)}
                className={`text-xs px-3.5 py-1.5 rounded-full font-semibold border transition-all cursor-pointer ${
                  selectedStatus === s 
                    ? "bg-blue-600 border-blue-600 text-white shadow-sm" 
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {s === "All" ? "All Distribution Channels" : s.split(" - ")[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMedicines.map(med => {
          const isComparing = compareList.some(item => item.id === med.id);
          return (
            <div 
              key={med.id} 
              className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div className="p-5">
                <div className="flex items-center justify-between gap-2 mb-3.5">
                  <span className={`text-[9px] font-bold uppercase px-2.5 py-1 rounded-md tracking-wider border ${
                    med.prescriptionStatus.includes("OTC") 
                      ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
                      : "bg-blue-50 text-blue-700 border-blue-100"
                  }`}>
                    {med.prescriptionStatus}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono font-medium">{med.type}</span>
                </div>

                <Link href={`/medicines/${med.id}`}>
                  <h4 className="font-display font-extrabold text-slate-900 text-base mb-1 group-hover:text-blue-600 transition-colors">
                    {med.name}
                  </h4>
                </Link>
                <p className="text-xs text-slate-400 font-medium italic mb-3">{med.genericName}</p>
                
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-4">{med.overview}</p>

                <div className="border-t border-slate-50 pt-3 mb-4">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Equivalent Brands:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {med.brandNames.map(b => (
                      <span key={b} className="text-[10px] font-mono bg-slate-50 text-slate-600 px-2 py-0.5 rounded-md border border-slate-100">
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-slate-50/50 border-t border-slate-50 p-4 flex gap-2">
                <button
                  onClick={() => handleSelect(med.id)}
                  className="flex-1 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-xs font-bold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Eye className="h-3.5 w-3.5 text-slate-500" />
                  <span>Clinical View</span>
                </button>
                <button
                  onClick={() => handleToggleCompare(med)}
                  className={`flex-1 text-xs font-bold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                    isComparing 
                      ? "bg-blue-50 text-blue-600 border-blue-200" 
                      : "bg-white hover:bg-slate-50 text-slate-700 border-slate-200"
                  }`}
                >
                  {isComparing ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-blue-600" />
                      <span>Comparing</span>
                    </>
                  ) : (
                    <>
                      <ArrowRightLeft className="h-3.5 w-3.5 text-slate-500" />
                      <span>Compare Drug</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}

        {filteredMedicines.length === 0 && (
          <div className="col-span-full bg-white border border-slate-100 rounded-2xl p-12 text-center text-slate-500">
            <p className="text-sm font-semibold">No medicines matched your clinical filter parameters.</p>
            <p className="text-xs text-slate-400 mt-1">Try resetting the search terms or look under general directories.</p>
          </div>
        )}
      </div>

      {/* DRUG COMPARISON PANEL */}
      {compareList.length > 0 && (
        <div className="bg-white border border-blue-100 rounded-3xl p-6 shadow-xl relative overflow-hidden mt-8" id="comparison-drawer">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-teal-400"></div>
          
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <Scale className="h-5 w-5 text-blue-600" />
              <div>
                <h4 className="font-display font-extrabold text-slate-900 text-sm">Active Drug Comparison Lab</h4>
                <p className="text-[11px] text-slate-400">Comparing active properties side-by-side</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-500">
                {compareList.length === 1 ? "Add 1 more drug to compare" : "2 of 2 selected"}
              </span>
              <button 
                onClick={() => setCompareList([])}
                className="text-xs text-slate-400 hover:text-slate-600 font-bold cursor-pointer"
              >
                Clear comparison
              </button>
            </div>
          </div>

          {compareList.length < 2 ? (
            <div className="py-6 text-center text-slate-400 border-2 border-dashed border-slate-100 rounded-2xl text-xs">
              Select another medicine from the encyclopedia to see the complete safety and warnings analysis side-by-side.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="py-3 px-4 font-bold text-slate-400 uppercase tracking-wider w-1/4">Metric</th>
                    {compareList.map(med => (
                      <th key={med.id} className="py-3 px-4 font-display font-extrabold text-blue-600 text-sm w-3/8">
                        {med.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  <tr>
                    <td className="py-3 px-4 font-semibold text-slate-500 bg-slate-50/50">Generic Class</td>
                    {compareList.map(med => (
                      <td key={med.id} className="py-3 px-4 text-slate-700 font-medium italic">{med.genericName}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-slate-500 bg-slate-50/50">Therapeutic Action</td>
                    {compareList.map(med => (
                      <td key={med.id} className="py-3 px-4 text-slate-700">{med.type}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-slate-500 bg-slate-50/50">Distribution Channel</td>
                    {compareList.map(med => (
                      <td key={med.id} className="py-3 px-4 text-slate-700 font-semibold">{med.prescriptionStatus}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-slate-500 bg-slate-50/50">Standard Dosing</td>
                    {compareList.map(med => (
                      <td key={med.id} className="py-3 px-4 text-slate-600 leading-relaxed">{med.dosage}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-slate-500 bg-slate-50/50">Critical Warnings</td>
                    {compareList.map(med => (
                      <td key={med.id} className="py-3 px-4 text-red-600 leading-relaxed font-medium">
                        <AlertTriangle className="h-3.5 w-3.5 inline mr-1 text-red-500" />
                        {med.warnings[0]}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-slate-500 bg-slate-50/50">Alcohol Interaction</td>
                    {compareList.map(med => (
                      <td key={med.id} className="py-3 px-4 text-amber-700 leading-relaxed font-medium">{med.alcoholInteraction}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-slate-500 bg-slate-50/50">Pregnancy Profile</td>
                    {compareList.map(med => (
                      <td key={med.id} className="py-3 px-4 text-slate-600 leading-relaxed">{med.pregnancy}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
