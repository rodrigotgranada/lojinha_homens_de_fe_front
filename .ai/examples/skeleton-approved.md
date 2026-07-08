# Approved Enterprise Skeleton Component Example

This document defines the official premium reference model for compound skeleton placeholder implementations across the platform. It combines strict production-grade code with explicit architectural characteristics to guide the AI generation engine.

---

## Characteristics

* **Exact Topology Mirroring**: Engineered to map the precise structural dimensions, margins, and flex grid alignments of the live destination cards. This guarantees zero visual jumps or shifts when transitioning layout pipelines.
* **Chakra UI v3 Animation Integration**: Powered completely by Chakra UI v3 native styling properties, utilizing optimized, non-blocking hardware-accelerated background pulse animations natively.
* **Compound Slot Namespace Pattern**: Implements a highly composable compound object pattern (`DashboardCardSkeleton.Root`, `DashboardCardSkeleton.Header`, `DashboardCardSkeleton.Body`), mirroring the structural design standards of live interactive components.
* **React 19 Pure Prop-Ref Contracts**: Fully adjusted to the modern React 19 specification where `ref` passes through standard parameter signatures cleanly, dropping legacy `forwardRef` boilerplate.
* **Native Dark Mode Adaptation**: Sub-component blocks avoid hardcoded tint tokens, mapping to semantic properties (`bg.muted`, `border.subtle`) to ensure layout skeletons shift tones instantly across dark/light transitions.

---

## Approved Code Implementation

```tsx
import { Box, HStack, VStack, Skeleton, HTMLChakraProps } from '@chakra-ui/react';

interface SkeletonRootProps extends HTMLChakraProps<'div'> {
  /**
   * Explicitly locks the bounding container height to neutralize Cumulative Layout Shift.
   */
  expectedHeight: string | number;
}

/**
 * 1. Base Container Context Provider Shell
 */
export const DashboardCardSkeletonRoot = ({
  expectedHeight,
  children,
  ref,
  ...restProps
}: SkeletonRootProps) => {
  return (
    <Box
      ref={ref}
      minH={expectedHeight}
      width="100%"
      p={6}
      bg="bg.surface"
      border="1px solid"
      borderColor="border.subtle"
      borderRadius="lg"
      className="gr-approved-skeleton-root"
      {...restProps}
    >
      <VStack gap={4} align="stretch">
        {children}
      </VStack>
    </Box>
  );
};

/**
 * 2. Specialized Compound Slot Elements
 */
export const DashboardCardSkeletonHeader = (props: HTMLChakraProps<'div'>) => {
  return (
    <HStack gap={3} justify="space-between" width="100%" {...props}>
      <HStack gap={3} width="60%">
        {/* Simulates a rounded profile avatar or graphical icon asset footprint */}
        <Skeleton 
          width="40px" 
          height="40px" 
          borderRadius="full" 
          className="gr-skeleton-avatar" 
        />
        <VStack gap={1.5} align="stretch" width="70%">
          {/* Simulates title text heading lines */}
          <Skeleton height="16px" width="80%" borderRadius="sm" />
          <Skeleton height="12px" width="50%" borderRadius="sm" />
        </VStack>
      </HStack>
      
      {/* Simulates action badge or status dot footprint */}
      <Skeleton height="24px" width="64px" borderRadius="md" />
    </HStack>
  );
};

export const DashboardCardSkeletonBody = (props: HTMLChakraProps<'div'>) => {
  return (
    <VStack gap={2.5} align="stretch" width="100%" pt={2} {...props}>
      {/* Dynamic line weights emulate natural reading paragraph distributions */}
      <Skeleton height="14px" width="100%" borderRadius="sm" />
      <Skeleton height="14px" width="95%" borderRadius="sm" />
      <Skeleton height="14px" width="92%" borderRadius="sm" />
      <Skeleton height="14px" width="40%" borderRadius="sm" />
    </VStack>
  );
};

export const DashboardCardSkeletonFooter = (props: HTMLChakraProps<'div'>) => {
  return (
    <HStack gap={3} justify="flex-end" width="100%" pt={3} {...props}>
      {/* Simulates typical button interaction controls layout spacing */}
      <Skeleton height="36px" width="80px" borderRadius="md" />
      <Skeleton height="36px" width="120px" borderRadius="md" />
    </HStack>
  );
};

/**
 * 3. Unified Namespace Composition Export Mapping
 */
export const DashboardCardSkeleton = Object.assign(DashboardCardSkeletonRoot, {
  Header: DashboardCardSkeletonHeader,
  Body: DashboardCardSkeletonBody,
  Footer: DashboardCardSkeletonFooter,
});

DashboardCardSkeletonRoot.displayName = 'DashboardCardSkeleton.Root';
DashboardCardSkeletonHeader.displayName = 'DashboardCardSkeleton.Header';
DashboardCardSkeletonBody.displayName = 'DashboardCardSkeleton.Body';
DashboardCardSkeletonFooter.displayName = 'DashboardCardSkeleton.Footer';
```