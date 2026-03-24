"use client";

import { SearchBar } from "@/components/SearchBar";
import { WordOfTheDay } from "@/components/WordOfTheDay";
import { SearchResult } from "@/components/SearchResult";

import { useState } from "react";

export default function Home() {
  const [wordData, setWordData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setError("");
    setWordData(null);
    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(query)}`);
      if (!res.ok) {
        throw new Error("Word not found. Try another search.");
      }
      const data = await res.json();
      setWordData(data[0]);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col relative overflow-hidden font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Decorative background gradients */}
      <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b from-slate-200/50 to-transparent dark:from-slate-900/50 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl dark:bg-indigo-900/20 pointer-events-none mix-blend-multiply dark:mix-blend-screen" />
      <div className="absolute top-20 -left-20 w-72 h-72 bg-sky-200/40 rounded-full blur-3xl dark:bg-cyan-900/20 pointer-events-none mix-blend-multiply dark:mix-blend-screen" />

      <main className="flex-1 w-full max-w-5xl mx-auto px-6 pt-24 pb-12 relative z-10 flex flex-col items-center">
        <div className="text-center mb-14 space-y-6">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md text-sm font-medium text-slate-600 dark:text-slate-300">
            ✨ Professional writing assistant
          </div>
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
            Word<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-sky-500">Lift</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
            Elevate your vocabulary with professional synonyms and master the art of academic writing context.
          </p>
        </div>

        <SearchBar onSearch={handleSearch} />

        <div className="w-full mt-16 transition-all duration-500 ease-in-out">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-slate-200 border-t-indigo-500 dark:border-slate-800 dark:border-t-indigo-400 rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 p-6 rounded-2xl text-center border border-red-100 dark:border-red-900/30 max-w-2xl mx-auto shadow-sm">
              <div className="font-semibold text-lg mb-1">Search failed</div>
              <div>{error}</div>
            </div>
          ) : wordData ? (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
              <SearchResult data={wordData} />
            </div>
          ) : (
            <div className="animate-in fade-in zoom-in-95 duration-1000">
              <WordOfTheDay />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
