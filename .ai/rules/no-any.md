# Granada Strict Type Rules: No Any Allowed

This document defines the official binary validation rules, compilation guards, typing alternatives, strict type-narrowing conventions, and mandatory static analysis standards regarding the absolute prohibition of the `any` keyword across the platform.

The use of `any` is treated as a critical architecture and compilation failure.

The goal is not simply passing basic local linting checks.

The goal is to create:

* 100% deterministic type safety resilience
* reliable and exhaustive autocompletion inside the IDE
* predictable automated refactoring pipelines
* early compile-time regression detection
* absolute structural contract clarity
* AI-friendly strict typing generation trees

Every file inside the codebase must compile under strict mode without type degradation.

---

# Core Ban Philosophy

The keyword `any` must never be authored under any circumstances within the repository.

Type safety is a non-negotiable metric of premium software engineering.

A single leak of an untyped reference can corrupt downstream data contracts.

Avoid trading long-term maintainability for short-term convenience.

---

# Prohibited Explicit Allocations

Do not write explicit any type definitions for variables.

```typescript
// FORBIDDEN
const enterpriseUserData: any = getSessionContext();
```

```typescript
// PREFERRED
const enterpriseUserData: EnterpriseSession = getSessionContext();
```

---

# Prohibited Parameter Typing

Do not allow function signatures to accept untyped arguments.

```typescript
// FORBIDDEN
function processPayload(payload: any) {
  return payload.id;
}
```

```typescript
// PREFERRED
function processPayload(payload: ProcessablePayload): string {
  return payload.id;
}
```

---

# Prohibited Return Statements

Do not allow functions or methods to return loose type boundaries.

```typescript
// FORBIDDEN
const formatMetric = (value: number): any => {
  return { formatted: `${value}%` };
};
```

```typescript
// PREFERRED
interface FormattedMetric {
  formatted: string;
}

const formatMetric = (value: number): FormattedMetric => {
  return { formatted: `${value}%` };
};
```

---

# Prohibited Array Identifiers

Do not declare open arrays without concrete item primitives or structural interfaces.

```typescript
// FORBIDDEN
const activeRowIdentifiers: any[] = [];
```

```typescript
// PREFERRED
const activeRowIdentifiers: string[] = [];
```

---

# Prohibited Tuple Layouts

Do not use loose collections for positional data arrays.

```typescript
// FORBIDDEN
const coordinatesState: [any, any] = [valA, valB];
```

```typescript
// PREFERRED
const coordinatesState: [number, number] = [valA, valB];
```

---

# Implicit Any Guard Rules

Variables and function arguments must always declare an explicit type if native inference is unavailable.

Do not let the TypeScript compiler guess or default to implicit loose allocations.

```typescript
// FORBIDDEN
const collectedItems = []; // inferred as any[] by default
const parseInput = (input) => String(input); // implicit any parameter configuration
```

```typescript
// PREFERRED
const collectedItems: string[] = [];
const parseInput = (input: unknown): string => String(input);
```

---

# Type Assertion Ban Rule

Avoid using `as any` to force compilations or bypass strict rules.

Type forcing destroys upstream interface integrity and introduces silent runtime bugs.

```typescript
// FORBIDDEN
const billingConfiguration = externalPayload as any;
```

```typescript
// PREFERRED
const billingConfiguration = externalPayload as BillingConfig;
```

---

# Alternative 1: Unknown Type Philosophy

Use `unknown` when handling unpredictable, unvetted, or unsafe external payloads.

The `unknown` type acts as the safe, type-safe alternative to `any`.

Force type narrowing or validation before accessing properties on an unknown type.

---

# Unknown Guard Requirements

Variables typed as `unknown` must undergo explicit code validation before property execution.

Allowed guard patterns:
* `typeof` checks
* `instanceof` validations
* custom type guards (`isType`)
* runtime schema assertions

---

# Typeof Narrowing Pattern

Use `typeof` guards for primitive verification blocks.

```typescript
// PREFERRED
function logPrimitive(value: unknown) {
  if (typeof value === "string") {
    console.log(value.toUpperCase()); // safe and typed
  }
}
```

---

# Instanceof Narrowing Pattern

Use `instanceof` guards for class, object constructor, or Error validation flows.

```typescript
// PREFERRED
async function executeTransaction() {
  try {
    await submitForm();
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.error(error.message); // safe property extraction
    }
  }
}
```

---

# Custom Type Guard Pattern

Implement type guards to narrow down deep structural object payloads.

```typescript
// PREFERRED
interface CustomerAccount {
  uuid: string;
  tier: "premium" | "free";
}

function isCustomerAccount(target: unknown): target is CustomerAccount {
  return (
    typeof target === "object" &&
    target !== null &&
    "uuid" in target &&
    "tier" in target
  );
}
```

---

# Alternative 2: Generics Architecture Philosophy

Use generic type variables when components, interfaces, or hooks operate over flexible variations of data structures.

Generics preserve accurate downstream contracts from initial data ingestion to final execution.

Avoid dropping into static generic assumptions.

---

# Generic Component Layout

Preserve user-defined structures from prop declarations into layout rendering.

```typescript
// FORBIDDEN
interface SimpleListProps {
  items: any[];
  onSelect: (item: any) => void;
}
```

```typescript
// PREFERRED
interface ScalableListProps<T> {
  items: T[];
  onSelect: (item: T) => void;
}
```

---

# Generic Constraints Rules

Use generic constraints (`extends`) to guarantee the presence of core internal identification properties.

```typescript
// PREFERRED
interface BaseRecord {
  id: string;
}

function findActiveRow<T extends BaseRecord>(collection: T[], targetId: string): T | undefined {
  return collection.find((item) => item.id === targetId);
}
```

---

# TanStack Query Strict Response Contracts

Asynchronous database query hooks must declare explicit typed data return expectations.

Do not allow API mapping operations to drop data properties into unsafe fallback states.

```typescript
// FORBIDDEN
const { data } = useQuery({
  queryKey: ['users'],
  queryFn: () => fetch('/api/users').then(res => res.json() as any)
});
```

```typescript
// PREFERRED
interface UserDataPayload {
  profiles: UserProfile[];
  count: number;
}

const { data } = useQuery<UserDataPayload, Error>({
  queryKey: ['users'],
  queryFn: async (): Promise<UserDataPayload> => {
    const response = await api.get('/api/users');
    return response.data;
  }
});
```

---

# TanStack Query Mutation Input Contracts

Write mutations must enforce strict type checking for incoming parameter blocks.

```typescript
// PREFERRED
interface CreateWorkspaceDTO {
  name: string;
  slug: string;
}

const useCreateWorkspace = () => {
  return useMutation<WorkspaceResponse, Error, CreateWorkspaceDTO>({
    mutationFn: async (newWorkspace) => {
      const response = await api.post('/workspaces', newWorkspace);
      return response.data;
    },
  });
};
```

---

# React Hook Form Schema Inference Philosophy

Form state schemas must infer structures dynamically from the runtime validation configuration object.

Avoid manually authoring duplicate TypeScript interfaces alongside live validation schemas.

Manually typed form states tend to drift over time and leak untyped parameters.

---

# Schema Inference Pattern

Leverage Yup inference definitions to automate strict compile-time types.

```typescript
// PREFERRED
import * as yup from 'yup';

const workspaceSettingsSchema = yup.object({
  title: yup.string().required(),
  maxMembers: yup.number().positive().required(),
}).required();

type WorkspaceSettingsFormValues = yup.InferType<typeof workspaceSettingsSchema>;
// Dynamically inferred as 100% strict type tree
```

---

# React 19 Component Props Mandate

Functional components must define clear, structural property interfaces.

Do not use open or unvetted property collection objects.

```typescript
// FORBIDDEN
export const MetricsWidget = ({ config }: { config: any }) => { ... }
```

```typescript
// PREFERRED
interface MetricsWidgetProps {
  config: WidgetConfigurationStructure;
}

export const MetricsWidget = ({ config }: MetricsWidgetProps) => { ... }
```

---

# Chakra UI v3 Component Extension Contracts

Preserve primitive component property abstractions when overriding or wrapping Chakra UI design foundations.

Do not short-circuit native style tokens into untyped attributes.

```typescript
// PREFERRED
import { Button, HTMLChakraProps } from '@chakra-ui/react';

interface PremiumActionButtonProps extends HTMLChakraProps<'button'> {
  asyncLoadingState?: boolean;
}
```

---

# Mouse Event Explicit Typings

UI interactive handlers must map native browser event signatures accurately.

```typescript
// FORBIDDEN
const handleTriggerClick = (event: any) => { ... }
```

```typescript
// PREFERRED
import { MouseEvent } from 'react';

const handleTriggerClick = (event: MouseEvent<HTMLButtonElement>) => { ... }
```

---

# Form Change Event Typings

Input mutation fields require semantic selection element tracking types.

```typescript
// PREFERRED
import { ChangeEvent } from 'react';

const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
  const incomingValue = event.target.value;
  updateLocalContext(incomingValue);
};
```

---

# Record Utility over Object Dictionaries

Use `Record` utilities when mapping structural dynamic index dictionary containers.

Avoid letting free-form lookup maps slide into open, untyped JavaScript configurations.

```typescript
// FORBIDDEN
const permissionMap: { [key: string]: any } = {};
```

```typescript
// PREFERRED
const permissionMap: Record<string, UserPermissionStatus> = {};
```

---

# Loose Object Literal Ban

Do not bypass object structures by initializing variables as unconstrained generic containers.

```typescript
// FORBIDDEN
const configurationSettings: object = { url: "https://..." }; // lacks type-safe key indexing
```

```typescript
// PREFERRED
interface ConnectionSettings {
  url: string;
}

const configurationSettings: ConnectionSettings = { url: "https://..." };
```

---

# Next.js 15 Server Component Props Architecture

Next.js dynamic routing structures must type URL parameters explicitly.

```typescript
// PREFERRED
interface SegmentParams {
  params: Promise<{
    workspaceId: string;
    featureId: string;
  }>;
}

export default async function FeaturePage({ params }: SegmentParams) {
  const { workspaceId, featureId } = await params;
  // Execution context remains 100% strict
}
```

---

# Next.js 15 Route Handler Parameters

API routing endpoints must preserve request typing constraints.

```typescript
// PREFERRED
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const incomingBody: UnknownPayloadStructure = await request.json();
  return NextResponse.json({ success: true });
}
```

---

# Third-Party Module Boundary Strategy

Wrap undocumented or untyped library exports inside a localized ambient typing declaration definition file (`.d.ts`).

Do not use `any` bypass layouts to suppress third-party module resolution warnings.

Isolate third-party ambiguities from the core platform core architecture.

---

# Type Suppression Comment Ban

Explicit directive comments designed to silence compiler warnings are prohibited.

Do not use:
* `@ts-ignore`
* `@ts-nocheck`

Suppressing a warning hides architectural decay.

---

# Controlled Exception Exception

In highly complex generic orchestration scenarios where a compiler limitation occurs, `@ts-expect-error` is permitted.

Requirements:
* a descriptive architectural comment must precede the directive
* explain precisely why the compiler fails to resolve the line
* do not use as a quick fix for poorly authored interfaces

---

# Utility Type Leverage Guidelines

Leverage structural TypeScript utilities to transform existing interfaces without creating typing debt.

Utilities to prefer:
* `Pick<T, K>` to extract subsets of components props
* `Omit<T, K>` to drop base parameters before extension
* `Partial<T>` for incremental staging workflows

---

# AI Engine Compilation Guard Rules

The AI generation engine must abort code execution pathways if a clean type abstraction cannot be found.

Prioritize finding or creating an explicit typing entity over delivering loose structural implementations.

Never introduce temporary type structures to accelerate conversational output.

---

# Forbidden Typing Shortcuts Summary

Avoid:
* using `any` to quickly bypass deep nested typing definitions
* declaring generic parameters without boundaries
* casting variables down to unvetted shapes via assertions
* ignoring structural compiler parameters on form setups
* bypassing native mouse/keyboard event parameters

---

# Preferred Typing Characteristics

Prefer architectures that feel:
* rigidly guarded from external entry to internal layout
* self-documenting through robust contract boundaries
* completely transparent to static diagnostics systems
* modularly bound to application domain contracts

---

# Final Strict Definition of Done

No file branch or pull request will merge if it introduces, maintains, or passes an unresolved type node using the `any` keyword.

Static type security guarantees the premium engineering delivery value of the platform.