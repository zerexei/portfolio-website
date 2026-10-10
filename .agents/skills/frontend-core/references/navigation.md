## Core Philosophy & Constraints
- **Unobtrusive Navigation**: Navigation establishes the mental model of the SaaS app without overpowering content. Keep borders razor-thin (`border-slate-200 dark:border-slate-800`) and elevations restrained.
- **Collapsible Sidebar Architecture (Linear/Notion)**:
 - Width: `w-64` (expanded) or `w-20` (compact).
 - Background & Border: `bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800`.
 - Active Item: `bg-blue-50 dark:bg-blue-950/60 text-[#1976D2] dark:text-blue-300 font-semibold shadow-xs`.
 - Inactive Item: `text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800`.
- **Topbar Command Headers**: Pair high-contrast page titles (`text-xl font-bold tracking-tight text-slate-900 dark:text-white`) with muted operational metadata and real-time status pulses (`w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse`).

## Production Boilerplate / Standard Pattern

```tsx
import React, { type FC, type ReactNode } from 'react';
import { LucideIcon, RefreshCw } from 'lucide-react';

export interface NavItem {
 label: string;
 href: string;
 icon: LucideIcon;
 badgeCount?: number;
}

export const SidebarNavLink: FC<{
 item: NavItem;
 isActive: boolean;
 isCollapsed?: boolean;
}> = ({ item, isActive, isCollapsed = false }) => {
 const Icon = item.icon;

 return (
    <a
      href={item.href}
      className={`
        group flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150
        ${
          isActive
            ? 'bg-blue-50 dark:bg-blue-950/60 text-[#1976D2] dark:text-blue-300 font-semibold shadow-xs'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
        }
      `.trim()}
    >
      <Icon
        className={`w-4 h-4 shrink-0 transition-colors ${
          isActive
            ? 'text-[#1976D2] dark:text-blue-400'
            : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'
        }`}
      />
      {!isCollapsed && <span className="truncate flex-1">{item.label}</span>}
      {!isCollapsed && item.badgeCount !== undefined && (
        <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold border border-slate-200 dark:border-slate-700 shadow-xs">
          {item.badgeCount}
        </span>
      )}
    </a>
 );
};

// Command Bar with Live Telemetry Pulse
export const CommandBarHeader: FC<{
 title: string;
 timestamp: string;
 onSync?: () => void;
 actions?: ReactNode;
}> = ({ title, timestamp, onSync, actions }) => (
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
    <div>
      <div className="flex items-center space-x-2">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
        <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
          {title}
        </h1>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2 font-medium">
        <span>{timestamp}</span>
        <span className="inline-block w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
        <span>Real-Time Operational Telemetry</span>
      </p>
    </div>

    <div className="flex items-center space-x-2">
      {onSync && (
        <button
          type="button"
          onClick={onSync}
          className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-xs transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
          <span>Sync</span>
        </button>
      )}
      {actions}
    </div>
 </div>
);
```

## Forbidden Anti-Patterns
- **Floating Navigation Tabs**: Rendering active links without solid container bounds or subtle tint indication.
- **Heavy Mobile Sidebar Shadows**: Applying `shadow-2xl` on mobile drawers instead of `shadow-xl` with crisp 1px borders.
- **Missing Active State Semantics**: Failing to visually distinguish current page link from hover states.

## Verification & Testing
- **Active Route Highlighting**: Verify current page highlights with `bg-blue-50 dark:bg-blue-950/60` and `text-[#1976D2]`.
- **Sidebar Collapse Smoothness**: Ensure transitions between expanded (`w-64`) and compact (`w-20`) maintain alignment.
