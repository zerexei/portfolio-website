---
name: react
description: >-
 Use this skill whenever building, modifying, or testing React 19+ applications, functional components, custom hooks, React Router v8+ data routers, form validation with React Hook Form & Zod, Shadcn UI component integration, or Vitest component tests.
---


# React 19 & React Router v8+ Frontend Architecture Skill Registry

This document serves as the decision matrix and component pattern reference for AI agents building modern, high-performance web applications using React 19+ and React Router v8+.

---

## Tech Stack & Version Manifest

- **Core Library**: React 19+ (Hooks, Functional Components, Concurrent Rendering)
- **Routing Engine**: React Router v8+ Data Routers (`createBrowserRouter`, `RouterProvider`)
- **Type System**: TypeScript 5.x (Strict Type Declarations, Zero `any`)
- **Forms & Validation**: React Hook Form 7.x + Zod 3.x (`@hookform/resolvers/zod`)
- **UI Components & Styling**: Shadcn UI + Radix UI Primitives + Tailwind CSS 3.x / 4.x
- **HTTP Client**: Axios 1.x (Request/Response Interceptors, Circuit Breaker)
- **Testing Tools**: Vitest 3.x + `@testing-library/react` 16.x + Playwright 1.x

---

## Sub-Skill Deep Dive References

- **Functional Components**: [functional-components.md](./references/functional-components.md)
- **Custom Hooks**: [custom-hooks.md](./references/custom-hooks.md)
- **Component Design**: [component-design.md](./references/component-design.md)
- **Local & Global State**: [local-global-state.md](./references/local-global-state.md)
- **Axios API Client**: [axios-api-client.md](./references/axios-api-client.md)
- **React Router v8+**: [react-router.md](./references/react-router.md)
- **Navigation & Guards**: [navigation-and-guards.md](./references/navigation-and-guards.md)
- **React Hook Form & Zod**: [react-hook-form-zod.md](./references/react-hook-form-zod.md)
- **Shadcn UI**: [shadcn-ui.md](./references/shadcn-ui.md)
- **Vitest Testing Library**: [vitest-testing-library.md](./references/vitest-testing-library.md)
- **Playwright E2E**: [playwright.md](./references/playwright.md)
- **React Performance**: [react-performance.md](./references/react-performance.md)

---

## 1. React Architecture & Component Matrix

| Layer / Responsibility | Standard Pattern | Architectural Rule |
| :--- | :--- | :--- |
| **Component Architecture** | Pure Functional Components | Declare explicit prop interfaces (`FC<Props>`). Zero class components. |
| **Route Management** | React Router v8+ Data Routers | Define routes using `createBrowserRouter` with async route `loader` & `action` handlers. |
| **Form Management** | React Hook Form + Zod | Infer form schema types automatically via `z.infer<typeof schema>`. |
| **Global Client State** | Context API / Zustand | Keep state local whenever possible; lift to Zustand/Context for global tokens/themes. |
| **Async Data Fetching** | Custom Hooks + Axios | Isolate side-effects and API calls inside reusable custom hooks (`useOrders`). |
| **Automated Testing** | Vitest + Testing Library | Write user-centric unit/integration tests matching accessible roles (`getByRole`). |

---

## 2. Production Code Standard Pattern
<!-- Aligned with frontend-core design tokens: #1976D2 primary, rounded-lg, shadow-xs, cursor-pointer -->

```tsx
import React, { type FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';

const createOrderSchema = z.object({
 itemId: z.string().min(1, 'Item ID is required'),
 quantity: z.number().int().positive('Quantity must be greater than 0'),
});

type CreateOrderInput = z.infer<typeof createOrderSchema>;

interface OrderFormProps {
 onSubmit: (data: CreateOrderInput) => Promise<void>;
}

export const OrderForm: FC<OrderFormProps> = ({ onSubmit }) => {
 const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
 } = useForm<CreateOrderInput>({
    resolver: zodResolver(createOrderSchema),
 });

 return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          Item ID
        </label>
        <input
          {...register('itemId')}
          className="w-full h-10 px-3 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs focus:outline-none focus:ring-2 focus:ring-[#1976D2]"
        />
        {errors.itemId && (
          <p className="text-rose-500 text-xs mt-1 font-medium">{errors.itemId.message}</p>
        )}
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          Quantity
        </label>
        <input
          type="number"
          {...register('quantity', { valueAsNumber: true })}
          className="w-full h-10 px-3 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs focus:outline-none focus:ring-2 focus:ring-[#1976D2]"
        />
        {errors.quantity && (
          <p className="text-rose-500 text-xs mt-1 font-medium">{errors.quantity.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
        className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#1976D2] hover:bg-[#1565C0] active:bg-[#0D47A1] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1976D2]"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>Processing...</span>
          </>
        ) : (
          <span>Submit Order</span>
        )}
      </button>
    </form>
 );
};
```

---

## Forbidden Anti-Patterns

- **Legacy Class Components**: Writing `class Component extends React.Component` instead of functional components.
- **Implicit `any` Types**: Omitting TypeScript type definitions or suppressing lints with `// @ts-ignore`.
- **Inline CSS Styles**: Using `style={{ color: 'red' }}` instead of utility-first Tailwind classes.
- **Prop Drilling Beyond 3 Levels**: Passing state through multi-level component trees without Context or Zustand.

---

## Verification & Quality Assurance

- **Type Check Assertion**: `npx tsc --noEmit` asserting zero compilation errors.
- **Unit Test Execution**: `npx vitest run` validating component rendering and form validation behavior.
