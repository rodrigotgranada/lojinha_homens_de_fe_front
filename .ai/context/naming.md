# Naming Standards

This document defines the official naming conventions for the platform.

Naming consistency is considered a core architectural requirement.

The goal is to guarantee:

* readability
* predictability
* semantic consistency
* maintainability
* AI contextual understanding
* scalable architecture

Consistent naming reduces cognitive load and improves engineering quality.

---

# Core Naming Philosophy

Names should prioritize:

* clarity
* predictability
* semantics
* explicit intent
* low ambiguity

Prefer descriptive names over short or clever names.

The codebase should feel self-documenting whenever possible.

---

# General Naming Rules

Prefer names that:

* describe responsibility
* describe intent
* describe domain meaning
* remain consistent with project patterns

Avoid names that are:

* vague
* generic
* overloaded
* abbreviated without necessity

---

# Language Standards

Technical naming must remain in English.

Examples:

* UserTable
* PermissionsForm
* BillingDrawer
* useUsers

Avoid mixing Portuguese and English in technical naming.

Avoid:

```txt id="ow4oqx"
TabelaUsuarios
DrawerPermissoes
```

---

# Component Naming

Components must use PascalCase.

Examples:

```tsx id="pfw84v"
<UserTable />
<SettingsDrawer />
<AnalyticsCard />
```

Component names should describe:

* domain
* responsibility
* intent

---

# Semantic Component Naming

Semantic components should prioritize domain language.

Preferred:

```tsx id="i6fjza"
UsersTable
PermissionsForm
BillingSettingsDrawer
AnalyticsOverviewCard
```

Avoid:

```tsx id="h0vtgx"
DataTable
CustomCard
MainDrawer
```

unless the abstraction is truly generic.

---

# Primitive Component Naming

Primitive components should remain generic and reusable.

Examples:

```tsx id="7c6wfh"
Button
Input
Modal
Drawer
Table
Tabs
```

Primitive names should remain domain-agnostic.

---

# Variant Naming

Variants should clearly describe specialization.

Examples:

```tsx id="e2d58l"
PrimaryButton
DangerButton
CompactTable
AsyncSelect
```

Avoid unclear names like:

```tsx id="s3bwxs"
SpecialButton
BetterTable
```

---

# Hook Naming

Hooks must:

* start with `use`
* use camelCase
* describe behavior or responsibility

Examples:

```tsx id="vzwj2w"
useUsers()
usePermissions()
useAsyncState()
useSidebarStore()
```

Avoid:

```tsx id="5o8lj8"
useData()
useThing()
useHandler()
```

---

# Async Hook Naming

Async hooks should clearly describe the resource or responsibility.

Preferred:

```tsx id="ptqupi"
useUsersQuery()
useCreateUserMutation()
useBillingInvoices()
```

Avoid ambiguous async naming.

---

# Store Naming

Stores should clearly describe state ownership.

Examples:

```tsx id="c9vgrm"
useSidebarStore()
useAuthStore()
useCommandPaletteStore()
```

Avoid:

```tsx id="1n8m0p"
useStore()
useGlobalStore()
```

---

# Provider Naming

Providers must use PascalCase and end with `Provider`.

Examples:

```tsx id="n3uoq4"
AuthProvider
ThemeProvider
QueryProvider
```

---

# Context Naming

Contexts must end with `Context`.

Examples:

```tsx id="6m89w0"
AuthContext
ThemeContext
PermissionsContext
```

---

# Type Naming

Types and interfaces must use PascalCase.

Examples:

```ts id="4kqjlwm"
User
UserPermissions
DashboardFilters
```

Avoid unnecessary prefixes:

```ts id="j98ehf"
IUser
TUser
```

unless justified.

---

# Enum Naming

Enums should describe domain meaning clearly.

Examples:

```ts id="icfy4x"
UserRole
PermissionType
BillingStatus
```

Avoid vague enum names.

---

# Boolean Naming

Boolean variables should sound declarative.

Preferred prefixes:

* is
* has
* can
* should

Examples:

```ts id="yijbqo"
isLoading
hasPermission
canEdit
shouldRetry
```

Avoid ambiguous boolean names.

Avoid:

```ts id="o1lr4h"
loading
permission
edit
retry
```

when context is unclear.

---

# Function Naming

Functions should describe actions clearly.

Preferred:

```ts id="luj96g"
fetchUsers()
createInvoice()
updatePermissions()
validateForm()
```

Avoid:

```ts id="xyrjqx"
handleData()
processStuff()
executeAction()
```

---

# Event Handler Naming

Event handlers should start with `handle`.

Examples:

```ts id="0cuzha"
handleSubmit
handleClose
handleDelete
handleRetry
```

---

# File Naming

File naming should remain predictable.

## React Components

Use PascalCase.

Examples:

```txt id="3ltmr5"
Button.tsx
Modal.tsx
UsersTable.tsx
```

---

## Hooks

Use camelCase.

Examples:

```txt id="cf8mca"
useUsers.ts
usePermissions.ts
```

---

## Utilities

Use camelCase.

Examples:

```txt id="2m8wql"
formatCurrency.ts
buildQueryParams.ts
```

---

## Types

Use PascalCase when exported as main contracts.

Examples:

```txt id="6q3ajd"
User.ts
Permissions.ts
```

---

# Folder Naming

Folders must use kebab-case.

Examples:

```txt id="gjf87f"
user-management/
analytics-dashboard/
permissions-system/
```

Avoid:

```txt id="x2waf9"
UserManagement/
userManagement/
USER_MANAGEMENT/
```

---

# API Naming

API functions should describe backend intent clearly.

Examples:

```ts id="mckn9d"
fetchUsers
createUser
updateBillingSettings
deletePermission
```

Avoid generic API names.

---

# Query Naming

TanStack Query hooks should describe responsibility clearly.

Preferred:

```ts id="0bgjlwm"
useUsersQuery
useBillingInvoicesQuery
useCreateUserMutation
```

---

# Form Naming

Forms should end with `Form`.

Examples:

```tsx id="gxv2yz"
LoginForm
UserForm
PermissionsForm
```

Validation schemas should remain semantically aligned.

Examples:

```ts id="dujlwm"
loginSchema
userSchema
permissionsSchema
```

---

# Modal and Drawer Naming

Components representing actions or workflows should describe intent clearly.

Examples:

```tsx id="c6zj4d"
DeleteUserModal
PermissionsDrawer
BillingSettingsModal
```

Avoid generic modal naming.

---

# Table Naming

Tables should describe domain data clearly.

Examples:

```tsx id="quhq67"
UsersTable
InvoicesTable
PermissionsTable
```

Avoid:

```tsx id="bwzr7t"
DataTable
CustomTable
```

unless truly generic.

---

# Page Naming

Pages should describe domain intent.

Examples:

```txt id="jlwmz1"
users-page/
billing-settings/
dashboard-overview/
```

---

# Responsive Variant Naming

Responsive variants should remain explicit.

Examples:

```tsx id="jlwmz2"
MobileSidebar
DesktopSidebar
CompactTable
ResponsiveGrid
```

Avoid hidden responsive behavior in naming.

---

# Accessibility Naming

Accessibility-related props and variables should remain explicit.

Examples:

```tsx id="jlwmz3"
ariaLabel
isKeyboardNavigationEnabled
focusTrapEnabled
```

Avoid vague accessibility naming.

---

# AI-Friendly Naming Philosophy

Naming should optimize:

* semantic clarity
* contextual understanding
* predictability
* reusable mental models

The codebase should feel understandable without excessive explanation.

---

# Forbidden Naming Patterns

Avoid:

* vague naming
* meaningless abbreviations
* overloaded names
* inconsistent terminology
* mixed languages
* duplicated naming patterns
* generic wrapper naming

Examples to avoid:

```txt id="jlwmz4"
DataBox
MainContainer
StuffHandler
GenericComponent
```

---

# Preferred Naming Philosophy

Prefer names that feel:

* semantic
* explicit
* predictable
* scalable
* reusable
* domain-oriented

The naming system should feel cohesive across the entire platform.

---

# Final Naming Goal

The platform naming conventions should create:

* low ambiguity
* strong readability
* scalable architecture
* predictable APIs
* AI-friendly engineering
* self-documenting code structure

A developer should understand most responsibilities directly from naming alone.
