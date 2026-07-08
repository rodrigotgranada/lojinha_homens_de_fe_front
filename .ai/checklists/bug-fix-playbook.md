# Playbook: Systematic Bug Fixing & Regression Prevention

This playbook defines the strict operational workflow for autonomous AI engines and developers when diagnosing, isolating, and fixing system bugs or error trace exceptions.

---

## Phase 1: Replicate and Isolate the Boundary
1. **Analyze the Trace**: Inspect the explicit compilation or runtime trace error without guessing. Locate the exact file, column location, and framework component line.
2. **Isolate the Scope**: Identify if the bug is caused by local UI state corruption, unexpected network payloads, or server-side hydration mismatches.
3. **Draft a Controlled Input**: Create a reproduction scenario with static data or mock payloads that reliably triggers the error.

## Phase 2: Perform Surgical and Defensive Refactoring
1. **Targeted Repair**: Modify *only* the specific broken line or logic structure identified. Avoid rebuilding entire component blocks or changing unrelated style configurations.
2. **Apply Type Overrides Defensively**: Enhance runtime defenses by introducing optional chaining (`?.`), fallback defaults (`??`), or rigorous type guards to handle empty arrays or unexpected null states gracefully.

## Phase 3: Execute Quality Assurance Verification
1. **Validate Against Rules**: Run the corrected file through the appropriate project checklists (e.g., `form-checklist.md`).
2. **Verify Layout Stability**: Confirm the fix did not introduce unwanted side effects or alter responsive layout patterns on mobile viewports.

---

## AI Execution Prompt Constraint
When tasked with resolving an error (e.g., "Fix this mapping crash"), the AI agent must never rewrite stable adjacent UI code blocks. The agent must locate the precise source of failure, explain the root cause clearly, and output a highly focused, surgical fix.
```