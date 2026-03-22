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
- Google Fonts (Rubik, Nunito Sans) loaded via `libs/ui/src/styles.css`
- Theme globals (textColor, dimColor, font) configured in `.storybook/preview.tsx`

## Style

- **Use Tailwind utility classes** for layout, spacing, sizing, and colors.
  Use CSS custom properties (`var(--lair-text)`, `var(--lair-text-dim)`,
  `var(--lair-font)`) for theme-controlled values. Avoid inline `style` objects
  for properties that Tailwind or CSS vars can handle.
- Tailwind supports `(--var-name)` shorthand for CSS vars, e.g. `text-(--lair-text)`,
  `bg-(--lair-void)`, `font-(--lair-font)`. Prefer this over `[var(--var-name)]`.
- Background hex values from `docs/ui-ux-values.md` → Concrete Background Tones.
  Reference them consistently — don't hardcode different shades ad hoc.

## Iteration Workflow

Each iteration generates components from scratch into a numbered subdir:

```
libs/ui/src/<N>/          ← all components and stories for iteration N
```

Story titles must be prefixed with the iteration label: `Iteration <N>/Component Name`.

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

Header structure:

- Scene name + location breadcrumb (primary text)
- Room description: always visible `<ul>`, primary text, never collapsed
- Flavor text: blockquote (`>` citation style), expanded by default, collapsible
- Tab strip on the right side of header

Sidebar: "Linked Scenes" label in primary color. Uses real ScenePreviewCard
components (not Fpo placeholders). Map Fpo below cards.

Content area: shows active tab content. When encounter tab is active and the
encounter is running, the encounter runner replaces the encounter tab content
inline (with Run!/End toggle).

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

Layout:

- Threat level badge + compact "Run!" button on the same row (green accent)
- Dramatic question below
- Two-column layout: creature list with counts (left), tactical notes / battlemap Fpo (right), 1:1 split
- Conflict sources below

**Story variants:**

- `Default` — Entrance encounter (4 creature types, full details)

### 6. Encounter Runner

**What it explores:** active encounter management widget.

Takes an `Encounter` from fixture data. Use fixture creature names as tab labels.
See `docs/ui-ux-values.md` → Encounter (two modes) → Encounter runner.

Two presentation modes:

1. **Inline** (primary): fits inside scene page layout content area.
   Height `100%`, not `100vh`. Includes an "End" button to revert to encounter
   preview. The scene layout manages the Run/End toggle state.
2. **Fullscreen** (secondary): standalone story with decorator simulating a
   full-screen overlay. Separate story variant.

Content:

- Compact metadata bar (threat level + dramatic question + "End" button, no creature list)
- Creature/PC tabs in initiative order, active tab shows detail as Fpo zones
- Statblock and actions/abilities **side-by-side** (3:1 ratio, statblock larger)
- Fpo zones for condition tracker and passive event reminders

**Story variants:**

- `Inline` — within a scene layout decorator (content area + sidebar stub)
- `Fullscreen` — standalone fullscreen overlay

## Verify

- `nx format` — prettier clean
- `nx test ui` — vitest storybook tests pass
- `nx typecheck ui` — types compile
