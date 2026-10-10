## Core Philosophy & Constraints
- **Standardized Modal Anatomy**: Every modal consists of five distinct regions:
 1.**Backdrop**: `fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto`
 2.**Card Container**: `w-full max-w-[size] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg overflow-hidden my-8`
 3.**Header**: `p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between`
 4.**Body**: `p-5 space-y-4 text-xs max-h-[calc(100vh-14rem)] overflow-y-auto`
 5.**Footer**: `p-4 bg-slate-50/70 dark:bg-slate-800/40 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-2.5`
- **Width Scale**:
 -**Safeguard / Confirmations**: `max-w-sm` (Delete, Revoke, Clock Out)
 -**Standard Forms**: `max-w-md` or `max-w-lg` (Invite Member, Edit Record)
 -**Complex Wizards**: `max-w-3xl` or `max-w-4xl` (Invoice Builder, Settings)
- **Accessibility & Focus**: Set `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, trap focus inside modal, and close on Escape key.
- **Elevation**: Use `shadow-lg` combined with crisp 1px borders. Never use muddy `shadow-2xl`.

## Production Boilerplate / Standard Pattern

```tsx
import React, { type FC, type ReactNode, useEffect } from 'react';
import { X } from 'lucide-react';

export interface ModalProps {
 isOpen: boolean;
 onClose: () => void;
 title: string;
 description?: string;
 children: ReactNode;
 footerActions?: ReactNode;
 size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses: Record<NonNullable<ModalProps['size']>, string> = {
 sm: 'max-w-sm',
 md: 'max-w-md',
 lg: 'max-w-lg',
 xl: 'max-w-3xl',
};

export const Modal: FC<ModalProps> = ({
 isOpen,
 onClose,
 title,
 description,
 children,
 footerActions,
 size = 'md',
}) => {
 useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
 }, [isOpen, onClose]);

 if (!isOpen) return null;

 return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 overflow-y-auto"
    >
      <div
        className={`
          w-full ${sizeClasses[size]}
          bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800
          rounded-xl shadow-lg overflow-hidden my-8
        `.trim()}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 id="modal-title" className="text-sm font-bold text-slate-900 dark:text-white">
              {title}
            </h3>
            {description && (
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                {description}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4 text-xs max-h-[calc(100vh-14rem)] overflow-y-auto">
          {children}
        </div>

        {/* Footer */}
        {footerActions && (
          <div className="p-4 bg-slate-50/70 dark:bg-slate-800/40 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-2.5">
            {footerActions}
          </div>
        )}
      </div>
    </div>
 );
};

// Slide-Over Detail Drawer Pattern
export const SlideOverDrawer: FC<{
 isOpen: boolean;
 onClose: () => void;
 title: string;
 children: ReactNode;
}> = ({ isOpen, onClose, title, children }) => {
 if (!isOpen) return null;

 return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-y-0 right-0 z-50 w-full max-w-xl bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-xl flex flex-col"
    >
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">{title}</h3>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close drawer"
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
        {children}
      </div>
    </div>
 );
};
```

## Forbidden Anti-Patterns
- **Heavy Muddy Shadows (`shadow-2xl`)**: Applying unfocused dark drop shadows instead of `shadow-lg` with a 1px border.
- **Floating Unbounded Footers**: Leaving dialog footers without background tint (`bg-slate-50/70 dark:bg-slate-800/40`) and border separation.
- **Centered Action Buttons**: Centering footer buttons instead of right-aligning them (`justify-end gap-2.5`).
- **Missing Close Accessibility**: Dialogs without `Escape` key listeners or `aria-modal="true"`.

## Verification & Testing
- **Keyboard Dismissal**: Verify pressing `Escape` dismisses open dialogs.
- **Scroll Containment**: Verify long dialog bodies scroll smoothly inside `max-h-[calc(100vh-14rem)]` without scrolling the backdrop page.
