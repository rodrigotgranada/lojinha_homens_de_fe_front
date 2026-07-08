# Granada Anti-Patterns: Inline Network Fetching

Este documento define os padrões de refatoração, contraexemplos práticos de infraestrutura, riscos de concorrência e diretrizes de engenharia para erradicar o antipadrão de Requisições de Rede Inline (Inline Network Fetching) dentro das camadas de UI da plataforma.

A execução de chamadas HTTP brutas diretamente em componentes de apresentação é tratada como uma violação gravíssima de arquitetura.

O objetivo deste documento não é apenas banir sintaxes específicas.

O objetivo é evitar:
* acoplamento rígido (tight coupling) entre as rotas de API do servidor e a marcação visual JSX
* vazamento de regras de segurança, cabeçalhos de autenticação e tokens JWT no código de apresentação
* race conditions e vazamentos de memória (memory leaks) devido ao ciclo de vida assíncrono descontrolado do componente
* ausência total de cache local de dados (server-state caching), gerando sobrecarga desnecessária na API
* interfaces inconsistentes com estados de carregamento (loading) e recuperação de falhas (error recovery) fragmentados
* AI-friendly platform patterns baseados em isolamento absoluto de camadas e previsibilidade de dados

Toda e qualquer comunicação de rede com serviços externos ou internos deve ser mediada pelas primitivas de infraestrutura.

---

# A Anatomia do Antipadrão

O antipadrão de Inline Fetching ocorre quando um componente visual assume a responsabilidade de instanciar clientes HTTP, gerenciar promessas assíncronas, tratar códigos de status de rede e salvar o resultado em estados reativos locais.

Essa abordagem quebra o princípio de Separação de Conceitos (Separation of Concerns) e pulveriza a lógica de comunicação da plataforma.

Se um endpoint de API sofrer uma alteração estrutural em sua rota ou payload, múltiplos componentes de apresentação quebram simultaneamente, exigindo varreduras massivas e refatorações manuais complexas.

Evite injetar strings de URL brutas ou configurações de clientes Axios/Fetch dentro de funções de renderização.

---

# Cenário Proibido (The Inline Fetch Disaster)

O bloco de código abaixo exemplifica o antipadrão absoluto: um componente de listagem de projetos que dispara requisições cruas dentro de um ciclo de vida local do React, manipulando estados manuais de loading e erros.

```tsx
// FORBIDDEN - O desastre da requisição inline (Falta de cache, vazamento de tokens e race conditions)
import { useState, useEffect } from 'react';
import { Box, Text, VStack, Button } from '@chakra-ui/react';
import axios from 'axios';

export const ProjectActiveList = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Falha Crítica: Execução de chamada HTTP bruta e exposta dentro de um useEffect inline
  useEffect(() => {
    setLoading(true);
    axios.get('/api/v1/projects/active', {
      headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
    })
    .then(response => {
      setProjects(response.data.items);
    })
    .catch(err => {
      setErrorMessage('Falha ao obter os projetos ativos do sistema');
    })
    .finally(() => {
      setLoading(false);
    });
  }, []);

  if (loading) return <Box>Carregando registros...</Box>;
  if (errorMessage) return <Box color="red.500">{errorMessage}</Box>;

  return (
    <VStack align="stretch" gap={2}>
      {projects.map((project: any) => (
        <Box key={project.id} p={4} border="1px solid gray">
          <Text fontWeight="bold">{project.name}</Text>
        </Box>
      ))}
    </VStack>
  );
};
```

---

# Análise de Degradação de Código

O exemplo `ProjectActiveList` degrada a estabilidade e a manutenibilidade do software por 5 motivos técnicos críticos:
1. Vulnerabilidade de Token: O componente lê o `localStorage` de forma direta e síncrona, ignorando os interceptores centrais e mecanismos de renovação automática de sessão (refresh token rotation).
2. Sem Cache de Estado: Se o operador navegar para fora desta tela e retornar 2 segundos depois, a aplicação disparará um novo fetch bruto contra o servidor, destruindo a percepção de alta performance.
3. Race Conditions: Se o componente for remontado rapidamente ou se parâmetros de busca mudarem em rede instável, respostas de requisições antigas podem sobrescrever dados novos na tela (stale updates).
4. Acoplamento de Layout: Os estados de loading e erro são renderizações rudimentares estruturalmente desalinhadas com os padrões de esqueleto molecular exigidos pela plataforma.
5. Invalidação Impossível: Outros componentes da tela (como um botão de criar projeto) não possuem nenhuma maneira previsível de forçar a atualização deste cache local, pois os dados estão trancados dentro deste escopo.

---

# O Padrão de Refatoração: Arquitetura em Três Níveis

Para erradicar o antipadrão, isolamos a comunicação de dados em três camadas desacopladas e especializadas:
1. **O Serviço de Domínio (`services/`)**: Abstrai as chamadas HTTP brutas utilizando a instância configurada do cliente central de API da plataforma.
2. **O Custom Hook de Infraestrutura (`hooks/`)**: Gerencia o ciclo de vida assíncrono, chaves de cache e estratégias de revalidação via TanStack Query.
3. **O Componente Semântico de Apresentação (`semantic/`)**: Consome passivamente as propriedades do gancho reativo e mapeia o JSX utilizando tokens visuais.

---

# Passo 1: O Serviço de Domínio (`services/project.ts`)

Encapsule as interações de endpoint dentro de objetos de serviço fortemente tipados. Esta camada é a única autorizada a conhecer caminhos de URL e payloads JSON do servidor.

```typescript
// PREFERRED - Isolamento completo do contrato de endpoint do servidor
import { api } from '@/infrastructure/api/client';
import { ProjectProfile, APICollectionResponse } from '../types';

export const projectService = {
  fetchActiveCollection: async (): Promise<ProjectProfile[]> => {
    const response = await api.get<APICollectionResponse<ProjectProfile>>('/api/v1/projects/active');
    return response.data.items;
  },
  
  createProject: async (payload: CreateProjectDTO): Promise<ProjectProfile> => {
    const response = await api.post<ProjectProfile>('/api/v1/projects', payload);
    return response.data;
  }
};
```

---

# Passo 2: O Custom Hook de Infraestrutura (`hooks/useActiveProjects.ts`)

Orquestre o estado de servidor (server state) utilizando ganchos customizados movidos a TanStack Query. Utilize fábricas de chaves estruturadas para blindar os seletores de cache.

```typescript
// PREFERRED - Abstração de gerenciamento de cache síncrono e chaves determinísticas
import { useQuery } from '@tanstack/react-query';
import { projectService } from '../services/project';
import { projectKeys } from '../keys';
import { ProjectProfile } from '../types';

export const useActiveProjects = () => {
  return useQuery<ProjectProfile[], Error>({
    queryKey: projectKeys.lists.active(),
    queryFn: projectService.fetchActiveCollection,
    staleTime: 1000 * 60 * 5, // Cache mantido fresco por 5 minutos
    refetchOnWindowFocus: false,
  });
};
```

---

# Passo 3: O Componente de Apresentação Consumidor (`semantic/ProjectActiveList.tsx`)

O componente de interface deve permanecer 100% livre de códigos de comunicação assíncrona crua. Ele lê propriedades derivadas e delega visualizações de estados para as diretrizes de UX assíncrona oficiais da plataforma.

```tsx
// PREFERRED - Interface passiva, altamente otimizada e sem acoplamento de infraestrutura
import { Box, VStack, Text } from '@chakra-ui/react';
import { useActiveProjects } from '../hooks/useActiveProjects';
import { ProjectListSkeleton } from '../variants/ProjectListSkeleton';
import { ComponentErrorBoundary } from '@/components/base/ComponentErrorBoundary';

export const ProjectActiveList = () => {
  const { data: projects, isLoading, error, refetch } = useActiveProjects();

  if (isLoading) {
    return <ProjectListSkeleton />;
  }

  return (
    <ComponentErrorBoundary error={error} onRetry={refetch}>
      <VStack align="stretch" gap={3} className="gr-project-list-viewport">
        {projects?.map((project) => (
          <Box 
            key={project.id} 
            p={4} 
            bg="bg.surface" 
            border="1px solid" 
            borderColor="border.subtle"
            borderRadius="md"
            _hover={{ borderColor: "border.emphasized" }}
          >
            <Text fontWeight="semibold" color="fg.primary">{project.name}</Text>
            <Text fontSize="xs" color="fg.muted">ID: {project.id}</Text>
          </Box>
        ))}
      </VStack>
    </ComponentErrorBoundary>
  );
};
```

---

# Exceção de Next.js 15 Server Components (RSC)

As chamadas diretas de dados de rede são toleradas exclusivamente dentro de React Server Components controlados localizados na árvore de páginas (`app/`). 

Mesmo nesses cenários específicos, a montagem manual de strings de URL brutas ou inicializações diretas do Axios dentro da página são proibidas. 

O Server Component deve invocar os métodos contidos na camada de `services/` compartilhada, garantindo a centralização e reuso do código.

```tsx
// PREFERRED - Server Component agindo estritamente via serviços de abstração
import { projectService } from '@/features/projects/services/project';
import { ProjectClientWrapper } from '@/features/projects/components/ProjectClientWrapper';

export default async function ProjectsPage() {
  // Chamada assíncrona direta no servidor utilizando o serviço tipado centralizado
  const initialData = await projectService.fetchActiveCollection();

  return <ProjectClientWrapper initialServerState={initialData} />;
}
```

---

# Diretrizes para a IA Engine (Network Generation Guard)

A IA está explicitamente impedida de gerar blocos de código contendo invocações inline do método `fetch()`, instâncias cruas do cliente Axios ou conexões assíncronas avulsas dentro de manipuladores de clique JSX ou ganchos `useEffect`.

Se a necessidade de obter ou persistir dados em rede surgir durante a interação do chat, a IA deve construir a classe ou arquivo de serviço correspondente, gerar o Custom Hook associado baseado em TanStack Query e, por fim, acoplar o resultado de forma limpa ao componente de UI.

---

# Resumo de Padrões Proibidos (Inline Fetch Summary)

Evite categoricamente:
* Importar bibliotecas HTTP (`axios`, `got`) para dentro de componentes visuais funcionais.
* Armazenar respostas brutas de requisições de rede diretamente em ganchos reativos primitivos locais (`useState`).
* Passar caminhos de caminhos e rotas de endpoints de API em formato string literal (`/api/v1/...`) dentro de arquivos JSX.
* Ignorar os ganchos de interceptação e injeção centralizados do cliente global `api`.

---

# Padrão Arquitetural Esperado

Dê preferência absoluta a visões de layout que consumam dados síncronos limpos, com estados de carregamento estruturados e previsíveis fornecidos nativamente por provedores de estado de rede especializados.

O isolamento total da camada de rede blinda as interfaces e garante a portabilidade contínua da nossa plataforma SaaS Enterprise Premium.