# Flivain – Flight Booking Agency Landing Page

A pixel-faithful, responsive, accessible, and RTL-ready flight booking landing page built with **React**, **TypeScript (Strict Mode)**, **Vite**, and scoped **CSS Modules** with CSS custom properties (design tokens).

---

## 🚀 Quick Start

### Installation
```bash
# Navigate to the flivain directory
cd flivain

# Install dependencies
npm install

# Start local development server
npm run dev
```

### Build & Typecheck
```bash
# Verify strict TypeScript types
npx tsc --noEmit

# Production build
npm run build
```

---

## 🎨 Client Rebranding Guide

This codebase is architected to allow complete visual and brand customization in under 15 minutes without modifying core component logic:

### 1. Logo & Brand Name
- **Brand Name**: Update the brand name string in `src/sections/Header/en.json` (and `ar.json`) under `"brand.name"`, or in `src/i18n/en.ts` and `src/i18n/ar.ts`.
- **Brand Tagline**: Update `"brand.tagline"` in the same files.
- **Logo Icon / Emblem**: Replace the SVG inside `src/sections/Header/Header.tsx` (`<div className={styles.logoIconWrapper}>`) with your custom SVG or an `<img>` tag pointing to `src/assets/logo.svg`.
- **Favicon**: Replace `public/favicon.svg` with your brand's vector icon.

### 2. Colors & Design Tokens
All color scales, typography sizes, radii, and shadows are centralized in `src/styles/tokens.css` (or `design/tokens.css`):
- **Brand Primary**: Change `--color-brand-primary: #1b64da;` to your brand's main color.
- **Brand Hover**: Change `--color-brand-primary-hover: #144eb0;` to your hover state tint.
- **Background Tint**: Change `--color-brand-primary-light: #eaf1fb;` for active tab fills and badges.
- **Midnight Navy / Text**: Change `--color-text-primary: #0d1b2a;` for headers and primary typography.
- **Card Surfaces**: Change `--color-bg-surface: #ffffff;` and `--color-bg-body: #f7f9fc;`.

### 3. Copy & Translations (i18n)
All text is localized in typed JSON and dictionary files:
- **English Copy**: Edit `src/i18n/en.ts` or section files `src/sections/<Name>/en.json`.
- **Arabic / RTL Copy**: Edit `src/i18n/ar.ts` or section files `src/sections/<Name>/ar.json`.
- **Adding a New Language**:
  1. Add a new locale code (e.g. `fr`) to `Locale` in `src/i18n/types.ts`.
  2. Create `src/i18n/fr.ts` conforming strictly to `TranslationSchema`. Missing keys will fail compilation immediately.

### 4. Hero Imagery & Assets
Replace the high-resolution files in `src/assets/`:
- **`sky.jpg`**: High-altitude sky or destination backdrop framed inside the rounded pill (recommended: at least 2400px wide, 800px tall).
- **`plane.png`**: Commercial airliner, private jet, or product cutout with transparent alpha background (front perspective, at least 2400px wide). The wingtips will automatically overflow the pill boundaries symmetrically.

---

## 📐 Architecture & Standards

- **CSS Logical Properties Only**: Exclusively uses `margin-inline`, `padding-inline`, `inset-inline`, `text-align: start`, etc. Zero directional `left`/`right` properties.
- **Mobile-First Breakpoints**: Explicit literal values `640px`, `1024px`, and `1280px`.
- **Accessibility**: Semantic landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`), ARIA attributes on tabs, steppers, and modals, `:focus-visible` focus outlines, and `@media (prefers-reduced-motion: reduce)` support.
- **Zero Heavy UI Frameworks**: Pure hand-crafted CSS Modules with 0 runtime styling bloat.
