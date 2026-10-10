## Core Philosophy & Constraints
- **Rectangular Geometry**: Use strict `rounded-md` with `shadow-xs` for status tags, table counters, and categorical labels. Unlike consumer apps, modern B2B SaaS interfaces avoid `rounded-full` pill badges for clean spatial alignment.
- **Typography & Tracking**: Strictly use `text-[10px] font-bold uppercase tracking-wider`.
- **Border Requirement**: Always enforce a 1px border matching the semantic tint to guarantee high contrast in both light and dark modes.
- **Status Dots & Counters**: `rounded-full` is reserved strictly for status indicator dots (`w-1.5 h-1.5 animate-pulse`) and user avatars. Numeric counters and timestamps must always use `font-mono`.

## Production Boilerplate / Standard Pattern

```tsx
import React, { type FC, type ReactNode } from 'react';

export type BadgeVariant = 'success' | 'warning' | 'destructive' | 'info' | 'neutral';

export interface BadgeProps {
 children: ReactNode;
 variant?: BadgeVariant;
 withPulseDot?: boolean;
 isMono?: boolean;
 className?: string;
}

const badgeVariantStyles: Record<BadgeVariant, { container: string; dot: string }> = {
 success: {
    container:
      'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    dot: 'bg-emerald-500',
 },
 warning: {
    container:
      'bg-amber-50 dark:bg-amber-950/60 text-[#ED6C02] dark:text-amber-300 border-amber-200 dark:border-amber-800',
    dot: 'bg-amber-500',
 },
 destructive: {
    container:
      'bg-rose-50 dark:bg-rose-950/60 text-[#D32F2F] dark:text-rose-300 border-rose-200 dark:border-rose-900',
    dot: 'bg-rose-500',
 },
 info: {
    container:
      'bg-blue-50 dark:bg-blue-950/60 text-[#1976D2] dark:text-blue-300 border-blue-200 dark:border-blue-800',
    dot: 'bg-blue-500',
 },
 neutral: {
    container:
      'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700',
    dot: 'bg-slate-400',
 },
};

export const Badge: FC<BadgeProps> = ({
 children,
 variant = 'neutral',
 withPulseDot = false,
 isMono = false,
 className = '',
}) => {
 const styles = badgeVariantStyles[variant];

 return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md
        text-[10px] font-bold uppercase tracking-wider border shadow-xs
        ${isMono ? 'font-mono' : ''}
        ${styles.container}
        ${className}
      `.trim()}
    >
      {withPulseDot && (
        <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${styles.dot}`} />
      )}
      <span>{children}</span>
    </span>
 );
};

// Telemetry Monospace Elapsed Chip
export const ElapsedChip: FC<{ elapsed: string }> = ({ elapsed }) => (
 <span className="px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-mono font-bold text-xs inline-flex items-center shadow-xs">
    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse mr-1.5" />
    {elapsed}
 </span>
);
```

## Forbidden Anti-Patterns
- **Pill-Shaped Status Badges (`rounded-full`)**: Applying `rounded-full` to text badges or table chips instead of `rounded-md`.
- **Missing Uppercase & Tracking**: Using lowercase or standard tracking on status indicators.
- **Borderless Badges**: Omitting 1px tinted borders causing badges to wash out on dark backgrounds.
- **Proportional Numbers**: Formatting status counters or elapsed durations in standard sans-serif instead of `font-mono`.

## Verification & Testing
- **Visual Inspection**: Verify all badges render with `rounded-md`, `border`, `shadow-xs`, and `uppercase tracking-wider`.
- **Contrast Check**: Verify text-to-background contrast exceeds WCAG AA (4.5:1) in both light and dark themes.
