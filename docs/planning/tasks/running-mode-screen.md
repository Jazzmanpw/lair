# Running Mode Screen

## Goal

Design the main screen the GM uses during play.

This is broader than an encounter view. The screen must work while the party is
exploring a room with no encounter, while an encounter is active without
initiative, and while tactical play is active. Encounters and initiative add
context to the screen; they do not replace the screen.

The central design question is **what information belongs where by access
priority**:

- **Immediate** — visible without interaction.
- **Low-overhead** — one interaction away.
- **Eventually** — reachable through navigation.

These tiers are about reading and reference access only. Editing affordances are
a separate concern.

## Source Context

Read these before prototyping:

- `docs/planning/ttrpg-app-philosophy.md`
- `docs/ui-ux-values.md`
- `libs/domain/src/scene.ts`
- `libs/ui/src/3/scene-page-layout.tsx`
- `libs/ui/src/3/scene-page-layout.stories.tsx`
- `libs/ui/src/3/creature-combat-card.tsx`

The v3 UI files are reference material for visual language and interaction
patterns, not current-domain implementations.

## Core Model

The screen serves two navigation planes at the same time.

**Prep/location plane:** current scene or room, room prompts, adjacent or nearby
areas, triggers, hazards, and prepared creature setups that might enter play.

**Session/encounter plane:** session participants, participant motivations and
aspects, runtime state, active encounters, dramatic questions, conflict sources,
and tactical state.

These planes overlap, but neither owns the other. Scene navigation must not
close, replace, or subordinate active encounter context. The GM may inspect a
previous or adjacent room while the same encounter remains active.

In this document, **A/M** means **aspects and motivations**: the participant
traits and desires the GM uses to decide how creatures and groups behave.

**Prepared creature setup** means a pre-authored creature/group setup that has
not joined the active session yet but may enter play because the PCs enter an
area, make noise, trigger a response, or otherwise change the situation.

## Runtime Environment

The primary target is a large desktop monitor, not a laptop. The layout may use
multiple stable scan zones rather than hiding everything behind one compact
panel. The GM should be able to build visual memory: for example, look to one
area for participants, another for room prompts, another for interrupts or
tactical reminders.

This does not mean every useful reminder should be equally prominent. Stable
placement must be paired with clear priority.

The app behaves like an IDE, not a document:

- no page-level scrolling for the main screen;
- fixed viewport;
- independently scrollable panels;
- tabs, drawers, overlays, lenses, and routing when content exceeds available
  space.

Keyboard navigation is core UX. Frequently used overlays, lenses, and panels
should be reachable through memorable tap/toggle shortcuts. Do not rely on
press-and-hold shortcuts for sustained reading.

## Access Tiers

### Immediate

Immediate information is visible without interaction because it protects table
flow. This tier answers: "what do I need while players are talking and I am
deciding what happens next?"

Immediate must stay scannable. If everything is immediate, nothing is.

### Low-Overhead

Low-overhead information is one interaction away because it is needed often
enough to be fast, but too detailed or too situational to keep inline.

Good forms include popovers, drawers, modals, pinned previews, and lens-style
surfaces. Prefer tap/toggle lenses over press-and-hold interactions. Lenses
should avoid shifting the underlying layout.

### Eventually

Eventually reachable information is accessible through navigation, but should
not compete with the current running surface.

Examples: full authoring workflows, base creature template editing, full prep
history, and location/adventure/setting management.

## Runtime Relevance

Access tier and runtime relevance are different axes.

Access tier asks: "how many interactions away is this?"

Runtime relevance asks: "what relationship does this have to the current
moment?"

Use these relevance states to prevent the immediate tier from becoming a noisy
checklist:

- **Currently in play** — true now, being acted on, or actively shaping the
  present situation.
- **Could become relevant** — prepared, nearby, triggered by player action, or
  likely to enter play soon.
- **Reference/explanation** — useful for understanding or resolving details, but
  not itself a current pressure.

This distinction matters most inside immediate surfaces. Several pieces of
information can be visible at once, but active pressures, possible pressures,
and explanatory details should not have the same visual weight.

## Always-Immediate Context

These should remain visible whether or not an encounter is active:

- **Current scene/room identity.** The room title should be visible. Full
  setting/location/adventure breadcrumbs are secondary orientation, not core
  running information.
- **Room bullet prompts.** The bullet-point room description is immediate. It
  should help the GM bring the room into play: environmental interaction hooks,
  visual details, player-facing hints, ambient or music reminders, and other
  compact prompts.
- **Room-start reminders.** Randomizers and "remember to roll/check this before
  exploration proceeds" items are immediate.
- **Triggers set.** Skill checks, traps, haunts, nearby-area complication cues,
  and prepared setup triggers should be visible as a compact set.
- **Session participants.** Participants currently in the session should be
  visible with name/type and a compact runtime slice such as HP and conditions.
- **Map or atmosphere image.** A tactical map, vibe image, or both can be
  immediate if present, but must not harm text readability.

### Scene Triggers

"Triggers" is a running-mode grouping over existing scene data, not necessarily
a new domain field.

The current simplified `Scene` type has:

- `roomDescription`
- `flavorText`
- `skillChecks`
- `traps`
- `treasures`
- `linkedSceneIds`
- `encounter`

For Running mode, skill checks, traps, haunts, nearby areas, room-start
randomizers, and not-yet-joined creature setups all behave as triggers: things
the GM wants to remember when players do something that could activate them.
Some of these already exist in the simplified `Scene` type; others may need
fixture-only representation in the first prototype.

Skill checks should be framed around likely player-declared actions, not only as
"skill + DC" records.

Treasure is not part of the active running scan for this prototype.

## Encounter-Active Additions

Opening an encounter adds conflict framing. It does not replace the room/session
surface.

Immediate additions:

- **Dramatic question.** Immediate and prominent. Editing is guarded separately.
- **Conflict source status.** Active/resolved state is immediate.
- **Conflict source opposition.** Start by treating a compact opposition summary
  as immediate. Longer opposition/detail text can be low-overhead if it competes
  with the broader running context.
- **Encounter-relevant A/M highlights.** Relevance is derived from conflict
  source reasons, but should render where the GM makes decisions: participant
  rows, the shared A/M surface, or both.

## Participant Grouping

Participants should be grouped by encounter relevance when an encounter is
active.

Names to test:

- **In conflict** — participant has an active stake or conflict-source link.
- **Non-conflicting** — participant is in the session but not currently driving
  the active conflict.
- **Out of game** — dead, fled, removed, or otherwise no longer active.

This grouping is intentionally encounter-centric. It should remain manual or
derived from existing conflict links; do not introduce detailed creature
location tracking just to support this.

## A/M Access

Aspects and motivations are behavior-critical, but rendering all of them inline
will likely overwhelm the screen.

Initial direction:

- Participant rows show compact relevance markers or hints.
- A shared A/M surface gives one-click access to grouped aspects and
  motivations for all session participants.
- One additional layer can show A/Ms for prepared creature setups that have not
  joined the session yet.

Prototype this as a modal or lens-style surface. Cross-highlighting is optional
exploration: for example, hovering an aspect could highlight participants that
have it. Do not let this optional behavior block the base A/M surface.

The prototype should try an actual A/M surface rather than only reasoning about
whether it will fit.

## Tactical View

Tactical view should not be hard-bound to initiative. It can be useful without
initiative, and initiative should be one piece of tactical context rather than
the definition of tactical mode.

When initiative is active, immediate tactical context includes:

- turn order;
- active participant;
- round number, if tracked;
- active participant focus;
- HP, conditions, reaction availability;
- conflict source progress.

Outside initiative, compact tactical state remains immediate as a participant
summary, while detailed tactical controls can be one interaction away.

## Initiative Display Hypotheses

Prototype these in preference order.

### 1. Manual Layout Switch

The GM can explicitly switch between exploration-first and tactics-first
layouts. Tactics-first can borrow space from room prep while preserving active
encounter context.

Do not auto-switch layouts when initiative starts.

### 2. Minimizable Tactical Overlay

Initiative/tactical data lives in a first-class overlay or modal. The GM can
quickly hide it to inspect room preparation, then reopen it for tactical state,
actor detail, and runtime edits.

This should be tested carefully: if the overlay is open most of the time, it may
really want to be a layout mode or docked panel.

### 3. Same-Layout Tactical Layer

Flow/Roster/Actor/Interrupts are added inside the same running layout. Try this
only if tactical data remains usable without crowding the exploration surface.

## Initiative/Actor Model

This model comes from earlier v3 runner planning and should guide tactical
prototypes, but it is not a locked layout.

The runner should be grouped by tactical use, not by statblock sections:

- **Flow** answers "where are we in the loop?" It owns initiative order, active
  participant, and round if round is tracked.
- **Roster** is the persistent per-participant tactical ledger. It owns HP,
  major visible conditions, reaction spent/available, spendable counters, and
  other short runtime flags.
- **Actor** is the current acting participant's decision surface. It owns A/Ms,
  creature-specific actions and abilities, attacks, spells, resources relevant
  to action choice, speed when relevant, and short action descriptions.
- **Targets** is resolver-facing and on-demand. It owns compact defenses,
  DC-relevant values, conditions relevant to resolving the action, and response
  hints. It should not depend on having deep ability data for PCs.
- **Interrupts** is cross-turn information that can matter outside the active
  actor and target set: passive abilities, available reactions, triggered
  reminders, aura-like effects, and other "do not forget this can fire now"
  mechanics.
- **Reference** is deep lookup: full statblock, long ability text, and pinned
  previews. It should remain hover/pin-level, not part of the main running loop.

Flow and Roster should remain separate in the model but can be combined in the
UI. A compact initiative-ordered roster is acceptable: Flow supplies the order,
and Roster supplies each row's state.

Round number is useful if initiative is active, but should be a manually
controlled counter unless the app later defines rules-aware behavior for Delay
and reordering. A top-of-order auto-increment is simple but can become
misleading.

## Participant Data Assumptions

Participants are instances, not statblocks. Three goblins means one statblock
id, three participant ids, three run-state records, and three initiative
entries. Tactical state keys off participant ids, not template/statblock ids.

Creature participants should always have setup data and, for this prototype, a
statblock. Ad-hoc creature participants still need at least a fast concept/setup
pass so they play well.

Future partial or simplified statblocks should change the statblock model
itself, not make creature participants statblock-less.

PCs should be modeled as a separate participant type later. They may appear in
initiative order with `null` or absent tactical state, similar to groups. This
means tactical state maps must not assume every participant has a state record,
but creature participants can still assume statblock-backed data.

## Editing Affordances

Editing is independent from read tiers.

- **Inline / zero friction:** runtime state; motivations are close to runtime
  state and should be easy to adjust.
- **Easy status edits:** conflict source resolve/unresolve.
- **Guarded edits:** dramatic question, conflict source opposition text,
  structural reason links, participant setup/configuration, base statblock-ish
  data, and other prep truth.
- **Separate fast surface:** ad-hoc participant creation. It must be quick, but
  does not have to be inline on the main screen. Ad-hoc creature creation should
  still produce setup/concept data before the creature enters play.

## Current Domain And Fixture Reality

This document is a layout/planning handoff, not a claim that all supporting
domain types already exist.

Known gaps for the next implementation task:

- The current `Scene` type is simplified and UI-facing.
- The current `Scene.encounter` shape does not match the newer session/encounter
  model.
- The running screen needs session participants, participant A/Ms, conflict
  source reason links, resolved conflict-source state, and tactical runtime
  state. Some of that may need new fixtures before real domain work is finished.
- Encounter relevance should be derived from conflict source reasons; do not add
  an encounter-owned participant roster just for layout convenience.
- Scene focus means the room currently inspected on the running screen. It does
  not have to equal the party's exact tracked location, and the prototype should
  not introduce per-creature location tracking.

## Prototype Guidance

The next prototype should focus on the running screen, not an encounter panel.

It should answer:

- Can the GM scan room prompts, triggers, and session participants at once
  without all reminders becoming equally loud?
- Does an active encounter add dramatic question and conflict sources without
  burying scene context?
- Does the A/M surface work as one-click behavioral reference?
- Do participant groups make encounter relevance obvious?
- Can a tactics-first layout or overlay expose Flow/Roster/Actor/Interrupts
  without losing exploration context?
- Can scene focus change independently from active encounter/session state?

Avoid:

- automatic layout switching;
- whole-page scrolling;
- location tracking for every creature;
- making the full statblock the primary running surface;
- treating initiative as the only way to enter tactical view.
