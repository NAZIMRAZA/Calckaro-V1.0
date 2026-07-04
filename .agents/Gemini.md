# CalcKaro Workspace State

This file stores current project objectives, build status, and roadmap details to optimize token usage.

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
