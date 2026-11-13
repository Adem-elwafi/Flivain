# Flivain Landing Page - Project Brief

## 1. Executive Summary
Flivain is a modern, premium flight booking agency. This project entails building a pixel-faithful, responsive, accessible, and RTL-ready landing page inspired by the reference design.

## 2. Core Reference Architecture & Requirements
- **Utility Bar**:
  - Customer support contact / notice.
  - Language switcher (`EN` / `AR`).
  - Auth actions: "Sign In", "Sign Up".
- **Main Navigation**:
  - Logo: "Flivain – Flight Booking Agency" with subtle modern flight branding mark.
  - Navigation Links: Home (active indicator), About, Offers, Seats, Destinations.
  - Action Button: Pill-shaped "Contact" button.
- **Hero Section**:
  - Centered H1 displayed over two lines: "Find And Book / A Great Experience" (with Arabic equivalent in RTL).
  - Wide pill-shaped container (fully rounded radius) framing a high-altitude sky-and-clouds backdrop.
  - Airplane layer: Front-perspective airplane centered over the pill, transparent background, with wingtips overflowing the pill container edges.
  - Subtle floating / hovering animation adhering to `prefers-reduced-motion`.
- **Booking Widget**:
  - Elevated rounded white card positioned directly below / overlapping the hero pill.
  - Cabin Class Tabs: "Economy", "Business Class" (default active), "First Class" (typo corrected).
  - Fields: Location (origin & destination), Travelers (interactive stepper modal/popover), Check in (native date), Check out (native date).
  - Prominent circular action button with search/arrow icon.
  - Client-side validation with responsive inline feedback and mock submit handling.
- **Content & Conversion Sections**:
  - **Offers & Seats**: Highlighted flight packages and comparison cards across Economy, Business, and First Class cabins.
  - **Destinations & Footer**: Featured destination visual grid, call-to-action booking banner, comprehensive semantic footer with copyright and links.

## 3. Technical & Architectural Constraints
- **Framework**: Vite + React 18+ + TypeScript (strict mode enabled).
- **Styling Architecture**: CSS Modules scoped per component with shared CSS custom properties (design tokens in `src/styles/tokens.css`).
- **Logical Properties Mandate**: Exclusively use CSS logical properties (`margin-inline`, `padding-inline`, `inset-inline`, `inline-size`, `text-align: start`, etc.). Left/right directional properties are strictly forbidden.
- **Internationalization (i18n)**:
  - Custom typed `I18nProvider` and `useI18n` hook.
  - Complete JSON translation dictionaries (`en.json`, `ar.json`).
  - Compile-time type safety requiring exact matching keys.
  - Root `<html dir="...">` and `<html lang="...">` switching.
- **Typography & Font Strategy**:
  - Latin: Plus Jakarta Sans / Outfit (clean geometric sans matching reference).
  - Arabic: Cairo / IBM Plex Sans Arabic (harmonized x-height and geometric curves).
- **Responsive Breakpoints**: Explicit mobile-first breakpoints: `640px`, `1024px`, `1280px`.
- **Accessibility (a11y)**:
  - Semantic HTML5 landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).
  - WCAG AA contrast compliance across all text and UI controls.
  - Visible keyboard focus rings with `:focus-visible`.
  - Motion control via `@media (prefers-reduced-motion: reduce)`.
