"use client";

import { useEffect, useState } from "react";
import { Loader2, BookOpen, Feather } from "lucide-react";

interface InlineModeProps {
  word: string;
  synonym: string;
  category: "Academic" | "Poetic" | "Professional" | "Common" | "Standard";
}

export function InlineMode({ word, synonym, category }: InlineModeProps) {
  const [sentence, setSentence] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setSentence(null);
    setLoading(true);
    setError(false);

    fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ word, synonym, category }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.error) setError(true);
        else setSentence(data.sentence);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [word, synonym, category]);

  const isPoetic = category === "Poetic";
  const Icon = isPoetic ? Feather : BookOpen;
  const colorScheme = isPoetic
    ? {
        label: "text-rose-600 dark:text-rose-400",
        icon: "text-rose-500",
        highlight: "text-rose-700 dark:text-rose-300 bg-rose-100 dark:bg-rose-900/40 px-1 rounded font-bold",
        border: "border-rose-200 dark:border-rose-900/30",
        bg: "bg-rose-50/60 dark:bg-rose-950/20",
      }
    : {
        label: "text-indigo-600 dark:text-indigo-400",
        icon: "text-indigo-500",
        highlight: "text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/40 px-1 rounded font-bold",
        border: "border-indigo-200 dark:border-indigo-900/30",
        bg: "bg-indigo-50/60 dark:bg-indigo-950/20",
      };

  const highlightSynonym = (text: string) => {
    const parts = text.split(new RegExp(`(${synonym})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === synonym.toLowerCase() ? (
        <span key={i} className={colorScheme.highlight}>{part}</span>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  return (
    <div className={`rounded-xl border p-3 text-sm ${colorScheme.bg} ${colorScheme.border}`}>
      <div className={`flex items-center gap-1.5 mb-2 text-xs font-bold uppercase tracking-widest ${colorScheme.label}`}>
        <Icon className={`w-3 h-3 ${colorScheme.icon}`} />
        {isPoetic ? "Poetic" : "Essay"}
      </div>
      {loading ? (
        <div className="flex items-center gap-2 text-slate-400 text-xs">
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
          Generating...
        </div>
      ) : error ? (
        <p className="text-xs text-red-400 italic">Could not generate sentence.</p>
      ) : (
        <p className={`leading-relaxed text-slate-700 dark:text-slate-300 ${isPoetic ? "italic" : ""}`}>
          {sentence && highlightSynonym(sentence)}
        </p>
      )}
    </div>
  );
}
