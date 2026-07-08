# Glossary: Design System Tokens

## Definition
The single source of style truth established via Chakra UI v3, utilizing semantic tokens to abstract style declarations.

## Architectural Rules
* **Zero Hardcoded CSS**: Pixel configurations, hex values, and raw color strings are banned inside presentational components.
* **Token Ingestion**: Layout spacing, surface backgrounds, and borders must reference system variables natively (e.g., `bg="bg.surface"`, `p={4}`).
```