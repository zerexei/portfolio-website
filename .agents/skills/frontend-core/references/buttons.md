## Core Philosophy & Constraints
- **Visual Hierarchy**: Single primary completion action per viewport (`bg-[#1976D2]`), paired with outline secondary or subtle ghost actions.
- **Strict Geometry**: Strict `rounded-lg` corner radius, `shadow-xs` micro-elevation, and `cursor-pointer`. Never use `rounded-full` or arbitrary pixel radii like `rounded-[4px]`.
- **Zero Decorative Emojis**: Never use emojis (e.g. sparkles, rocket, party) in button labels. Use clean Lucide SVG icons with `w-3.5 h-3.5`.
- **Accessibility & Interaction**: Include visible focus rings (`focus-visible:ring-2 focus-visible:ring-[#1976D2] focus-visible:outline-none`), `aria-busy` when loading, and disabled state styling (`disabled:opacity-50 disabled:cursor-not-allowed`).

## Production Boilerplate / Standard Pattern

```tsx
import React, { type FC, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'ghost' | 'icon';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
 variant?: ButtonVariant;
 size?: ButtonSize;
 isLoading?: boolean;
 leftIcon?: ReactNode;
 rightIcon?: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
 primary:
    'bg-[#1976D2] hover:bg-[#1565C0] active:bg-[#0D47A1] text-white shadow-xs border border-transparent',
 secondary:
    'border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-xs',
 destructive:
    'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white shadow-xs border border-transparent',
 ghost:
    'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent',
 icon:
    'p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent',
};

const sizeStyles: Record<ButtonSize, string> = {
 sm: 'px-2.5 py-1 text-[11px] gap-1',
 md: 'px-3.5 py-2 text-xs gap-1.5',
 lg: 'h-10 px-4 text-sm gap-2',
};

export const Button: FC<ButtonProps> = ({
 children,
 variant = 'primary',
 size = 'md',
 isLoading = false,
 leftIcon,
 rightIcon,
 disabled,
 className = '',
 ...props
}) => {
 const isIconOnly = variant === 'icon';

 return (
    <button
      {...props}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      className={`
        inline-flex items-center justify-center font-semibold rounded-lg
        transition-colors duration-150 cursor-pointer
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1976D2] focus-visible:ring-offset-1
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantStyles[variant]}
        ${!isIconOnly ? sizeStyles[size] : ''}
        ${className}
      `.trim()}
    >
      {isLoading ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
      ) : (
        leftIcon && <span className="shrink-0">{leftIcon}</span>
      )}
      {children && <span>{children}</span>}
      {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
 );
};

// Segmented View Switcher Pattern
export interface SegmentedTab {
 value: string;
 label: string;
}

export const SegmentedSwitcher: FC<{
 tabs: SegmentedTab[];
 activeTab: string;
 onChange: (value: string) => void;
}> = ({ tabs, activeTab, onChange }) => (
 <div className="inline-flex items-center p-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900 text-xs">
    {tabs.map((tab) => (
      <button
        key={tab.value}
        type="button"
        onClick={() => onChange(tab.value)}
        className={`
          px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer
          ${
            activeTab === tab.value
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }
        `}
      >
        {tab.label}
      </button>
    ))}
 </div>
);
```

## Forbidden Anti-Patterns
- **Pill Buttons (`rounded-full`)**: Using `rounded-full` for standard action buttons instead of strict `rounded-lg`.
- **Gratuitous Emojis**: Inserting decorative emojis like "Submit" or "Generate" with decorative icons/emojis. Use Lucide icons instead.
- **Missing Hover/Active States**: Omitting `:hover` and `:active` feedback states (`hover:bg-[#1565C0] active:bg-[#0D47A1]`).
- **Missing Cursor Pointer**: Failing to explicitly specify `cursor-pointer` on actionable controls.

## Verification & Testing
- **Visual Rhythm Check**: Assert button geometry uses `rounded-lg`, `shadow-xs`, and font sizes `text-xs` (standard) or `text-[11px]` (compact).
- **Disabled State Verification**: Test that `:disabled` buttons have `opacity-50`, `pointer-events-none` or `cursor-not-allowed`, and don't fire click events.
