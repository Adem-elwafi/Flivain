# Flivain Design Notes & Measurement Specifications (1440px Base)

## 1. Typography Identification & Pairing

### Latin Typeface: **Plus Jakarta Sans** (Google Fonts)
- **Classification**: Modern Geometric Sans-Serif.
- **Visual Match Justification**:
  - Clean geometric circular bowls (`o`, `e`, `b`, `p`).
  - Crisp horizontal and vertical terminals without calligraphic tapering.
  - Generous x-height for exceptional legibility at micro-sizes (utility bar and inputs).
  - Matches the modern, premium aviation corporate feel of the reference layout.
- **Weights Used**: Regular (400), Medium (500), SemiBold (600), Bold (700), ExtraBold (800).

### Arabic Typeface: **Cairo** (Google Fonts)
- **Classification**: Modern Geometric Kufi / Arabic Sans-Serif.
- **Visual Match Justification**:
  - Contemporary architectural geometry that directly echoes Plus Jakarta Sans.
  - Proportional balance and open counters ensure high legibility in RTL mode.
  - Aligned baseline and comparable visual weight across all font weights.

---

## 2. Per-Section Layout Measurements (1440px Desktop Viewport)

### A. Utility Bar
- **Position**: Top-level full width bar.
- **Container Inline Size**: Max 1200px (centered).
- **Height**: ~40px.
- **Content Alignment**:
  - `start`: Support hotline / Customer assistance link ("Support" with headset icon).
  - `end`: Language Selector ("EN" / "AR" switch), Divider, "Sign In" link, "Sign Up" link/pill.
- **Typography**: 13px / Medium (500). Color: `#5a6e85`.
- **State Uncertainty**: The exact phone number or support format is not explicitly defined in the visual; an accessible icon + text link ("Support") is used.

### B. Main Navigation
- **Position**: Sits directly under utility bar, static or sticky with subtle background blur.
- **Height**: ~76px.
- **Container Inline Size**: Max 1200px.
- **Layout**: Flexbox space-between.
  - **Logo**: Inline-start. Flight glyph + Bold title "Flivain" (22px / Bold 700, `#0d1b2a`) + sub-brand "Flight Booking Agency" (12px / Medium 500, `#5a6e85`).
  - **Links**: Centered horizontally. "Home" (active with subtle indicator or dark weight), "About", "Offers", "Seats", "Destinations".
  - **Action**: Inline-end. Pill-shaped "Contact" button (Height 44px, Padding-inline 24px, border-radius 9999px, dark navy or subtle outline button).

### C. Hero Section
- **Container Inline Size**: 1280px.
- **H1 Headline**:
  - **Text**: Two centered lines:
    ```
    Find And Book
    A Great Experience
    ```
  - **Font Size**: 48px – 52px.
  - **Line Height**: 1.15.
  - **Color**: `#0d1b2a` (Primary Navy).
  - **Margin Bottom**: ~32px.
- **Pill Container (Sky & Clouds)**:
  - **Shape**: Horizontal pill with full semi-circle ends (`border-radius: 9999px`).
  - **Width**: ~1040px at 1440px desktop.
  - **Height**: ~340px.
  - **Background**: High-resolution bright blue sky with soft white clouds, clipped strictly within the pill curve (`overflow: hidden`).
- **Airplane Overlay**:
  - **Type**: Front-view twin-engine commercial airliner (transparent PNG layer).
  - **Position**: Positioned absolute, centered both vertically and horizontally over the sky pill.
  - **Width**: ~1220px – 1240px.
  - **Overflow**: Extends ~90px past the left and right curved edges of the sky pill, creating the 3D pop-out effect.
  - **Shadow**: Subtle soft ambient shadow beneath the fuselage onto the cloud layer.
  - **Motion**: Gentle 6s vertical levitation float (`transform: translateY(-8px)` to `translateY(4px)`).

### D. Booking Widget
- **Position**: Positioned directly beneath the hero pill, overlapping the bottom portion (`margin-block-start: -60px` to `-70px`) with higher z-index (`z-index: 5`).
- **Card Styling**:
  - **Inline Size**: Max 1040px (aligns with the sky pill width).
  - **Surface**: Solid white `#ffffff`.
  - **Border Radius**: 24px.
  - **Elevation Shadow**: `0 24px 60px rgba(13, 27, 42, 0.12)`.
  - **Padding**: 24px (inline and block).
- **Cabin Class Tabs**:
  - Positioned at the top of the widget card.
  - Options:
    1. "Economy"
    2. "Business Class" (**Active in reference**) - highlighted with brand blue background `#1b64da` or soft blue tint `#eaf1fb` with blue text.
    3. "First Class" (Typo in reference corrected).
  - Border radius: 9999px pill tabs.
- **Form Fields Grid**:
  - 4 major inputs arranged in a single horizontal row on desktop:
    1. **Location**: Flight icon, label "Location" / "Where to?", value display with departure & arrival selector.
    2. **Travelers**: Passenger icon, label "Travelers", display "1 Adult", interactive count stepper popover.
    3. **Check in**: Calendar icon, label "Check in", date picker input.
    4. **Check out**: Calendar icon, label "Check out", date picker input.
  - **Divider**: Subtle vertical dividers (`1px solid #e6ecf4`) between field sections.
- **Search Action Button**:
  - **Shape**: Circular (`border-radius: 50%`).
  - **Size**: 56px x 56px.
  - **Color**: Brand Primary Blue `#1b64da`.
  - **Icon**: White directional search / flight arrow icon.
  - **Hover**: Subtle scale + elevation increase.

### E. Additional Conversion Sections
- **Offers & Seats**:
  - Class comparison grid: Economy, Business Class, First Class perks and features.
  - Special seasonal offer cards with interactive booking action.
- **Destinations & Semantic Footer**:
  - Responsive visual grid of top destinations (Dubai, Paris, London, Tokyo, New York).
  - Call to action banner.
  - Multi-column footer: Company, Services, Support, Legal, plus copyright and language selector repeat.

---

## 3. Responsive Adaptations (Breakpoints)
- **1280px+ (Wide Desktop)**: Full 1440px layout proportions, wingspan overflows pill naturally.
- **1024px - 1279px (Desktop/Tablet)**: Pill width scales to ~90vw, airplane scales proportionally to avoid viewport overflow.
- **640px - 1023px (Tablet/Small Screen)**: Pill height reduces to ~260px, fields in 2x2 grid, tabs remain horizontal.
- **<640px (Mobile / 390px)**:
  - Hero H1 drops to 32px.
  - Pill becomes a compact rounded rectangle (`border-radius: 32px` or `40px`) with scaled plane contained within 100% width.
  - Booking widget fields stack vertically with full width.
  - Circular search button transforms into a full-width high-touch CTA button.
  - Zero horizontal overflow.
