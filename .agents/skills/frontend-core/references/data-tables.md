## Core Philosophy & Constraints
- **Table Architecture**:
 -**Card Enclosure**: `bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs overflow-hidden`
 -**Header (`thead`)**: `bg-slate-50 dark:bg-slate-800/70 text-slate-500 dark:text-slate-400 font-semibold text-xs sticky top-0`
 -**Row Interaction**: `hover:bg-slate-50/60 dark:hover:bg-slate-800/50 transition-colors divide-y divide-slate-100 dark:divide-slate-800`
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
 paid: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
 pending:
    'bg-amber-50 dark:bg-amber-950/60 text-[#ED6C02] dark:text-amber-300 border-amber-200 dark:border-amber-800',
 overdue:
    'bg-rose-50 dark:bg-rose-950/60 text-[#D32F2F] dark:text-rose-300 border-rose-200 dark:border-rose-900',
};

export const DataTable: FC<DataTableProps> = ({
 data,
 onViewInvoice,
 page = 1,
 totalEntries = 42,
}) => {
 return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs overflow-hidden">
      {/* Header Control Bar */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xs font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#1976D2]" />
            <span>Invoice Ledger</span>
          </h2>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            Audited commercial receivables and payment confirmations.
          </p>
        </div>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 text-left text-xs">
          <thead className="bg-slate-50 dark:bg-slate-800/70 text-slate-500 dark:text-slate-400 font-semibold text-xs">
            <tr>
              <th scope="col" className="py-3 px-4">Invoice #</th>
              <th scope="col" className="py-3 px-4">Client</th>
              <th scope="col" className="py-3 px-4">Status</th>
              <th scope="col" className="py-3 px-4 text-right">Amount</th>
              <th scope="col" className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300">
            {data.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-slate-50/60 dark:hover:bg-slate-800/50 transition-colors"
              >
                <td className="py-3.5 px-4 font-mono font-bold text-slate-900 dark:text-white">
                  {row.invoiceNumber}
                </td>
                <td className="py-3.5 px-4 font-medium text-slate-900 dark:text-slate-100">
                  {row.clientName}
                </td>
                <td className="py-3.5 px-4">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md border shadow-xs ${statusBadgeStyles[row.status]}`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900 dark:text-white">
                  ${row.amount.toFixed(2)}
                </td>
                <td className="py-3.5 px-4 text-right whitespace-nowrap">
                  <button
                    type="button"
                    onClick={() => onViewInvoice?.(row.id)}
                    className="inline-flex items-center px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td colSpan={5} className="py-12 text-center text-slate-500 dark:text-slate-400 italic text-xs">
                  No records match the current filter selection.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-3.5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-800/40">
        <span>Showing 1 to {data.length} of {totalEntries} entries</span>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium shadow-xs disabled:opacity-50 cursor-pointer"
          >
            Previous
          </button>
          <button
            type="button"
            className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium shadow-xs disabled:opacity-50 cursor-pointer"
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
- **Missing Row Hover State**: Omitting subtle hover highlight (`hover:bg-slate-50/60 dark:hover:bg-slate-800/50`).
- **Unbounded Table Overflow**: Forgetting `overflow-x-auto` wrapper causing horizontal page breaking on mobile.

## Verification & Testing
- **Alignment Audit**: Ensure all column numbers are right-aligned with `font-mono` and actions are right-aligned.
- **Empty State Test**: Verify the empty state renders properly with appropriate `colSpan` and centered muted text.
