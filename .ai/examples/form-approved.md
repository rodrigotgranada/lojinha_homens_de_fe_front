# Approved Enterprise Form Component Example

Este documento define o modelo de referência oficial e aprovado para a implementação de formulários enterprise na plataforma. Ele combina código de produção real com características arquiteturais explícitas para guiar o motor de geração de IA da IDE.

---

## Characteristics (Características)

* **Schema-Driven Architecture (Incerência Estrita)**: O estado e a tipagem do formulário são inferidos de forma 100% dinâmica a partir do objeto de validação do Yup através de `yup.InferType`. Isso elimina a duplicação de interfaces e previne a dessincronização de contratos de dados (type-drift).
* **High-Performance Keystroke Isolation**: Utiliza o ecossistema de referências não controladas (uncontrolled fields) do React Hook Form via método `register`. O componente pai não sofre re-renderizações globais a cada caractere digitado pelo utilizador, mitigando lags de input em dispositivos móveis ou formulários densos.
* **Chakra UI v3 Component Slot Alignment**: Adota a nova API de composição do `<Field.Root>` do Chakra UI v3, injetando de forma limpa propriedades reativas de erro (`invalid`) e acoplando sub-componentes semânticos de forma declarativa (`Field.Label`, `Field.ErrorText`).
* **Bypass de Validação Nativa**: Força o parâmetro `noValidate` na tag `<form>` para desativar os balões nativos inconsistentes dos navegadores, garantindo uma renderização uniforme e acessível das mensagens de erro do Design System.
* **Acessibilidade de Formulários (WCAG AA)**: Os campos possuem vinculação semântica correta entre labels e inputs, além de atualizarem propriedades ARIA (`aria-invalid`) em tempo real para leitores de ecrã quando ocorrem falhas de validação.

---

## Approved Code Implementation

```tsx
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Field, Input, Button, VStack, Heading, Box, createToaster } from '@chakra-ui/react';

// 1. Centralized Declarative Validation Contract Definition
export const accountProfileSchema = yup.object({
  fullName: yup
    .string()
    .trim()
    .min(3, "O nome deve conter pelo menos 3 caracteres")
    .required("Nome completo é obrigatório"),
  corporateEmail: yup
    .string()
    .trim()
    .email("Formato de e-mail inválido")
    .required("E-mail corporativo é obrigatório"),
  organizationUrl: yup
    .string()
    .trim()
    .matches(/^[a-z0-9-]+$/, "O endereço deve conter apenas letras minúsculas, números e hifens")
    .required("Endereço do workspace é obrigatório"),
}).required();

// 2. Automated TypeScript Contract Inference (Single Source of Truth)
export type AccountProfileFormValues = yup.InferType<typeof accountProfileSchema>;

interface AccountProfileFormProps {
  initialData?: AccountProfileFormValues;
  onSuccessTrigger: () => void;
}

const toaster = createToaster({ placement: "top-end" });

/**
 * Granada Enterprise Approved Form Component Blueprint.
 * Demonstrates best practices for React 19, Next.js 15, Chakra v3, RHF, and Yup.
 */
export const AccountProfileFormApproved = ({ 
  initialData, 
  onSuccessTrigger 
}: AccountProfileFormProps) => {
  
  // 3. High-Performance Form Initialization
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isValid },
  } = useForm<AccountProfileFormValues>({
    resolver: yupResolver(accountProfileSchema),
    mode: 'onTouched', // Validates instantly when user leaves the active field boundary
    defaultValues: initialData ?? {
      fullName: '',
      corporateEmail: '',
      organizationUrl: '',
    },
  });

  // 4. Decoupled Submit Execution Pipeline
  const onSubmitHandler = handleSubmit(async (payloadData: AccountProfileFormValues) => {
    try {
      // Direct integration with centralized abstraction client layer
      await api.post('/api/v1/account/profile', payloadData);
      
      toaster.create({
        title: "Perfil atualizado",
        description: "As alterações foram guardadas com sucesso.",
        type: "success",
      });
      
      onSuccessTrigger();
    } catch (serverError: any) {
      // Programmatic mapping of server-side conflicts back onto the RHF context tree
      if (serverError?.response?.status === 409) {
        setError('corporateEmail', { 
          message: 'Este e-mail corporativo já está associado a outra organização ativa.' 
        });
      } else {
        toaster.create({
          title: "Falha na operação",
          description: "Ocorreu um erro inesperado no servidor.",
          type: "error",
        });
      }
    }
  });

  return (
    <Box 
      p={6} 
      bg="bg.surface" 
      border="1px solid" 
      borderColor="border.subtle" 
      borderRadius="md"
      className="gr-approved-form-container"
    >
      {/* noValidate overrides inconsistent native browser prompt popups */}
      <form onSubmit={onSubmitHandler} noValidate>
        <VStack gap={5} align="stretch">
          <Heading as="h3" size="md" tracking="tight" color="fg.primary">
            Configurações do Perfil Organizacional
          </Heading>
          
          {/* Field 1: Text Input - Full Name */}
          <Field.Root invalid={!!errors.fullName}>
            <Field.Label>Nome Completo</Field.Label>
            <Input 
              type="text" 
              placeholder="Ex: Alexander Wright" 
              autoComplete="name"
              {...register("fullName")} 
            />
            <Field.ErrorText>{errors.fullName?.message}</Field.ErrorText>
          </Field.Root>

          {/* Field 2: Email Input - Corporate Email */}
          <Field.Root invalid={!!errors.corporateEmail}>
            <Field.Label>E-mail Corporativo</Field.Label>
            <Input 
              type="email" 
              placeholder="alexander@company.com" 
              autoComplete="email"
              {...register("corporateEmail")} 
            />
            <Field.ErrorText>{errors.corporateEmail?.message}</Field.ErrorText>
          </Field.Root>

          {/* Field 3: Specialized Character Selection Input - Organization Slug URL */}
          <Field.Root invalid={!!errors.organizationUrl}>
            <Field.Label>Endereço do Workspace (Slug)</Field.Label>
            <Input 
              type="text" 
              placeholder="minha-empresa" 
              {...register("organizationUrl")} 
            />
            <Field.ErrorText>{errors.organizationUrl?.message}</Field.ErrorText>
          </Field.Root>

          {/* Form Trigger Action Controller */}
          <Button 
            type="submit" 
            loading={isSubmitting} 
            disabled={!isValid}
            variant="solid"
            colorPalette="blue"
            width="100%"
            mt={2}
          >
            Guardar Configurações
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

AccountProfileFormApproved.displayName = 'AccountProfileFormApproved';
```