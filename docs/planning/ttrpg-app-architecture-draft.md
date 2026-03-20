# TTRPG App Architecture and Domain Model Draft

## Purpose

This document captures the current architectural direction for a future TTRPG prep-and-running app based on the explored vault structure.

It is not a full product roadmap and not a PRD. It is an early architecture/domain-model draft intended to:

- preserve the current understanding of the problem space;
- identify the main data structures the app will need;
- record important constraints before implementation starts;
- leave room for later design work, especially around history, timelines, and UI.

## Scope of This Draft

This draft is based primarily on:

- `Salty Scars/`
- `Salty Scars/Приключения/Исследование заброшенной лаборатории/`
- `PF2e/`
- `templates/`

The goal is to identify structures the app must support, not to fully design the product.

## Current Working Position

### Source of truth

The long-term source of truth can be a database rather than Markdown files.

Markdown remains useful for:

- initial import from the existing vault;
- optional migration back to Obsidian or elsewhere if needed.

Structured backups do not have to be Markdown. JSON or another structured export
format may be a better backup mechanism for the app's internal model.

This is important because the vault already contains meaningful structure, but some information is awkward to model in frontmatter alone and difficult to query reliably from text.

### Product modes

The app should support two primary modes over the same underlying data:

- `Building`: editable, structure-aware, optimized for prep and authoring.
- `Running`: mostly non-editable, optimized for at-table use, with a way to jump into editing when needed.

These are not separate datasets. They are separate interfaces over the same canonical content.

### Relationship to Obsidian

The app should not assume that Obsidian remains the permanent platform.

Obsidian is still a useful reference point because the current vault demonstrates several desirable properties:

- flexible text authoring;
- easy linking;
- low friction for evolving structure;
- graph-like navigation.

However, the future app may diverge from Obsidian if stronger structure, better running tools, and richer interactions require it.

## Core Architectural Principle

The app should use a hybrid model:

- structured top-level entities;
- structured sub-objects/blocks within entities;
- rich free-form text around and between those structures;
- explicit relations and inferred relations coexisting.

This is necessary because the vault is neither fully rigid nor fully unstructured.

For example:

- a scene is a stable entity type;
- inside a scene, sections like `Существа`, `Ловушки`, `Сокровища`, and `Ситуативные правила` behave more like structured child objects than plain headings;
- some content remains best expressed as free text;
- simple wikilinks are useful and should not require immediate formalization.

## Domain Boundaries

### System

Represents the rules framework in use, for example:

- PF2e
- Mausritter
- SWADE

The system may imply a canonical world or may not. The app should not rely on that implication.

### Setting

`Setting` is the preferred top-level fictional context.

A setting is the playable space prepared for a specific game line. It can include:

- places;
- people;
- factions;
- history;
- events;
- adventures.

The architecture should not introduce a separate `World` concept as a first-class top-level model. `Setting` is the highest item in the current world-building hierarchy. Different campaigns that happen in what would nominally be the same world can still live in different settings if they should not affect each other.

### Campaign

A campaign is an ongoing line of play within a setting.

### Party

A party represents a specific group of player characters or protagonists. A spin-off can use a different party while still affecting the same setting.

### Adventure

An adventure is a contained scenario, arc, or module within a setting and usually within a campaign.

### Session

A session is one real play session. It should be able to hold both play-log information and structured updates related to the session.

## Main Content Entity Types

The current vault suggests the following first-class entity types:

- `Setting`
- `System`
- `SystemContent`
- `Campaign`
- `Party`
- `Adventure`
- `Session`
- `Scene`
- `Location`
- `Creature`
- `Hazard`
- `Group` / `Faction`
- `Item`
- `Asset`
- `RandomTable`
- `Map`
- `Concept`
- `Idea`

### Notes on entity types

#### Scene

A scene is one of the most important entities. It is not just a text note. It is a playable unit that may contain:

- descriptive text;
- local navigation;
- linked locations;
- encounters;
- traps;
- treasures;
- situational rules;
- soundtrack cues;
- references to system rules.

#### SystemContent

`SystemContent` is an umbrella for system-scoped reference and definition records.

It should cover at least:

- rule references;
- creatures;
- hazards;
- items;
- actions;
- traits;
- conditions;
- spells;
- abilities;
- templates;
- cheat sheets and authoring references.

This distinction matters because "rules" in the current vault are not only ruling advice. They also include in-system entities and authoring references such as [`Создание существ.md`](/mnt/e/Persisted/НРИ/PF2e/Правила/Создание%20существ.md).

PF2e should therefore be treated as a structured system content corpus rather than only as loose Markdown pages. Foundry JSON is a likely import source for PF2e data, but the app should also preserve locally-authored system material already present in the vault.

#### Idea

`Idea` should be a first-class entity rather than only a free-text TODO fragment.

An idea may represent:

- a possible future fact;
- an unresolved option;
- an alternative interpretation;
- a possible retcon;
- a prep hook;
- a weak association between entities.

Ideas should be linkable to any entity and should support weaker or more speculative relations than canonical content.

#### Asset

Assets should cover at least:

- music/audio;
- images;
- potentially map media and handouts later.

Music should be a first-class feature rather than a passive file reference.

#### RandomTable

`RandomTable` should be treated as a small but important building block.

Random tables may appear:

- as standalone authored entities;
- as linked support content for scenes, encounters, or rules;
- as reusable generators during Building or Running.

They are structurally small, but behaviorally important.

## Structured Blocks Inside Entities

Top-level entities are not sufficient. The app also needs structured blocks embedded within or attached to those entities.

The current vault strongly suggests at least the following block types:

- `Encounter`
- `TrapBlock` or `HazardBlock`
- `TreasureBlock`
- `SituationalRuleBlock`
- `SkillCheckBlock`
- `SoundtrackCue`
- `TimerBlock`
- `NarrativePrompt`

This reflects how content is actually authored now. For example, in a scene, the `Существа` section often behaves as an encounter object with its own required parts:

- participants;
- threat/budget;
- dramatic question;
- conflict sources;
- tactics or special notes.

The same applies to `Ловушки`, `Сокровища`, and situational mechanics.

The app should therefore allow a scene to own a set of typed child objects rather than flattening everything into one monolithic note body.

### System-agnostic vs system-specific block structure

Some blocks should intentionally be split into:

- a system-agnostic shell;
- a system-specific payload.

For example, an `Encounter` block may contain system-agnostic fields such as:

- dramatic question;
- conflict sources;
- local notes;
- soundtrack;
- scene context.

And it may also contain system-specific fields such as:

- difficulty calculation;
- participant stat references;
- hazard references;
- XP or threat budget;
- mechanical notes tied to the active system.

This split is necessary because the app should support multiple systems while preserving useful recurring structure across them.

## Relations and Graph Model

### First-class relations

Relations should be first-class records, not just raw links.

This is required because some relations need their own data. A connection between two rooms can carry:

- traversal type;
- description;
- visibility/discovery rules;
- door/lock metadata;
- trap/hazard data;
- conditions for passage.

This means a relation is often closer to a domain object than to a simple edge.

### Relation examples

The graph should be able to represent at least:

- `contains`
- `located_in`
- `belongs_to`
- `appears_in`
- `leads_to`
- `guards`
- `knows`
- `fears`
- `opposes`
- `references_rule`
- `uses_asset`
- `derived_from`

These should be extensible. User-defined edge types are desirable.

### Explicit vs inferred relations

The app should support two kinds of relations:

- `Explicit relations`: authored intentionally, typed, editable, metadata-bearing.
- `Inferred relations`: derived from wikilinks, embeds, canvas references, backlinks, heading links, and similar sources.

This enables a useful workflow:

1. A plain text link implies there is some relation.
2. The app can surface that inferred relation.
3. The user can optionally promote it into an explicit typed relation.

This keeps low-friction writing while still supporting stronger structure where needed.

## Maps and Visual Graphs

The current Obsidian `.canvas` file demonstrates that visual layout matters, but the future app should not depend on `.canvas` as the permanent internal format.

The app should eventually support a general node-and-edge visual layer that can be used for:

- dungeon room navigation;
- scene transitions;
- faction relationships;
- conceptual links;
- creature/place/idea connections.

This should not be limited to topological maps. It is a general graph surface.

## Operating Layers: Content, Run State, History

The architecture should distinguish at least three layers.

### 1. Canonical content

Canonical content is the current authored state of the setting and its entities.

Examples:

- current scene text;
- current creature sheet;
- current room connection definition;
- current adventure structure.

Direct editing updates this layer.

### 2. Run state

Run state is temporary play-state used during live sessions.

Examples:

- initiative;
- HP;
- conditions;
- timers;
- encounter participants;
- temporary notes for the current run.

This should be separate from canonical content.

### 3. History

History records important changes caused by play.

Examples:

- a dungeon entrance was collapsed;
- a faction changed attitude;
- an item was recovered;
- an NPC died;
- an important room ceased to exist in its previous form.

This is neither the same as direct edits nor the same as transient run state.

### 4. Ideas and exploratory prep

Ideas and exploratory prep should be treated as a distinct layer of weaker, more revisable material.

Examples:

- random prep thoughts;
- unresolved alternatives;
- possible links between entities;
- notes tagged like `#todo/ideas`;
- speculative content that may later become canonical or may be discarded.

This layer is important because much of preparation starts as loose possibility space rather than as finalized fact.

## History Tracking: Current Position

History tracking should be planned for early but not overdesigned immediately.

The current preferred direction is selective historical tracking:

- direct edits simply update the current canonical record;
- session updates may optionally include structured change entries;
- change entries capture selected old/new values and the affected entities;
- entity views should show current state plus tracked historical changes and the sessions that caused them.

This is not full event sourcing.

The app should not assume that every field change in the database is historically meaningful or worth preserving.

### Why this model is useful

It supports the intended workflow:

- prep content remains easy to edit;
- important world evolution can be preserved;
- logs can explain how the current state came to be;
- history remains queryable without making the entire architecture depend on replaying events.

### Editorial vs in-fiction changes

Not all historically meaningful updates come from running a session.

The architecture should leave room for at least two broad classes of tracked change:

- `In-fiction changes`: changes caused by events in play.
- `Editorial changes`: changes made later during prep because older content was clarified, connected, reinterpreted, or refined.

This matters because a user may later update an old scene based on information prepared or discovered much later. That should be trackable without pretending the update itself happened in fiction during the original session.

## Sessions, Logs, and Change Records

A session should support both:

- a high-level narrative log;
- structured change records linked to entities.

This allows a session update to say both:

- what happened in prose;
- what changed in the setting in a structured way.

### Likely change record fields

At minimum, a structured change record may need:

- `session_id`
- `setting_id`
- `campaign_id` (optional)
- `party_id` (optional)
- `adventure_id` (optional)
- `entity_id`
- `change_type`
- `summary`
- `old_value_snapshot` (optional)
- `new_value_snapshot` (optional)
- `effective_in_game_time` (optional)
- `created_at_real_time`

This draft does not define the full history schema. It only records that the architecture should leave room for it.

Editorial updates made outside a running session may need a related but separate change-record workflow. They should be tracked, but not conflated with in-fiction session events.

## Time and Calendar

If history matters across campaigns and spin-offs, then time matters too.

The app should reserve space for:

- real-world timestamps for sessions;
- in-game timestamps for fictional events;
- calendar support for settings where timekeeping matters;
- ordering and comparing events across parallel campaigns.

This is a substantial subsystem and should not be designed in full yet, but architecture should not block it.

## Running Tools Implied by the Current Vault

The current content implies several high-value running features:

- scene-centric running view;
- one-click soundtrack playback from a scene;
- encounter tracker with optional autofill;
- rule lookups from creature/scene content;
- graph/map navigation between scenes and related entities;
- fast jumps from scene -> creature -> rule and back;
- Obsidian-like hover previews and drill-down popups;
- a mode for at-table reading without accidental editing.

Hover previews and lightweight popups are not cosmetic details. They are a core navigation pattern for dense linked content and should be treated as an important interaction requirement.

### Encounter tracker direction

The tracker should be manual-first with optional autofill from a scene and linked creatures.

It should support both ordinary combat state and higher-level encounter metadata such as:

- dramatic question;
- conflict sources;
- special constraints or timers;
- local notes for the current run.

## AI / Agent Integration

An embedded agent is a plausible part of the future product.

It could assist in at least two different contexts:

- `Building`: drafting, worldbuilding, structuring content, finding rules.
- `Running`: navigating to the right content quickly, answering rules questions, generating live material, or helping manage play-state.

This should be treated as an interface over the same data model, not as a separate data silo.

## Import and Migration

Import is important as a migration/bootstrap path, but it should not block the
first UI prototypes.

The earliest prototypes can use hand-written or copy-pasted structured sample
data if that is the fastest way to validate workflows.

When importer work begins, it should be able to read at least:

- Markdown files;
- frontmatter;
- wikilinks;
- aliases;
- headings;
- block anchors where relevant;
- embedded media references;
- canvas graph data where useful.

Import should be failure-tolerant. It should not crash on partial errors or ambiguous content.

Import does not need to solve every ambiguity perfectly. It only needs to preserve enough structure to make the content usable and improve it over time.

Markdown export should be treated as optional portability work, not as a
required counterpart to initial import. Structured export/snapshots are a valid
backup path even if Markdown round-tripping never becomes a first-class feature.

The importer should ideally:

- continue when some files or sections fail to parse cleanly;
- preserve raw source where parsing is uncertain;
- report ambiguities and failures in a structured way;
- make those reports usable by a human or an agent during cleanup and migration.
- support rollback or discard if a given import pass is too broken to keep.

## Architectural Guardrails

The following assumptions should be preserved in later planning:

- Do not assume Markdown remains the canonical format.
- Do not assume Markdown export is required for every version of the product.
- Do not assume Obsidian remains the host platform.
- Do not assume one setting, one campaign, one party, or one system.
- Do not collapse transient run state into canonical content.
- Do not collapse history into ordinary edits.
- Do not collapse editorial change history into play history.
- Do not reduce all relations to plain links.
- Do not force all free text into rigid schemas too early.
- Do not force weak ideas to masquerade as canonical facts.

## Prototyping and Flexibility

The architecture should support exploratory prototyping rather than assuming the first implementation is the final one.

This matters because multiple parallel UI prototypes may be a better way to discover the right interaction model than trying to build a single production path immediately.

The architecture should therefore prefer:

- stable identifiers;
- replaceable storage adapters where practical;
- import/export paths that reduce lock-in;
- domain boundaries that allow UI experiments without rewriting everything;
- lightweight isolated UI prototyping before backend/storage commitments;
- a core model that can tolerate incomplete understanding early on.

This does not imply that multiple UIs must permanently coexist in the finished app. It means the architecture should allow multiple prototype directions to be explored and only the proven interaction patterns to be carried forward into the product.

## Project Constraints

This is currently a solo local project, not a multi-user product.

That should influence planning assumptions:

- collaboration, auth, and multi-tenant concerns are not first-order requirements;
- local-first workflows are acceptable;
- migration, reversibility, and flexibility matter more than formal product hardening;
- decisions can optimize for the actual author/operator rather than for generalized team workflows.

## Near-Term Design Priorities

The next architectural/design passes should probably focus on:

1. interaction and UI workflow draft;
2. system content model draft;
3. ideas / facts / history / editorial-changes model;
4. entity and block catalog;
5. import and ambiguity-reporting strategy.

Database and storage design should follow those passes rather than lead them.

History, calendars, and advanced timeline behavior should be explicitly reserved for but not designed in full until the core model and workflows are stable enough.

## Open Questions

The following remain intentionally open:

- exact database choice;
- exact UI form of the graph/map surface;
- whether the app becomes a standalone product, an Obsidian-adjacent tool, or a plugin;
- how much structure should be inferred automatically vs authored explicitly;
- how granular history/change tracking should become;
- how far to normalize imported system data;
- how much of Running mode should support quick-edit behavior.

## Ambiguities Worth Keeping Visible

The following ambiguities are not blockers yet, but they should stay visible during technical planning because they will affect data shape and UI behavior.

### 1. System definitions vs setting/adventure instances

The app will likely need to distinguish between:

- a reusable system-level definition;
- a setting-level or adventure-level use of that definition.

Examples:

- a PF2e creature definition vs a creature placed in a specific scene;
- a system hazard definition vs a local hazard configured for one dungeon room;
- a generic item definition vs a specific authored treasure in an adventure.

This is ambiguous now because the current vault often blends reusable definition and local authored use into a single note or local block.

The architecture does not need to solve this fully yet, but the distinction should remain visible because it will affect:

- import strategy;
- encounter modeling;
- editing flows;
- reuse of compendium content.

### 2. Session-run queue vs session record vs historical change record

The app will likely need to distinguish between:

- quick notes and bumped entities collected during live play;
- the finalized session record created when closing a run;
- structured historical changes applied to entities afterward.

This is ambiguous now because these three things are related, but they are not the same object.

The architecture does not need to fully normalize them yet, but the distinction should remain visible because it will affect:

- Running mode tooling;
- wrap-up workflows;
- history tracking;
- editorial updates after play.

## Suggested Next Documents

Reasonable follow-up planning documents after this one:

- interaction and workflow architecture draft;
- system content model draft;
- ideas / facts / history / editorial-changes draft;
- entity catalog and field inventory;
- block type catalog;
- import strategy from Markdown/Obsidian vault.
