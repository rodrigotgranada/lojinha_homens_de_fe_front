# Checklist: Schema Form Quality Validation

## Structural Scaffolding Requirements
- [ ] **Uncontrolled Execution Loops**: Ensure all inputs rely on React Hook Form's ref registration (`...register`), avoiding individual string states.
- [ ] **Single Source Schema Truth**: Verify that validation logic is written within an independent, testable Yup schema object.
- [ ] **Automated Model Extraction**: Confirm that form typings are inferred dynamically from schemas via `yup.InferType`, avoiding duplicate interfaces.
- [ ] **Native HTML Reset**: Ensure the `<form>` element contains the `noValidate` property to clear out default browser alert bubbles.

## Client Field Feedback Integration
- [ ] **Realtime Validation Triggers**: Confirm form execution trees initialize using the responsive `mode: 'onTouched'` parameter.
- [ ] **Error Slot Connections**: Validate that field errors are routed directly into modern Chakra v3 `<Field.ErrorText>` blocks.
- [ ] **Server Validation Mapping**: Verify that remote API payload validation blocks are caught and routed back inline using the `setError` handler.
```