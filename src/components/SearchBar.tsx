"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex items-center w-full max-w-2xl mx-auto shadow-sm rounded-full bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200 dark:border-slate-800 focus-within:ring-2 focus-within:ring-slate-400 focus-within:border-transparent transition-all overflow-hidden"
    >
      <div className="pl-5 text-slate-400">
        <Search size={20} />
      </div>
      <Input
        type="text"
        placeholder="Enter any English word..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border-0 focus-visible:ring-0 bg-transparent h-14 text-lg px-4 flex-1 text-slate-800 dark:text-slate-100 placeholder:text-slate-400"
      />
      <div className="pr-2">
        <Button
          type="submit"
          disabled={!query.trim()}
          className="rounded-full bg-slate-800 hover:bg-slate-700 text-white dark:bg-slate-200 dark:hover:bg-slate-300 dark:text-slate-900 px-6 h-10 font-medium transition-all"
        >
          Search
        </Button>
      </div>
    </form>
  );
}
