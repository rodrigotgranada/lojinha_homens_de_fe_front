# Generator: Feature CRUD Management Screen Template

Use this blueprint layout model whenever generating a full dashboard workflow managing list records alongside creation overlay dialog triggers.

---

## Structural Template Blueprint

```tsx
"use client";

import { useState } from 'react';
import { Box, Flex, Heading, Text, Button, Stack } from '@chakra-ui/react';
import { PlusIcon } from '@/assets/icons';

// Placeholder Import Hooks and Components
import { useGet[ENTITY_NAME]Query } from '../hooks/useGet[ENTITY_NAME]Query';
import { [ENTITY_NAME]ManagementTable } from '../components/[ENTITY_NAME]ManagementTable';
import { [ENTITY_NAME]ActionDialog } from '../components/[ENTITY_NAME]ActionDialog';

export default function [ENTITY_NAME]CrudWorkspaceView() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeRecordId, setActiveRecordId] = useState<string | null>(null);

  const { data: recordsCollection = [], isLoading } = useGet[ENTITY_NAME]Query();

  const handleOpenCreationFlow = () => {
    setActiveRecordId(null);
    setIsDialogOpen(true);
  };

  const handleOpenModificationFlow = (id: string) => {
    setActiveRecordId(id);
    setIsDialogOpen(true);
  };

  return (
    <Box as="main" width="100%" maxW="7xl" mx="auto" className="gr-generated-[ENTITY_NAME_LOWER]-crud-screen">
      <Stack gap={6}>
        <Flex direction={{ base: "column", sm: "row" }} justify="space-between" align={{ base: "stretch", sm: "center" }} gap={4}>
          <Box>
            <Heading as="h1" size="sm" fontWeight="bold">[ENTITY_NAME] Management</Heading>
            <Text fontSize="xs" color="fg.muted" mt={0.5}>Provision and audit environment records.</Text>
          </Box>
          <Button size="xs" colorPalette="blue" h="36px" onClick={handleOpenCreationFlow}>
            <PlusIcon /> Add New Record
          </Button>
        </Flex>

        <[ENTITY_NAME]ManagementTable 
          collection={recordsCollection} 
          onEdit={handleOpenModificationFlow} 
          isDataLoading={isLoading}
        />

        <[ENTITY_NAME]ActionDialog 
          isOpen={isDialogOpen} 
          onClose={() => setIsDialogOpen(false)} 
          targetId={activeRecordId}
        />
      </Stack>
    </Box>
  );
}
```