# TTRPG App Creature Data Flow Draft

## Goal

Describe how creature-related data should flow from reusable prep-time templates
into encounter-specific setup and, when needed, into ephemeral tactical
run-state.

This document exists to keep three concerns separate:

- reusable canonical creature data;
- canonical scene-local encounter preparation;
- temporary tactical state used only while running an encounter mode.

It also records a simplified note model that can work across those layers
without turning the app into a game of tiny database entities.

## Why This Matters

The current prototype started from UI-facing statblock fixtures. That was
useful for layout work, but it blurs several distinctions that now matter:

- a reusable creature template vs a local configured participant in one scene;
- a prepared encounter situation vs initiative/combat run-state;
- a creature concept used during creation vs a creature's current goal during
  play;
- canonical prep notes vs runtime notes created during a session.

If these are not separated early enough, the runner risks either:

- copying full statblocks into per-encounter blobs that drift away from their
  source; or
- over-normalizing the model into something closer to a rules engine than a GM
  tool.

The preferred direction is a middle path:

- structured for display and authoring;
- reference-capable where useful;
- not automation-shaped;
- explicit about what is canonical and what is temporary.

## Core Principle

The app should model creature data in layers with different lifetimes.

### Rule of thumb

- If it is reusable and part of prep truth, it belongs to a template.
- If it varies per encounter participant before play starts, it belongs to
  participant setup.
- If it changes during the fight, it belongs to run-state.
- If it matters across encounters or scenes as an ongoing person, only then
  should it become a more persistent entity in its own right.

This should be treated as a design heuristic, not a rigid law, but it is a good
default when deciding where new fields belong.

## Main Layers

### 1. Creature Template

A `CreatureTemplate` is canonical reusable creature data created in Building
mode.

It should contain:

- structured statblock data suitable for reference and display;
- structured tactical entries such as strikes, abilities, spellcasting, and
  resources;
- a structured creature concept used during creation and available as deeper
  reference later.

The concept block should follow the prep process used in the vault rather than a
generic note split.

```ts
type CreatureConcept = {
  references: string;
  theme: {
    aspects: string[];
    role: string;
    feeling: string;
  };
  abilities: string[];
};
```

Important constraint:

- `concept.abilities` are concept-stage ability ideas, not full statblock
  ability entries.

In Running mode, the most useful parts of concept are likely:

- `theme`
- `references`

The concept's `abilities` should usually remain prep-only, because the actual
mechanical abilities derived from them should already exist in the template's
real statblock entries.

In addition to concept, a template may also define local selectable variations
used by encounter participant setup.

```ts
type CreatureVariation = {
  id: string;
  label: string;
  aspect: string;
  enabledEntryIds: string[];
};
```

This split is intentional:

- `label` is the short UI-facing chip or tag used to distinguish a variation;
- `aspect` is appended to the concept theme aspects when resolving the creature
  for display and can be longer than a compact label;
- `enabledEntryIds` keeps the first version simple by activating existing entry
  ids instead of introducing a more complex conditional system immediately.

### 2. Encounter Setup

An `EncounterSetup` is canonical scene-local preparation created in Building
mode.

This is not the same thing as initiative/combat mode.

An encounter in the broader TTRPG sense is better treated as a prepared dramatic
situation built around:

- a potential dramatic question;
- conflict sources;
- prepared ingredients that may express those conflicts, such as creatures,
  hazards, environmental pressures, or other opposing forces.

This matters because initiative is only one possible way such a situation can be
resolved.

An encounter setup can therefore exist and be useful before tactical combat
begins.

It should contain at least:

- potential dramatic question;
- conflict sources;
- participant setup entries;
- any other prepared encounter-local configuration later needed by the runner.

### 3. Participant Setup

A `ParticipantSetup` is a canonical local encounter instance derived from a
template.

This is the layer that answers questions like:

- which template is this participant based on;
- which optional variation or configuration is selected for this instance;
- which prepared resources or local variations apply here;
- what prep notes should be visible when this participant is relevant.

This layer is especially important for cases like multiple keepers based on the
same reusable creature template but configured differently for one scene.

A participant setup is preferable to:

- copying a full statblock into the encounter;
- or creating a fully persistent creature entity for every local variation.

The intended direction is:

- one reusable template;
- many local participant setups;
- one ephemeral run-state entry per currently active encounter participant when
  combat mode begins.

### 4. Encounter Run-State

`EncounterRunState` is temporary tactical state created only when the encounter
enters initiative/combat handling.

It should contain only ephemeral state needed for play, such as:

- current HP;
- temporary conditions;
- initiative order;
- active participant;
- spent reactions;
- consumable counts;
- spell slot or focus-point spending;
- temporary tactical notes created during play.

It should not silently become an editable fork of canonical creature data.

Instead, the runner should render a resolved participant view derived from:

- creature template;
- participant setup;
- encounter run-state.

That keeps the temporary layer small and reversible.

## Structured Statblock Direction

The preferred statblock direction is:

- more structured than the current string-heavy fixture model;
- less fine-grained than data shaped for direct rule execution and automation;
- optimized for authoring and display rather than rule execution.

For PF2e-authored custom creatures, benchmarked numeric values should preserve
both the exact number and its prep-time scale.

```ts
type Scale = 'extreme' | 'high' | 'moderate' | 'low' | 'terrible';

type ScaledStat = {
  value: number;
  scale: Scale;
  note?: string;
};
```

This should be used for stats where the authored workflow depends on selecting a
scale first and then filling the exact value from guidance tables.

The display string should be derived from structured data rather than stored as
one mixed string. For example, a value such as `Diplomacy +3 (+5 to recruit into
the order)` should be modeled as:

- exact value in `value`;
- scale in `scale`;
- parenthetical or conditional descriptor in `note`.

The `note` field is intentionally plain text for now. It may later support more
structured interpolation or parameterization, but the first model should treat
it as authored descriptive text.

That suggests:

- a structured root creature model for stats and reference sections;
- structured tactical entries for strikes, abilities, spellcasting, and
  resources;
- optional references to shared rule content where that is genuinely useful;
- no need to decompose everything into engine-ready fragments.

Examples of good fits for references:

- spells referenced from a shared spell record, with optional local comments;
- common rule content that is genuinely reused.

Examples of good fits for embedded local entries:

- custom monster abilities;
- creature-specific strikes;
- creature-specific tactical reminders;
- local variations selected through encounter participant setup.

## Configurable Rather Than Fully Overridable

The app should prefer configurable templates over fully overridable copied
statblocks.

This means the model should support things like:

- selected variations;
- enabled or disabled optional entries;
- local loadout choices;
- prepared starting resources;
- conditional notes.

This should remain simple and author-facing. It does not need predicate logic,
dense execution metadata, or a general rule engine.

The intention is:

- prepared variation is expressed as configuration;
- runtime change is expressed as run-state;
- canonical template data remains stable unless explicitly edited in Building
  mode.

## Notes

Notes should be modeled more simply than the earlier prep-note vs run-note field
explosion.

### Note shape

For now, a note can stay lightweight:

```ts
type Note = {
  id: string;
  scope: 'canonical' | 'runtime';
  title?: string;
  content: string;
  links: string[];
};
```

Important simplifications:

- `title` is mainly for topic labeling and finding notes in a list;
- `links` are just strings for now;
- notes can point to canonical or runtime things;
- nothing else needs to point back to notes yet;
- explicit link structure can be refined later once more canonical models are
  stable.

### Notes as separate entities

Notes should be treated as their own stored objects rather than embedded in many
different field shapes.

This makes it possible to:

- create canonical notes before initiative starts;
- attach notes to encounter setup, participant setup, or later runtime objects;
- continue surfacing those notes when the runner is active;
- create new runtime notes without mutating canonical notes directly;
- later promote or summarize runtime notes into a session record or canonical
  content through explicit wrap-up workflows.

### Canonical vs runtime

The important distinction is note scope, not note shape.

- `canonical` notes are prep truth and remain available in Running mode;
- `runtime` notes are temporary notes created during play.

This means prep notes needed during play do not require a special transition
mechanism. They can remain canonical notes and still be shown in the runner.

At the UX level, the runner can present relevant canonical notes and runtime
notes together without physically copying them.

## Lifecycle

### Building mode

In Building mode, the user should be able to:

- create or edit reusable creature templates;
- write the creature concept as part of template creation;
- configure encounter setup around dramatic question and conflict sources;
- create participant setup entries derived from templates;
- prepare canonical notes that will still be useful once the encounter is run.

### Before initiative

An encounter setup can already be active as a prepared conflict situation even
if initiative has not been rolled.

This should allow the user to:

- inspect participants and their configured template-derived data;
- view encounter-relevant notes;
- add or refine notes about participants or the scene;
- work with the dramatic question and conflict sources without forcing tactical
  run-state into existence.

### When initiative starts

When initiative or another tactical trigger starts encounter mode:

- create `EncounterRunState`;
- seed it from participant setup and template defaults where relevant;
- keep canonical notes visible;
- add runtime notes as needed.

### During play

During play, the user should mainly edit:

- run-state;
- runtime notes.

Canonical templates and encounter setup should remain stable unless explicitly
edited outside that flow.

### Wrap-up

When ending a run, runtime notes should remain distinct from canonical content.

They may later be used for:

- session record generation;
- manual promotion into canonical notes;
- structured historical updates applied afterward.

The app does not need to fully normalize that wrap-up flow yet, but the note
model should not block it.

## Interaction Implications

The data flow suggests the following UI split.

### Building mode

- creature editor for templates and concept;
- encounter prep editor centered on dramatic question and conflict sources;
- participant setup controls for local configuration;
- note surfaces that can attach canonical notes before play starts.

### Running mode without initiative

- encounter context remains visible as a dramatic situation, not only as combat;
- notes can already be added and reviewed;
- participant-related hints remain accessible without tactical run-state.

### Running mode with initiative

- roster is driven by run-state;
- actor and interrupts views are driven by resolved participant data;
- concept remains deeper reference rather than mandatory inline content;
- canonical and runtime notes can both be surfaced near the currently relevant
  participant or encounter context.

## Open Questions Kept Intentionally Open

The following should remain flexible for now:

- the exact structured statblock field inventory;
- the exact configuration shape for conditional entries and selected variations;
- the future typed ref model behind note links;
- whether some notes later deserve stronger domain structure;
- how much of concept should be shown inline vs popup vs pinned reference;
- when and how runtime notes are promoted into canonical content or session
  records.

The point of this document is not to lock every field. It is to establish the
correct data flow and ownership boundaries before more UI and domain code are
built on top of them.
