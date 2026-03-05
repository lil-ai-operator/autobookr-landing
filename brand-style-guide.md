# AutoBookr Brand Style Guide

## Overview

AutoBookr is a UK-focused missed-call text-back service for trade businesses. The brand is bold, modern, and trustworthy — built for tradespeople who want simple, effective tools.

---

## Logo

### Primary Logo
- **AutoBookr** wordmark with green accent on "Book"
- Use on light backgrounds: `#0D0D0D` text + `#00FF88` accent
- Use on dark backgrounds: `#FFFFFF` text + `#00FF88` accent

### Favicon
- Green "A" in circle or square
- Minimum size: 16x16px

### Usage Rules
- Don't stretch or distort
- Don't change colors outside palette
- Minimum clear space: height of the "A" on all sides
- Don't put on busy backgrounds without container

---

## Color Palette

### Primary Colors

| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| **Neon Green** | `#00FF88` | 0, 255, 136 | CTAs, accents, success states |
| **Deep Black** | `#0D00D0` | 13, 13, 208 | Primary backgrounds |
| **Pure White** | `#FFFFFF` | 255, 255, 255 | Text on dark |

### Secondary Colors

| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| **Purple** | `#8B5CF6` | 139, 92, 246 | Cards, highlights |
| **Orange** | `#F59E0B` | 245, 158, 11 | Revenue, warnings |
| **Slate** | `#1E293B` | 30, 41, 59 | Secondary backgrounds |
| **Muted Gray** | `#64748B` | 100, 116, 139 | Secondary text |

### Dark Theme Gradient
```
Background: linear-gradient(135deg, #0D0D0D 0%, #1A1A2E 100%)
Card BG: #1E293B with subtle border #334155
```

---

## Typography

### Primary Font
- **Inter** (Google Fonts)
- Weights: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Font Sizes

| Element | Size | Weight |
|---------|------|--------|
| H1 | 48px / 3rem | 700 |
| H2 | 36px / 2.25rem | 600 |
| H3 | 24px / 1.5rem | 600 |
| Body | 16px / 1rem | 400 |
| Small | 14px / 0.875rem | 400 |
| Caption | 12px / 0.75rem | 400 |

### Line Heights
- Headings: 1.2
- Body: 1.5

---

## Logo Usage Examples

### Light Background
```
[AutoBookr]  ← black text, green "Book"
```

### Dark Background
```
[AutoBookr]  ← white text, green "Book"
```

### On Coloured Cards
- Use white logo on purple/orange/green cards
- Ensure contrast ratio 4.5:1 minimum

---

## UI Components

### Buttons

**Primary (Green)**
- Background: `#00FF88`
- Text: `#0D0D0D`
- Hover: brightness(1.1)
- Border radius: 8px
- Padding: 12px 24px

**Secondary (Outline)**
- Background: transparent
- Border: 2px solid `#00FF88`
- Text: `#00FF88`
- Hover: fill with `#00FF88`, text black

### Cards
- Background: `#1E293B`
- Border: 1px solid `#334155`
- Border radius: 12px
- Padding: 24px
- Shadow: 0 4px 6px rgba(0, 0, 0, 0.3)

### Status Badges
- Success: `#00FF88` bg, dark text
- Warning: `#F59E0B` bg, dark text
- Error: `#EF4444` bg, white text

---

## Imagery & Icons

### Icon Style
- Rounded corners (4px radius)
- Stroke width: 2px
- Color: white or green on dark
- Use Lucide or Heroicons

### Photography
- Show real UK tradespeople
- Bright, natural lighting
- Show phones/tablets with AutoBookr
- Avoid stock-looking poses

---

## Voice & Tone

### Brand Voice
- Direct and helpful
- No jargon (explain technical terms)
- Friendly but professional
- "Fren" tone on social, professional in email

### Key Messages
- "Never miss a booking again"
- "UK phone numbers. UK compliant."
- "Recover lost leads while you're on the tools"

---

## Spacing System

Base unit: 4px

| Name | Value |
|------|-------|
| xs | 4px |
| sm | 8px |
| md | 16px |
| lg | 24px |
| xl | 32px |
| 2xl | 48px |
| 3xl | 64px |

---

## Browser/Platform Notes

- Use CSS variables for all colors
- Support dark mode by default
- Mobile-first design
- Test contrast on `#0D0D0D` background

---

*Last updated: March 2026*
*Version: 1.0*
