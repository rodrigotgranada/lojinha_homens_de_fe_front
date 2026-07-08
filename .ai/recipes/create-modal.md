# Recipe: Creating an Accessible Operational Dialog (Modal)

This recipe provides a step-by-step mechanical blueprint for scaffolding modal windows and confirmation dialogs across the platform using Chakra UI v3 `Dialog` primitives, ensuring strict focus entrapment and asynchronous safety gates.

---

## Step 1: Assign the Appropriate Semantic Role
* **Is the dialog executing a destructive, high-hazard, or irreversible operation (e.g., deleting infrastructure resources)?** You must explicitly pass `role="alertdialog"` into the `<Dialog.Root>` block. This signals assistive screen readers to intercept the user's operation path and announce the hazard immediately.
* **Is it a standard configuration entry form or informational overview sheet?** Maintain the default implicit modal dialog attributes natively.

## Step 2: Establish the Structural Overlay Composition Layers
Construct the overlay grid using the strict slot progression layout of Chakra UI v3:
1. `<Dialog.Root>`: Wraps context tracking, visible toggle states, and accessibility parameters.
2. `<Dialog.Backdrop />`: Renders the semi-transparent screen mask beneath the workspace pane.
3. `<Dialog.Positioner>`: Centers and scales the presentation coordinates inside the viewport canvas.
4. `<Dialog.Content>`: Surfaces the actual physical card canvas with customized borders and background tokens.

## Step 3: Implement Accessible Interception Controls
1. Use `<Dialog.CloseTrigger>` mapped cleanly with an absolute position token to place the closing action button in the upper right quadrant of the header card.
2. Bind the main description slots to the content scope using appropriate paragraph markers, allowing voice synthesis engines to announce the contextual card data completely upon activation.

## Step 4: Enforce Asynchronous Click Protection Gates
* Any execution button responsible for firing backend network handlers inside the `<Dialog.Footer>` must be equipped with the `loading={isPending}` parameter.
* Explicitly disable the adjacent "Cancel" close triggers while mutations process in the background. This prevents the user from aborting mid-flight network handshakes or double-submitting data packets.

---

## Reference Execution Pattern

```tsx
import { Dialog, Button, Heading, Text, HStack, Box, Icon, createToaster } from '@chakra-ui/react';
import { WarningIcon } from '@/assets/icons';

interface TerminateSessionModalProps {
  /**
   * Tracks the active visibility presentation state of the modal canvas.
   */
  isOpen: boolean;
  /**
   * Directly intercepts close requests initiated by background clicking or keyboard escapes.
   */
  onClose: () => void;
  /**
   * Callback pipeline executed when confirming session termination.
   */
  onConfirmTermination: () => Promise<void>;
  /**
   * Disables interactive controls during active server mutations.
   */
  isMutating?: boolean;
}

const toaster = createToaster({ placement: "top-end" });

export const TerminateSessionModalApproved = ({
  isOpen,
  onClose,
  onConfirmTermination,
  isMutating = false,
}: TerminateSessionModalProps) => {

  const handleExecution = async () => {
    try {
      await onConfirmTermination();
      toaster.create({ title: "Session terminated successfully", type: "success" });
      onClose();
    } catch {
      toaster.create({ title: "Failed to terminate network session", type: "error" });
    }
  };

  return (
    <Dialog.Root 
      open={isOpen} 
      onOpenChange={(details) => !details.open && onClose()}
      role="alertdialog" // Step 1: Force alertdialog semantic parsing for critical operations
      closeOnInteractOutside={!isMutating}
    >
      {/* Step 2: Composition Primitives Scaffolding */}
      <Dialog.Backdrop />
      
      <Dialog.Positioner p={4}>
        <Dialog.Content 
          bg="bg.surface" 
          maxW="md" 
          borderRadius="md"
          border="1px solid" 
          borderColor="border.subtle"
          boxShadow="lg"
          className="gr-approved-alert-dialog"
        >
          
          <Dialog.Header px={6} pt={6} pb={3}>
            <HStack gap={3} align="flex-start">
              <Box color="red.solid" p={2} bg="red.muted" borderRadius="full" display="inline-flex">
                <Icon as={WarningIcon} boxSize={4} />
              </Box>
              <Box>
                <Heading as="h3" size="xs" fontWeight="bold" color="fg.primary">
                  Revoke Core Access Token
                </Heading>
                <Text fontSize="11px" color="fg.muted" mt={0.5}>
                  Active API client sessions will be aborted immediately.
                </Text>
              </Box>
            </HStack>
          </Dialog.Header>

          <Dialog.Body px={6} py={3}>
            <Text fontSize="xs" color="fg.secondary" lineHeight="relaxed">
              Are you entirely certain you want to permanently revoke this edge environment credential? 
              Any active deployment pipelines relying on this key token will error out instantly.
            </Text>
          </Dialog.Body>

          {/* Step 4: Footer Control Locks Mapping */}
          <Dialog.Footer bg="bg.panel" px={6} py={3} borderBottomRadius="md">
            <HStack gap={3} justify="flex-end" width="100%">
              <Button
                variant="outline"
                size="xs"
                onClick={onClose}
                disabled={isMutating}
                h="36px"
              >
                Cancel
              </Button>
              <Button
                variant="solid"
                colorPalette="red"
                onClick={handleExecution}
                loading={isMutating}
                h="36px"
                minW="110px"
              >
                Confirm Revocation
              </Button>
            </HStack>
          </Dialog.Footer>

        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};

TerminateSessionModalApproved.displayName = 'TerminateSessionModalApproved';
```