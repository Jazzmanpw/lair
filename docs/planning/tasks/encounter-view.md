# Encounter View

## Goal

Build the view for an open encounter in a session — how it looks without
initiative, and how it transitions into initiative mode (encounter mode).

This is the core runtime reading surface. The GM has opened an encounter and
now needs to see the dramatic question, conflict sources, participants with
their motivations, and navigate to their prep content.

## Context

See [domain model draft](../ttrpg-app-domain-model-draft.md) for the full
mental model. Key points relevant here:

- An open encounter is a dramatic question + conflict sources.
- Conflict sources link to participants through motivations and carry an
  opposition description.
- Participants live in the session with runtime motivations and tactical state.
- Initiative is a session-level game mode, orthogonal to encounters.
- The app is a note-taking tool — the encounter view is primarily a reading
  surface with editing affordances, not a game automation screen.

See [app philosophy](../ttrpg-app-philosophy.md) — Running mode is
reading-focused. Navigation between the encounter, its participants, and their
linked content should be instant. The view should surface prep context, not
bury it.

## Views To Build

### 1. Encounter without initiative

The encounter is open but no initiative has been rolled. This is the common
state for social encounters, exploration situations, and the moments before
tactical combat.

The view should show:

- **Dramatic question** — prominent, editable. This is the thing the GM needs
  to keep in mind at all times.
- **Conflict sources** — each showing its opposition text and who drives it
  (participant/group label). Conflict sources should be addable, editable,
  and resolvable (mark as resolved, not delete — the GM might want to see
  what was resolved).
- **Participant list** — everyone in the session relevant to this encounter,
  with their runtime motivations visible. Navigation to participant detail
  (statblock, concept, full motivation list) should be instant.
- **Session participants not in this encounter** — visible but secondary. They
  might become relevant and the GM should be able to pull them in.

This view should feel like a living situation board — "here's what's at stake,
here's who's involved, here's what opposes the PCs."

Once an encounter opens, it becomes the center of attention. The layout may
change to give the encounter view primary screen space, but scene information
should remain close — accessible without navigating away.

### 2. Transition to initiative

The GM decides tactical combat is needed. The transition should:

- add initiative flow to the session (turn order, active participant, round);
- allow setting initiative order (manual entry for now — automated rolling is
  not needed);
- not change the encounter itself — it's still the same dramatic question and
  conflict sources;
- the encounter view gains initiative-specific affordances (turn tracking,
  active participant highlight) on top of what was already there.

This should feel like "the same view, now with turn structure layered on" —
not a mode switch to a completely different screen.

### 3. Encounter with initiative

The encounter view during initiative adds:

- **Turn order** — who goes next, with the active participant highlighted.
  Advancing turns should be a single action.
- **Active participant focus** — the active participant's tactical information
  becomes primary: their actions, abilities, motivations, and relevant
  concept hints. This draws from the encounter-run-state task's Actor concept
  but adapted to the new domain model.
- **Tactical state** — HP, conditions, reaction availability per participant.
  Editing should be inline and fast.
- **Conflict source status** — still visible, with resolved sources dimmed.
  The GM needs to see when the dramatic question is approaching its answer.

The encounter-without-initiative content doesn't disappear — it gains a
tactical layer. The dramatic question and conflict sources remain visible and
central.

## Exploration Findings (2026-05-11)

### Encounter ↔ participant relationship

The encounter does **not** store a participant roster. Conflict source reasons
(aspect/motivation references) are the link — if a participant's A/M drives a
conflict source, they're "in" the encounter. This is intentional: a participant
without a stake in any conflict source doesn't belong in the encounter.

The encounter view shows **all session participants**, with A/Ms relevant to the
active encounter highlighted. Roster management is a session-level concern, not
an encounter-level one. Initiative roster is a separate thing entirely (Phase 3).

Edge cases (participant in session but irrelevant, e.g. in another room) can be
solved later — manual exclusion, or just showing everyone and letting the GM
ignore. For POC/MVP, showing all session participants all the time is fine.

### Domain updates needed

**ConflictSource** needs `id: string` and `resolved: boolean`. The task asks for
resolve/unresolve but the current type is just `{opposition, reasons[]}`.

**InitiativeFlow** — deferred to Phase 3. No point designing it in advance.

**No other type changes.** `Encounter` does not get `participantIds`. Participant
derivation is a view-level concern using conflict source reasons.

A utility function to derive encounter-relevant participants from conflict source
reasons would be useful (maps reason IDs back to participants via their
aspects/motivations).

### Existing v3 components — what carries forward

**Visual language carries forward:** the dark-forest palette, border treatments,
typography (font vars, sizing, tracking), the gold accent color. These are the
Lair identity.

**Components need rewriting:**

- **Creature statblock** (`libs/ui/src/3/creature-statblock.tsx`) renders an old
  type shape (`header`/`description`/`perception`/`defense`/`offense` sections).
  The current `CreatureStatblock` type in `pf2e.ts` has a different structure
  (`perception`, `skills`, `attributes`, `armorClass`, `savingThrows`, etc.).
  Needs a full rewrite against current types.
- **Creature combat card** (`libs/ui/src/3/creature-combat-card.tsx`) has good
  interaction patterns (HP +/− input, condition chips, reaction toggle) worth
  carrying forward conceptually. Uses old types though.
- **Scene page layout** (`libs/ui/src/3/scene-page-layout.tsx`) is built for the
  old `Scene` domain. The shell concept (header, content area, sidebar) is a
  starting point, but the data model it renders is completely different.

**Base-ui is not installed.** Hover previews need it (or an equivalent). The v3
combat card uses a hand-rolled portal popup that can't handle nesting.

### Draft phases

**Phase 1 — domain tweaks + fixtures.** ConflictSource gets `id` + `resolved`.
Encounter-initiation form output updated accordingly. Utility to derive
encounter-relevant participants from conflict source reasons. Fixture enrichment:
pre-resolved conflict source, tactical state variety across participants.

**Phase 2 — v4 running layout + encounter view (no initiative).** New iteration
for the running layout, keeping the visual language. Install base-ui for hover
previews. Statblock rewrite against current types. Encounter situation board:
dramatic question, conflict sources (add/edit/resolve), all session participants
with encounter-relevant A/Ms highlighted. Tactical state editing for any
participant (not gated by initiative). Hover preview for participant detail
(statblock, concept, motivations).

**Phase 3 — initiative layer.** `InitiativeFlow` type on Session. Pure functions
(`startInitiative`, `setActiveParticipant`, `endInitiative`). Turn order, active
participant highlight, advance turn. Initiative adds to the encounter view, does
not replace it. One initiative flow per session (shared across parallel
encounters if they ever exist).

### Open unknown: overall running view layout

The v3 scene page layout was built around Scenes (a location with an encounter
tab, skill checks, traps, treasures). The new model is Session → Participants +
Encounters. The encounter is the primary surface, not a tab within a scene.

What does the v4 running layout look like? Key questions:

- What's the primary content area vs. what's secondary/peripheral?
- Where do non-encounter session participants live?
- How does scene information (flavor text, room description, linked scenes)
  relate to the encounter-first layout — is it a collapsible header, a sidebar,
  something else?
- Does the layout change when initiative starts, or does it absorb initiative
  inline?
- How much of the screen does the encounter claim? The task says "it becomes the
  center of attention" but that's vague.

This needs a design conversation before Phase 2 implementation begins.

## Domain Work

### Types to update

- `ConflictSource` — add `id: string`, `resolved: boolean`

### Types to add (Phase 3)

- `InitiativeFlow` — turn order, active participant ID, round number. Lives
  on the session, not on any encounter.

### Functions to add

- `isReasonLinkedToEncounter(reasonId, encounter)` → whether an aspect or
  motivation drives a conflict source in this encounter (for per-item highlight)
- Phase 3: `startInitiative(participantIds, session)` → session with initiative
  flow
- Phase 3: `setActiveParticipant(participantId, session)` → session with the
  given participant as active (no sequential advance — the GM picks arbitrarily)
- Phase 3: `endInitiative(session)` → session without initiative flow

## UI Work

### Encounter panel

The primary runtime surface. Should accommodate both with-initiative and
without-initiative states without feeling like two different components.

Design considerations:

- Dramatic question should always be visible — it's the anchor.
- Conflict sources should be scannable — short opposition text, participant
  label, resolved/active status.
- All session participants visible, encounter-relevant A/Ms highlighted.
- Tactical state editable for any participant, even without initiative.
- Initiative layer should add to the view, not replace it.

### Participant detail navigation

Hover preview is the primary candidate — fast access to:

- statblock (rewritten against current `CreatureStatblock` type);
- full concept and motivation list;
- tactical state editing.

Requires base-ui (or equivalent) for proper popover positioning and nesting.

### Running layout (v4)

New iteration. Keep visual language (palette, fonts, border treatments). Redesign
the layout for the session/encounter model. **Blocked on the layout design
conversation** (see Open Unknown above).

## What Not To Build Yet

- Encounter end/resolution flow (closing an encounter, answering the dramatic
  question)
- Notes (canonical or runtime) in the encounter view
- Full Building-mode creature authoring
- Session persistence
- Multiple simultaneous in-focus encounters
- Participant detail editing beyond tactical state

## Fixture Needs

Reuse fixtures from the initiate-encounter task. Additionally:

- at least one conflict source should be pre-resolved in story fixtures, to
  test the resolved/active visual distinction
- participants should have enough tactical state variety (different HP levels,
  some conditions) to test the initiative view

## Success Criteria

The view is successful if:

- the GM can see the dramatic question and conflict sources at a glance;
- conflict sources show who drives them and can be resolved;
- participants are visible with their motivations and navigable to detail;
- initiative can be started without leaving the encounter view;
- initiative adds turn structure without hiding encounter context;
- the view feels like a situation board that gains tactical precision when
  initiative starts, not like two different screens.
