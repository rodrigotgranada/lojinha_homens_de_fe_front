# Recipe: Scaffolding Asynchronous Data Pipelines

This recipe dictates the exact mechanical workflow for implementing server synchronization, remote queries, and backend mutations using TanStack Query, eliminating data synchronization bugs and race conditions.

---

## Step 1: Isole Data Operations into Domains
1. Never call network clients (`fetch`, `axios`) directly inside a layout view file.
2. Abstract all asynchronous behaviors into dedicated Custom Hooks placed inside `src/features/[feature-name]/hooks/`.
3. Separate read workflows (`useQuery`) cleanly from modification paths (`useMutation`).

## Step 2: Anchor Immutable Cache Keys
1. Group feature query keys into structural, read-only constant objects to prevent cache invalidation drift.
2. Ensure queries append specific runtime entity scopes (such as tracking account IDs or page indexes) directly into key lists to guarantee cache isolation.
   * `export const projectKeys = { all: ['projects'] as const, detail: (id: string) => [...projectKeys.all, id] as const };`

## Step 3: Handle All Interactive Loading Layout States
1. Always expose `isLoading`, `isRefetching`, and `error` parameters to the UI layer.
2. Intercept active queries using defensive skeletons or layout spinner screens to avoid throwing Uncontrolled Layout Shifts (CLS) at users.
3. Lock interactive controls during active mutations using button loading overrides to prevent double submissions.

---

## Reference Execution Pattern

```tsx
// 1. Core Data Hook Isolation Architecture (src/features/projects/hooks/useProjectMutation.ts)
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const projectQueryKeys = {
  all: ['projects-ledger'] as const,
};

interface CreateProjectPayload {
  projectName: string;
  deploymentZone: string;
}

/**
 * Standard Platform Asynchronous Mutation Pipeline Hook.
 * Manages clean remote state updates and automates local cache invalidation.
 */
export const useCreateProjectMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateProjectPayload) => {
      const response = await api.post('/api/v1/projects', payload);
      return response.data;
    },
    onSuccess: () => {
      // Automate automated data synchronization by evicting stale cache matrices
      queryClient.invalidateQueries({ queryKey: projectQueryKeys.all });
    },
  });
};


// 2. UI Consumer Incorporation Model (src/features/projects/components/ProjectProvisioner.tsx)
import { useCreateProjectMutation } from '../hooks/useProjectMutation';
import { Button, HStack, createToaster } from '@chakra-ui/react';

const toaster = createToaster({ placement: "top-end" });

export const ProjectProvisionerAction = () => {
  const { mutateAsync, isPending } = useCreateProjectMutation();

  const handleProvisioningPipeline = async () => {
    try {
      await mutateAsync({
        projectName: "Edge Cache Node Delta",
        deploymentZone: "us-east-1",
      });
      toaster.create({ title: "Infrastructure pipeline activated", type: "success" });
    } catch {
      toaster.create({ title: "Failed to dispatch infrastructure deployment", type: "error" });
    }
  };

  return (
    <Button
      size="sm"
      colorPalette="blue"
      // Step 3: Mandated interface execution locks during network latency
      loading={isPending}
      onClick={handleProvisioningPipeline}
      className="gr-async-trigger-button"
    >
      Provision Production Node
    </Button>
  );
};

ProjectProvisionerAction.displayName = 'ProjectProvisionerAction';
```