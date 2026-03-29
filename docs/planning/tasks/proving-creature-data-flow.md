# Proving Creature Data Flow

## Goal

Prove the new creature data flow in code with the smallest useful slice:

- `CreatureTemplate`
- `EncounterSetup`
- `ParticipantSetup`
- `EncounterRunState`
- `Note`

The goal is not to build full editors, importers, or persistence yet. The goal
is to validate that:

- local participant setup is enough to express encounter-specific creature
  variation without copying full statblocks;
- encounter setup can exist before initiative;
- run-state can stay small and tactical;
- the runner can derive Actor / Interrupts / Reference from resolved
  participant data;
- canonical and runtime notes can be surfaced together without complicated note
  typing.

## Why This Comes Next

The architecture draft now gives a clear direction, but the current prototype is
still built on older UI-facing statblock fixtures. The fastest way to validate
the new direction is to replace string-heuristic splitting with a real resolved
participant model backed by one concrete encounter.

This should happen before:

- importer work;
- full Building-mode editors;
- large note-management UX;
- broad compendium integration.

## What To Build First

This proof should be split across multiple sessions rather than treated as one
long implementation pass.

Recommended session split:

### Session 1

- define the new domain types;
- create one worked fixture set;
- add pure resolver functions.

This session should end once the model and selectors can be exercised without
significant UI rebuilding.

### Session 2

- rebuild Actor / Interrupts / resolved runner slices on top of the new model.

This session should focus on proving that the UI split now comes from data shape
rather than string parsing.

### Session 3

- add the smallest note flow for canonical + runtime notes.

This session should focus only on visibility and ownership of notes, not on
full note-management UX.

Each session is expected to include some back-and-forth and possible model
adjustment. The split exists to keep that feedback loop small and readable.

### 1. Define the new domain types

Add app-owned domain types for:

- `CreatureTemplate`
- `CreatureConcept`
- `EncounterSetup`
- `ParticipantSetup`
- `EncounterRunState`
- `Note`
- `ResolvedParticipant`

Keep the first version intentionally small and author-facing.

Do not overdesign:

- typed note-link refs;
- promotion workflows;
- persistent recurring creature entities;
- automation-oriented execution metadata.

### 2. Create one worked fixture set

Build fixtures from the actual lab encounter instead of abstract examples.

Use:

- `Старший хранитель`
- `Младший хранитель`
- multiple participant setups with different selected aspects
- one encounter setup with potential dramatic question and conflict sources
- a few canonical notes and a few runtime notes

Concepts for keepers are ready, but statblocks are not. So make them up, these are mock creature templates anyway. Full statblocks to import will be done later.

This fixture set should be rich enough to prove:

- many local participants can derive from one template;
- concept stays on the template;
- per-participant local variation belongs to participant setup;
- runtime change belongs to run-state.

### 3. Add pure resolver functions

Before significant UI work, add pure functions such as:

- `initializeEncounterRunState(encounterSetup)`
- `resolveParticipant(template, participantSetup, runState, notes)`
- selector helpers for actor entries, interrupt entries, and visible notes

If these functions feel awkward, the model likely still needs adjustment.

### 4. Rebuild runner slices from resolved data

Update the encounter runner to read from resolved participant data rather than
from string-heavy fixture sections.

The first proof target is:

- roster driven by run-state;
- actor panel driven by resolved participant data;
- interrupts panel derived without string heuristics;
- concept available as deeper reference rather than mandatory inline content.

### 5. Add the smallest note flow

Notes should prove only the core interaction:

- canonical notes exist before initiative;
- runtime notes can be added after initiative begins;
- both can be surfaced together when relevant to the current participant or
  encounter.

Do not build full filtering, archiving, or promotion workflows yet.

## What Not To Build Yet

Avoid the following in the proving pass:

- a Foundry-driven import pipeline;
- a final compendium population strategy;
- full RichText-everywhere adoption;
- full editor UX for all domain objects;
- history/session-wrap-up machinery;
- persistent actor records beyond template/setup/run-state.

## RichText Boundary

The boundary for `RichText` remains intentionally open.

For the proving pass:

- prefer plain `string` by default;
- use richer text handling only where linkable inline text is already clearly
  needed;
- avoid forcing every authored string through a rich-text pipeline before the
  data flow itself is proven.

This means the proof should validate creature data ownership first and leave the
broader `RichText everywhere` question open for a later focused decision.

## Success Criteria

The proof is successful if the app can show, using one real encounter, that:

- one template can support multiple configured local participants;
- setup and run-state stay clearly separate;
- notes are useful before and during initiative;
- Actor / Interrupts split comes from data shape rather than string parsing;
- the model feels comfortable for prep rather than like a low-level rules
  database.
