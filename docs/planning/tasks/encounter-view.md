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

## Depends On

[Initiate Encounter](./initiate-encounter.md) — runtime types, session model,
and the encounter creation flow must exist before we can view an encounter.

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

## Domain Work

### Types to add (on top of initiate-encounter task)

- `InitiativeFlow` — turn order, active participant ID, round number. Lives
  on the session, not on any encounter.

### Functions to add

- `startInitiative(participantIds, session)` → session with initiative flow
- `setActiveParticipant(participantId, session)` → session with the given
  participant as active (no sequential advance — the GM picks arbitrarily)
- `endInitiative(session)` → session without initiative flow (participants
  and encounters unchanged)

## UI Work

### Encounter panel

The primary runtime surface. Should accommodate both with-initiative and
without-initiative states without feeling like two different components.

Design considerations:

- Dramatic question should always be visible — it's the anchor.
- Conflict sources should be scannable — short opposition text, participant
  label, resolved/active status.
- Participant list should support quick navigation to detail.
- Initiative layer should add to the view, not replace it.

### Participant detail navigation

Clicking/hovering a participant in the encounter view should give fast access
to:

- statblock (or the relevant parts of it);
- full concept and motivation list;
- tactical state editing.

The exact interaction pattern (hover preview, side panel, inline expand) is a
design decision for this task. The earlier hover preview work
(base-ui-and-hover-previews task) may inform this.

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
