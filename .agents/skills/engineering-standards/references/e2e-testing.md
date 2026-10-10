## Core Philosophy & Constraints
- **Critical Path Scenarios**: Limit E2E tests strictly to critical business workflows (signup, login, checkout, billing).
- **Accessible Locators First**: Always prefer user-facing accessible locators (`page.getByRole`, `page.getByLabel`, `page.getByText`) over CSS class or raw tag selectors.
- **Page Object Model (POM)**: Encapsulate all page interactions, locators, and navigations inside dedicated Page Object classes.
- **Tenant & State Isolation**: Tests MUST seed isolated tenant test data and run without depending on state from preceding test runs.
- **Zero Arbitrary Sleep**: Use auto-waiting assertions (`await expect(locator).toBeVisible()`); never use `page.waitForTimeout()`.

## Production Boilerplate / Standard Pattern

### Playwright Page Object & E2E Test
```typescript
// tests/e2e/pages/LoginPage.ts
import { type Page, type Locator } from '@playwright/test';

export class LoginPage {
 readonly page: Page;
 readonly emailInput: Locator;
 readonly passwordInput: Locator;
 readonly submitButton: Locator;

 constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByLabel(/email/i);
    this.passwordInput = page.getByLabel(/password/i);
    this.submitButton = page.getByRole('button', { name: /sign in|log in/i });
 }

 async goto(): Promise<void> {
    await this.page.goto('/login');
 }

 async login(email: string, pass: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(pass);
    await this.submitButton.click();
 }
}

// tests/e2e/auth.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

test.describe('Authentication Flows', () => {
 test('user can log in successfully and redirect to dashboard', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('user@example.com', 'SecurePass123!');
    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible();
 });
});
```

## Forbidden Anti-Patterns
- **Arbitrary Timeouts**: Calling `page.waitForTimeout(3000)` instead of web-first, auto-waiting assertions.
- **Brittle CSS / Tag Selectors**: Selecting via `input[name="..."]` or auto-generated classes instead of accessible roles and labels.
- **Shared Global State**: Sharing authentication tokens or tenant state between test specs causing order-dependent flakiness.
- **Over-Testing Unit Cases via E2E**: Testing every boundary regex or validation edge case via full browser automation.

## Verification & Testing
- **Execution Command**: `npx playwright test`
- **Report Check**: Assert HTML report generates with zero flaky retries in headless mode.
