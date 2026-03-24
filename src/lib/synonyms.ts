export type SynonymCategory = "Academic" | "Professional" | "Standard";

export interface CategorizedSynonym {
  word: string;
  category: SynonymCategory;
  score: number;
}

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
    } else if (PROFESSIONAL_WORDS.has(lowerWord)) {
      category = "Professional";
      score = 2;
    } else if (word.length >= 9 && !word.includes(" ")) {
      // Long single words tend to be more formal
      category = "Professional";
      score = 1;
    }
    
    return { word, category, score };
  }).sort((a, b) => b.score - a.score);
}
