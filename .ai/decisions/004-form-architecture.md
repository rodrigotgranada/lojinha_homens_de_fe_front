# Architecture Decision Record: 004 - Schema-Driven Uncontrolled Form Architecture

## Status
Approved

## Context
Traditional React web applications capture data using controlled components, mapping individual scalar state wrappers (`useState`) directly to input values and `onChange` interaction listeners. While simple for basic authentication views, this controlled architecture degrades performance when scaled to dense enterprise B2B setup wizards, multi-tenant network managers, or data-intensive preferences tabs. 

Binding local state to text strings forces the entire parent React functional tree and adjacent layout grids to re-evaluate, perform diff checks, and re-render on *every single keystroke*. In high-density settings, this creates perceptible mobile typing latency, layout thrashing, and intermittent input focus loss.

Additionally, ad-hoc imperative validation statements written inline within UI click handlers mix validation parameters with presentational markup, making headless testing impossible. Without a single source of truth, AI coding engines frequently fall back to chaotic, unvetted controlled inputs that lack standardized error accessibility hooks.

## Decision
We officially mandate a **Schema-Driven, Uncontrolled Form Architecture** across all data collection interfaces of the platform. Forms must be coordinated through the uncontrolled ref-driven lifecycle mechanics of **React Hook Form (RHF)**, using **Yup** as the single source of truth for declarative validation contracts.

### Structural Form Architecture Blueprint
```tsx
// CORRECT - Decoupled Schema Contract + Ref-Driven Uncontrolled Execution
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Field, Input, Button, VStack } from '@chakra-ui/react';

// 1. Declarative Domain Constraints Definition
export const provisionGatewaySchema = yup.object({
  gatewayName: yup.string().trim().min(3, "Too short").required("Required"),
  maxRateLimit: yup.number().typeError("Must be numeric").positive().required("Required"),
}).required();

export type ProvisionGatewayValues = yup.InferType<typeof provisionGatewaySchema>;

export const ProvisionGatewayForm = () => {
  // 2. High-Performance Uncontrolled Orchestration
  const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm<ProvisionGatewayValues>({
    resolver: yupResolver(provisionGatewaySchema),
    mode: 'onTouched',
  });

  const onSubmit = handleSubmit(async (data) => {
    await api.post('/api/v1/gateways', data);
  });

  return (
    <form onSubmit={onSubmit} noValidate>
      <VStack gap={4}>
        {/* Chakra UI v3 semantic slot mapping hooked into RHF errors */}
        <Field.Root invalid={!!errors.gatewayName}>
          <Field.Label>Gateway Reference Name</Field.Label>
          <Input type="text" {...register("gatewayName")} />
          <Field.ErrorText>{errors.gatewayName?.message}</Field.ErrorText>
        </Field.Root>

        <Button type="submit" loading={isSubmitting} disabled={!isValid}>
          Deploy Proxy Node
        </Button>
      </VStack>
    </form>
  );
};
```

### Strict Implementation Rules
1. **Ban on Value/OnChange State Overload**: Instantiating manual string states (`useState('')`) to track basic text input modifications inside forms is strictly prohibited. Fields must utilize standard ref forwarding via the RHF `register` protocol.
2. **Dynamic Contract Inference**: Frontend field contracts and API submission payloads must be inferred dynamically using `yup.InferType` protocols. Manual definition of separate duplicate TypeScript interfaces for form payloads is banned.
3. **Mandatory Native Validation Overrides**: The `<form>` tag must explicitly feature the `noValidate` parameter. This bypasses inconsistent native browser tooltips and enforces the predictable rendering of design system error tokens.
4. **WCAG Accessible Field Slots**: Input tags must be wrapped using Chakra UI v3 `<Field.Root>` containers, which automatically manage `aria-invalid`, `aria-describedby`, and link labels to their respective error slots in real time.

## Consequences

### Positive Impacts
* **Sub-Millisecond Keystroke Responsiveness**: By cutting out state-driven parent re-render loops on text modification events, input response remains instant regardless of form scale or component density.
* **Hermetic Business Rules Isolation**: Validation rules are written as declarative objects independent of the UI tree. This allows data validation contracts to be unit-tested headlessly without mounting layout layers.
* **Coordinated Server Error Mapping**: API validation failures can be mapped back onto the RHF context object using the `setError()` interface, ensuring backend conflicts are displayed inline exactly like client errors.

### Negative Impacts / Trade-offs
* **Integration Overhead for Third-Party Primitives**: Custom non-native inputs (e.g., specialized rich text editors or complex calendar widgets) require explicit synchronization using the RHF `<Controller>` component wrapper.
* **Separation of Context**: Simple form operations are split across separate definitions (schema, types, layout markup), which increases initial setup boilerplate.

---

## AI Code Generation Constraints
The AI engine must never generate inputs that rely on individual controlled values or inline hand-written evaluation statements. Whenever a data collection component is requested, the agent must output a separate Yup validation schema first, extract its TypeScript model using `yup.InferType`, initialize the form context tree using the `yupResolver` bridge, and wire fields directly to the DOM via the RHF `register` method.
```