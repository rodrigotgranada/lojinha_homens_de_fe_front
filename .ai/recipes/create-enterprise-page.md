# Recipe: Compiling an Enterprise Workspace View Page

This recipe provides the definitive architectural blueprint for assembling an entire functional page view canvas inside Next.js 15 App Router architecture, connecting feature hooks, tables, layouts, and interaction dialogs seamlessly.

---

## Step 1: Set the Client Interactivity Boundary
1. Next.js 15 pages inside interactive workspace panels require client-side hooks, state hydration, and modal tracking. 
2. Place the `"use client"` compiler directive at the absolute top line of the page file.

## Step 2: Isolate Visual Component Imports
1. Ingest layouts, table modules, and action workflows cleanly from the feature's local components directory (`../components/`).
2. Do not mix unrelated logic domains into a single view. Keep the root page clean, acting exclusively as a visual coordinator.

## Step 3: Initialize Asynchronous Hooks
1. Call custom domain hooks (`useQuery`) at the top of the main functional page tree to initialize server data tracking.
2. Destructure data, loading states, and refetch functions cleanly. Pass operational states down to sub-components as immutable data layers.

## Step 4: Manage Modal and Overlay States Dynamically
1. Control modal views (e.g., creation forms, deletion confirmation prompts) using simple local states.
2. Keep selected row database identifiers tracked safely in state (`selectedId`) to pass correct entity properties to active modal containers.

## Step 5: Mount Within the Main View Canvas
1. Structure the layout return block within a clean, semantically correct HTML5 main container canvas layer.
2. Limit the grid's maximum responsive layout boundaries using utility constraint tokens (`maxW="7xl" mx="auto"`) to guarantee layout symmetry across high-resolution displays.

---

## Reference Execution Pattern

```tsx
"use client"; // Step 1: Declare client context boundary instantly

import { useState } from 'react';
import { Box, Heading, Text, Flex, Button, Icon, Stack, createToaster } from '@chakra-ui/react';
import { PlusIcon, RefreshIcon } from '@/assets/icons';

// Step 2: Import clean decoupled architectural primitives from feature bounds
import { useGetGatewaysQuery } from '../hooks/useGetGatewaysQuery';
import { GatewaysManagementTable } from '../components/GatewaysManagementTable';
import { ProvisionGatewayDrawer } from '../components/ProvisionGatewayDrawer';
import { GatewaysLoadingSkeleton } from '../components/GatewaysLoadingSkeleton';

const toaster = createToaster({ placement: "top-end" });

/**
 * Granada Premium Master Enterprise Page Controller Module.
 * Safely coordinates layouts, remote data states, and interactive dialog elements.
 */
export default function GatewaysControlWorkspacePage() {
  // Step 4: Isolate presentation interactive dialog toggles
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedGatewayId, setSelectedGatewayId] = useState<string | null>(null);

  // Step 3: Trigger remote dataset queries via strong domain custom hooks
  const { data: gatewaysList = [], isLoading, isRefetching, refetch } = useGetGatewaysQuery();

  const handleOpenProvisioningFlow = () => {
    setSelectedGatewayId(null);
    setIsDrawerOpen(true);
  };

  const handleOpenInspectionFlow = (id: string) => {
    setSelectedGatewayId(id);
    setIsDrawerOpen(true);
  };

  return (
    // Step 5: Embed inside the structural main canvas wrapper
    <Box as="main" width="100%" maxW="7xl" mx="auto" className="gr-approved-workspace-page-shell">
      <Stack gap={6}>
        
        {/* Dynamic Contextual Header Command Bar */}
        <Flex direction={{ base: "column", sm: "row" }} justify="space-between" align={{ base: "stretch", sm: "center" }} gap={4}>
          <Box>
            <Heading as="h1" size="sm" fontWeight="bold" tracking="tight">
              API Gateways Cluster
            </Heading>
            <Text fontSize="xs" color="fg.muted" mt={0.5}>
              Configure and monitor production edge proxy reverse mesh gateways.
            </Text>
          </Box>

          <Flex align="center" gap={3}>
            <Button 
              variant="outline" 
              size="xs" 
              loading={isRefetching} 
              onClick={() => refetch()}
              h="36px"
            >
              <RefreshIcon /> Synchronize Nodes
            </Button>
            <Button 
              variant="solid" 
              colorPalette="blue" 
              size="xs" 
              onClick={handleOpenProvisioningFlow}
              h="36px"
            >
              <PlusIcon /> Deploy Proxy Node
            </Button>
          </Flex>
        </Flex>

        {/* Primary View Layer Allocation Switch */}
        {isLoading ? (
          <GatewaysLoadingSkeleton isActive={true} />
        ) : (
          <GatewaysManagementTable 
            records={gatewaysList} 
            onInspect={handleOpenInspectionFlow} 
          />
        )}

        {/* Cohesive Sliding Control Overlay Sheet */}
        <ProvisionGatewayDrawer 
          isPanelVisible={isDrawerOpen} 
          onDismissPanel={() => setIsDrawerOpen(false)} 
          selectedResourceId={selectedGatewayId}
        />

      </Stack>
    </Box>
  );
}
```