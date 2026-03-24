"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Sparkles, ArrowRight } from "lucide-react";

interface EssayModeProps {
  originalWord: string;
  synonym: string;
  category: "Academic" | "Professional" | "Standard";
}

export function EssayMode({ originalWord, synonym, category }: EssayModeProps) {
  // Formatted sample sentence
  const sampleSentence = `The committee must __[WORD]__ the new policy before it takes effect.`;
  
  const renderSentence = (word: string, highlightClass: string) => {
    const parts = sampleSentence.split("__[WORD]__");
    return (
      <>
        {parts[0]}
        <span className={`font-bold px-1.5 py-0.5 rounded transition-all inline-block ${highlightClass}`}>
          {word}
        </span>
        {parts[1]}
      </>
    );
  };

  return (
    <Dialog>
      {/* @ts-expect-error - Radix UI type mismatch */}
      <DialogTrigger asChild>
        <button className="text-[10px] font-bold uppercase tracking-wider bg-indigo-100 hover:bg-indigo-200 text-indigo-700 dark:bg-indigo-900/40 dark:hover:bg-indigo-900/80 dark:text-indigo-300 px-2 py-1 rounded inline-flex items-center gap-1 transition-colors group ml-2 border border-indigo-200 dark:border-indigo-800">
          <Sparkles className="w-3 h-3 group-hover:animate-pulse text-indigo-500" />
          Essay Mode
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-slate-200 dark:border-slate-800 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2 text-slate-900 dark:text-slate-100">
            <Sparkles className="w-5 h-5 text-indigo-500" />
            Elevate Your Tone
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 pt-4">
          <div className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-slate-300 dark:bg-slate-700"></div>
            <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3 pl-2">Standard Delivery</h4>
            <p className="text-slate-700 dark:text-slate-300 pl-2 leading-relaxed text-lg">
              {renderSentence(originalWord, "text-slate-900 dark:text-slate-100 bg-slate-200 dark:bg-slate-800")}
            </p>
          </div>
          
          <div className="flex justify-center -my-2 relative z-10">
            <div className="bg-white dark:bg-slate-950 p-2 rounded-full border border-slate-100 dark:border-slate-800 shadow-sm">
              <ArrowRight className="w-5 h-5 text-slate-400 rotate-90" />
            </div>
          </div>
          
          <div className="bg-indigo-50 dark:bg-indigo-900/10 p-5 rounded-2xl border border-indigo-100 dark:border-indigo-900/20 shadow-sm relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-1 h-full ${category === 'Academic' ? 'bg-purple-500' : 'bg-emerald-500'}`}></div>
            <h4 className={`text-xs font-bold uppercase tracking-widest mb-3 pl-2 flex items-center gap-2 ${category === 'Academic' ? 'text-purple-700 dark:text-purple-400' : 'text-emerald-700 dark:text-emerald-400'}`}>
              {category} Delivery
              <span className="flex h-2 w-2 relative">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${category === 'Academic' ? 'bg-purple-400' : 'bg-emerald-400'}`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${category === 'Academic' ? 'bg-purple-500' : 'bg-emerald-500'}`}></span>
              </span>
            </h4>
            <p className="text-slate-900 dark:text-slate-100 font-medium pl-2 leading-relaxed text-lg">
              {renderSentence(synonym, category === 'Academic' ? 'text-purple-900 dark:text-purple-100 bg-purple-200 dark:bg-purple-900/50' : 'text-emerald-900 dark:text-emerald-100 bg-emerald-200 dark:bg-emerald-900/50')}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
