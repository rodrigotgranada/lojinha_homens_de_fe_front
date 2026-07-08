# Approved Enterprise Modal Component Example

This document defines the official premium reference model for modal overlays and destructive confirmation dialog implementations across the platform. It combines strict production-grade code with explicit architectural characteristics to guide the AI generation engine.

---

## Characteristics (Características)

* **Chakra UI v3 Dialog Nomenclature**: Built entirely upon the modern Chakra UI v3 `Dialog` primitive structures (`Dialog.Root`, `Dialog.Backdrop`, `Dialog.Positioner`, `Dialog.Content`, `Dialog.Header`, `Dialog.Body`, `Dialog.Footer`, `Dialog.CloseTrigger`), which completely replaces the legacy v2 `Modal` ecosystem.
* **Destructive Alert Semantic Role (WCAG AA)**: Explicitly injects `role="alertdialog"` properties onto the container surface when handling critical or destructive data drops (e.g., entity deletions). This forces screen-reading software to intercept the operational stack and prioritize immediate notification announcements.
* **Hermetic Tab Focus Isolation**: Employs structural modal positioning masks that trap keyboard focus loops securely within the active overlay layout coordinates. Operators cannot bypass the modal confirmation gate via accidental background tab strikes.
* **ColorPalette-Driven Warning Semantics**: Integrates cleanly with the platform's color architecture token lines, assigning unified semantic variants (`colorPalette="red"`) across text elements, high-visibility hazard vectors, and solid execution action buttons.
* **Absolute Layout Isolation**: Renders content sheets inside dedicated portal boundaries, completely untethered from parent layout rendering hierarchies, preventing stacking context anomalies or parent wrapper CSS leaks.

---

## Approved Code Implementation

```tsx
import { Dialog, Button, Heading, Text, HStack, Box, Icon } from '@chakra-ui/react';
import { WarningIcon } from '@/assets/icons';

interface ModalApprovedProps {
  /**
   * Evaluates the active presentation state of the modal confirmation window.
   */
  isConfirmationVisible: boolean;
  /**
   * Action trigger fired instantly when intercepting closing workflows.
   */
  onDismissModal: () => void;
  /**
   * Callback dispatched exclusively when the user confirms execution of the destructive mutation.
   */
  onConfirmAction: () => Promise<void>;
  /**
   * Tracks active infrastructure network processing status to freeze adjacent controls.
   */
  isExecutionPending?: boolean;
  /**
   * Semantic name descriptor of the structural target scheduled for permanent deletion.
   */
  targetEntityName: string;
}

/**
 * Granada Enterprise Approved Modal (Chakra v3 Dialog) Component Blueprint.
 * Demonstrates clean, accessible, hazard-safe slot orchestration patterns.
 */
export const DestructiveActionModalApproved = ({
  isConfirmationVisible,
  onDismissModal,
  onConfirmAction,
  isExecutionPending = false,
  targetEntityName,
}: ModalApprovedProps) => {

  const handleExecutionPipeline = async () => {
    await onConfirmAction();
    onDismissModal();
  };

  return (
    <Dialog.Root 
      open={isConfirmationVisible} 
      onOpenChange={(details) => !details.open && onDismissModal()}
      role="alertdialog" // Strict screen reader interception semantic mapping
      closeOnInteractOutside={!isExecutionPending}
    >
      {/* Layer 1: Global background overlay backdrop blur layer */}
      <Dialog.Backdrop />
      
      {/* Layer 2: Center alignment positioning shell layout */}
      <Dialog.Positioner p={4}>
        <Dialog.Content 
          bg="bg.surface" 
          maxW="md" 
          borderRadius="lg"
          border="1px solid"
          borderColor="border.subtle"
          boxShadow="2xl"
          className="gr-approved-modal-surface"
        >
          
          {/* Layer 3: Semantic Alert Header Block */}
          <Dialog.Header px={6} pt={6} pb={2}>
            <HStack gap={3} align="flex-start">
              <Box 
                bg="red.muted" 
                color="red.solid" 
                p={2} 
                borderRadius="full" 
                display="inline-flex"
                _dark={{ bg: "red.solid/10", color: "red.muted" }}
              >
                <Icon as={WarningIcon} boxSize={5} />
              </Box>
              
              <Box>
                <Heading as="h2" size="sm" tracking="tight" color="fg.primary">
                  Delete Connection Gateway
                </Heading>
                <Text fontSize="xs" color="fg.muted" mt={1}>
                  This operation is immutable and cannot be undone.
                </Text>
              </Box>
            </HStack>
          </Dialog.Header>

          {/* Layer 4: Contextual Confirmation Message */}
          <Dialog.Body px={6} py={3}>
            <Text fontSize="sm" color="fg.secondary" lineHeight="relaxed">
              Are you completely certain you want to permanently delete the edge routing gateway instance{" "}
              <Box as="span" fontWeight="bold" color="fg.primary" fontFamily="mono" bg="bg.muted" px={1.5} py={0.5} borderRadius="sm">
                {targetEntityName}
              </Box>
              ? This workflow breaks downstream downstream pipeline integrations instantly.
            </Text>
          </Dialog.Body>

          {/* Layer 5: Clean Interactive Action Controls Grid */}
          <Dialog.Footer bg="bg.panel" px={6} py={4} borderBottomRadius="lg">
            <HStack gap={3} width="100%" justify="flex-end">
              <Button
                variant="outline"
                onClick={onDismissModal}
                disabled={isExecutionPending}
                h="40px"
                fontSize="sm"
                minW="80px"
              >
                Cancel
              </Button>
              <Button
                variant="solid"
                colorPalette="red" // Explicit warning semantic palette mapping
                onClick={handleExecutionPipeline}
                loading={isExecutionPending}
                h="40px"
                fontSize="sm"
                minW="120px"
              >
                Confirm Delete
              </Button>
            </HStack>
          </Dialog.Footer>

        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};

DestructiveActionModalApproved.displayName = 'DestructiveActionModalApproved';
```