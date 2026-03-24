import Fuse from "fuse.js";

// A small sample of professional/academic words to check against first.
const CORPUS = [
  "furthermore", "nevertheless", "consequently", "subsequently", "paradoxically", 
  "ergo", "albeit", "facilitate", "mitigate", "elucidate", "delineate", 
  "ameliorate", "ascertain", "corroborate", "substantiate", "synthesize", 
  "comprehensive", "empirical", "paradigm", "intrinsic", "ubiquitous", 
  "salient", "paramount", "imperative", "lucid", "profound", "cognizant", 
  "catalyst", "dichotomy", "heuristic", "meticulous", "pragmatic", "surmise", 
  "tenuous", "exemplify", "demonstrate", "expedite", "pertain", "postulate", 
  "validate", "ethereal", "ephemeral", "melancholy", "luminous", "serendipity", 
  "halcyon", "petrichor", "aurora", "solitude", "verdant", "sonorous", 
  "resplendent", "azure", "surreal", "vestige", "gossamer", "labyrinthine", 
  "mellifluous", "nostalgia", "enrapture", "incandescent", "quiescent", 
  "effervescent", "obsidian", "crimson", "amethyst"
];

const fuse = new Fuse(CORPUS, {
  threshold: 0.4, // Sensitivity (0.0 exact, 1.0 match anything)
});

export function findBestMatch(word: string): string | null {
  const results = fuse.search(word.toLowerCase());
  return results.length > 0 ? results[0].item : null;
}
