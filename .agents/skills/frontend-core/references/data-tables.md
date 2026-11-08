## Core Philosophy & Constraints
- **Table Architecture**:
 -**Card Enclosure**: `bg-card border border-border rounded-xl shadow-xs overflow-hidden`
 -**Header (`thead`)**: `bg-neutral text-neutral-foreground font-semibold text-xs sticky top-0`
 -**Row Interaction**: `hover:bg-slate-50/60 hover:bg-neutral-hover/50 transition-colors divide-y divide-border`
- **Right-Aligned Numeric Integrity**: Monetary amounts, quantities, and numeric counters MUST be right-aligned with `text-right font-mono font-medium`.
- **Identifiers & Timestamps**: Always style IDs (`#INV-2041`) and timestamps in `font-mono`.
- **Status Badges**: Always use rectangular `rounded-md text-[10px] font-bold uppercase tracking-wider border shadow-xs` (never `rounded-full`).

## Production Boilerplate / Standard Pattern

```tsx
import React, { type FC } from 'react';
import { FileText } from 'lucide-react';

export interface InvoiceItem {
 id: string;
 invoiceNumber: string;
 clientName: string;
 status: 'paid' | 'pending' | 'overdue';
 amount: number;
}

export interface DataTableProps {
 data: InvoiceItem[];
 onViewInvoice?: (id: string) => void;
 page?: number;
 totalPages?: number;
 totalEntries?: number;
}

const statusBadgeStyles: Record<InvoiceItem['status'], string> = {
 paid: 'bg-success-tint text-success border-success-border',
 pending:
    'bg-warning-tint text-warning border-warning-border',
 overdue:
    'bg-danger-tint text-danger border-danger-border',
};

export const DataTable: FC<DataTableProps> = ({
 data,
 onViewInvoice,
 page = 1,
 totalEntries = 42,
}) => {
 return (
    <div className="bg-card border border-border rounded-xl shadow-xs overflow-hidden">
      {/* Header Control Bar */}
      <div className="p-4 border-b border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xs font-semibold text-foreground flex items-center gap-2">
            <FileText className="w-4 h-4 text-[var(--primary)]" />
            <span>Invoice Ledger</span>
          </h2>
          <p className="text-[11px] text-neutral-foreground mt-0.5">
            Audited commercial receivables and payment confirmations.
          </p>
        </div>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border text-left text-xs">
          <thead className="bg-neutral text-neutral-foreground font-semibold text-xs">
            <tr>
              <th scope="col" className="py-3 px-4">Invoice #</th>
              <th scope="col" className="py-3 px-4">Client</th>
              <th scope="col" className="py-3 px-4">Status</th>
              <th scope="col" className="py-3 px-4 text-right">Amount</th>
              <th scope="col" className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-card text-foreground">
            {data.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-slate-50/60 hover:bg-neutral-hover/50 transition-colors"
              >
                <td className="py-3.5 px-4 font-mono font-bold text-foreground">
                  {row.invoiceNumber}
                </td>
                <td className="py-3.5 px-4 font-medium text-foreground">
                  {row.clientName}
                </td>
                <td className="py-3.5 px-4">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md border shadow-xs ${statusBadgeStyles[row.status]}`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right font-mono font-bold text-foreground">
                  ${row.amount.toFixed(2)}
                </td>
                <td className="py-3.5 px-4 text-right whitespace-nowrap">
                  <button
                    type="button"
                    onClick={() => onViewInvoice?.(row.id)}
                    className="inline-flex items-center px-2.5 py-1 rounded-lg border border-border bg-card hover:bg-secondary-hover text-secondary-foreground text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td colSpan={5} className="py-12 text-center text-neutral-foreground italic text-xs">
                  No records match the current filter selection.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-3.5 border-t border-border flex items-center justify-between text-xs text-neutral-foreground bg-card-nested">
        <span>Showing 1 to {data.length} of {totalEntries} entries</span>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            className="px-2.5 py-1 rounded-lg border border-border bg-card text-xs font-medium shadow-xs disabled:opacity-50 cursor-pointer"
          >
            Previous
          </button>
          <button
            type="button"
            className="px-2.5 py-1 rounded-lg border border-border bg-card text-xs font-medium shadow-xs disabled:opacity-50 cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>
    </div>
 );
};
```

## Forbidden Anti-Patterns
- **Left-Aligned Financial Columns**: Omitting `text-right font-mono` on prices, currencies, and numeric quantities.
- **Pill Badges in Table Rows**: Using `rounded-full` pills that misalign with dense tabular data.
- **Missing Row Hover State**: Omitting subtle hover highlight (`hover:bg-slate-50/60 hover:bg-neutral-hover/50`).
- **Unbounded Table Overflow**: Forgetting `overflow-x-auto` wrapper causing horizontal page breaking on mobile.

## Verification & Testing
- **Alignment Audit**: Ensure all column numbers are right-aligned with `font-mono` and actions are right-aligned.
- **Empty State Test**: Verify the empty state renders properly with appropriate `colSpan` and centered muted text.
