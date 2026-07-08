# Checklist: Master Component Quality Assurance

## Architecture & Semantics
- [ ] **Classification Check**: Verify if the component is purely visual (`base/`) or domain-aware (`features/`).
- [ ] **Semantic HTML5 Markup**: Ensure structural landmarks (`as="aside"`, `as="main"`, `as="header"`) are enforced instead of flat generic boxes.
- [ ] **React 19 Ref Forwarding**: Confirm `ref` is passed directly as a standard argument prop without using legacy `forwardRef`.
- [ ] **Strict Interface Contracts**: Check that properties are strongly typed; zero loose `any` bypasses are allowed.
- [ ] **AI-Friendly Identifiers**: Validate the inclusion of explicit structural class names (`className="gr-..."`) and accurate `displayName` properties.

## Interactive States & UX Feedback
- [ ] **Hover Interactions**: Confirm custom semantic hover backgrounds and durations are tokenized (`_hover={{ bg: "bg.muted" }}`).
- [ ] **Focus Rings**: Verify that focus indicators are highly visible for keyboard users via custom focus hooks or outline tokens.
- [ ] **Disabled Configurations**: Ensure interactive nodes apply appropriate gray scales and lock pointer triggers when state variables dictate.
- [ ] **CLS Protection**: Confirm that dynamic conditional panels match height metrics via skeletons to prevent layout shifting.
- [ ] **Empty States**: Ensure any dynamic list loop features a semantic `<EmptyState>` wrapper when data arrays return empty.
```