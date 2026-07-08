# Granada Data Fetching Rules: No Inline Fetch Allowed

This document defines the official binary validation rules, architectural boundaries, tokenized API client mappings, and state orchestration patterns regarding the absolute prohibition of raw, inline HTTP requests inside UI layers.

Inline network fetching is treated as a severe architectural boundary violation.

The goal is not simply forcing standard tool usage.

The goal is to ensure:

* clean separation between presentation and network infrastructures
* centralized HTTP interceptor, header, and security orchestration
* robust client-side server state caching via TanStack Query
* reliable multi-layer loading, error, and retry stability
* frictionless server-to-client query hydration pipelines
* AI-friendly predictable data layer generation patterns

No component or hook should communicate with network systems using raw ad-hoc code hooks.

---

# Core Ban Rule

Raw HTTP interaction mechanisms must never be invoked inside presentation components or layout files.

Prohibited mechanisms include:
* window.fetch()
* axios.get() / axios.post()
* XMLHttpRequest instances
* third-party inline query wrappers outside infrastructure primitives

Data synchronization must route exclusively through abstracted custom state hooks.

---

# Prohibited UseEffect Fetching Pattern

Do not utilize standard React lifecycle effects to pull network datasets.

Inline async routines inside lifecycles cause state synchronization race conditions and bypass state caching layers.

```tsx
// FORBIDDEN
useEffect(() => {
  fetch('/api/users')
    .then(res => res.json())
    .then(data => setUsers(data));
}, []);
```

---

# Prohibited Inline Event Handler Fetching

Do not instantiate raw network requests inside action triggers or form submission event pathways.

```tsx
// FORBIDDEN
const handleCreateWorkspace = async (formData) => {
  await axios.post('/api/workspaces', formData);
};
```

---

# Mandated Custom Hook Abstraction Layer

All data fetching operations must reside within dedicated semantic custom hooks.

Custom hooks isolate presentation views from endpoint structural configuration changes.

```typescript
// PREFERRED
export const useWorkspaceProfiles = () => {
  return useQuery<WorkspaceProfile[], Error>({
    queryKey: workspaceKeys.lists(),
    queryFn: workspaceService.getProfiles,
  });
};
```

---

# Presentational Layer Consumption Standard

UI Components must interact strictly with clean state properties exposed by infrastructure custom hooks.

```tsx
// PREFERRED
export const WorkspaceList = () => {
  const { data: profiles, isLoading, error, refetch } = useWorkspaceProfiles();
  
  if (isLoading) return <WorkspaceListSkeleton />;
  if (error) return <WorkspaceListErrorState retryRef={refetch} />;
  
  return <ProfileGrid items={profiles} />;
};
```

---

# Centralized API Client Requirement

All network operations must route through the official platform HTTP client instance wrapper (`api`).

Do not create standalone client fetch structures inside features.

The central client manages:
* authorization token injection (JWT)
* automatic refresh token rotational orchestration
* content-type metadata standards
* global error interceptor telemetry piping

---

# TanStack Query Configuration Rules

All read operations must leverage the semantic composition of `useQuery`.

Requirements:
* declare explicit domain query keys using specialized key factory objects
* enforce runtime typing contracts for query payload configurations
* avoid mixing manual state tracking variables alongside native status flags

---

# Query Key Factory Pattern Mandate

Query keys must not be typed manually as free-form inline strings.

Use a structured key production factory to eliminate cache mismatch bugs.

```typescript
// PREFERRED
export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  details: (id: string) => [...userKeys.all, 'detail', id] as const,
};
```

---

# TanStack Query Mutation Configuration Rules

All data modification processes (POST, PUT, DELETE, PATCH) must use `useMutation`.

Requirements:
* handle success scenarios through explicit cache invalidation directives
* bind error results seamlessly to structural notification interfaces
* trigger optimistic caching changes where safe and predictable

---

# Cache Invalidation Sequencing Pattern

Mutations must invalidate matching data queries immediately upon successful server execution.

```typescript
// PREFERRED
export const useCreateWorkspaceMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: workspaceService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workspaceKeys.lists() });
    },
  });
};
```

---

# Next.js 15 Server Component Fetching Exception

Next.js React Server Components (RSC) are allowed to perform direct data fetch operations.

Condition: Raw string endpoints must still be hidden behind a semantic domain service abstraction layer.

Do not write raw URL query configurations inside the server page markup file.

---

# Server Component Abstraction Pattern

Isolate server database/network logic inside clean data service operations.

```tsx
// PREFERRED - app/workspaces/page.tsx
import { workspaceService } from '@/infrastructure/services/workspace';

export default async function WorkspacesPage() {
  const structuralData = await workspaceService.getServerCollection();
  
  return <WorkspaceDashboard initialData={structuralData} />;
}
```

---

# Next.js 15 Route Handlers Standard

Next.js API route handlers must delegate business processing tasks to standardized service controllers.

```typescript
// PREFERRED - app/api/workspaces/route.ts
import { workspaceController } from '@/infrastructure/controllers/workspace';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  return workspaceController.handleGetCollection(request);
}
```

---

# Async State Integration Requirement

Data fetch consumers must explicitly handle all native state indicators.

Every data component implementation must match rules laid out in `.ai/skills/future/granada-loading-architecture.md` and `.ai/skills/future/granada-error-recovery.md`.

Never output success layouts while state operations are pending or failed.

---

# Error Interception Standard

Network errors returned by the central service client must map directly to standardized frontend objects.

Do not pass raw HTTP payload dumps down into components.

Convert system failure codes to user-friendly messages via mapping layers.

---

# AI Code Generation Guard Rules

The AI orchestration engine must never emit blocks containing raw fetch or axios declarations inside `.tsx` or structural component files.

If a data layer endpoint operation is required, the engine must construct the service method and the matching query hook before generating the UI layout view.

Never compromise architectural separation layers to shorten conversational output text.

---

# Forbidden Data Fetching Patterns Summary

Avoid:
* writing raw `fetch('url')` statements inside presentational views
* embedding network triggers inside vanilla `useEffect` hooks
* manual state tracking tracking (`const [isLoading, setIsLoading] = useState(false)`) for network states
* raw string arrays for TanStack Query keys
* inline server string fetching inside Next.js Server Pages

---

# Preferred Data Fetching Characteristics

Prefer implementations that feel:
* strictly isolated inside infrastructure layers
* declaratively bound to components via custom state hooks
* unified under the centralized HTTP client controller
* fully cached and managed via automated cache invalidation patterns

---

# Final Definition of Done

No presentation component, form view, layout grid, or view wrapper script will pass review if it references inline network client actions.

Absolute infrastructure isolation protects the platform's multi-tenant delivery metrics.