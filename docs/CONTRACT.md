# Flivain Architecture & Team Contract

This document serves as the formal specification and engineering contract for all agents and modules contributing to the Flivain codebase.

---

## 1. Directory & File Organization

The project directory structure is strictly standardized:

```
flivain/
├── docs/
│   ├── BRIEF.md
│   ├── CONTRACT.md
│   ├── DECISIONS.md
│   └── QA_REPORT.md
├── design/
│   ├── tokens.css
│   └── design-notes.md
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   ├── sky.jpg          # At least 2400px wide hero sky image
│   │   ├── plane.png        # Transparent PNG airplane (front view)
│   │   └── ...              # Other SVG icons & static assets
│   ├── components/
│   │   └── ui/              # Shared primitive UI components
│   │       ├── Button/
│   │       │   ├── Button.tsx
│   │       │   └── Button.module.css
│   │       ├── Card/
│   │       │   ├── Card.tsx
│   │       │   └── Card.module.css
│   │       ├── Container/
│   │       │   ├── Container.tsx
│   │       │   └── Container.module.css
│   │       ├── Field/
│   │       │   ├── Field.tsx
│   │       │   └── Field.module.css
│   │       └── Tabs/
│   │           ├── Tabs.tsx
│   │           └── Tabs.module.css
│   ├── i18n/
│   │   ├── I18nContext.tsx
│   │   ├── en.ts
│   │   ├── ar.ts
│   │   └── index.ts
│   ├── sections/            # Section-specific components
│   │   ├── Header/
│   │   │   ├── Header.tsx
│   │   │   ├── Header.module.css
│   │   │   ├── en.json
│   │   │   └── ar.json
│   │   ├── Hero/
│   │   │   ├── Hero.tsx
│   │   │   ├── Hero.module.css
│   │   │   ├── en.json
│   │   │   └── ar.json
│   │   ├── BookingWidget/
│   │   │   ├── BookingWidget.tsx
│   │   │   ├── BookingWidget.module.css
│   │   │   ├── en.json
│   │   │   └── ar.json
│   │   ├── OffersSeats/
│   │   │   ├── OffersSeats.tsx
│   │   │   ├── OffersSeats.module.css
│   │   │   ├── en.json
│   │   │   └── ar.json
│   │   └── DestinationsFooter/
│   │       ├── DestinationsFooter.tsx
│   │       ├── DestinationsFooter.module.css
│   │       ├── en.json
│   │       └── ar.json
│   ├── styles/
│   │   ├── tokens.css       # Canonical CSS custom properties
│   │   └── globals.css      # Reset, font declarations, html/body baseline
│   ├── App.tsx              # Root composition
│   ├── main.tsx             # DOM mount & I18nProvider wrap
│   └── vite-env.d.ts
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 2. Component Guidelines & Prop Typing Rules

1. **Section Components**:
   - Each section lives exclusively in `src/sections/<Name>/`.
   - Export style: **Default export** (`export default function Header(): JSX.Element`).
   - Prop signature: Sections take **no required props** (`interface HeaderProps { className?: string }`).
   - Section components must not leak styles outside their root element.
   - Section components consume copy only through `useI18n()`.

2. **Shared UI Components (`src/components/ui/`)**:
   - Standardized reusable primitives:
     - `Container`: Handles responsive max-width (`1280px` standard, `1440px` hero) and inline padding.
     - `Button`: Variants (`primary`, `secondary`, `outline`, `icon`, `tab`), sizes (`sm`, `md`, `lg`), accessible focus.
     - `Tabs`: Accessible tablist, tab, tabpanel controls with keyboard navigation (Arrow keys).
     - `Field`: Accessible input wrapper with label, icon slot, helper text, and error state.
     - `Card`: Rounded elevated surface with customizable padding and shadow depth.
   - All components must define an explicit TypeScript `interface <ComponentName>Props`.
   - `any` is strictly prohibited. `unknown` or strict generics must be used if necessary.
   - All interactive elements must support `aria-*` attributes and keyboard event handling.

---

## 3. Styling & CSS Module Contract

1. **CSS Modules**:
   - Every component has a companion `.module.css` file.
   - Class naming convention: `camelCase` (e.g., `.heroWrapper`, `.planeOverlay`, `.searchButton`).
   - No tag selectors at the top level without scoping.
2. **CSS Logical Properties ONLY**:
   - Disallowed: `left`, `right`, `margin-left`, `margin-right`, `padding-left`, `padding-right`, `border-left`, `border-right`, `float: left|right`, `text-align: left|right`.
   - Mandated equivalents:
     - `inset-inline-start`, `inset-inline-end`
     - `margin-inline-start`, `margin-inline-end`, `margin-inline`
     - `padding-inline-start`, `padding-inline-end`, `padding-inline`
     - `border-inline-start`, `border-inline-end`
     - `text-align: start`, `text-align: end`, `text-align: center`
     - `inline-size` (for width where appropriate), `block-size` (for height)
3. **Breakpoints**:
   - Mobile-first approach. All media queries must use these literal values:
     - Small tablet / large phone: `@media (min-width: 640px)`
     - Tablet / desktop boundary: `@media (min-width: 1024px)`
     - Wide desktop: `@media (min-width: 1280px)`
4. **Token Usage**:
   - All colors, radii, shadows, typography, and spacing must reference `var(--token-name)`.
   - Agents must never hardcode arbitrary hex colors or pixel values in CSS modules when a token exists.

---

## 4. Internationalization (i18n) Contract

1. **Key Format**:
   - Dot notation strictly namespaced by section: `"<section>.<element>"` or `"<section>.<subSection>.<element>"`.
   - Examples:
     - `header.support`
     - `header.nav.home`
     - `hero.titleLine1`
     - `hero.titleLine2`
     - `booking.tabs.business`
     - `booking.fields.location`
2. **Compile-Time Safety**:
   - Root dictionary schema is inferred from `en.ts` / `en.json`.
   - `ar.ts` / `ar.json` must satisfy the exact identical type `Translations = typeof enTranslations`. Missing or extra keys cause immediate TypeScript compilation errors.
3. **Directionality & Fonts**:
   - Switching language changes `<html lang="en" dir="ltr">` vs `<html lang="ar" dir="rtl">`.
   - Typography adapts automatically via CSS custom properties `--font-family-sans` and `--font-family-arabic`.
   - Direction-sensitive icons (e.g., navigation arrows, planes) flip in RTL via `[dir="rtl"] .flipOnRtl { transform: scaleX(-1); }` or logical SVG orientations.

---

## 5. Definition of Done & Quality Gate

- Zero TypeScript compilation errors (`tsc --noEmit`).
- Zero Vite build errors (`npm run build`).
- No horizontal scrollbars at 390px viewport width.
- WCAG AA contrast ratio compliance.
- Reduced motion support via `@media (prefers-reduced-motion: reduce)`.
