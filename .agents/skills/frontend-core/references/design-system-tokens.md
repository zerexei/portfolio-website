## Core Philosophy & Constraints
- **Palette Parity**: Enforce dark mode parity using rich slate neutrals (`slate-50` to `slate-950`), completely avoiding pitch black (`#000000`).
- **Brand Accent Geometry**:
 - Primary Blue: `#1976D2`
 - Hover Blue: `#1565C0`
 - Active Blue: `#0D47A1`
 - Subtle Tint: `bg-blue-50 dark:bg-blue-950/60 text-[#1976D2] dark:text-blue-300 border-blue-200 dark:border-blue-800`
- **Semantic Feedback Tokens**:
 - Success / Active: Emerald (`bg-emerald-50 dark:bg-emerald-950/60`, `text-emerald-700 dark:text-emerald-300`, `border-emerald-200 dark:border-emerald-800`)
 - Warning / Pending: Amber (`bg-amber-50 dark:bg-amber-950/60`, `text-[#ED6C02] dark:text-amber-300`, `border-amber-200 dark:border-amber-800`)
 - Destructive / Error: Rose (`bg-rose-50 dark:bg-rose-950/60`, `text-[#D32F2F] dark:text-rose-300`, `border-rose-200 dark:border-rose-900`)
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
    --primary: #1976D2;
    --primary-hover: #1565C0;
    --primary-active: #0D47A1;
    --primary-tint: #EFF6FF;
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
    --primary: #1976D2;
    --primary-hover: #1565C0;
    --primary-active: #0D47A1;
    --primary-tint: rgba(23, 37, 84, 0.6);
    --foreground: #F8FAFC;
    --muted-foreground: #94A3B8;
 }
}
```

```html
<!-- Component using Slate Design Tokens -->
<div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
 <div class="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
    <h3 class="text-xs font-semibold text-slate-900 dark:text-white">Workspace Quota</h3>
    <span class="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shadow-xs">
      Healthy
    </span>
 </div>
 <p class="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">
    Current production billing cycle telemetry.
 </p>
 <button class="mt-4 px-3.5 py-2 rounded-lg bg-[#1976D2] hover:bg-[#1565C0] active:bg-[#0D47A1] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer">
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
- **Contrast Ratios**: Check that `#1976D2` on white has sufficient contrast for headlines/buttons, and badge text passes WCAG AA.
- **Theme Switching**: Test toggling `.dark` class on root `<html>` ensuring smooth transition without flash of unstyled theme.
