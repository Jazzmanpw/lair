# Encounter Run-State + Combat Card

## Goal

Build the first real run-state: per-creature HP tracking, conditions, and a
combat-oriented view that replaces the full statblock as the primary encounter
runner content.

## Context

The encounter runner currently shows a full `CreatureStatblock` in the main
content area. During play, the GM needs a _combat-focused_ view: HP bar, active
conditions, action economy — not the full reference block. The full statblock
becomes something you peek at (hover preview or side panel pin).

This is the first piece of ephemeral run-state, architecturally distinct from
canonical content (as called out in the tech direction doc, section 7).

## What To Do

### 1. Define run-state shape

Local component state (useState/useReducer) is fine for now. No persistence
needed yet.

```ts
type CreatureRunState = {
  currentHp: number;
  maxHp: number;
  conditions: string[]; // simplified for prototype
};

// keyed by creature instance id (e.g., "khimera-tyangu-0")
type EncounterRunState = Record<string, CreatureRunState>;
```

### 2. Build CreatureCombatCard

A compact, action-oriented view per creature instance:

- HP bar (current / max) with quick +/- controls
- Condition tags (add/remove)
- Compact stat summary: AC, key saves — just enough to not need the full block
- Hover on the creature name opens the full statblock as a popup (with pin-to-sidebar)

### 3. Update EncounterRunner

- Main content area shows `CreatureCombatCard` instead of `CreatureStatblock`
- Full statblock accessible via hover preview (with pin-to-sidebar button)
- Manage `EncounterRunState` at the runner level, pass down to combat cards
- Initialize HP from statblock data (parse from the `hp` string, or add a
  numeric field to the fixture)

### 4. Stories

- Combat card in isolation with various HP/condition states
- Encounter runner with combat cards (compare to current full-statblock view)

## Depends On

- Base UI integration (previous task) — for the statblock hover/pin reference
  pattern. The findings from nested popup testing inform how combat card
  references the full statblock.

## Files To Create/Modify

- `libs/ui/src/3/creature-combat-card.tsx` — new component
- `libs/ui/src/3/creature-combat-card.stories.tsx` — new stories
- `libs/ui/src/3/encounter-runner.tsx` — swap statblock for combat card
- Possibly `libs/domain/src/run-state.ts` if types deserve their own file
