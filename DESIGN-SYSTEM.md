# Design System — Interactive E-Book

## 1. Color Palette

| Role | HEX | Usage |
|------|-----|-------|
| Primary (Header Orange) | `#F26522` | Main header, active tabs, primary CTAs |
| Secondary (Gold) | `#FFB830` | Header gradient, decorative accents |
| Accent 1 (Purple) | `#7C5CFC` | Badges, tags, vocabulary highlights |
| Accent 2 (Warm Orange) | `#EA580C` | Dividers, icon accents, hover states |
| Background | `#FCF8F2` | Warm cream page background |
| Card / Surface | `#FFFFFF` | Cards, navbar, content sections |
| Text Primary | `#0D1326` | Headings, main body text |
| Text Secondary | `#6E7687` | Descriptions, subtext, inactive tabs |
| Gradient 1 | `#F26522 → #FFB830` | Header banner, hero sections |
| Gradient 2 | `#FA6E28 → #E05315` | Active buttons, tab pills |

---

## 2. Typography

| Element | Font | Size | Weight | Line-height |
|---------|------|------|--------|-------------|
| Heading 1 | Segoe UI / Inter | 2.5rem (40px) | 800 | 1.25 |
| Heading 2 | Segoe UI / Inter | 2rem (32px) | 700 | 1.25 |
| Heading 3 | Segoe UI / Inter | 1.5rem (24px) | 700 | 1.25 |
| Heading 4 | Segoe UI / Inter | 1.25rem (20px) | 600 | 1.3 |
| Body | Segoe UI | 1rem (16px) | 400 | 1.5 |
| Small | Segoe UI | 0.875rem (14px) | 400 | 1.5 |
| Caption | Segoe UI | 0.75rem (12px) | 400 | 1.5 |

---

## 3. Spacing System

Base unit: `0.25rem` (4px)

| Token | Value |
|-------|-------|
| --spacing-1 | 0.25rem (4px) |
| --spacing-2 | 0.5rem (8px) |
| --spacing-3 | 0.75rem (12px) |
| --spacing-4 | 1rem (16px) |
| --spacing-5 | 1.25rem (20px) |
| --spacing-6 | 1.5rem (24px) |
| --spacing-8 | 2rem (32px) |
| --spacing-10 | 2.5rem (40px) |
| --spacing-12 | 3rem (48px) |
| --spacing-16 | 4rem (64px) |
| --spacing-20 | 5rem (80px) |
| --spacing-24 | 6rem (96px) |

---

## 4. Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| --radius-sm | 4px | Small elements |
| --radius-md | 8px | Inputs, small cards |
| --radius-lg | 12px | Cards, containers |
| --radius-xl | 16px | Large cards, modals |
| --radius-2xl | 24px | Hero sections |
| --radius-full | 9999px | Pills, badges, buttons |

---

## 5. Shadows

| Token | Value | Usage |
|-------|-------|-------|
| --shadow-sm | 0 1px 2px rgba(13,19,38,0.08) | Subtle lift |
| --shadow-md | 0 4px 12px rgba(13,19,38,0.08) | Cards |
| --shadow-lg | 0 8px 30px rgba(13,19,38,0.08) | Hover states |
| --shadow-xl | 0 12px 48px rgba(13,19,38,0.16) | Modals, dropdowns |
| --shadow-inner | inset 0 2px 4px rgba(13,19,38,0.08) | Inset effects |

---

## 6. Buttons

### Primary Button
- Background: `var(--gradient-active)`
- Color: `#FFFFFF`
- Padding: `var(--spacing-3) var(--spacing-6)`
- Border-radius: `var(--radius-full)`
- Hover: translateY(-2px) + shadow increase

### Secondary Button
- Background: `var(--color-bg)`
- Border: `2px solid var(--color-border)`
- Color: `var(--color-text-primary)`
- Hover: border becomes primary color

### Accent Button
- Background: `var(--gradient-accent)`
- Color: `#FFFFFF`
- Shadow: purple glow

---

## 7. Cards

- Background: `#FFFFFF`
- Border-radius: `var(--radius-lg)`
- Padding: `var(--spacing-6)`
- Shadow: `var(--shadow-sm)`
- Hover: `var(--shadow-md)` + translateY(-2px)

---

## 8. Animations

| Name | Duration | Easing | Usage |
|------|----------|--------|-------|
| fadeIn | 0.5s | ease | Page load, section reveal |
| slideDown | 0.3s | ease | Mobile nav |
| pulse | 2s | ease-in-out | Badges, notifications |
| bounce | 1.5s | ease-in-out | Interactive elements |

---

## 9. Interactive Elements

### Vocabulary Flash Cards
- Front: white card with orange left border
- Back: gradient header with definition + example
- Flip: 3D rotateX on click

### Tabs
- Background: `var(--color-bg)`
- Active: `var(--gradient-active)`
- Inactive: `var(--color-text-secondary)`
- Rounded: full pill style

### Unit Cards
- Left border: `5px solid var(--color-primary)`
- Badge: purple or gold
- Hover: lift + shadow

---

## 10. Accessibility

- Focus-visible outline: `2px solid var(--color-accent-1)`
- Minimum contrast ratio: 4.5:1
- Semantic HTML5 elements
- ARIA labels on interactive elements
- Keyboard navigable