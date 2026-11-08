## Core Philosophy & Constraints
- **Palette Parity**: Enforce dark mode parity using rich slate neutrals (`slate-50` to `slate-950`), completely avoiding pitch black (`#000000`).
- **Brand Accent Geometry**:
  - Primary Brand Anchor: Sky / Ocean Blue (`#0284C7`)
  - Semantic Class / Token: `bg-primary text-primary-foreground` or `var(--primary)`
  - Light mode: `--sky-700` (`#0369a1`) | Hover: `--sky-800` (`#075985`) | Active: `--sky-900` (`#0c4a6e`)
  - Dark mode: `--sky-300` (`#7dd3fc`) | Hover: `--sky-400` (`#38bdf8`) | Active: `--sky-200` (`#bae6fd`)
  - Subtle Tint: `bg-accent text-accent-foreground border-primary-border` (Light: `bg-sky-50 text-sky-700` / Dark: `bg-sky-950/60 text-sky-300 border-sky-800`)
- **Semantic Feedback Tokens**:
  - Success / Active: Emerald (`bg-success-tint`, `text-success`, `border-success-border`)
  - Warning / Pending: Amber (`bg-warning-tint`, `text-warning`, `border-warning-border`)
  - Destructive / Error: Rose (`bg-danger-tint`, `text-danger`, `border-danger-border`)
- **Corner Radius Scale**:
  - Page containers, cards, modals: `rounded-xl`
  - Action buttons, form inputs, selects: `rounded-lg`
  - Badges, table chips, tags: `rounded-md`
  - Avatars, pulse indicator dots: `rounded-full`

## Production Boilerplate / Standard Pattern

```css
/* index.css - Design Tokens (Tailwind v3 / v4 compatible) */
@layer base {
 :root {
    --canvas: #F8FAFC;
    --card: #FFFFFF;
    --card-nested: rgba(248, 250, 252, 0.7);
    --border: #E2E8F0;
    --primary: #0369A1;        /* sky-700 */
    --primary-hover: #075985;  /* sky-800 */
    --primary-active: #0C4A6E; /* sky-900 */
    --primary-foreground: #FFFFFF;
    --primary-tint: #F0F9FF;   /* sky-50 */
    --primary-border: #BAE6FD; /* sky-200 */
    --foreground: #0F172A;
    --muted-foreground: #64748B;
    --radius-card: 0.75rem;   /* rounded-xl */
    --radius-input: 0.5rem;   /* rounded-lg */
    --radius-badge: 0.375rem; /* rounded-md */
 }

 .dark {
    --canvas: #020617;
    --card: #0F172A;
    --card-nested: rgba(30, 41, 59, 0.4);
    --border: #1E293B;
    --primary: #7DD3FC;        /* sky-300 */
    --primary-hover: #38BDF8;  /* sky-400 */
    --primary-active: #BAE6FD; /* sky-200 */
    --primary-foreground: #020617;
    --primary-tint: rgba(8, 47, 73, 0.6); /* sky-950/60 */
    --primary-border: #075985; /* sky-800 */
    --foreground: #F8FAFC;
    --muted-foreground: #94A3B8;
 }
}
```

```html
<!-- Component using Slate Design Tokens -->
<div class="bg-card border border-border rounded-xl p-5 shadow-xs">
 <div class="flex items-center justify-between pb-3 border-b border-border">
    <h3 class="text-xs font-semibold text-foreground">Workspace Quota</h3>
    <span class="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-success-tint text-success border border-success-border shadow-xs">
      Healthy
    </span>
 </div>
 <p class="text-xs text-neutral-foreground mt-2 font-medium">
    Current production billing cycle telemetry.
 </p>
 <button class="mt-4 px-3.5 py-2 rounded-lg bg-primary hover:bg-primary-hover active:bg-primary-active text-primary-foreground text-xs font-semibold shadow-xs transition-colors cursor-pointer">
    Adjust Quota
 </button>
</div>
```

## Forbidden Anti-Patterns
- **Pitch Black Dark Mode**: Using pure `#000000` backgrounds instead of balanced deep slates (`bg-slate-950` / `bg-slate-900`).
- **Arbitrary Corner Radii**: Using random radius classes like `rounded-[4px]`, `rounded-[6px]`, or `rounded-[10px]`.
- **Neon Glow Gradients**: Using violet/purple glowing gradients or radial background blobs.
- **Muddy Heavy Shadows**: Applying `shadow-2xl` or unstyled drop shadows instead of `shadow-xs` paired with crisp 1px borders.

## Verification & Testing
- **Contrast Ratios**: Check that primary button text has sufficient contrast, and badge text passes WCAG AA across light and dark modes.
- **Theme Switching**: Test toggling `.dark` class on root `<html>` ensuring smooth transition without flash of unstyled theme.
