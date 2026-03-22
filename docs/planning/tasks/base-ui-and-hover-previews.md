# Base UI Integration + Hover Preview Validation

## Goal

Bring in Base UI (`@base-ui/react`) and validate the nested hover preview
interaction model that the app relies on heavily.

Reference: https://base-ui.com/llms.txt

## Why This Comes First

The app's interaction model borrows Obsidian's hover preview pattern: hover a
link → see a popup preview → hover a link _inside_ that preview → see a nested
popup. This needs to feel smooth and stable. If nested hovers feel wrong, it
changes how statblocks, combat cards, and compendium references all work.

Testing this with the current hand-rolled portal popup would give misleading
results — positioning bugs and z-index fights would mask whether the _pattern_
itself works. Base UI's Popover (backed by floating-ui) handles the mechanical
part, letting us evaluate the interaction design cleanly.

## What To Do

### 1. Install Base UI

```
npm install @base-ui/react
```

### 2. Replace the portal popup in encounter tab

Swap the hand-rolled `createPortal` + `getBoundingClientRect` popup in
`CreatureRow` (encounter-tab.tsx) with a Base UI Popover. This removes the
CSS var forwarding hack and the manual flip/clamp logic.

### 3. Add compendium types and fixtures from Foundry VTT PF2e

The Foundry VTT PF2e system has open-source game data on GitHub. Search for the
repo, find schemas and JSON data for skills, spells, and actions. Use actual
content format from there rather than hand-writing entries — this gives us real
data shapes to build against and avoids inventing a schema that diverges from
what's available.

Define domain types in `libs/domain` based on what the Foundry data looks like.
Start with a small slice — just enough to wire hover previews inside the
statblock:

- 2–3 skills (e.g., Acrobatics, Stealth)
- 1–2 spells (e.g., fear, daze)
- 1–2 actions (e.g., Strike, Stride)

### 4. Add wikilink rendering to statblock text

Statblock fixture data uses `[[reference]]` syntax in free-text fields (skills,
spells, abilities). Build a small text renderer that:

- splits on `\[\[...\]\]`
- renders plain text spans and interactive link spans
- link spans get Base UI Popover on hover
- lookup is a `Record<string, CompendiumEntry>` passed via prop or context

### 5. Add "Pin to sidebar" to hover popups

The hover popup for a creature statblock should include a "Pin to sidebar"
button. Clicking it pins the statblock into the side panel so it stays visible
while the GM continues working. For now, only creature statblocks need pinning.

When multiple items are pinned, the sidebar needs a stacking/tabbing interaction.
Options to explore:

- **Tabs** at the top of the sidebar panel (each pinned item gets a tab)
- **Accordion/stack** where pinned items stack vertically with collapsible headers
- **Single + history** where only one is shown but you can cycle through pinned items

Pick the simplest one that feels right. Tabs are the natural first attempt since
the encounter runner already uses creature tabs.

### 6. Test nested hover interaction

Wire it up: hover a creature name in encounter tab → statblock popup (with pin
button) → hover a skill name inside the statblock → skill preview popup.
Evaluate:

- Does nesting feel natural or claustrophobic?
- Does dismissal work intuitively (mouse leaves → both close)?
- Does the inner popup obscure the outer one badly?
- Does pin-to-sidebar feel like a natural "promote" from hover to persistent?
- How does sidebar tabbing feel with 2–3 pinned statblocks?

### 7. Document findings

Note what works and what doesn't. This informs whether the combat card (next
task) should use hover previews for its statblock reference or a different
pattern.

## Files To Create/Modify

- `libs/domain/src/compendium.ts` — new types (shaped by Foundry VTT PF2e data)
- `libs/domain/src/fixtures/compendium.ts` — entries from Foundry data
- `libs/domain/package.json` — add exports
- `libs/ui/src/3/encounter-tab.tsx` — replace portal with Base UI Popover
- `libs/ui/src/3/creature-statblock.tsx` — wikilink rendering + nested popover
- `libs/ui/src/3/side-panel.tsx` — tabbed pinning for multiple items
- Possibly a shared `WikilinkText` component if the pattern generalizes
