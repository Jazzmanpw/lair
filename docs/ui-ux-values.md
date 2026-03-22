# UI/UX Values

Living document. Guides design decisions across the app.

## Visual Identity

### Palette: The Lair

The app is a lair — a house in a cave in a forest. The palette draws from that environment:

- **Deep rock gray** — foundation, surfaces, structural elements
- **Wooden brown** — warmth, accents, interactive elements, borders
- **Dark needles/leaves green** — secondary surfaces, depth, grouping
- **Light grass green** — highlights, active states, life, emphasis

### Dark Mode First

Dark mode is the only theme (for now). Key constraint: **readability over atmosphere**.
Contrast must be comfortable for extended sessions — not washed-out like Zed "One Dark",
closer to "Ayu Dark" clarity. The main background may need to be darker than the deep rock
gray to keep text crisp. Surfaces layer up from the darkest base.

### Typography

TBD — needs exploration on dark backgrounds. Serif vs. sans, Cyrillic support required.
Must be highly readable at small sizes since the layout is information-dense.

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

- **Header zone**: scene name, collapsible flavor text and factual room description.
  Right side of the header holds the **tab strip** for sub-blocks (encounter info,
  treasures, skill checks, traps). Vertical list of tab buttons — scrollable if dense.
  Exploits the empty horizontal space that the header text doesn't fill.
- **Content area**: displays the active tab's content. Only one sub-block at a time.
  Full width, full remaining height.
- **Sidebar rail**: linked scenes (as preview cards), map placeholder

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

**Encounter runner** (active mode):
Replaces the content area when the GM activates the encounter. Contains:

- Encounter metadata — threat level, dramatic question (always visible,
  but NOT the creature list — creatures get their own space as tabs below)
- Initiative order as creature tabs (not a traditional list) with expanded detail
- Condition tracker per creature/PC
- Passive event reminders for the GM
- Potentially: tactical notes, map reference

Transition: "Run!" button in the encounter tab → runner takes over content area.

## Anti-patterns

- **No page-level scroll** for primary views
- **No Obsidian-clone** — this is not a formatted text note viewer
- **No wasted space** — if a zone exists, it should contain useful information or controls
- **No light-mode-first-then-darkened** — design dark from the start
