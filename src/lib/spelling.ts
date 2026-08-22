

interface DatamuseSuggestion {
  word: string;
  score: number;
}

export async function findBestMatch(word: string): Promise<string | null> {
  const query = word.toLowerCase().trim();
  if (!query) return null;
  
  try {

    const response = await fetch(`https://api.datamuse.com/sug?s=${encodeURIComponent(query)}`);
    if (!response.ok) return null;
    
    const suggestions: DatamuseSuggestion[] = await response.json();
    

    if (suggestions.length > 0) {
      return suggestions[0].word;
    }
  } catch (e) {
    console.error("Spelling suggestion fetch failed:", e);
  }

  return null;
}
