export type SynonymCategory = "Academic" | "Professional" | "Poetic" | "Common" | "Standard";

export interface CategorizedSynonym {
  word: string;
  category: SynonymCategory;
  score: number;
}

const POETIC_WORDS = new Set([
  "ethereal", "ephemeral", "melancholy", "luminous", "serendipity", "halcyon", "petrichor", "aurora", "solitude", "verdant", "sonorous", "resplendent", "azure", "surreal", "vestige", "gossamer", "labyrinthine", "mellifluous", "nostalgia", "enrapture", "incandescent", "quiescent", "effervescent", "obsidian", "crimson", "amethyst", "whisper", "murmur", "cascade", "enchant", "celestial", "ethereal", "wanderlust", "nebula", "radiance"
]);

const ACADEMIC_WORDS = new Set([
  "facilitate", "mitigate", "elucidate", "delineate", "ameliorate", "ascertain", "corroborate", "substantiate", "synthesize", "comprehensive", "empirical", "subsequent", "consequently", "paradigm", "intrinsic", "ubiquitous", "salient", "paramount", "imperative", "lucid", "profound", "cognizant", "catalyst", "dichotomy", "heuristic", "meticulous", "pragmatic", "surmise", "tenuous", "exemplify", "demonstrate", "expedite", "pertain", "postulate", "validate"
]);

const PROFESSIONAL_WORDS = new Set([
  "implement", "leverage", "optimize", "streamline", "enhance", "utilize", "coordinate", "generate", "initiate", "monitor", "resolve", "strategic", "effective", "efficient", "innovative", "robust", "scalable", "sustainable", "viable", "dynamic", "proactive", "proficient", "seamless", "administer", "cultivate", "facilitate", "spearhead", "consolidate"
]);

export function categorizeSynonyms(synonyms: string[]): CategorizedSynonym[] {
  // Deduplicate and filter empty
  const uniqueSyns = Array.from(new Set(synonyms.filter(Boolean)));

  return uniqueSyns.map(word => {
    const lowerWord = word.toLowerCase();
    
    let category: SynonymCategory = "Standard";
    let score = 0;
    
    if (ACADEMIC_WORDS.has(lowerWord)) {
      category = "Academic";
      score = 3;
    } else if (POETIC_WORDS.has(lowerWord)) {
      category = "Poetic";
      score = 2.5;
    } else if (PROFESSIONAL_WORDS.has(lowerWord)) {
      category = "Professional";
      score = 2;
    } else if (word.length >= 9 && !word.includes(" ")) {
      // Long single words tend to be more formal
      category = "Professional";
      score = 1;
    } else {
      category = "Common";
      score = 0;
    }
    
    return { word, category, score };
  }).sort((a, b) => b.score - a.score);
}
