# Workspace Rules: CalcKaro Project

To minimize token usage and keep the conversation context window clean:
1. **Lazy Load Large Files**: Do not view or read the entire `DESIGN.md` or large instruction files (like skills files under `.agents/skills/`) unless directly required by the current task.
2. **Refer to Gemini.md**: Always check [.agents/Gemini.md](file:///.agents/Gemini.md) at the start of a session or task to understand the current project state, installed skills list, and checklist.
3. **Keep Code Compact**: Write modular, clean, and well-commented code without verbose explanations.

---

## Hard Rules (Must Follow)
1. **No Plagiarism**: Do not copy any UI element, layout, color scheme, or component from `omnicalculator.com` or any competitor.
2. **Design Authority**: `DESIGN.md` is the single source of truth for all visual decisions — do not override it.
3. **Tailwind Version**: Do not use Tailwind v3 syntax — v4 only. Do not use Tailwind v3 class names or `tailwind.config.js`-based patterns.
4. **Reactive Input**: Do not use a "Calculate" button as the primary interaction — live reactive updates only.
5. **Indian Formatting**: All number output must use Indian number formatting (e.g. ₹1,50,000 not 150,000). Always use ₹ symbol, never "INR" in user-facing text.
6. **Structured Data**: Every calculator page must have FAQ with JSON-LD structured data.
7. **Read Skills**: Read all skill files before generating any component or page.
8. **No Hardcoded Rates**: Never hardcode tax slabs or interest rates — store in `src/data/constants.ts` so they can be updated annually.

---

## Technical Constraints & Specifications
*   **Framework**: Astro.js (static-first, island architecture). Output must be `'static'` in `astro.config.mjs`.
*   **Calculator Logic**: `client:load` on result display component only.
*   **Search**: `client:idle` on `SearchBar` component.
*   **No jQuery/Bootstrap**: Tailwind v4 only.
*   **PWA**: `manifest.json` + offline fallback page.
*   **AdSense**: Load async, never block above-the-fold content. Place ads below the result section and above related calculators. Never inside the input area.
*   **Number Formatting**: Use `Intl.NumberFormat('en-IN')` (lakhs and crores, not millions).
*   **Defaults**: Must reflect Indian market reality (home loan = 8.5%, SIP = ₹5,000/month, etc.).

---

## Calculator Page Specification
### URL Structure
`/[calculator-name]-calculator` — always hyphenated, always ends in `-calculator` or `-checker`.

### Page Sections (Top to Bottom)
1.  **H1**: `[Calculator Name] — [India-specific subtitle]`
2.  **Input panel**: All inputs, with Indian defaults pre-filled (e.g., 8.5% interest rate for home loan).
3.  **Result panel**: Large primary result, secondary breakdown (e.g., EMI → also show total interest, total payment).
4.  **Copy result button**: One-click copies the result.
5.  **Formula section**: Show the formula used, explain each variable in plain Hindi-English (Hinglish acceptable).
6.  **How to use**: 3–5 step numbered list.
7.  **FAQ**: 4–6 Q&As targeting long-tail keywords (AEO-optimized).
8.  **Related calculators**: 4–6 internal links via `RelatedCalcs.astro`.
9.  **AdSense slot**: Located between FAQ and related calculators.

### Calculator Logic Rules
*   All calculation functions live in `src/components/CalcLogic/[name].ts` (or `src/data/CalcLogic/[name].ts`).
*   Pure functions only — input numbers in, result object out.
*   Zero side effects, zero DOM access in logic files.
*   Result updates on every input change (reactive, no "Calculate" button needed — but offer one as fallback for slow devices).
*   Show result instantly — no loading states for client-side math.

---

## SEO & AEO Strategy

### Keyword Strategy
*   **Primary**: `"[calculator name] online" / "[calculator name] India"`
*   **Secondary**: `"how to calculate [X] in India"`, `"[X] formula"`, `"[X] calculator free"`
*   **Long-tail (AEO)**: `"what is the GST on [product]"`, `"how much EMI for 30 lakh home loan"`

### On-Page Rules
*   **Title**: `[Calculator Name] — Free Online [Calculator Name] | CalcKaro`
*   **Meta description**: Include primary keyword + "India" + "free" + result preview.
*   **H1**: Must contain the primary keyword.
*   **Formulas**: Formula section uses `<code>` tags for formulas (schema-friendly).
*   **Schemas**: 
    *   `FAQPage` JSON-LD structured data on all FAQs.
    *   `WebApplication` schema on every calculator page.
    *   `BreadcrumbList` schema: `Home > Category > Calculator`.

### Programmatic SEO (pSEO)
*   Generate calculator pages from `calculators.json` data file.
*   Each entry has: `slug`, `name`, `category`, `h1`, `metaTitle`, `metaDescription`, `faqs[]`, `relatedSlugs[]`.
*   New calculators = add a JSON entry + a `.ts` logic file — no new `.astro` files needed.

### Internal Linking
*   Every calculator links to 4–6 related calculators.
*   Category pages aggregate all calculators in that category.
*   Homepage features top 10 most-searched calculators prominently.

### AI Search Engine Optimization (AEO)
*   Answer `"what is [formula]"` directly in the first paragraph.
*   Use numbered lists for steps (AI overviews love numbered lists).
*   FAQ answers must be 1–3 sentences — direct, no fluff.
*   Include exact numbers in FAQ answers where possible (e.g. `"The GST on electronics in India is 18%"`).

---

## Notion Design System (Quick Reference)
Use these core design tokens from `DESIGN.md`:
*   **Aesthetic**: Vercel-style — pitch black (`#000000`), white text, grey borders (`#1a1a1a`, `#333333`), electric blue accent (`#0070f3`).
*   **Typography**: Font Family is `NotionInter` / System UI sans-serif. Monospaced for numeric outputs, sans-serif for UI labels.
*   **Rounding**: `xs` (4px), `sm` (5px), `md` (8px).
*   **Layout**: Two-column — inputs left, result right (desktop). Stacked on mobile.
