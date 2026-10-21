---
name: Matteo's Portfolio
description: Red-and-white race-bib portfolio of a designer who also builds.
colors:
  signal-red: "#ff0000"
  packed-snow: "#f0f0f0"
  bib-black: "#161616"
typography:
  display:
    fontFamily: "'Open Sans', system-ui, sans-serif"
    fontSize: "13.09vw"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "normal"
    fontVariation: "'wdth' 75"
  headline:
    fontFamily: "'Open Sans', system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 1.148rem + 1.502vw, 2.5rem)"
    fontWeight: 600
    lineHeight: 1.1
    fontVariation: "'wdth' 75"
  body:
    fontFamily: "'Open Sans', system-ui, sans-serif"
    fontSize: "clamp(1rem, 0.912rem + 0.376vw, 1.25rem)"
    fontWeight: 600
    lineHeight: 1.5
  label:
    fontFamily: "'Open Sans', system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 700
    lineHeight: 1.2
rounded:
  none: "0px"
  dot: "50%"
spacing:
  frame-y: "0.5em"
  frame-x: "1em"
  gutter-phone: "10%"
  gutter-tablet: "8%"
  gutter-desktop: "6%"
  stack-overlap: "0.15em"
components:
  title-frame:
    backgroundColor: "{colors.packed-snow}"
    textColor: "{colors.signal-red}"
    typography: "{typography.display}"
    rounded: "{rounded.none}"
    padding: "0.08em 0.3em"
  button-primary:
    backgroundColor: "{colors.signal-red}"
    textColor: "{colors.packed-snow}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.5em 0.8em"
  button-inverse:
    backgroundColor: "{colors.packed-snow}"
    textColor: "{colors.signal-red}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.5em 0.8em"
  input-underline:
    textColor: "{colors.signal-red}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.35rem 0"
  nav-bar:
    backgroundColor: "{colors.packed-snow}"
    textColor: "{colors.bib-black}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
  nav-link-active:
    backgroundColor: "{colors.signal-red}"
    textColor: "{colors.packed-snow}"
    rounded: "{rounded.none}"
  wall-print:
    backgroundColor: "{colors.packed-snow}"
    rounded: "{rounded.none}"
    padding: "max(6px, 1.3vw)"
  carousel-dot:
    backgroundColor: "{colors.signal-red}"
    rounded: "{rounded.dot}"
    size: "0.7rem"
---

# Design System: Matteo's Portfolio

## Overview

**Creative North Star: "The Race Bib"**

The site dresses like a ski racer on start day: Signal Red and Packed Snow, numbers and names printed huge, labels slapped on at an angle. Every title sits on its own off-white or red frame, cut slightly crooked like a sticker or a bib, and the type is shouted in extra-bold, condensed, italic capitals that lean forward like they're already moving. Photos get the same treatment: tilted prints with thick white borders, or framed with slanted red corner wedges.

It is playful but precise. The crookedness is generated, not sloppy: each frame's corners are seeded per element so no two frames on a page match, yet each one renders the same every time. Slants are measured to the degree, stacked frames close up without gaps, and the hero's diagonal edges are computed so the scrolling band never breaks the fold. The goofiness is on top; the engineering underneath is exact, which is the point of a designer who also develops.

Density is low and loud: one big statement per screen, plenty of red field, and content panels in Packed Snow. The system is flat. Depth comes from overlap, tilt and color contrast, never from shadow.

**Key Characteristics:**
- Two-color world: Signal Red and Packed Snow, with Bib Black reserved for body text and big background statements.
- Every heading, button and nav bar lives on a slanted four-point frame (TitleFrame), never a rounded box.
- Display type: Open Sans at 800 weight, 75% width, italic, uppercase, line-height 1.
- Tilted elements (±3° prints, −3° to −12° hero edges and band) create forward motion.
- A red zigzag pattern (`src/assets/custom/pattern.jpg`) is the page ground; Packed Snow sheets slide over it.
- Each project brings its own `mainColor` / `secondaryColor`, which replace Signal Red only inside that project's card and page.

## Colors

A deliberately narrow, sign-painted palette: one saturated red, one warm-neutral off-white, one near-black.

### Primary
- **Signal Red** (`signal-red`): The identity. Page ground (with the zigzag pattern), the default frame fill, primary buttons, active nav item, carousel dots, scrolling-band words and dashes, and the first line of every two-tone project title. On the Packed Snow sections it becomes the text color.

### Neutral
- **Packed Snow** (`packed-snow`): The second voice, not just a background. Title frames on red, the nav bar, the content sheets that slide over the red (Latest work, footer on non-home pages), and the thick borders of wall prints. Text on red is always Packed Snow.
- **Bib Black** (`bib-black`): Body text color, the second line of two-tone project titles, the phone menu panel, and the giant "Hidden details, made by someone who actually cares." statement behind the project wall.

### Per-project accents
- **Project main / secondary** (`--project-main`, `--project-secondary`, from each project's `Information.json`): Replace Signal Red on that project's card corners, title frames and project page. They are scoped; they never leak into site chrome.

### Named Rules
**The Two-Flag Rule.** Every surface is either red with Packed Snow on top, or Packed Snow with red on top. A third color only appears as Bib Black text or as a project's own scoped accent.

**The Pure Red Rule.** Signal Red is the literal `#ff0000`. Don't tame it toward a brick or crimson; its rawness is the race-bib signal.

## Typography

**Display Font:** Open Sans variable (with system-ui, sans-serif), using its width axis at 75%
**Body Font:** Open Sans variable, normal width

**Character:** One family, pushed to its extremes. Condensed, extra-bold italic caps for anything that announces; semibold normal-width for anything you read. The contrast between the two is the whole hierarchy.

### Hierarchy
- **Display** (800, italic, 75% width, uppercase, `13.09vw`, line-height 1): Page titles ("Matteo's / Portfolio", "About me", "Fun fact"), always on a TitleFrame. Scales 1:1 with the viewport so it keeps proportion with the hero image.
- **Headline** (600, 75% width, uppercase, 24px→40px fluid, line-height 1.1): Section headings (h2/h3) such as "Latest work" (shown at 1.5× there, with a red outline box).
- **Body** (600, 16px→20px fluid, line-height 1.5): Paragraphs. Semibold by default, so text holds its own against the loud red ground. Project write-ups cap at 65ch.
- **Label** (700, uppercase, 0.875rem): Nav links, buttons, form placeholders, footer contact lines, the scrolling roles band.

### Named Rules
**The Leaning Shout Rule.** Display type is always italic, condensed and uppercase, and always sits on a frame. Never set a display title as bare text on the page.

**The Semibold Floor Rule.** Nothing on the site is lighter than 600. Regular weight disappears against Signal Red.

## Layout

Mobile-first with three breakpoints written out in media queries: phone (default, below 744px), tablet (744px and up), desktop (1280px and up), plus a centred column cap above 2160px.

Side gutters are percentage-based and shared by the nav, page sections and footer: 10% on phone, 8% on tablet, 6% on desktop. Type sizes are fluid (`clamp()` from a 375px to a 1440px viewport); display type is pure `vw`.

The page is a stack of full-bleed bands: a red hero with the photo cut by a slanted bottom edge, a tilted Packed Snow scrolling band of roles, a Packed Snow content sheet, and a footer whose top edge is a diagonal wedge. Diagonals are the transitions between sections; there are no horizontal dividers.

The project wall (Portfolio, AppState) layers a sticky, screen-tall statement in Bib Black behind a grid of tilted prints: 1 column on phone, 2 on tablet, 3 on desktop.

## Elevation & Depth

Completely flat. There are no box-shadows anywhere in the system. Depth comes from layering and overlap: Packed Snow sheets over the red pattern, title frames stacked so they overlap by 0.15em, project titles hanging off the edge of their print, prints rotated ±3° over the statement, and corner wedges laid over images.

### Named Rules
**The Sticker Rule.** Things sit on top of each other like stickers on a bib: by overlap, tilt and contrast. If something needs to feel raised, tilt it or frame it; never add a shadow.

## Shapes

Hard edges only. Radius is zero everywhere except the carousel dots (full circle).

The signature shape is the **slanted quadrilateral frame**: a rectangle whose top-left corner stays fixed and whose other three corners are nudged inward by a seeded random amount (`max(px, em)` ranges, so small buttons stay visibly crooked and big titles slant in proportion). It is drawn on `::before` with `clip-path`, so only the fill is cut, never the text. When frames stack as lines, the edges where they meet are kept straight so the stack closes up seamlessly.

The second shape is the **corner wedge** (BorderFrame): two slanted triangles of color over an image, top-left and bottom-right, with the horizontal side always longer than the vertical.

Rotation is the third: prints at −3°/+3°, the scrolling band and hero edges at the hero's slope (−4.39° phone/tablet, −3.4° desktop).

## Components

### Title Frame (signature)
Playful but precise: a label cut by hand, placed by machine.
- **Shape:** Slanted quadrilateral, seeded per instance (see Shapes). Default padding 0.5em × 1em, plus the corner offsets.
- **Color:** Packed Snow frame with Signal Red text on red ground; Signal Red frame with Packed Snow text on light ground. Projects swap in their own main color.
- **Stacking:** Multi-line titles use one frame per line, overlapping by 0.15em.
- **Entrance ("laid on"):** `.title-frame--lay` reveals a page title like a strip of tape being laid: a cut leaning the same way as the italic sweeps left to right over 0.6s (`cubic-bezier(0.16, 1, 0.3, 1)`), staggered with `--lay-delay`. Only for a page's opening title(s), the hero CTA, and the About page's "Fun fact" (which waits with `data-lay-wait` until it scrolls into view); never for every section. Reduced motion swaps it for a 0.3s fade.

### Buttons
- **Shape:** Title Frame, zero radius.
- **Primary:** Signal Red frame, Packed Snow label text (700, uppercase, 0.875rem), padding 0.5em × 0.8em. Used for the CTA, "Send message", carousel arrows and the active nav item.
- **Inverse:** Packed Snow frame with Signal Red text when the surface behind is red (footer on the home page).
- **Hover / Focus / Pressed (`.title-frame--press`):** Like a sticker. Hover or keyboard focus lifts it: leans to −2° and grows to 1.04 (0.25s, `cubic-bezier(0.16, 1, 0.3, 1)`). Pressing slaps it flat: 0°, 0.94, in 80ms. No color swap on the frame; arrows inside nudge toward where they go. Disabled drops to 0.6 opacity (0.3 for carousel arrows) and doesn't move. Used on the CTA, Send message, carousel arrows, hamburger, footer home button, desktop logo and the nav's Portfolio link.

### Cards / Containers
- **Latest-work card:** Cover image inside a BorderFrame with project-colored corner wedges, a stacked Title Frame title over it, and an arrow in the bottom-right wedge. Image zooms on hover (`scale`, 0.4s ease).
- **Wall print:** Image in a thick Packed Snow border (`max(6px, 1.3vw)`), aspect 1.25, rotated ±3°, two-tone title (red / black lines) on Packed Snow frames hanging past the right edge. On hover or keyboard focus it is picked up: scales to 1.03 and straightens to 30% of its tilt (0.3s, `cubic-bezier(0.16, 1, 0.3, 1)`).
- **No shadow, no radius** on either.

### Inputs / Fields
- **Style:** Transparent, Signal Red 2px bottom border only; placeholders act as labels (700, uppercase, 0.875rem) with visually hidden real labels. The message textarea gets a full 2px border.
- **Focus:** 2px outline in the field's text color, 3px offset.
- **Container:** The form itself is a large Title Frame (Packed Snow on red home footer, Signal Red on the other pages, which flips the field color to Packed Snow).

### Navigation
- **Phone:** Logo mark left, square Title Frame hamburger right (three red bars that morph into an X, 0.25s). Opens a full Bib Black panel that sweeps down with the hero's slant (0.4s), its links laid on 50ms apart; body scroll locks and Escape closes. Closing is instant.
- **Tablet:** A single Packed Snow Title Frame bar across the gutters with links spread out; "Portfolio" is a Signal Red frame with Packed Snow text.
- **Desktop:** Logo left, a 432px link bar pinned right.
- **Link states (all sizes):** Text links get a strip of Signal Red tape under the word (leaning like the italic). Hover or focus lays it on from the left; moving away peels it off to the right (0.3s). The current page keeps its strip; Portfolio, already a red frame, turns its frame Bib Black on its own pages instead (Packed Snow with red text in the phone's black menu). Pressing pushes the word down 1px.
- **Footer links:** the same tape in the footer's text color; page links also nudge their → forward.

### Scrolling Roles Band (signature)
A Packed Snow strip tilted to the hero's slope, looping "Developer — Designer — Problem solver — Goofball" in Signal Red label type with red dash separators, 20s linear. It pauses while off screen. On phones it only shows when it fits above the fold.

### Home Hero Entrance (focal motion)
The one authored sequence on the site: "Matteo's" then "Portfolio" are laid on (0 / 120ms), the CTA follows (300ms), and on desktop the two tilted photos are slapped on last (420 / 520ms): they arrive 1.3× larger and 2.5× more tilted, then press down to their resting angle in 0.5s. Everything has settled by about 1s. Clicking the CTA glides the page down to Latest work (0.9s, ease-out quart, cancelled by any wheel, touch or key) and moves focus there; reduced motion jumps instead.

### Carousel Controls
Signal Red Title Frame arrows (← →) around 0.7rem dots: outlined red circles, filled when current (0.2s fill). Dots grow to 1.3 on hover and shrink to 0.85 when pressed.

## Do's and Don'ts

### Do:
- **Do** put every display title and button on a TitleFrame and let it pick its own seeded slant; pass fixed corners only when an edge must line up.
- **Do** keep surfaces to the Two-Flag pairing: Packed Snow on Signal Red, or Signal Red on Packed Snow.
- **Do** use diagonals and tilt (±3° prints, hero-slope edges) to join and energize sections.
- **Do** scope project colors to that project's card and page through `--project-main` / `--project-secondary`.
- **Do** keep text at 600 weight or heavier.
- **Do** honor `prefers-reduced-motion`: the global reset stops the band and transitions, and entrances become short fades instead of disappearing.
- **Do** keep motion to the race-bib vocabulary (laid on, slapped on, picked up) with `cubic-bezier(0.16, 1, 0.3, 1)`; no bounce, no generic fade-and-rise on every section.

### Don't:
- **Don't** add box-shadows, gradients or glows; the system is flat.
- **Don't** round corners. Zero radius everywhere except the carousel dots.
- **Don't** set display titles as bare text, in sentence case, or upright.
- **Don't** introduce extra accent colors into the site chrome.
- **Don't** copy the current Project page styling (8px rounded media, pill links) or the leftover template variables in `Layout.css` (`--accent: #2a5db0`, `--muted`, system-ui body font). They are unthemed scaffolding, not part of the system.
