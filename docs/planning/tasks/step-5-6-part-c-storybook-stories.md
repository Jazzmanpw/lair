# Part C: Fpo Component + Storybook Stories

## Context

Parts A and B defined types and fixture data in `libs/domain`. This part builds
UI components and Storybook stories in `libs/ui` to explore layout and spatial structure
for a "Running Scene Workspace".

This is "carving in stone" — general structure with `Fpo` placeholders, NOT final screens.
The goal is to explore spatial relationships, proportions, and zone placement.

**Read `docs/ui-ux-values.md` before implementing.** It is the source of truth for
palette, layout philosophy, and component intentions. Use the `frontend-design` skill
for implementing all UI components.

## Prerequisites

- Parts A and B completed (types and fixtures exist in `libs/domain`)
- Storybook is configured in `libs/ui/.storybook/` with stories glob `../src/**/*.stories.tsx`
- Tailwind CSS is available in Storybook via `@tailwindcss/vite` plugin

## Iteration Workflow

Each iteration generates components from scratch into a numbered subdir:

```
libs/ui/src/<N>/          ← all components and stories for iteration N
```

Story titles must be prefixed with the iteration number: `<N>/Component Name`.

Do NOT update `libs/ui/package.json` exports — those are added later when components
are stable enough for app integration.

## Generate All Components

Run all generators chained so they execute in a single command:

```
npx nx g @lair/tools:component libs/ui/src/<N>/fpo.tsx && \
npx nx g @lair/tools:component libs/ui/src/<N>/scene-page-layout.tsx -s && \
npx nx g @lair/tools:component libs/ui/src/<N>/scene-preview-card.tsx -s && \
npx nx g @lair/tools:component libs/ui/src/<N>/side-panel.tsx -s && \
npx nx g @lair/tools:component libs/ui/src/<N>/encounter-tab.tsx -s && \
npx nx g @lair/tools:component libs/ui/src/<N>/encounter-runner.tsx -s
```

The generator takes a `.tsx` file path, derives a PascalCase component name from the
filename, generates a props type, and `-s` adds a companion `.stories.tsx`.

## Components

### 1. Fpo (no story)

Placeholder component. Props: `children` (ReactNode, default "For placement only"),
`className` (string), `style` (CSSProperties).

Renders a clearly-placeholder div — dashed border, muted styling that fits the dark
palette. Must be visually distinct from real content.

### 2. Scene Page Layout

**What it explores:** overall workspace structure for viewing one scene.

Takes a `Scene` from fixture data. See `docs/ui-ux-values.md` → Scene Page Layout
for the header/tabs/content/sidebar structure.

**Story variants:**

- `Default` — Entrance scene (has encounter, skill checks, traps, treasures)
- `NoEncounter` — Brazier Hall (no creatures, more traps)

### 3. Scene Preview Card

**What it explores:** compact card for linked scene navigation in the sidebar rail.

Takes `SceneMeta` + optional summary counts (creature count, trap count).
See `docs/ui-ux-values.md` → Scene Preview Card.

**Story variants:**

- `WithEncounter` — Entrance scene card (creatures + traps)
- `NoEncounter` — Morgue scene card (traps only, no creatures)
- `Minimal` — title + location only (no counts)

### 4. Side Panel

**What it explores:** pinned panel for creature/trap/scene detail alongside main content.

Wrapper simulates the page (main content = large Fpo). Right-anchored push panel
with header (title + close button) and scrollable body. 100vh, no body scroll.
See `docs/ui-ux-values.md` → Side Panel.

**Story variants:**

- `CreatureStatblock` — panel titled "Химера Тяньгу", body Fpo "Creature Statblock"
- `TrapStatblock` — panel titled trap name, body Fpo "Trap Statblock"
- `Closed` — panel hidden, just main content

### 5. Encounter Tab

**What it explores:** encounter info block as it appears in the scene page content
area (one of the switchable tabs). Static preview before running.

Takes an `Encounter` from fixture data.
See `docs/ui-ux-values.md` → Encounter (two modes) → Encounter tab.

- Threat level badge, dramatic question, conflict sources, creature list with counts
- "Run!" action area — entry point to encounter runner mode
- Fpo for tactical notes / encounter map

**Story variants:**

- `Default` — Entrance encounter (4 creature types, full details)

### 6. Encounter Runner

**What it explores:** active encounter management widget. Replaces the content
area when the GM activates an encounter.

Takes an `Encounter` from fixture data. Use fixture creature names as tab labels.
See `docs/ui-ux-values.md` → Encounter (two modes) → Encounter runner.

- Compact metadata bar (threat level + dramatic question, no creature list)
- Creature/PC tabs in initiative order, active tab shows detail as Fpo zones
- Fpo zones for condition tracker and passive event reminders
- 100vh-aware, fits content area without page scroll

**Story variants:**

- `Default` — Entrance encounter with creature tabs shown

## Verify

- `nx test ui` — vitest storybook tests pass
- `nx typecheck ui` — types compile
