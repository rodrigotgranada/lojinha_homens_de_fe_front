# Checklist: Asynchronous Data Query & Cache Sync

## Cache State Precision
- [ ] **Isolated Hook Extraction**: Confirm all remote calls (`useQuery`, `useMutation`) are isolated within dedicated custom feature hooks.
- [ ] **Immutable Cache Key Arrays**: Ensure cache parameters are tracked through read-only key registries (`['domain', 'scope'] as const`).
- [ ] **Dynamic Key Context Dependencies**: Verify that changing filters, page shifts, and row counts are appended directly to query key lists.
- [ ] **Automated Cache Eviction**: Check that successful data mutations trigger automated query cache invalidations (`queryClient.invalidateQueries`).

## Fault Interception Mechanics
- [ ] **Graceful Exception Management**: Confirm error variables exposed by queries are intercepted via localized notifications or status states.
- [ ] **Background Refetch Protection**: Ensure active screens use subtle opacity loaders during refetches instead of unmounting the UI.
- [ ] **Network Race Avoidance**: Verify that components reset state or cancel out mid-flight requests when dependency filters change rapidly.
```