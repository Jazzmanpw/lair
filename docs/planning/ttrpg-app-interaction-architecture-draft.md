# TTRPG App Interaction and Workflow Architecture Draft

## Purpose

This document captures the current interaction architecture direction for the future TTRPG app.

It is complementary to the domain-model draft:

- the domain-model draft describes what kinds of data and structures the app should support;
- this document describes how a user is likely to move through that data while building and running a game.

This is intentionally interaction-first. The goal is to define useful workflows and navigation patterns before locking in a database-first design.

## Why This Draft Exists

The likely success or failure of this app will depend heavily on interaction quality:

- how quickly content can be reached;
- how much context can stay visible at once;
- how much structure the UI can expose without slowing down writing;
- how well the app supports switching between free exploration and focused play support.

The current vault already implies specific interaction patterns, especially around dense linking, popups, graph navigation, and mixed structured/free-form content.

## Product Modes

The app should support at least two major modes:

- `Building`
- `Running`

These are two interfaces over the same content, not separate products.

## Building Mode

`Building` mode is for prep, authoring, restructuring, linking, annotating, and evolving ideas into canonical content.

It should optimize for:

- fluid editing;
- low-friction creation of new notes/entities;
- restructuring content without high ceremony;
- linking and relinking related material;
- mixing free text with structured blocks;
- exploring uncertain or alternative ideas.

### Building mode should make easy

- scaffolding a scene from a template or structure draft rather than starting from an empty page;
- adding an encounter block inside a scene;
- linking a creature, hazard, item, random table, or system reference into that block;
- building creatures, hazards and items following system rules with inline guidance;
- attaching soundtrack and media;
- browsing related setting content without losing the current editing context;
- capturing loose ideas without forcing immediate schema decisions;
- later promoting ideas into canonical content or explicit relations.

## Running Mode

`Running` mode is for at-table use.

It should optimize for:

- quick reading;
- minimal accidental editing;
- compact, high-value context;
- fast navigation across related content;
- lightweight live state management.

### Running mode should make easy

- opening a scene and immediately seeing the relevant encounter/trap/treasure/rule summary;
- playing scene music in one interaction;
- opening creature or rule references without losing the current scene;
- tracking encounter state with minimal friction;
- moving from room to room or scene to scene quickly;
- recording short live notes that can later become structured updates if needed.

## Shared Interaction Principle

The same content should be reachable through multiple interaction surfaces:

- document view;
- outline/block view;
- graph/map view;
- search;
- contextual side panels;
- popups/hover previews.

The app should not force a single navigation model.

## Core Navigation Patterns

### 1. Document-centric navigation

This is the closest analogue to current Obsidian usage.

The user opens a scene, creature, setting note, or rules page and navigates primarily through links, sections, embeds, and local structure.

This remains important because it supports thinking through text.

### 2. Graph/map-centric navigation

The user starts from a map or graph and navigates spatially or relationally:

- room to room;
- scene to scene;
- faction to faction;
- creature to location;
- idea to fact.

This is important both for dungeon prep and for broader setting exploration.

### 3. Search-centric navigation

The user starts with a direct search intent:

- find a rule;
- find a creature;
- find a previous session;
- find all scenes connected to a location;
- find unresolved ideas related to an adventure.

### 4. Contextual navigation

The user stays on the current page and explores nearby context through panels or popups rather than by fully leaving the page.

This is especially important for rules-heavy material.

## Popups and Hover Previews

Obsidian-like hover previews should be treated as a first-class interaction pattern.

This is not a minor convenience. It is one of the best ways to navigate dense linked content without losing reading flow.

### Required qualities of this interaction

- open linked content without navigating away;
- support recursive drilling into further links;
- work for rules, creatures, scenes, and structured blocks;
- allow quick inspection and dismissal;
- allow promoting a preview into a pinned pane or durable side panel;
- preserve reading position in the parent view;
- work in both Building and Running modes.

This interaction is particularly important for:

- system reference content;
- cheat sheets;
- creature abilities;
- conditions and actions;
- scene-local linked entities.

## Editing Model

The app should support a spectrum between free writing and structured editing.

It should not force every interaction into forms, but it also should not bury all structure inside prose.

### Likely editing surfaces

- rich text/document editor;
- structured block editors for known block types;
- relation editor for explicit links/edges;
- quick-add UI for ideas, assets, and references;
- side-panel editing for metadata without leaving the current page.

### Editing principle

The app should make the structured path available when useful, not mandatory before the user is ready.

## Primary Workflow Families

### Workflow A: Iterative scene shaping

Typical flow:

1. Start with a structure draft, a template, or a partially formed scene.
2. Jump between scenes, ideas, and related entities while the overall shape is still emerging.
3. Add or revise structured blocks as the adventure becomes clearer.
4. Link more ideas and support content into scenes over time.
5. Return later to write denser canonical content such as layout, interactive elements, mechanics, and references.
6. Repeat across the whole adventure rather than trying to finish one scene in a single pass.

This workflow should feel iterative and sculptural rather than linear.

### Workflow B: Explore and shape ideas

Typical flow:

1. Capture loose ideas quickly.
2. Link them to scenes, factions, creatures, or adventures.
3. Visualize related ideas and nearby facts.
4. Promote selected ideas into canonical content or explicit relations.
5. Archive or discard dead-end ideas.

This should feel substantially better than burying `#todo/ideas` fragments inside ordinary notes.

### Workflow C: Run a scene

Typical flow:

1. Open the current scene in Running mode.
2. See local summary blocks first.
3. Start music from the scene.
4. Open linked creatures/rules in popups or side panels.
5. Use the encounter tracker if needed.
6. Record short notes or flags for later updates.

### Workflow D: Update content after play

Typical flow:

1. Start a session run explicitly or implicitly by creating the first quick run note.
2. During play, bump short notes, reminders, and affected entities into a queue.
3. Close the session run through a dedicated wrap-up flow.
4. Generate a new session record and review the queued notes.
5. Turn those notes into a narrative summary and structured change records.
6. Update canonical content where needed.
7. Optionally connect new facts or ideas to older scenes.

This workflow must support both play-driven consequences and later editorial clarification.

## Encounter Interaction Model

Encounter handling should be manual-first with optional autofill.

### Encounter view should combine

- system-agnostic prep context:
  - dramatic question
  - conflict sources
  - notes
  - soundtrack
  - scene context
- system-specific mechanics:
  - participants
  - difficulty or threat
  - linked stat references
  - initiative / HP / conditions during play

### Encounter editing should support

- adding participants manually;
- pulling participants from linked scene content;
- linking custom and compendium creatures;
- recording run-state separately from canonical encounter design;
- using random tables from scene or encounter context without losing the current view.

## Graph and Map Interaction Model

The graph surface should support more than simple navigation.

It should allow the user to:

- inspect why two things are connected;
- distinguish explicit vs inferred relations;
- edit explicit relation details;
- upgrade inferred links into typed relations;
- attach metadata to powerful edges such as doors, passages, or social relations;
- move between spatial graphs and conceptual graphs without changing mental model.

## Sidebars, Panels, and Multi-Context Reading

The current vault usage suggests that single-page navigation is not enough.

The app should support some combination of:

- pinned side panels;
- temporary previews;
- split panes;
- running sidebar tools;
- compact inspectors for linked entities and blocks.

This is important because prep and running both benefit from keeping the source context visible while looking up related material.

The current layout example also suggests that the app should support pane-heavy workflows where:

- one pane holds the current anchor note;
- one or more panes hold related scene or rules content;
- one area can remain dedicated to a map/graph surface;
- lightweight previews can be promoted into stable panes when needed.

## Search and Discovery

Search should support more than title lookup.

It should eventually support:

- entity-type filtering;
- block-type filtering;
- system-content filtering;
- idea vs canonical-content filtering;
- session/history filtering;
- relation-aware discovery;
- "show me what is connected to this" workflows.

## Error-Tolerant Import Experience

Import should not be treated as a one-shot backend task with opaque failures.

At the same time, import should not be a prerequisite for the first interaction
prototypes. Early UI exploration can and probably should start from manually
prepared sample data if that is faster.

From the interaction perspective, import should produce:

- visible issue reports;
- actionable ambiguity lists;
- inspectable raw source when parsing is uncertain;
- a path to manual or agent-assisted repair.

The import UI should help the user continue migration instead of forcing a clean parse before the app becomes usable.

If an import pass is too broken to be useful, the user should also be able to roll it back or discard it.

## Prototyping Strategy Implications

The interaction architecture should support multiple prototypes rather than assume one linear implementation path.

This suggests a staged prototyping strategy:

1. prototype isolated page and component states in Storybook or an equivalent lightweight environment;
2. prototype document-centric workflows in the actual app shell;
3. prototype Running mode scene view and encounter tools in the actual app shell;
4. prototype graph/map workflows once the lower-level navigation patterns are clearer;
5. compare prototypes and carry forward the useful interaction patterns into the product direction.

### Why this matters architecturally

If multiple interaction experiments are expected, the underlying architecture should favor:

- stable core IDs;
- thin UI-specific adapters;
- separation between domain logic and presentation logic;
- flexible import/export paths;
- avoidance of premature storage lock-in driven by one prototype.

## Near-Term UI Prototyping Candidates

The most useful early UI prototypes are likely:

1. Scene page with structured blocks and linked previews.
2. Running-mode scene page with music and encounter sidebar.
3. Graph/map view with typed edges and inspectors.
4. Idea-capture and idea-promotion workflow.
5. System-content drill-down view with popup navigation.

These should be lightweight prototypes, not production commitments.

The first pass of items 1, 2, and 5 can be explored in Storybook with static
props, mocked states, and minimal fixture objects before any storage layer or
import pipeline is involved.

## Open Questions

The following interaction questions remain intentionally open:

- what the main navigation shell looks like;
- whether Building and Running are route-level modes, layout presets, or workspace presets;
- how many panes/panels should be available simultaneously;
- whether the workspace should be screen-bounded or scrollable beyond the visible viewport;
- whether the layout model should support a larger-than-screen tiled workspace that can be panned horizontally and vertically;
- when hover preview should become pinned content;
- how much structured editing should happen inline vs in inspectors/forms;
- how much of Running mode should support direct edits vs queued updates;
- how graph editing should coexist with document editing.

## Project Constraints

This is currently a solo local project.

That affects interaction planning:

- collaboration-heavy workflows are not primary;
- optimizing for one user's actual habits is acceptable;
- experimentation and reversible prototypes matter more than generalized team workflows;
- local-first ergonomics matter more than team governance concerns.

## Suggested Next Step After This Draft

The next practical step should be:

1. prototype a few high-value screens in Storybook or an equivalent lightweight environment;
2. select the most promising screen interactions;
3. then mount those interactions in a thin app prototype to validate actual workflow, navigation, and run-state behavior.
