# Playbook: Scaffold and Form Flow Construction

This playbook outlines the exact step-by-step technical pipeline for creating a data-collection form flow across the platform.

---

## Phase 1: Declarative Schema Specification
1. **Isolate Business Contracts**: Create a dedicated validation schema using Yup constraints in the `schemas/` directory.
2. **Strong Inference**: Export the strong TypeScript model automatically using `yup.InferType<typeof schema>`. Do not declare manual interfaces.

## Phase 2: React Hook Form Initialization
1. **Context Setup**: Initialize the uncontrolled form context using `useForm` mapped natively with the `yupResolver` bridge.
2. **Performance Optimization**: Force `mode: 'onTouched'` to ensure sub-millisecond keyboard keystroke response curves.
3. **Default Assignment**: Define descriptive baseline default attributes for all inputs to eliminate React hydration warnings.

## Phase 3: Presentational Layer Composition
1. **Semantic Field Slots**: Nest raw interface nodes inside Chakra UI v3 `<Field.Root>` tags to automate accessibility attributes.
2. **Register Ref Binding**: Spread the RHF orchestration ref directly into input components using `{...register("fieldName")}`.
3. **Inline Error Delivery**: Connect form validation indicators to the visual layout via `<Field.ErrorText>`.

## Phase 4: Validation Quality Check
1. Audit the input matrix against the constraints documented within `form-checklist.md`.
```