# Granada Anti-Patterns: Monolithic and Uncontrolled Form Architectures

This document defines the official refactoring standards, practical engineering counter-examples, performance optimization guidelines, and structural requirements to eradicate the anti-pattern of Bad Forms (Monolithic and Uncontrolled Form Architectures) across the platform.

Managing input fields via primitive, manual local states or relying on imperative form processing algorithms is treated as a severe architectural regression.

The goal of this document is not simply making form files visually shorter.

The goal is to eliminate:
* severe input performance lag caused by global component re-renders execution on every single keystroke
* fragile field synchronization loops that leak unvetted strings into infrastructure state engines
* scattered, non-testable business constraint logic nested inside presentation lifecycle branches
* inaccessible and broken input validation feedback loops that ignore assistive device properties
* chaotic, un-typed form submission payloads that default to loose generic definitions
* AI-generated form views that substitute structural schema definitions with ad-hoc field handlers

All data capture layers must route exclusively through declarative, high-performance schema-driven pipelines.

---

# The Anatomy of the Anti-Pattern

The monolithic and uncontrolled form anti-pattern manifests when a developer instantiates independent `useState` hooks for every single data entry item inside a functional layout module.

In high-density enterprise SaaS applications, tracing user entries via uncontrolled, primitive scalar states forces the complete parent view to re-evaluate its entire layout DOM tree continuously as the operator types.

When forms scale to dozens of variables (e.g., multi-tenant provisioners, nested profile setups), this approach triggers visible interface latency, disrupts browser focus positions, and mixes data sanitization rules with presentation markup.

Avoid building hardcoded input matrices that execute evaluation calculations directly inside presentation event handlers.

---

# Forbidden Scenario (The State-Thrashing Form Monolith)

The code block below exemplifies the absolute anti-pattern: a profile customization view that blocks thread rendering via scalar states, validates constraints imperatively on submission, and completely lacks input type contracts.

```tsx
// FORBIDDEN - Severe input lag, imperative validation leaks, and zero field accessibility
import { useState } from 'react';
import { Box, Button, Input, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';

export const TeamMemberProvisionerForm = () => {
  // Architectural Failure: Stacking individual scalar states forces global keypress re-renders
  const [firstName, setFirstName] = useState('');
  const [corporateEmail, setCorporateEmail] = useState('');
  const [allocatedSeats, setAllocatedSeats] = useState('1');
  const [uiError, setUiError] = useState('');

  const handleManualSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setUiError('');

    // Fatal Validation Leak: Hardcoded, non-testable business logic inside the UI click channel
    if (firstName.trim().length < 2) {
      setUiError('O nome inserido é muito curto.');
      return;
    }

    if (!corporateEmail.includes('@') || !corporateEmail.endsWith('.com')) {
      setUiError('Endereço de e-mail corporativo inválido.');
      return;
    }

    const numericSeats = parseInt(allocatedSeats, 10);
    if (isNaN(numericSeats) || numericSeats < 1 || numericSeats > 10) {
      setUiError('A quantidade de assentos deve estar entre 1 e 10.');
      return;
    }

    // Infrastructure Breach: Inlines raw network request bypassing abstracted custom service hooks
    await axios.post('/api/v1/team/provision', {
      name: firstName,
      email: corporateEmail,
      seats: numericSeats
    });
  };

  return (
    <Box p={6} bg="white" shadow="md">
      <form onSubmit={handleManualSubmit}>
        <VStack gap={4} align="stretch">
          <Text fontSize="xl" fontWeight="bold">Convidar Integrante do Time</Text>
          
          {/* Keypress Thrashing: Every stroke here triggers re-evaluation of the whole VStack */}
          <Input 
            value={firstName} 
            onChange={(e) => setFirstName(e.target.value)} 
            placeholder="Nome completo" 
          />
          
          <Input 
            value={corporateEmail} 
            onChange={(e) => setCorporateEmail(e.target.value)} 
            placeholder="E-mail corporativo" 
            type="email"
          />

          <Input 
            value={allocatedSeats} 
            onChange={(e) => setAllocatedSeats(e.target.value)} 
            placeholder="Quantidade de assentos" 
            type="number"
          />

          {uiError && <Text color="red.500" fontSize="sm">{uiError}</Text>}

          <Button type="submit">Concluir Provisionamento</Button>
        </VStack>
      </form>
    </Box>
  );
};
```

---

# Code Degradation Analysis

The `TeamMemberProvisionerForm` interface introduces severe maintenance and runtime bottlenecks for 4 core reasons:
1. Keystroke Layout Thrashing: As the operator types a 30-character email address, the component invokes `setCorporateEmail` 30 separate times. React is forced to recalculate variables, rebuild the virtual DOM, and check adjacent elements 30 times, causing mobile input lag.
2. Silent Type Cast Failures: The number field maps its structural integrity entirely onto a string state instance (`useState('1')`). Converting types imperatively inside the submit method risks runtime calculation crashes if users input unexpected symbols.
3. Scattered Business Rules: Validation constraints are tightly coupled to this specific form UI wrapper. If a background worker script or an external API handler needs to process the exact same payload rules, the verification code must be copied manually.
4. Total Accessibility Collapse: The form lacks native `<label>` connections, fails to map error string targets to fields using `aria-errormessage`, and omits dynamic `aria-invalid` properties, isolating screen-reader operators completely.

---

# The Refactoring Standard: Decoupled Schema-Driven Architecture

To fix the anti-pattern, we dismantle the form monolith by splitting execution across three specialized structural layers:
1. **The Validation Schema Object (`schemas/`)**: Houses declarative business logic rules and encapsulates payload constraints using Yup definitions.
2. **The High-Performance Hook Hook (`hooks/`)**: Wraps form orchestration pipelines, handles ref-driven uncontrolled state optimization, and infers strict contracts via React Hook Form.
3. **O Componente Semântico de Visualização (`semantic/`)**: Translates layout components using pure Chakra UI v3 Field primitives, completely free from manual state bindings.

---

# Step 1: The Isolated Validation Schema (`schemas/provision.ts`)

Encapsulate all data verification parameters within a pure, detached contract model. Derive TypeScript interface patterns directly from this instance to avoid data definition drift.

```typescript
// PREFERRED - Single source of truth declarative constraint blueprint
import * as yup from 'yup';

export const teamProvisioningSchema = yup.object({
  fullName: yup
    .string()
    .trim()
    .min(2, "O nome inserido deve conter pelo menos 2 caracteres")
    .required("Nome completo é obrigatório"),
  corporateEmail: yup
    .string()
    .trim()
    .email("Formato de e-mail inválido")
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Formato de e-mail inválido")
    .required("E-mail corporativo é obrigatório"),
  allocatedSeats: yup
    .number()
    .typeError("A quantidade de assentos deve ser um número válido")
    .integer("Apenas valores inteiros são aceitos")
    .min(1, "O limite mínimo é de pelo menos 1 assento")
    .max(10, "O limite máximo por operação é de 10 assentos")
    .required("A quantidade de assentos é obrigatória"),
}).required();

export type TeamProvisioningFormValues = yup.InferType<typeof teamProvisioningSchema>;
```

---

# Step 2: The Unified Business Logic Mutation Hook (`hooks/useProvisioningForm.ts`)

Isolate the form execution controller, input resolution schemes, and network mutation handshakes away from presentation files completely.

```typescript
// PREFERRED - Performance optimized ref-driven data lifecycle coordinator
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { teamProvisioningSchema, TeamProvisioningFormValues } from '../schemas/provision';
import { teamInfrastructureService } from '../services/team';

export const useProvisioningForm = (onSuccessCallback: () => void) => {
  const formMethods = useForm<TeamProvisioningFormValues>({
    resolver: yupResolver(teamProvisioningSchema),
    mode: 'onTouched',
    defaultValues: {
      fullName: '',
      corporateEmail: '',
      allocatedSeats: 1,
    }
  });

  const { mutateAsync: submitProvisioning, isPending: isSubmittingToServer } = useMutation({
    mutationFn: teamInfrastructureService.provisionNewMember,
    onSuccess: () => {
      formMethods.reset();
      onSuccessCallback();
    }
  });

  const handleFormExecution = formMethods.handleSubmit(async (payloadData) => {
    try {
      await submitProvisioning(payloadData);
    } catch (serverError) {
      // Map global API field failures back onto relevant form registers programmatically
      formMethods.setError('corporateEmail', { message: 'Este e-mail já está em uso neste tenant' });
    }
  });

  return {
    registerField: formMethods.register,
    formErrors: formMethods.formState.errors,
    isFormValid: formMethods.formState.isValid,
    isProcessing: isSubmittingToServer || formMethods.formState.isSubmitting,
    executeSubmit: handleFormExecution,
  };
};
```

---

# Step 3: The Passive Presentation View Layer (`semantic/TeamMemberProvisionerForm.tsx`)

The UI layout file maps pure, un-coupled primitive controls. It links input references securely using React Hook Form abstractions and fulfills all core accessibility definitions out-of-the-box.

```tsx
// PREFERRED - Hyper-performant, theme-adaptive, accessible form composition layout
import { Field, Input, Button, VStack, Heading, Box } from '@chakra-ui/react';
import { useProvisioningForm } from '../hooks/useProvisioningForm';

interface FormWrapperProps {
  onOperationComplete: () => void;
}

export const TeamMemberProvisionerForm = ({ onOperationComplete }: FormWrapperProps) => {
  const { 
    registerField, 
    formErrors, 
    isFormValid, 
    isProcessing, 
    executeSubmit 
  } = useProvisioningForm(onOperationComplete);

  return (
    <Box 
      p={6} 
      bg="bg.surface" 
      border="1px solid" 
      borderColor="border.subtle" 
      borderRadius="md"
      className="gr-form-viewport"
    >
      {/* noValidate bypasses inconsistent browser native tooltips */}
      <form onSubmit={executeSubmit} noValidate>
        <VStack gap={5} align="stretch">
          <Heading as="h3" size="md" tracking="tight" color="fg.primary">
            Convidar Integrante do Time
          </Heading>
          
          <Field.Root invalid={!!formErrors.fullName}>
            <Field.Label>Nome Completo</Field.Label>
            <Input 
              type="text" 
              placeholder="Ex: Alexander Wright" 
              {...registerField("fullName")} 
            />
            <Field.ErrorText>{formErrors.fullName?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!formErrors.corporateEmail}>
            <Field.Label>E-mail Corporativo</Field.Label>
            <Input 
              type="email" 
              placeholder="alexander@platform.com" 
              {...registerField("corporateEmail")} 
            />
            <Field.ErrorText>{formErrors.corporateEmail?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!formErrors.allocatedSeats}>
            <Field.Label>Quantidade de Assentos Dedicados</Field.Label>
            <Input 
              type="number" 
              {...registerField("allocatedSeats", { valueAsNumber: true })} 
            />
            <Field.ErrorText>{formErrors.allocatedSeats?.message}</Field.ErrorText>
          </Field.Root>

          <Button 
            type="submit" 
            loading={isProcessing} 
            disabled={!isFormValid}
            variant="solid"
            colorPalette="blue"
            width="100%"
          >
            Concluir Provisionamento
          </Button>
        </VStack>
      </form>
    </Box>
  );
};
```

---

# Non-Negotiable Form Performance Rules

To preserve absolute performance metrics across input layers, the following architectural rules apply:
* Toggling or writing a standard local state string property (`useState`) to catch data change events inside text inputs is strictly prohibited unless implementing independent search debounce wrappers.
* Every form tag must state an explicit `noValidate` parameter to guarantee that error design layout lines render consistently across alternative user browser clients.
* Form payload properties must never be hardcoded or cast manually using unsafe shortcuts like `as any`. Typing maps must extend from `yup.InferType` protocols exclusively.

---

# AI Code Generation Guidelines (Form Execution Guard)

The AI code generation framework must strictly oppose creating components that capture text input fields using primitive local scalar states.

Whenever requested to draft a layout containing settings, signup fields, credential locks, profile sheets, or complex database adjustments, the agent must generate the independent validation schema module utilizing the Yup API first.

The engine must then emit the accompanying React Hook Form custom hook coordinator before writing the visual presentational layer, guaranteeing that input components communicate with the DOM tree using high-performance, ref-driven uncontrolled bindings automatically.

---

# Forbidden Form Patterns Summary

Avoid:
* Authorship of individual inline `onChange` and `value` parameter couplings to drive basic text fields.
* Initializing data forms without providing the mandatory `defaultValues` map context object.
* Dropping structural error messages into floating un-linked global page toasts instead of rendering inline field labels.
* Authoring custom input schemas using manual conditional ternary branches inside presentation layout files.
* Bypassing native form keyboard structures by dropping the explicit `type="submit"` parameter from action buttons.

---

# Preferred Form Characteristics

Prefer data entry modules that feel:
* completely declarative, centralized, and isolated inside structural schema definitions files
* hyper-performant, preventing global layout re-render loops on standard keystroke operations
* strictly contract-typed from baseline parameter validation schemas down to submit handlers
* deeply integrated with accessibility properties, design system color tokens, and smooth async status indicators

---

# Final Form Engineering Definition of Done

No data capture block, wizard setup track, multi-input settings dashboard, or operational form grid will pass the codebase integration check if it executes field tracking metrics outside the official, ref-driven parameters of React Hook Form and Yup validation schemas.

Complete separation between presentational layers and validation rules establishes the premium product execution values of the enterprise SaaS platform.