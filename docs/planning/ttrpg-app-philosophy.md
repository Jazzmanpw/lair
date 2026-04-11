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
