# UI/UX Values

Living document. Guides design decisions across the app.

## Visual Identity

### Palette: The Lair

The app is a lair — a house in a cave in a forest. The palette draws from that environment:

- **Deep rock gray** — foundation, surfaces, structural elements
- **Wooden brown** — warmth, accents, interactive elements, borders
- **Dark needles/leaves green** — secondary surfaces, depth, grouping
- **Light grass green** — highlights, active states, life, emphasis

#### Concrete Background Tones (mossy stone)

Backgrounds use a green-shifted dark tone (mossy stone), not blue-ish:

- `#12170f` — void (darkest, main background)
- `#151c12` — recessed surfaces (sidebar)
- `#172015` — elevated surfaces (header, panel bg)
- `#1d231a` — lighter surface (cards, Fpo, blockquotes)
- `#262e23` — active/elevated elements
- `#2c3428` — borders
- `#384236` — strong borders (Fpo dashed)

#### Accent Colors

- Wood: `#8b6c3e` (muted), `#b8944a` (bright) — interactive elements, accents
- Moss green: `#1e2e20` bg, `#2d3d2e` border — creature/encounter grouping
- Leaf green: `#5ca64c` (highlight), `#7dd868` (active) — Run button, active indicators
- Threat badge: `#2d2218` bg, `#b8944a` text — warm brown standalone

#### Text Colors (configurable via Storybook globals)

- **Primary text**: `#d4cbb8` (Warmer, default) or `#dcd8cc` (Brighter)
- **Secondary/dim text**: `#abacb5` (Lighter cool dim, default), `#7a7e88` (Cool dim), or `#9a9080` (Warm dim)
- **Bright/emphasis text**: `#e8e4d8` (fixed, headings and active labels)

### Dark Mode First

Dark mode is the only theme (for now). Key constraint: **readability over atmosphere**.
Contrast must be comfortable for extended sessions — not washed-out like Zed "One Dark",
closer to "Ayu Dark" clarity. The main background may need to be darker than the deep rock
gray to keep text crisp. Surfaces layer up from the darkest base.

### Typography

Leading candidate: **Rubik** (geometric sans-serif, bold strokes, excellent Cyrillic,
highly readable at small sizes on dark backgrounds).

Alternatives under evaluation: **Century Gothic** (used in PF2e statblock plugin),
**Nunito Sans** (rounded humanist). All three available via Storybook global toolbar
for side-by-side comparison.

Serif fonts (Vollkorn, etc.) deprioritized — sans-serif reads better in dense dark layouts.

## Layout Philosophy

### Space Efficiency

Be very (but not extremely) greedy about space. Fit as much information into a single
screen as possible, or make it easily accessible via simple interactions — tabs, toggles,
collapsible sections, panels. Not by scrolling the whole page.

### IDE-like Structure

The app behaves like an IDE, not a document:

- **No overall window scroll** — the viewport is the frame
- **Fixed height** (100vh) with scrollable panels inside
- **Panels own their scroll** — each content zone scrolls independently when needed
- If more panels are needed than fit, use navigation mechanisms (tabs, drawers, routing)
  rather than extending the page vertically

### Information Density

Dense doesn't mean cramped. Breathing room comes from consistent spacing tokens,
clear visual hierarchy, and grouping — not from generous padding or whitespace.
Every pixel should earn its place.

## Component Intentions

### Scene Page Layout

The primary workspace. Not a scrollable document — a structured cockpit.

- **Header zone**: scene name + location breadcrumb in primary text.
  - **Room description**: always visible, primary text, `<ul>` bullet list.
    This is the quick-reference info the GM needs at a glance — never hidden.
  - **Flavor text**: blockquote style (like Notion `>` citation), expanded by default
    (GM reads it aloud the first time players enter). Collapsible to save space after.
  - Right side of the header holds the **tab strip** for sub-blocks (encounter info,
    treasures, skill checks, traps). Vertical list of tab buttons — scrollable if dense.
    Exploits the empty horizontal space that the header text doesn't fill.
- **Content area**: displays the active tab's content. Only one sub-block at a time.
  Full width, full remaining height.
- **Sidebar rail**: "Linked Scenes" label in **primary text color** (not dim).
  Contains actual ScenePreviewCard components (not Fpo). Map placeholder below.

### Scene Preview Card

Compact card for linked scene navigation. Lives in the sidebar rail.

- Quick glance: title, location breadcrumb, creature/trap summary counts
- Navigation: click to switch active scene
- Future: hover tooltip over scene links in text content

### Side Panel

Push-style right panel for detail views — creature statblock, trap statblock,
scene deep-dive. Overlays or pushes the content area.

### Encounter (two modes)

**Encounter tab** (static, within scene page):
Part of the tabbed content. Shows encounter metadata — threat level, creatures list,
conflict sources, dramatic question. A preview before running.

Layout: **Run! button** is compact, placed inline next to the threat level badge
(same visual weight, green accent). Below that, **two-column layout**: creature list
with counts on the left, tactical notes / battlemap Fpo on the right (1:1 split).

**Encounter runner** (active mode):
Two presentation options:

1. **Inline** (primary): replaces the encounter tab content within the scene page layout.
   The scene header, sidebar, and tab strip remain visible — the GM can still see room
   info and linked scenes. The encounter tab switches from preview → runner when activated.
2. **Fullscreen** (secondary): standalone overlay/popup for focused encounter management.
   Can be minimized to return to the scene view. Kept as a separate story/component.

Runner content:

- Encounter metadata — threat level, dramatic question (always visible,
  but NOT the creature list — creatures get their own space as tabs below)
- Initiative order as creature tabs (not a traditional list) with expanded detail
- **Statblock and actions/abilities side-by-side** (3:1 ratio, statblock gets more space)
- Condition tracker per creature/PC
- Passive event reminders for the GM
- Potentially: tactical notes, map reference

Transitions:

- "Run!" button in the encounter tab → runner takes over content area
- "End" button in the runner → reverts back to encounter preview tab

## Anti-patterns

- **No page-level scroll** for primary views
- **No Obsidian-clone** — this is not a formatted text note viewer
- **No wasted space** — if a zone exists, it should contain useful information or controls
- **No light-mode-first-then-darkened** — design dark from the start
