# Running Mode Screen - Round 1 Design Reasoning

Round 1 explored a wide spread of spatial hypotheses for the Running Mode screen:
how the GM's room-prep plane, session/encounter plane, and tactical loop can live
on one fixed desktop surface without page-level scrolling. The prototypes are
not finished designs. They are separable bets about what the GM should see first,
what can sit one interaction away, and how much the room should survive once
initiative becomes active.

The work so far has three model passes. Opus 4.6 produced layouts A through E,
exploring wide header strips, triple columns, focus-and-rail, dashboard grids,
and stacking horizontal bands. Opus 4.8 produced layouts F through K, which
stress tactical integration and access-tier tradeoffs. GPT-5.5 then added
layouts L through P, extending the round with more explicit shelf, table,
workbench, overlay, and dual-plane compositions.

## Opus 4.6

My overall tactic was to start with five structurally different answers to "what
does the GM look at first?" and to vary the primary spatial axis, grouping
strategy, and tactical integration model across all five. I deliberately kept
each layout simple enough that the spatial bet is obvious at a glance — these are
hypothesis sketches, not refined designs.

The set spans a spectrum from conventional multi-column layouts (A, B) through
asymmetric focus-and-context compositions (C) to more unusual tile grids (D) and
additive horizontal bands (E). Each one makes a different trade about how much
room context survives when tactics activates, and where the Actor zone (the
single largest content zone at ~500px) finds a home.

Cross-cutting choices that shaped all five:

- **Mode switcher is a prototype affordance.** All five include a footer mode
  bar for switching between exploration, encounter, and tactics. This is not a
  proposed UI control — it exists so the three story states can be toggled live
  in Storybook. The interesting question is how each layout's geometry changes
  between modes, not the mode button itself.
- **FPO labels carry data-budget hints.** Every block names its zone and quotes
  the approximate pixel height from the data budget. This makes the prototypes
  self-documenting for review — you can see whether a layout's space allocation
  matches the content volume each zone actually holds.
- **Encounter context is additive, not replacing.** In all five, switching from
  exploration to encounter adds dramatic question, conflict sources, and
  grouping headers without removing room prompts or triggers. The layouts differ
  in where these additions land and how much they compress existing zones.

---

### A — Command Center

A is the most conventional starting point: a wide top strip holding scene header,
room prompts, and flavor text, with the remaining viewport split into three
columns — participants left, main content center, linked scenes and map right.
Encounter and tactical zones appear in the center column as the mode escalates.

The core bet: the GM's eye starts at the top (room context), then drops to the
middle (what's happening now), with persistent reference on the sides. It is an
"everything has a home" layout that prioritizes spatial stability over density.

#### Wide top strip as the room anchor

The most distinctive choice is giving room prompts and flavor text the full
viewport width in a header band. At ~200px tall, this band is large enough to
hold 5 bullets plus a blockquote side-by-side without scrolling. The GM's first
glance always lands on the room, regardless of mode.

This is worth carrying forward as a question: should the room description earn
top-of-viewport real estate in all modes, or is that too much space for content
the GM reads once and then mostly ignores? If the GM re-reads prompts frequently
(paraphrasing for players, checking environmental hooks), the wide strip pays
for itself. If not, it's wasted vertical budget.

#### Center column as the mode-sensitive zone

The center column is the only part of A that changes between modes. In
exploration it holds triggers; in encounter it adds dramatic question and conflict
sources above triggers; in tactics it becomes Actor + Targets + Interrupts. The
left and right columns are stable across all three modes.

This separation between "stable context" and "active task" is the cleanest idea
in A. It means the GM builds muscle memory for where participants live (left),
where reference material lives (right), and where the current problem lives
(center). The transition cost is low because only one zone changes.

#### Participants as a left sidebar

The 240px left column is a dedicated participant list. When encounter is active,
grouping headers (In conflict / Non-conflicting) appear at the top. In tactics,
a Flow strip appears at the bottom of the column.

Putting participants on the left is a deliberate choice: it makes participant
state the first thing the GM's eye hits when scanning left-to-right through the
main body. The risk is that 240px is tight for participant rows that include HP,
conditions, and reaction badges. The data budget says a single row is 32–56px
wide; at 240px column width, name truncation becomes likely with longer Russian
creature names.

#### Flow tucked into the participant column

In tactics mode, A places the Flow strip (turn order, active participant, round)
at the bottom of the participant column. This is a quiet choice but worth noting:
it groups Flow with the creatures it tracks, rather than giving it a top-level
band. The downside is that Flow competes for vertical space with the participant
list in a scrolling column — if the roster is long, the GM may need to scroll
past creatures to see whose turn it is.

---

### B — Triple Column

B divides the viewport into three roughly equal vertical columns, each owning a
distinct concern: scene context (left), participants + encounter (center),
contextual reference (right). The header bar is deliberately compact — just
scene identity, dramatic question, and flow — so the columns get maximum vertical
space.

The bet: no single concern dominates. Room, creatures, and reference all deserve
roughly equal viewport weight, and the GM's scanning pattern is horizontal
across the three columns rather than top-down through tiers.

#### Compact header forces content into columns

B's header is the thinnest of the five (~50px). It holds only scene title,
breadcrumb, and — when active — the dramatic question and flow strip. Everything
else lives in the body columns. This maximizes the vertical budget for content
zones that actually need scrolling.

This is the opposite instinct from A's wide header. It's worth comparing the two
directly in Storybook: does the GM miss having room prompts at the top, or does
the extra body height feel liberating?

#### Column rebalancing in tactics

In exploration and encounter modes, the columns are roughly 1fr / 1fr / 240px.
In tactics, they shift to 1fr / 280px / 1fr — the right column grows to hold
Actor + Targets + Interrupts, while the center narrows to a compact participant
roster. The left column (room context) is unchanged.

This rebalancing is the most interesting transition in B. It says: when tactics
is active, the decision surface (Actor) deserves as much space as the room, and
participants can compress because they're already ordered by initiative. The
room column survives at full width, which is the gentlest room-preservation
strategy of the five.

#### Right column re-tasks by mode

In non-tactical modes, the right column holds linked scenes, map, and encounter
A/M highlights. In tactics, it becomes the tactical decision cluster. The
column's position is stable, but its content swaps entirely.

This "same position, different content" pattern is a bet that the GM can build
spatial memory for "right means detail" without being confused by the content
change. It's the same instinct as G's right rail (from the Opus 4.8 set), and
worth validating: does the GM look right for "the thing I need next" regardless
of mode, or does the content swap break the spatial expectation?

#### Scene context column as persistent reference

The left column holds room prompts, flavor text, room-start reminders, triggers,
and (in non-tactical modes) the map. This is the densest single-column content
package in the set — easily 500–600px of content that will scroll.

The advantage is that everything room-related lives in one place. The risk is
that the column becomes a scrolling document rather than a scannable surface.
A next iteration could test whether triggers should break out of this column
into a more prominent position.

---

### C — Focus + Rails

C uses extreme asymmetry: thin left rail (180px) for participants, thin right
rail (200px) for linked scenes and map, and a large central focus panel that
fills the remaining width. A conditional encounter context bar appears between
the header and the body when an encounter is active.

The bet: one zone should dominate the viewport and the GM's attention. In
exploration that zone is the room; in tactics it's the Actor. The rails provide
persistent context but deliberately don't compete with the focus panel.

#### Central focus panel swaps content by mode

This is C's defining move. The focus panel is room prompts + flavor + triggers
in exploration, and becomes Actor + Targets in tactics. The swap is total — no
remnant of the previous content remains in the panel. The room "moves" to
peripheral awareness (the header still shows scene identity, the right rail
still shows linked scenes).

This is the most aggressive focus-follows-mode approach in the set. It's worth
testing because it gives Actor the most generous space of any layout (~60% of
viewport width × full body height). If Actor needs that space — and the data
budget says ~500px tall for the full decision surface — C may be the only layout
that doesn't require Actor to scroll.

#### Thin participant rail

At 180px, the left rail is the narrowest participant zone in the set. It can
hold a compact name + HP + reaction row, but conditions and A/M hints would need
to overflow or be hidden. The grouping headers ("In conflict" / "Non-conflicting")
are present but must be extremely compact.

This is a deliberate sacrifice: C trades participant detail for focus-panel
space. The question is whether the GM can work with a glanceable participant
index (name and HP only) if a richer participant view is available via the Actor
panel or a lens. If yes, 180px is enough; if no, the rail needs to grow and the
focus panel shrinks.

#### Encounter context as a horizontal bar

When an encounter is active, C inserts a full-width bar between the header and
the body containing the dramatic question, threat level, and (in tactics) the
Flow strip. This bar is conditional — it doesn't exist in exploration mode.

The conditional bar is interesting because it makes encounter activation visually
obvious: a new band appears in the layout. It's a clear signal that the screen
state has changed. The risk is that it steals vertical space from the body — each
conditional band is ~50px, and in tactics C has two (header + encounter bar),
leaving less for the focus panel.

#### Tactics pushes room context to the right rail

In tactics, C adds compact room prompts and triggers to the right rail, below
linked scenes. This is a fallback — the full room content left the focus panel,
so it needs a home somewhere. The right rail becomes a scroll-heavy reference
column in tactics, holding linked scenes + map + condensed room + compact
conflict sources.

This is the most compressed room-in-tactics treatment of the five. It's an
honest test of whether the GM can tolerate room context in a 200px sidebar
during combat. The data budget says room prompts want ~600px reading width;
at 200px, bullets will wrap heavily. If this feels unusable, it means the room
needs more space even during tactics — a finding that constrains all layouts.

---

### D — Dashboard Grid

D treats the viewport as a 2×3 (or similar) grid of independently scrollable
widget tiles. Each tile is bordered, padded, and self-contained. The grid layout
changes between modes: tiles resize, swap content, or appear/disappear.

The bet: the GM thinks of the screen as a collection of tools, not a unified
document. Each tool (room prompts, participants, triggers, map, encounter
context) is a distinct surface that can be read independently and in any order.
The grid makes all tools visible simultaneously at the cost of each one being
smaller.

#### Widget isolation

Each tile in D has its own border, background, padding, and scroll. This is the
most visually segmented layout in the set — every zone is explicitly framed as a
separate thing. The advantage is clarity: boundaries are unambiguous, and the GM
can point to "the participants tile" or "the triggers tile" without confusion.

The disadvantage is visual weight. Many borders on a dark background can feel
heavy and fragmented. A next iteration could test whether D works better with
lighter tile boundaries or subtle background differentiation instead of explicit
borders.

#### Grid reshuffles in tactics

D's grid changes significantly in tactics: the Actor tile takes the largest
position, a Flow + Interrupts tile replaces the linked-scenes tile, conflict
sources and triggers compress into a shared tile, and the participant tile
carries over from encounter mode.

This is the most dramatic structural change of the five. In exploration, D is a
balanced 2×3 grid; in tactics, it's closer to a 60/40 left-right split with the
Actor dominating. The reshuffling is the most interesting thing to test: does the
GM lose spatial memory when tiles move and resize between modes, or does the tile
identity (labels, borders) make it easy to re-orient?

#### No dedicated map tile in tactics

In tactics, D drops the map tile to make room for the tactical cluster. The map
is simply gone. This is the harshest map treatment of the five and a useful
boundary test: if the GM never misses the map during tactics, it means map is
truly an exploration-only reference. If they do miss it, the map needs a
persistent home.

#### Encounter context as its own tile

In encounter mode, D gives dramatic question + conflict sources + threat level a
dedicated tile rather than inlining them into the header or a participant column.
This gives encounter framing real visual weight — it's a first-class zone, not a
decoration on another zone.

This is worth carrying forward as a question: does encounter framing deserve its
own viewport real estate, or is it metadata that should decorate the participant
or trigger zones? D bets on the former, and A/B/E bet on the latter.

---

### E — Mode Stack

E stacks full-width horizontal bands from top to bottom, with bands appearing
conditionally as the mode escalates. Exploration has two bands (header + body).
Encounter adds an encounter context bar between header and body. Tactics adds a
tactical flow bar between encounter and body. The body itself is a two-column
split (content + participants) that re-weights in tactics.

The bet: the screen should grow visually when the situation grows. The number of
visible bands tells the GM how many layers of context are active right now.
Exploration is simple and open; tactics is dense and layered.

#### Additive bands as mode signal

E's signature is that new bands appear as modes activate, rather than existing
zones changing content. The encounter bar slides in with dramatic question +
threat level + compact conflict sources. The tactical bar slides in with Flow +
compact interrupts. The GM sees the screen get denser and can read the density
as "more is happening."

This is the most distinctive transition model in the set. Every other layout
either swaps content within stable zones (A, B, C) or reshuffles the grid (D).
E alone makes the mode change architecturally visible — the layout literally has
more parts. Worth testing whether this feels informative or claustrophobic.

#### Linked scenes as header tabs

E compresses linked scenes into a compact tab row in the header bar rather than
giving them a sidebar or tile. This is the most space-efficient linked-scene
treatment of the five — it uses maybe ~180px of horizontal header space instead
of a 200–240px sidebar column.

The trade is that linked scenes lose their card format (title + breadcrumb +
creature/trap counts) and become just names in a tab row. If linked-scene
metadata matters at a glance, this is too compressed. If the GM just needs quick
navigation, it's efficient.

#### Participant column widens in tactics

In non-tactical modes, the participant column is 280px (right side of the body).
In tactics, the body becomes a 1:1 two-column split, so participants get ~50% of
the viewport width. The extra space is used for condensed room prompts and
triggers below the participant list — room reference migrates into the
participant column.

This is a pragmatic solution: the participant column is already the GM's
persistent roster, so making it also carry room reference in tactics keeps
everything in one scrollable surface. The risk is column overload — participants +
room prompts + triggers in one 50% column may scroll extensively.

#### Encounter bar as a compact conflict dashboard

The encounter context bar renders conflict sources as "compact badges with
status" rather than as multi-line text blocks. This is the most aggressive
conflict-source compression in the set. Each source is a badge showing
opposition text + active/resolved status, all fitting in a single horizontal
row.

This is worth testing against the fuller conflict-source treatments in A and B
(where each source gets its own multi-line block). If badges are enough for
running-mode scanning, conflict sources can be safely compressed in any layout.
If the GM needs to read opposition text during play, badges are too small and
conflict sources need a dedicated zone.

#### Flow in its own band

E gives Flow a dedicated full-width band rather than tucking it into a column or
overlay. This makes turn order maximally visible — it's always at the same
vertical position, spanning the full width, with the active participant
highlighted. It can't be scrolled out of view or hidden behind another zone.

This echoes the instinct from F and J (in the Opus 4.8 set) that Flow deserves
persistent, separated treatment. E's version is the most prominent: a full band,
not a strip or a status-bar element. The question is whether that prominence is
warranted or whether Flow can be smaller and still serve as ambient orientation.

## Opus 4.8

Opus's overall tactic was to make each layout a deliberate, separable hypothesis
about the screen rather than a finished design. The set mostly asks where
initiative lives: as an overlay, as an inline expansion, as a bottom tray, as a
plane resize, as horizontal strata, or as a lens. The notes below preserve the
original Opus 4.8 reasoning while placing it under the Round 1 structure.

This document captures the intent behind layouts **F through K** so they can be
iterated on in a fresh thread. Each layout is a deliberate, separable hypothesis
about the screen — not a finished design. The goal here is to extract the parts
worth carrying forward, the parts worth questioning, and the open tensions each
one exposes.

A few cross-cutting notes that shaped all six:

- **Three modes, one screen.** Every layout treats `exploration → encounter →
tactics` as additive context on a stable surface, never as separate screens.
  The mode switcher in the footer is a prototype affordance, not a proposed
  control. What matters is _how the surface changes between modes_, which is the
  real subject of each hypothesis.
- **Encounter never evicts the room.** In all six, the prep/room surface stays
  at least inspectable when tactics is live. They differ in _how much_ it
  survives and _where_ it goes.
- **Data budget drove the proportions.** Participant zones are sized for ~6
  creatures + 1 group (~340px). Actor is the single largest tactical zone
  (~500px). Triggers compress to ~150px. Where a layout fights the budget, I've
  called it out — those are the most useful places to push.
- **The interesting axis is tactical integration.** A–D mostly reflowed the same
  grid. F–K each pick a structurally different answer to "where does initiative
  live," because that's the decision that most changes the feel of the tool.

---

### F - Tactical Overlay

#### Overview

F keeps a single, stable two-column exploration canvas (prep/triggers on the
left, participants + linked scenes on the right) and treats tactics as a
**floating, minimizable overlay** that docks over the right ~64% of the screen,
dimming but never removing the canvas beneath. This is the most literal
implementation of the brief's Initiative Hypothesis #2.

The core bet: the GM's home base is the room, and initiative is a _temporary
lens over_ the room rather than a new place. The overlay can be collapsed to a
small floating Flow strip with one click, instantly returning the GM to full
prep without losing tactical position.

#### Worth carrying forward

1. **Minimize-to-strip, not close.** The collapsed state keeps the turn-order
   Flow strip visible in the corner. This is the key idea: the GM can drop out
   of the tactical detail without losing _where we are in the round_. Flow is
   the one piece of tactical state that should never fully disappear. This
   collapse target — "what's the smallest persistent tactical residue?" — is
   worth designing carefully.
2. **The backdrop is a control, not just dimming.** Clicking the dimmed canvas
   minimizes the overlay. That makes "peek at the room" a single gesture: click
   out, read, click the strip to restore. Test whether this feels fast enough to
   replace a dedicated layout mode.
3. **The canvas underneath never reflows.** Because the overlay floats, the
   exploration layout has _zero_ mode-dependent geometry. The room is always in
   exactly the same place. That spatial stability is the strongest argument for
   this approach and the thing to protect in iteration.
4. **Overlay internal layout is a mini Roster+Actor split.** Inside the overlay,
   Roster (260px) sits beside Actor (the big zone), with Targets/Interrupts
   below. This is a reusable tactical cluster that could be lifted into other
   layouts wholesale.

#### Open tensions

- The brief explicitly warns: _if the overlay is open most of the time, it
  wants to be a layout mode or docked panel._ F's honest risk is that during a
  long combat the GM lives in the overlay and the canvas-underneath becomes dead
  weight. The minimize affordance is the mitigation; whether it's _enough_ is
  the thing to validate.
- The overlay covers the participant column in the canvas, then re-renders a
  Roster inside itself. That's a duplicated zone. Worth deciding: does the
  overlay reuse the canvas's participant column position (slide in from there),
  so it reads as "the same people, now tactical"?

---

### G - Roster Spine

#### Overview

G makes **participants the spine of the screen** — a wide center column that the
GM looks at first, flanked by a thin prep rail (left) and a contextual
detail rail (right). The premise: in a creature-driven session, "who is here and
what state are they in" is the most-scanned information, so it earns the center
and the most width.

Tactical integration is **inline expansion** (Hypothesis #3): the center column
is already the participant list, so when tactics starts, the in-conflict rows
stay put, a Flow band appears above them, and the selected actor expands _inline_
into a full Actor surface between the conflict groups. No mode swap, no overlay —
the roster you were already reading grows a detail panel.

#### Worth carrying forward

1. **Participants as the primary axis.** This is the cleanest "what does the GM
   look at first?" answer of the six. If creature behavior is the heart of the
   app's philosophy, a layout that physically centers participants is worth
   taking seriously even beyond this prototype.
2. **Inline actor expansion preserves context.** The acting creature expands in
   place, with its conflict group still visible above and below. The GM never
   loses the social/tactical grouping to see one actor's options. This is the
   most "no context switch" tactical model of the set.
3. **Relevance grouping as in-column dividers.** The "In conflict /
   Non-conflicting / Out" split is rendered as lightweight labeled rules inside
   the center column, not separate panels. This keeps grouping cheap and lets
   groups grow/shrink as creatures change state. Reusable pattern.
4. **The right rail re-tasks cleanly per mode.** Exploration: conflict sources +
   A/M highlights + linked scenes + map. Tactics: Targets + Interrupts + compact
   conflict + pinned statblock. Same rail, swapped contents — the GM builds
   muscle memory for "detail lives on the right" regardless of mode.
5. **Prep is intentionally demoted.** The left rail is only 220px. This is a
   _statement_: room prep is reference here, participants are the act. Worth
   testing against the opposite instinct (H, I) to see which matches real play.

#### Open tensions

- When the inline Actor expands to ~500px inside a scrolling column, the
  non-conflicting group below it can get pushed far down. Inline expansion trades
  "no context switch" for "more vertical scrolling." Test with a real 6-creature
  roster.
- The 220px prep rail may be too thin for room prompts at a comfortable reading
  width (the budget wants ~600px measure for the longest bullets). G bets prep
  is glanceable here; if it isn't, prompts may need a low-overhead expand.

---

### H - Reading Column

#### Overview

H prioritizes **readable prose at a fixed measure**. The center is a single
~660px reading column holding room prompts and the read-aloud flavor text at a
comfortable line length, flanked by a thin utility rail (triggers, linked,
map) on the left and a persistent participant dock on the right. Tactics docks
as a **full-width tray along the bottom** (~280px) rather than taking column
space.

The bet: the GM is, at the core, _reading and paraphrasing text to players_, and
that text deserves typographic respect — a constrained measure, generous
spacing, not stretched across a 1fr column. Everything else serves that reading
act.

#### Worth carrying forward

1. **Constrained reading measure.** Capping the prose column at ~660px even on a
   wide monitor is the whole point. This directly serves the data budget's note
   that the longest room bullet is two lines at an 80ch width. The discipline of
   _not_ filling horizontal space with prose is the idea to keep.
2. **Bottom tactical tray = horizontal tactical strip.** Tactics arrives as a
   wide, short band: Flow across the top of the tray, then Roster / Actor /
   Targets / Interrupts as four horizontal cells. This is a genuinely different
   tactical geometry from everyone else's vertical Actor — worth prototyping for
   how it reads during fast turn-taking (eyes move left-to-right through the
   tactical loop).
3. **Participants stay docked through all modes.** The right participant dock
   never moves or collapses, even in tactics (where the tray's Roster duplicates
   it — see tension). Stable participant placement is a recurring "build visual
   memory" win.
4. **Reading column survives tactics.** Because tactics is a bottom band, the
   prose column shrinks vertically but stays on screen. The GM can still read the
   room mid-combat without dismissing anything.

#### Open tensions

- The bottom tray's Actor cell is the problem child: Actor wants ~500px tall, but
  the tray is ~280px. In a horizontal tray, Actor must scroll internally or
  truncate hard. This is the central thing to test — does a horizontally-sliced
  Actor work, or does the richest tactical zone simply not belong in a short
  band?
- Roster appears both in the right dock and in the tray. Either the dock becomes
  the roster in tactics (and the tray drops it), or one of them is redundant.

---

### I - Split Planes

#### Overview

I is the most literal reading of the brief's "two navigation planes" model: the
body is split into **two labeled half-columns** — a Prep / Location plane (left)
and a Session / Encounter plane (right) — each with its own header and its own
scroll. Neither owns the other.

Tactical integration is **plane resizing**: when tactics starts, the session
plane grows to ~64% and fills with the full tactical cluster
(Flow / Roster / Actor / Targets / Interrupts), while the prep plane compresses
to ~36% but _stays fully present and scrollable_. The GM inspects the room
without ever leaving combat.

#### Worth carrying forward

1. **Named planes as a mental model.** The explicit "Prep / Location" and
   "Session / Encounter" headers aren't decoration — they teach the GM that the
   screen has two halves with different jobs. This labeling could be valuable
   even if the eventual layout isn't a literal 50/50 split.
2. **Co-equal billing in exploration.** Starting at 50/50 makes a claim the
   other layouts don't: room and session are equally important until something
   tips the balance. This is the cleanest expression of "neither plane owns the
   other."
3. **Tactics as a weight shift, not a takeover.** Growing the session plane to
   64% (rather than overlaying or mode-swapping) means the transition is a smooth
   reproportioning. The prep plane never disappears — it just yields space. This
   is the gentlest exploration↔tactics transition of the six and the strongest
   answer to "the room must stay inspectable during combat."
4. **The session plane has its own internal grid.** In tactics, the session
   plane internally becomes Roster + (Actor over Targets/Interrupts). That's a
   self-contained tactical module living inside one plane — portable, and it
   keeps all tactical state spatially together.

#### Open tensions

- At 36% width on a typical monitor, the compressed prep plane may be too narrow
  for room prompts at reading width. Same measure problem as G's left rail, but
  more acute because prep was co-equal a moment ago and the drop is jarring.
- A hard 50/50 split "wastes" space when one plane is light (e.g., a room with no
  triggers and a quiet session). The fixed split is the simplest version; a
  resizable or content-weighted divider is the obvious iteration.
- Two independent scrolls side by side can be disorienting. Worth testing whether
  the planes should share a scroll baseline or stay fully independent.

---

### J - Horizontal Strata

#### Overview

J rotates the whole layout 90°: instead of columns, it stacks **full-width
horizontal bands**, scanned top-to-bottom by priority tier. A thin status band
(scene + dramatic question + threat + Flow), then a **horizontally-scrolling row
of participant cards**, then a prep band (prompts / conflict / triggers across
three cells), then a context or tactical band at the bottom.

The bet: priority is vertical, detail is horizontal. The GM's eye drops down
through tiers — "what's the situation, who's here, what's in the room, what's the
tactical detail" — and scans sideways _within_ a tier. Participants as a card
row (rather than a list) is the signature move.

#### Worth carrying forward

1. **Participant cards as a horizontal filmstrip.** Laying creatures out as
   ~180px cards in a scrolling row is a real alternative to the vertical list
   everyone else uses. Cards can hold more per-creature state (HP, conditions,
   reaction, A/M hint) at a glance and map naturally to "tokens on a table."
   This is the single most reusable idea in J.
2. **Tier-based vertical priority.** The top-to-bottom ordering encodes access
   priority spatially: the higher the band, the more immediate. This is a clean
   way to express the Immediate / Low-overhead hierarchy without hiding anything.
3. **Flow in the status band.** Putting turn order in the always-visible top
   strip (when tactics is active) keeps "where are we in the round" at the very
   top of the scan, separated from the heavier Actor/Targets detail below.
   Echoes F's minimize-strip instinct but always-on.
4. **Tactical band swaps in for the context band.** In tactics, the bottom band
   becomes Actor / Targets / Interrupts (three horizontal cells); in exploration
   it's map + linked scenes. The participant filmstrip and prep band above it
   stay put — so tactics adds a bottom tier rather than rearranging the top.

#### Open tensions

- Vertical budget is the enemy. Four-plus stacked bands on a fixed viewport means
  each band is short. The participant filmstrip at ~120px tall and the tactical
  band sharing the remaining `1fr` will both feel cramped — the Actor zone
  especially (same problem as H's tray, since both go horizontal).
- Horizontal scrolling for participants is unusual and can hide creatures
  off-screen edge. With 6–8 cards this is probably fine; worth confirming the
  densest encounter (8 creatures) doesn't push key actors out of view.
- Three equal prep cells (prompts / conflict / triggers) give prompts only ~1/3
  width — again tight for reading-width prose.

---

### K - Lens Canvas

#### Overview

K is the minimalist: the immediate surface is _deliberately sparse_ — scene
header, a centered reading column of room prompts + flavor, and a persistent
participant dock. Everything else (triggers, conflict, A/M surface, linked
scenes, tactics) is a **lens**: a toggle in a thin left icon rail that opens a
non-layout-shifting docked sheet on the right.

The bet: the brief warns "if everything is immediate, nothing is." K takes that
to its logical end — keep the immediate tier tiny and make _everything else_ one
deliberate toggle away, opening as an overlay that never reflows the base canvas.
Tactics is just the most elaborate lens.

#### Worth carrying forward

1. **An explicit lens vocabulary.** K treats "lens" as a first-class, uniform
   interaction: every secondary zone opens the same way, in the same place, with
   the same close affordance. This consistency is the core idea — the GM learns
   one interaction and it works for triggers, A/M, conflict, and tactics alike.
   Directly serves the brief's "tap/toggle lenses over press-and-hold."
2. **Lenses don't shift the base layout.** The sheet docks over the right region
   as an overlay, so opening a lens never moves the prose or the participant
   dock. This protects the "build visual memory" goal while still allowing rich,
   on-demand detail — the explicit requirement from the A/M section of the brief.
3. **Aggressively minimal immediate tier.** Only prompts + participants are
   always-on. This is the strongest test of "what is _truly_ immediate?" If the
   GM can run smoothly with this little persistent, it validates pushing most
   zones to low-overhead. If they can't, the failures tell you exactly which
   zones must be promoted back to immediate — which is _itself_ the most useful
   prototyping outcome of the whole set.
4. **Tactics as the heaviest lens.** The tactics lens stacks the full cluster
   (Flow / Roster / Actor / Targets / Interrupts) vertically in a 420px sheet.
   This reframes tactics as "the biggest reference you can pull up" rather than a
   mode — a genuinely different philosophy worth contrasting with F (overlay) and
   I (plane).
5. **The lens rail doubles as a presence indicator.** The icon rail shows which
   lenses are even _available_ in the current mode (conflict/A/M only appear with
   an encounter). The rail itself communicates what context exists. Worth
   developing — e.g., a badge for "this lens has unread/changed content."

#### Open tensions

- The tactics lens at 420px wide and vertically stacked makes Actor narrow and
  forces a lot of scrolling through Roster→Actor→Targets→Interrupts. For
  sustained combat this is probably _too_ minimal — K's tactics is its weakest
  mode by design, and that contrast is the point, but it's the first thing to
  pressure-test.
- A right-docked lens covers the participant dock. If the GM needs participants
  _and_ an open lens simultaneously (very likely), the dock either needs to move
  or the lens needs to not overlap it. This is the central layout conflict to
  resolve.
- "Everything is a toggle" risks death-by-clicking during fast play. The open
  question: which one or two lenses are used so often they should be promoted out
  of the rail and made persistent? K is the experiment that surfaces that answer.

---

### Cross-Layout Synthesis (for the next thread)

If picking pieces to combine rather than a single winner:

- **Where does Flow live?** F (minimize strip), J (top status band), and the
  others (inside the tactical cluster) disagree. A persistent, always-visible
  Flow — separated from the heavy Actor detail — recurs as a strong instinct.
  Worth treating as a near-settled decision.
- **The reading-width problem is universal.** G, I, and J all squeeze room
  prompts narrower than the ~600px the budget wants; H and K explicitly protect
  it. This is a real constraint, not a per-layout quirk — decide early whether
  prose gets a protected measure, because it rules out the thin-prep-rail
  layouts if it does.
- **Three tactical geometries are on the table:** vertical Actor cluster
  (F, I, K), horizontal tactical band (H, J), and inline-in-roster (G). These
  are the genuinely different bets; the rest is arrangement. The horizontal-band
  approaches all strain the Actor zone — that's the clearest empirical finding.
- **Participants: list vs. dock vs. filmstrip vs. spine.** G (center spine),
  H/F/K (side dock), J (horizontal filmstrip) are four distinct treatments. The
  filmstrip (J) and the spine (G) are the two most novel and most worth a
  dedicated iteration.
- **Room-survives-tactics, ranked gentlest→harshest:** I (plane shrinks) → G
  (prep rail untouched) → H (prose shrinks, stays) → J (prep band stays, context
  band swaps) → F (room dimmed behind overlay) → K (room visible, but attention
  pulled to lens). Pick based on how often you expect the GM to glance at the
  room mid-combat.

## GPT-5.5

My overall tactic was to continue the same FPO-only exploration, but to push
harder on stable scan zones and transitional behavior. I treated the existing A
through K set as already covering many obvious grids, so L through P try to make
each layout legible as a distinct operating theory: a timeline shelf, a
map-first table, a tabbed workbench, a tactical overlay, and a more literal
dual-plane split.

I also tried to make the content-volume hints do more design work. Participant
and Actor zones keep getting the largest stable budgets because the data budget
makes them the most expensive zones during tactics. Room prompts and triggers
stay visible in most variants, but I deliberately moved them between primary
reading surfaces, overlays, trays, and compressed references to expose which
placements feel promising for another round.

### L - Timeline Shelf

L's central idea is that tactical Flow deserves its own persistent horizontal
shelf rather than being buried inside the Actor/Roster cluster. The screen starts
as a three-column running cockpit: room on the left, active working surface in
the center, participants on the right. When tactics is active, the turn-order
shelf appears as a full-width band above the mode switcher, giving the GM a
stable bottom scan target for "where are we in the loop?"

#### Flow as tactical residue

The most interesting part is the bottom Flow Timeline. It borrows from the
recurring instinct in F and J that Flow is special: it is tactical, but it is
also ambient orientation. It should remain visible even when the GM is reading
room text or looking at participants. A bottom shelf also avoids stealing the top
header, which is already doing scene identity and running-alert work.

For further prototyping, this suggests a reusable Flow component that can dock
at top, bottom, or inside a panel. The question is less "what does Flow contain?"
and more "where is the GM's eye allowed to find it every time?"

#### Center as a mode-sensitive work lane

L keeps the center as the active work lane. In exploration, it is trigger detail,
encounter context, and a pinned low-overhead lens preview. In tactics, it becomes
Actor plus Targets/Interrupts. That makes the center column feel like the place
where the GM resolves the current problem, while the left and right columns hold
stable context.

This is useful because it separates stable memory from current task. Left means
room, right means people, center means the thing being decided now. That mapping
is easy to explain and probably easy to learn.

#### Participants stay visually stable

The participant column remains on the right in all modes. When tactics starts, a
Roster block is added beneath the participants rather than replacing them
wholesale. The FPO version is intentionally rough here, but the design question
is good: can the same participant column carry both session-state grouping and
initiative-sorted tactical ledger, or do those need to be separate surfaces?

A next prototype could test a split participant rail where the top remains
encounter-relevance grouping and the bottom becomes initiative order. That may
preserve both mental models without duplicating full rows.

#### Alerts in the top bar

L combines room-start reminders, triggers, and linked-scene navigation into the
header band. This is a useful pressure test for compact running alerts. It says
the GM should not have to hunt for "things that might fire" before reading the
room or responding to players.

The risk is that triggers have a real ~150px compact budget, so a single header
FPO may be too optimistic. Still, the direction is worth keeping: the most urgent
trigger summaries might belong in a high-priority alert strip, with full trigger
detail lower in the center work lane.

#### What to carry forward

The strongest reusable piece is the distinction between Flow as persistent
orientation and Actor as task detail. The second strongest is the three-role
column model: room context, active work, people context. L is less novel visually
than some variants, but it has a clean operating grammar.

### M - Map Table

M is the most map-first of my five variants. It treats the center as a tabletop:
the map or atmosphere image fills the primary surface, while room prompts,
triggers, and conflict context sit as overlays or trays around it. Participants
live in a left rail. Actor and A/M/reference surfaces live in a right rail.

The bet is that in some sessions the GM thinks spatially first. The room is not
just text; it is a table surface where nearby areas, triggers, creature
entrances, and mood all relate to physical position.

#### Map as the primary anchor

The obvious interesting part is the central map table. It gives the map the same
first-viewport dignity that room prompts often get in text-first layouts. This
is useful if the app eventually supports tactical maps, exploration maps, or rich
atmosphere images that carry real play information.

Even with FPO blocks, this asks a good product question: when a room has an
image, should that image be decorative reference, or should it become the
organizing surface for running the scene?

#### Prompt overlays, not prompt panels

M places room prompts and flavor text as overlays on the map surface. This is
not just visual styling. It says the GM should be able to read the room while
still seeing the spatial context behind it. It is a different answer from H/K's
protected reading column: prose stays immediate, but it becomes part of the
tabletop instead of a document column.

For further prototyping, this needs real text quickly. Overlay readability is
fragile. If it works, it could feel wonderfully direct; if it fails, the
map-first approach probably needs a dedicated prose side panel.

#### Bottom tray for selected details

The bottom row is a detail tray for selected trigger or room-reference content.
This is useful because map-first layouts need a place for detail that does not
permanently cover the map. Traps and skill outcomes can be 200-500px of content;
the bottom tray gives that content a predictable destination.

A next version could make the tray explicitly tabbed: selected trigger, selected
linked scene, selected prepared setup. The map remains the anchor while detail
changes below.

#### Right rail shifts between behavior and tactics

In exploration/encounter mode, the right rail is A/M surface preview plus
prepared setups. In tactics, it becomes Flow, Actor, and Targets. That makes the
right rail the "decision aid" rail: behavior before initiative, action choice
during initiative.

This is promising because A/M and Actor are conceptually adjacent. Both answer
"what does this participant do now?" A layout that makes them share a home may
support a smoother transition from roleplay motivation to tactical action.

#### What to carry forward

The map table is the strongest idea if the app wants visual assets to matter
during running mode. The second strongest is the bottom selected-detail tray.
Together they suggest a future map-first prototype with actual clickable trigger
pins, linked-room edges, and a persistent selected-detail well.

### N - Tabbed Workbench

N treats the running screen more like an IDE workbench. There is an
always-visible immediate header with scene identity and room prompts, then a tab
row for Run, People, Threats, and Reference. The body is split into stable side
rails and a central workbench that changes by mode.

The bet is that the GM can tolerate more explicit navigation if the current tab
surface is large, stable, and predictable. Instead of making every zone visible,
N makes the most important zones visible and gives the rest named, one-click
destinations.

#### Tabs as semantic compression

The tab row is the key experiment. It compresses several low-overhead surfaces
into named destinations without pretending they all fit at once. Run, People,
Threats, and Reference are not implementation tabs yet; they are a taxonomy for
what the GM reaches for.

This is useful for further prototyping because it can be tested independently
from the exact layout. If the labels feel right, they could become keyboard
lenses, side-panel routes, or actual tabs. If they feel wrong, the labels reveal
how the GM mentally groups the screen.

#### Immediate prompts above the tabs

N keeps room prompts in the header, above the workbench. That avoids a failure
mode of tabbed interfaces: hiding the thing the GM needs most behind the
currently selected tab. The tabbed surface is for changing focus; the prompt
summary remains part of the stable running shell.

This is a good compromise between K's minimal immediate tier and the denser
cockpit layouts. It asks whether a compact prompt summary is enough if full
details live in the Run tab.

#### Left rail as trigger/reference index

The left rail holds triggers, linked scenes, and a map thumbnail. That makes it
an index of "things adjacent to the current room" rather than a full content
surface. It is useful because it gives the GM persistent awareness of nearby
possible pressures while keeping detailed reading in the center.

A more mature version could make this rail a navigable outline: triggers grouped
by type, linked scenes with badges, map preview with current-room marker.

#### Tactics replaces the workbench, not the shell

When tactics is active, the center workbench becomes Flow, Actor, Targets, and
Interrupts. The side rails remain in place. This is a moderate version of a
layout switch: the main task area changes, but the shell still says "same
screen, same room, same participants."

This may be one of the more practical patterns. It gives Actor enough space
without overlaying the whole app or squeezing it into a bottom tray.

#### What to carry forward

The most useful thing in N is the Run/People/Threats/Reference vocabulary. The
second is the idea that immediate prompts can live outside the tab system while
deeper prompt, trigger, and reference content lives inside it. This could become
the organizing model for keyboard navigation even if the final layout is not
visibly tabbed.

### O - Tactical Overlay

O revisits the tactical-overlay hypothesis, but heavier and more modal than F.
The base screen is a three-column exploration/encounter layout. In tactics, a
large centered overlay covers most of the workspace and contains a full tactical
mini-app: Flow header, Roster, Actor, Targets, Interrupts, conflict progress,
and reference preview.

The bet is that sustained tactics may need a true foreground surface, but the
room should remain visually present behind it so the GM understands that combat
is still happening inside a scene.

#### Overlay as a tactical mini-app

The strongest idea is the overlay's internal completeness. It does not merely
show initiative. It has the full tactical loop: Flow at top, Roster on the left,
Actor in the middle, and interrupts/reference on the right. This is close to a
standalone combat cockpit, but still framed as a layer over running mode.

For further prototyping, this is useful as a control case. If a full overlay
feels best during combat, then the product may need a tactical mode after all.
If it feels too separate, the lighter shelf or plane-shift approaches become
more attractive.

#### Room remains visible but demoted

O keeps the base room screen visible behind the overlay. That is psychologically
different from routing to a new page. The GM can still see that prompts,
triggers, map, and participants exist, even if they are not currently readable.

This is worth testing because it may satisfy the brief's requirement that
encounter context not replace the room while still giving tactics the space it
needs. The exact opacity and coverage matter a lot here.

#### Dedicated conflict progress column

Inside the overlay, conflict progress sits beside Interrupts and Reference. That
is a useful tactical framing: conflict sources are not just encounter metadata
from before initiative; they remain active progress markers during the tactical
loop.

A future version should test conflict sources as round-by-round pressures:
resolved, escalating, ignored, about to trigger. O gives them a plausible
tactical home.

#### Base layout is still useful without tactics

The non-tactics base is conventional but sturdy: triggers and conflict on the
left, map and linked scenes in the center, participants on the right. That
matters because an overlay approach only works if the underlying home surface is
good enough to return to.

The interesting iteration would be to combine O's overlay with a stronger base
from H, I, or N, then see whether the overlay still feels necessary.

#### What to carry forward

The overlay's internal tactical completeness is the thing to keep. It is a good
candidate for a focused tactical prototype with real data. The risk to carry
forward is also clear: if the overlay is open for most of combat, it may be
better as a layout mode than an overlay.

### P - Dual Plane Split

P is the most explicit continuation of the brief's two-plane model in my set. It
divides the body into a Prep Plane and a Session Plane. Each plane has its own
header and internal layout. In tactics, the session side grows and becomes the
tactical surface while the prep side stays visible and scrollable.

The bet is that running mode is not one hierarchy with room on top and encounter
below. It is two simultaneous contexts that need to remain independently
navigable.

#### Two planes with independent headers

The clearest part of P is that both planes have their own header. The prep side
announces room reminders and linked-scene count. The session side announces
either current participants/A-M entry or conflict sources/threat status. That
makes each half feel like a real workspace, not a sidebar.

This is useful because it may help the GM understand scene focus versus
encounter focus. You can inspect a room without pretending the encounter
disappeared, and you can run an encounter without pretending the room stopped
mattering.

#### Prep plane owns adjacency

P puts linked scenes and prepared setups inside the Prep Plane, beside room
prompts, triggers, and the map. That is a clean grouping: these are things that
could become relevant because of location, noise, movement, or room interaction.

This grouping feels especially promising for future fixture work. Prepared
creature setups are not session participants yet, so putting them in the
prep/location plane avoids prematurely making them part of the active roster.

#### Session plane owns behavior and conflict

The Session Plane owns participants, A/M highlights, conflict sources, and
tactical state. This keeps behavior-critical information close to the creatures
and groups that use it. It also avoids scattering A/M across unrelated room
panels.

For further prototyping, this suggests that the shared A/M surface should
perhaps be launched from the session plane, while prepared-setup A/Ms are
launched from the prep plane. Same type of information, different runtime
relevance.

#### Tactics as a plane weight shift

In tactics, P shifts from roughly balanced planes to a wider session plane. The
prep plane remains present. This is similar to I, but P's internal plane
structure is more detailed: prep has its own two-column room/adjacency layout,
while session has participants plus a tactical/reference column.

This is probably the most useful transition model in my set. It does not require
an overlay, and it does not pretend tactics can fit into a small band. It simply
gives the session plane more room when the session plane becomes more demanding.

#### What to carry forward

The strongest reusable idea is the strict ownership model: prep owns room,
triggers, adjacency, and prepared setups; session owns participants, conflict,
A/M, and tactics. The second is the weight-shift transition. P may be the best
structural base for a second round because it maps closely to the conceptual
model in the task document.

### GPT-5.5 Cross-Layout Synthesis

Across L through P, I would carry forward four main ideas into the next thread.

First, Flow probably wants persistent treatment separate from Actor. L's bottom
shelf and O's overlay header both reinforce that Flow is orientation, not deep
detail. Even if the final layout changes, Flow should be easy to find and hard
to accidentally hide.

Second, the prep/session ownership split is getting clearer. P expresses it most
explicitly, but M and N also support it: room adjacency and prepared setups feel
different from active participants and conflict state. That distinction should
shape fixture and interaction design, not just layout.

Third, map-first running mode is worth one real-data prototype. M may or may not
be the winner, but it asks a valuable question that text-first layouts avoid:
can the map become the working surface for triggers, exits, and creature
entrances?

Fourth, tactics needs more vertical room than horizontal trays tend to give it.
L, N, O, and P all give Actor a tall central or right-side surface. That feels
more plausible than trying to squeeze Actor into a short band. The next round
should probably treat horizontal tactical bands as a secondary pattern unless
real data proves otherwise.

## Thoughts on [Feedback](./feedback.md)

### Opus 4.6

The feedback confirms some instincts from A–E and kills others cleanly. A few
reactions that feel worth forwarding.

**I was wrong about where participants belong.** I put participants on the right
in A and E, on the left only in C, and in a center column in none of my layouts.
The feedback says important content belongs to the left, and participant roster
shouldn't go right. That invalidates the right-side participant column in A and E
outright. C's thin left rail was accidentally closer to the right instinct, but
at 180px it's too narrow for cards with mixed data types. The next round should
default to a left-side participant column wide enough for card-style rows
(~220–280px), and treat the right side as the reference/dismissable zone.

**The "4/9 meaningful content" rule reframes my focus-panel approach.** C's whole
bet was a dominant central focus panel (~60% width). The feedback says meaningful
content shouldn't exceed about 4/9 of screen width because it forces too much
horizontal eye movement. That doesn't kill C's idea — it means the focus panel
needs a hard max-width, probably around 600–650px on a 1440px monitor, with
the excess space going to rails. This is actually a better version of C: a
constrained-width focus panel that doesn't stretch, flanked by functional rails.
H from Opus 4.8's set had similar discipline with its 660px reading column.

**Flavor text and room-start reminders should stop taking permanent layout
space.** I gave them dedicated FPO blocks in every layout. The feedback says they
feel like lenses or snackbars — visible by default, easily dismissed, recoverable.
That means they shouldn't be sized into the grid. They should float, overlay, or
collapse. This frees real space in every layout — the ~70px flavor block and
~28px reminder block can become zero-height in their dismissed state. For the
next round, I'd prototype flavor as a collapsible blockquote (starts expanded,
collapses to a one-line "show flavor text" link) and room-start reminders as a
toast/snackbar that auto-appears on scene entry and can be dismissed.

**Breadcrumbs and threat level are cut.** I had breadcrumbs in the header of
every layout and threat level in the encounter bar. Both are gone. That's 50–70px
of header space freed up across the board. For my layouts specifically, A's wide
header strip gets meaningfully shorter, which partially addresses the concern
that it was too tall.

**Targets should be a modal, not a layout zone.** I gave Targets a persistent
block in tactics mode for A, C, and E. The feedback says it's on-demand data,
perfect for a dismissable modal. That simplifies every tactical layout: Actor +
Interrupts are the persistent tactical zones, Targets pops up when needed. This
also shrinks the tactical cluster enough that inline-in-layout approaches (rather
than overlays) become more viable.

**The "A/M highlights" misunderstanding is revealing.** All three models invented
a widget for A/M highlights. What was actually meant was cross-highlighting —
hover a conflict source, see related participants light up. That's an interaction
pattern, not a content zone. It takes zero layout space. This is a good reminder
that not every piece of information in the task doc maps to a box on screen.
Some are behaviors, not zones. The next round should be more careful about
distinguishing data zones from interaction behaviors when reading the brief.

**The triggers/interrupts convergence question is the most interesting open
problem.** The feedback asks whether triggers and interrupts are similar enough
to merge. I think the answer is conditionally yes: they share the same cognitive
role ("something might fire now"), but their data sources differ (scene data vs.
participant abilities). A unified "watch list" zone that shows scene triggers in
exploration and transitions to include participant reactions/passives in tactics
could work. The risk is that the zone gets too long and heterogeneous. Worth
prototyping as a single scrollable list with type badges, and seeing whether the
GM can scan it or whether the mix is confusing.

**The dual-plane split (I, P) should get a serious prototype.** The feedback
calls it "weird but interesting" and wants at least one in the next round. My set
didn't include a dual-plane layout. Given the feedback about left-side importance
and the prep/session ownership model, a next-round plane split should probably
put the session plane on the left (participants + encounter + tactics) and the
prep plane on the right (room + triggers + linked scenes + map). That reverses
the conventional assumption but follows the "more important = more left" rule,
since participants and encounter state are the GM's primary scan target.

### Opus 4.8

F–K were mine, so this is partly an accounting of what the feedback breaks in my
own set, and partly a few framings I think are worth forwarding over and above
the obvious cuts (breadcrumbs, threat level, A/M-highlights-is-an-interaction —
I agree with all of those and won't re-argue them).

**The biggest correction lands on a mistake I made three times.** F, H, and K all
park participants in a right-side dock. I rationalized it as "stable home for the
roster," but the feedback's left-is-important / roster-never-right rule says that
instinct was simply wrong, and I repeated it without examining it. The honest
read: I defaulted the right rail to "the thing I didn't know where else to put,"
and the roster kept landing there because it didn't fit my center bet. Only G
(center spine) survives intact. The forwardable lesson is narrower than "put
participants left" — it's that I should have had an explicit reason for every
right-rail placement, and "it's stable there" is not a reason when stable-and-
demoted is the wrong tier for primary data.

**The feedback adds an axis my access-tier model was missing: transience.** My
tier model had immediate / low-overhead / eventually, plus runtime-relevance
states, but no notion of _importance that decays with time_. Yet four separate
feedback notes — reminders-as-snackbar, flavor-as-dismissable, threat-level-is-
prep-only, targets-on-demand — are all the same shape: **high importance for a
short window, then near-zero.** That's not the low-overhead tier (which is about
interaction cost) and not "could become relevant" (which is about prep). It's a
fourth thing. If the next session adopts one idea from this feedback, I'd make it
this: classify each zone on a _duration-of-relevance_ axis alongside the access
tier. Anything that's "loud on entry, quiet after" should not reserve grid space
— it should arrive (toast/overlay/expanded-then-collapsed) and recede. That one
reframing dissolves several of the "not needed" items at once instead of treating
them as separate cuts.

**The width rule is really a data-shape rule, and it composes into one concrete
exploration layout.** Reading "≤4/9 per content zone," "cards in narrow columns,"
"collapsible prose in wide columns," and "important = left" together, they stop
being four constraints and become a single recipe: a narrow **card column**
(participant roster, ~1/6, cards grow vertically) on the left or left-of-center,
a wider **collapsible column** (room prompts + triggers as action-first rows that
expand to detail, capped ~4/9) beside it, and a right rail reserved for genuine
reference (map, links, pinned statblocks). I had the reading-width instinct in H
but applied it to _prose_; the sharper version is that column width should be
chosen by the _shape_ of the data in it, not by which content I considered most
important. That's a cleaner rule than "prose needs 600px."

**J's specific failure generalizes into a placement principle.** The note "J makes
me jump through prep when I switch an actor" is exactly right, and it's not a J
quirk — it's that I let a prep band sit _between_ the roster and the actor detail.
Any layout where selecting a participant and then reading their detail crosses
unrelated content will feel like this. Principle to forward: **roster and
actor-detail must be spatially adjacent** — switching actor and inspecting the
result should be one short eye-movement, never a scroll past room data. That rules
out the horizontal-strata arrangement for tactics regardless of how the bands are
sized.

**Overlay (my F, and O) is fairly deprioritized — but extract the kernel before
dropping it.** I accept the overlay path costs more than it returns here. The one
thing worth saving from F is the _minimize-to-Flow-strip_ idea: the question
"what is the smallest persistent tactical residue when tactics isn't in focus?"
The answer (turn order / active actor, nothing else) is valuable in a _non_-
overlay layout too — it tells you what a docked or inline tactical zone should
collapse to. So: keep "Flow is the irreducible tactical remainder," discard the
floating-panel shell that carried it.

**On the triggers/interrupts merge — I'd push the unification onto a different
axis than domain type.** The shared role is "should something fire right now?",
but I don't think the clean split is scene-data vs. participant-ability. It's
**reactivity/urgency**: a creature's reaction or a trap's trigger is time-critical
and interrupt-shaped; a skill-check prompt is player-_initiated_, low-urgency, and
reference-shaped. Those want different visual weight even though both are
"triggers" in the brief. So a merged watchlist should be sorted/filtered by
urgency, and I'd test whether skill checks even belong in it or whether they're a
calmer "available actions in this room" list that happens to share a section
header. The trap-reaction-becomes-an-interrupt-when-combat-starts example is the
strongest case for the merge precisely because that item is reactive in both
modes — it's the same urgency class, just a mode change.

**One genuine reservation, not a disagreement.** "Important info belongs left" is
a strong and useful heuristic, but I'd hold it as a _focus gradient_ (act on the
left/center, reference on the right) rather than a hard rule, because it can
collide with reading order for prose-heavy zones and with the desire to keep a
truly stable roster position. The dual-plane direction 4.6 proposed (session
plane left, prep plane right) follows the rule cleanly and is worth building — but
I'd watch for the case where the GM is _exploring_ (no encounter), where the
"most important" thing genuinely is the room, and the gradient may want to invert.
A layout that's honest about "what's primary right now depends on mode" may serve
the gradient better than a fixed left-right importance map.

### GPT-5.5

The feedback makes me less interested in defending any one of L-P and more
interested in extracting a smaller set of constraints. My own set was still too
willing to spend space just because a zone was "important." The feedback is a
good correction: importance is not the same as permanence, and permanence is not
the same as width. A few things I treated as stable layout citizens should
instead become transient, dismissable, or on-demand surfaces.

**The biggest correction to my work is participant placement.** L, M, N, and O
all put participants on the right or made the right rail too important. I was
thinking in terms of stable side docks, but the feedback reframes the right edge
as reference territory. That makes P more promising than the rest of my set, but
only if the session/participant plane moves left or left-of-center. For the next
round, I would stop treating "right roster" as a neutral option. If the roster is
primary, it should live where the eye starts or where actor detail can sit
immediately adjacent to it.

**I would demote almost all one-shot context from the fixed grid.** Room-start
reminders, flavor text, threat level, and targets were all overrepresented in my
layouts. The feedback's "important for a limited amount of time" framing is the
cleaner model. I would now prototype room-start reminders as an entry snackbar or
small recoverable alert; flavor as expanded-on-entry and dismissable; threat
level as prep/setup-only; targets as a modal or popover triggered from an action
or participant row. This frees the main grid for data that needs repeated
scanning.

**The trigger/interrupt question should probably become the central R2 content
problem.** My layouts treated triggers and interrupts as separate zones because
the brief named them separately. Your feedback points at a better abstraction:
"things that might fire now." I would not merge everything blindly, though. I
would split by urgency and initiation: reactive/time-critical items form a
watchlist, while skill checks and room affordances are calmer action prompts.
Traps are the interesting bridge case, because a trap can be a room trigger in
exploration and an interrupt-like pressure in tactics.

**M is still worth trying, but only as a real readability test.** I agree with
your concern that map-first layouts need free space and have hard background
readability problems. My FPO version makes M look easier than it is. The next
map-first prototype should use actual image contrast, translucent surfaces,
text-shadow/backdrop decisions, and enough empty map area to judge whether this
is viable. If we cannot make prompts readable without smothering the image, M's
useful remnant is probably just "map as right-side/reference surface with pinned
spatial cues," not "map as primary table."

**N's tab/workbench idea survives, but as a low-confidence organizing tool.** I
still like the Run / People / Threats / Reference vocabulary, but your feedback
is right that this can become "everything is a lens" in disguise. The next
version should decide what stays in the frame before inventing tabs. My current
guess: roster plus room/action prompts stay in frame; A/M collection, target
resolver, statblocks, flavor, and deeper trigger detail can be lenses/tabs.
Tabs are useful only if they reduce search cost, not if they hide things the GM
periodically scans.

**P becomes the best structural seed from my set, but it needs the feedback's
width rules.** The dual-plane idea is conceptually strong, and your note that P
looks more promising than I matches my reassessment. But the next version should
not be a naive 50/50 split. It should use data-shaped columns: a narrow card
roster or session rail, a wider collapsible prompt/trigger column, and a
right-side reference rail. In other words, dual-plane should become an ownership
model first and a geometry second.

**The next prototype should reduce zones, not add clever containers.** My L-P
set still includes too many blocks because I was trying to honor every named
piece of the task document. The feedback gives permission to cut: no
breadcrumbs, no live threat badge, no persistent targets, no literal A/M
highlights widget. That makes the next round sharper. The screen can focus on
participants, room/action prompts, reactive watchlist, active conflict question,
and reference/lenses. Fewer always-visible zones will probably teach us more than
another five complete cockpit layouts.
