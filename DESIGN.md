---
version: alpha
name: "[Project or Brand Name]"
description: "[One-paragraph summary of the intended visual language, mood, density, primary interaction style, and any signature constraints.]"

colors:
  primary: "[hex]"
  primary-hover: "[hex]"
  primary-soft: "[hex]"
  secondary: "[hex]"
  accent: "[hex]"
  canvas: "[hex]"
  canvas-alt: "[hex]"
  surface: "[hex]"
  surface-raised: "[hex]"
  surface-inset: "[hex]"
  ink: "[hex]"
  body: "[hex]"
  muted: "[hex]"
  hairline: "[hex]"
  border: "[hex]"
  success: "[hex]"
  warning: "[hex]"
  danger: "[hex]"
  info: "[hex]"
  on-primary: "[hex]"
  on-dark: "[hex]"

typography:
  display-xl:
    fontFamily: '"GeosansLight-NMS", "Futura PT", "Avenir Next", sans-serif'
    fontSize: "[size]"
    fontWeight: "[weight]"
    lineHeight: "[line height]"
    letterSpacing: "[letter spacing]"
  display-lg:
    fontFamily: '"GeosansLight-NMS", "Futura PT", "Avenir Next", sans-serif'
    fontSize: "[size]"
    fontWeight: "[weight]"
    lineHeight: "[line height]"
    letterSpacing: "[letter spacing]"
  display-md:
    fontFamily: '"GeosansLight-NMS", "Futura PT", "Avenir Next", sans-serif'
    fontSize: "[size]"
    fontWeight: "[weight]"
    lineHeight: "[line height]"
    letterSpacing: "[letter spacing]"
  heading:
    fontFamily: '"GeosansLight-NMS", "Futura PT", "Avenir Next", sans-serif'
    fontSize: "[size]"
    fontWeight: "[weight]"
    lineHeight: "[line height]"
    letterSpacing: "[letter spacing]"
  body-lg:
    fontFamily: '"GeosansLight-NMS", "Futura PT", "Avenir Next", sans-serif'
    fontSize: "[size]"
    fontWeight: "[weight]"
    lineHeight: "[line height]"
    letterSpacing: "[letter spacing]"
  body:
    fontFamily: '"GeosansLight-NMS", "Futura PT", "Avenir Next", sans-serif'
    fontSize: "[size]"
    fontWeight: "[weight]"
    lineHeight: "[line height]"
    letterSpacing: "[letter spacing]"
  body-sm:
    fontFamily: '"GeosansLight-NMS", "Futura PT", "Avenir Next", sans-serif'
    fontSize: "[size]"
    fontWeight: "[weight]"
    lineHeight: "[line height]"
    letterSpacing: "[letter spacing]"
  caption:
    fontFamily: '"GeosansLight-NMS", "Futura PT", "Avenir Next", sans-serif'
    fontSize: "[size]"
    fontWeight: "[weight]"
    lineHeight: "[line height]"
    letterSpacing: "[letter spacing]"
  mono:
    fontFamily: '"GeosansLight-NMS", "Futura PT", "Avenir Next", sans-serif'
    fontSize: "[size]"
    fontWeight: "[weight]"
    lineHeight: "[line height]"
    letterSpacing: "[letter spacing]"

spacing:
  xs: "[value]"
  sm: "[value]"
  md: "[value]"
  lg: "[value]"
  xl: "[value]"
  2xl: "[value]"
  3xl: "[value]"
  section: "[value]"

rounded:
  none: "[value]"
  sm: "[value]"
  md: "[value]"
  lg: "[value]"
  xl: "[value]"
  pill: "[value]"

shadows:
  none: "[value]"
  subtle: "[value]"
  raised: "[value]"
  floating: "[value]"
  focus: "[value]"

layout:
  maxWidth: "[value]"
  contentWidth: "[value]"
  gridColumns: "[value]"
  gutter: "[value]"
  sectionPadding: "[value]"

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: "[value]"
    height: "[value]"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    borderColor: "{colors.border}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: "[value]"
    height: "[value]"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    borderColor: "{colors.border}"
    shadow: "{shadows.subtle}"
    rounded: "{rounded.lg}"
    padding: "[value]"
  input:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    borderColor: "{colors.border}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "[value]"
    height: "[value]"
  navigation:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    height: "[value]"
  badge:
    backgroundColor: "{colors.primary-soft}"
    textColor: "{colors.primary}"
    typography: "{typography.caption}"
    rounded: "{rounded.pill}"
    padding: "[value]"
---

## Overview

[Describe the overall design atmosphere, product context, visual density, and primary emotional impression.]

**Key Characteristics:**
- [Characteristic 1]
- [Characteristic 2]
- [Characteristic 3]
- [Characteristic 4]
- [Characteristic 5]

## Colors

> **Source pages or references analyzed:** [List pages, product surfaces, screenshots, brand files, or design references.]

### Brand & Accent
- **[Token Name]** (`{colors.primary}` - [hex]): [Role and usage.]
- **[Token Name]** (`{colors.accent}` - [hex]): [Role and usage.]

### Surface
- **[Token Name]** (`{colors.canvas}` - [hex]): [Role and usage.]
- **[Token Name]** (`{colors.surface}` - [hex]): [Role and usage.]
- **[Token Name]** (`{colors.surface-raised}` - [hex]): [Role and usage.]

### Text
- **[Token Name]** (`{colors.ink}` - [hex]): [Role and usage.]
- **[Token Name]** (`{colors.body}` - [hex]): [Role and usage.]
- **[Token Name]** (`{colors.muted}` - [hex]): [Role and usage.]

### Hairlines & Borders
- **[Token Name]** (`{colors.hairline}` - [hex]): [Role and usage.]
- **[Token Name]** (`{colors.border}` - [hex]): [Role and usage.]

### Semantic
- **Success** (`{colors.success}` - [hex]): [Role and usage.]
- **Warning** (`{colors.warning}` - [hex]): [Role and usage.]
- **Danger** (`{colors.danger}` - [hex]): [Role and usage.]
- **Info** (`{colors.info}` - [hex]): [Role and usage.]

### Gradients & Effects
- [Document gradient rules, overlays, scrims, glows, image treatments, or state that gradients are intentionally absent.]

## Typography

### Font Family
- **Display**: `"GeosansLight-NMS", "Futura PT", "Avenir Next", sans-serif` - The primary typeface for all Atlas headings, navigation, interface labels, and large numbers.
- **Body / UI**: `"GeosansLight-NMS", "Futura PT", "Avenir Next", sans-serif` - Use throughout the interface to preserve the game's sparse, extraterrestrial visual voice.
- **Mono / Technical**: `"GeosansLight-NMS", "Futura PT", "Avenir Next", sans-serif` - Use the same family for diagnostic and coordinate-like text; distinguish it through casing, tracking, and colour rather than a second font.

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `{typography.display-xl}` | [size] | [weight] | [line height] | [letter spacing] | [use] |
| `{typography.display-lg}` | [size] | [weight] | [line height] | [letter spacing] | [use] |
| `{typography.display-md}` | [size] | [weight] | [line height] | [letter spacing] | [use] |
| `{typography.heading}` | [size] | [weight] | [line height] | [letter spacing] | [use] |
| `{typography.body-lg}` | [size] | [weight] | [line height] | [letter spacing] | [use] |
| `{typography.body}` | [size] | [weight] | [line height] | [letter spacing] | [use] |
| `{typography.body-sm}` | [size] | [weight] | [line height] | [letter spacing] | [use] |
| `{typography.caption}` | [size] | [weight] | [line height] | [letter spacing] | [use] |
| `{typography.mono}` | [size] | [weight] | [line height] | [letter spacing] | [use] |

### Principles
- [Typography principle 1]
- [Typography principle 2]
- [Typography principle 3]

### Note on Font Substitutes
- Load `GeosansLight-NMS` with `@font-face` when the licensed font file is available. Otherwise fall back in order to `Futura PT`, `Avenir Next`, then the system sans-serif; preserve the designed tracking because these substitutes will appear optically denser.

## Layout

### Spacing System
- [Describe spacing scale, rhythm, section padding, and density.]

### Grid & Container
- [Describe max widths, column systems, gutters, alignment, and content constraints.]

### Whitespace Philosophy
- [Describe how empty space should be used and what it should communicate.]

## Elevation & Depth

- [Describe shadows, layering, borders, background separation, blur, or flatness.]

### Decorative Depth
- [Describe any glow, gradient mesh, scrim, photographic depth, or decorative depth rules.]

## Shapes

### Border Radius Scale
- `{rounded.none}`: [value] - [usage]
- `{rounded.sm}`: [value] - [usage]
- `{rounded.md}`: [value] - [usage]
- `{rounded.lg}`: [value] - [usage]
- `{rounded.xl}`: [value] - [usage]
- `{rounded.pill}`: [value] - [usage]

### Photography & Illustration Geometry
- [Describe crop ratios, masks, image corners, framing, object fit, and illustration style.]

## Components

### Top Navigation
- [Structure, height, density, active states, mobile behavior.]

### Buttons
- **Primary**: [Treatment, states, sizing, icon rules.]
- **Secondary**: [Treatment, states, sizing, icon rules.]
- **Ghost / Link**: [Treatment, states, sizing, icon rules.]

### Cards & Containers
- [Backgrounds, borders, spacing, elevation, hover states, density.]

### Inputs & Forms
- [Field styling, focus rings, validation, labels, helper text.]

### Tabs, Badges & Chips
- [Segmented controls, status marks, filters, metadata tokens.]

### Tables & Data Displays
- [Rows, headers, density, dividers, sorting, empty states.]

### Navigation
- [Sidebar, breadcrumbs, pagination, mobile nav, command surfaces.]

### Signature Components
- **Atlas Core**: Store the isolated sphere and its fixed upper-right light treatment in `atlas/components/atlas-core/` as a complete reusable component: `index.html` provides the structure and offline preview, `atlas-core.css` provides the stage and fallback, and `atlas-core.js` provides the sphere and lighting. Mount with `AtlasCore.mount({ hero, canvas })`. Do not add a cockpit, dais, terminal frame, surrounding machinery, large interface copy, or any background halo. Red energy appears selectively inside upper and forward-facing facets rather than coating the whole body.
- **Layering**: Build the sphere from two concentric meshes with identical low-poly topology. Use Icosahedron detail 4 on desktop and detail 3 on mobile so the facets remain visible but substantially denser. The smaller opaque inner mesh carries the object-space red-black emissive texture; the slightly larger transparent outer mesh carries the black metallic shell and hard white reflection. Reduce the outer shell opacity over the lit region so the inner red layer reads as emitted light rather than black paint.
- **Contour edge**: Add two faceted contour meshes behind the shell: a narrow warm-white line immediately outside the black body, and a larger, reduced-opacity signal-red line surrounding it. Keep both contours attached to the rotating core; they define the object silhouette and must never read as background glow.
- **Light language**: Keep one world-space light direction fixed at the upper-right front. Use a wider base illumination mask for the red inner glow and carry a continuous low-intensity metallic reflection across that entire lit mask. Layer a tightly focused warm-gray reflection on top, further reducing its compact spherical-cap footprint while retaining a steep, but not hard-edged, transition into the broader metallic field. Calculate reflection alignment directly from the facet normal and light direction, never from the camera or a reflection half-vector. When an outer facet directly faces the light source, keep the peak visibly below pure white so the inner red energy, warm tint, and facet texture survive tone mapping; transition rapidly back through the broad reflection field as alignment decreases. Outside the primary region, retain a subdued but clearly visible neutral ambient response so individual facets remain readable instead of collapsing to absolute black.
- **Background**: Use an unlit, near-black void behind the component. Do not add a white halo, coloured vignette, external red bloom, or a mechanical ring; all visible illumination must belong to the sphere's own inner energy and fixed upper-right material response.
- **Motion**: Rotate both meshes through one parent group at exactly the same speed and axis. The inner texture remains anchored to object coordinates and may evolve slowly without sliding relative to the shell. Keep the camera fixed so the lighting angle does not drift.
- **Reduced motion / fallback**: Stop all motion for `prefers-reduced-motion`; retain the isolated black-red faceted sphere as a static CSS composition when WebGL is unavailable.

### Footer
- [Footer density, layout, link style, legal text, background.]

## Do's and Don'ts

### Do
- [Do 1]
- [Do 2]
- [Do 3]
- [Do 4]
- [Do 5]

### Don't
- [Don't 1]
- [Don't 2]
- [Don't 3]
- [Don't 4]
- [Don't 5]

## Responsive Behavior

### Breakpoints
- **Mobile**: [range and layout behavior]
- **Tablet**: [range and layout behavior]
- **Desktop**: [range and layout behavior]
- **Wide**: [range and layout behavior]

### Touch Targets
- [Minimum target sizes, spacing, and gesture rules.]

### Collapsing Strategy
- [How grids, navigation, cards, media, and content groups collapse.]

### Image Behavior
- [Cropping, aspect ratios, source switching, object positioning, lazy loading expectations.]

## Iteration Guide

- [How to refine generated UI toward this design language.]
- [What to check first when a result feels off.]
- [Which details matter most for fidelity.]
- [Which liberties are acceptable.]

## Known Gaps

- [Unverified pages, missing states, unknown font files, animation gaps, accessibility concerns, or assumptions.]
