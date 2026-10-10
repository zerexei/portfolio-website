## Core Philosophy & Constraints
- **Precision Input Geometry**: Standard single-line inputs must strictly use `h-9` (compact) or `h-10` (standard) with `rounded-lg`. Never use arbitrary `rounded-[4px]` or `rounded-[3px]`.
- **Brand Focus States**: Use `focus:border-[#1976D2] focus:ring-1 focus:ring-[#1976D2] focus:outline-none`. Never rely on default browser focus rings or suppress focus indicators without replacement.
- **Surface Contrast**: Default to `border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500`.
- **Accessibility & Association**: Every form field must be associated with a descriptive `<label htmlFor="...">`, have clear `aria-invalid` and `aria-describedby` attributes on validation failures, and provide non-distracting visual error banners.

## Production Boilerplate / Standard Pattern

```tsx
import React, { type FC, type InputHTMLAttributes, type SelectHTMLAttributes } from 'react';
import { Search, AlertCircle } from 'lucide-react';

export interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
 label: string;
 error?: string;
}

export const FormInput: FC<FormInputProps> = ({
 id,
 label,
 error,
 required,
 className = '',
 ...props
}) => {
 const inputId = id || label.toLowerCase().replace(/\s+/g, '-');

 return (
    <div className="space-y-1.5">
      <label htmlFor={inputId} className="text-xs font-semibold text-slate-700 dark:text-slate-300">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      <input
        id={inputId}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className={`
          h-9 w-full rounded-lg border px-3 text-xs
          bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500
          transition-all focus:outline-none
          ${
            error
              ? 'border-rose-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
              : 'border-slate-200 dark:border-slate-700 focus:border-[#1976D2] focus:ring-1 focus:ring-[#1976D2]'
          }
          ${className}
        `.trim()}
        {...props}
      />
      {error && (
        <p id={`${inputId}-error`} className="text-[11px] font-medium text-rose-600 dark:text-rose-400">
          {error}
        </p>
      )}
    </div>
 );
};

// Search Input with Inline Icon
export const SearchInput: FC<{
 value: string;
 onChange: (val: string) => void;
 placeholder?: string;
}> = ({ value, onChange, placeholder = 'Filter records...' }) => (
 <div className="relative w-full max-w-xs">
    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
    <input
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="h-9 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 pl-9 pr-3 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:border-[#1976D2] focus:ring-1 focus:ring-[#1976D2] focus:outline-none shadow-xs"
    />
 </div>
);

// Form Error Callout Banner
export const FormErrorBanner: FC<{ errors: string[] }> = ({ errors }) => {
 if (!errors.length) return null;

 return (
    <div className="p-3.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border-l-4 border-rose-500 dark:border-rose-600 text-rose-800 dark:text-rose-300 text-xs space-y-1 shadow-xs">
      <div className="font-semibold flex items-center gap-1.5">
        <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
        <span>Validation Errors</span>
      </div>
      <ul className="list-disc pl-5 space-y-0.5 text-[11px]">
        {errors.map((err, idx) => (
          <li key={idx}>{err}</li>
        ))}
      </ul>
    </div>
 );
};
```

## Forbidden Anti-Patterns
- **Missing Labels**: Using inputs without associated `<label htmlFor="...">` or `aria-label`.
- **Removing Focus Rings**: Applying `outline-none` without `focus:ring-1 focus:ring-[#1976D2]`.
- **Borderless Form Fields**: Using flat backgrounds without a crisp 1px border.
- **Arbitrary Corner Radii**: Using `rounded-[3px]` or `rounded-[5px]` instead of `rounded-lg`.

## Verification & Testing
- **Keyboard Traversal**: Tab through all form controls ensuring high-visibility blue focus rings appear.
- **A11y Label Verification**: Inspect rendered DOM ensuring all inputs have programmatic label association.
