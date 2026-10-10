## Core Philosophy & Constraints
- **Uncontrolled Inputs with RHF**: Use React Hook Form (`useForm`) for high-performance form state management.
- **Zod Schema Resolver**: Integrate schema validation strictly via `@hookform/resolvers/zod`.
- **Inferred Types**: Derive form values type using `z.infer<typeof schema>`.

## Production Boilerplate / Standard Pattern

```tsx
import React, { type FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const formSchema = z.object({
 email: z.string().email('Invalid email address'),
 password: z.string().min(8, 'Password must be at least 8 characters'),
});

type FormValues = z.infer<typeof formSchema>;

interface LoginFormProps {
 onSubmitAction: (data: FormValues) => Promise<void>;
}

export const LoginForm: FC<LoginFormProps> = ({ onSubmitAction }) => {
 const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
 } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', password: '' },
 });

 const onSubmit = async (data: FormValues) => {
    await onSubmitAction(data);
 };

 return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-sm bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Email</label>
        <input
          {...register('email')}
          type="email"
          className="w-full h-10 px-3 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs focus:outline-none focus:ring-2 focus:ring-[#1976D2]"
        />
        {errors.email && <p className="text-rose-500 text-xs mt-1 font-medium">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Password</label>
        <input
          {...register('password')}
          type="password"
          className="w-full h-10 px-3 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs focus:outline-none focus:ring-2 focus:ring-[#1976D2]"
        />
        {errors.password && <p className="text-rose-500 text-xs mt-1 font-medium">{errors.password.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
        className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#1976D2] hover:bg-[#1565C0] active:bg-[#0D47A1] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1976D2]"
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
 );
};
```

## Forbidden Anti-Patterns
- **Controlled `useState` Form Lists**: Storing every keystroke in component state (`const [email, setEmail] = useState('')`).
- **Manual Field Validation Logic**: Writing custom `if (email.length < 5)` logic inside submit handlers.
- **Untyped `useForm`**: Calling `useForm()` without passing explicit generic type constraints.

## Verification & Testing
- **React Testing Library Form Test**: Fill out form with RTL `userEvent.type()`, submit, and assert error message displays when fields are invalid.
