# UI/UX Values

This document defines durable, project-wide UI/UX values for Lair. Read [TTRPG App Philosophy](./planning/ttrpg-app-philosophy.md) for the product model that guides them.

## Visual Identity

### Palette: The Lair

The app is a lair — a house in a cave in a forest. Its palette draws from that environment:

- **Deep rock gray** — foundations, surfaces, and structural elements
- **Wooden brown** — warmth, accents, and selected interactive elements
- **Dark needles/leaves green** — secondary surfaces, depth, and grouping
- **Light grass green** — active states, positive emphasis, and life

The semantic palette direction is stable. The concrete colors below are a working palette to evaluate in representative interfaces, not settled design tokens.

#### Background Tones

Backgrounds use green-shifted mossy stone:

- `#12170f` — void and main background
- `#151c12` — recessed surfaces
- `#172015` — elevated surfaces
- `#1d231a` — cards and lighter surfaces
- `#262e23` — active or further-elevated elements
- `#2c3428` — borders
- `#384236` — strong borders

#### Accent Colors

- Wood: `#8b6c3e` (muted), `#b8944a` (bright) — warm accents and selected interactive emphasis
- Moss green: `#1e2e20` background, `#2d3d2e` border — contextual grouping and depth
- Leaf green: `#5ca64c` (highlight), `#7dd868` (active) — active and positive states

#### Text Colors

- **Primary text:** `#d4cbb8` (Warmer, default) or `#dcd8cc` (Brighter)
- **Secondary text:** `#abacb5` (Lighter cool dim, default), `#7a7e88` (Cool dim), or `#9a9080` (Warm dim)
- **Bright/emphasis text:** `#e8e4d8` (fixed, headings and active labels)

Primary and secondary text variants remain available through Storybook globals for contextual evaluation. Secondary text is for information that can safely recede: supporting metadata, explanation, and low-priority context. Do not use it for labels, status, interactive targets, or content the GM must find quickly. Its readability depends on size, weight, surrounding contrast, and frequency, so judge it in the real component rather than as an isolated swatch.

### Dark Mode First

Dark mode is the only theme for now. Readability wins over atmosphere. Contrast must remain comfortable and clear through an extended session, and important state must not depend on subtle color differences alone. Design surfaces in dark mode from the start rather than darkening a light-mode composition afterward.

### Typography

**Rubik is the Lair typeface.** Its geometric sans-serif shapes, strong strokes, Cyrillic support, and small-size readability suit dense dark interfaces.

Serif does not work for Lair's dense interface. Do not reintroduce it as an atmospheric display face unless a future focused study overturns that conclusion.

Create hierarchy with a restrained combination of weight, size, color, and spacing. Avoid adding another typeface to manufacture distinction that the information structure should provide.

## Information Design

### Priority, Permanence, and Geometry

Prominence is contextual. Important information does not automatically deserve permanent space, and permanent information still needs dimensions suited to its actual content. Treat importance, duration of relevance, and required width or height as separate design axes.

### Dense, Not Cramped

Be very, but not extremely, greedy about space. Prefer a useful set of related information on one screen or behind one simple interaction. Density should come from concise content, clear grouping, and consistent spacing—not tiny targets, weak contrast, or the removal of every quiet area.

Whitespace must have a job, such as separating groups, stabilizing scan paths, or protecting readable line lengths. Empty space is not automatically waste, and filled space is not automatically useful.

### Reveal Detail Without Losing Orientation

Do not display everything simultaneously. Keep the smallest useful set immediate, reveal related detail together when the GM asks for it, and keep deeper reference material reachable without competing with the current task.

Tabs, toggles, collapsible sections, popups, drawers, side panels, lenses, and navigation are tools rather than prescribed patterns. Choose among them based on information shape, frequency, and whether the GM needs to compare the revealed material with the existing surface. Preserve spatial context where practical; a focused lookup should not casually become an unrelated full-layout switch.

Prototype with representative content and difficult states. Layout proportions and truncation rules should be justified by real text lengths, item counts, density states, and interaction needs rather than attractive empty fixtures.

## Workspace Layout

Primary desktop workspaces, especially Running Mode, behave more like an IDE than a document:

- The viewport is the frame; primary workspaces do not use page-level scrolling.
- Stable regions own their overflow and scroll independently when needed.
- Content that does not fit moves behind an appropriate navigation or disclosure mechanism instead of extending the whole workspace vertically.
- Repeatedly used information should have stable placement so the GM can build spatial memory.

This is a workspace default, not a ban on document scrolling in a surface whose actual task is long-form reading or authoring.

## Interaction

### Minimum Interaction, Useful Results

Prefer interactions that reveal a useful related set at once. Do not make the GM repeat the same action for every item when the intent is to inspect or compare the set. At the same time, keep revealed surfaces scoped to the request instead of expanding one action into an indiscriminate information dump.

Frequently repeated interactions should be quick, predictable, and reversible. Preserve selection, scroll position, and surrounding context when those states help the GM resume the main task.

### Keyboard Access

Keyboard access is core UX for frequently toggled panels, overlays, and other repeated Running Mode actions. Shortcuts should be memorable and expose stable states. Do not rely on press-and-hold shortcuts for sustained reading; prefer deliberate toggle or open/close actions.

Important functionality must still have a visible, discoverable interaction path. Hover and keyboard behavior can accelerate an interaction but should not be its only comprehensible form.

### Editing Friction Matches the Data

All user-owned information should be editable, but not every edit should be equally easy to trigger. Ephemeral runtime state should change with minimal friction. Structural or rarely changed data should have a small guard against accidental edits without forcing the GM through a disruptive modal workflow.

## Guardrails

- Do not turn the primary app experience into an Obsidian clone or a formatted-note viewer. Lair uses note-taking as a foundation but actively structures and surfaces context.
- Do not reserve permanent space merely because information matters at some point.
- Do not hide information the GM must quickly find behind dim styling, hover alone, or an unrelated navigation change.
- Do not maximize density at the cost of scanning, readable text, clear grouping, or usable targets.
