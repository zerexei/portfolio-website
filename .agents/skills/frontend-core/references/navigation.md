## Core Philosophy & Constraints
- **Unobtrusive Navigation**: Navigation establishes the mental model of the SaaS app without overpowering content. Keep borders razor-thin (`border-border`) and elevations restrained.
- **Collapsible Sidebar Architecture (Linear/Notion)**:
 - Width: `w-64` (expanded) or `w-20` (compact).
 - Background & Border: `bg-card border-r border-border`.
 - Active Item: `bg-accent text-primary font-semibold shadow-xs`.
 - Inactive Item: `text-neutral-foreground hover:text-foreground hover:bg-neutral-hover`.
- **Topbar Command Headers**: Pair high-contrast page titles (`text-xl font-bold tracking-tight text-foreground`) with muted operational metadata and real-time status pulses (`w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse`).

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
            ? 'bg-accent text-primary font-semibold shadow-xs'
            : 'text-neutral-foreground hover:text-foreground hover:bg-neutral-hover'
        }
      `.trim()}
    >
      <Icon
        className={`w-4 h-4 shrink-0 transition-colors ${
          isActive
            ? 'text-primary'
            : 'text-slate-400 group-hover:text-slate-600 group-hover:text-foreground'
        }`}
      />
      {!isCollapsed && <span className="truncate flex-1">{item.label}</span>}
      {!isCollapsed && item.badgeCount !== undefined && (
        <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-md bg-neutral text-neutral-foreground font-bold border border-border shadow-xs">
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
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
    <div>
      <div className="flex items-center space-x-2">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
        <h1 className="text-xl font-bold tracking-tight text-foreground">
          {title}
        </h1>
      </div>
      <p className="text-xs text-neutral-foreground mt-1 flex items-center gap-2 font-medium">
        <span>{timestamp}</span>
        <span className="inline-block w-1 h-1 rounded-full bg-neutral-foreground/40" />
        <span>Real-Time Operational Telemetry</span>
      </p>
    </div>

    <div className="flex items-center space-x-2">
      {onSync && (
        <button
          type="button"
          onClick={onSync}
          className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-lg border border-border bg-card text-xs font-semibold text-secondary-foreground hover:bg-secondary-hover shadow-xs transition-colors cursor-pointer"
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
- **Active Route Highlighting**: Verify current page highlights with `bg-accent` and `text-[var(--primary)]`.
- **Sidebar Collapse Smoothness**: Ensure transitions between expanded (`w-64`) and compact (`w-20`) maintain alignment.
