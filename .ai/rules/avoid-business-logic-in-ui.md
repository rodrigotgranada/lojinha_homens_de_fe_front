# Granada Architecture Rules: Avoid Business Logic in UI

This document defines the official binary validation rules, architectural boundaries, separation of concerns metrics, and data processing standards regarding the absolute prohibition of embedding business logic, domain rules, or data processing equations inside the user interface presentation layers.

Placing business logic within presentation views is treated as a critical architectural regression.

The goal is not simply keeping JSX files visually clean.

The goal is to ensure:

* absolute separation between presentation layers and domain policy engines
* seamless testability of business rules through headless unit testing pipelines
* independent modification of user layouts without introducing data processing bugs
* immediate reuse of data transformations across multiple screen views
* optimal rendering performance by avoiding computing rules on every layout render
* AI-friendly predictable data-to-view orchestration trees

Components must strictly act as passive layout conduits that map pre-processed data structures to visual design tokens.

---

# Core Boundary Philosophy

The presentation layer (`.tsx`) must limit its scope to structural composition, styling, user event binding, and passive rendering.

How a piece of data is visualized belongs to the UI; what that data represents, how it is computed, filtered, or authorized belongs to the business logic layer.

Complexity must be extracted out of the layout hierarchy and encapsulated into pure utility functions, selectors, or custom framework hooks.

Avoid creating presentation components that "think" about domain validation constraints or data structural transformations.

---

# Prohibited Inline Data Transformation

Do not execute array manipulation computations, data sorting procedures, or item filtering criteria inline inside component functions or directly before layout mapping.

Processing raw server responses inside the view couples the UI tightly to specific API payload structures.

```tsx
// FORBIDDEN - Raw data calculation inside the presentation layer
export const OrderHistoryList = () => {
  const { data: orders } = useQuery({ queryKey: ['orders'], queryFn: fetchOrders });

  // Architectural Failure: Data filtering and sorting baked into the UI
  const processedOrders = orders
    ?.filter(order => order.status === 'completed' && order.totalValue > 100)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <VStack>
      {processedOrders?.map(order => <OrderCard key={order.id} order={order} />)}
    </VStack>
  );
};
```

---

# Mandated Selection/Hook Extraction Pattern

Extract data transformation logic completely into the data query hook abstraction layer or leverage TanStack Query's native `select` feature.

This optimizes cache retention and ensures the component consumes a clean, ready-to-render array model.

```typescript
// PREFERRED - Infrastructure custom hook wrapper
export const usePremiumOrderHistory = () => {
  return useQuery({
    queryKey: ['orders', 'premium'],
    queryFn: fetchOrders,
    select: (orders) => 
      orders
        .filter(order => order.status === 'completed' && order.totalValue > 100)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
  });
};
```

```tsx
// PREFERRED - Passive view layer consumption
export const OrderHistoryList = () => {
  const { data: premiumOrders, isLoading } = usePremiumOrderHistory();

  if (isLoading) return <OrderListSkeleton />;

  return (
    <VStack gap={4}>
      {premiumOrders?.map(order => <OrderCard key={order.id} order={order} />)}
    </VStack>
  );
};
```

---

# Prohibited Inline Permission Authorization

Do not embed multi-conditional permission calculations or role level comparisons directly into layout conditional branches.

Spreading authorization conditions across UI nodes introduces security leak regressions during system privilege scale-outs.

```tsx
// FORBIDDEN - Security policy logic hardcoded inside view layouts
export const SettingsDashboard = ({ user }: { user: UserContext }) => {
  return (
    <Box>
      {user.role === 'admin' || (user.permissions.includes('write:settings') && !user.isSuspended) ? (
        <AdvancedSettingsPanel />
      ) : (
        <AccessDeniedMessage />
      )}
    </Box>
  );
};
```

---

# Preferred Permission Abstraction Hook

Encapsulate privilege evaluation rules inside specialized domain access custom hooks or security gates.

```typescript
// PREFERRED - Centralized domain policy hook
export const useWorkspaceAccess = () => {
  const { user } = useSessionStore();
  
  const canModifySettings = 
    user.role === 'admin' || 
    (user.permissions.includes('write:settings') && !user.isSuspended);

  return { canModifySettings };
};
```

```tsx
// PREFERRED - Declarative, logic-free UI gate
export const SettingsDashboard = () => {
  const { canModifySettings } = useWorkspaceAccess();

  return (
    <Box className="gr-settings-container">
      {canModifySettings ? <AdvancedSettingsPanel /> : <AccessDeniedMessage />}
    </Box>
  );
};
```

---

# Prohibited Business Rule Math Formatting

Do not author financial calculation algorithms, currency conversion rates, date formatting strings, or mathematical totals inline inside JSX curly braces.

Data interpolation tags must strictly read static values or pre-formatted text strings.

```tsx
// FORBIDDEN - Financial rule computation leaking into presentation text nodes
<Text fontSize="xl" fontWeight="bold">
  {`R$ ${(item.price * item.quantity) - (item.discountCode ? 15 : 0)}`}
</Text>
```

---

# Preferred Pure Domain Selector Architecture

Delegate computational formatting tasks to pure utility selectors or dedicated domain modules that undergo isolated regression testing.

```typescript
// PREFERRED - infrastructure/selectors/cart.ts
export const computeCartTotal = (price: number, quantity: number, hasDiscount: boolean): string => {
  const baseValue = price * quantity;
  const targetAdjustment = hasDiscount ? 15 : 0;
  const finalNumericValue = Math.max(0, baseValue - targetAdjustment);
  
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(finalNumericValue);
};
```

```tsx
// PREFERRED - Clear, uncoupled text target matching
<Text fontSize="xl" fontWeight="bold" color="text.primary">
  {computeCartTotal(item.price, item.quantity, !!item.discountCode)}
</Text>
```

---

# Zustand Store State Mutation Rule

Component event handlers must not manually adjust deeply nested application store models inside localized views.

Modifying global variables or caching instances from within UI clicks violates flow predictability.

UI events must call descriptive, unified action methods exposed directly by the state management engine (`zustand`).

```typescript
// PREFERRED - State mutations completely locked inside store logic actions
export const useBillingStore = create<BillingStoreState>((set) => ({
  tier: 'free',
  upgradeToPremium: () => set(() => ({ tier: 'premium' })),
}));
```

---

# Form Validation Decoupling Mandate

Do not implement local business constraint validation logic manually inside input event triggers or component form submission blocks.

Form verification criteria must reside exclusively inside detached schema definitions utilizing React Hook Form + Yup, following rules outlined in `.ai/rules/forms-must-use-rhf.md`.

Components handle visual field grouping and feedback display; schema packages validate business constraints.

---

# AI Code Generation Guard Rules

The AI development execution framework must abort any generation route that intermixes domain formulas, authorization math, or server processing loops directly inside structural code paths.

When tasked with generating business-heavy interface screens, the agent must output a structured two-tier configuration bundle:
1. An infrastructure hook or selector module file tracking the algorithmic computational requirements.
2. An elegant presentation layer utilizing pure visual hooks to link layout primitives to the generated infrastructure selectors.

Never speed up code generation by sacrificing modular testability boundaries.

---

# Forbidden Business Logic UI Patterns Summary

Avoid:
* using `.filter`, `.sort`, or `.reduce` arrays inline inside the primary JSX block
* evaluating raw role parameters (`user.role === 'admin'`) across multi-conditional layout branches
* executing math formulas or string currency builders directly inside text wrappers
* embedding raw state data modeling setters inside layout click handlers
* processing complex dynamic validation states outside the unified form schemas

---

# Preferred Business Logic Boundaries Characteristics

Prefer systems architecture code structures that feel:
* completely headless (detaching the component allows running all business rules inside pure environments)
* reading data that arrived fully processed, aggregated, sorted, and clean
* lightweight, layout-centric, and purely focused on token assignment
* zero-computation (JSX elements act as simple visual blueprints mapping structures to parameters)

---

# Final Business Logic Definition of Done

No user interface layout module will merge into the source environment if it operates dynamic data transformation equations or encapsulates core domain policy restrictions.

Enforcing absolute headless separation protects the platform's ability to seamlessly scale its SaaS features safely over time.