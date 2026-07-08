# Approved Enterprise Drawer Component Example

This document defines the official premium reference model for sliding side panels and detailed overlay drawer implementations across the platform. It combines strict production-grade code with explicit architectural characteristics to guide the AI generation engine.

---

## Characteristics (Características)

* **Chakra UI v3 Slot Composition API**: Fully customized around modern Chakra UI v3 drawer slot configurations (`Drawer.Root`, `Drawer.Backdrop`, `Drawer.Positioner`, `Drawer.Content`, `Drawer.Header`, `Drawer.Body`, `Drawer.Footer`, `Drawer.CloseTrigger`), replacing outdated monolithic component wrapper properties.
* **Rigorous Focus Containment (WCAG AA)**: Native focus-trapping capabilities isolate interactive tab cycles entirely within the sliding pane overlay while active, preventing keyboard operators from accidentally interacting with the background layout grid.
* **Programmatic Focus Restoration**: Integrates automated focus restoration systems, returning the user's focus cursor explicitly back to the originating trigger button upon close execution, preventing orientation dropouts.
* **Accessible Structural Labeling**: Pairs header titles directly to overlay roles via `aria-labelledby` configurations natively, ensuring screen reading software announces contextual sheet descriptors immediately upon hydration.
* **Responsive Breakpoint Ergonomics**: Adapts width thresholds fluidly based on screen sizing tokens (`base` viewports snap full-screen as responsive sheets, scaling gracefully up to defined pixel boundaries on large viewports).

---

## Approved Code Implementation

```tsx
import { Drawer, Button, Heading, Text, VStack, Box, Separator } from '@chakra-ui/react';
import { CloseIcon, SaveIcon } from '@/assets/icons';

interface DrawerApprovedProps {
  /**
   * Toggles the operational tracking visibility state of the side overlay panel.
   */
  isPanelOpen: boolean;
  /**
   * Action trigger dispatched immediately when closing cycles execute programmatically.
   */
  onClosePanel: () => void;
  /**
   * Optional payload context to populate inner layout forms dynamically.
   */
  entityContextId?: string | null;
  /**
   * Lock actions block while async mutations process on the server pipeline.
   */
  isProcessingAction?: boolean;
}

/**
 * Granada Enterprise Approved Drawer Component Blueprint.
 * Demonstrates elite slot-driven architectural layout patterns using Chakra UI v3.
 */
export const EntityDetailDrawerApproved = ({
  isPanelOpen,
  onClosePanel,
  entityContextId = null,
  isProcessingAction = false,
}: DrawerApprovedProps) => {
  const isCreateMode = !entityContextId;

  const handleFormSubmission = async () => {
    // Isolated save routine callback integration
    onClosePanel();
  };

  return (
    <Drawer.Root 
      open={isPanelOpen} 
      onOpenChange={(details) => !details.open && onClosePanel()}
      placement="right"
      size={{ base: "full", md: "md" }} // Mobile-first full layout adaptivity contract
    >
      {/* Layer 1: Semi-transparent dimming boundary backdrop */}
      <Drawer.Backdrop />
      
      {/* Layer 2: Viewport layout positioner sandbox */}
      <Drawer.Positioner>
        <Drawer.Content 
          bg="bg.surface" 
          boxShadow="xl"
          borderLeft="1px solid"
          borderColor="border.subtle"
          className="gr-approved-drawer-surface"
        >
          
          {/* Layer 3: Semantic Header Group */}
          <Drawer.Header px={6} pt={6} pb={4}>
            <Drawer.CloseTrigger 
              position="absolute" 
              top={4} 
              right={4} 
              asChild
            >
              <Button 
                variant="ghost" 
                size="sm" 
                aria-label="Close configuration drawer"
                disabled={isProcessingAction}
              >
                <CloseIcon />
              </Button>
            </Drawer.CloseTrigger>
            
            <Heading as="h2" size="md" tracking="tight" color="fg.primary">
              {isCreateMode ? "Create System Gateway" : "Modify Gateway Configuration"}
            </Heading>
            <Text fontSize="xs" color="fg.muted" mt={1}>
              {isCreateMode ? "Provision a new secure edge proxy router." : `Gateway UUID: ${entityContextId}`}
            </Text>
          </Drawer.Header>

          <Separator borderColor="border.subtle" />

          {/* Layer 4: Scrollable Form Body Playground */}
          <Drawer.Body px={6} py={4}>
            <VStack gap={5} align="stretch" mt={2}>
              <Box>
                <Text fontSize="xs" fontWeight="semibold" color="fg.muted" mb={2} uppercase tracking="wider">
                  Operational Settings
                </Text>
                <Text fontSize="sm" color="fg.secondary">
                  Configure access keys, rate limits, and caching variables belonging to this dedicated routing profile instance.
                </Text>
              </Box>
              
              {/* Target entry forms or parameters inject here dynamically */}
              <Box height="200px" bg="bg.muted" borderRadius="md" border="1px dashed" borderColor="border.subtle" p={4}>
                <Text fontSize="xs" color="fg.muted" textAlign="center" mt="80px">
                  [Form Inputs Placeholder Node]
                </Text>
              </Box>
            </VStack>
          </Drawer.Body>

          <Separator borderColor="border.subtle" />

          {/* Layer 5: Fixed Sticky Control Actions Footer Panel */}
          <Drawer.Footer bg="bg.panel" px={6} py={4}>
            <Button
              variant="outline"
              onClick={onClosePanel}
              disabled={isProcessingAction}
              minW="80px"
              h="40px"
              fontSize="sm"
            >
              Cancel
            </Button>
            <Button
              variant="solid"
              colorPalette="blue"
              onClick={handleFormSubmission}
              loading={isProcessingAction}
              minW="120px"
              h="40px"
              fontSize="sm"
            >
              <SaveIcon />
              {isCreateMode ? "Provision" : "Save changes"}
            </Button>
          </Drawer.Footer>

        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );
};

EntityDetailDrawerApproved.displayName = 'EntityDetailDrawerApproved';
```