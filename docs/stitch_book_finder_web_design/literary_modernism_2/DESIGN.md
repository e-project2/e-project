---
name: Literary Modernism
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#45474c'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#75777d'
  outline-variant: '#c5c6cd'
  surface-tint: '#545f73'
  primary: '#091426'
  on-primary: '#ffffff'
  primary-container: '#1e293b'
  on-primary-container: '#8590a6'
  inverse-primary: '#bcc7de'
  secondary: '#0058be'
  on-secondary: '#ffffff'
  secondary-container: '#2170e4'
  on-secondary-container: '#fefcff'
  tertiary: '#240f00'
  on-tertiary: '#ffffff'
  tertiary-container: '#422000'
  on-tertiary-container: '#d97705'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e3fb'
  primary-fixed-dim: '#bcc7de'
  on-primary-fixed: '#111c2d'
  on-primary-fixed-variant: '#3c475a'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#adc6ff'
  on-secondary-fixed: '#001a42'
  on-secondary-fixed-variant: '#004395'
  tertiary-fixed: '#ffdcc3'
  tertiary-fixed-dim: '#ffb77d'
  on-tertiary-fixed: '#2f1500'
  on-tertiary-fixed-variant: '#6e3900'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
  accent-indigo: '#6366F1'
  accent-gold-light: '#F59E0B'
  surface-canvas: '#F8FAFC'
  surface-card: '#FFFFFF'
  text-primary: '#0F172A'
  border-subtle: '#E2E8F0'
  status-success: '#10B981'
  status-danger: '#EF4444'
  status-info: '#0EA5E9'
typography:
  display-hero:
    fontFamily: Playfair Display
    fontSize: 3.5rem
    fontWeight: '700'
    lineHeight: 4.25rem
    letterSpacing: -0.02em
  display-hero-mobile:
    fontFamily: Playfair Display
    fontSize: 2.25rem
    fontWeight: '700'
    lineHeight: 2.75rem
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 2.5rem
    fontWeight: '700'
    lineHeight: 3rem
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 1.75rem
    fontWeight: '700'
    lineHeight: 2.25rem
  headline-md:
    fontFamily: Playfair Display
    fontSize: 1.75rem
    fontWeight: '600'
    lineHeight: 2.25rem
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 1.25rem
    fontWeight: '600'
    lineHeight: 1.75rem
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.125rem
    fontWeight: '600'
    lineHeight: 1.625rem
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: 1.875rem
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: 1.625rem
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.375rem
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.875rem
    fontWeight: '600'
    lineHeight: 1.25rem
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.75rem
    fontWeight: '600'
    lineHeight: 1rem
    letterSpacing: 0.025em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system embodies **Literary Modernism**: an intersection of traditional editorial craft and refined digital ergonomics. It evokes the quiet, intellectual warmth of archival libraries, private reading studies, and contemporary cultural publishing.

The interface is engineered for readers, researchers, and book collectors who demand clarity and immersion over transactional clutter. Visual elements prioritize spacious typographic rhythm, balanced contrast, tactile warmth, and respectful hierarchy. The atmosphere remains scholarly yet inviting—achieved through the balance of classic serif display architecture and highly legible, functional geometric sans-serif details.

## Colors

The color palette centers on a disciplined harmony between scholastic structure and vibrant curatorial accents:

- **Primary (`#1E293B` - Deep Navy / Slate)**: Provides authoritative visual anchoring across structural headings, main navigations, and strong UI boundaries.
- **Secondary (`#3B82F6` - Electric Accent Blue)**: Directs user momentum, serving as the high-visibility focus token for core calls to action, focus rings, and primary links. Supported by `accent-indigo` (`#6366F1`) for alternate interactive highlights.
- **Tertiary (`#D97706` - Warm Amber)**: Encapsulates the tactile tradition of reading, used exclusively for bookmarks, reading status milestones, curated ribbons, and shelf ratings. Supported by `accent-gold-light` (`#F59E0B`) for warnings and secondary highlights.
- **Neutral (`#64748B` - Slate)**: Controls secondary hierarchy, metadata lines, publication dates, and muted descriptions.

Semantic states strictly utilize standard status tokens (`status-success`, `status-danger`, `status-info`). In dark mode, canvases invert to `#0F172A` with `#1E293B` containers, bound by `#334155` strokes.

## Typography

The typographic strategy orchestrates a deliberate tension between editorial history and digital clarity:

1. **Editorial Headlines (`Playfair Display`)**: Applied across book titles, section headlines, showcase quotes, and long-form introductions. High stroke contrast reinforces high-craft publishing tradition.
2. **Operational Core (`Plus Jakarta Sans`)**: Delivers supreme legibility across critical UI infrastructure, reading synopses, author biographies, interactive controls, and dense bibliographic metadata.
3. **Multilingual Rigor**: Font stacks fall back gracefully to standard Unicode system fonts (`Noto Serif`, `Noto Sans`) for cross-alphabet scripts, maintaining optical weight and x-height parity.

## Layout & Spacing

The system runs on an 8pt structural spatial rhythm mapped into a responsive grid:

- **Desktop (1200px+)**: 12-column responsive grid container (max 1440px wide). Margins set to `margin` (3rem) with `gutter` (1.5rem). Book displays occupy 4 columns (or 3 columns for dense catalogs). Split layouts (e.g., Book Details, Contact) partition into asymmetric columns (e.g., 5-column media rail vs. 7-column content body).
- **Tablet (768px - 1199px)**: 8-column layout. Gutter adjusts to 1.5rem; outer margin reduces to 2rem. Catalogs collapse to 2 columns.
- **Mobile (375px - 767px)**: 4-column layout with `margin-mobile` (1.25rem) and `gutter-mobile` (1rem). Catalogs collapse to a single structured card flow or horizontal snap-carousels. Fixed toolbars and bottom drawers replace static sidebars.

## Elevation & Depth

Visual hierarchy uses architectural layering, atmospheric ambient shadows, and selective translucent surfaces:

- **Layer 0 (Canvas)**: `#F8FAFC` base substrate.
- **Layer 1 (Card & Content Blocks)**: Pure `#FFFFFF` surfaces lifted with diffused, low-opacity ambient shadows: `0 4px 20px -2px rgba(0, 0, 0, 0.05)`. Encased with hairline borders (`1px solid #E2E8F0`).
- **Layer 2 (Hover & Raised Panels)**: Elevated book cards on hover lift physically using `transform: translateY(-4px)` with shadow bloom: `0 10px 25px -5px rgba(0, 0, 0, 0.1)`.
- **Layer 3 (Overlays & Modals)**: Lightbox backdrops, sticky reading progress heads, and floating navigation bars adopt subtle frosted glass (`backdrop-filter: blur(12px); background: rgba(255, 255, 255, 0.85)` in light mode, `rgba(15, 23, 42, 0.85)` in dark mode).
- **Focus Depth**: High-visibility outline ring (`2px solid #3B82F6`) with `outline-offset: 2px` across all keyboard navigations.

## Shapes

The shape system adopts a unified soft-modern geometry stratified by component function:

- **Base Corner Radius (`0.5rem` / 8px)**: Inputs, small controls, dropdown menus, and standard square buttons.
- **Container Radius (`1rem` / 16px)**: Book cards, reading progress cards, dialog containers, and elevated drawers.
- **Pill Radius (`9999px`)**: Interactive tags, language filter chips, bookmark indicators, and primary navigation pill buttons.
- **Media Aspect Ratios**: Book cover containers strictly enforce an archival `2:3` portrait aspect ratio with `overflow: hidden` and subtle `0.5rem` corner rounding to emulate physical book trim.

## Components

### Buttons
- **Primary Pill**: Filled with `#1E293B` (or `#3B82F6` for high-conversion CTAs), white text, `9999px` radius, padding `0.75rem 1.75rem`. Hover shifts background with high-contrast smooth ease.
- **Secondary / Ghost**: Outline `1px solid #E2E8F0`, background transparent or `#FFFFFF`, text `#0F172A`. On hover, subtle slate background tint (`#F1F5F9`).

### Chips & Badges
- **Pill Badges**: Border radius `9999px`, padding `0.25rem 0.75rem`. Text `label-sm`.
- **Language & Genre Chips**: Subtle `#F1F5F9` surface with `#0F172A` text. Selected state switches to a solid `#1E293B` or `#3B82F6` border with tinted blue fill (`#EFF6FF`).

### Cards & Book Displays
- **Book Display Card**: Rigid `2:3` image frame above card details. Card body wrapped in `#FFFFFF` with `1rem` radius and low-contrast outline. Hover triggers image scale (`scale: 1.05`) within clipped boundaries and an upward translate (`-4px`).
- **Reading Progress Card**: Embedded shelf card displaying reading percentage bars with `#D97706` fill and metadata badges (`label-sm`).

### Form Controls & Inputs
- **Input Fields**: Height `2.75rem`, radius `0.5rem`, border `1px solid #E2E8F0`, padding `0.5rem 1rem`. Focus state triggers `2px solid #3B82F6` with `2px` offset.
- **Checkboxes & Radios**: Size `1.25rem`, radius `0.25rem` (checkbox) or `9999px` (radio). Selected state fills with `#3B82F6` and white glyph icon.

### Navigation & Drawers
- **Header**: Sticky frosted panel with integrated brandmark, pill-shaped search input, and language switcher dropdown.
- **Mobile Drawer**: Bottom/side slide sheet using `#FFFFFF` (light) or `#1E293B` (dark), full viewport height coverage, and overlay backdrop blur.