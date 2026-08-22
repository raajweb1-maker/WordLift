"use server";

export async function fetchWordAction(word: string) {
  try {
    const [dictRes, datamuseRes] = await Promise.all([
      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`, {
        next: { revalidate: 2592000 },
      }),
      fetch(`https://api.datamuse.com/words?rel_syn=${encodeURIComponent(word)}&max=40`, {
        next: { revalidate: 2592000 },
      }),
    ]);

    if (!dictRes.ok) return null;

    const dictData = await dictRes.json();
    const entry = dictData[0];

    // Gather datamuse synonyms and merge into the first meaning's synonyms
    if (datamuseRes.ok) {
      const datamuseSyns: { word: string }[] = await datamuseRes.json();
      const extraSyns = datamuseSyns.map((w) => w.word).filter(Boolean);

      if (extraSyns.length > 0) {
        // Inject datamuse synonyms directly into the first meaning so SearchResult picks them up
        if (entry.meanings && entry.meanings.length > 0) {
          const existing: string[] = entry.meanings[0].synonyms ?? [];
          entry.meanings[0].synonyms = Array.from(new Set([...existing, ...extraSyns]));
        }
      }
    }

    return dictData;
  } catch (error) {
    return null;
  }
}

export async function findBestMatchAction(word: string): Promise<string | null> {
  const query = word.toLowerCase().trim();
  if (!query) return null;

  try {
    const response = await fetch(`https://api.datamuse.com/sug?s=${encodeURIComponent(query)}`, {
      next: { revalidate: 2592000 },
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
