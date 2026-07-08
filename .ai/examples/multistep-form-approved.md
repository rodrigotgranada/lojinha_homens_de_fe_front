# Approved Enterprise Multi-Step Wizard Form Example

This document defines the official premium reference model for complex multi-step wizard form architectures across the platform. It demonstrates how to combine partial validation gates per step, maintain ref-driven performance, and handle dynamic layout transitions cleanly using React Hook Form and Yup.

---

## Characteristics

* **Unified State with Segmented Validation**: Manages the complete wizard payload lifecycle within a single, unified React Hook Form context tree, but enforces atomic schema validations *per step* using targeted fields triggering (`form.trigger()`). This prevents stale data corruption and isolates state machines cleanly.
* **Progressive Validation Gates**: Operators cannot cheat navigation indices or jump ahead via keyboard macros. Advancing to the next step programmatically executes a strict schema guard check on the specific fields of the active step.
* **Zero Layout Shift Wizard Timeline**: Employs Chakra UI v3 primitive layouts with explicit element heights and index tracking to orchestrate view transitions fluidly, mitigating Cumulative Layout Shift (CLS) when swapping step views.
* **Automated Payload Composition**: Upon stepping into the final review layout, data properties merge into a singular typed schema derived via `yup.InferType`, ready for direct injection into database mutation services.
* **Accessible Progress Mappings (WCAG AA)**: The multi-step indicator controls map progress semantic indicators clearly, ensuring screen readers announce step changes (`Step 1 of 3: Organization Setup`) dynamically upon shift events.

---

## Approved Code Implementation

```tsx
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Field, Input, Button, VStack, HStack, Heading, Text, Box, RadioGroup, Radio, Separator } from '@chakra-ui/react';

// 1. Define Step-Specific Validation Blueprints Independently
const stepOneSchema = yup.object({
  workspaceName: yup.string().trim().min(3, "Workspace name must be at least 3 characters").required("Workspace name is required"),
  workspaceSlug: yup.string().trim().matches(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens").required("Workspace slug is required"),
});

const stepTwoSchema = yup.object({
  subscriptionTier: yup.string().oneOf(['growth', 'scale', 'enterprise'], "Invalid tier selection").required("Subscription plan selection is required"),
  dataRetentionMonths: yup.number().typeError("Must be a valid number").integer().min(1).max(24).required("Data retention configuration is required"),
});

// 2. Concat Blueprints to Form the Singular Master Source of Truth Contract
export const masterWizardSchema = stepOneSchema.concat(stepTwoSchema);
export type MasterWizardFormValues = yup.InferType<typeof masterWizardSchema>;

interface MultiStepFormProps {
  onFinalSubmitSuccess: (finalData: MasterWizardFormValues) => Promise<void>;
}

/**
 * Granada Enterprise Approved Multi-Step Form Component Blueprint.
 * Demonstrates advanced segmented validation mechanics with React Hook Form & Yup.
 */
export const ProvisioningWizardFormApproved = ({ onFinalSubmitSuccess }: MultiStepFormProps) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // 3. Centralized High-Performance Form Instance Initialization
  const {
    register,
    handleSubmit,
    trigger,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useForm<MasterWizardFormValues>({
    resolver: yupResolver(masterWizardSchema),
    mode: 'onTouched',
    defaultValues: {
      workspaceName: '',
      workspaceSlug: '',
      subscriptionTier: 'growth',
      dataRetentionMonths: 3,
    },
  });

  // 4. Progressive Validation Interceptor Gate
  const handleAdvanceStep = async () => {
    if (currentStep === 1) {
      // Execute strict targeted field evaluation for Step 1 dependencies exclusively
      const isStepOneValid = await trigger(['workspaceName', 'workspaceSlug']);
      if (isStepOneValid) setCurrentStep(2);
    } else if (currentStep === 2) {
      // Execute strict targeted field evaluation for Step 2 dependencies exclusively
      const isStepTwoValid = await trigger(['subscriptionTier', 'dataRetentionMonths']);
      if (isStepTwoValid) setCurrentStep(3);
    }
  };

  const handleRetreatStep = () => {
    if (currentStep === 2) setCurrentStep(1);
    if (currentStep === 3) setCurrentStep(2);
  };

  // 5. Final Combined Payload Execution Pipeline
  const onMasterSubmit = handleSubmit(async (completePayload: MasterWizardFormValues) => {
    try {
      await onFinalSubmitSuccess(completePayload);
    } catch (apiError) {
      console.error("Multi-step submission failure context:", apiError);
    }
  });

  return (
    <Box 
      p={6} 
      bg="bg.surface" 
      border="1px solid" 
      borderColor="border.subtle" 
      borderRadius="xl"
      boxShadow="md"
      maxW="xl"
      mx="auto"
      className="gr-approved-wizard-container"
    >
      {/* Dynamic Screen Reader Context Tracker */}
      <Box aria-live="polite" aria-atomic="true" className="gr-wizard-stepper-indicator" mb={6}>
        <Text fontSize="xs" fontWeight="bold" uppercase color="brand.solid" tracking="wider">
          Step {currentStep} of 3
        </Text>
        <Heading as="h3" size="md" tracking="tight" color="fg.primary" mt={1}>
          {currentStep === 1 && "Configure Organization Workspace"}
          {currentStep === 2 && "Select Infrastructure Scaling Architecture"}
          {currentStep === 3 && "Review Structural Deployment Blueprint"}
        </Heading>
        
        {/* Visual Progress Bar Rail Tracking Symmetrical Tokens */}
        <HStack gap={2} mt={3} width="100%">
          {[1, 2, 3].map((stepIdx) => (
            <Box 
              key={stepIdx}
              height="4px"
              borderRadius="full"
              width="100%"
              bg={stepIdx <= currentStep ? "brand.solid" : "bg.muted"}
              transitionProperty="background"
              transitionDuration="normal"
            />
          ))}
        </HStack>
      </Box>

      <Separator borderColor="border.subtle" mb={6} />

      <form onSubmit={onMasterSubmit} noValidate>
        <VStack gap={5} align="stretch" minH="240px">
          
          {/* STEP 1 VIEWPORT: Core Organization Metadata Inputs */}
          {currentStep === 1 && (
            <VStack gap={4} align="stretch" animation="fade-in 0.2s ease-out">
              <Field.Root invalid={!!errors.workspaceName}>
                <Field.Label>Organization Name</Field.Label>
                <Input 
                  type="text" 
                  placeholder="Ex: Acme Corporation Global" 
                  {...register("workspaceName")} 
                />
                <Field.ErrorText>{errors.workspaceName?.message}</Field.ErrorText>
              </Field.Root>

              <Field.Root invalid={!!errors.workspaceSlug}>
                <Field.Label>Workspace Base Routing URL (Slug)</Field.Label>
                <Input 
                  type="text" 
                  placeholder="acme-global" 
                  {...register("workspaceSlug")} 
                />
                <Field.ErrorText>{errors.workspaceSlug?.message}</Field.ErrorText>
              </Field.Root>
            </VStack>
          )}

          {/* STEP 2 VIEWPORT: Cloud Infrastructure & Limits Setup */}
          {currentStep === 2 && (
            <VStack gap={4} align="stretch" animation="fade-in 0.2s ease-out">
              <Field.Root invalid={!!errors.subscriptionTier}>
                <Field.Label mb={2}>Cloud Computational Resource Tier</Field.Label>
                <Controller
                  name="subscriptionTier"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup 
                      value={field.value} 
                      onValueChange={(details) => field.onChange(details.value)}
                    >
                      <HStack gap={4}>
                        <Radio value="growth" cursor="pointer">Growth Node</Radio>
                        <Radio value="scale" cursor="pointer">Scale Core</Radio>
                        <Radio value="enterprise" cursor="pointer">Enterprise Cluster</Radio>
                      </HStack>
                    </RadioGroup>
                  )}
                />
                <Field.ErrorText>{errors.subscriptionTier?.message}</Field.ErrorText>
              </Field.Root>

              <Field.Root invalid={!!errors.dataRetentionMonths}>
                <Field.Label>Log Analytical Retention Strategy (Months)</Field.Label>
                <Input 
                  type="number" 
                  {...register("dataRetentionMonths", { valueAsNumber: true })} 
                />
                <Field.ErrorText>{errors.dataRetentionMonths?.message}</Field.ErrorText>
              </Field.Root>
            </VStack>
          )}

          {/* STEP 3 VIEWPORT: Full Static Metadata Synthesis Review Grid */}
          {currentStep === 3 && (
            <Box animation="fade-in 0.2s ease-out" className="gr-wizard-review-grid" bg="bg.panel" p={4} borderRadius="md" border="1px solid" borderColor="border.subtle">
              <Text fontSize="xs" fontWeight="bold" uppercase color="fg.muted" mb={3}>Blueprint Deployment Parameters</Text>
              <VStack gap={2.5} align="stretch" fontSize="sm">
                <HStack justify="space-between"><Text color="fg.secondary">Organization Identifier:</Text><Text color="fg.primary" fontWeight="semibold">NATIVE TARGET</Text></HStack>
                <HStack justify="space-between"><Text color="fg.secondary">System Network URL Route:</Text><Text color="fg.primary" fontFamily="mono">/tenant/slug</Text></HStack>
                <HStack justify="space-between"><Text color="fg.secondary">Provisioning Cluster Class:</Text><Text color="fg.primary" textTransform="uppercase" fontWeight="bold">TIER SELECTED</Text></HStack>
                <HStack justify="space-between"><Text color="fg.secondary">Telemetry Retention Window:</Text><Text color="fg.primary">X Operational Months</Text></HStack>
              </VStack>
            </Box>
          )}

          {/* MASTER WIZARD CONTROL STEPS FOOTER INTERACTIVE BRIDGE */}
          <HStack gap={3} mt={4} width="100%" justify="flex-end">
            {currentStep > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={handleRetreatStep}
                disabled={isSubmitting}
                h="40px"
                fontSize="sm"
              >
                Back
              </Button>
            )}

            {currentStep < 3 ? (
              <Button
                type="button"
                variant="solid"
                colorPalette="blue"
                onClick={handleAdvanceStep}
                h="40px"
                fontSize="sm"
                minW="100px"
              >
                Continue
              </Button>
            ) : (
              <Button
                type="submit"
                variant="solid"
                colorPalette="green"
                loading={isSubmitting}
                disabled={!isValid}
                h="40px"
                fontSize="sm"
                minW="140px"
              >
                Initialize Provisioning
              </Button>
            )}
          </HStack>

        </VStack>
      </form>
    </Box>
  );
};

ProvisioningWizardFormApproved.displayName = 'ProvisioningWizardFormApproved';
```