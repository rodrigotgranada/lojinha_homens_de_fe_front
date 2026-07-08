# Generator: Core Infrastructure Providers & Testing Utilities

Este gerador orienta a criação e a manutenção dos provedores globais da aplicação e utilitários de simulação de ambiente para a suíte de testes unitários (Jest).

---

## 1. Diretrizes de Engenharia de Infraestrutura

1. **Isolamento de Estado de Servidor (SSR Safety)**: O `QueryClient` do TanStack Query não deve ser instanciado de forma global estática para evitar vazamento de cache entre múltiplos Tenants/Usuários no Next.js 15. Ele deve ser gerado via estado de ciclo de vida seguro dentro do componente de provedores.
2. **Abstração do Provedor de Testes (Provider Encapsulation)**: Arquivos de testes unitários (`.test.tsx`) estão terminantemente proibidos de importar o método `render` diretamente de `@testing-library/react`. Eles devem consumir o método customizado exposto por `@/test/test-utils`, mitigando poluição visual de escopo.
3. **Mocks de Internacionalização**: O utilitário de testes deve injetar chaves padrão mínimas (`common` e `users`) no `NextIntlClientProvider` para blindar testes apresentacionais contra falhas de chaves de tradução ausentes.
4. **Proibição Absoluta de Comentários**: Nenhum dos arquivos gerados ou refatorados por este gerador pode conter comentários explicativos inline, blocos JSDoc ou marcações de fluxo.
5. **Metadados Semânticos**: Os componentes visuais gerados devem expor a propriedade `displayName` correspondente na última linha.

---

## 2. Especificação dos Arquivos Primitivos

### A. Provedores Globais (`src/app/providers.tsx`)
* **Dependências**: `QueryClientProvider`, `ChakraProvider` (consumindo o `system` customizado vindo de `@/theme/tokens`).
* **Regra TanStack**: Configurar tempo de expiração padrão (`staleTime`) de 5 minutos e desativar re-busca automática ao focar a janela do navegador (`refetchOnWindowFocus: false`).

### B. Utilitário de Teste Customizado (`src/test/test-utils.tsx`)
* **Dependências**: `@testing-library/react`, `ChakraProvider`, `NextIntlClientProvider`, `QueryClientProvider`.
* **Regra**: Criar a função wrapper `AllProviders` para encapsular a árvore, instanciar um `QueryClient` limpo a cada execução com retentativas desativadas (`retry: false`) e reexportar todas as utilidades do React Testing Library substituindo o método `render` nativo pelo customizado.