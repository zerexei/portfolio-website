## Core Philosophy & Constraints
- **Container Nesting Rhythm**: Strict 5-tier elevation prevents nested box fatigue:
 -**Level 0 (Canvas)**: `bg-[#F8FAFC]` or `bg-slate-50` (Light) / `bg-slate-950` (Dark)
 -**Level 1 (Root Card / Cluster)**: `bg-card border border-border rounded-xl shadow-xs`
 -**Level 2 (Cluster Well)**: `bg-card-nested border border-border rounded-xl p-4 shadow-xs`
 -**Level 3 (Nested Tile / Sub-card)**: `bg-card border border-border rounded-lg p-4 shadow-xs`
 -**Level 4 (Icon Box)**: `w-8 h-8 rounded-lg bg-accent text-primary flex items-center justify-center`
- **Mobile-First Responsive Design**: Write base styles for mobile viewports (`320px+`), then scale up via `sm:`, `md:`, `lg:`, `xl:`.
- **CSS Grid & Flexbox**: Use Flexbox for 1D alignments and CSS Grid for 2D multi-column dashboards.
- **Fluid Layouts**: Prefer fluid percentage, `fr` units, and container queries over rigid fixed pixel dimensions.

## Production Boilerplate / Standard Pattern

```html
<!-- Responsive Dashboard Layout (Mobile-First) -->
<div class="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
 <!-- Sidebar -->
 <aside class="w-full md:w-64 bg-card border-b md:border-b-0 md:border-r border-border p-4">
    <nav class="flex flex-row md:flex-col gap-1.5">
      <a href="#" class="px-3 py-2 rounded-lg bg-accent text-primary font-semibold text-xs shadow-xs">
        Operations
      </a>
      <a href="#" class="px-3 py-2 rounded-lg text-neutral-foreground hover:text-foreground hover:bg-neutral-hover text-xs font-medium transition-colors">
        Ledger
      </a>
    </nav>
 </aside>

 <!-- Main Content Canvas -->
 <main class="flex-1 p-6 space-y-6">
    <!-- Topbar Command Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
      <div>
        <h1 class="text-xl font-bold tracking-tight text-foreground">Workspace Overview</h1>
        <p class="text-xs text-neutral-foreground mt-0.5">Real-time resource utilization</p>
      </div>
    </div>

    <!-- Metric Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div class="bg-card border border-border rounded-xl p-4 shadow-xs">
        <span class="text-[11px] font-semibold text-neutral-foreground">Total Records</span>
        <p class="mt-2 text-2xl font-bold font-mono text-foreground">12,450</p>
      </div>
      <div class="bg-card border border-border rounded-xl p-4 shadow-xs">
        <span class="text-[11px] font-semibold text-neutral-foreground">Active Pipelines</span>
        <p class="mt-2 text-2xl font-bold font-mono text-foreground">8</p>
      </div>
      <div class="bg-card border border-border rounded-xl p-4 shadow-xs sm:col-span-2 lg:col-span-1">
        <span class="text-[11px] font-semibold text-neutral-foreground">System Latency</span>
        <p class="mt-2 text-2xl font-bold font-mono text-success">18ms</p>
      </div>
    </div>
 </main>
</div>
```

## Forbidden Anti-Patterns
- **Desktop-First Overrides**: Writing max-width overrides (`max-md:`) instead of mobile-first modifiers.
- **Fixed Container Heights**: Hardcoding `h-[800px]` causing text overflow on scaled viewports.
- **Uncontrolled Horizontal Spill**: Missing `overflow-x-auto` around wide data grids.
- **Missing Elevation Scale**: Mixing arbitrary drop shadows (`shadow-2xl`) or skipping container border outlines.

## Verification & Testing
- **Viewport Responsiveness**: Assert layout adapts seamlessly across 375px (Mobile), 768px (Tablet), and 1280px (Desktop).
