# TTRPG App Technical Direction Draft

This note is the outcome of the technical-direction session prompted by
[`next-session-technical-details-prompt.md`](./tasks/next-session-technical-details-prompt.md).

It is intentionally implementation-facing. It does not re-open product
architecture except where a technical choice depends on it.

## Product Constraints That Matter Technically

From the current architecture drafts, the main constraints are:

- the app is local-first in spirit, even if sync is added later;
- the near-term priority is UI and workflow prototyping;
- `Building` and `Running` are two interfaces over the same underlying content;
- the data model is hybrid: structured entities, structured blocks, and rich text;
- Markdown import matters for migration, while backups can use structured formats;
- multiple navigation surfaces matter: document, search, graph/map, and contextual previews;
- multiple UI prototypes should be possible without committing too early to one shell or one database.

These constraints push toward a shell-neutral frontend core, explicit storage
boundaries, and a prototype strategy that validates workflows before backend
heaviness.

## Chosen Technical Decisions

### 1. Start web-first, not Electron-first

The first real prototype should be a web app that runs well on desktop and can
later be packaged or wrapped if needed.

Reasoning:

- it is the fastest path to validate interaction-heavy workflows;
- it keeps phone access possible later through a browser or PWA;
- it avoids locking into desktop-specific APIs before they are clearly needed;
- desktop packaging can be added later around the same frontend if the app
  proves to need stronger local file/system integration.

This means the current decision is not `Electron vs Web`. It is `Web first, desktop wrapper later if justified`.

### 2. Use an Nx monorepo from day one

Use Nx because:

- you already have working setup knowledge and generators;
- the project benefits from explicit boundaries between app shells, domain
  logic, importers, storage adapters, and UI modules;
- it supports multiple prototypes without turning the repo into one large app
  folder.

This should be a practical monorepo, not an over-designed one. Start with a
small number of libraries and extract only when a boundary becomes real.

Storybook should be part of this setup from the beginning, but as a prototyping
tool rather than as a separate product surface.

### 3. Use React + TypeScript, with TanStack Start for the main web shell

Use TanStack Start for the main web app, but in a conservative way:

- treat it primarily as a typed routing and application shell;
- do not lean on server functions or backend coupling in v0;
- keep domain logic and storage adapters outside framework-specific files;
- if Start becomes friction, falling back to TanStack Router SPA should be
  straightforward because Start is built on Router.

This fits the goal of experimenting with TanStack Start without making the
entire architecture depend on full-stack framework behavior.

### 4. Treat storage as an adapter boundary, not the center of the architecture

Define storage interfaces early, but do not commit to the final database yet.

For the first prototype:

- start with manually prepared JSON fixtures or Storybook args;
- only add persistence when the prototype proves it needs it;
- if browser-local persistence becomes useful, use IndexedDB through a wrapper
  such as Dexie;
- keep canonical persistence behind repository interfaces once storage pressure
  becomes real.

This keeps the first UI slice fast while preserving a path to SQLite, browser
storage, or sync-backed storage later.

### 5. Keep the frontend stack visually and technically simple

Do not introduce a UI kit or styling framework for the first prototypes.

For the initial implementation:

- use standard HTML elements wherever possible;
- use plain CSS with simple class names;
- use CSS Modules only if local scoping starts to matter;
- avoid Tailwind, shadcn/ui, and similar abstraction layers in the prototype phase;
- add focused utility libraries for specific interaction problems only when a
  real need appears, for example popper/positioning helpers.

This is a deliberate constraint. The goal is to evaluate information design,
layout, and workflow behavior without spending early effort on design-system
plumbing or utility-class architecture.

### 6. Defer Convex as primary storage

Convex is not the right primary persistence choice for the first local-first
prototype.

It may still be useful later for sync or a hosted/mobile companion scenario,
but it should be treated as a later experiment, not the foundation.

Reasoning:

- the project is currently local-first and solo;
- early work should not depend on a backend process being part of normal usage;
- import/export and local trust are more important right now than backend
  reactivity;
- the first technical problem is workflow validation, not multi-device sync.

### 7. Keep app state split between canonical content and run-state

Make this separation explicit from the beginning:

- canonical content: settings, scenes, locations, creatures, blocks, notes;
- run-state: encounter HP, temporary conditions, quick notes, active scene,
  timers, play session state.

This matters because the product drafts clearly distinguish authoring content
from at-table ephemeral state.

## Intentionally Deferred Decisions

These should not block the first implementation pass:

- final desktop wrapper choice: Electron, Tauri, or no wrapper for a while;
- final canonical database: SQLite, PGlite, IndexedDB-first, or something else;
- whether sync exists at all in v1;
- whether Convex is used later for sync or not used at all;
- whether a dedicated UI kit or styling framework is needed later;
- which helper library to use for floating panels, popovers, or positioning;
- full relation engine design for inferred vs explicit links;
- graph/map rendering stack;
- rich text editor choice beyond what is needed for the first prototype;
- full import fidelity for the entire vault.

The project should only decide these once the first workflows expose the real
pressure points.

## Proposed Initial Repo Structure

```text
/apps
  /web
    TanStack Start app
  /desktop
    optional later shell wrapper only

/libs
  /domain
    entity ids, schemas, shared types, content model
  /ui
    shared components and layout primitives
  /prototype-data
    optional shared mock data once stories and routes start reusing it

/.storybook
  shared Storybook config

/tools
  /generators
    Nx generators and repo scaffolding helpers

/docs
  optional later technical notes if planning docs outgrow /Planning
```

Notes:

- start only with `web`, `domain`, and `ui`;
- add Storybook immediately for isolated UI and page-state prototyping;
- add `prototype-data` only when stories and routes start duplicating mock data;
- add `storage-core` only when persistence and app-state pressure become real;
- add `import-markdown` only when manual sample preparation becomes the bottleneck;
- add `desktop` only when there is a concrete need for file APIs, media
  integration, or better offline packaging;
- keep prototype routes inside one web app at first instead of generating many
  separate apps too early.

## Prototype Strategy

Start with Storybook for isolated UI and page-state exploration.

Then use one main app with explicit prototype routes, for example:

- `/lab/scene-reading`
- `/lab/running-scene`
- `/lab/entity-navigation`

This hybrid approach is better than spinning up many separate apps immediately because:

- Storybook keeps UI iteration lightweight and fast;
- shared routing, layout, and mock data stay in one place;
- comparison between prototype ideas is faster;
- discarded experiments do not leave behind full app scaffolds.

If one prototype later becomes operationally different enough, split it into a
dedicated app then.

## Proposed First Prototype Target

The first prototype should be a `Running Scene Workspace`.

Use a narrow slice from the abandoned laboratory material.

First explore it in Storybook, then validate it in the app.

Implement:

- a scene reader focused on fast at-table use;
- a structured summary rail for encounter, hazard, treasure, and rules blocks;
- click/hover previews for linked creatures, hazards, and rule references;
- pin-to-side-panel behavior for referenced content;
- lightweight run-state: checkboxes, temporary notes, simple encounter state;
- optional soundtrack/media stub without building full media management yet.

Why this slice first:

- it tests the most interaction-sensitive workflow from the drafts;
- it validates contextual navigation and preview behavior early;
- it forces the data model to support structured blocks plus free text;
- it reveals quickly whether the app feels better than Obsidian for actual play.

Do not start with:

- a full graph view;
- a full campaign database;
- generalized CRUD screens for every entity type;
- full bidirectional Markdown round-tripping.

Those are important later, but they are weak first proof points.

## Import Pipeline Boundary

Treat Markdown import as an ingestion pipeline, not as the runtime model.

It is not required for the first UI prototype if manually prepared sample data
gets you to workflow validation faster.

Recommended boundary:

1. Parse Markdown and frontmatter.
2. Extract links, headings, block-like sections, tags, and media references.
3. Map known patterns into typed entities and typed blocks.
4. Preserve unmatched text and unknown metadata as raw source payload.

This allows:

- partial structured import without losing content;
- incremental improvement of import rules;
- future export and migration without pretending the Markdown source model is
  identical to the internal runtime model.
- completely skipping importer work in the earliest prototype iteration.

## Local-First Architecture Direction

The architectural shape should be:

`UI -> application/use-case layer -> repository interfaces -> storage adapters`

Not:

`UI -> database-specific models everywhere`

That keeps these choices reversible:

- browser-only prototype vs packaged desktop app;
- IndexedDB vs SQLite vs sync-backed store;
- Start-specific route loading vs other app shells later.

## Technical Risks and Reversible Choices

### Risk: over-investing in framework features too early

Mitigation:

- keep TanStack Start usage shallow;
- keep core logic and storage outside route files;
- avoid server functions until there is a real backend need.

### Risk: choosing a database before the UI model is proven

Mitigation:

- prototype first with Storybook args and small JSON samples;
- add repositories when the app starts exercising real persistence concerns;
- delay the final database decision.

### Risk: multiple prototypes turning into repo chaos

Mitigation:

- one main app first;
- prototype routes instead of many apps;
- enforce library boundaries around domain, storage, and shared UI.

### Risk: desktop wrapper concerns distorting the first architecture

Mitigation:

- design for wrapper compatibility;
- do not make wrapper-specific APIs part of the core app yet.

## Setup Tasks To Start Implementation

1. Create an Nx workspace using your existing proven baseline and generators.
2. Generate `apps/web` with TanStack Start.
3. Add Storybook for the web app or shared UI library.
4. Add initial libraries:
   - `libs/domain`
   - `libs/ui`
5. Pick one narrow source sample:
   `Salty Scars/Приключения/Исследование заброшенной лаборатории/`
6. Build a few Storybook stories for:
   - one scene page layout
   - one linked preview card
   - one pinned side panel state
   - one encounter summary state
7. Implement `/lab/running-scene` using the same sample data shape.
8. Add contextual preview and pinning before adding editing.
9. Add a minimal run-state store only after the reading flow works.
10. Only then decide whether importer work or local persistence is the next bottleneck.

## Short Answer To The Original Stack Questions

### Electron vs Web

Choose web first. Keep desktop packaging as a later wrapper decision.

### TanStack Start vs something simpler

TanStack Start is reasonable if you want to learn it, but treat it as routing
and app shell, not as a mandate to design backend infrastructure now.

### Convex

Defer it. It is a possible later sync/backend experiment, not the right first
foundation for this local-first prototype.

### Monorepo shape

Yes to Nx monorepo. Start with one app, Storybook, and only a couple of real
libraries. Add more splits only when the code actually earns them.

## External References Consulted

These sources influenced the stack guidance above:

- TanStack Start overview:
  [tanstack.com/start/docs/overview](https://tanstack.com/start/docs/overview)
- TanStack Start React docs:
  [tanstack.com/start/docs/docs](https://tanstack.com/start/docs/docs)
- Convex local deployments:
  [docs.convex.dev/cli/local-deployments](https://docs.convex.dev/cli/local-deployments)
- Convex self-hosting:
  [docs.convex.dev/self-hosting](https://docs.convex.dev/self-hosting)
- Electron introduction:
  [electronjs.org/docs](https://www.electronjs.org/docs/)
- Electron process model:
  [electronjs.org/docs/latest/tutorial/process-model](https://www.electronjs.org/docs/latest/tutorial/process-model)
- Tauri overview:
  [v2.tauri.app/start](https://v2.tauri.app/start/)
- Tauri frontend configuration:
  [v2.tauri.app/start/frontend](https://v2.tauri.app/start/frontend/)
