# Approved Enterprise Async Query Hook Example

Este documento define o modelo de referência oficial e aprovado para a implementação de ganchos de consulta assíncrona (Custom Query Hooks) utilizando TanStack Query v5. Ele combina código TypeScript de produção com características arquiteturais explícitas para o motor de IA.

---

## Characteristics (Características)

* **Deterministic Key Factories**: Implementa uma fábrica de chaves de cache (`queryKeys`) centralizada e estruturada. Isso elimina o uso de strings literais espalhadas pelo código, prevenindo colisões ou falhas de invalidação de cache.
* **Granular StaleTime Configuration**: Define políticas explícitas de ciclo de vida de dados (`staleTime` e `gcTime`), garantindo que a aplicação minimize requisições redundantes em background e otimize o consumo de banda e processamento do servidor.
* **Type-Safe Transformation Selectors**: Utiliza a propriedade nativa `select` do TanStack Query para executar operações de filtragem, ordenação ou formatação de dados antes de expô-los à UI. Isso isola a lógica de apresentação e garante que o seletor rode de forma otimizada.
* **Decoupled API Client Service**: Isola a invocação de rede bruta dentro de uma camada de serviço dedicada (`projectService`), mantendo o hook focado estritamente na orquestração de estado de servidor (server state management).
* **Strict Runtime Error Handling**: Propaga erros fortemente tipados através da assinatura do gancho, permitindo integração imediata com Error Boundaries estruturais da UI.

---

## Approved Code Implementation

```typescript
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { api } from '@/infrastructure/api/client';

// 1. Immutable Domain Entity Type Definitions
export interface ProjectPayload {
  id: string;
  name: string;
  slug: string;
  status: 'active' | 'archived' | 'draft';
  updatedAt: string;
}

export interface FetchProjectsFilters {
  search?: string;
  status?: ProjectPayload['status'];
  page?: number;
}

interface APIPaginatedResponse<T> {
  items: T[];
  meta: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
}

// 2. Centralized Query Key Factory (Strict Cache Namespace)
export const projectKeys = {
  all: ['projects'] as const,
  lists: () => [...projectKeys.all, 'list'] as const,
  list: (filters: FetchProjectsFilters) => [...projectKeys.lists(), filters] as const,
  details: () => [...projectKeys.all, 'detail'] as const,
  detail: (id: string) => [...projectKeys.details(), id] as const,
};

// 3. Decoupled Infrastructure Service Layer
export const projectService = {
  fetchCollection: async (filters: FetchProjectsFilters): Promise<APIPaginatedResponse<ProjectPayload>> => {
    const response = await api.get<APIPaginatedResponse<ProjectPayload>>('/api/v1/projects', {
      params: {
        search: filters.search?.trim() || undefined,
        status: filters.status || undefined,
        page: filters.page || 1,
        limit: 10,
      },
    });
    return response.data;
  },
};

// 4. Approved Enterprise Custom Query Hook Architecture
export const useActiveProjectsQuery = (filters: FetchProjectsFilters) => {
  return useQuery<APIPaginatedResponse<ProjectPayload>, Error, APIPaginatedResponse<ProjectPayload>>({
    // Attach the deterministic compound key tracker
    queryKey: projectKeys.list(filters),
    
    // Bind execution directly to the decoupled service pipeline
    queryFn: () => projectService.fetchCollection(filters),
    
    // Core Caching Configuration Policies
    staleTime: 1000 * 60 * 5, // Data is considered fresh for 5 minutes
    gcTime: 1000 * 60 * 30,    // Unused cache memory garbage collected after 30 minutes
    refetchOnWindowFocus: false, // Prevents aggressive automatic fetches on browser tab focus
    retry: (failureCount, error) => {
      // Avoid retrying on standard client errors (e.g., 401 Unauthorized, 404 Not Found)
      if (failureCount >= 3) return false;
      return true;
    },
    
    // High-Performance Layout Continuity Strategy
    placeholderData: keepPreviousData, // Retains stale UI data while fetching the next page (CLS Mitigation)
    
    // Optional Transformation Selector Pattern (Uncomment if filtering or mutations are needed)
    /* select: (data) => ({
      ...data,
      items: data.items.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)),
    }),
    */
  });
};
```