## Core Philosophy & Constraints
- **Container Nesting Hierarchy**: Prevent "nested box" fatigue by following strict 5-level container rhythm:
 -**Level 0 (Canvas)**: `bg-[#F8FAFC]` or `bg-slate-50` (Light) / `bg-slate-950` (Dark)
 -**Level 1 (Root Card / Cluster)**: `bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs`
 -**Level 2 (Cluster Well)**: `bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs`
 -**Level 3 (Nested Tile / Sub-card)**: `bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-lg p-4 shadow-xs`
 -**Level 4 (Icon Box)**: `w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-[#1976D2] dark:text-blue-300 flex items-center justify-center`
- **Zero Heavy Shadows**: Replace muddy `shadow-2xl` with crisp 1px borders (`border-slate-200 dark:border-slate-800`) paired with subtle `shadow-xs`.
- **Monospace Financial & Metric Values**: All KPI numbers, percentages, and timestamps must use `font-mono`.
- **No Background Blur Orbs**: Never apply purple/violet or neon gradient spheres or `blur-3xl` backgrounds behind cards.

## Production Boilerplate / Standard Pattern

```tsx
import React, { type FC, type ReactNode } from 'react';
import { TrendingUp, Clock, LucideIcon } from 'lucide-react';

export interface StatCardProps {
 title: string;
 value: string;
 changeText: string;
 changePositive?: boolean;
 targetText?: string;
 icon: LucideIcon;
 iconBoxVariant?: 'blue' | 'emerald';
}

export const StatCard: FC<StatCardProps> = ({
 title,
 value,
 changeText,
 changePositive = true,
 targetText = 'vs target',
 icon: Icon,
 iconBoxVariant = 'emerald',
}) => {
 const iconBoxStyles =
    iconBoxVariant === 'emerald'
      ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400'
      : 'bg-blue-50 dark:bg-blue-950/50 text-[#1976D2] dark:text-blue-300';

 return (
    <div className="bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-lg p-4 flex flex-col justify-between shadow-xs">
      <div>
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            {title}
          </span>
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconBoxStyles}`}>
            <Icon className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline space-x-2">
          <span className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
            {value}
          </span>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
        <span
          className={`font-semibold flex items-center ${
            changePositive
              ? 'text-emerald-700 dark:text-emerald-400'
              : 'text-rose-600 dark:text-rose-400'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5 mr-1" />
          {changeText}
        </span>
        <span className="text-slate-400 font-medium">{targetText}</span>
      </div>
    </div>
 );
};

// Kanban Task Card Pattern
export interface KanbanCardProps {
 id: string;
 title: string;
 priority: 'low' | 'medium' | 'high';
 timeSpent: string;
 assigneeInitials: string;
}

export const KanbanCard: FC<KanbanCardProps> = ({
 id,
 title,
 priority,
 timeSpent,
 assigneeInitials,
}) => (
 <div className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs transition-all space-y-2.5 cursor-grab">
    <div className="flex items-start justify-between gap-2">
      <span className="font-mono text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded-md">
        {id}
      </span>
      <span
        className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${
          priority === 'high'
            ? 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-900'
            : 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300'
        }`}
      >
        {priority}
      </span>
    </div>

    <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-snug">{title}</h4>

    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
      <span className="flex items-center gap-1 font-mono">
        <Clock className="w-3 h-3 text-slate-400" />
        {timeSpent}
      </span>
      <div className="w-5 h-5 rounded-full bg-[#1976D2] text-white flex items-center justify-center text-[10px] font-bold">
        {assigneeInitials}
      </div>
    </div>
 </div>
);
```

## Forbidden Anti-Patterns
- **`rounded-2xl` on Cards**: Deviating from the mathematical rhythm (`rounded-xl` for containers, `rounded-lg` for sub-cards).
- **Heavy Drop Shadows (`shadow-2xl`, `shadow-xl`)**: Applying unfocused dark shadows instead of crisp 1px borders with `shadow-xs`.
- **Glowing Neon Orbs**: Injecting `blur-3xl` or radial gradient blobs into container backgrounds.
- **Borderless Sub-Cards**: Rendering nested cards without 1px border separation inside cluster wells.

## Verification & Testing
- **Visual Scale Audit**: Verify outer containers use `rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs`.
- **Numeric Font Audit**: Ensure all monetary, percentage, and counter values render with `font-mono`.
