# Part C: Fpo Component + Storybook Stories

## Context

Parts A and B defined types and fixture data in `libs/domain`. This part builds the first
UI components and Storybook stories in `libs/ui` to explore layout and spatial structure
for a "Running Scene Workspace".

This is "carving in stone" — general structure with `Fpo` placeholders, NOT final screens.
The goal is to explore spatial relationships, proportions, and zone placement.

## Prerequisites

- Parts A and B completed (types and fixtures exist in `libs/domain`)
- Storybook is configured in `libs/ui/.storybook/` with stories glob `../src/**/*.stories.tsx`

## Generator Usage

Use full generator names to avoid confusion with built-in ones:

```
nx g @lair/tools:component <path>
nx g @lair/tools:component <path> -s   # with story file
```

The generator:

- Takes a `.tsx` file path
- Derives component name from filename (kebab-case → PascalCase)
- Generates props type unless `--skipProps`
- `-s` flag generates a companion `.stories.tsx`

## What To Do

### 1. Fpo Component — `libs/ui/src/fpo.tsx`

Generate: `nx g @lair/tools:component libs/ui/src/fpo.tsx`

No story file needed for Fpo.

**Implementation:**

```tsx
export type FpoProps = {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export default function Fpo({
  children = 'For placement only',
  className = '',
  style,
}: FpoProps) {
  return (
    <div
      className={`flex items-center justify-center bg-gray-100 text-gray-400 text-sm border border-dashed border-gray-300 rounded ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
```

- `className` for Tailwind sizing (e.g. `h-64`, `flex-1`, `col-span-2`)
- `style` as escape hatch for specific dimensions
- Light gray bg + dashed border = clearly a placeholder

### 2. Scene Page Layout — `libs/ui/src/scene-page-layout.tsx`

Generate: `nx g @lair/tools:component libs/ui/src/scene-page-layout.tsx -s`

**What it explores:** overall page structure for viewing one scene.

**Structure:**

- Two-column layout: main content (left) + sidebar rail (right)
- Main column: stacked `Fpo` zones, each labeled with section name:
  - Scene title + meta bar (location breadcrumb)
  - Flavor text block
  - Room description block
  - Skill checks section (label shows count)
  - Encounter summary section
  - Traps section
  - Treasures section
- Sidebar rail: stacked `Fpo` zones:
  - Linked scenes
  - Encounter quick ref
  - Map placeholder

Each `Fpo` should be proportioned to roughly represent expected content volume.

Takes a `Scene` from the fixture data to derive labels and section counts.

**Story variants:**

- `Default` — Entrance scene (all sections populated)
- `NoEncounter` — Brazier Hall (no creatures, larger traps area)

### 3. Scene Preview Card — `libs/ui/src/scene-preview-card.tsx`

Generate: `nx g @lair/tools:component libs/ui/src/scene-preview-card.tsx -s`

**What it explores:** compact card for linked scenes (sidebar rail or hover preview).

**Structure:**

- Small fixed-width card
- Title
- 1-line location breadcrumb
- Summary counts: "4 creatures, 1 trap" or "No creatures, 3 traps"
- `Fpo` for thumbnail/icon area
- `Fpo` for connection-type indicator

Takes `SceneMeta` + summary counts, not the full `Scene`.

**Story variants:**

- `WithEncounter` — Entrance scene card
- `NoEncounter` — Morgue scene card
- `Minimal` — title + location only

### 4. Side Panel — `libs/ui/src/side-panel.tsx`

Generate: `nx g @lair/tools:component libs/ui/src/side-panel.tsx -s`

**What it explores:** pinned panel for creature/trap/scene detail alongside main content.

**Structure:**

- Wrapper simulates the page (main content = large `Fpo`)
- Right-anchored panel: header (title + close button), scrollable body
- Body: `Fpo` placeholder labeled with content type

Explores: overlay vs push, panel width ratio, header area, scroll behavior.

**Story variants:**

- `CreatureStatblock` — panel titled "Химера Тяньгу", body `Fpo` "Creature Statblock"
- `TrapStatblock` — panel titled trap name, body `Fpo` "Trap Statblock"
- `Closed` — panel hidden, just main content

### 5. Encounter Summary — `libs/ui/src/encounter-summary.tsx`

Generate: `nx g @lair/tools:component libs/ui/src/encounter-summary.tsx -s`

**What it explores:** encounter block within a scene page.

**Structure:**

- Header: threat level badge + "Encounter" label
- Dramatic question (callout style)
- Conflict sources (bullet list)
- Creature list: mini-rows with name (as link text), count, `Fpo` for hover preview area
- `Fpo` for tactical notes / encounter map area

Takes an `Encounter` from fixture data.

**Story variants:**

- `Default` — Entrance encounter (4 creatures, full details)
- `Compact` — same data, compressed for sidebar rail

### 6. Update `libs/ui/package.json` exports

Add explicit exports for each component:

```json
{
  "exports": {
    "./fpo": "./src/fpo.tsx",
    "./scene-page-layout": "./src/scene-page-layout.tsx",
    "./scene-preview-card": "./src/scene-preview-card.tsx",
    "./side-panel": "./src/side-panel.tsx",
    "./encounter-summary": "./src/encounter-summary.tsx"
  }
}
```

### 7. Verify

- `nx test ui` — vitest storybook tests pass (smoke-tests that each story renders without errors)
- `nx typecheck ui` — types compile

## Files To Create/Modify

- `libs/ui/src/fpo.tsx` — create
- `libs/ui/src/scene-page-layout.tsx` — create
- `libs/ui/src/scene-page-layout.stories.tsx` — create
- `libs/ui/src/scene-preview-card.tsx` — create
- `libs/ui/src/scene-preview-card.stories.tsx` — create
- `libs/ui/src/side-panel.tsx` — create
- `libs/ui/src/side-panel.stories.tsx` — create
- `libs/ui/src/encounter-summary.tsx` — create
- `libs/ui/src/encounter-summary.stories.tsx` — create
- `libs/ui/package.json` — update `exports`

## Files To Delete

- `libs/ui/src/vite-env.d.ts` — only if it's a skeleton placeholder with no real content
