# Workspace Rules: .agents/AGENTS.md

## Core Philosophy & Constraints
- **Agent Execution Governance**: Enforce architectural discipline, zero-hallucination source inspection, and test-driven verification across all software engineering phases.
- **Strict Verification Protocol**: Never mark tasks complete without executing target test suites (`pytest`, `pest`, `vitest`) and static linters (`ruff`, `phpstan`, `tsc`).
- **Zero-Hallucination Policy**: Prohibit referencing file paths, model fields, DB schemas, or API routes without first inspecting the authoritative local source files.
- **Domain Decoupling**: Strictly separate HTTP transport layers (APIRouter / Controllers) from core business logic (Services / Actions) and persistence models.
- **Fail-Safe Tenancy**: Enforce `tenant_id` scoping across all database queries, mutations, and resource lookups.

## Production Boilerplate / Standard Pattern

```yaml
agent_context:
  purpose: Agentic Software Engineering Workflow
  skill_routing_matrix:
    governance: ".agents/skills/engineering-standards/"
    backend_python: ".agents/skills/fastapi/"
    backend_php: ".agents/skills/laravel/"
    frontend_design: ".agents/skills/frontend-core/"
    design_system: ".agents/skills/ad-technology-design-system/"
    frontend_react: ".agents/skills/react/"
    frontend_vue: ".agents/skills/vue/"
    containers: ".agents/skills/docker/"
    cloud_aws: ".agents/skills/aws/"
    host_os: ".agents/skills/linux/"
    delivery: ".agents/skills/cicd/"
  lifecycle_execution_order:
    - Step 1 [Inspect]: Read authoritative local files and domain SKILL.md before proposing code.
    - Step 2 [Contracts]: Define strict Pydantic v2 / Form Request / Zod input-output schemas.
    - Step 3 [Domain]: Implement business logic inside isolated Service or Action classes.
    - Step 4 [Design]: If @ad-technology-inc/design-system exists in package.json, strictly follow ad-technology-design-system; otherwise cross-reference frontend-core.
    - Step 5 [Verify]: Run static analysis (ruff, phpstan, tsc) and relevant unit/feature test suites.
```

## Forbidden Anti-Patterns
- **Fat Controllers / Handlers**: Placing business logic or raw database queries directly inside route handlers.
- **Silent Error Swallowing**: Empty catch/except blocks or returning dummy fallbacks without structured logging.
- **Unverified Assumptions**: Writing code based on guessed schemas, endpoints, or dependencies without reading source files first.
- **Blocking I/O in Async Loops**: Using synchronous database drivers or blocking requests inside async event loops.
- **AI Frontend Artifacts**: Purple glow orbs, decorative emojis (e.g. sparkles, rocket), generic Tailwind colors (`bg-blue-600`), or non-standard border-radius.

## Verification & Testing
- **Cross-Skill Verification**: Confirm all code changes adhere to the domain rules in `.agents/skills/`.
- **Static Analysis Gate**: Verify zero errors from `ruff check`, `phpstan analyse --level=8`, or `npx tsc --noEmit`.
- **Runtime Validation**: Execute unit, integration, or feature test suites to confirm runtime correctness before completion.

