# TTRPG App Philosophy

## What This App Is

A fancy note-taking app for a game master.

The GM knows the theory — encounter design, creature building, dramatic pacing —
but can't keep it all in working memory, especially during an actual game
session. The app does the remembering. It organizes knowledge, structures prep,
surfaces the right context at the right time, and gets out of the way.

At its core, everything the app does is note-taking — structured, navigable,
context-aware note-taking. The two major modes shape what kind of note-taking
is most useful:

- **Building** — writing-focused. Authoring and organizing canonical content:
  creatures, scenes, encounters, settings, rules references. Enhanced with
  structured editing, prefilled defaults, in-place hints, and reference material
  a click away instead of scattered across book pages.
- **Running** — reading-focused, with editing. The GM is at the table and needs
  to find the right prep fast, track what's changing, and jot down what happens.
  Navigation between scenes, participants, and their linked content should be
  instant. Referencing across compendium, canonical, and runtime data should
  feel like one connected surface, not separate lookups.

These modes are not isolated. Building feeds Running (prep seeds sessions), and
Running can reach back into Building on the fly — an unexpected creature shows
up, and the GM runs the creature-building workflow mid-session: sketch a concept,
pick scales from reference hints, and drop it into play in under a minute.

## What This App Is Not

- Not a rules engine. It doesn't enforce PF2e rules or automate resolution.
- Not a virtual tabletop. It doesn't handle maps, tokens, or player-facing
  displays.
- Not a character builder. Players manage their own characters elsewhere.

## Design Principles

### Surface context, don't automate gameplay

Every modeling decision should pass the test: "does this help the GM find the
right information at the right moment?" If the answer is "no, but it enables
cool automation," it doesn't belong here.

The domain model can be rich — creatures have concepts, participants have
motivations, encounters have conflict sources — but that richness exists to make
notes more findable and more useful, not to simulate a game.

### Minimum interaction, maximum information

Prefer interactions that reveal a useful set of related information at once. If
the GM asks to see groups, show the available groups and what they carry rather
than requiring a separate interaction for every group.

This is not a mandate to display everything simultaneously. The revealed
surface should remain scoped to the GM's current intention, preserve orientation
where practical, and avoid turning a focused interaction into an unrelated
full-layout switch.

### Structured enough to be useful, loose enough to be fast

The app should capture prep in structured form where structure helps retrieval
and display. But it should never force the GM to fill in fields that aren't
useful yet, or prevent quick ad-hoc entries when the game goes sideways.

A participant with just a name and a motivation is valid. A fully authored
creature with a statblock, concept, variations, and group affiliations is also
valid. The app should handle both without ceremony.

### Prep is a seed, not a contract

Encounter setups, participant configurations, dramatic questions, motivations —
all of these are prep-time drafts. At runtime, any of them can shift, be
discarded, or be created from scratch. The app should make seeding fast and
deviation painless.

### The Angry GM encounter model is the backbone

The app's encounter model follows the Angry GM framework:

- An encounter is a dramatic question being resolved through conflicts.
- Conflict sources are forces with desires that oppose the PCs' goals.
- An encounter ends when the dramatic question is answered, not when all enemies
  are dead.
- Initiative/combat is one resolution mode, not the definition of an encounter.

This framework shapes how encounters are prepared, opened, tracked, and closed
in the app. It is not optional flavor — it is the structural foundation.

### Running mode: information tiers and editability

In Running mode, information falls into three tiers:

- **T1: Immediate** — visible without any interaction. The GM glances at the screen
  and has it. This is the smallest, most curated set: the things the GM needs
  _right now_ to keep the game moving.
- **T2: Low-overhead** — one interaction away (a hover, a click, a toggle). Available
  fast, but not competing for screen space with the immediate tier. This is the
  "I need this sometimes" layer: full statblocks, detailed concept breakdowns,
  related scene info.
- **T3: Eventually** — reachable through navigation. Not buried, but not on the
  current screen either. Full prep history, other scenes, building-mode editing.

**Determining which information belongs in which tier is the central design
question for every Running mode screen.** The tiers themselves are
straightforward; the hard work is classifying the data correctly for each
context. A dramatic question is immediate during an encounter; a creature's full
statblock is low-overhead; the encounter setup's original notes are eventually.
These classifications shift — when initiative is active, tactical state moves
from low-overhead to immediate.

All information should be editable. Running mode is reading-focused, but the GM
needs to correct, adjust, and annotate on the fly. Important structural data that
rarely changes (a creature's base statblock, an encounter's dramatic question)
should have a small guard against accidental edits — not a modal, just enough
friction to prevent a misclick. Ephemeral runtime data (HP, conditions, notes)
should edit with zero friction.

### Beauty signals correctness

A tool the GM reaches for mid-session must feel fluid and trustworthy. Polish
isn't decoration — it's a signal that the internals are sound. Laggy
interactions, clumsy layouts, and rough edges erode confidence and pull the GM
out of the game. The same care that goes into the data model and interaction
design should show up in every surface the GM touches.

This applies to hidden internals too: clean code structure, coherent naming, and
well-composed abstractions aren't just developer niceties — they're what make it
possible to keep the visible product polished as it grows.

See also: `E:\Persisted\Работа\DHH's new way of writing code.md` — the broader
argument from DHH on aesthetics as truth and craft in software.
