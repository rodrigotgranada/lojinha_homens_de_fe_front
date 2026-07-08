# Granada Architecture Rules: Avoid Large Components

This document defines the official binary validation rules, file size limits, structural decomposition standards, and separation of concerns metrics regarding the absolute prohibition of monolithic, oversized components across the platform.

Giant components are treated as technical debt and maintenance failures.

The goal is not simply keeping files visually short.

The goal is to ensure:

* high cognitive scanability and low mental fatigue
* clear isolated unit testing boundaries
* maximizing reuse of visual and logical micro-primitives
* atomic re-rendering isolation to protect runtime performance
* elimination of spaghetti state management pipelines
* AI-friendly hyper-focused structural generation targets

Components exceeding code density limits must be proactively decomposed into modular sub-structures.

---

# Core Decomposing Philosophy

Monolithic UI layouts violate the Single Responsibility Principle (SRP) and increase regression risks.

Every component must execute exactly one logical or presentational objective.

Complexity must be managed horizontally through composition, never vertically through file inflation.

Avoid clustering multiple operational domains into a single structural block.

---

# Maximum Line Constraints

No single component file should exceed approximately 250 lines of total code execution.

This threshold includes:
* TypeScript typing and interface declarations
* local sub-helper expressions
* layout composition JSX trees
* styling recipe definitions

If a file approaches 250 lines, it must undergo immediate, mandatory architectural evaluation for division.

---

# JSX Nesting Depth Limits

Deeply nested XML tag structures indicate severe structural decay and poor developer experience.

JSX layout configurations must not exceed a maximum depth of 4 levels of structural nesting.

```tsx
// FORBIDDEN
<Box>
  <Card>
    <CardBody>
      <Flex>
        <VStack>
          <HStack> {/* Level 6 Nesting - Architectural Failure */}
            <Text>Content</Text>
          </HStack>
        </VStack>
      </Flex>
    </CardBody>
  </Card>
</Box>
```

---

# Nested Node Extraction Requirement

When a layout subtree requires deep contextual groupings, extract the internal layout nodes into isolated semantic sub-components.

```tsx
// PREFERRED
<CardContainer>
  <CardProfileSection />
  <CardMetricsGrid />
</CardContainer>
```

---

# Inline Array Mapping Constraints

Do not embed large, multi-line rendering blocks inside dynamic inline array mapping array operations.

If the internal layout tree inside a `.map()` block exceeds 5 lines of code, it must be extracted into a dedicated component.

```tsx
// FORBIDDEN
{users.map((user) => (
  <HStack key={user.id} p={4} borderBottom="1px solid">
    <Avatar src={user.avatarUrl} name={user.name} />
    <VStack align="start">
      <Text fontWeight="bold">{user.name}</Text>
      <Text fontSize="sm" color="muted">{user.email}</Text>
    </VStack>
    <Badge colorPalette={user.isActive ? "green" : "red"}>Status</Badge>
  </HStack>
))}
```

---

# Extracted Mapping Primitive Pattern

Isolate continuous row nodes to optimize memory allocation and readability.

```tsx
// PREFERRED
{users.map((user) => (
  <UserRowKeyItem key={user.id} user={user} />
))}
```

---

# Local State Count Limits

A component containing too many reactive state parameters signals a breakdown of structural abstraction.

No component should maintain more than 3 distinct primitive local `useState` allocations simultaneously.

Excessive local states must be refactored into:
* an independent custom state hook (`hooks/`)
* a specialized compound context wrapper
* a lightweight local feature Zustand store

---

# Prohibited Monolithic Feature Pattern

Do not combine data retrieval, list layout grids, advanced form interactions, and modal dialog states inside a single presentation layer.

```tsx
// FORBIDDEN - UserManagementView.tsx (500+ lines)
export const UserManagementView = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { data, isLoading } = useQuery(...);
  const { register, handleSubmit } = useForm(...);
  
  // Mixed data table layout, edit drawer form, and modal actions in one massive file
  return (
    <Box>
      <Table>...</Table> 
      <Drawer open={isOpen}>... Massive Form Layout Inside ...</Drawer>
    </Box>
  );
};
```

---

# Preferred Decomposed Composition Pattern

Orchestrate domain features by composing isolated semantic nodes that encapsulate their own concerns.

```tsx
// PREFERRED - UserManagementView.tsx (Clean Composition)
import { UserTable } from './semantic/UserTable';
import { UserEditDrawer } from './semantic/UserEditDrawer';
import { useUserManagementState } from './hooks/useUserManagementState';

export const UserManagementView = () => {
  const { activeUserId, isDrawerOpen, openEditDrawer, closeDrawer } = useUserManagementState();

  return (
    <WorkspaceLayoutContainer>
      <UserTable onEditSelect={openEditDrawer} />
      <UserEditDrawer userId={activeUserId} isOpen={isDrawerOpen} onClose={closeDrawer} />
    </WorkspaceLayoutContainer>
  );
};
```

---

# Separation of Presentation and Logic Hooks

UI layout configurations (`.tsx`) must focus strictly on layout composition, styling application, and semantic assembly.

Complex data computations, structural array filtering, action handlers, and mutation configurations must live in a custom hook.

The UI file passes visual props; the hook provides the analytical machinery.

---

# Conditional Fragment Extraction

Do not embed massive multi-branch conditional expressions inline inside the primary layout return code block.

Complex state views (e.g., handling complex multiple sub-stages) must be mapped to distinct helper elements or sub-views.

```tsx
// FORBIDDEN
return (
  <Box>
    {status === 'wizard_step_one' ? ( <VStack>...</VStack> ) : status === 'wizard_step_two' ? ( <HStack>...</HStack> ) : ( <Grid>...</Grid> )}
  </Box>
);
```

```tsx
// PREFERRED
return (
  <Box>
    <WizardStepDispatcher activeStep={status} />
  </Box>
);
```

---

# Chakra UI Component Stack Fragmentation

When building interfaces using Chakra UI v3, avoid creating massive inline layout groups using dozens of nested `Flex`, `Box`, `VStack`, and `Grid` configurations.

Group structural visual patterns into localized sub-layout compositions to prevent visual overload.

Keep the structural hierarchy readable within a single screen view.

---

# AI Code Generation Partition Mandates

The AI orchestration engine must strictly refuse to output long monolithic code blocks containing compressed nested interfaces.

If the generated result requires a data grid with mutation capabilities, the AI must partition the output across separate files:
1. Create the base typing definitions block (`types/`)
2. Create the data lifecycle hook block (`hooks/`)
3. Create the granular sub-primitive components (`variants/` or components)
4. Assemble the top-level semantic views (`semantic/`)

---

# Forbidden Component Patterns Summary

Avoid:
* writing single component structures that cross the 250-line code barrier
* building deep layout nesting trees that pass 4 levels of indentation
* writing long multi-line rendering blocks inline inside data loops (`.map`)
* stacking more than 3 primitive state variables in a presentational class
* mixing server fetching, form validations, and layout frameworks inside one module

---

# Preferred Component Characteristics

Prefer systems architecture layouts that feel:
* hyper-focused and componentized
* easily readable under 15 seconds of scrolling scanning
* composed of independent, highly-decoupled presentation units
* dry, lightweight, and single-purposed

---

# Final Decomposition Definition of Done

No module branch or pull request will be accepted into source control if it introduces bloated, unstructured monolithic component models.

Enforcing small, single-purpose components preserves the platform's high engineering standards and long-term maintainability metrics.