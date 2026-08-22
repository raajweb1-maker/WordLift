"use server";

export async function fetchWordAction(word: string) {
  try {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`, {
      next: { revalidate: 2592000 } // Cache for 30 days
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    return null;
  }
}

export async function findBestMatchAction(word: string): Promise<string | null> {
  const query = word.toLowerCase().trim();
  if (!query) return null;
  
  try {
    const response = await fetch(`https://api.datamuse.com/sug?s=${encodeURIComponent(query)}`, {
      next: { revalidate: 2592000 }
    });
    if (!response.ok) return null;
    
    const suggestions = await response.json();
    if (suggestions.length > 0) {
      return suggestions[0].word;
    }
  } catch (e) {
    console.error("Spelling suggestion fetch failed:", e);
  }
  return null;
}
