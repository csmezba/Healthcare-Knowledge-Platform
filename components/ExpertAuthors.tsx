"use client";

import React from "react";
import { Check, Mail, Linkedin, Twitter, Award } from "lucide-react";
import { authors } from "@/lib/data";

export default function ExpertAuthors() {
  const authorList = Object.values(authors);

  return (
    <div className="space-y-6 w-full mx-auto py-4" id="expert-authors">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-5">
        <div>
          <span className="text-xs text-blue-600 font-bold font-mono uppercase tracking-widest flex items-center gap-1.5 mb-1.5">
            <Award className="h-4 w-4" />
            <span>Verified Board certification</span>
          </span>
          <h3 className="font-display font-black text-slate-950 text-2xl tracking-tight">Medical Advisory Board</h3>
          <p className="text-sm text-slate-500 font-medium">Meet the certified clinicians, pharmacists, and nutritionists who author and review our guidelines.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {authorList.map(author => (
          <div 
            key={author.id}
            className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row gap-5 items-start"
          >
            {/* Avatar Column */}
            <div className="relative shrink-0 mx-auto md:mx-0">
              <img 
                src={author.avatar} 
                alt={author.name} 
                className="h-24 w-24 rounded-2xl object-cover border border-slate-100 shadow-sm"
                referrerPolicy="no-referrer"
              />
              <span className="absolute -bottom-1.5 -right-1.5 h-6 w-6 bg-emerald-500 text-white rounded-full flex items-center justify-center border-2 border-white shadow-sm" title="Verified Professional Credential">
                <Check className="h-3.5 w-3.5 stroke-[3]" />
              </span>
            </div>

            {/* Bios and Details */}
            <div className="flex-1 space-y-3 text-center md:text-left">
              <div>
                <h4 className="font-display font-black text-slate-950 text-base flex flex-col md:flex-row md:items-center gap-1.5 justify-center md:justify-start">
                  <span>{author.name}</span>
                </h4>
                <p className="text-xs text-blue-600 font-bold mt-0.5">{author.role}</p>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                {author.bio}
              </p>

              {/* Expertise chips */}
              <div className="space-y-1">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Clinical Expertise:</span>
                <div className="flex flex-wrap justify-center md:justify-start gap-1">
                  {author.expertise.map(chip => (
                    <span key={chip} className="text-[10px] bg-slate-50 text-slate-600 px-2.5 py-0.5 rounded-md border border-slate-100 font-semibold">
                      {chip}
                    </span>
                  ))}
                </div>
              </div>

              {/* Social connect handles */}
              <div className="flex items-center justify-center md:justify-start gap-3 pt-2 text-slate-400 border-t border-slate-50">
                {author.social.linkedin && (
                  <a href={`https://${author.social.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors" title="Clinical LinkedIn Profile">
                    <Linkedin className="h-4.5 w-4.5" />
                  </a>
                )}
                {author.social.twitter && (
                  <a href={`https://twitter.com/${author.social.twitter}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors" title="Medical Twitter Stream">
                    <Twitter className="h-4.5 w-4.5" />
                  </a>
                )}
                {author.social.email && (
                  <a href={`mailto:${author.social.email}`} className="hover:text-blue-600 transition-colors" title="Contact Clinician">
                    <Mail className="h-4.5 w-4.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
