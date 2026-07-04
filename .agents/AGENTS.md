# Workspace Rules: CalcKaro Project

To minimize token usage and keep the conversation context window clean:
1. **Lazy Load Large Files**: Do not view or read the entire `DESIGN.md` or large instruction files (like skills files under `.agents/skills/`) unless directly required by the current task.
2. **Refer to Gemini.md**: Always check [.agents/Gemini.md](file:///.agents/Gemini.md) at the start of a session or task to understand the current project state, installed skills list, and checklist.
3. **Keep Code Compact**: Write modular, clean, and well-commented code without verbose explanations.

## Notion Design System (Quick Reference)
To avoid loading `DESIGN.md` for simple styling choices, use these core design tokens:
*   **Colors**:
    *   Primary: `#0075de` (Notion Blue), Active: `#005bab`
    *   Canvas: `#ffffff` (White), Soft/Neutral Canvas: `#f6f5f4`
    *   Ink/Text: `#000000` (Near Black), Secondary: `#31302e`, Muted: `#615d59`, Faint: `#a39e98`
    *   Hairline/Borders: `#e6e6e6`
    *   Accent Colors: Sky (`#62aef0`), Purple (`#d6b6f6`), Pink (`#ff64c8`), Orange (`#dd5b00`), Teal (`#2a9d99`), Green (`#1aae39`)
*   **Typography**: Font Family is `NotionInter`, falling back to standard system UI sans-serif.
*   **Rounding**: `xs` (4px), `sm` (5px), `md` (8px).
