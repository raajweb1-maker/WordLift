"use client";

import { useMemo } from "react";
import { categorizeSynonyms } from "@/lib/synonyms";
import { EssayMode } from "@/components/EssayMode";
import { Badge } from "@/components/ui/badge";

export function SearchResult({ data }: { data: any }) {
  // Extract all synonyms from the API response
  const rawSynonyms = useMemo(() => {
    let syns: string[] = [];
    data.meanings.forEach((meaning: any) => {
      if (meaning.synonyms) {
        syns = [...syns, ...meaning.synonyms];
      }
      meaning.definitions.forEach((def: any) => {
        if (def.synonyms) {
          syns = [...syns, ...def.synonyms];
        }
      });
    });
    return Array.from(new Set(syns));
  }, [data]);

  const categorizedSynonyms = useMemo(() => categorizeSynonyms(rawSynonyms), [rawSynonyms]);

  return (
    <div className="w-full max-w-5xl mx-auto p-8 sm:p-10 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-[2rem] border border-slate-200/80 dark:border-slate-800/80 shadow-2xl transition-all">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-slate-200/60 dark:border-slate-800 pb-8">
        <div>
          <h2 className="text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-slate-900 to-slate-500 dark:from-slate-50 dark:to-slate-400 capitalize tracking-tight mb-3">
            {data.word}
          </h2>
          {data.phonetic && (
            <p className="text-slate-500 dark:text-slate-400 text-2xl font-medium tracking-wide">
              {data.phonetic}
            </p>
          )}
        </div>
        {categorizedSynonyms.length > 0 && (
          <div className="flex gap-2 mb-2 md:mb-0">
            <Badge variant="secondary" className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-bold px-3 py-1 text-sm border border-indigo-100 dark:border-indigo-800">
              {categorizedSynonyms.length} Synonyms
            </Badge>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 space-y-12">
          {data.meanings.map((meaning: any, i: number) => (
            <div key={i} className="space-y-5">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-4">
                <span className="w-10 h-1.5 bg-gradient-to-r from-indigo-500 to-sky-500 rounded-full flex-shrink-0"></span>
                <span className="capitalize tracking-wide">{meaning.partOfSpeech}</span>
              </h3>
              <ul className="space-y-6 pl-14">
                {meaning.definitions.slice(0, 3).map((def: any, j: number) => (
                  <li key={j} className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed relative">
                    <span className="absolute -left-6 top-1.5 w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                    <span className="text-slate-900 dark:text-slate-100 font-medium block mb-2 text-xl">
                      {def.definition}
                    </span>
                    {def.example && (
                      <span className="text-slate-500 dark:text-slate-400 italic block mt-2 text-base border-l-2 border-indigo-200 dark:border-indigo-800 pl-3">
                        "{def.example}"
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Synonyms Panel */}
        <div className="lg:col-span-5 lg:border-l border-slate-200 dark:border-slate-800 lg:pl-10 space-y-8">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 uppercase tracking-widest flex items-center gap-3">
            <span className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl">✨</span>
            Elevated Synonyms
          </h3>
          {categorizedSynonyms.length === 0 ? (
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
              <p className="text-slate-500 dark:text-slate-400 italic text-center text-sm">No advanced synonyms found.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {["Academic", "Poetic", "Professional", "Common", "Standard"].map(category => {
                const words = categorizedSynonyms.filter(s => s.category === category);
                if (words.length === 0) return null;
                
                return (
                   <div key={category} className="space-y-4 bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/60">
                    <h4 className={`text-sm font-bold uppercase tracking-widest flex items-center gap-2
                      ${category === 'Academic' ? 'text-purple-600 dark:text-purple-400' : 
                        category === 'Poetic' ? 'text-rose-600 dark:text-rose-400' :
                        category === 'Professional' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400'}
                    `}>
                      {category} <span className="opacity-50 text-xs">({words.length})</span>
                    </h4>
                    <div className="flex flex-wrap gap-2.5">
                      {words.slice(0, 8).map(wordObj => (
                        <div key={wordObj.word} className="inline-flex items-center gap-1.5 bg-white dark:bg-slate-800 border-2 border-transparent shadow-sm px-3.5 py-1.5 rounded-xl text-sm md:text-base text-slate-800 dark:text-slate-200 font-bold hover:border-indigo-300 dark:hover:border-indigo-700 transition-all hover:-translate-y-0.5 w-full justify-between sm:w-auto">
                          {wordObj.word}
                          {category !== "Standard" && (
                            <EssayMode originalWord={data.word} synonym={wordObj.word} category={category as any} />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
