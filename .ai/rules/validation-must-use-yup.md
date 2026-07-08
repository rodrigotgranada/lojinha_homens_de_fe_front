# Granada Validation Rules: Validation Must Use Yup

This document defines the official binary validation rules, declarative schema definitions, centralized messaging standards, type extraction protocols, and mandatory constraint architectures regarding the strict enforcement of Yup validation schemas across the platform.

Writing imperative validation logic or ad-hoc parsing algorithms inside features is treated as a critical architectural failure.

The goal is not simply blocking invalid form submissions.

The goal is to ensure:

* centralized, self-documenting business constraint engines per domain feature
* compile-time type safety via automated runtime schema contract inference
* deterministic and standardized field-level user feedback mechanics
* frictionless validation reuse across client views and Next.js 15 route pipelines
* high-performance input checks by leveraging optimized validation trees
* AI-friendly predictable validation schema and payload model generation patterns

All data payload validations, data adjustments, and form constraints must execute through declarative Yup blueprints.

---

# Core Ban Rule

Writing manual `if/else` constraint statements, structural loop validations, or regex assessments inside component submission pipelines or input change event triggers is strictly prohibited.

Data sanitization and rule parsing must live exclusively inside external schema files.

Avoid cluttering presentation code with data evaluation rules.

---

# Prohibited Imperative Validation Pattern

Do not code data condition guards directly within presentational actions or form handlers. This creates scattered, un-testable business rule leakage.

```tsx
// FORBIDDEN - Imperative logic cluttering handlers and introducing typing debt
const handleFormSubmission = (data: RawInputData) => {
  if (!data.username || data.username.length < 3) {
    setLocalError("Nome de usuário muito curto");
    return;
  }
  if (data.seatCount < 1 || data.seatCount > 50) {
    setLocalError("Quantidade de assentos inválida");
    return;
  }
  executeMutation(data);
};
```

---

# Mandated Declarative Schema Blueprint

All validations must follow the declarative, method-chained object declaration provided by the Yup architecture layer.

Isolate rule configurations completely from the rendering layout lifecycle.

```typescript
// PREFERRED - Declarative, isolated, fully testable schema contract
import * as yup from 'yup';

export const workspaceProvisionSchema = yup.object({
  username: yup
    .string()
    .trim()
    .min(3, "O nome de usuário deve conter pelo menos 3 caracteres")
    .required("Nome de usuário é obrigatório"),
  seatCount: yup
    .number()
    .typeError("A quantidade de assentos deve ser um número")
    .integer("Apenas valores inteiros são permitidos")
    .positive("A quantidade deve ser maior que zero")
    .max(50, "O limite máximo da plataforma é de 50 assentos")
    .required("Quantidade de assentos é obrigatória"),
}).required();
```

---

# Runtime Schema Type Inference

Do not write static TypeScript interfaces matching form payloads by hand.

Always generate typing signatures by executing `yup.InferType` against the live schema instance.

This guarantees that compilation contracts adjust instantly whenever constraints expand or shrink, preventing data synchronization drift.

```typescript
// PREFERRED - Single source of truth typing
export type WorkspaceProvisionValues = yup.InferType<typeof workspaceProvisionSchema>;
```

---

# Mandatory String Sanitation Standard

All string data inputs that process text must append the `.trim()` sanitizer method at the origin of the validation chain.

Prevent users from bypassing mandatory field checks by submitting whitespace characters.

Yup executes sanitization transformations sequentially before verifying length requirements.

---

# Strict Number Type Validation Rules

Numeric input validations must explicitly combine type safeguarding with threshold constraints.

Requirements:
* declare `.typeError("Mensagem")` to catch NaN or conversion failures gracefully on empty states
* append `.integer()` if the application logic prohibits floating decimal entries
* utilize `.positive()` or `.moreThan()` instead of relying solely on general minimum evaluations

---

# Conditional Validation Architecture (When Pattern)

Dynamic form dependency rules must leverage Yup's internal `.when()` dependency API context.

Do not write conditional if branches inside components to swap out independent form schemas on the fly.

Keep the structural schema contract unified and reactive to internal state parameters.

```typescript
// PREFERRED - Reactive validation adaptation handled natively inside Yup
export const billingAddressSchema = yup.object({
  country: yup.string().required("País é obrigatório"),
  stateProvince: yup.string().when("country", {
    is: "BR",
    then: (schema) => schema.required("Estado é obrigatório para endereços nacionais"),
    otherwise: (schema) => schema.notRequired(),
  }),
});
```

---

# Dynamic Collection Arrays Validation (Array Pattern)

Dynamic list structures mapped using `useFieldArray` must have their entry rows validated via explicit nested `yup.array().of()` constraints schemas.

```typescript
// PREFERRED - Nested collection validation encapsulation
export const teamInviteSchema = yup.object({
  invitations: yup
    .array()
    .of(
      yup.object({
        email: yup.string().email("E-mail inválido").required("E-mail obrigatório"),
        role: yup.string().oneOf(["admin", "member"], "Função inválida").required(),
      })
    )
    .min(1, "Envie pelo menos um convite")
    .required(),
});
```

---

# Specialized RegEx Data Verification Rules

Text entries requiring specific alphanumeric structures (e.g., Slugs, Domain names, Phone numbers) must route through strict `.matches()` definitions.

Ensure regular expressions are completely encapsulated alongside a precise, localized error notification message explanation.

```typescript
// PREFERRED - Explicit URL slug containment evaluation
export const workspaceSlugSchema = yup.object({
  slug: yup
    .string()
    .matches(/^[a-z0-9-]+$/, "O slug deve conter apenas letras minúsculas, números e hifens")
    .required("Slug é obrigatório"),
});
```

---

# Custom Asynchronous Validation (Test Protocol)

Unique constraints checks that depend on background server evaluation (e.g., Verifying if a company slug is already taken) must use the `.test()` function pipeline inside the schema.

Return a boolean or a localized error block directly from the test execution method.

```typescript
// PREFERRED - Async unique value verification contract
export const workspaceAvailabilitySchema = yup.object({
  workspaceUrl: yup.string().test(
    "checkUniqueSlug",
    "Este endereço já está em uso por outra organização",
    async (value) => {
      if (!value) return false;
      const isAvailable = await lookupService.verifySlugAvailability(value);
      return isAvailable;
    }
  ),
});
```

---

# Centralized Default Messages Configuration Exception

Avoid writing duplicate, generic validation messages across multiple layout endpoints.

For localized structural elements, inject unique domain strings.

For generic infrastructure primitives (e.g., basic email format, standard requirement logs), manage fallback overrides globally inside a localized theme setup package.

---

# Next.js 15 Edge API Endpoint Validation Guard

Yup schemas must act as the primary validation gate inside server-side Next.js 15 Route Handlers (`app/api/`).

Validate incoming payload bodies before passing data parameters to database controller engines.

Isolating inputs on the server ensures absolute protection against hostile payload injection.

```typescript
// PREFERRED - app/api/workspaces/route.ts endpoint security layer
import { workspaceProvisionSchema } from "@/features/workspaces/schemas";

export async function POST(request: Request) {
  try {
    const rawBody = await request.json();
    const validatedData = await workspaceProvisionSchema.validate(rawBody, {
      abortEarly: false, // captures all constraint failures simultaneously
      stripUnknown: true, // purges undocumented payload attributes automatically
    });
    
    // execution parameters are 100% clean and typed here
  } catch (validationError) {
    return NextResponse.json({ errors: validationError }, { status: 400 });
  }
}
```

---

# AI Code Generation Schema Directive Contracts

The AI orchestration system must never emit code blocks that manage form data inputs without appending an independent validation schema.

Every text, selection, numeric, or boolean configuration array generated by the agent must declare a declarative Yup schema matching the domain model.

The AI must provide the runtime type inference code string on every single generation cycle automatically.

---

# Forbidden Validation Anti-Patterns Summary

Avoid:
* using manual `if` blocks inside presentational click actions to intercept bad form entries
* executing generic evaluations missing explicit type error overrides on numeric fields
* swapping multiple schemas via manual component conditions instead of using `yup.when()`
* leaving string inputs vulnerable to whitespace bypass tricks by omitting `.trim()`
* typing manual TypeScript props interfaces to replicate model schemas instead of using `yup.InferType`

---

# Preferred Validation Engineering Characteristics

Prefer validation code setups that feel:
* strictly declarative, modular, and uncoupled from layout rendering trees
* acting as the single source of truth for both typing compilation and runtime checking constraints
* highly robust, handling nested arrays and deep logic structures through descriptive method chains
* unified across client browser elements and server infrastructure endpoints perfectly

---

# Final Validation Definition of Done

No form module, entry view layer, operational wizard interface, or dynamic api payload handler will pass code quality verification workflows if it operates constraint checking code outside standard, declarative Yup validation architecture schemas.

Complete validation separation guarantees the premium engineering delivery value of the enterprise SaaS platform.