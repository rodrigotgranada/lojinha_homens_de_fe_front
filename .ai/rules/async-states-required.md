# Granada Architecture Rules: Async States Required

This document defines the official binary validation rules, state orchestration thresholds, data-fetching branch structures, and interface requirements regarding the mandatory treatment of asynchronous states across the platform.

Leaving any asynchronous operation without explicit visual tracking for all lifecycles is treated as a critical architectural failure.

The goal is not simply adding loading indicators to pass code reviews.

The goal is to ensure:

* 100% predictable user interfaces during network and application latency cycles
* zero layout shifts (CLS mitigation) during asynchronous data hydration
* localized and actionable fault recovery hooks via structural error gates
* meaningful conversational empty states that eliminate dead-ends for operators
* fluid user experience continuity matching premium design specifications
* AI-friendly predictable async presentation code generation layouts

Every component, section, dashboard widget, or view that depends on asynchronous data must handle three core states explicitly: Loading, Error, and Empty.

---

# Core Async Governance Philosophy

Asynchronous execution states are core interface modules, never secondary edge cases.

A view layout that remains blank, freezes, or flashes abruptly during data orchestration is considered non-compliant.

Presentation frameworks must isolate background server state transitions gracefully without disrupting overall layout stability.

Avoid creating binary conditional trees that only assume success scenarios.

---

# Prohibited Fragile Ternary Pattern

Do not write simplistic, un-vetted conditional expressions that ignore error boundaries or map loading pipelines to empty layout frames.

Bypassing state trees causes unexpected app shell breaks and degrades developer experience.

```tsx
// FORBIDDEN - Structural regression: ignores error variables and blocks layout context
export const TeamMemberList = () => {
  const { data: members, isLoading } = useTeamMembers();

  if (isLoading) return <Spinner />; // Floating spinner in a vacuum

  return (
    <Box>
      {members.map(member => <MemberCard key={member.id} data={member} />)}
    </Box>
  );
};
```

---

# Mandated 3-State Explicit Branching Pattern

Data consumption layouts must evaluate asynchronous parameters sequentially and return structured, domain-aware semantic states.

Ensure full compliance with rules established in `.ai/skills/future/granada-loading-architecture.md` and `.ai/skills/future/granada-error-recovery.md`.

```tsx
// PREFERRED - Production-grade structured async state orchestration layout
export const TeamMemberList = () => {
  const { data: members, isLoading, error, refetch } = useTeamMembers();

  if (isLoading) {
    return <TeamMemberListSkeleton />;
  }

  if (error) {
    return <TeamComponentErrorFallback errorContext={error} retryAction={refetch} />;
  }

  if (!members || members.length === 0) {
    return <TeamMemberEmptyState />;
  }

  return (
    <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
      {members.map((member) => (
        <TeamMemberCard key={member.id} profile={member} />
      ))}
    </Grid>
  );
};
```

---

# Skeleton Continuity Mandate

Asynchronous read operations that cross the 300ms network delay threshold must employ compound layout skeleton structures.

Requirements:
* skeleton components must match the precise dimensional footprints of successful data modules
* combine `SkeletonCircle`, `SkeletonText`, and semantic block placeholders to form wireframes
* apply native design tokens to maintain layout continuity during transition

Avoid using generic spinning indicators for major page section hydration blocks.

---

# Actionable Error Interface Standards

Component error interfaces must never land into static dead-ends.

Every rendered error panel must resolve tracking variables by providing a clean programmatic recovery action.

Requirements:
* map retry actions directly to TanStack Query `refetch` or localized state reload parameters
* translate structural HTTP status logs into human-centric sentences
* protect the background application container shell from collapsing completely

---

# Empty State Call-to-Action (CTA) Requirement

An empty interface view layer lacking a guided forward pathway is an anti-pattern.

When a query collection returns an empty array, the empty layout card must prompt the operator toward a productive workflow initialization block.

Requirements:
* outline exactly why the view contains no active data profiles
* include an explicit Call-to-Action button (e.g., "Criar Novo Registro", "Convidar Membro")
* if authorization prevents creation, direct the user to search filters adjustment

---

# Empty State Layout Pattern

Incorporate structural guiding assets inside empty data containers.

```tsx
// PREFERRED - Direct user orientation and immediate actionable loop
import { EmptyState } from "@/components/ui/empty-state";
import { PlusIcon } from "@/assets/icons";

export const TeamMemberEmptyState = () => {
  const { handleOpenInviteModal } = useTeamActions();

  return (
    <EmptyState.Root maxW="md" mx="auto" py={12}>
      <EmptyState.Indicator bg="bg.muted" borderRadius="full" p={4}>
        <Icon as={PlusIcon} boxSize={6} color="fg.muted" />
      </EmptyState.Indicator>
      <EmptyState.Content>
        <EmptyState.Title>Nenhum membro encontrado</EmptyState.Title>
        <EmptyState.Description>
          Este workspace ainda não possui colaboradores cadastrados. Comece convidando seu time.
        </EmptyState.Description>
      </EmptyState.Content>
      <EmptyState.Footer>
        <Button onClick={handleOpenInviteModal} variant="solid" colorPalette="blue">
          Convidar primeiro membro
        </Button>
      </EmptyState.Footer>
    </EmptyState.Root>
  );
};
```

---

# TanStack Query Status Variable Binding

Leverage native status indicator attributes exposed by the state management utilities cleanly.

Do not create duplicated local component state parameters (`const [loading, setLoading] = useState(false)`) to monitor query fetch behaviors manually.

Use explicit variables: `isLoading`, `isFetching`, `error`, `isSuccess`.

---

# Mutation State Submission Feedbacks

Data write operations (POST, PUT, DELETE) must bind submission status variables directly to the interactive triggering elements.

Requirements:
* buttons that fire mutations must adopt `loading` attributes directly while request processing is active
* append explicit text indicators (e.g., "Salvando...", "Processando...") onto button text nodes
* keep baseline user interaction elements disabled during transaction execution to stop double-submits

---

# Mutation Processing Pattern

Lock interactions declaratively during write processing routines.

```tsx
// PREFERRED - Native state feedback integration
const { mutate, isPending } = useCreateProjectMutation();

return (
  <Button 
    type="submit" 
    loading={isPending} 
    loadingText="Criando projeto..."
    variant="solid"
  >
    Criar novo projeto
  </Button>
);
```

---

# Layout Shift Suppression Mandate

The layout positioning map must remain stable during the transition between the loading skeleton representation and final success data rendering.

Set explicit minimum height boundaries (`minH`) or permanent height tokens on parent data wrapper panels.

Prevent adjacent layout modules from shifting positions vertically or horizontally when data arrives.

---

# AI Code Generation Core Guard Rules

The AI orchestration engine must strictly decline code generation instructions that output partial data views missing lifecycle state handlers.

When tasked with composing an interaction layout, dashboard, list section, or database consumer form, the agent must build all tracking branches automatically.

The AI must draft the matching skeleton structure, error handling block, and actionable empty UI panels in tandem with the primary layout view.

Never output simplified mock components that drop state branches to save conversational output volume.

---

# Forbidden Asynchronous Anti-Patterns Summary

Avoid:
* mapping async requests without providing explicit loading placeholders or fallback interfaces
* using un-styled text nodes or raw browser alerts (`alert(error)`) to display error data
* rendering empty result screens that lack a Call-to-Action or guided recovery loop
* setting local duplicate reactive states to track background network lifecycles manually
* layout shifts that alter component bounding coordinates upon successful cache updates

---

# Preferred Asynchronous Characteristics

Prefer interface codebases that feel:
* structurally guarded against unexpected data delivery gaps or network timeouts
* visually consistent and smooth during structural framework state transformations
* proactive in guiding users past application states or server errors
* clean, deterministic, and fully uncoupled from raw local state switches

---

# Final Asynchronous Definition of Done

No data-dependent view layout, dashboard pane, form grid, or transactional page section will pass integration validation blocks if it fails to explicitly implement the core three async states.

Complete asynchronous lifecycle control guarantees the elite performance metrics of the premium SaaS platform.