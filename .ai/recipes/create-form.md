# Recipe: Engineering a High-Performance Form Flow

This recipe provides a step-by-step mechanical blueprint for scaffolding schema-driven, uncontrolled forms across the platform using React Hook Form and Yup validation contracts, aligned with Chakra UI v3 input slots.

---

## Step 1: Define the Declarative Validation Schema
1. Create a dedicated validation object file using `yup.object()`.
2. Apply strict type constraints, trim string inputs, and supply user-friendly, descriptive error messages.
3. Keep the validation rules decoupled from the UI markup to allow for headless unit testing.

## Step 2: Infer TypeScript Contracts Dynamically
1. Do not manually type duplicate interfaces for form values.
2. Extract the strong TypeScript type mapping automatically from the schema definition using `yup.InferType<typeof yourSchema>`.

## Step 3: Initialize the Uncontrolled Form Pipeline
1. Import `useForm` from `react-hook-form` and pass the `yupResolver` bridge utility.
2. Configure the performance mode to `onTouched`. This ensures validation loops fire instantly when a user leaves a field boundary, preventing keyboard input lag.
3. Provide explicit baseline `defaultValues` for all fields to prevent uncoordinated React runtime state errors (uncontrolled to controlled input shifts).

## Step 4: Map Visual Chakra UI v3 Input Slots
1. Wrap each input layout layer using Chakra UI v3 `<Field.Root>`.
2. Connect the field's error condition directly to the React Hook Form `errors` tree tracking object (`invalid={!!errors.fieldName}`).
3. Inject sub-component pieces declaratively (`Field.Label`, `Field.ErrorText`) to ensure assistive screen reading devices connect structural elements properly.
4. Spread the RHF tracking ref into the field tag: `{...register("fieldName")}`.

## Step 5: Bind Server-Side Exceptions
1. Force the `noValidate` property onto the `<form>` wrapper tag to silence standard browser popups.
2. Connect submission triggers through RHF's `handleSubmit` interceptor.
3. In catch blocks handling server conflicts (e.g., 409 Email Already Taken), catch errors and push notifications back into the inline visual field hierarchy using the `setError()` method.

---

## Reference Execution Pattern

```tsx
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Field, Input, Button, VStack, createToaster } from '@chakra-ui/react';

// 1. Declarative Schema Contract Definition
export const databaseConnectionSchema = yup.object({
  connectionUri: yup
    .string()
    .trim()
    .url("Must be a valid database URL contract string")
    .required("Database connection string is required"),
  poolMaxConnections: yup
    .number()
    .typeError("Value must be a numeric integer")
    .integer()
    .positive()
    .max(100, "Maximum proxy allowance exceeded")
    .required("Connection limit assignment is required"),
}).required();

// 2. Automated Type Allocation
export type DatabaseConnectionValues = yup.InferType<typeof databaseConnectionSchema>;

const toaster = createToaster({ placement: "top-end" });

export const DatabaseConnectionFormApproved = () => {
  // 3. Performance-Isolated Context Initialization
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isValid },
  } = useForm<DatabaseConnectionValues>({
    resolver: yupResolver(databaseConnectionSchema),
    mode: 'onTouched',
    defaultValues: {
      connectionUri: '',
      poolMaxConnections: 10,
    },
  });

  // 5. Submit Execution Handshake
  const onFormSubmission = handleSubmit(async (payloadData: DatabaseConnectionValues) => {
    try {
      await api.post('/api/v1/infra/database', payloadData);
      toaster.create({ title: "Cluster linked successfully", type: "success" });
    } catch (serverError: any) {
      if (serverError?.response?.status === 400) {
        // Map backend parameters back to the visual field slot
        setError('connectionUri', { 
          message: 'Database connection test failed. Credentials invalid or unreachable.' 
        });
      } else {
        toaster.create({ title: "Infrastructure connection error", type: "error" });
      }
    }
  });

  return (
    // Override standard browser validation alerts natively
    <form onSubmit={onFormSubmission} noValidate>
      <VStack gap={5} align="stretch" className="gr-approved-form-blueprint">
        
        {/* 4. Composable UI Input Mapping */}
        <Field.Root invalid={!!errors.connectionUri}>
          <Field.Label>Database Connection URI</Field.Label>
          <Input 
            type="text" 
            placeholder="postgresql://user:pass@host:5432/db" 
            {...register("connectionUri")} 
          />
          <Field.ErrorText>{errors.connectionUri?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.poolMaxConnections}>
          <Field.Label>Maximum Connection Pool Size</Field.Label>
          <Input 
            type="number" 
            {...register("poolMaxConnections", { valueAsNumber: true })} 
          />
          <Field.ErrorText>{errors.poolMaxConnections?.message}</Field.ErrorText>
        </Field.Root>

        <Button 
          type="submit" 
          loading={isSubmitting} 
          disabled={!isValid}
          colorPalette="blue"
        >
          Initialize Database Connection Link
        </Button>
      </VStack>
    </form>
  );
};

DatabaseConnectionFormApproved.displayName = 'DatabaseConnectionFormApproved';
```