# Generator: Tabbed Settings Workspace Layout

Use this blueprint template whenever building structured multi-pane preference dashboards, organization adjustments, or application setup hubs.

---

## Structural Template Blueprint

```tsx
"use client";

import { Tabs, Box, Heading, Text, Stack } from '@chakra-ui/react';
import { ProfileTabForm } from '../components/ProfileTabForm';
import { SecurityTabSettings } from '../components/SecurityTabSettings';

export default function [MODULE_NAME]SettingsWorkspaceApproved() {
  return (
    <Box as="main" width="100%" maxW="5xl" mx="auto" className="gr-generated-[MODULE_NAME_LOWER]-settings-pane">
      <Stack gap={6}>
        <Box mb={2}>
          <Heading as="h1" size="sm" fontWeight="bold">Account Preferences</Heading>
          <Text fontSize="xs" color="fg.muted" mt={0.5}>Manage node security configs and profiles.</Text>
        </Box>

        {/* Chakra UI v3 Composable Tab Pipeline Orchestration */}
        <Tabs.Root defaultValue="general-profile" variant="line" size="sm" orientation="horizontal">
          <Tabs.List borderColor="border.subtle" mb={4}>
            <Tabs.Trigger value="general-profile" cursor="pointer">General Profile</Tabs.Trigger>
            <Tabs.Trigger value="security-keys" cursor="pointer">Access Credentials</Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="general-profile" pt={2} focusRing="none">
            <ProfileTabForm />
          </Tabs.Content>

          <Tabs.Content value="security-keys" pt={2} focusRing="none">
            <SecurityTabSettings />
          </Tabs.Content>
        </Tabs.Root>
      </Stack>
    </Box>
  );
}
```