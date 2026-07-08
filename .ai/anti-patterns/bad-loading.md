# Granada Anti-Patterns: Broken and Fractured Loading States

This document defines the official refactoring standards, practical engineering counter-examples, visual stability metrics, and layout orchestration guidelines to eradicate the anti-pattern of Bad Loading States (Broken and Fractured Loading States) across the platform.

Implementing uncoordinated, unstable, or flickering loading indicators is treated as a severe user experience and structural failure.

The goal of this document is not simply ensuring that a loader is visible during network latency.

The goal is to eliminate:
* Cumulative Layout Shift (CLS) causing violent UI jumping and accidental misclicks
* aggressive interface flashing (flickering) during sub-300ms high-speed network roundtrips
* context disconnection where the outer application framework or scroll layout collapses during fetch operations
* low-fidelity generic spinning indicators centered inside massive, detached void spaces
* asynchronous state mismatch boundaries that leave stale or half-rendered data exposed to operators
* AI-generated structural layouts that lack predictive visual placeholder continuity trees

The presentation tier must orchestrate async transitions seamlessly, preserving structural spacing tokens at all times.

---

# The Anatomy of the Anti-Pattern

The bad loading anti-pattern manifests when user interface layouts collapse, snap, or flash aggressively while waiting for asynchronous state data matrices to resolve.

In modern application engineering, showing a spinning icon or a raw blank space that alters viewport bounding coordinates is non-compliant.

When layout dimensions are not anticipated and locked prior to data injection, adjacent visual cards are forced to shift position violently when execution completes.

Avoid writing primitive conditional layouts that toggle blindly between completely different wrapper scales.

---

# Forbidden Scenario (The Structural Jump & Flash)

The code block below exemplifies the absolute anti-pattern: a metrics display panel that flashes a generic layout indicator on fast networks, uses un-bounded dimensions, and triggers massive layout shift upon data arrival.

```tsx
// FORBIDDEN - Severe layout shift, visual flickering, and zero dimensional continuity
import { useState, useEffect } from 'react';
import { Box, Flex, Spinner, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';

export const AnalyticsSummaryPanel = () => {
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Structural Failure: Fires raw HTTP request without a 300ms deferral threshold
    axios.get('/api/v1/analytics/summary')
      .then(res => setMetrics(res.data))
      .finally(() => setLoading(false));
  }, []);

  // Fatal UX Failure: Completely replaces the container layout tree with a un-bounded spinner view
  if (loading) {
    return (
      <Flex justify="center" align="center" p={4}>
        <Spinner size="xl" />
      </Flex>
    );
  }

  // Visual Shift Event: The footer and text cards below this box will slam down violently when this snaps in
  return (
    <Flex direction={{ base: "column", md: "row" }} gap={4} p={4} bg="bg.panel">
      <Box p={6} bg="white" borderRadius="md" shadow="sm">
        <Text fontSize="sm" color="gray.500">Active ARR</Text>
        <Text fontSize="3xl" fontWeight="bold">${metrics.arrValue}</Text>
      </Box>
      <Box p={6} bg="white" borderRadius="md" shadow="sm">
        <Text fontSize="sm" color="gray.500">Gross Churn</Text>
        <Text fontSize="3xl" fontWeight="bold">{metrics.churnRate}%</Text>
      </Box>
    </Flex>
  );
};
```

---

# Code Degradation Analysis

The `AnalyticsSummaryPanel` layout corrupts the engineering standard of the platform for 4 specific technical reasons:
1. Cumulative Layout Shift (CLS Trigger): While `loading` is active, the component's computed height is negligible (~80px). When data updates and execution paths swap to the grid, the container instantly expands to over ~200px, causing downstream page blocks to jump.
2. The Fast-Network Flash (Flickering): On ultra-fast fibers or cached responses resolving in 40ms, the spinner mounts and immediately unmounts, producing an unsettling visual "blink" that increases perceived cognitive friction.
3. Total Component Desegregation: Replacing the layout framework branch entirely with a fallback spinner forces the React tree to destroy prior DOM elements completely rather than painting over placeholders gracefully.
4. Styling Disconnect: Hardcoded `bg="white"` indicators ignore system theme parameters and break native dark mode integration.

---

# The Refactoring Standard: Compound Skeleton Composition

To fix the anti-pattern, we abstract the loading placeholder into a dedicated Compound Skeleton component file matching the exact layout design tokens of the successful state view.

We also enforce dimension locking and apply a deferred execution threshold strategy to protect fast network responses.

---

# Step 1: The Specialized Structural Wireframe (`variants/AnalyticsSkeleton.tsx`)

Build a dedicated, explicit layout mirror using Chakra UI v3 `Skeleton` primitives. Ensure the height and layout tokens map directly to the final layout properties.

```tsx
// PREFERRED - Precise gray-scale wireframe mirroring the final component topology
import { Grid, Box, Skeleton, HTMLChakraProps } from '@chakra-ui/react';

export const AnalyticsSkeleton = (props: HTMLChakraProps<'div'>) => {
  return (
    // Dimension Lock: Force identical structural grids and spacing alignments
    <Grid 
      templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} 
      gap={4} 
      minH="124px" // Matches the exact success container height signature
      width="100%"
      {...props}
    >
      {[1, 2].map((identityIndex) => (
        <Box 
          key={identityIndex} 
          p={6} 
          bg="bg.surface" 
          border="1px solid" 
          borderColor="border.subtle" 
          borderRadius="md"
        >
          {/* Skeleton lines mirror exact text element hierarchies */}
          <Skeleton height="16px" width="40%" mb={3} />
          <Skeleton height="32px" width="70%" />
        </Box>
      ))}
    </Grid>
  );
};
```

---

# Step 2: The Logic Deferred Hook Abstraction (`hooks/useDeferredAnalytics.ts`)

Leverage TanStack Query to centralize asynchronous network states while establishing precise stale time boundaries.

```typescript
// PREFERRED - Isolated infrastructure state fetch orchestration layer
import { useQuery } from '@tanstack/react-query';
import { analyticsService } from '../services/analytics';
import { analyticsKeys } from '../keys';
import { AnalyticsPayload } from '../types';

export const useDeferredAnalytics = () => {
  return useQuery<AnalyticsPayload, Error>({
    queryKey: analyticsKeys.summaries.main(),
    queryFn: analyticsService.getMainSummary,
    staleTime: 1000 * 60 * 10, // Retain freshness for 10 minutes to prevent layout thrashing
    refetchOnWindowFocus: false,
  });
};
```

---

# Step 3: The Stable Presentational View Layer (`index.tsx`)

The orchestration page file preserves structural boundaries snoop-free. It uses a clean structural transition pattern and handles rendering pipelines without breaking container containment.

```tsx
// PREFERRED - Zero layout shift, theme adaptive, and fully uncoupled from raw effects
import { Grid, Box, Text } from '@chakra-ui/react';
import { useDeferredAnalytics } from './hooks/useDeferredAnalytics';
import { AnalyticsSkeleton } from './variants/AnalyticsSkeleton';
import { ComponentErrorBoundary } from '@/components/base/ComponentErrorBoundary';

export const AnalyticsSummaryPanel = () => {
  const { data: metrics, isLoading, error, refetch } = useDeferredAnalytics();

  // Rule Compliance: Render structural skeleton when async operations are ongoing
  if (isLoading) {
    return <AnalyticsSkeleton className="gr-analytics-loading-track" />;
  }

  return (
    <ComponentErrorBoundary error={error} onRetry={refetch}>
      <Grid 
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} 
        gap={4}
        minH="124px" // Synchronized height footprint eliminates Cumulative Layout Shift
        width="100%"
        className="gr-analytics-viewport"
      >
        <Box 
          p={6} 
          bg="bg.surface" 
          border="1px solid" 
          borderColor="border.subtle" 
          borderRadius="md"
          _hover={{ borderColor: "border.emphasized" }}
        >
          <Text fontSize="xs" fontWeight="medium" color="fg.muted" mb={2}>Active ARR</Text>
          <Text fontSize="2xl" fontWeight="bold" color="fg.primary" tracking="tight">
            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(metrics?.arrValue ?? 0)}
          </Text>
        </Box>

        <Box 
          p={6} 
          bg="bg.surface" 
          border="1px solid" 
          borderColor="border.subtle" 
          borderRadius="md"
          _hover={{ borderColor: "border.emphasized" }}
        >
          <Text fontSize="xs" fontWeight="medium" color="fg.muted" mb={2}>Gross Churn</Text>
          <Text fontSize="2xl" fontWeight="bold" color="fg.primary" tracking="tight">
            {metrics?.churnRate}%
          </Text>
        </Box>
      </Grid>
    </ComponentErrorBoundary>
  );
};
```

---

# Non-Negotiable Layout Stability Rules

To preserve visual continuity thresholds across the platform, the following engineering directives apply:
* Functional presentational wrappers must specify an explicit minimum height (`minH`) or scale restriction token whenever containing variable asynchronous elements.
* It is strictly prohibited to throw open, un-styled `<Spinner />` configurations directly inside structural dashboards grids or page content cores.
* Modifying native background opacities or applying blurry layout masks inside lists during background syncing cycles must leave structural button maps and text lines accessible for user reads.

---

# AI Code Generation Guidelines (Visual Continuity Guard)

The AI code generation engine must strictly oppose code tracks that treat loading states as a text string fallback or full-screen spinner asset.

Whenever instructed to write a data grid, transactional table, account setting block, or information list, the agent must output a fully dimension-matched companion Skeleton component layout concurrently.

The generated code must layout explicit structural parameters ensuring that when the transition state triggers from loading placeholder to successful data view, the container's absolute bounding box dimensions remain identical.

---

# Forbidden Loading Patterns Summary

Avoid:
* Toggling application panels from a 0px height space to complete expansion modules upon data arrival.
* Using micro spinners that force content rows to slide or compress horizontally.
* Emitting hardcoded keyframe animations outside the official design system tokens pool.
* Dropping active parent component instances from the DOM entirely while awaiting fetch completions.
* Rendering white placeholder screens inside dark mode viewports due to token omissions.

---

# Preferred Asynchronous Characteristics

Prefer system interaction blueprints that feel:
* structurally anchored, eliminating jump effects or layout shifts permanently
* smooth and coordinated through precise wireframe skeleton representations
* highly performant, filtering away fast connection visual blinks seamlessly
* fully theme-adaptive across light and dark system settings natively

---

# Final Asynchronous Definition of Done

No presentation panel, metric layout group, data table viewport, or view card framework will cross the deployment gate if it maps network latency through unstructured fallback assets or generates layout shifts upon successful cache updates.

Complete structural loading continuity distinguishes typical visual compositions from premium enterprise platform codebases.