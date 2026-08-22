export type SynonymCategory = "Academic" | "Professional" | "Poetic" | "Common" | "Standard";

export interface CategorizedSynonym {
  word: string;
  category: SynonymCategory;
  score: number;
}

// Words with these suffixes tend to be Academic/Professional
const ACADEMIC_SUFFIXES = ["tion", "sion", "ment", "ance", "ence", "ity", "ism", "ize", "ify", "ous", "ive", "ary", "ory"];
const POETIC_SUFFIXES = ["ful", "less", "ness", "some", "ward", "like", "en"];

// A broader set of known academic/formal words – can still use this as a boost
const ACADEMIC_SEEDS = new Set([
  "facilitate", "mitigate", "elucidate", "delineate", "ameliorate", "ascertain", "corroborate",
  "substantiate", "synthesize", "empirical", "subsequent", "paradigm", "intrinsic", "ubiquitous",
  "salient", "paramount", "imperative", "lucid", "cognizant", "catalyst", "dichotomy", "heuristic",
  "meticulous", "pragmatic", "tenuous", "exemplify", "postulate", "validate", "enumerate", "constitute",
  "perceive", "discern", "acknowledge", "comprehend", "establish", "formulate", "indicate", "demonstrate"
]);

const PROFESSIONAL_SEEDS = new Set([
  "implement", "leverage", "optimize", "streamline", "enhance", "utilize", "coordinate", "generate",
  "initiate", "monitor", "resolve", "strategic", "effective", "efficient", "innovative", "robust",
  "scalable", "sustainable", "viable", "dynamic", "proactive", "proficient", "seamless", "administer",
  "cultivate", "spearhead", "consolidate", "execute", "deliver", "manage", "achieve", "align", "deploy"
]);

const POETIC_SEEDS = new Set([
  "ethereal", "ephemeral", "melancholy", "luminous", "serendipity", "halcyon", "petrichor", "aurora",
  "solitude", "verdant", "sonorous", "resplendent", "azure", "surreal", "vestige", "gossamer",
  "labyrinthine", "mellifluous", "nostalgia", "enrapture", "incandescent", "quiescent", "effervescent",
  "obsidian", "crimson", "amethyst", "whisper", "murmur", "cascade", "enchant", "celestial",
  "wanderlust", "nebula", "radiance", "twilight", "shimmering", "glimmer", "mystical", "wistful",
  "sublime", "transcendent", "mystify", "reverie", "lament", "rapture"
]);

function scoreAndCategorize(word: string): { category: SynonymCategory; score: number } {
  const lower = word.toLowerCase();

  // Seed-based classification has highest priority
  if (ACADEMIC_SEEDS.has(lower)) return { category: "Academic", score: 4 };
  if (POETIC_SEEDS.has(lower)) return { category: "Poetic", score: 3.5 };
  if (PROFESSIONAL_SEEDS.has(lower)) return { category: "Professional", score: 3 };

  // Suffix-based heuristics
  if (ACADEMIC_SUFFIXES.some(s => lower.endsWith(s)) && lower.length >= 8) {
    return { category: "Academic", score: 2 };
  }
  if (POETIC_SUFFIXES.some(s => lower.endsWith(s)) && lower.length >= 6) {
    return { category: "Poetic", score: 1.5 };
  }

  // Length-based: longer words are more formal/professional
  if (lower.length >= 10) return { category: "Professional", score: 1 };
  if (lower.length >= 7) return { category: "Standard", score: 0.5 };

  return { category: "Common", score: 0 };
}

export function categorizeSynonyms(synonyms: string[]): CategorizedSynonym[] {
  const uniqueSyns = Array.from(new Set(synonyms.filter(Boolean)));
  return uniqueSyns
    .map(word => {
      const { category, score } = scoreAndCategorize(word);
      return { word, category, score };
    })
    .sort((a, b) => b.score - a.score);
}
