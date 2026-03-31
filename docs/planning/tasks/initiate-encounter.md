# Initiate Encounter

## Goal

Build the flow for opening an encounter in a session — both seeded from an
encounter setup and created from scratch.

This is the core prep→runtime transition. It touches domain types (session,
encounter, participant, conflict sources) and UI (the interaction for starting
and seeding an encounter).

## Context

See [domain model draft](../ttrpg-app-domain-model-draft.md) for the full
mental model. Key points relevant here:

- An encounter at runtime is lightweight: a dramatic question + conflict sources.
- Participants live in the session, not in the encounter.
- Participant motivations (from their concept) are the seeds for conflict
  sources — the GM recognizes which motivations oppose the dramatic question.
- An encounter setup is a seed, not a binding contract. It provides a potential
  dramatic question and participant references.
- Motivations are editable at runtime — they're seeded from prep but can shift.

## Flows To Build

### 1. Start encounter from scratch

The GM hits "Start Encounter" (a primary session-level action). This should:

- prompt for a dramatic question (required — an encounter without a question
  isn't an encounter);
- allow adding participants from three sources:
  - **already in session** — participants added earlier that aren't tied to any
    encounter yet (or are relevant to this one too);
  - **from participant setup** — picking from the library of prepared
    participant setups, which instantiates them into the session;
  - **ad-hoc** — building a minimal participant on the spot (name + motivation
    at minimum; a quick inline version of the Building creature flow);
- show participant motivations so the GM can recognize conflict sources;
- allow creating conflict sources on the encounter, each linked to a participant
  or group and a motivation that drives the opposition.

The result is: an open encounter in the session with a dramatic question,
conflict sources, and participants with runtime state.

### 2. Start encounter from an encounter setup (seed)

A scene description shows encounter setups. Each should have a shortcut to
"Start encounter from this setup." This should:

- pre-fill the dramatic question from the setup's potential question (editable);
- add referenced participants to the session (with their prep motivations seeded
  as runtime motivations), or select them if already present;
- show motivations alongside the dramatic question so the GM can quickly
  create conflict sources;
- allow the GM to add/remove participants and adjust before confirming.

This is the same flow as from-scratch, but pre-filled. The setup is consumed
as a seed and not bound to the resulting encounter.

## Domain Work

### Prep types to define

These are the input shapes for seeding. Used as fixture types for now, but
they define the prep-side contract.

- `ParticipantConcept` — theme, role, feeling, motivations
- `ParticipantSetup` — typed statblock ref + participant concept + variations
- `Group` — shared motivations + group-level concept (participants relate to
  groups, not the other way around)
- `EncounterSetup` — potential dramatic question + participant setup references

### Runtime types to define

- `Session` — top-level runtime container (participants, open encounters)
- `Participant` — participant setup ref + runtime motivations + tactical state
- `Encounter` — dramatic question + conflict sources
- `ConflictSource` — who drives it (participant or group ID + motivation ID) +
  opposition (a description of how this motivation opposes the dramatic
  question). "Opposition" is the preferred term for this field — it's more
  specific than "description" and captures the directional nature of conflict.
  The relation is one-directional: `ConflictSource → Participant`. No backward
  reference needed — finding conflict sources for a participant is a simple
  filter by ID.

### Resolver / seed functions

- `seedEncounterFromSetup(setup, session)` → pre-filled encounter draft +
  participants to add
- `addParticipantToSession(participantSetup, session)` → participant with seeded
  motivations and initial tactical state
- `openEncounter(draft, session)` → session with the new encounter and its
  participants

These should be pure functions. State management approach (local state,
useReducer, etc.) is an implementation decision for later.

## UI Work

### "Start Encounter" interaction

- A primary action in the session view
- Opens a focused surface (modal, panel, or dedicated view — to be decided)
  for composing the encounter before confirming
- Shows: dramatic question input, participant list with motivations, conflict
  source creation
- Confirm opens the encounter; cancel discards the draft

### Encounter setup shortcut

- In scene description / encounter setup view, a button per setup
- Triggers the same "Start Encounter" interaction but pre-filled
- The GM can still edit everything before confirming

## What Not To Build Yet

- Initiative flow (separate task — will be added to Session when needed)
- Tactical state editing (HP, conditions — separate task)
- Full participant setup authoring in Building mode
- Notes (canonical or runtime)
- Session persistence beyond page refresh
- Encounter end/resolution flow

## Fixture Needs

Use the lab encounter from the vault as the concrete example:

- two keeper participant setups with different variations, related to a
  "keepers" group with shared motivations
- a third participant setup for a solo creature with no group and no
  variations (to test the simplest path)
- an encounter setup with a potential dramatic question referencing all three

Statblocks can be minimal or mocked — the focus is on the encounter initiation
flow, not on statblock display.

## Success Criteria

The flow is successful if:

- the GM can open an encounter from scratch with a dramatic question and
  participants;
- the GM can seed an encounter from a setup and adjust before confirming;
- the GM can add participants from all three sources (session, setup library,
  ad-hoc);
- participant motivations are visible during encounter creation and help the GM
  form conflict sources;
- conflict sources are linked to participants/groups and their motivations;
- the encounter exists in the session as a lightweight runtime entity;
- participants exist in the session independently of the encounter.
