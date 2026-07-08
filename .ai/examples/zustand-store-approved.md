# Approved Enterprise Zustand Store Module Example

This document defines the official premium reference model for global application state management using Zustand. It demonstrates how to enforce strict TypeScript type contracts, separate state records from structural mutation actions, and establish slice isolation with crisp selector patterns to guide the AI generation engine.

---

## Characteristics

* **Atomic Selector-Driven Pulling**: Designed to protect UI layout performance by forcing components to pull state parameters at the lowest possible granularity via strict selectors (`const activeTenant = useSessionStore(state => state.tenantId)`). This prevents massive global re-render cascades when unrelated variables update.
* **Decoupled Action Object Encapsulation**: Groups all state mutations, setters, and async network handshakes inside a singular, immutable `actions` namespace. Components consume actions statically, separating data flows from presentational cycles cleanly.
* **Strict Immutability Architecture**: Enforces structural state cloning via native JavaScript spreads (`...state`) to preserve the historical integrity of state logs, guaranteeing predictable snapshot transitions.
* **TypeScript Type Contract Safety**: Declares explicit, independent interfaces for the data record canvas (`SessionState`) and the behavioral execution matrix (`SessionActions`), providing 100% type safety without loose definitions or fallback parameters.
* **Zero Runtime Middleware Bloat**: Focuses on a lightweight, vanilla configuration pattern that minimizes runtime execution overhead while remaining instantly compatible with devtools logging engines.

---

## Approved Code Implementation

```typescript
import { create } from 'zustand';

// 1. Define Explicit, Strongly-Typed Model Context Layouts
export interface UserSessionPayload {
  userId: string;
  fullName: string;
  corporateEmail: string;
  activeRoles: string[];
}

export interface TenantConfigPayload {
  tenantId: string;
  workspaceSlug: string;
  subscriptionPlan: 'free' | 'growth' | 'enterprise';
}

// 2. Separate Static State Attributes from Mutable Behavioral Interfaces
interface SessionState {
  currentUser: UserSessionPayload | null;
  activeTenant: TenantConfigPayload | null;
  isAuthenticated: boolean;
  isHydratingSession: boolean;
}

interface SessionActions {
  initializeSessionHydration: (user: UserSessionPayload, tenant: TenantConfigPayload) => void;
  updateWorkspacePlan: (newPlan: TenantConfigPayload['subscriptionPlan']) => void;
  terminateSession: () => void;
}

// 3. Unify State and Actions Under a Master Store Matrix Interface
type SessionStoreMaster = SessionState & { actions: SessionActions };

/**
 * Granada Enterprise Approved Zustand Global Store Architecture Blueprint.
 * Demonstrates high-performance selector optimization and action encapsulation patterns.
 */
export const useSessionStore = create<SessionStoreMaster>((set) => ({
  // Baseline Unmutated State Core Records
  currentUser: null,
  activeTenant: null,
  isAuthenticated: false,
  isHydratingSession: true,

  // Encapsulated Immutable Action Controllers Namespace
  actions: {
    initializeSessionHydration: (user, tenant) => 
      set(() => ({
        currentUser: { ...user },
        activeTenant: { ...tenant },
        isAuthenticated: true,
        isHydratingSession: false,
      })),

    updateWorkspacePlan: (newPlan) => 
      set((state) => {
        // Enforce safe conditional validation boundaries
        if (!state.activeTenant) return {};
        
        return {
          activeTenant: {
            ...state.activeTenant,
            subscriptionPlan: newPlan,
          },
        };
      }),

    terminateSession: () => 
      set(() => ({
        currentUser: null,
        activeTenant: null,
        isAuthenticated: false,
        isHydratingSession: false,
      })),
  },
}));

// 4. Custom Architectural Selector Hooks Factory
// Protects the UI tier by providing ready-to-consume atomic extraction pathways
export const useSessionUser = () => useSessionStore((state) => state.currentUser);
export const useSessionTenant = () => useSessionStore((state) => state.activeTenant);
export const useIsAuthenticated = () => useSessionStore((state) => state.isAuthenticated);
export const useIsHydrating = () => useSessionStore((state) => state.isHydratingSession);

// Actions must be selected statically to prevent unnecessary component re-evaluations
export const useSessionActions = () => useSessionStore((state) => state.actions);
```

---

## Practical Presentation Tier Integration Model

This brief blueprint outlines how UI layout components must consume the store using the optimized atomic selectors defined above, guaranteeing maximum application responsiveness.

```tsx
// PREFERRED - Component consumes state at atomic granularity level to isolate renders
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { useSessionUser, useSessionTenant, useSessionActions } from './useSessionStore';

export const UserProfileWidgetView = () => {
  // Pulls atomic state blocks independently. Component ONLY re-renders if user data mutates.
  const currentUser = useSessionUser();
  const activeTenant = useSessionTenant();
  
  // Destructure static actions safely. Action references never change, generating 0 layout thrashing.
  const { updateWorkspacePlan, terminateSession } = useSessionActions();

  if (!currentUser || !activeTenant) {
    return <Text fontSize="sm" color="fg.muted">No active session context available.</Text>;
  }

  return (
    <Box p={5} bg="bg.surface" borderRadius="md" border="1px solid" borderColor="border.subtle">
      <Heading as="h4" size="sm" color="fg.primary">
        Logged in as: {currentUser.fullName}
      </Heading>
      <Text fontSize="xs" color="fg.secondary" mt={1}>
        Workspace Domain: {activeTenant.workspaceSlug} ({activeTenant.subscriptionPlan})
      </Text>
      
      <HStack gap={3} mt={4}>
        <Button size="sm" onClick={() => updateWorkspacePlan('enterprise')} colorPalette="purple">
          Upgrade to Enterprise
        </Button>
        <Button size="sm" variant="outline" onClick={terminateSession}>
          Logout
        </Button>
      </HStack>
    </Box>
  );
};```