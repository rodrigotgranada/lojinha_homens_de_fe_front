# CHECKLIST: COMPONENT DELIVERY & PLAYGROUND INTEGRATION PROTOCOL

Este protocolo dita as regras obrigatórias de aceitação para qualquer criação, modificação ou refatoração de componentes residentes na camada `src/components/base/` ou peças críticas de `src/components/ui/`.

---

## 1. Critérios Técnicos de Conclusão (Definition of Done)
Antes de considerar uma tarefa de componente concluída, o agente deve certificar:
* **Isolamento de Estilos**: O componente consome 100% de tokens semânticos (`bg.canvas`, `bg.surface`, `border.subtle`, `fg.default`, `fg.muted`). Zero cores hexadecimais ou fixas em linha.
* **B2B Compact Protocol**: Imposição rigorosa de alta densidade (`size="sm"` ou geometria equivalente de `32px` de altura para elementos de formulário).
* **Ausência de Ruído**: Proibição absoluta de comentários inline explicativos nos arquivos de código entregues.
* **Segurança de Tipos**: Execução obrigatória de `npx tsc --noEmit` retornando 0 erros de compilação.

---

## 2. Protocolo de Documentação Viva (A Rota Playground)
É terminantemente **obrigatório** registrar e expor visualmente o componente no catálogo vivo do sistema imediatamente após sua criação ou alteração.

* **Arquivo Alvo**: `src/app/(private)/playground/page.tsx`
* **Ação Mandatória**: Injete uma seção estruturada (`<Box>` ou `<Grid>`) demonstrando o componente funcionando em ambiente real lado a lado, cobrindo:
  1. **Estado Padrão / Inativo**: O componente em repouso com seu respectivo placeholder.
  2. **Estado de Interação / Ativo**: O componente preenchido ou selecionado (exibindo suas marcas e tags internas).
  3. **Estado Inválido / Erro**: O componente renderizando suas bordas de erro semânticas e mensagens de validação associadas.

> 💡 *A rota de playground serve como a documentação comercial oficial para o cliente final do template SaaS e como esteira de testes assíncronos para o Color Mode (Light/Dark).*
```