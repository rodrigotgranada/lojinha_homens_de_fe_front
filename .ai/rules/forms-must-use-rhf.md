# Granada Form Standards: Forms Must Use RHF

This document defines the official binary validation rules, architecture boundaries, schema validation standards, and input orchestration requirements regarding the strict enforcement of React Hook Form (RHF) and Yup validation across the platform.

Managing form element states manually via vanilla local component states is treated as a severe architectural violation.

The goal is not simply making input handling shorter.

The goal is to ensure:

* unified, predictable state management across complex data entry surfaces
* high-performance input rendering by eliminating global component re-renders on every keystroke
* strict decoupling between visual input presentation and constraint validation rules
* accessible, standardized field error mapping using design system tokens
* frictionless server-to-client mutation error integration pipelines
* AI-friendly predictable form engineering and schema generation patterns

Every form structure, input collection, nested wizard, or dynamic settings sheet must route exclusively through React Hook Form.

---

# Core Ban Rule

The use of manual `useState` allocations to track individual input values, form dirtiness, or validation errors is strictly prohibited.

This rule applies to text inputs, textareas, select dropdowns, switch toggles, checkboxes, radio groups, and custom form selectors.

Form state cycles must be handled completely by the React Hook Form controller engine.

---

# Prohibited Manual State Binding Pattern

Do not create multiple scalar hooks to monitor user keystrokes. This causes extensive layout thrashing and couples the view directly to unstable value transformations.

```tsx
// FORBIDDEN - Severe architectural degradation: manual state thrashing and local errors
export const AccountSettingsForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Email inválido");
      return;
    }
    submitData({ email, name });
  };

  return (
    <form onSubmit={handleManualSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      {error && <span>{error}</span>}
    </form>
  );
};
```

---

# Mandated RHF + Yup Composition Pattern

Forms must be declared using the React Hook Form `useForm` hook, strictly coupled to a decoupled external Yup validation schema using the `@hookform/resolvers/yup` adapter.

Infer form data structures directly from the runtime schema contract to guarantee type security without duplicate interface definitions.

---

# Preferred Full Form Implementation Pattern

Ensure the implementation structures form fields cleanly, using Chakra UI v3 composition APIs and explicit field error bindings.

```tsx
// PREFERRED - Production-grade decoupled enterprise form architecture
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Field, Input, Button, VStack } from "@chakra-ui/react";

const profileFormSchema = yup.object({
  fullName: yup.string().min(3, "O nome deve ter pelo menos 3 caracteres").required("Nome é obrigatório"),
  businessEmail: yup.string().email("Formato de e-mail inválido").required("E-mail é obrigatório"),
}).required();

type ProfileFormValues = yup.InferType<typeof profileFormSchema>;

export const AccountSettingsForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ProfileFormValues>({
    resolver: yupResolver(profileFormSchema),
    defaultValues: { fullName: "", businessEmail: "" },
    mode: "onTouched",
  });

  const onSubmitHandler = async (data: ProfileFormValues) => {
    await api.post("/account/profile", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} noValidate>
      <VStack gap={4} align="stretch">
        <Field.Root invalid={!!errors.fullName}>
          <Field.Label>Nome Completo</Field.Label>
          <Input 
            type="text" 
            placeholder="Ex: John Doe" 
            {...register("fullName")} 
          />
          <Field.ErrorText>{errors.fullName?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.businessEmail}>
          <Field.Label>E-mail Corporativo</Field.Label>
          <Input 
            type="email" 
            placeholder="john@company.com" 
            {...register("businessEmail")} 
          />
          <Field.ErrorText>{errors.businessEmail?.message}</Field.ErrorText>
        </Field.Root>

        <Button 
          type="submit" 
          loading={isSubmitting} 
          disabled={!isValid}
          variant="solid"
        >
          Salvar alterações
        </Button>
      </VStack>
    </form>
  );
};
```

---

# Strict Schema Inference Rule

Do not manually write independent TypeScript interfaces to type-check form submit parameters.

Always extract types using `yup.InferType<typeof localSchemaObject>`.

This ensures that whenever a validation constraint is altered inside the schema, the compiler propagates type adjustments across all consumers automatically.

---

# Native Form Validation Suppression

Forms containing email inputs, numbers, or unique constraints must append the native `noValidate` parameter onto the root HTML `<form>` element.

Bypass native browser validation popups to ensure the platform delivers consistent, styled design system error labels uniformly across all clients.

---

# Chakra UI v3 Field Composition Standard

Form field markup layers must utilize standard Chakra UI v3 Field components to bind labels, inputs, and helpers together seamlessly.

Requirements:
* inject the evaluation flag `invalid={!!errors.fieldName}` directly onto the `<Field.Root>` wrapper
* pass the string error callback message inside the `<Field.ErrorText>` primitive node
* inputs must use native or custom extensions spread securely via `{...register("fieldName")}`

---

# Keyboard Navigation & Safe Submit Mandates

Form controls must preserve predictable browser keyboard tab index mechanics naturally.

Requirements:
* forms must support completion submission actions when an operator clicks the `Enter` key inside standard text inputs
* the submit button element must explicitly declare the `type="submit"` attribute
* ensure button feedback loops match guidelines defined in `.ai/rules/async-states-required.md`

---

# Dynamic Arrays Standard (useFieldArray)

Complex data configurations that require dynamic list expansion grids (e.g., adding multiple webhooks, members, or parameter pairs) must use RHF's `useFieldArray` hook.

Do not handle array collection pushed additions or slice removals using manual array hooks.

`useFieldArray` guarantees correct input identity index retention during dynamic mutation loops.

---

# Server-Side Error Mapping Interceptor Rule

When an API transaction returns a server validation failure payload (e.g., `400 Bad Request` with field conflicts), map the structural tokens back into the form interface.

Use RHF's programmatic `setError` dispatcher method to re-target internal input indices directly.

Avoid discarding complex backend logic responses into generic global toast bubbles.

---

# Controlled Controller Custom Inputs Integration

When incorporating custom composite inputs that do not expose a native HTML ref interface (e.g., advanced rich text editors, dynamic comboboxes, file dropzones), wrap the primitive using RHF's `<Controller>` or `useController`.

Bind the internal `onChange` and `value` callback properties securely to preserve schema coverage.

---

# Default Values Requirement

All form invocations must declare an explicit, fully defined configuration map for the `defaultValues` object context.

Avoid initial undefined states, which trigger input conversion errors (uncontrolled to controlled components) inside the React architecture tree.

---

# AI Code Generation Form Directive Contracts

The AI execution loop must strictly oppose creating inputs bound to primitive state hooks.

When requested to draft an interface page containing user entry flows, data configuration views, credentials sheets, or data updates, the agent must generate the Yup validation schema object first.

The AI must then emit the unified React Hook Form assembly, utilizing clean slot composition elements matching Chakra UI v3 parameters.

---

# Forbidden Form Engineering Anti-Patterns Summary

Avoid:
* writing `onChange={(e) => setValue(e.target.value)}` inside application inputs
* using custom state arrays to track input value metrics manually
* omitting external schema validation blueprints to code manual parsing checks inside handlers
* dropping the `type="submit"` designation from the primary execution control button
* writing duplicate TypeScript interfaces that mimic schemas instead of utilizing `yup.InferType`

---

# Preferred Form Engineering Characteristics

Prefer implementation models that feel:
* strictly declarative and governed completely by isolated schema definition files
* decoupled from local layout render thrashing via optimized ref-driven state mapping
* type-safe from baseline definition rules to form submission callbacks
* cleanly integrated with layout design tokens and accessible feedback channels

---

# Final Form Engineering Definition of Done

No input panel, wizard stepper, domain configuration view, or setting block will pass system verification audits if it uses primitive local states to manage form fields instead of standard React Hook Form + Yup orchestration pipelines.

Strict form engineering structures isolate complex layout concerns to validate the enterprise delivery matrix of the premium SaaS platform.