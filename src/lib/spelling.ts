import Fuse from "fuse.js";

// Expanded corpus including common words and academic/poetic terms
const CORPUS = [
  // Academic & Professional
  "furthermore", "nevertheless", "consequently", "subsequently", "paradoxically", 
  "ergo", "albeit", "facilitate", "mitigate", "elucidate", "delineate", 
  "ameliorate", "ascertain", "corroborate", "substantiate", "synthesize", 
  "comprehensive", "empirical", "paradigm", "intrinsic", "ubiquitous", 
  "salient", "paramount", "imperative", "lucid", "profound", "cognizant", 
  "catalyst", "dichotomy", "heuristic", "meticulous", "pragmatic", "surmise", 
  "tenuous", "exemplify", "demonstrate", "expedite", "pertain", "postulate", 
  "validate", "elegant", "professional", "academic", "sophisticated", "transition",
  
  // Poetic
  "ethereal", "ephemeral", "melancholy", "luminous", "serendipity", "halcyon", 
  "petrichor", "aurora", "solitude", "verdant", "sonorous", "resplendent", 
  "azure", "surreal", "vestige", "gossamer", "labyrinthine", "mellifluous", 
  "nostalgia", "enrapture", "incandescent", "quiescent", "effervescent", 
  "obsidian", "crimson", "amethyst",

  // Common but often misspelled in this context
  "class", "style", "writing", "essay", "poetry", "meaning", "definition",
  "synonym", "antonym", "grammar", "vocabulary", "language", "structure",
  "knowledge", "understand", "believe", "achieve", "receive", "occurred",
  "necessary", "business", "friend", "really", "beautiful", "surprise"
];

const fuse = new Fuse(CORPUS, {
  threshold: 0.35, // Balanced sensitivity: lower is stricter, higher is fuzzier
  distance: 100,   // How far to look for a match
  location: 0,
  minMatchCharLength: 3
});

export function findBestMatch(word: string): string | null {
  const query = word.toLowerCase().trim();
  if (!query) return null;
  
  const results = fuse.search(query);
  return results.length > 0 ? results[0].item : null;
}
