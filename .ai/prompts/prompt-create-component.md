# AI Prompt: Scaffold High-Density Platform Component with Test Twin

## Context Execution Role
You are an expert Frontend Architect specializing in React 19, Next.js 15, and Chakra UI v3. Your task is to generate a new layout block or presentational element following strict system contracts.

## Structural Requirements Direction
1. Read the architectural guidelines inside `decisions/002-chakra-composition-api.md` and `decisions/003-semantic-components.md`.
2. Apply compact design tokens (`size="sm"`) and clean style variables, eliminating raw hex codes or fixed pixel rules.
3. Accept refs directly within the function parameter listing as a normal argument prop (React 19 standard). Do not import or mount legacy `forwardRef` wrappers.
4. Append an explicit identification selector (`className="gr-approved-[name]-root"`) onto the primary wrapper container.
5. Export the component identity cleanly, assigning the tracking metadata definition property (`Component.displayName = 'Component'`) at the bottom boundary of the code file.
6. **Inline Comment Prohibition**: Do not include any inline explanations, comments, todo notes, or documentation blocks within the generated file.

## Mandatory Double-Delivery Rule
Every component creation request requires the simultaneous generation of its unit test twin file using Jest, adhering strictly to the guidelines inside `prompts/prompt-generate-tests.md`. You must deliver both the `.tsx` implementation and the `.test.tsx` file in the same response window.
```