# Workspace Rules: CalcKaro Project

To minimize token usage and keep the conversation context window clean:
1. **Lazy Load Large Files**: Do not view or read the entire `DESIGN.md` or large instruction files (like skills files under `.agents/skills/`) unless directly required by the current task.
2. **Refer to Gemini.md**: Always check [.agents/Gemini.md](file:///.agents/Gemini.md) at the start of a session or task to understand the current project state, installed skills list, and checklist.
3. **Keep Code Compact**: Write modular, clean, and well-commented code without verbose explanations.

---

## Project Overview
*   **Project Name**: CalcKaro
*   **Domain**: [calckaro.com](https://calckaro.com)
*   **Tagline**: India's Calculator Hub — Fast, Free, Built for Bharat
*   **Framework**: Astro.js (static-first, island architecture)
*   **Deployment**: Vercel
*   **Design Philosophy**: Vercel-inspired — dark/light mode, clean typography, minimal chrome, zero visual clutter.
*   **Monetization**: Google AdSense (non-intrusive, designated slots only)
*   **Target Audience**: India-first — students, salaried professionals, small business owners, exam aspirants (SSC, UPSC, GATE).

---

## Competitive Analysis
### Primary Competitor: `omnicalculator.com`
*   *Note*: Study for feature inspiration ONLY. **Do not copy their UI, design, color scheme, or layout.**
*   *Strengths*: 3,500+ calculators, dedicated URLs (Deep SEO), step-by-step formula explanations.
*   *Weaknesses*: Not India-first (no INR defaults, no India-specific tax/compliance tools), no dark mode, generic international feel.

### How CalcKaro Beats Them
*   **India-first defaults**: INR (`₹`), Indian tax slabs, Indian pay structures, Indian exam patterns.
*   **Dark-mode first**: Vercel-style clean pitch black aesthetic.
*   **Performance**: Fast static Astro pages vs heavy React SPA.
*   **India-specific depth**: Localized tools (GST, TDS, HRA, notice period, PF, gratuity, ITR, CIBIL, FASTag, HDFC/SBI EMI, SSC CHSL eligibility).
*   **Above-the-fold UX**: Result displays instantly without scrolling.
*   **AEO-optimized**: Structured answers targeting Google SGE and AI search engine summaries.

### Secondary Competitors
*   `calculator.net`: Breadth of categories, clean URL structure.
*   `calculatorsoup.com`: Formula transparency, step-by-step breakdown.
*   `rapidtables.com`: Fast, minimal, no-nonsense UX.

---

## Active Skills & Design System
These local project-scoped skills and design assets are installed and active:
1.  **[web-design-guidelines](file:///.agents/skills/web-design-guidelines/SKILL.md)**: Web interface compliance, accessibility.
2.  **[tailwind-4-docs](file:///.agents/skills/tailwind-4-docs/SKILL.md)**: Tailwind CSS v4 reference and configuration guidance.
3.  **[programmatic-seo](file:///.agents/skills/programmatic-seo/SKILL.md)**: Template-driven directory and calculator generation.
4.  **[ai-seo](file:///.agents/skills/ai-seo/SKILL.md)**: Optimizations for LLM citations and AI answers.
5.  **[seo-audit](file:///.agents/skills/seo-audit/SKILL.md)**: SEO technical audits and diagnostics.
6.  **[DESIGN.md](file:///DESIGN.md)**: Notion-inspired design tokens (colors, typography, components).

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

---

## Calculator Priority List & Slugs

### Phase 1 — Launch MVPs
| Calculator | URL Slug | India-Specific Angle |
| :--- | :--- | :--- |
| EMI Calculator | `/emi-calculator` | Indian bank rates, INR default |
| GST Calculator | `/gst-calculator` | 5/12/18/28% slabs, CGST+SGST breakdown |
| SIP Calculator | `/sip-calculator` | INR, Indian mutual fund context |
| FD Calculator | `/fd-calculator` | Indian bank FD rates |
| Salary/CTC Calculator | `/salary-calculator` | CTC → In-hand (HRA, PF, gratuity, professional tax) |
| Notice Period Calculator | `/notice-period-calculator` | Working days, Indian holidays |
| Percentage Calculator | `/percentage-calculator` | Generic + board exam context |
| Age Calculator | `/age-calculator` | DOB → exact age in years/months/days |
| BMI Calculator | `/bmi-calculator` | WHO + Asian BMI thresholds |
| Simple/Compound Interest | `/interest-calculator` | Indian exam formula style |

### Phase 2 — India-Specific Depth
*   **HRA Exemption Calculator** (`/hra-calculator`)
*   **TDS Calculator** (`/tds-calculator`)
*   **Income Tax Calculator FY 2025-26** (`/income-tax-calculator`)
*   **PPF Calculator** (`/ppf-calculator`)
*   **Gratuity Calculator** (`/gratuity-calculator`)
*   **Home Loan Eligibility** (`/home-loan-eligibility-calculator`)
*   **CIBIL Score Impact Estimator** (`/cibil-score-calculator`)
*   **SSC CHSL Eligibility Checker** (`/ssc-chsl-eligibility`)
*   **Markup / Margin Calculator** (`/markup-calculator`)
*   **Discount Calculator** (`/discount-calculator`)

### Phase 3 — Broad Coverage
*   **Math**: LCM, HCF, prime factorization, square root, logarithm
*   **Finance**: ROI, break-even, inflation-adjusted return
*   **Health**: calorie, TDEE, ideal weight, BMR
*   **Unit converters**: length, weight, temperature, area, volume, speed, data (GB/MB)
*   **Date/Time**: days between dates, time zone converter, work hours calculator

---

## Project Structure Reference
```
/
├── public/
│   └── manifest.json               ← PWA manifest
├── src/
│   ├── components/
│   │   ├── CalculatorShell.astro   ← wraps every calculator page (layout + AdSlots)
│   │   ├── InputField.astro        ← reusable labeled input (number, select, toggle)
│   │   ├── ResultDisplay.astro     ← big result box, copy button, formula display
│   │   ├── RelatedCalcs.astro      ← "You might also need" grid (internal linking)
│   │   ├── CategoryCard.astro      ← homepage category grid card
│   │   ├── SearchBar.tsx           ← React island — fuzzy search across all calculators
│   │   ├── AdSlot.astro            ← AdSense slot wrapper
│   │   └── CalcLogic/
│   │       ├── emi.ts              ← pure TS calculation functions (no UI)
│   │       ├── gst.ts
│   │       ├── sip.ts
│   │       └── [one file per calculator]
│   ├── layouts/
│   │   └── Base.astro              ← HTML shell, meta, fonts, theme, nav
│   ├── pages/
│   │   ├── index.astro             ← homepage — category grid + search
│   │   ├── [calculator].astro      ← dynamic route for each calculator
│   │   └── category/
│   │       └── [category].astro    ← category listing pages (finance, health, etc.)
│   ├── data/
│   │   └── calculators.json        ← master list: slug, name, category, description, keywords
│   └── styles/
│       └── global.css              ← Tailwind v4 base + CSS vars from DESIGN.md
├── DESIGN.md                       ← design system (do not modify without instruction)
├── AGENTS.md                       ← agent rules & SEO guidelines
└── astro.config.mjs
```

---

## Active Checklist & Roadmap (Recommended Build Order)
*   `[x]` Git initialized, README.md pushed to remote
*   `[x]` Install required skills and design system at project level
*   `[x]` Create token optimization files (`AGENTS.md` and `Gemini.md`)
*   `[ ]` Initialize the CalcKaro application structure (Astro configuration & files)
*   `[ ]` Scaffold `Base.astro` — dark theme, Geist font, nav (search + categories), footer
*   `[ ]` Build `calculators.json` containing Phase 1 entries (10 calculators)
*   `[ ]` Build `[calculator].astro` dynamic page template
*   `[ ]` Build `InputField.astro` and `ResultDisplay.astro` reusable components
*   `[ ]` Implement core calculation logic in `src/components/CalcLogic/`: `emi.ts`, `gst.ts`, `sip.ts`, `percentage.ts`, `age.ts`
*   `[ ]` Wire Phase 1 calculators end-to-end (interactive input/output)
*   `[ ]` Build homepage — category grid + `SearchBar.tsx` island
*   `[ ]` Add FAQ JSON-LD structured data to all pages
*   `[ ]` Add `RelatedCalcs.astro` internal linking
*   `[ ]` Add AdSense slots
*   `[ ]` Run `seo-audit` skill on all Phase 1 pages
*   `[ ]` Add Phase 2 calculators (India-specific depth)
*   `[ ]` Deploy to Vercel
*   `[ ]` Run `ai-seo` skill audit
