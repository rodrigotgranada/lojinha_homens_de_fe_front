# Granada Architecture Rules: Mobile-First Required

This document defines the official binary validation rules, breakpoint standards, touch-target constraints, and responsive fluid layout mandates regarding the strict enforcement of mobile-first engineering across the platform.

Designing desktop-first layouts and retrofitting them for smaller viewports is treated as a severe architectural failure.

The goal is not simply making elements stack on smaller viewports.

The goal is to ensure:

* 100% fluid, responsive interfaces starting from zero-width viewports
* optimal hit-target safety regions for mobile web touch interactions
* native-like responsive adaptations of heavy enterprise tools (Tandem Drawers, Data Grids)
* semantic use of Chakra UI v3 responsive design tokens
* elimination of accidental horizontal layout overflow anomalies
* AI-friendly predictable fluid layout code generation trees

Every stylesheet, visual token array, and container layout tree must be engineered from the mobile perspective up.

---

# Core Mobile-First Philosophy

Mobile-first engineering means the default, un-breakpoint-wrapped styles must target the absolute smallest viewport interface.

Desktop enhancements are progressive layers added as screen real estate increases.

Never write baseline styles designed for large screens and scale them down using max-width rules.

Avoid building desktop layouts that collapse into broken, un-scrollable blocks on touch devices.

---

# Prohibited Desktop-First Syntax Pattern

Do not use hardcoded pixel widths on top-level containers or wrap mobile overrides inside down-scaling parameters.

Do not use absolute layout assumptions as the base value.

```tsx
// FORBIDDEN - Hardcoded container and lack of base viewport declaration
<Box width="1200px" p="6">
  <Flex direction="row">
    <SidebarView />
    <MainContent />
  </Flex>
</Box>
```

---

# Mandated Mobile-First Responsive Object Syntax

Leverage Chakra UI v3 object responsive properties to declare multi-screen layout parameters cleanly.

The `base` key must always represent the mobile baseline configuration. Higher breakpoint hooks (`sm`, `md`, `lg`, `xl`) progressively expand the system layout.

```tsx
// PREFERRED - Fluid, mobile-first mobile-to-desktop scaling composition
<Box width="100%" maxW="1200px" mx="auto" p={{ base: 4, md: 6 }}>
  <Flex direction={{ base: "column", lg: "row" }} gap={4}>
    <SidebarView />
    <MainContent />
  </Flex>
</Box>
```

---

# Mandatory 44px Touch Target Safety Rule

Every interactive element, navigation link, trigger slot, or clickable asset button must declare a minimum interactive touch target region of 44x44 pixels.

Touch interfaces lack mouse cursor precision. Small target configurations isolate mobile operators.

Achieve target compliance using explicit padding configurations or dedicated height tokens, never by forcing visual text sizes upward.

```tsx
// FORBIDDEN - Mini touch target cluster
<IconButton size="xs" onClick={handleRefresh}>
  <RefreshIcon />
</IconButton>
```

```tsx
// PREFERRED - Visual size is compact, but interactive footprint satisfies 44px boundary
<IconButton 
  size="md" 
  p={3}
  minW="44px" 
  minH="44px" 
  onClick={handleRefresh}
  className="gr-mobile-touch-safe"
>
  <RefreshIcon />
</IconButton>
```

---

# Fixed Width Prohibitive Restraint

Do not apply rigid fixed pixel widths (`width: "800px"`) to layout containers, structural grids, dashboard card wrappers, or input blocks.

Fixed constraints clip layouts on narrow displays and trigger horizontal scrolling anomalies.

Containers must adapt fluidly using relative percentages (`100%`), fractional layout grid tracks (`1fr`), or strict design system boundary tokens (`maxW`).

---

# Responsive Fluid Grids Pattern

Utilize the Chakra UI v3 `Grid` primitive with dynamic `repeat` expressions to automate card column redistribution across breaking viewports.

```tsx
// PREFERRED - Fully adaptive operational metrics grid layout
<Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={4}>
  <MetricsCard title="MRR" value="$42,000" />
  <MetricsCard title="Churn" value="1.2%" />
  <MetricsCard title="Active Users" value="1,840" />
  <MetricsCard title="Conversion" value="3.4%" />
</Grid>
```

---

# Fluid Typography Rules

Font size parameters must scale smoothly across viewport jumps to prevent heading text from wrapping awkwardly or fragmenting visual hierarchies on narrow screens.

Leverage the design system's responsive typography token arrays for text properties.

```tsx
// PREFERRED - Dynamic heading text assignment
<Heading as="h1" size={{ base: "xl", md: "2xl", lg: "3xl" }} tracking="tight">
  Visão Geral do Sistema
</Heading>
```

---

# Prohibited Horizontal Overflow Layout Leak

The codebase must maintain strict layout containment.

The occurrence of a horizontal browser scrollbar on standard viewport tracks indicates architectural degradation.

Avoid letting oversized data nodes, un-truncated string tags, or absolute position wrappers expand outside parent container widths.

---

# Text Truncation Enforcement Standard

When displaying erratic dynamic strings (e.g., User Names, Document Hashes, long titles), apply strict layout truncation filters to contain layout shapes safely.

```tsx
// PREFERRED
<Text truncate maxW="100%" color="text.secondary">
  {incomingExternalDatabaseString}
</Text>
```

---

# Overlay Mobile Modification Mandates

Large enterprise overlays (such as Settings Drawers or Configuration Modals) must transform behavior when triggered on mobile viewports.

Requirements:
* Modals must transition to full-screen drawers or standard mobile-safe Bottom Sheets on `base` break layers
* ensure side slide actions convert into vertical stacking sheets
* adapt controls to keep form actions pinned within safe reach zones at the base of the screen

---

# Responsive Navigation Adaptive Guard

Global application sidebars must hide automatically behind interactive trigger inputs on mobile screen structures.

Do not render permanent wide side structures when the layout enters mobile scales.

Map mobile navigation routes through accessible full-width sliding sheet panels following patterns defined in `.ai/skills/future/granada-navigation-patterns.md`.

---

# Table Mobile Usability Rules

Data tables must protect layout parameters by implementing isolated horizontal overflow container scroll boxes or by transforming row records into independent card components.

Ensure layout compliance matching instructions inside `.ai/skills/future/granada-table-architecture.md`.

Never shrink font settings or drop standard border lines below readable metrics to force table execution.

---

# Touch Interaction Padding Standard

Ensure form fields, control lists, and content nodes declare comfortable safety clearances from viewport edges on mobile devices.

Maintain a minimum baseline outer container padding token configuration of `4` (`16px`) across mobile viewports.

```tsx
// PREFERRED - Base padding containment wrapper
<Box px={{ base: 4, md: 0 }} py={4}>
  <MainContentCard />
</Box>
```

---

# AI Code Generation Structural Directives

The AI generation controller must never emit styling wrappers that assume large desktop default states without providing the `base` responsive object mapping keys first.

When outputting dashboards, listings, forms, or view shells, the engine must implement the layout layout mobile-first.

The AI must generate the mobile stacked view schema cleanly before writing the desktop progressive column extensions.

---

# Forbidden Mobile Anti-Patterns Summary

Avoid:
* assigning static pixel widths (`width: "1024px"`) to visible layout wrappers
* writing responsive properties missing the mandatory `base` viewport definitions object
* grouping clickable interaction targets inside targets tighter than a 44px bounding footprint
* ignoring horizontal viewport expansion leaks that break mobile screen boundaries
* forcing desktop navigation sidebars to render un-collapsed on narrow screen viewports

---

# Preferred Mobile-First Characteristics

Prefer application layouts that feel:
* completely fluid, elastic, and container-contained from zero-width viewports upward
* easily tap-navigable with clear target safety zones for mobile interactions
* lightweight and single-column stacked by default on base viewports
* progressively enhanced into robust multi-column grids as space expands

---

# Final Mobile-First Definition of Done

No module branch, presentational sheet, or component file layout will pass verification checks if it introduces rigid desktop-first layout styling configurations or breaks base-level mobile touch usability guidelines.

Mobile-first compliance guarantees the modern premium delivery execution of the enterprise SaaS platform.