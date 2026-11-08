---
name: frontend-core
description: >-
 Use this skill whenever styling, designing, or implementing web interfaces, components (buttons, modals, dialogs, cards, tables, forms, badges, navigation), layouts, Tailwind CSS design tokens, typography, dark mode slate palettes, or WCAG AA accessibility. Strictly enforces Linear/Stripe/Notion aesthetic and eliminates AI artifacts (purple orbs, emojis, non-standard radii).
---

# Frontend Core & UI/UX Design System Skill Registry

This document serves as the master decision matrix, design system specification, and implementation reference for AI agents building modern B2B SaaS interfaces (Linear, Stripe Dashboard, and Notion aesthetic). It guarantees all pages, client portals, tables, forms, and administrative views adhere to strict mathematical rhythm, zero AI artifacts, accessible HTML5 semantics, and slate design token parity.

---

## Design System & Standards Manifest

- **Aesthetic Benchmark**: Modern B2B SaaS (Linear + Stripe Dashboard + Notion)
- **Styling Framework**: Tailwind CSS 3.4 / 4.0 (Semantic Tokens, Slate Neutrals, Micro-Elevation `shadow-xs`)
- **Type System & Language**: TypeScript 5.x (Strict Null Checks, Zero `any`, Explicit Prop & Event Contracts)
- **Iconography**: Lucide SVG Icons (`w-3.5 h-3.5` or `w-4 h-4`) — **Strictly Zero Decorative Emojis**
- **Accessibility Standard**: WAI-ARIA 1.2 / WCAG 2.1 AA Compliance (Semantic HTML5, Native Controls, Visible Focus Rings)
- **Dark Mode Strategy**: Class-based `.dark` with rich slate palettes (`slate-900` / `slate-950`, strictly no `#000000`)

---

## Sub-Skill Deep Dive References

### Component Manuals & Design Patterns
- **[Buttons & Action Controls](./references/buttons.md)**: Primary, outline, destructive, ghost, icon buttons, and segmented view switchers.
- **[Modals, Dialogs & Drawers](./references/modals-and-dialogs.md)**: Standard form dialogs, safeguard confirmations, and slide-over preview drawers.
- **[Data Tables & Tabular Ledgers](./references/data-tables.md)**: Dense tabular layouts, sticky headers, monospace numeric columns, and pagination.
- **[Cards, Containers & Stat Clusters](./references/cards-and-containers.md)**: 5-level container rhythm, KPI metric tiles, cluster wells, and Kanban cards.
- **[Forms & Input Controls](./references/forms-and-inputs.md)**: Text inputs, search inputs with inline icons, select dropdowns, and error banners.
- **[Badges, Chips & Status Indicators](./references/badges-and-tags.md)**: Rectangular `rounded-md` badges, monospace counter chips, and pulse dots.
- **[Navigation, Headers & Command Bars](./references/navigation.md)**: Linear-style collapsible sidebars, topbar command bars, and active tabs.

### Frontend Engineering Foundations
- **[Design System Tokens](./references/design-system-tokens.md)**: CSS variables, slate palettes, and brand color tokens.
- **[Layout & Responsiveness](./references/layout-and-responsiveness.md)**: Mobile-first responsive grids, flex layouts, and viewport rules.
- **[Semantic HTML & A11y](./references/semantic-html-a11y.md)**: Accessible landmarks, ARIA states, and keyboard navigation.
- **[Strict Type Declarations](./references/strict-type-declarations.md)**: Discriminated unions, generics, and strict TypeScript contracts.
- **[Async Concurrency](./references/async-concurrency.md)**: AbortController, race condition prevention, and settled promises.
- **[ESNext Patterns](./references/esnext-patterns.md)**: Immutable operations, `Object.groupBy`, and modern ECMAScript idioms.

---

## 1. Zero AI Artifacts (Mandatory Negative Constraints)

Always eliminate the telltale signs of AI-generated web interfaces:

- **No Glow Orbs**: NEVER use purple/violet gradients, floating neon orbs, or arbitrary `blur-3xl`/`blur-2xl` background spheres.
- **No Gratuitous Emojis**: NEVER prepend or append decorative emojis (e.g. sparkles, rocket, bulb, party) to buttons, modal headers, or alert banners. Use clean Lucide SVG icons instead.
- **No Muddy Shadows**: NEVER apply heavy `shadow-2xl` or unfocused drop shadows. Use crisp 1px borders (`border-border`) paired with subtle micro-shadows (`shadow-xs`).
- **No Indiscriminate Pill Badges**: NEVER use `rounded-full` for status tags, table counters, or labels. Reserve `rounded-full` strictly for user avatars and circular pulsing status indicator dots.
- **No Arbitrary Radii**: NEVER use arbitrary pixel values like `rounded-[4px]`, `rounded-[3px]`, or `rounded-[6px]`. Adhere strictly to the corner radius scale below.

---

## 2. Corner Radius & Elevation Hierarchy

Maintain strict mathematical rhythm across all UI elements:

| Element Type | Tailwind Radius | Tailwind Elevation | Border Specification |
| :--- | :--- | :--- | :--- |
| **Page Containers, Dashboard Cards, Modal Windows** | `rounded-xl` | `shadow-xs` (Cards) / `shadow-lg` (Modals) | `border border-border` |
| **Action Buttons, Form Inputs, Selects, Dropdowns** | `rounded-lg` | `shadow-xs` | `border border-border` (or brand border) |
| **Status Badges, Table Chips, Monospace Tags** | `rounded-md` | `shadow-xs` | `border border-current` (or semantic tint border) |
| **Inner Progress Bars, Sub-tracks** | `rounded-xs` or `rounded-sm` | None | None |
| **Avatars, Circular Status Indicator Dots** | `rounded-full` | None | Optional ring border |
| **Slide-over Drawers & Mobile Sidebars** | Flat edge on screen border | `shadow-xl` | `border-l` or `border-r border-border` |

---

## 3. Surface Tokens, Color Palette & Dark Mode Parity

All components must deliver first-class dark mode parity with deep slate tones (avoiding pitch black `#000000`).

### Surface Colors & Semantic Variables
Theme switching is driven entirely by CSS variables when `.dark` is toggled on `:root`. Always use semantic design tokens directly instead of redundant `dark:` utility prefixes:
- **Canvas / Body**: `bg-background text-foreground` (`--background` / `--foreground`)
- **Cards & Containers**: `bg-card` (`--card`)
- **Borders & Dividers**: `border-border` (`--border`)
- **Inset Wells / Sub-cards**: `bg-card-nested` (`--card-nested`)

### Brand Accent & Semantic System
Anchored on the **Sky Scale** (`#0284C7`), mapped to design tokens / semantic utilities:
- **Primary Brand**:
  - Semantic Class / Variable: `bg-primary text-primary-foreground` or `var(--primary)`
  - Light mode: `--sky-700` (`#0369a1`) | Hover: `--sky-800` (`#075985`) | Active: `--sky-900` (`#0c4a6e`)
  - Dark mode: `--sky-300` (`#7dd3fc`) | Hover: `--sky-400` (`#38bdf8`) | Active: `--sky-200` (`#bae6fd`)
- **Brand Sub-tint**: `bg-accent text-accent-foreground border-primary-border` (Light: `bg-sky-50 text-sky-700` / Dark: `bg-sky-950/60 text-sky-300 border-sky-800`)

### Semantic Feedback
- **Success / Paid / Active**: Emerald (`text-success`, `bg-success-tint`, `border-success-border`)
- **Warning / Triage / Pending**: Amber (`text-warning`, `bg-warning-tint`, `border-warning-border`)
- **Destructive / Overdue / Error**: Rose / Red (`text-danger`, `bg-danger-tint`, `border-danger-border`)

---

## 4. Typography & Monospace Rules

- **Headings & Titles**: Inter / System sans-serif (`font-bold text-foreground tracking-tight`).
- **Muted Descriptions**: `text-xs text-neutral-foreground font-medium`.
- **Numbers, Currency & Timestamps**: Always format financial amounts, percentages, invoice identifiers, and duration counters with `font-mono`.
- **Status Badges**: `px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md border shadow-xs`.

---

## 5. Component Decision Matrix

| Component Area | Standard Pattern | Architectural Rule |
| :--- | :--- | :--- |
| **Action Buttons** | `rounded-lg shadow-xs cursor-pointer` | One primary (`bg-primary text-primary-foreground` / `button-primary`) per view; secondary outline with `border-border`. Zero emojis. |
| **Modals & Dialogs** | 5-region structure with `backdrop-blur-xs` | Set `rounded-xl shadow-lg border`, right-align footer actions, bind Escape key. |
| **Data Tables** | Dense ledger wrapped in `rounded-xl` | Monospace right-aligned numeric data (`text-right font-mono`), row hover highlights, rectangular badges. |
| **Containers & Cards** | 5-level container rhythm | Root cards `rounded-xl`, sub-tiles `rounded-lg`, wells `bg-card-nested`. |
| **Form Inputs** | Single-line `h-9` or `h-10 rounded-lg` | Explicit focus rings (`focus:ring-1 focus:ring-primary focus:border-primary`), clear `<label htmlFor="...">`, structured error banners. |
| **Status Badges** | Rectangular `rounded-md border shadow-xs` | Always uppercase tracking (`text-[10px] font-bold uppercase tracking-wider`). Never pill-shaped. |
| **Navigation** | Collapsible sidebar + topbar telemetry | Active item in subtle blue tint (`bg-accent text-accent-foreground`), real-time status pulse dots. |

---

## 6. Production Code Standard Pattern

```tsx
import React, { type FC, type MouseEvent, useState } from 'react';
import { Save, Loader2, ArrowUpRight, TrendingUp } from 'lucide-react';

export interface MetricCardProps {
 id: string;
 title: string;
 amount: number;
 growthPercentage: number;
 status: 'active' | 'pending' | 'review';
 onAction?: (event: MouseEvent<HTMLButtonElement>) => Promise<void>;
}

export const MetricCard: FC<MetricCardProps> = ({
 id,
 title,
 amount,
 growthPercentage,
 status,
 onAction,
}) => {
 const [isProcessing, setIsProcessing] = useState(false);

 const handleAction = async (e: MouseEvent<HTMLButtonElement>) => {
    if (!onAction) return;
    setIsProcessing(true);
    try {
      await onAction(e);
    } finally {
      setIsProcessing(false);
    }
 };

 return (
    <div className="bg-card border border-border rounded-xl p-5 shadow-xs transition-all flex flex-col justify-between">
      {/* Top Header Region */}
      <div>
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-[10px] font-bold text-neutral-foreground bg-neutral px-1.5 py-0.5 rounded-md border border-border">
            {id}
          </span>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border shadow-xs bg-success-tint text-success border-success-border">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {status}
          </span>
        </div>

        <h3 className="text-xs font-semibold text-foreground mt-3">
          {title}
        </h3>

        {/* Monospace Financial Metric */}
        <div className="mt-2 flex items-baseline space-x-2">
          <span className="text-2xl font-bold font-mono text-foreground">
            ${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {/* Footer Telemetry & Action Region */}
      <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs">
        <span className="text-success font-semibold flex items-center">
          <TrendingUp className="w-3.5 h-3.5 mr-1" />
          +{growthPercentage.toFixed(1)}% vs benchmark
        </span>

        <button
          type="button"
          onClick={handleAction}
          disabled={isProcessing}
          aria-busy={isProcessing}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary hover:bg-primary-hover active:bg-primary-active text-primary-foreground text-xs font-semibold shadow-xs transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          {isProcessing ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <>
              <span>Review</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>
    </div>
 );
};
```

---

## 7. Forbidden Anti-Patterns

- **Use of Pill Badges (`rounded-full`)**: Applying `rounded-full` to text badges or table chips instead of `rounded-md`.
- **Gratuitous Emojis**: Inserting decorative emojis like ``, ``, ``, `` in buttons, headers, or alerts. Use Lucide icons instead.
- **AI Neon Orbs & Gradients**: Using violet/purple glowing gradients or `blur-3xl` background spheres.
- **Muddy Shadows**: Applying `shadow-2xl` or unstyled drop shadows instead of crisp 1px borders paired with `shadow-xs`.
- **Proportional Numbers**: Formatting currency, timestamps, or counters in variable-width sans-serif instead of `font-mono`.
- **Missing Cursor Pointer**: Failing to explicitly specify `cursor-pointer` on clickable buttons and interactive items.
- **Pitch Black Dark Mode**: Using pure `#000000` backgrounds instead of slate tones (`bg-slate-900` / `bg-slate-950`).
- **Arbitrary Corner Radii**: Using random pixel radii like `rounded-[4px]` or `rounded-[6px]` instead of the design system scale.

---

## 8. Pre-Flight UI Review & Quality Assurance Checklist

Before marking any UI implementation complete, verify:

- [ ] **Geometry Check**: Are buttons and inputs using `rounded-lg` with `shadow-xs`?
- [ ] **Container Rhythm**: Are cards using `rounded-xl border border-border shadow-xs`?
- [ ] **Badge Shape**: Are status badges rectangular (`rounded-md uppercase tracking-wider`) rather than pill-shaped?
- [ ] **Numeric Scannability**: Are all financial numbers, counters, percentages, and timestamps formatted with `font-mono`?
- [ ] **AI Artifact Removal**: Have all blur gradient orbs, heavy `shadow-2xl`, and decorative emojis (e.g. sparkles, rocket) been eliminated?
- [ ] **Dark Mode Balance**: Is dark mode implemented using deep slate surfaces (`bg-slate-900` / `bg-slate-950`) rather than pitch black?
- [ ] **Interactive Feedback**: Do all action buttons have `cursor-pointer`, `:hover`, `:active`, and focus rings (`focus-visible:ring-primary`)?
- [ ] **Accessibility (A11y)**: Do all interactive elements use semantic HTML (`<button>`, `<input>`, `<dialog>`) and pass WCAG 2.1 AA contrast?