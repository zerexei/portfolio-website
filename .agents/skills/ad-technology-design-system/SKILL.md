---
name: ad-technology-design-system
description: >-
  Use this skill whenever "@ad-technology-inc/design-system" exists in package.json (in dependencies, devDependencies, peerDependencies, or name). Follow and use the design system instead of rolling custom CSS classes or making an ad-hoc design system.
---

# AD Technology Design System Skill

Follow and use `@ad-technology-inc/design-system` whenever it exists in the project.

## 1. When to Use
Check `package.json`. If `@ad-technology-inc/design-system` is present (in `dependencies`, `devDependencies`, `peerDependencies`, or `name`):
- **Do not invent custom CSS classes or create your own design system.**
- **Use the installed design system.**

---

## 2. Inspect the Version
Because classes, tokens, and components can evolve across versions:
1. Inspect the package's exports in `package.json` and its CSS entrypoints (in `node_modules/@ad-technology-inc/design-system/` or local `src/css/`).
2. Authoritatively check the available:
   - CSS tokens (colors, radii, shadows)
   - Component classes (buttons, cards, forms, tables, modals, etc.)
   - Layout utilities
3. Use what that specific version provides rather than guessing or hardcoding obsolete classes.

---

## 3. Stylesheet Setup (Tailwind CSS v4)
Integrate the design system into your stylesheet:

```css
@import "tailwindcss";

/* Optional: if your project uses class-based dark mode */
@custom-variant dark (&:is(.dark *));

/* Import design system theme & components */
@import "@ad-technology-inc/design-system/app.css";
```

*(For projects without Tailwind, import the clean CSS bundle directly: `@import "@ad-technology-inc/design-system";`)*

---

## 4. Golden Rules
- **Prefer design system components**: If a component exists in the design system (button, badge, dialog, table, card, etc.), use its classes and structure.
- **Use semantic tokens**: Use the system's CSS variables and semantic theme tokens for colors, borders, and spacing instead of arbitrary hardcoded values.
- **Zero AI artifacts**: Never introduce purple glowing orbs, decorative emojis in action buttons/headers, or arbitrary non-standard border radii.
