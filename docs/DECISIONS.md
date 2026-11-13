# Flivain Architectural & Design Decisions

This document records architectural, styling, and engineering decisions and assumptions.

---

## Decision Log

### 1. Zero External UI Frameworks
- **Decision**: No external UI framework (such as Tailwind, Bootstrap, or component libraries like MUI/Radix/Chakra) is added.
- **Rationale**: Strict compliance with requirements. Hand-crafted CSS Modules with CSS custom properties (design tokens) ensure complete control over CSS logical properties, bundle size, performance, and pixel-accuracy.

### 2. Font Selection
- **Latin Font**: **Plus Jakarta Sans** (Google Fonts).
  - *Rationale*: A modern geometric sans-serif with clean terminal cuts, open counters, and high legibility at both display sizes (H1 "Find And Book / A Great Experience") and micro-UI sizes (utility bar, tabs, badges). It perfectly embodies the contemporary aviation/fintech agency look of the reference.
- **Arabic Font**: **Cairo** (Google Fonts).
  - *Rationale*: Cairo is a geometric Kufi-inspired contemporary Arabic typeface whose proportions, ascender/descender heights, and curve geometry pair naturally with Plus Jakarta Sans, preventing visual dissonance when switching to RTL.

### 3. Color Palette & Token Scale
- **Primary Navy / Midnight**: `#0d1b2a` (Headers, branding, active text).
- **Aviation Blue / Primary Accent**: `#1b64da` (Brand primary, active booking tab, search action button, primary buttons).
- **Aviation Blue Hover**: `#144eb0`.
- **Sky Light Blue**: `#e8f1fc` (Active tab background, subtle badges).
- **Background Slate**: `#f6f8fb` (Page background).
- **Surface Pure White**: `#ffffff` (Cards, booking container, dropdowns).
- **Text Primary**: `#0f172a`.
- **Text Secondary / Muted**: `#64748b`.
- **Borders & Dividers**: `#e2e8f0`.
- **Error Red**: `#ef4444`.

### 4. Hero Section & Airplane Overlay Geometry
- **Reference Layout**: The hero features a wide pill shape with fully rounded ends (`border-radius: 9999px`) displaying sky and clouds. A front-view airplane sits on top, with its wings extending beyond the pill perimeter.
- **Implementation Strategy**:
  - A container element `.heroPillContainer` manages the relative positioning.
  - `.skyPill`: Fully rounded pill with `overflow: hidden`, `position: relative`, containing `sky.jpg` or rich high-altitude sky visual.
  - `.planeOverlay`: Positioned with `position: absolute`, centered vertically and horizontally over the pill, with `inline-size` calculated wider than the pill (e.g. `112%` of pill inline-size) and `z-index: 2` to create the optical illusion of the aircraft bursting out of the cloud portal.
  - At viewports under 640px, the airplane scales responsively while the pill adjusts height and radius so that the layout never triggers horizontal scrollbars.

### 5. Internationalization (i18n) Architecture
- **Decision**: Pure React Context (`I18nProvider`) with strong TypeScript typing (`KeyPaths<T>`).
- **Rationale**: Avoids adding `i18next` or heavy dependencies. Ensures that if any translation key is missing in Arabic or English, the TypeScript compiler immediately halts with a descriptive compile error.
- **Direction Handling**: Hook automatically maintains `<html dir="ltr" lang="en">` and `<html dir="rtl" lang="ar">`, updates `document.title`, and sets CSS direction classes.

### 6. Booking Widget Interaction & State
- **Cabin Classes**: "Economy", "Business Class", "First Class" (fixed typo from reference).
- **Fields**:
  - `Location`: Dropdown/autocomplete demo with popular hubs (e.g., New York JFK, London LHR, Dubai DXB, Paris CDG, Tokyo HND).
  - `Travelers`: Interactive popover stepper (Adults, Children, Infants).
  - `Check in` & `Check out`: Native date inputs with minimum date validation (Check out must be >= Check in).
- **Search Button**: Circular primary blue button with directional flight search icon that mirrors in RTL.
- **Submit Handling**: Pure client-side validation displaying a clean booking confirmation modal summary with selected options.

### 7. Accessibility & Motion
- All interactive controls feature `:focus-visible` outline rings with high contrast.
- All SVG icons have `aria-hidden="true"` or accessible labels.
- Motion (e.g. floating plane hover effect) is wrapped in `@media (prefers-reduced-motion: reduce)` which disables continuous transforms and replaces them with a static elegant presentation.
