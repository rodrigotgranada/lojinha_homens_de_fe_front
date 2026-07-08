# Granada Architecture Rules: Dark Mode Required

This document defines the official binary validation rules, semantic color tokens, component elevation layering standards, and theme synchronization requirements regarding the absolute mandate of dark mode across the platform.

Treating dark mode as a secondary theme or after-thought configuration is treated as a severe architectural failure.

The goal is not simply flipping colors through global CSS filters.

The goal is to ensure:

* 100% native color orchestration across both light and dark modes flawlessly
* absolute eradication of hardcoded color values and raw hexadecimal strings
* premium enterprise visual aesthetic with proper depth, contrast, and eye-strain mitigation
* bulletproof protection against Flash of Unstyled Color (FOUC) during Next.js 15 SSR hydration
* consistent SVG icon and third-party visualization asset color tracking
* AI-friendly predictable semantic theme token allocation trees

Every layout component, typography unit, and border primitive must adapt to dark mode natively via design tokens.

---

# Core Dark Mode Philosophy

Dark mode is an essential operational requirement for premium enterprise SaaS products where operators experience long user sessions.

The system must look equally premium, consistent, and balanced in both theme choices.

Color systems must rely exclusively on semantic abstraction layers rather than raw visual choices.

Avoid hacking color variants locally within features outside the design system boundaries.

---

# Prohibited Hardcoded Colors

Do not inject raw hexadecimal numbers (`#FFFFFF`, `#1A202C`), RGB/RGBA declarations, or raw generic string color descriptions (`white`, `black`, `blue.500`) directly inside layout styles.

Hardcoding colors locks the component structure into a single presentation state, blinding it to live theme modifications.

```tsx
// FORBIDDEN - Raw color assignments breaking theme adaptivity
<Box bg="#FFFFFF" color="black" borderColor="gray.200" border="1px solid">
  <Text color="#333333">Dados Pessoais</Text>
</Box>
```

---

# Mandated Semantic Design Tokens

All color references must consume tokenized semantic identifiers from the Chakra UI v3 design engine system configurations.

Tokens describe the function of the element, not its literal color code value.

```tsx
// PREFERRED - Semantic composition that transforms automatically between modes
<Box bg="bg.panel" color="fg.primary" borderColor="border.muted" border="1px solid" borderRadius="md">
  <Text color="fg.muted" fontWeight="medium">Dados Pessoais</Text>
</Box>
```

---

# Chakra UI v3 Token Abstraction Rules

Leverage token primitives that declare dual-behavior states inside the system configuration.

Preferred tokens for default layout distribution:
* background layouts -> `bg.main`, `bg.surface`, `bg.panel`, `bg.muted`
* foreground typography -> `fg.primary`, `fg.secondary`, `fg.muted`, `fg.inverted`
* lines and structural frames -> `border.muted`, `border.subtle`, `border.emphasized`

---

# Prohibited Light-Centric Visual Assumptions

Do not write conditional ternary rendering logic to change token properties based on a manual state string check if a single semantic token can handle the abstraction.

```tsx
// FORBIDDEN - Fragile conditional tracking property arrays
const { colorMode } = useColorMode();
return <Box bg={colorMode === 'dark' ? 'slate.900' : 'white'} />;
```

---

# Mandated Native Color Mode Conditions

When custom unique fine-tuning changes are required for specific components, use the Chakra UI v3 native `_dark` pseudo-property modifier layer.

This keeps styles declarative and uncoupled from reactive client-side JavaScript execution pipelines.

```tsx
// PREFERRED - Declarative style modifier encapsulation
<Box 
  bg="brand.500" 
  _dark={{ bg: "brand.200", color: "gray.900" }}
  p={4}
>
  <Text>Painel de Controle</Text>
</Box>
```

---

# Next.js 15 SSR Hydration Guard (FOUC Mitigation)

To eliminate visual flickering or a "flash" of pure white during initial Next.js 15 server-side hydration cycles, color mode configurations must leverage safe server scripts.

Inject the official theme provider engine hydration scripts directly inside the root `layout.tsx` wrapper framework.

Ensure standard HTML attributes map color configurations securely onto the document element tree using standard system scripts.

```tsx
// PREFERRED - app/layout.tsx hydration integration layout
import { ColorModeProvider } from "@/components/ui/color-mode";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <ColorModeProvider>{children}</ColorModeProvider>
      </body>
    </html>
  );
}
```

---

# Dark Mode Component Elevation Layering Standards

Enterprise layouts in dark mode create spatial visual separation through color brightness elevation steps, never via deep drop shadows.

As a component steps up in layout hierarchy hierarchy (e.g., Page background -> Card -> Modal overlay), its background token must become progressively lighter to simulate proximity to the light source.

Elevation rules checklist:
* Level 0 (Main Canvas Background) -> `bg.main` (deepest dark tone)
* Level 1 (Card containers, list sheets) -> `bg.surface` or `bg.panel` (mid-tone dark adjustment)
* Level 2 (Floating overlay dialogs, dropdown panels, tooltips) -> `bg.elevated` (lightest dark tone variant)

---

# Drop Shadow Suppression Rule

Avoid using heavy black drop shadows (`boxShadow="lg"`) on dark mode containers.

Dark surfaces absorb shadow visuals, rendering standard black shadows invisible or causing dirty-looking layout halos.

Achieve separation by combining elevation token background shifts with thin, subtle border contrast lines (`border.subtle`).

---

# SVG Graphic and Icon Color Contracts

SVG elements, vector assets, and custom icon sets must extend color controls dynamically using native CSS parameters.

Set SVG structural elements to use `fill="currentColor"` or `stroke="currentColor"`.

This binds the vector container tracking directly to the parent layout typography color configuration token.

```tsx
// PREFERRED - Fully adaptive vector element pattern
export const StarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="currentColor" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);
```

---

# Text Contrast Verification Guard

Typography in dark mode must guarantee complete reading accessibility by adhering strictly to metrics in `.ai/rules/accessibility-required.md`.

Do not use overly dimmed grey tones (`gray.600`) for secondary text blocks in dark mode.

Ensure font structures remain readable under low ambient light scenarios by matching minimum contrast thresholds.

---

# Third-Party Library Styling Overrides (Charts & Inputs)

Data visualization tools (e.g., Recharts, Chart.js) and embedded components must be configured to respond immediately to active color mode hooks.

Pass design system theme token references directly into chart canvas properties or override third-party stylesheets using tokenized global CSS rules inside the platform framework wrapper.

```typescript
// PREFERRED - Chart axis token mapping rule
const chartGridColor = token("colors.border.muted");
const chartTextColor = token("colors.fg.muted");
```

---

# Form Controls Focus Isolation Standards

Form inputs running inside dark configurations must keep their interaction indicator tracks clean.

Ensure that `_focus` and `_focusVisible` states apply high-visibility token rings that match standard interactive colors without creating dark-on-dark invisible boundaries.

---

# AI Code Generation Dark Mode Directive Contracts

The AI generation controller must strictly refuse to output structural styling scripts that hardcode color choices.

Every color attribute generated by the agent must select a semantic design token parameter.

When creating complex interactive charts, lists, dashboards, or overlay containers, the engine must supply declarative styling rules that adapt automatically to dark mode properties without local runtime calculations.

---

# Forbidden Dark Mode Patterns Summary

Avoid:
* writing raw hex codes (`#000`) or color keyword references directly inline inside view layers
* using client-side javascript switches to switch static color variables manually on every component file
* using heavy dark drop shadow groupings on dark surfaces instead of semantic structural elevation steps
* ignoring server-side rendering flickering bugs by omitting hydration properties from Next 15 layouts
* hardcoding static black or white fills inside inline SVG icon graphic files

---

# Preferred Dark Mode Characteristics

Prefer implementation models that feel:
* premium, cohesive, and visually balanced across all operational screen nodes
* completely driven by automated design token switching frameworks
* easy on the eyes during prolonged operational night sessions
* seamlessly integrated across core layers, assets, and third-party modules

---

# Final Dark Mode Definition of Done

No module layout, custom component view, style definition recipe, or graphic asset package will pass completion review blocks if it violates design token boundaries or introduces broken dark mode presentation bugs.

Enforcing flawless dark mode theme governance validates the enterprise-grade design execution quality values of the premium SaaS platform.