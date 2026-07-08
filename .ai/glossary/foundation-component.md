# Glossary: Foundation Component (Primitive Adapter Layer)

## Definition
A presentational, stateless, and library-decoupling wrapper positioned exclusively within `src/components/base/`. It acts as the sole architectural adapter for third-party UI libraries.

## Architectural Rules
* **The Firewall Rule**: This directory is the ONLY place in the entire application allowed to import symbols from `@chakra-ui/react`. Any import of Chakra UI detected inside `src/features/` violates the architecture.
* **Prop Permeability**: Adapters must sanitize and forward props natively to the underlying vendor primitive, enforcing enterprise density defaults (`size="sm"`) automatically.
* **Prohibition of Comments**: No inline code explanations, documentation strings, or notes are allowed within these adapter files.
```