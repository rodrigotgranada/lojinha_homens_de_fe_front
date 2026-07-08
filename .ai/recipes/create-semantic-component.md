# Recipe: Engineering Passive Semantic Components

This recipe details the precise mechanical workflow for constructing domain-aware, semantic interface blocks. These components map business models directly onto generic design primitives while acting as logic-less, passive layout systems.

---

## Step 1: Establish Strict Domain Bounds
1. Place semantic components strictly within their parent module boundary at `src/features/[feature-name]/components/`.
2. Name the file explicitly after the business entity or domain role it satisfies (e.g., `TenantBillingSummary.tsx`, `GatewayCredentialRow.tsx`).

## Step 2: Ingest Pre-Processed Typed Entities
1. Never ingest unstructured payloads or loose dictionary maps. Component parameters must bind directly to explicit TypeScript definitions or schema inferences exported from `../types/` or `../schemas/`.
2. Do not handle raw business data transformations, aggregation formulas, or array filtering inside the rendering scope. Pass raw parameters through pure selectors (`../selectors/`) before mapping properties to child inputs.

## Step 3: Compose Foundation Primitives Natively
1. Build the semantic markup by arranging generic structural atoms located inside `src/components/base/`. 
2. Inject unique semantic class attributes (`className="gr-semantic-[name]"`) into layout elements to establish robust CSS selectors and provide clear context anchors for AI scraping models.

---

## Reference Execution Pattern

```tsx
import { Box, Flex, Text, Badge, Stack, Button, Icon } from '@chakra-ui/react';
import { ShieldCheckIcon, AlertCircleIcon, KeyIcon } from '@/assets/icons';
import { ContainerCard } from '@/components/base/ContainerCard'; // Generic Base Atom

export interface ApiKeyPayload {
  id: string;
  keyLabel: string;
  maskedToken: string;
  associatedRole: string;
  isRevoked: boolean;
  expiresAtTimestamp: string;
}

interface ApiKeyRowProps {
  /**
   * Safe, fully-typed domain data package contract.
   */
  apiKeyRecord: ApiKeyPayload;
  /**
   * Action trigger delegated upward to an active parent coordinator hook.
   */
  onRevokeRequested: (id: string) => void;
}

/**
 * Passive Semantic Domain Component.
 * Acts as a logic-free visual presenter mapping business models to base atoms.
 */
export const ApiKeyRowApproved = ({ apiKeyRecord, onRevokeRequested }: ApiKeyRowProps) => {
  const { id, keyLabel, maskedToken, associatedRole, isRevoked, expiresAtTimestamp } = apiKeyRecord;

  return (
    <ContainerCard 
      variant={isRevoked ? "disabled" : "surface"} 
      className="gr-semantic-api-key-row"
      px={4}
      py={3}
    >
      <Flex direction={{ base: "column", md: "row" }} justify="space-between" align={{ base: "stretch", md: "center" }} gap={4}>
        
        {/* Entity Metadata Cluster */}
        <Stack gap={1}>
          <Flex align="center" gap={2}>
            <Icon as={KeyIcon} color={isRevoked ? "fg.muted" : "brand.solid"} />
            <Text fontSize="xs" fontWeight="semibold" color={isRevoked ? "fg.muted" : "fg.primary"}>
              {keyLabel}
            </Text>
            <Badge variant="subtle" size="sm" colorPalette={isRevoked ? "bg.muted" : "blue"}>
              {associatedRole}
            </Badge>
          </Flex>
          <Text fontSize="11px" fontFamily="mono" color="fg.muted">
            {maskedToken}
          </Text>
        </Stack>

        {/* Real-time Status Indicators & Controls */}
        <Flex align="center" justify="space-between" gap={6}>
          <Stack gap={0} align={{ base: "flex-start", md: "flex-end" }}>
            <Text fontSize="10px" color="fg.muted">
              {isRevoked ? "Deactivated Account Key" : `Expires: ${expiresAtTimestamp}`}
            </Text>
            <HStack gap={1} mt={0.5}>
              <Icon as={isRevoked ? AlertCircleIcon : ShieldCheckIcon} color={isRevoked ? "red.solid" : "green.solid"} boxSize="12px" />
              <Text fontSize="10px" fontWeight="medium" color={isRevoked ? "red.solid" : "green.solid"}>
                {isRevoked ? "Inactive" : "Valid Session"}
              </Text>
            </HStack>
          </Stack>

          <Button
            size="xs"
            variant="outline"
            colorPalette={isRevoked ? "bg.muted" : "red"}
            disabled={isRevoked}
            onClick={() => onRevokeRequested(id)}
            h="32px"
          >
            Revoke Access
          </Button>
        </Flex>

      </Flex>
    </ContainerCard>
  );
};

ApiKeyRowApproved.displayName = 'ApiKeyRowApproved';
```