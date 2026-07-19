import React, { useState, useEffect } from "react";
import { ArrowLeft, Play, Pause, Bookmark, Share2, Volume2, Calendar, FileText, ChevronRight, User, ThumbsUp, MessageSquare, Check, ShieldAlert } from "lucide-react";
import { Article } from "../types";

interface ArticleDetailPageProps {
  article: Article;
  onBack: () => void;
  onNavigate: (view: string, id?: string) => void;
}

export default function ArticleDetailPage({ article, onBack, onNavigate }: ArticleDetailPageProps) {
  const [textSize, setTextSize] = useState<"sm" | "md" | "lg">("md");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(article.likes);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Speech TTS states
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechUtterance, setSpeechUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  // Comments state
  const [comments, setComments] = useState<{ name: string; text: string; date: string }[]>([
    { name: "Robert K.", text: "This cardiovascular breakdown of Zone 2 cardio was extremely precise. I've shared this with my father who suffers from high ApoB.", date: "July 16, 2026" },
    { name: "Sarah Miller", text: "Dr. Jenkins writes with wonderful empathy. The section on soluble fiber binding bile acids is brilliant.", date: "July 16, 2026" }
  ]);
  const [newCommentName, setNewCommentName] = useState("");
  const [newCommentText, setNewCommentText] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Set up Speech Synthesis Utterance
  useEffect(() => {
    if ("speechSynthesis" in window) {
      // Clean up any ongoing speech when switching articles
      window.speechSynthesis.cancel();
      
      const textToRead = `${article.title}. Written by ${article.author.name}. ${article.summary}. ${article.content.replace(/[#*]/g, "")}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      setSpeechUtterance(utterance);
    }
    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [article]);

  const handleSpeakToggle = () => {
    if (!speechUtterance || !("speechSynthesis" in window)) {
      alert("Text-to-Speech is not supported on this device/environment.");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.pause();
      setIsSpeaking(false);
    } else {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      } else {
        window.speechSynthesis.speak(speechUtterance);
      }
      setIsSpeaking(true);
    }
  };

  const handleLike = () => {
    if (isLiked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCommentName.trim() && newCommentText.trim()) {
      setComments([
        ...comments,
        {
          name: newCommentName,
          text: newCommentText,
          date: "Just now"
        }
      ]);
      setNewCommentName("");
      setNewCommentText("");
    }
  };

  const getTextSizeClass = () => {
    switch (textSize) {
      case "sm": return "text-xs md:text-sm";
      case "md": return "text-sm md:text-base";
      case "lg": return "text-base md:text-lg";
    }
  };

  return (
    <article className="space-y-8" id="article-detail-page">
      {/* Scroll Progress Indicator */}
      <div className="fixed top-[104px] left-0 w-full h-1 bg-slate-100 z-50">
        <div 
          className="h-full bg-blue-600 transition-all duration-75" 
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-1.5 text-slate-500 hover:text-slate-900 font-sans font-semibold text-xs cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Insights</span>
        </button>

        <div className="flex items-center gap-1.5">
          <span className="text-slate-400 text-xs font-mono">{article.category}</span>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <span className="text-slate-900 text-xs font-bold truncate max-w-40">{article.title}</span>
        </div>
      </div>

      {/* Article Header and Image */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-3 py-1 rounded-full border border-blue-100">
            {article.category}
          </span>
          <span className="text-xs text-slate-400 font-mono">• Published {article.date}</span>
          <span className="text-xs text-slate-400 font-mono">• {article.readTime}</span>
        </div>

        <h1 className="font-display font-black text-2xl md:text-4xl text-slate-950 tracking-tight leading-tight">
          {article.title}
        </h1>

        <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium border-l-2 border-blue-500 pl-4 py-1 italic">
          {article.summary}
        </p>

        {/* Featured Image */}
        <div className="w-full h-64 md:h-[400px] rounded-3xl overflow-hidden shadow-md">
          <img 
            src={article.image} 
            alt={article.title} 
            className="w-full h-full object-cover referrerPolicy='no-referrer'"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Multi-column layout with Sticky table of contents and main text */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Author and Reviewer credentials & TTS widget */}
        <div className="lg:col-span-3 space-y-6 lg:sticky lg:top-32">
          
          {/* Author info */}
          <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm text-center lg:text-left space-y-3">
            <div className="flex justify-center lg:justify-start">
              <img 
                src={article.author.avatar} 
                alt={article.author.name} 
                className="h-16 w-16 rounded-xl object-cover border border-slate-100 shadow-sm referrerPolicy='no-referrer'"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Written by:</span>
              <p className="font-display font-bold text-slate-900 text-sm">{article.author.name}</p>
              <p className="text-[10px] text-blue-600 font-semibold">{article.author.role}</p>
            </div>
          </div>

          {/* Medical Reviewer stamp */}
          {article.medicalReviewer && (
            <div className="bg-emerald-50/50 border border-emerald-100 p-4 rounded-2xl text-center lg:text-left space-y-2">
              <div className="flex items-center gap-1.5 justify-center lg:justify-start text-emerald-800 text-[10px] font-bold uppercase tracking-wider">
                <Check className="h-4 w-4 text-emerald-600 stroke-[3]" />
                <span>Reviewed clinically</span>
              </div>
              <p className="font-display font-bold text-slate-900 text-xs">{article.medicalReviewer.name}</p>
              <p className="text-[10px] text-slate-500">{article.medicalReviewer.role}</p>
            </div>
          )}

          {/* TTS Player Widget */}
          <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-2xl space-y-3">
            <div className="flex items-center gap-2">
              <Volume2 className="h-4.5 w-4.5 text-blue-600" />
              <span className="text-xs font-bold text-slate-900">Audio Narration</span>
            </div>
            
            <p className="text-[10px] text-slate-400">Listen to this guideline voiced by our automated clinical narrator.</p>

            <button 
              onClick={handleSpeakToggle}
              className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                isSpeaking 
                  ? "bg-amber-600 text-white shadow-sm" 
                  : "bg-blue-600 text-white shadow-md shadow-blue-100 hover:bg-blue-700"
              }`}
            >
              {isSpeaking ? (
                <>
                  <Pause className="h-3.5 w-3.5 fill-white" />
                  <span>Pause Reading</span>
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5 fill-white" />
                  <span>Listen to Article</span>
                </>
              )}
            </button>
          </div>

          {/* Table of contents */}
          <div className="hidden lg:block space-y-2 pt-2 border-t border-slate-100">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">On this page:</span>
            <div className="flex flex-col gap-2 font-medium text-xs text-slate-500">
              {article.tableOfContents.map((toc) => (
                <a 
                  key={toc.id} 
                  href={`#${toc.id}`}
                  className="hover:text-blue-600 transition-colors py-0.5 truncate border-l border-slate-200 pl-2.5 hover:border-blue-500"
                >
                  {toc.label}
                </a>
              ))}
              <a href="#clinical-faqs" className="hover:text-blue-600 transition-colors py-0.5 truncate border-l border-slate-200 pl-2.5 hover:border-blue-500">
                5. Clinical FAQs
              </a>
              <a href="#references" className="hover:text-blue-600 transition-colors py-0.5 truncate border-l border-slate-200 pl-2.5 hover:border-blue-500">
                6. Peer References
              </a>
            </div>
          </div>

        </div>

        {/* Main Article Content & Interactive Controls */}
        <div className="lg:col-span-9 space-y-8">
          
          {/* Sizing & Bookmark Tools */}
          <div className="bg-slate-50 rounded-2xl p-4 flex items-center justify-between border border-slate-100">
            {/* Text size adjuster */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">Text Size:</span>
              <div className="flex bg-white p-1 rounded-lg border border-slate-200">
                {(["sm", "md", "lg"] as const).map(size => (
                  <button
                    key={size}
                    onClick={() => setTextSize(size)}
                    className={`text-xs px-2.5 py-1 rounded font-bold uppercase transition-all cursor-pointer ${
                      textSize === size ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Bookmark & Likes */}
            <div className="flex items-center gap-3">
              <button 
                onClick={handleLike}
                className={`p-2 rounded-xl border flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
                  isLiked 
                    ? "bg-red-50 border-red-200 text-red-600" 
                    : "bg-white border-slate-200 text-slate-500 hover:text-slate-800"
                }`}
              >
                <ThumbsUp className={`h-4 w-4 ${isLiked ? "fill-red-500" : ""}`} />
                <span>{likesCount}</span>
              </button>

              <button 
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-2 rounded-xl border transition-all cursor-pointer ${
                  isBookmarked 
                    ? "bg-blue-50 border-blue-200 text-blue-600" 
                    : "bg-white border-slate-200 text-slate-400 hover:text-slate-800"
                }`}
                title="Bookmark article"
              >
                <Bookmark className={`h-4.5 w-4.5 ${isBookmarked ? "fill-blue-600 text-blue-600" : ""}`} />
              </button>
            </div>
          </div>

          {/* Safety Warning Header */}
          <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex gap-3">
            <ShieldAlert className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-800 leading-relaxed">
              <span className="font-bold">Medical Disclaimer:</span> This long-form publication serves as clinical reference context only. It is not an active diagnoses recommendation or single prescription protocol. Always consult with your cardiorespiratory or primary physician prior to initiating high-impact dietary or exercise adjustments.
            </div>
          </div>

          {/* Markdown-like Article Body */}
          <div className={`markdown-body ${getTextSizeClass()}`}>
            {article.content.split("\n\n").map((para, i) => {
              // Parse headers or lists inside
              if (para.startsWith("###")) {
                const headerText = para.replace(/###/g, "").trim();
                return <h2 key={i} className="font-display font-black text-xl text-slate-900 tracking-tight mt-6 mb-3">{headerText}</h2>;
              }
              if (para.startsWith("* ") || para.startsWith("- ")) {
                return (
                  <ul key={i} className="list-disc pl-5 mb-4 space-y-1">
                    {para.split("\n").map((li, idx) => (
                      <li key={idx} className="text-slate-700 leading-relaxed">
                        {li.replace(/^[*-\s]+/, "")}
                      </li>
                    ))}
                  </ul>
                );
              }
              if (para.startsWith("1. ") || para.startsWith("2. ")) {
                return (
                  <ol key={i} className="list-decimal pl-5 mb-4 space-y-1">
                    {para.split("\n").map((li, idx) => (
                      <li key={idx} className="text-slate-700 leading-relaxed">
                        {li.replace(/^\d+[.\s]+/, "")}
                      </li>
                    ))}
                  </ol>
                );
              }
              return <p key={i} className="leading-relaxed text-slate-700 mb-4">{para}</p>;
            })}
          </div>

          {/* Section: Accordion FAQs */}
          <div className="pt-6 border-t border-slate-100" id="clinical-faqs">
            <h4 className="font-display font-bold text-slate-900 text-base mb-4 flex items-center gap-1.5">
              <span>5. Verified Clinical FAQs</span>
            </h4>
            <div className="space-y-3">
              {article.faqs.map((faq, i) => (
                <div key={i} className="bg-slate-50 border border-slate-100 p-4 rounded-2xl">
                  <h5 className="font-display font-bold text-slate-900 text-xs mb-1.5 flex items-start gap-2">
                    <span className="text-blue-600 font-mono">Q:</span>
                    <span>{faq.question}</span>
                  </h5>
                  <p className="text-xs text-slate-600 leading-relaxed pl-5">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section: peer references */}
          <div className="pt-6 border-t border-slate-100" id="references">
            <h4 className="font-display font-bold text-slate-400 uppercase tracking-widest text-[10px] mb-3">
              6. Peer-Reviewed Citations & References
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-500 leading-relaxed font-mono">
              {article.references.map((ref) => (
                <li key={ref.id} className="flex gap-2">
                  <span className="text-blue-500 font-bold">[{ref.id}]</span>
                  <span>{ref.citation}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Comment System */}
          <div className="pt-8 border-t border-slate-100 space-y-6">
            <h4 className="font-display font-bold text-slate-950 text-base flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-blue-600" />
              <span>Patient Community Feedback</span>
            </h4>

            {/* Display comments */}
            <div className="space-y-4">
              {comments.map((cmt, idx) => (
                <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">{cmt.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{cmt.date}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{cmt.text}</p>
                </div>
              ))}
            </div>

            {/* Add Comment form */}
            <form onSubmit={handleAddComment} className="bg-slate-50 p-4 rounded-3xl border border-slate-100 space-y-3">
              <span className="text-xs font-bold text-slate-900 block">Submit Feedback Comment</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input 
                  type="text" 
                  placeholder="Your name or initials..."
                  value={newCommentName}
                  onChange={(e) => setNewCommentName(e.target.value)}
                  className="bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 font-semibold"
                  required
                />
              </div>
              <textarea 
                placeholder="Share your thoughts or clinical response..."
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                rows={3}
                className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
                required
              ></textarea>
              <button 
                type="submit"
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2 px-5 rounded-xl transition-colors cursor-pointer"
              >
                Post Comment
              </button>
            </form>
          </div>

        </div>

      </div>
    </article>
  );
}
