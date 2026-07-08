# Glossary: Compound Component Pattern

## Definition
A component composition design architecture where multiple sub-elements cooperate under a shared structural parent identity using namespace assignment.

## Architectural Rules
* **Namespace Binding**: Implemented via explicit JavaScript binding methods (`Object.assign`) to group headers, bodies, and footers under a single import element.
* **No Floating Exports**: Sub-components must never be exported as flat global variables; they are accessible only via dot-notation (e.g., `<Card.Header>`).
```