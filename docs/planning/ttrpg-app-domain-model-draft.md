# TTRPG App Domain Model Draft

## Goal

Establish the mental model for how the app's domain is structured — from stable
reference material through adventure prep into live session play.

This document supersedes the creature-focused data-flow draft by widening the
scope to the full domain: prep layers, session runtime, encounters as dramatic
structures, and the relationships between them.

The model is grounded in the Angry GM's encounter framework: an encounter is a
dramatic question resolved through conflicts, not a synonym for tactical combat.

For the app's broader design philosophy, see
[ttrpg-app-philosophy.md](ttrpg-app-philosophy.md).

## Why This Matters

The creature data-flow draft (v1) identified real separation concerns — template
vs participant, canonical vs runtime, setup vs tactical state — but it treated
the encounter as the central runtime container and conflated creature identity
into a single "template" concept. That led to confusion about:

- where setting-specific creatures live vs system-published creatures;
- whether initiative is an encounter state or something else;
- what an encounter actually _is_ at runtime;
- what holds everything together during a session.

This draft addresses those gaps.

## Terminology

| Term                | Meaning                                                                                                             |
| ------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Participant         | Wider category — anything that can take part in an encounter: creature, hazard, item, environmental force           |
| Creature            | A living or sentient participant instance                                                                           |
| Hazard, Item, etc.  | Other participant types                                                                                             |
| Creature Statblock  | Mechanical data for a creature                                                                                      |
| Hazard Statblock    | Mechanical data for a hazard                                                                                        |
| Item Statblock      | Mechanical data for an item (e.g. cursed item)                                                                      |
| Participant Concept | Narrative identity — shared structure across participant types                                                      |
| Participant Setup   | Prep entity: typed statblock reference + participant concept                                                        |
| Conflict Source     | A participant's motivation recognized as opposing a dramatic question                                               |
| Opposition          | The description of _how_ a motivation opposes the dramatic question — the preferred field name on a conflict source |
| Group               | Prep entity that gives shared motivations and identity to a set of participant setups                               |

## Prep Layers

### Compendium

Compendium is stable system reference — rules, conditions, published creature
statblocks, spells, equipment. It is not adventure-specific and not authored by
the GM in the app.

The app may eventually allow browsing or referencing compendium data, but it does
not own or edit it. Compendium is external truth.

### Participant Setup

A participant setup is the core prep entity. It represents something the GM
prepares for a future encounter. "I prepare participants for encounters that
might happen in the game."

A participant setup combines two independently sourced concerns:

- **Typed statblock** — mechanical identity. Either a reference to a compendium
  statblock or a custom-authored one. Typed by participant kind: creature
  statblock, hazard statblock, item statblock, etc.
- **Participant concept** — narrative identity in this setting. Theme, role,
  feeling, **aspects** (stable character traits that don't change during play),
  and **motivations** (what this participant wants — situational and mutable).

These two are separable because they have different sources and different
lifetimes:

- Multiple participant setups can share the same statblock but have completely
  different concepts. A bandit with a death wish and a bandit protecting their
  family are different participant setups using the same published statblock.
- A unique creature like Tiangu's chimera has both a custom statblock and a
  unique concept, neither of which belongs in compendium.
- Even a wolf needs at least a vague motivation — "protect den" and "starving,
  desperate hunt" play completely differently despite the same statblock. The
  motivation IS the concept for simple participants.

The participant setup is also where selectable variations live — prepared
alternatives that affect which abilities or loadout options are active.

This generalizes well beyond creatures: a hazard can carry motivations (the trap
"wants" to protect the vault), a cursed item can carry conflict-generating
desires, a puzzle can represent an obstacle with its own logic.

### Aspects

Aspects are stable character traits that are part of the participant concept.
They describe _what this participant is like_ — "fiercely territorial,"
"bound by oath," "curious and reckless" — and do not change during play.

Aspects are often a deeper and more important source of conflict than
motivations. A motivation like "find the journal" is situational and can shift.
An aspect like "fiercely loyal" is permanent and can create opposition in any
encounter where loyalty collides with the PCs' goals — no explicit motivation
needed.

Aspects need IDs so they can be referenced from conflict sources, variations,
and other parts of the model. A conflict source might exist _because of_ a
specific aspect, and that link should be traceable.

Groups can also have aspects — shared traits of the faction or unit as a whole
("disciplined," "secretive"). Participants inherit group aspects the same way
they inherit group motivations.

A variation adds an aspect to a participant — that's its primary narrative role.
Multiple participants can share the same setup and common aspects, but the
chosen variation gives each instance its unique character trait (e.g. the same
junior keeper setup produces "the coward," "the loyal one," "the overconfident
one" — each a variation that contributes a distinct aspect). A variation may
also enable specific abilities or loadout options, but the aspect it brings is
what makes the instance narratively distinct.

### Motivations

Motivations are part of the participant concept and represent what the
participant wants, independent of any specific encounter. Unlike aspects, they
are situational and mutable — they can shift during play.

Both aspects and motivations are prep-level seeds for conflict sources. When the
GM opens an encounter with a dramatic question, aspects and motivations help the
GM recognize which participants oppose the PCs' goal and why. Many conflicts are
trivially derived from aspects without needing a separately authored motivation.

A participant setup should have at least a vague motivation or a clear enough
aspect that motivation is obvious. A wolf with the aspect "territorial" doesn't
need a spelled-out motivation — the conflict writes itself.

### Group

A group is a prep-level organizational entity that gives shared identity and
motivations to a set of participant setups.

A group has:

- shared motivations ("find the journal," "defend the bridge");
- group-level concept (faction identity, how they operate together).

A group does not own a member list. Instead, individual participant setups
**relate to** groups — a participant thinks of themselves as part of the group
and thus considers its motivations relevant. This relationship lives on the
participant side, not the group side, because:

- dropping the relationship is a change to the participant (betrayal, capture,
  change of heart), not a change to the group;
- a participant can relate to multiple groups simultaneously and inherit
  motivations from all of them (a keeper who is also a secret cult member);
- the group stays a clean, reusable identity — it doesn't need to track who
  currently identifies with it.

Individual members inherit group motivations but can have their own shimmer —
personality, loyalty, how they'd react under pressure. A senior telling the
group to flee shifts the group motivation, and that propagates to everyone who
still relates to the group — unless an individual deviates or has already
broken the relationship.

Groups match a real and common prep pattern. Most encounters involve groups, not
isolated individuals. The "group motivation shifts" scenario (leader says
retreat, but the zealot stays) is exactly the kind of thing the app should help
track.

### Encounter Setup

An encounter setup is a scene-level choreography document. It prepares a
dramatic situation by arranging:

- a **potential dramatic question** — what might be at stake;
- **participant references** — which participant setups (and optionally which
  variation configurations) are involved;
- any other scene-local prep notes.

An encounter setup does not contain fixed conflict sources. Instead, participants
bring their motivations, and the GM can see at a glance which motivations might
collide with the potential dramatic question. The encounter setup is a stage
with actors and a premise — the actual conflicts emerge when the encounter opens.

An encounter setup is a _seed_, not a binding contract. At runtime, the actual
encounter may diverge: the dramatic question might be reframed by the players,
new participants may arrive, motivations may shift.

The relationship between encounter setup and runtime encounter is
one-directional: the setup seeds the encounter, but the encounter does not
maintain a live binding back to its setup.

Encounter setups also scale to random encounters — instead of specific
participant setups, the GM prepares random tables, and statblocks with their
motivations are generated at the table.

## Runtime Model

### Session

The session is the top-level runtime container. There is one session during
play. It holds:

- **participants** — participant setups that have been brought into play, with
  their runtime state;
- **open encounters** — dramatic situations with unresolved questions;
- **initiative flow** (optional) — round tracking, turn order, active
  participant. This is a session-level game mode, not a property of any single
  encounter.

The session persists across page refreshes. Translating session state back into
canonical prep data (updating participant setups, recording outcomes) is an
explicit action, not an automatic sync.

### Participant (runtime)

A participant in the session has:

- a reference to its source participant setup (for statblock and concept);
- **runtime motivations** — seeded from the participant setup's concept
  motivations but editable during play. Motivations can shift as the situation
  changes (the keepers grab the journal — their motivation shifts from "find it"
  to "escape with it");
- tactical state — HP, conditions, spent resources, reaction availability.

Through conflict sources, a participant is connected to encounters — but
indirectly. A participant outlives any specific encounter. When an encounter
ends, the participant and its state remain in the session.

### Encounter (runtime)

An encounter at runtime is lightweight. It is a dramatic frame, not a data
container. It holds:

- **actual dramatic question** — not "potential" but actively posed;
- **conflict sources** — what's preventing the PCs from getting their answer.

That's it. An encounter does not own participants, does not track HP, does not
hold initiative state. It is the _question being asked_ and the _reasons the
answer isn't obvious yet_.

Encounters are ephemeral. When all conflict sources are resolved, the dramatic
question has its answer and the encounter ends. If the PCs try the same thing
again later, that's a new encounter with a new dramatic question, not a
continuation.

If the situation fundamentally transforms (new dramatic question emerges from the
resolution), a new encounter is created. The old one is gone.

Multiple **open** encounters (unresolved dramatic questions) can exist in a
session, but this is uncommon — it mostly happens when the party splits or when a
previous question was left unresolved and is still relevant. One encounter is
**in focus** (what the GM is actively tracking on screen). The common case during
play is one in-focus encounter with multiple conflict sources opposing it from
different angles.

### Conflict Source

A conflict source is a force's desire that opposes the PCs' dramatic question.
It is the bridge between encounters and participants.

Conflict sources are derived from participant motivations at runtime. When the GM
opens an encounter, participant motivations that oppose the dramatic question
become conflict sources on that encounter. This is a recognition step, not a
copy — the GM sees a participant's motivation and understands how it creates
opposition.

Examples:

- Participant motivation: "The orcs want to defend their territory." When the
  dramatic question is "Can the party cross the valley safely?" — that
  motivation becomes a conflict source.
- Participant motivation: "The fire wants to consume everything." Same dramatic
  question — another conflict source, opposing differently.
- Participant motivation: "The merchant wants to maximize profit." Irrelevant to
  the valley-crossing question, but becomes a conflict source if the dramatic
  question were "Can the party get supplies at a fair price?"

Conflict sources are dynamic during play:

- new ones appear when new participants arrive or motivations shift;
- existing ones resolve when a participant is defeated, flees, capitulates, or
  changes goals;
- the dramatic question stays relatively stable while conflict sources shift
  around it.

When a participant enters a scene, it does not just "join an encounter" — its
motivations may add new conflict sources or even spawn a new encounter with a
different dramatic question.

Conflict sources keep a link to the motivation that drives them, so that if the motivation changes, there can be a visual hint to update the conflict source.

### Initiative Flow

Initiative is a session-level game mode, not a property of an encounter.

When the session enters initiative flow, it tracks:

- turn order (participant IDs);
- active participant;
- current round.

Initiative can involve participants from multiple open encounters. It is the
mechanical overlay for resolving actions in structured time. Not every encounter
needs initiative — social encounters, exploration challenges, and many other
dramatic situations resolve without it.

The initiative flow starts and stops independently of encounter lifecycle. An
encounter can be open before initiative starts and can end (dramatic question
answered) while initiative is still running for other reasons. Initiative ending
does not mean encounters end, and encounters ending does not mean initiative
ends.

## Lifecycle

### Prep (Building mode)

The GM:

- authors participant setups (typed statblocks + participant concepts with
  motivations + variations);
- organizes groups with shared motivations;
- prepares encounter setups (dramatic questions, participant references);
- writes canonical notes attached to participant setups or encounter setups.

### Session start

A session begins. No encounters are open yet, no participants are in play.

### Adding participants

Adding a participant to the session is independent of encounters. It means "this
entity is relevant right now, I might need to reference them." The participant
gets runtime motivations (seeded from their prep concept) and tactical state.

Participants can enter the session because:

- they're part of the current scene (the barkeep is present, no dramatic question
  yet);
- they survived a previous encounter and are still around;
- the GM wants to pre-stage them before deciding which encounter to open;
- an encounter setup pulls them in when it's seeded.

Not every participant in the session needs to be tied to an encounter.

### Opening an encounter

The GM opens a dramatic situation. This can happen by:

- seeding from an encounter setup (dramatic question is posed, referenced
  participants are added to the session if not already present, motivations are
  inspected for conflict sources);
- creating one ad-hoc (something unexpected happened in play — participants
  may already be in the session).

The GM recognizes which participant motivations oppose the dramatic question and
creates conflict sources on the encounter.

### During play (no initiative)

Encounters are open. The GM can:

- inspect participants and their statblock/concept data;
- view and add notes;
- track the dramatic question and conflict sources;
- add new participants (from other encounter setups, from Building on the fly,
  or ad-hoc);
- edit participant motivations as the situation shifts;
- see new conflict sources emerge.

No tactical state tracking is forced — HP and conditions can be relevant even
without initiative, but they exist on the participant in the session regardless.

### Initiative starts

The GM enters initiative flow. Participants from one or more open encounters are
arranged into turn order. The session now tracks rounds and active turns.

This is a mode change on the session, not a state change on any encounter.

### During play (with initiative)

The GM primarily interacts with:

- tactical state on participants (HP, conditions, resources);
- initiative flow (advancing turns, managing order);
- conflict sources (tracking which are resolved, which are emerging);
- participant motivations (shifting as the battle evolves);
- notes (runtime observations, tactical reminders).

Canonical participant setups and encounter setups remain stable unless explicitly
edited outside the session flow.

### Encounter ends

When all conflict sources on an encounter are resolved, the dramatic question has
its answer. The encounter is done.

Participants that embodied its conflict sources remain in the session — they
might be part of other open encounters, or they might just be present in the
scene without active opposition to any dramatic question.

If the situation transforms (new dramatic question emerges from the resolution),
a new encounter is created. The old one is gone.

### Initiative ends

The GM exits initiative flow. Participants retain their tactical state. Encounters
that are still open remain open. The session continues without structured turn
order.

### Session wrap-up

Runtime state (tactical changes, runtime notes, motivation shifts, encounter
outcomes) can be:

- reviewed as a session record;
- manually promoted into canonical prep data;
- used to inform next-session planning.

This is an explicit action, not automatic sync.

## What Changed from V1

| V1 (creature data-flow draft)                        | V2 (this document)                                                                                 |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `CreatureTemplate` bundles statblock + concept       | Participant Setup separates typed statblock from participant concept; generalizes beyond creatures |
| Creature-only model                                  | Participant as wider category: creatures, hazards, items, environmental forces                     |
| No motivations concept                               | Motivations are part of participant concept (prep) and editable at runtime                         |
| No group concept                                     | Groups hold shared motivations and identity for sets of participant setups                         |
| Encounter setup contains fixed conflict sources      | Encounter setup contains participants with motivations; conflict sources emerge at runtime         |
| Encounter setup = encounter                          | Encounter setup is a seed; runtime encounter is a separate, lightweight thing                      |
| Encounter owns participants and run-state            | Session owns participants; encounter owns only its dramatic question and conflict sources          |
| `EncounterRunState` holds HP, conditions, initiative | Tactical state lives on participants in the session; initiative is a session-level flow            |
| No session concept                                   | Session is the top-level runtime container                                                         |
| "Before initiative" as an encounter phase            | Encounters are open independent of initiative; initiative is orthogonal                            |
| "Active encounters"                                  | "Open encounters" (unresolved) with one "in focus" (tracked on screen)                             |

## Open Questions

- Exact shape of conflict source as a data structure (just text? structured
  fields? associations to participants?).
- How participant tactical state initializes — from statblock defaults, from
  encounter-setup overrides, or both.
- How runtime notes attach — to participants, to encounters, to conflict sources,
  or free-floating in the session.
- The wrap-up workflow: what gets promoted back to prep, and how.
- Whether the app needs a persistent "scene" concept above encounters, or whether
  session + encounters is sufficient.
- How groups behave at runtime — does the group itself become a runtime entity,
  or is it purely a prep-time organizational tool whose motivations are copied
  onto individual participants?
- How the Building-to-Running on-the-fly workflow works in detail (quick creature
  creation mid-session).
