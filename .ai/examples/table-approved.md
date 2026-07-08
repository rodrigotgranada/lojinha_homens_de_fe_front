# Approved Enterprise Table Component Example

This document defines the official premium reference model for responsive data table implementations across the platform. It combines strict production-grade code with explicit architectural characteristics to guide the AI generation engine.

---

## Characteristics (Características)

* **Chakra UI v3 Composition-First Design**: Fully aligned with the new `Table` composition primitives (`Table.Root`, `Table.ScrollArea`, `Table.Header`, `Table.Body`, `Table.Row`, `Table.Cell`), preventing monolithic, opaque array configurations.
* **Guaranteed Horizontal Overflow Containment**: Utilizes `Table.ScrollArea` to sandbox layout expansion safely on low-width base mobile devices. It isolates table matrices inside an independent scroll container to prevent application shell overflow leaks.
* **WCAG 2.1 Level AA Semantic Markups**: Table rows leverage strict `<Table.ColumnHeader scope="col">` bindings, ensuring assistive screen readers scan columns linearly and read structural data coordinates transparently.
* **Data Presentation Alignments**: Column layouts match explicit data formatting properties (numerical totals align right, primary descriptors left, operational states center) to maximize clarity for users.
* **Optimized Rendering Identity Maps**: Row renderers apply immutable, explicit database IDs as component keys (`key={transaction.id}`) rather than fragile array map indices, eliminating unnecessary DOM node destruction loops.

---

## Approved Code Implementation

```tsx
import { Table, Badge, IconButton, HStack, Text, Box, Flex, Button } from '@chakra-ui/react';
import { forwardRef } from 'react';
import { EyeIcon, TrashIcon, ChevronLeftIcon, ChevronRightIcon } from '@/assets/icons';

// 1. Strict Domain Entity Type Definitions
export interface TransactionRowPayload {
  id: string;
  referenceCode: string;
  customerName: string;
  amountInCents: number;
  status: 'settled' | 'pending' | 'failed';
  processedAt: string;
}

interface TableApprovedProps {
  dataCollection: TransactionRowPayload[];
  currentPage: number;
  totalPages: number;
  onPageChange: (targetPage: number) => void;
  onRowViewTrigger: (id: string) => void;
  onRowDeleteTrigger: (id: string) => void;
}

/**
 * Granada Enterprise Approved Table Component Blueprint.
 * Demonstrates best practices for high-density responsive data matrices using Chakra UI v3.
 */
export const TransactionTableApproved = forwardRef<HTMLDivElement, TableApprovedProps>(({
  dataCollection,
  currentPage,
  totalPages,
  onPageChange,
  onRowViewTrigger,
  onRowDeleteTrigger
}, ref) => {

  // 2. Pure Pure Selection Formatter Helper
  const formatCurrency = (amountCents: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amountCents / 100);
  };

  // 3. Centralized Status Theme Token Mappings
  const statusBadges = {
    settled: { palette: "green", label: "Settled" },
    pending: { palette: "amber", label: "Pending" },
    failed: { palette: "red", label: "Failed" }
  };

  return (
    <Box 
      ref={ref} 
      width="100%" 
      className="gr-approved-table-wrapper"
    >
      <VStack gap={4} align="stretch">
        
        {/* Layer 1: The Scroll Containment Sandbox Container */}
        <Table.ScrollArea 
          borderWidth="1px" 
          borderColor="border.subtle" 
          borderRadius="md" 
          bg="bg.surface"
        >
          <Table.Root size="sm" interactive showColumnBorder={false}>
            <Table.Header bg="bg.muted">
              <Table.Row>
                <Table.ColumnHeader scope="col">Reference</Table.ColumnHeader>
                <Table.ColumnHeader scope="col">Customer</Table.ColumnHeader>
                <Table.ColumnHeader scope="col">Processed Date</Table.ColumnHeader>
                <Table.ColumnHeader scope="col" textAlign="center">Status</Table.ColumnHeader>
                <Table.ColumnHeader scope="col" textAlign="right">Amount</Table.ColumnHeader>
                <Table.ColumnHeader scope="col" textAlign="right" pr={4}>Actions</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            
            <Table.Body>
              {dataCollection.length === 0 ? (
                <Table.Row>
                  <Table.Cell colSpan={6} textAlign="center" py={12} color="fg.muted">
                    No records matched the active filter criteria.
                  </Table.Cell>
                </Table.Row>
              ) : (
                dataCollection.map((transaction) => {
                  const currentBadge = statusBadges[transaction.status];
                  
                  return (
                    <Table.Row 
                      key={transaction.id}
                      _hover={{ bg: "bg.muted/50" }}
                      transitionProperty="background"
                      transitionDuration="fast"
                    >
                      {/* Left Alignment: Structural Codes & Identifiers */}
                      <Table.Cell fontWeight="mono" fontSize="xs" color="fg.primary">
                        {transaction.referenceCode}
                      </Table.Cell>
                      
                      {/* Left Alignment: Standard Typography Text */}
                      <Table.Cell fontWeight="medium" color="fg.primary">
                        {transaction.customerName}
                      </Table.Cell>
                      
                      <Table.Cell color="fg.secondary">
                        {transaction.processedAt}
                      </Table.Cell>
                      
                      {/* Center Alignment: Badges & Status Signals */}
                      <Table.Cell textAlign="center">
                        <Badge variant="subtle" colorPalette={currentBadge.palette}>
                          {currentBadge.label}
                        </Badge>
                      </Table.Cell>
                      
                      {/* Right Alignment: Numerical Currency Monospace Metrics */}
                      <Table.Cell textAlign="right" fontWeight="semibold" fontFamily="mono" color="fg.primary">
                        {formatCurrency(transaction.amountInCents)}
                      </Table.Cell>
                      
                      {/* Action Controllers Row Allocation */}
                      <Table.Cell textAlign="right" pr={4}>
                        <HStack gap={2} justify="flex-end">
                          <IconButton
                            size="sm"
                            variant="ghost"
                            aria-label={`View audit trail for ${transaction.referenceCode}`}
                            onClick={() => onRowViewTrigger(transaction.id)}
                          >
                            <EyeIcon />
                          </IconButton>
                          <IconButton
                            size="sm"
                            variant="ghost"
                            colorPalette="red"
                            aria-label={`Delete record ${transaction.referenceCode}`}
                            onClick={() => onRowDeleteTrigger(transaction.id)}
                          >
                            <TrashIcon />
                          </IconButton>
                        </HStack>
                      </Table.Cell>
                    </Table.Row>
                  );
                })
              )}
            </Table.Body>
          </Table.Root>
        </Table.ScrollArea>

        {/* Layer 2: Seamless Accessible Pagination Layout Bar */}
        <Flex justify="space-between" align="center" px={1} className="gr-table-pagination-bar">
          <Text fontSize="xs" color="fg.muted">
            Page <Box as="span" fontWeight="semibold" color="fg.primary">{currentPage}</Box> of <Box as="span" fontWeight="semibold" color="fg.primary">{totalPages}</Box>
          </Text>
          
          <HStack gap={2}>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage <= 1}
              onClick={() => onPageChange(currentPage - 1)}
              aria-label="Navigate to previous data page"
              minW="40px"
              h="36px"
            >
              <ChevronLeftIcon />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage >= totalPages}
              onClick={() => onPageChange(currentPage + 1)}
              aria-label="Navigate to next data page"
              minW="40px"
              h="36px"
            >
              Next
              <ChevronRightIcon />
            </Button>
          </HStack>
        </Flex>

      </VStack>
    </Box>
  );
});

TransactionTableApproved.displayName = 'TransactionTableApproved';
```