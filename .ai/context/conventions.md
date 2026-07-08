# Engineering Conventions

This document defines the official engineering conventions for the platform.

The goal of these conventions is to guarantee:

* consistency
* scalability
* readability
* maintainability
* predictable patterns
* AI-friendly development

All implementations should follow these conventions unless a documented architectural decision explicitly states otherwise.

---

# Core Convention Philosophy

Conventions exist to:

* reduce ambiguity
* reduce cognitive load
* improve maintainability
* improve onboarding
* improve scalability
* improve AI contextual understanding

Consistency is prioritized over personal preference.

---

# General Engineering Principles

Prefer:

* simple solutions
* explicit code
* predictable APIs
* reusable abstractions
* semantic naming
* isolated responsibilities
* composition-first architecture

Avoid:

* clever code
* hidden side effects
* oversized abstractions
* tightly coupled implementations
* premature optimization
* inconsistent patterns

---

# File Organization Conventions

Files should remain:

* isolated
* readable
* predictable
* responsibility-oriented

Avoid:

* giant files
* mixed concerns
* excessive nesting
* ambiguous naming

---

# Component File Conventions

Preferred structure:

```txt
Component/
├── base/
├── variants/
├── semantic/
├── hooks/
├── styles/
├── types/
└── index.ts
```

---

# Component Naming Conventions

Use PascalCase for components.

Examples:

```tsx
<UserTable />
<PermissionsDrawer />
<AnalyticsCard />
```

Component names should:

* describe intent
* describe responsibility
* remain semantic
* remain predictable

Avoid vague names like:

* DataBox
* MainComponent
* GenericWrapper

---

# Hook Naming Conventions

Hooks must:

* start with `use`
* use camelCase
* describe responsibility

Examples:

```tsx
useUsers()
usePermissions()
useAsyncState()
useSidebarStore()
```

Avoid generic names like:

```tsx
useData()
useFetch()
useStuff()
```

---

# Folder Naming Conventions

Folders should use kebab-case.

Examples:

```txt
user-management/
analytics-dashboard/
permissions-system/
```

Avoid:

```txt
UserManagement/
userManagement/
USER_MANAGEMENT/
```

---

# Type Naming Conventions

Use PascalCase for types and interfaces.

Examples:

```ts
User
UserPermissions
DashboardFilters
```

Avoid redundant prefixes:

```ts
IUser
TUser
```

unless strictly necessary.

---

# Boolean Naming Conventions

Boolean variables should sound declarative.

Preferred:

```ts
isLoading
hasPermission
canEdit
shouldRetry
```

Avoid:

```ts
loading
permission
edit
retry
```

when ambiguity exists.

---

# Function Naming Conventions

Functions should describe intent clearly.

Preferred:

```ts
fetchUsers()
createInvoice()
updatePermissions()
validateForm()
```

Avoid:

```ts
handleStuff()
processData()
doAction()
```

---

# Component Responsibility Conventions

Components should have focused responsibilities.

Prefer:

* small reusable primitives
* semantic compositions
* isolated concerns

Avoid:

* giant multi-purpose components
* business orchestration inside UI
* excessive prop APIs

Components above ~250 lines should be reviewed for decomposition.

---

# JSX Conventions

JSX should remain readable.

Prefer:

* extracted logic
* semantic composition
* declarative rendering

Avoid:

* large inline conditions
* deeply nested ternaries
* excessive anonymous functions
* business logic inside JSX

---

# Props Conventions

Props should remain:

* minimal
* explicit
* predictable

Avoid:

* prop explosion
* boolean overload
* unrelated responsibilities

Prefer semantic APIs.

Preferred:

```tsx
<Modal size="lg" />
```

Avoid:

```tsx
<Modal big={true} largeSpacing={true} />
```

---

# State Management Conventions

Keep state as local as possible.

Prefer:

* local state first
* Zustand for shared client state
* TanStack Query for server state

Avoid:

* duplicated state
* unnecessary global state
* syncing multiple sources of truth

---

# Async Conventions

Async flows must support:

* loading states
* error states
* retry actions
* empty states
* optimistic updates when appropriate

Avoid:

* invisible loading
* blank screens
* blocking UX
* duplicated async orchestration

---

# Fetching Conventions

Prefer:

```tsx
const { data, isLoading } = useUsers()
```

Avoid:

```tsx
useEffect(() => {
  fetch(...)
})
```

unless strictly necessary.

Fetching logic should remain isolated from presentation.

---

# Form Conventions

All forms must:

* use React Hook Form
* use Yup validation
* support accessibility
* support keyboard navigation
* support loading states
* support validation feedback

Validation should remain isolated from UI.

---

# Validation Conventions

Validation should be:

* declarative
* reusable
* composable
* isolated

Avoid validation logic directly inside components.

---

# Styling Conventions

Styling should prioritize:

* Chakra tokens
* semantic spacing
* responsive props
* reusable recipes
* visual consistency

Avoid:

* magic values
* duplicated styles
* inconsistent spacing
* excessive inline styling

---

# Responsive Conventions

Mobile-first is mandatory.

All layouts should:

* start from mobile
* progressively scale
* support touch interactions
* support adaptive spacing

Desktop should enhance the experience rather than redefine it.

---

# Accessibility Conventions

Accessibility is mandatory.

All interactive elements must support:

* keyboard navigation
* visible focus
* semantic HTML
* screen readers
* ARIA attributes
* reduced motion

Accessibility must exist at the primitive layer whenever possible.

---

# Loading UX Conventions

Loading experiences should feel intentional.

Prefer:

* skeletons
* optimistic transitions
* progressive loading

Avoid:

* layout shifts
* flickering
* blank containers
* abrupt transitions

---

# Error Handling Conventions

Errors should feel graceful.

Requirements:

* actionable messages
* retry actions
* isolated failures
* predictable behavior

Avoid:

* silent failures
* raw backend errors
* broken layouts

---

# Reusability Conventions

Do not abstract too early.

Create reusable abstractions only when:

* duplication exists
* patterns stabilize
* readability improves
* maintainability improves

Avoid speculative abstractions.

---

# AI-Friendly Conventions

The codebase must remain:

* explicit
* predictable
* semantically organized
* convention-driven
* low ambiguity

The architecture should optimize contextual understanding for both developers and AI systems.

---

# Forbidden Conventions

Avoid:

* `any`
* giant components
* deeply nested JSX
* inline business logic
* duplicated state
* duplicated validation
* excessive `useEffect`
* mixed responsibilities
* tightly coupled modules
* inconsistent APIs

---

# Preferred Engineering Style

Prefer:

* declarative code
* semantic abstractions
* reusable hooks
* isolated responsibilities
* composition-first patterns
* scalable APIs
* predictable structures

---

# Definition of Convention Quality

A high-quality implementation should feel:

* consistent
* readable
* scalable
* maintainable
* accessible
* responsive
* production-ready

The platform should consistently feel cohesive and intentional.
