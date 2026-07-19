import React, { useState, useRef, useEffect } from "react";
import { Send, Sparkles, ShieldAlert, HeartHandshake, ArrowLeft, RefreshCw, MessageSquare } from "lucide-react";

interface AIAssistantProps {
  onBack: () => void;
}

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

export default function AIAssistant({ onBack }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial-1",
      sender: "ai",
      text: "Hello! I am AuraCare's verified AI Health Information Assistant. I can help answer questions about drugs, diseases, medical equipment specifications, first-aid tips, and general nutrition metrics.\n\n*What would you like to explore today?*",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend }),
      });

      const data = await response.json();
      
      const aiMessage: Message = {
        id: `msg-ai-${Date.now()}`,
        sender: "ai",
        text: data.text || "I was unable to retrieve a response from our medical knowledge database. Please verify your internet connection or check back later.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);
      const errorMessage: Message = {
        id: `msg-err-${Date.now()}`,
        sender: "ai",
        text: "We encountered a clinical connectivity timeout. Please ensure the dev server is active and the Gemini API key is configured correctly in Settings > Secrets.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const samplePrompts = [
    "What are the severe warnings of Ibuprofen?",
    "How do I clean my mesh nebulizer safely?",
    "Explain the triggers of Bronchial Asthma",
    "What is the difference between ApoB and standard LDL?"
  ];

  // Helper to parse Markdown/Text lines into styled HTML elements
  const renderMessageText = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, idx) => {
      let trimmed = line.trim();
      
      // Check for bullet list
      if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
        return (
          <li key={idx} className="ml-5 list-disc text-sm text-slate-700 leading-relaxed mb-1">
            {trimmed.substring(2)}
          </li>
        );
      }
      // Check for bold highlights
      if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
        return (
          <p key={idx} className="font-bold text-slate-900 mt-2 mb-1">
            {trimmed.replace(/\*\*/g, "")}
          </p>
        );
      }
      // Check for headers
      if (trimmed.startsWith("###")) {
        return (
          <h4 key={idx} className="font-display font-bold text-slate-900 text-sm mt-3 mb-1 tracking-tight">
            {trimmed.replace(/###/g, "").trim()}
          </h4>
        );
      }
      
      // Simple word-by-word bold highlighting inside a normal paragraph
      if (trimmed) {
        return (
          <p key={idx} className="text-sm text-slate-700 leading-relaxed mb-2.5">
            {line.split(" ").map((word, wordIdx) => {
              if (word.startsWith("**") && word.endsWith("**")) {
                return <strong key={wordIdx} className="font-semibold text-slate-950">{word.replace(/\*\*/g, "")} </strong>;
              }
              if (word.startsWith("*") && word.endsWith("*")) {
                return <em key={wordIdx} className="italic text-slate-800">{word.replace(/\*/g, "")} </em>;
              }
              return word + " ";
            })}
          </p>
        );
      }
      return <div key={idx} className="h-2" />;
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white border border-slate-100 rounded-3xl shadow-xl overflow-hidden flex flex-col h-[750px]" id="ai-assistant-stage">
      {/* Assistant Header */}
      <div className="bg-slate-950 p-6 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
            title="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-500 to-teal-400 flex items-center justify-center text-white">
            <Sparkles className="h-5 w-5 fill-white" />
          </div>
          <div>
            <h3 className="font-display font-bold text-base tracking-tight flex items-center gap-2">
              AuraCare Clinical AI
              <span className="text-[10px] bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded-full font-mono">3.5-Flash</span>
            </h3>
            <p className="text-xs text-slate-400">Expert medical context engine</p>
          </div>
        </div>
        
        <button 
          onClick={() => setMessages([{
            id: "initial-1",
            sender: "ai",
            text: "Hello! I am AuraCare's verified AI Health Information Assistant. I can help answer questions about drugs, diseases, medical equipment specifications, first-aid tips, and general nutrition metrics.\n\n*What would you like to explore today?*",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }])}
          className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-all cursor-pointer text-xs flex items-center gap-1 font-medium"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Clear chat</span>
        </button>
      </div>

      {/* Safety Disclaimer */}
      <div className="bg-amber-50/70 border-b border-amber-100 p-4 px-6 flex gap-3">
        <ShieldAlert className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-800 leading-relaxed">
          <span className="font-bold">Clinical Information Disclaimer:</span> AuraCare AI Assistant answers are for informational, educational purposes based on general medical guidelines. This agent does not provide personalized clinical diagnoses, prescription advice, or direct treatment plans. Always consult your primary care doctor or professional clinician for personal health concerns.
        </div>
      </div>

      {/* Message Stage */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex gap-3 max-w-[85%] ${msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
          >
            {msg.sender === "ai" ? (
              <div className="h-8 w-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs shrink-0 border border-blue-100">
                AI
              </div>
            ) : (
              <div className="h-8 w-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
                U
              </div>
            )}
            <div>
              <div 
                className={`p-4 rounded-2xl border text-sm ${
                  msg.sender === "user" 
                    ? "bg-blue-600 border-blue-700 text-white rounded-tr-none" 
                    : "bg-white border-slate-100 text-slate-800 shadow-sm rounded-tl-none"
                }`}
              >
                {msg.sender === "user" ? (
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                ) : (
                  <div>{renderMessageText(msg.text)}</div>
                )}
              </div>
              <span className="text-[10px] text-slate-400 font-mono mt-1 block px-1">
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 mr-auto max-w-[80%]">
            <div className="h-8 w-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs shrink-0 border border-blue-100 animate-pulse">
              AI
            </div>
            <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">Querying AuraCare database...</span>
              <div className="flex gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-bounce delay-75"></span>
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-bounce delay-150"></span>
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-bounce delay-220"></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Chips (Only shown when chat is quiet) */}
      {messages.length === 1 && (
        <div className="p-6 bg-white border-t border-slate-100/60">
          <p className="text-xs text-slate-400 font-mono uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <MessageSquare className="h-3.5 w-3.5" />
            <span>Suggested Medical Prompts</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {samplePrompts.map((p, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(p)}
                className="text-xs text-slate-600 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 border border-slate-200 px-3.5 py-2 rounded-full transition-all text-left cursor-pointer font-medium"
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Tray */}
      <div className="p-4 bg-white border-t border-slate-100 flex gap-2">
        <input 
          type="text"
          placeholder="Ask about symptoms, drug dosages, interactions, or equipment specifications..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage(inputValue)}
          className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-800"
          disabled={isLoading}
        />
        <button 
          onClick={() => handleSendMessage(inputValue)}
          disabled={isLoading || !inputValue.trim()}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 text-white p-3 rounded-xl transition-colors cursor-pointer shrink-0"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
