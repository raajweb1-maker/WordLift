"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

const TRANSITION_WORDS = [
  { word: "Furthermore", meaning: "in addition; besides (used to introduce a fresh consideration in an argument).", type: "Adverb" },
  { word: "Conversely", meaning: "introducing a statement or idea which reverses one that has just been made or referred to.", type: "Adverb" },
  { word: "Nevertheless", meaning: "in spite of that; notwithstanding; all the same.", type: "Adverb" },
  { word: "Subsequently", meaning: "after a particular thing has happened; afterward.", type: "Adverb" },
  { word: "Paradoxically", meaning: "in a seemingly absurd or self-contradictory way.", type: "Adverb" },
  { word: "Ergo", meaning: "therefore (used as a sentence connector).", type: "Adverb" },
  { word: "Albeit", meaning: "although; even if.", type: "Conjunction" },
];

export function WordOfTheDay() {
  const word = TRANSITION_WORDS[Math.floor(Math.random() * TRANSITION_WORDS.length)];

  return (
    <Card className="w-full max-w-3xl mx-auto bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/60 dark:border-slate-800/60 shadow-md transition-all hover:shadow-lg rounded-3xl overflow-hidden">
      <CardHeader className="flex flex-row items-center gap-2 pb-2 bg-gradient-to-r from-slate-100/50 to-transparent dark:from-slate-800/30">
        <Sparkles className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
        <CardTitle className="text-sm font-bold tracking-widest text-slate-500 uppercase">
          Transition Word Suggestion
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 pb-8 px-8">
        <div className="flex items-baseline gap-4 mb-3">
          <h3 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">{word.word}</h3>
          <span className="text-sm font-medium text-slate-500 italic px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full">{word.type}</span>
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
          {word.meaning}
        </p>
      </CardContent>
    </Card>
  );
}
