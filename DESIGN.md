---
name: GEOGIS SK
description: Marketing and contact site for a Slovak geodetic and cartographic services firm
colors:
  primary: "#f2994a"
  primary-deep: "#d97f2f"
  primary-ember: "#9c5016"
  primary-tint: "#fdeee0"
  neutral-bg: "#ffffff"
  neutral-bg-warm: "#eceae7"
  neutral-bg-soft: "#f6f5f3"
  neutral-ink: "#20242a"
  neutral-ink-muted: "#5c6269"
  neutral-ink-soft: "#868c92"
  neutral-border: "#e6e4e1"
  dark-surface: "#1c2430"
  dark-text: "#aeb6c2"
  dark-text-soft: "#949ca9"
typography:
  display:
    fontFamily: "Poppins, Segoe UI, Arial, sans-serif"
    fontSize: "clamp(2.1rem, 4vw, 3rem)"
    fontWeight: 800
    lineHeight: 1.18
    letterSpacing: "0.01em"
  headline:
    fontFamily: "Poppins, Segoe UI, Arial, sans-serif"
    fontSize: "clamp(1.6rem, 3vw, 2.5rem)"
    fontWeight: 800
    lineHeight: 1.18
  title:
    fontFamily: "Poppins, Segoe UI, Arial, sans-serif"
    fontSize: "1.2rem"
    fontWeight: 700
    lineHeight: 1.18
  body:
    fontFamily: "Inter, Segoe UI, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Poppins, Segoe UI, Arial, sans-serif"
    fontSize: "0.85rem"
    fontWeight: 600
    letterSpacing: "0em"
rounded:
  xs: "8px"
  sm: "10px"
  md: "14px"
  lg: "20px"
  full: "999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "32px"
  xl: "48px"
  2xl: "72px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.dark-surface}"
    rounded: "{rounded.full}"
    padding: "15px 34px"
  button-primary-hover:
    backgroundColor: "{colors.primary-deep}"
  button-dark:
    backgroundColor: "{colors.dark-surface}"
    textColor: "#ffffff"
    rounded: "{rounded.full}"
    padding: "15px 34px"
  card:
    backgroundColor: "{colors.neutral-bg}"
    rounded: "{rounded.lg}"
    padding: "0"
  badge-pill:
    backgroundColor: "#ffffff"
    textColor: "{colors.neutral-ink}"
    rounded: "{rounded.md}"
    padding: "6px 14px 6px 6px"
---

# Design System: GEOGIS SK

## Overview

**Creative North Star: "The Trusted Local Surveyor"**

GEOGIS SK reads as a known, established local firm — the kind of business whose office you'd walk into with property documents under your arm and leave reassured. The system is warm, calm, and unflashy: soft off-white and putty-toned neutrals carry almost everything, dark near-navy grounds the footer, and a single surveyor's-marking orange is spent carefully — on calls to action, hover states, and small circular icon badges — so that when it appears, it reads as a deliberate signal rather than decoration. Nothing about the system wants to look like a startup or a government portal; it wants to look like thirty years in business.

Shapes lean soft and friendly: buttons and pill badges are fully rounded (999px), icon containers are perfect circles, cards and panels use a generous 20px radius. The one formal shadow in the system is a diffuse, low-contrast "ambient lift" used sparingly on cards and the contact form — there is no heavy drop-shadow anywhere. Motion is restrained and purposeful: a single staggered reveal as sections enter view, a slow one-at-a-time build on the four-step process timeline, and small hover lifts on interactive media — never scattered or decorative.

**Key Characteristics:**
- One warm neutral palette, one confident accent spent sparingly
- Fully rounded pills and circles over sharp corners
- A single soft ambient shadow; otherwise flat
- Slow, intentional motion — not a hover effect on every element
- Poppins for anything structural (headings, labels, buttons); Inter for reading text

## Colors

A warm, low-saturation neutral field with one confident accent — nothing competes with the orange for attention.

### Primary
- **Surveyor's Marking Orange** (`#f2994a`): the one accent color in the system — button fills, the active nav underline, the card heading rule. Named for its real-world referent: the orange of a surveyor's stake flag or hi-vis vest. Used on a small minority of any given screen; its rarity is what makes it read as a signal.
- **Marking Orange, Deep** (`#d97f2f`): the pressed/hover *fill* for the primary accent — buttons darken to this background on interaction.
- **Marking Orange, Ember** (`#9c5016`): a darker, text-safe step of the accent — used wherever orange needs to be *text or an icon stroke* rather than a fill (office-label text, process-step numerals, icon strokes on the tint background, link hovers), since the lighter two steps don't clear WCAG AA contrast as foreground color.
- **Marking Orange, Tint** (`#fdeee0`): the accent diluted almost to a wash — fills circular icon badges and pill backgrounds (office-label, process-step-number) so the icon/number itself can carry Ember on top.

### Neutral
- **Paper White** (`#ffffff`): the base page background, card backgrounds, input focus background.
- **Warm Putty** (`#eceae7`): the wash behind the hero and page-banner photography — warmer and slightly darker than paper white, keeps photo-backed sections from feeling stark.
- **Soft Linen** (`#f6f5f3`): the quietest background step — fills card-media placeholders, the process section, contact-info-item tiles, and form fields at rest.
- **Ink** (`#20242a`): primary text color and heading color.
- **Ink, Muted** (`#5c6269`): secondary/body copy — descriptions, paragraph text, muted labels.
- **Ink, Soft** (`#868c92`): the quietest text step — breadcrumb separators and fine print (the GDPR note).
- **Hairline Border** (`#e6e4e1`): all 1px borders — header bottom edge, card edges, input borders, map embeds.

### Dark Surface (footer)
- **Near-Navy** (`#1c2430`): the footer's background, the `.btn-dark` variant, and — doing double duty — the text color for all three button variants where they sit on the orange accent (primary fill, outline-on-hover, dark-on-hover), since near-navy clears WCAG AA against the accent far more reliably than white does.
- **Dark Text** (`#aeb6c2`): body text and links on the near-navy footer background.
- **Dark Text, Soft** (`#949ca9`): the quietest text step on a dark surface — the footer's copyright line only, dimmer than Dark Text but still WCAG AA-safe against Near-Navy.

### Named Rules
**The One Signal Rule.** The accent orange is reserved for things the visitor can act on or that mark active state — buttons, hover, the active nav underline, process-step numbers. It never fills a large background area or decorates static content.

## Typography

**Display Font:** Poppins (with Segoe UI, Arial, sans-serif fallback)
**Body Font:** Inter (with Segoe UI, Arial, sans-serif fallback)

**Character:** Poppins carries every structural element — headings, labels, buttons, pill badges — in confident, fairly heavy weights (600–800); Inter handles all reading text at a normal weight, keeping body copy calm and legible against Poppins' more assertive display role.

### Hierarchy
- **Display** (800, `clamp(2.1rem, 4vw, 3rem)`, line-height 1.18, uppercase): the homepage hero H1 only — the single most prominent piece of text on the site.
- **Headline** (700–800, `clamp(1.6rem, 3vw, 2.5rem)`, line-height 1.18): subpage H1s (page-banner, e.g. "Kontakt", "Galéria") and section H2s ("Naše služby", "Ako postupujeme").
- **Title** (700, 1.2rem): card headings (service-card H3) and section sub-headings (contact page H2s at 1.5rem use the same weight/role one step up in size).
- **Body** (400, 0.92–1.05rem, line-height 1.55–1.8): all paragraph copy; description text runs slightly smaller (0.92–0.96rem) inside cards and fine-print contexts, slightly larger (1.05rem) in the hero lead paragraph.
- **Label** (600, 0.82–1.02rem, Poppins): hero trust-badges, the office-label eyebrow pill (uppercase, 0.06em tracking), and process-step numbers.

### Named Rules
**The No-Italic Rule.** Emphasis is carried by weight and the accent color, never by italics or all-caps body copy — the only uppercase text in the system is the hero H1 and the office-label eyebrow pill, both load-bearing structural elements, not decoration.

## Layout

Container max-width is 1200px, centered, with 24px inline padding. Section rhythm is generous and uneven by design rather than snapped to a strict grid: hero and process sections run 72–96px of block padding, card/content sections run 56–96px, tighter contexts (contact page, footer badges) run 16–72px. Spacing between related elements (icon to label, form field gaps) sits in the 8–24px range; spacing between unrelated blocks (card gaps, section padding) runs 28–96px.

Grids collapse in three steps: desktop runs 3–4 columns (service cards, gallery, process steps), the 980px breakpoint drops to 2 columns (and hides hero photography entirely), and the 760px breakpoint collapses everything to a single column, switches the header to a slide-in mobile nav, and centers the hero text. A final 480px step only touches icon sizing (84px circles, down from 100px) and full-width buttons — no further structural change.

## Elevation & Depth

The system is flat by default. One soft, low-contrast ambient shadow (`0 10px 30px rgba(28, 36, 48, 0.08)`) lifts cards and the contact form off the page; nothing else carries a shadow except two deliberate one-offs — the hero trust-badges (a slightly stronger ambient lift, since they float over photography) and the lightbox image (a heavier dark-toned shadow, appropriate to its overlay context). Depth elsewhere is carried by background-color steps (white → warm putty → soft linen → near-navy), not by shadow.

### Shadow Vocabulary
- **Card Lift** (`box-shadow: 0 10px 30px rgba(28, 36, 48, 0.08)`): service cards, the gallery grid items, the contact form panel — the system's one formal elevation token.
- **Badge Lift** (`box-shadow: 0 14px 30px rgba(28, 36, 48, 0.12)`): the hero/footer trust-badge pills, which sit directly over photography or a dark footer and need slightly more separation.
- **Overlay Lift** (`box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5)`): the lightbox's enlarged image only, against its own dark backdrop.

### Named Rules
**The Flat-by-Default Rule.** Surfaces are flat at rest. A shadow appears only where an element visually floats over something else (photography, a dark footer, an overlay) — never as decoration on an ordinary panel.

## Shapes

Corners are soft and consistently rounded rather than sharp: 20px on cards, panels, and gallery tiles; 14px on hero trust-badges; 10px on form fields, map embeds, and contact-info tiles; 8px on the mobile nav toggle button. Anything meant to read as a pill — buttons, the office-label eyebrow, trust badges — goes fully rounded (999px / `border-radius: 999px`). Icon containers (contact-info icons, trust-badge icons, process-step numbers, lightbox controls) are always perfect circles (50%). There is no sharp-cornered element anywhere in the system; the softest shape available is always chosen.

## Components

### Buttons
- **Shape:** fully rounded pill (999px).
- **Primary:** surveyor's-orange fill (`#f2994a`), near-navy text (`#1c2430`), 15px/34px padding, a soft orange-tinted shadow (`0 10px 22px rgba(242,153,74,.35)`). Text is near-navy rather than white — white-on-orange measured 2.2:1, well short of WCAG AA's 4.5:1.
- **Hover / Focus:** fill darkens to Marking Orange Deep (`#d97f2f`), text stays near-navy, shadow deepens slightly, button lifts 1px; focus-visible adds a dark 2px outline offset 3px.
- **Outline (header CTA context):** transparent fill, white text, 1.5px white-50%-opacity border — for use over photography/dark backdrops; fills solid orange with near-navy text on hover (same contrast fix as Primary).
- **Dark:** near-navy fill, white text; hovers to the primary orange fill with near-navy text (used sparingly, footer-adjacent contexts).

### Badges / Pills
- **Trust badge** (hero + footer): white pill, 14px radius, icon in a small orange-tinted circle (26px) with an Ember-stroked icon, bold Poppins label text, floats with Badge Lift shadow.
- **Office-label eyebrow:** fully rounded pill, orange-tint background, Ember uppercase text, 0.06em letter-spacing — marks a section as a labeled sub-group (e.g. "Sídlo spoločnosti Holíč").

### Cards / Containers
- **Corner Style:** 20px radius, overflow hidden.
- **Background:** white body on a soft-linen media placeholder.
- **Shadow Strategy:** Card Lift (see Elevation & Depth).
- **Border:** 1px hairline border in all cases.
- **Internal Padding:** card body runs 28px/26px/32px (top/sides/bottom); contact-form-wrap runs a flat 36px.
- **Hover behavior:** card media image scales to 1.08 and darkens slightly under a gradient; the card heading's underline rule widens from 36px to 72px. The card itself never lifts or changes shadow — only its internal media and heading react.

### Inputs / Fields
- **Style:** soft-linen fill at rest, 1.5px hairline border, 10px radius.
- **Hover:** border darkens slightly (`#d5d2cc`).
- **Focus:** border turns orange, background turns pure white (no glow/ring).
- **Invalid (post-submit-attempt only):** border turns a dedicated error red (`#d9534f`); validation styling never appears before a first submit attempt.

### Navigation
- **Style:** sticky header, translucent white with backdrop blur; nav links use a thin orange underline that scales in from the center on hover, focus, or active-page state.
- **Mobile (≤760px):** nav links collapse behind a hamburger toggle; the menu panel slides/fades in as a fixed full-height overlay below the header; the hamburger icon itself morphs into an X via rotating/collapsing bars.

### Process Timeline (signature component)
A horizontal 4-step numbered sequence (desktop) connected by a thin hairline rail that threads behind each step's number circle; the circles themselves (orange-tint fill, Ember numeral) sit opaquely on top, so the rail only shows in the gaps between steps. Step 1 is always visible immediately; steps 2–4 reveal one at a time on a slow, deliberate stagger (0.4s / 0.8s / 1.2s) as the section scrolls into view — the one place in the system where motion is sequenced rather than simultaneous. Collapses to 2 columns (rail hidden) at 980px, 1 column at 760px.

### Lightbox (signature component)
A full-viewport dark overlay (`rgba(10,12,16,.92)`) centering one enlarged image with a heavier Overlay Lift shadow. Circular glass-style controls (translucent white-on-dark, brightening on hover) sit fixed at the corners/edges: a close button top-right, prev/next arrows at the vertical center. Opens on clicking any gallery thumbnail, closes via the close button, clicking the backdrop, or Escape; body scroll locks while open.

## Do's and Don'ts

### Do:
- **Do** keep the orange accent to interactive/active elements only (The One Signal Rule).
- **Do** use fully rounded pills (999px) for anything button- or badge-shaped, and perfect circles for icon containers.
- **Do** keep new shadows to the existing three-value vocabulary (Card Lift, Badge Lift, Overlay Lift) rather than inventing a new shadow per component.
- **Do** use Poppins for anything structural (headings, labels, buttons, numbers) and Inter for reading text — never mix the two roles.
- **Do** stage new scroll-triggered reveals through the existing `.reveal` / `.reveal-dN` system rather than one-off animations.

### Don't:
- **Don't** introduce a second accent color — the system is built around spending exactly one confident color sparingly.
- **Don't** add drop shadows to ordinary flat panels; reserve shadow for elements that genuinely float over something else.
- **Don't** use italics or all-caps body copy for emphasis — weight and the accent color carry emphasis instead.
- **Don't** add decorative, non-functional motion (hover effects on every card, scattered looping animations) — motion here is restrained and purposeful, not ambient.
