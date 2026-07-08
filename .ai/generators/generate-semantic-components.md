# Generator: Semantic Domain Components Architecture

Este guia orienta a engenharia, estruturação e a montagem de blocos visuais cientes de domínio (Semantic Components), posicionados obrigatoriamente dentro de seus respectivos módulos de negócio em `src/features/[feature-name]/components/`.

---

## 1. Regras de Estrutura de Diretórios
Não utilize arquivos planos soltos na raiz da pasta de componentes da funcionalidade. Cada componente semântico de domínio deve seguir a topologia isolada de diretório próprio:

```
src/features/[feature-name]/components/[ComponentName]/
├── index.ts                  # Exportador público limpo (Gatekeeper local)
├── [ComponentName].tsx        # Apresentador de domínio puro e sem estado
└── [ComponentName].test.tsx   # Suite de testes unitários dedicada (Jest + RTL)
```

---

## 2. Regras de Composição e Acoplamento
1. **Consumo de Primitivos**: É terminantemente proibido importar qualquer elemento de `@chakra-ui/react` dentro deste arquivo. Toda a interface deve ser erguida consumindo exclusivamente os adapters de fundação mapeados em `src/components/base/`.
2. **Acoplamento de Esquema (Schema Coupling)**: O componente deve ser fortemente tipado, recebendo entidades e payloads brutos de negócio (vindos de `src/features/[feature-name]/types/`) diretamente através de suas propriedades.
3. **Pureza de Estado (Stateless Boundary)**: Componentes semânticos são apresentadores puros de dados. Eles não podem disparar chamadas de rede internas, invocar hooks do TanStack Query (`useQuery` / `useMutation`) ou gerenciar fluxos complexos de escrita. Toda ação de mutação ou interação do operador deve ser delegada para camadas superiores via callbacks (ex: `onStatusChange`, `onRowClick`).
4. **Proibição de Comentários**: O arquivo final gerado deve estar 100% limpo de comentários explicativos inline, blocos JSDoc ou anotações de fluxo de desenvolvimento.
5. **Assinatura Metadata**: Adicione o tracking de identidade na última linha do arquivo através da propriedade padrão `Component.displayName = 'Component'`.

---

## 3. Padrão de Pareamento de Testes Unitários (Jest)
Cada componente semântico gerado exige a entrega concomitante de seu gêmeo de testes no mesmo diretório (`[ComponentName].test.tsx`), cobrindo:
* A renderização correta dos dados de negócio de acordo com variações da tipagem recebida (ex: cenários com status ativo, suspenso ou pendente).
* O disparo correto das funções de callback ao interagir com cliques do mouse ou acionamento de teclas de atalho.
* Ausência de comentários explicativos e cobertura rigorosa de ramos funcionais.
```