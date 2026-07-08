# Checklist: Client-Side Security & Data Defensive Armor

## Input Sanitization & Serialization
- [ ] **XSS Prevention Gates**: Confirm all user inputs rendered in HTML blocks use strict text encoding primitives, escaping dangerous characters natively.
- [ ] **Rich-Text Sanitization**: Verify that raw html injections (`dangerouslySetInnerHTML`) are strictly banned unless filtered through a vetted sanitization tool.
- [ ] **Dynamic Evaluator Prohibition**: Ensure zero dynamic string code execution statements (`eval()`, `new Function()`) are used anywhere in the codebase.

## Session Guarding & Client State
- [ ] **Safe Token Architecture**: Confirm JWT credentials, sensitive cookies, or refresh tokens are never exposed or synchronized directly via unencrypted local storage states.
- [ ] **Opaque Errors Filtration**: Verify that server crash stack traces, internal database columns, or query paths are caught and masked, showing only clean generic code messages to client viewports.
- [ ] **Console Logging Sanitization**: Check that all debug trackers, API response data, and user payloads are fully wiped from output commands (`console.log`) before builds.
- [ ] **Strict Network Content Routing**: Ensure third-party URLs passed into navigation links are validated to prevent cross-origin tracking attacks (`rel="noopener noreferrer"`).
```