# Recipe: Engineering an Accessible Sliding Panel (Drawer)

This recipe provides a step-by-step mechanical blueprint for scaffolding responsive side overlay sheets and detail drawers across the platform using Chakra UI v3 `Drawer` primitives.

---

## Step 1: Enforce Viewport Sizing Adaptivity
1. Do not hardcode fixed pixel widths onto sliding panel contents.
2. Utilize responsive object tokens via the `size` property on `<Drawer.Root>` to guarantee layout fluidness:
   * `size={{ base: "full", md: "md" }}`
   * This forces the drawer to behave as a full-screen sheet on mobile viewports while scaling gracefully to a standardized sidebar pane on desktop screens.

## Step 2: Establish the Structural Overlay Composition Layers
Assemble the drawer frame using the explicit slot composition progression of Chakra UI v3:
1. `<Drawer.Root>`: Captures parameters, trigger states, and position assignments.
2. `<Drawer.Backdrop />`: Renders the dimming background mask over adjacent workspace components.
3. `<Drawer.Positioner>`: Controls slide-in animation alignment constraints (typically `placement="right"`).
4. `<Drawer.Content>`: The physical sliding pane sheet detailed with surface tokens and border frames.

## Step 3: Implement Focus Trapping and Structural Labels
1. Embed the `<Drawer.CloseTrigger>` mapped cleanly as an absolute child element within the header layer.
2. Wrap structural card titles using `<Heading as="h2">` connected directly to root modal descriptors, ensuring assistive voice screen readers announce context immediately upon pane activation.

## Step 4: Isolate Layout Compartments
Divide the `<Drawer.Content>` inner space into strict structural divisions:
* `<Drawer.Header>`: Locked top-tier slot storing title metadata and close buttons.
* `<Drawer.Body>`: Main scrollable viewport sandbox containing data lists, parameter details, or forms.
* `<Drawer.Footer>`: Sticky or pinned bottom control anchor block reserving standard operational actions (e.g., Cancel, Save Changes).

---

## Reference Execution Pattern

```tsx
import { Drawer, Button, Heading, Text, VStack, Box, Separator } from '@chakra-ui/react';
import { CloseIcon, SaveIcon } from '@/assets/icons';

interface ResourceInspectionDrawerProps {
  /**
   * Tracks active visibility presentation state of the side overlay panel.
   */
  isPanelVisible: boolean;
  /**
   * Dispatched instantly when a user dismisses or escapes the sliding sheet pane.
   */
  onDismissPanel: () => void;
  /**
   * Scoped contextual reference database entity identifier.
   */
  selectedResourceId?: string | null;
}

export const ResourceInspectionDrawerApproved = ({
  isPanelVisible,
  onDismissPanel,
  selectedResourceId = null,
}: ResourceInspectionDrawerProps) => {
  const isCreationWorkflow = !selectedResourceId;

  return (
    <Drawer.Root 
      open={isPanelVisible} 
      onOpenChange={(details) => !details.open && onDismissPanel()}
      placement="right"
      size={{ base: "full", md: "md" }} // Step 1: Enforce clean mobile-first sheet adaptivity
    >
      {/* Step 2: Composition Primitives Scaffolding */}
      <Drawer.Backdrop />
      
      <Drawer.Positioner>
        <Drawer.Content 
          bg="bg.surface" 
          boxShadow="2xl"
          borderLeft="1px solid"
          borderColor="border.subtle"
          className="gr-approved-side-drawer"
        >
          
          {/* Step 3 & 4: Header Compartmentalization */}
          <Drawer.Header px={6} pt={6} pb={4}>
            <Drawer.CloseTrigger position="absolute" top={4} right={4} asChild>
              <Button variant="ghost" size="xs" aria-label="Dismiss detail panel">
                <CloseIcon />
              </Button>
            </Drawer.CloseTrigger>
            
            <Heading as="h2" size="xs" fontWeight="bold" color="fg.primary">
              {isCreationWorkflow ? "Provision Cluster Key" : "Inspect Cluster Credentials"}
            </Heading>
            <Text fontSize="10px" color="fg.muted" mt={0.5}>
              {isCreationWorkflow ? "Generate a secure access runtime proxy mesh key." : `Resource reference ID: ${selectedResourceId}`}
            </Text>
          </Drawer.Header>

          <Separator borderColor="border.subtle" />

          {/* Core Scrollable Body Viewport Container */}
          <Drawer.Body px={6} py={4}>
            <VStack gap={4} align="stretch" mt={2}>
              <Box bg="bg.muted" p={4} borderRadius="md" border="1px dashed" borderColor="border.subtle">
                <Text fontSize="xs" color="fg.secondary" textAlign="center">
                  [Dynamic Form Input Fields or Metadata Telemetry Injects Here]
                </Text>
              </Box>
            </VStack>
          </Drawer.Body>

          <Separator borderColor="border.subtle" />

          {/* Pinned Action Controls Footer Allocation */}
          <Drawer.Footer bg="bg.panel" px={6} py={3}>
            <Button variant="outline" size="xs" onClick={onDismissPanel} h="36px">
              Cancel
            </Button>
            <Button variant="solid" colorPalette="blue" size="xs" h="36px" minW="100px">
              <SaveIcon /> {isCreationWorkflow ? "Generate Key" : "Save Settings"}
            </Button>
          </Drawer.Footer>

        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );
};

ResourceInspectionDrawerApproved.displayName = 'ResourceInspectionDrawerApproved';
```