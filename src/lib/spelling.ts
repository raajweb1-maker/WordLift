// Datamuse API implementation for global spell checking
// We no longer need Fuse.js or a hardcoded dictionary. We can rely on Datamuse to find the best match for any word in the English language.

interface DatamuseSuggestion {
  word: string;
  score: number;
}

export async function findBestMatch(word: string): Promise<string | null> {
  const query = word.toLowerCase().trim();
  if (!query) return null;
  
  try {
    // We use the `/sug` endpoint which is specifically for spelling suggestions
    const response = await fetch(`https://api.datamuse.com/sug?s=${encodeURIComponent(query)}`);
    if (!response.ok) return null;
    
    const suggestions: DatamuseSuggestion[] = await response.json();
    
    // Datamuse returns an array ordered by relevance/score. 
    // We take the top suggestion if it exists.
    if (suggestions.length > 0) {
      return suggestions[0].word;
    }
  } catch (e) {
    console.error("Spelling suggestion fetch failed:", e);
  }

  return null;
}
