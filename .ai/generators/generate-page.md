# Generator: Next.js 15 Client Workspace Page Template

Use this template as the standard generation mold whenever instructed to instantiate a new functional routing container canvas view inside the Next.js App Router layer.

---

## Generator Variables Setup
```
[PAGE_TITLE] -> Clean string defining the workspace header title (e.g., Webhook Integrations)
[PAGE_DESCRIPTION] -> Contextual metadata subtitle explaining the node (e.g., Manage realtime system events.)
[FEATURE_DOMAIN] -> Target feature module path string source (e.g., webhooks)
```

## Structural Template Blueprint

```tsx
"use client";

import { Box, Flex, Heading, Text, Stack, Button } from '@chakra-ui/react';
import { useState } from 'react';
import { RefreshIcon } from '@/assets/icons';

export default function [PAGE_TITLE]ManagementWorkspacePage() {
  const [isSyncing, setIsSyncing] = useState(false);

  return (
    <Box 
      as="main" 
      width="100%" 
      maxW="7xl" 
      mx="auto" 
      py={{ base: 4, md: 8 }} 
      px={{ base: 4, md: 6 }}
      className="gr-approved-[FEATURE_DOMAIN]-workspace-page"
    >
      <Stack gap={6}>
        
        {/* Workspace Dynamic Tool Header Band */}
        <Flex 
          direction={{ base: "column", sm: "row" }} 
          justify="space-between" 
          align={{ base: "stretch", sm: "center" }} 
          gap={4}
          className="gr-page-header-command-tier"
        >
          <Box>
            <Heading as="h1" size="sm" fontWeight="bold" tracking="tight">
              [PAGE_TITLE]
            </Heading>
            <Text fontSize="xs" color="fg.muted" mt={0.5}>
              [PAGE_DESCRIPTION]
            </Text>
          </Box>

          <Flex align="center" gap={3}>
            <Button 
              variant="outline" 
              size="xs" 
              loading={isSyncing} 
              onClick={() => setIsSyncing(true)}
              h="36px"
            >
              <RefreshIcon /> Synchronize Dataset
            </Button>
          </Flex>
        </Flex>

        {/* Primary Operational Viewport Surface Slot */}
        <Box 
          border="1px dashed" 
          borderColor="border.subtle" 
          borderRadius="lg" 
          p={12} 
          bg="bg.surface"
          textAlign="center"
        >
          <Text fontSize="xs" color="fg.muted">
            [Insert Scoped Semantic Feature Presenters or Table Aggregators Here]
          </Text>
        </Box>

      </Stack>
    </Box>
  );
}
```

---

## Execution Protocol Instructions
This file is strictly a Client Component layer meant to handle interaction trees and coordinate modular feature data. The AI layout assistant must inject real domain hooks, replace layout placeholders with robust custom tables or loaders, and ensure all interior interaction flows adhere to the established system rules.
```