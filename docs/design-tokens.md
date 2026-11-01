# Design Tokens

This document describes the design tokens used in the portfolio.

## Color Tokens

Colors are defined as HSL CSS variables in `app/globals.css`:

- `--background`: Page background (240 10% 3.9% - dark zinc)
- `--foreground`: Text color (0 0% 98% - near white)
- `--primary`: Primary accent color (242 80% 60% - indigo)
- `--secondary`: Secondary background (240 3.7% 15.9% - muted zinc)
- `--muted`: Muted elements (240 3.7% 15.9%)
- `--accent`: Accent highlights (240 3.7% 15.9%)
- `--destructive`: Error/danger actions (0 62.8% 30.6% - red)
- `--border`: Border color (240 3.7% 15.9%)
- `--ring`: Focus ring color (242 80% 60% - indigo)

## Spacing

Spacing follows Tailwind's default scale. Common spacings:

- `p-6`: 1.5rem (24px)
- `py-20`: 5rem (80px) for section padding
- `gap-4`: 1rem (16px)

## Typography

- Font family: Inter (Google Fonts)
- Font sizes defined in Heading component levels
- Line heights: Tailwind defaults

## Border Radius

- `--radius`: 0.5rem (8px)
- Derived values:
  - `rounded-lg`: var(--radius)
  - `rounded-md`: calc(var(--radius) - 2px)
  - `rounded-sm`: calc(var(--radius) - 4px)

## Components

### Button

Variants: default, secondary, destructive, outline, ghost
Sizes: default, sm, lg, icon

### Card

- Card: Container with border and background
- CardHeader: Header section
- CardTitle: Title text
- CardDescription: Description text
- CardContent: Main content area
- CardFooter: Footer actions

### Container

Responsive max-width containers: sm, md, lg, xl, full

### Section

Semantic section wrapper with default padding

### Heading

Semantic heading with level (1-6) and size mapping
