# Encounter Run-State + Combat Card

## Goal

Build the first real run-state: per-creature HP tracking, conditions, and a
combat-oriented view that replaces the full statblock as the primary encounter
runner content.

The immediate goal is not to lock the final screen layout. It is to define a
stable conceptual split for encounter-running information, so UI experiments can
move without collapsing back into "just show the full statblock".

## Context

The encounter runner currently shows a full `CreatureStatblock` in the main
content area. During play, the GM needs a _combat-focused_ view: HP bar, active
conditions, action economy — not the full reference block. The full statblock
becomes something you peek at (hover preview or side panel pin).

This is the first piece of ephemeral run-state, architecturally distinct from
canonical content (as called out in the tech direction doc, section 7).

## Conceptual Schema

The runner should be grouped by tactical use, not by statblock sections like
Defense / Offense / Perception.

### 1. Flow

Encounter-wide state that answers "where are we in the loop?"

Contains:

- threat level
- dramatic question
- encounter-level actions like `End`
- turn indicator
- initiative or other turn order
- round state, if tracked later

This is stable encounter context, not creature detail.

Initiative or turn order belongs here conceptually, even if the UI later
combines Flow and Roster into one ordered list for space efficiency.

### 2. Roster

The persistent per-creature tactical ledger for the current encounter cast.

Contains:

- current HP
- major visible conditions
- reaction spent / available
- spell slots, focus points, and other spendable counters
- other short per-creature run-state flags

This is the main ephemeral run-state backbone. It should stay compact and
state-like rather than absorb full ability text.

The roster may include lightweight participants such as PCs represented only by
an `id` and `label`. These can appear in initiative order without requiring a
linked statblock or full tracked state.

### 3. Actor

The current acting creature and the information needed to choose its action.

Contains:

- motivation
- creature-specific actions and abilities
- attacks, spells, and other owned options
- short descriptions for those actions when useful, with full detail available
  through popup / pin interaction
- resources relevant to action choice
- speed when directly relevant to the current decision

This answers "what can this creature do now?" and "what would it likely choose
to do?"

### 4. Targets

The current target set for the action being resolved. This is plural by design,
to support single-target, multi-target, and area effects.

Contains, per targeted creature:

- compact resolver-facing defenses and DC-relevant values
- conditions that matter for resolving the action
- motivation hints when they affect likely response or reaction

This section is intentionally target-facing. It should not depend on having
deep ability data for non-GM-controlled participants such as PCs.

### 5. Interrupts

Cross-turn tactical information that can matter outside the active actor and
target set.

Contains:

- passive abilities
- available reactions
- triggered reminders
- other "don't forget this can fire now" mechanics

This is a separate tactical category because it cuts across turns and
participants. It should not be buried inside creature detail.

### 6. Reference

Deep lookup, not a dedicated runner area.

Contains:

- full statblock
- long-form ability text
- pinned reference panels
- hover previews for deeper reading

Reference should be available primarily through hover preview and pin-to-side
panel interaction.

## Draft Information Architecture

Current working split for future UI experiments:

- Flow: runner header
- Roster: left sidebar, likely ordered by initiative in UI and able to include
  lightweight participant rows between fully tracked creatures
- Actor: left part of main content, roughly half to two thirds
- Targets: on-demand modal or equivalent focus surface
- Interrupts: right part of main content
- Reference: hover preview with optional pin-to-side-panel

This is a draft arrangement, not a locked screen spec. The important part is
the information ownership and tactical role of each bucket.

## Action Taxonomy

The runner should separate actions by tactical ownership rather than by
rulebook category.

### Owned actions

Creature-specific attacks, spells, special abilities, and anything that modifies
how that creature acts.

These belong in Actor by default.

If short descriptions are shown, they should live here. They are derived UI text
unless the source data later provides a true summary field.

### Borrowed common actions

System-wide generic actions that many creatures can use.

These should not be shown in full by default. They are reference material
unless:

- the creature has a special override for that action
- the creature has a special rider attached to that action
- the current situation makes a common action unusually important

### Interrupts

Reactions and passives that matter outside the creature's own turn.

These belong in Interrupts even when their source text lives inside a creature
statblock.

## Run-State Shape Direction

The first implementation can stay simple, but the schema should leave room for
the conceptual buckets above.

```ts
type EncounterParticipant = {
  id: string;
  label: string;
  statblockId?: string;
};

type ParticipantRunState = {
  currentHp: number;
  maxHp: number;
  conditions: string[];
  reactionAvailable: boolean;
  counters: Record<string, number | boolean>;
};

type EncounterFlowState = {
  initiativeOrder: string[];
  activeParticipantId: string | null;
  round: number;
};

type EncounterFocusState = {
  actorParticipantId: string | null;
  targetParticipantIds: string[];
};

type EncounterRunState = {
  participants: Record<string, EncounterParticipant>;
  flow: EncounterFlowState;
  creatureStates: Record<string, ParticipantRunState>;
  focus: EncounterFocusState;
};
```

This is still local component state for the prototype. No persistence is needed
yet.

`round` is required only if the prototype treats it as a simple encounter
counter. If fully rules-aware round handling around Delay or similar initiative
changes becomes important, the counter can be reduced to a manual increment or
removed until that behavior is defined more precisely.

## What To Do

### 1. Define run-state shape

Start with local component state (`useState` / `useReducer`), but organize it so
it can later support `participants`, `flow`, `creatures`, and `focus`
separately.

### 2. Build CreatureCombatCard

A compact, state-oriented view per creature instance inside the Roster:

- HP bar (current / max) with quick +/- controls
- Condition tags (add/remove)
- Reaction availability
- Compact counters for common spendable resources
- Hover on the creature name opens the full statblock as a popup (with
  pin-to-sidebar)

### 3. Update EncounterRunner

- Main content should move toward the Flow / Roster / Actor / Interrupts split
- Targets should be treated as a focus surface rather than a permanently visible
  full panel
- Full statblock remains accessible through hover preview (with pin-to-sidebar
  button)
- Manage encounter run-state at the runner level, pass slices down to the
  relevant views
- Initialize HP from statblock data (parse from the `hp` string, or add a
  numeric field to the fixture)

### 4. Stories

- Combat card in isolation with various HP / condition / reaction states
- Encounter runner with the new information split, even if some areas remain
  FPO-backed at first

## Depends On

- Base UI integration (previous task) — for the statblock hover/pin reference
  pattern. The findings from nested popup testing inform how combat card
  references the full statblock.

## Files To Create/Modify

- `libs/ui/src/3/creature-combat-card.tsx` — new component
- `libs/ui/src/3/creature-combat-card.stories.tsx` — new stories
- `libs/ui/src/3/encounter-runner.tsx` — swap statblock for combat card
- Possibly `libs/domain/src/run-state.ts` if types deserve their own file
