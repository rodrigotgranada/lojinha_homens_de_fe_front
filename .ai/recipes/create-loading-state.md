# Recipe: Engineering Layout-Stable Loading States (Skeletons)

This recipe details the step-by-step mechanical pattern for designing accessible, layout-stable loading indicators and progressive skeleton screens across the platform using Chakra UI v3 primitives, completely preventing Cumulative Layout Shift (CLS).

---

## Step 1: Match Geometry and Dimensions Symmetrically
1. Never guess or throw arbitrary widths into fallback placeholders. 
2. A loading skeleton must exactly match the height, margin, border-radius, and structural layout blueprint of the actual data component it replaces.
3. If an input field uses `h="40px"`, its corresponding placeholder skeleton must feature `h="40px"`.

## Step 2: Leverage Composable Skeleton Roots
1. Group rows of placeholders using Chakra UI v3 `<SkeletonRoot>` and `<Skeleton>` sub-components.
2. Bind the loading animation loop directly to active asynchronous states (`loading={isLoading}`) exposed by TanStack Query or native component state hooks.

## Step 3: Implement Matrix Repetition (Table Fallbacks)
1. When scaffolding placeholder grids for loading tables, do not write a single large box.
2. Generate an array loop (typically 3 to 5 iterations) that renders stacked row skeletons matching the target table column counts to mimic natural list shapes.

## Step 4: Handle Background Refetch Overlays Safely
1. For active interfaces undergoing secondary background updates (refetching), do not unmount existing data components to show a blank screen. This breaks user interaction focus.
2. Keep data visible and apply a subtle opacity reduction combined with a micro absolute loading indicator spinner over the active component panel.

---

## Reference Execution Pattern

```tsx
import { Skeleton, SkeletonRoot, Stack, Box, Grid, Table } from '@chakra-ui/react';

interface LoadingPlaceholderProps {
  /**
   * Orchestrates animation state tracking variables.
   */
  isActive: boolean;
}

/**
 * Standard Platform High-Density Grid Placeholder Component.
 * Symmetrically mimics an enterprise data table card list to eliminate Cumulative Layout Shift (CLS).
 */
export const ProfileMetricsLoadingSkeleton = ({ isActive }: LoadingPlaceholderProps) => {
  return (
    <SkeletonRoot loading={isActive} className="gr-approved-loading-skeleton">
      <Stack gap={4} width="100%">
        
        {/* Step 1: Matching geometry framework of a metric header tool band */}
        <Box display="flex" justify="space-between" align="center" width="100%">
          <Skeleton h="24px" width="180px" borderRadius="sm" />
          <Skeleton h="32px" width="80px" borderRadius="md" />
        </Box>

        {/* Step 3: Structured tabular matrix repetition mimicking real layout rows */}
        <Box borderWidth="1px" borderColor="border.subtle" borderRadius="md" p={2} bg="bg.surface">
          <Stack gap={3}>
            {Array.from({ length: 4 }).map((_, rowIndex) => (
              <Grid 
                key={`skeleton-row-${rowIndex}`} 
                templateColumns="2fr 1fr 1fr" 
                gap={4} 
                py={2}
                borderBottom={rowIndex < 3 ? "1px solid" : "none"}
                borderColor="border.subtle/40"
              >
                <Skeleton h="16px" width="80%" borderRadius="sm" />
                <Skeleton h="16px" width="40px" borderRadius="sm" mx="auto" />
                <Skeleton h="16px" width="60px" borderRadius="sm" ml="auto" />
              </Grid>
            ))}
          </Stack>
        </Box>

      </Stack>
    </SkeletonRoot>
  );
};

ProfileMetricsLoadingSkeleton.displayName = 'ProfileMetricsLoadingSkeleton';
```