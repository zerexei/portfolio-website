## Core Philosophy & Constraints
- **Visual Hierarchy**: Single primary completion action per viewport (`bg-primary text-primary-foreground` or `.button-primary`), paired with outline secondary or subtle ghost actions.
- **Strict Geometry**: Strict `rounded-lg` corner radius, `shadow-xs` micro-elevation, and `cursor-pointer`. Never use `rounded-full` or arbitrary pixel radii like `rounded-[4px]`.
- **Zero Decorative Emojis**: Never use emojis (e.g. sparkles, rocket, party) in button labels. Use clean Lucide SVG icons with `w-3.5 h-3.5`.
- **Accessibility & Interaction**: Include visible focus rings (`focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none`), `aria-busy` when loading, and disabled state styling (`disabled:opacity-50 disabled:cursor-not-allowed`).

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
    'bg-primary hover:bg-primary-hover active:bg-primary-active text-primary-foreground shadow-xs border border-transparent',
  secondary:
    'border border-border bg-card text-secondary-foreground hover:bg-secondary-hover shadow-xs',
  destructive:
    'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white shadow-xs border border-transparent',
  ghost:
    'text-neutral-foreground hover:text-foreground hover:bg-neutral-hover border border-transparent',
  icon:
    'p-1.5 text-slate-400 hover:text-slate-600 hover:text-foreground hover:bg-neutral-hover border border-transparent',
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
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1
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
  <div className="inline-flex items-center p-1 rounded-lg border border-border bg-neutral text-xs">
    {tabs.map((tab) => (
      <button
        key={tab.value}
        type="button"
        onClick={() => onChange(tab.value)}
        className={`
          px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer
          ${
            activeTab === tab.value
              ? 'bg-card text-foreground shadow-xs'
              : 'text-slate-500 hover:text-slate-800 hover:text-foreground'
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
- **Missing Hover/Active States**: Omitting `:hover` and `:active` feedback states (`hover:bg-primary-hover active:bg-primary-active`).
- **Missing Cursor Pointer**: Failing to explicitly specify `cursor-pointer` on actionable controls.

## Verification & Testing
- **Visual Rhythm Check**: Assert button geometry uses `rounded-lg`, `shadow-xs`, and font sizes `text-xs` (standard) or `text-[11px]` (compact).
- **Disabled State Verification**: Test that `:disabled` buttons have `opacity-50`, `pointer-events-none` or `cursor-not-allowed`, and don't fire click events.
