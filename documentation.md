# WordLift Technical Documentation & Changelog

## Professional Writing Assistant - Full Stack Application

### 1. Project Overview
WordLift is a premium web application built with **Next.js 14**, **Tailwind CSS**, and **Shadcn/ui**. It is designed to help students and professionals elevate their vocabulary by providing categorized synonyms, dictionary definitions, and an interactive "Essay/Poetry Mode" for contextual learning.

---

### 2. Core Architecture & Technologies
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS with Glassmorphism effects
- **Components**: Shadcn/ui (Radix UI based)
- **APIs**:
  - **Free Dictionary API**: For definitions, phonetics, and primary synonyms.
  - **Datamuse API**: For global fuzzy spell-checking and word suggestions.
- **State Management**: React `useState` and `useMemo` for efficient search UI and synonym categorization.
- **Theme**: `next-themes` for system-aware Dark Mode support.

---

### 3. Detailed Features & Logic

#### A. Global Spelling Correction (The "Fuzzy Fallback")
Initially, the app used a local dictionary and `Fuse.js`, which was limited to ~100 words. To handle any English word typo (like "nervos" or "kingfishr"), we integrated the **Datamuse API**.
- **Logic**: If the Dictionary API returns a 404, the app pings `api.datamuse.com/sug` with the typo. It retrieves the top linguistic neighbor and automatically re-triggers the search.
- **Visual Feedback**: An amber notification informs the user: *"Showing result for [Correct Word] instead."*

#### B. Professional Synonym Categorization
Found in `src/lib/synonyms.ts`, this engine takes raw strings and returns objects categorized as:
- **Academic**: High-tier research words (Indigo themed).
- **Poetic**: Evocative, literary terms (Rose themed).
- **Professional**: Business-centric action words (Emerald themed).
- **Similar**: Common colloquial synonyms (Sky themed).

#### C. Essay & Poetry Mode
A unique interactive feature in `src/components/EssayMode.tsx`. 
- **Essay Mode**: Shows how a word transforms a formal sentence.
- **Poetry Mode**: Uses specific poetic templates (e.g., *"The moon began to [word]..."*) to highlight the word's aesthetic value.

---

### 4. Changelog & Implementation History

1.  **Project Initialization**: Set up Next.js with a Slate/White glassmorphism theme.
2.  **API Integration**: Connected to the Free Dictionary API.
3.  **Synonym Engine**: Built the scoring logic to distinguish "Professional" vs "Common" words.
4.  **Essay Mode**: Added the Dialog-based contextual sentence replacer.
5.  **Dark Mode**: Implemented a global ThemeProvider and a manual Sun/Moon toggle.
6.  **Poetry Extension**: Added a "Poetic" word category with specialized verse-based examples.
7.  **Similar Mode**: Grouped all non-categorized synonyms into a "Similar Meanings" section with Sky Blue styling.
8.  **Global Spellchecker (Final)**: Replaced limited local fuzzy search with the Datamuse API to fix bugs where words like "nervous" were missing from the fallback.

---

### 5. Deployment
The project includes a `vercel.json` and a `deploy.md` file. It is configured for zero-config deployment on Vercel with strict security headers (X-Frame-Options, etc.) enabled by default.
