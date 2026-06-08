# Running Mode Hypotheses

Hypotheses are shaped answers worth testing. They are not findings yet. Remove a
hypothesis once it has been tested and always write one or more findings from the
result, whether the hypothesis worked or failed.

Each entry should use this shape:

```md
## Hypothesis title

**Hypothesis:** The answer or direction to test.

**Why it seems plausible:** The reasoning that makes it worth trying.

**Would affect:** The surfaces, components, or planning assumptions it would
change.

**How to test:** The smallest useful prototype, document pass, or design exercise
that could validate or break it.
```

## Running Mode should use a left-to-right focus gradient

**Hypothesis:** Primary actionable information should live left or center-left,
while the right edge should generally hold less important reference surfaces.

**Why it seems plausible:** R1 feedback found that the rightmost part of the
screen feels less focusable and better suited to maps, links, notes, and pinned
statblocks. This is consistent with a common left-to-right reading bias, but it
is not a universal interface law. It may also be a personal preference worth
respecting in a single-user app.

The hypothesis does not require the same content to remain leftmost in every
mode. Exploration may make room content primary; active tactics may make session
content primary.

**Would affect:** Participant roster placement, actor-detail placement,
reference rail design, map placement, and dual-plane layout direction.

**How to test:** Prototype layouts with actionable information left or
center-left and reference on the right. Compare how quickly the GM can reorient
in exploration and tactics, including a layout where the primary plane changes
weight by mode.

## Dual-plane ownership can guide layout without forcing a 50/50 split

**Hypothesis:** The prep/location plane and session/encounter plane should define
content ownership, but the screen geometry should follow data shape rather than a
literal equal split.

**Why it seems plausible:** Layouts I and P were weird but promising. P looked
more promising because it arranged internal sections more explicitly, but a
naive two-column split can still create width problems. The plane model may be
most useful as a scoping rule: prep owns room/adjacency/prepared setups; session
owns participants/conflict/A/M/tactics.

**Would affect:** Layout shell, component ownership, and where prepared creature
setups live before entering the session.

**How to test:** Prototype a dual-plane shell with data-shaped widths. Avoid a
simple 50/50 split unless the component internals support it.

## Prep can hug a session-dominant workspace

**Hypothesis:** Instead of a left/right plane split, prep can occupy the header
and a right reference column while the rest of the screen belongs to the
session/encounter plane.

**Why it seems plausible:** This preserves distinct prep and session ownership
without requiring both planes to be parallel columns. It gives the session a
large contiguous working area while keeping room context wrapped around it and
available.

**Would affect:** Scene header content, right reference rail, session workspace,
mode transitions, and the relationship between room prompts and participants.

**How to test:** Prototype a shell with room identity/prompts across the header,
prep/reference material in the right column, and participants plus active
session work in the remaining body. Check whether prep still feels immediate
enough during exploration.

## Room prompts and skill checks want wider collapsible rows

**Hypothesis:** Room/action prompts and scene skill checks should use
action-oriented rows in a wider column, with detailed data in collapsible
sections, sidebars, or popups.

**Why it seems plausible:** This content has an action-oriented default ("what
players do or notice") plus larger supporting detail such as DC, effects, and
outcomes. It differs from participant cards, which are compact state containers.

**Would affect:** Room prompt internals, trigger internals, immediate/low-overhead
split, and column width rules.

**How to test:** Prototype room/action prompt rows and skill-check rows with real
or realistic text, then measure comfortable widths and expanded detail behavior.

## Triggers and interrupts may share a reactive watchlist model

**Hypothesis:** Scene triggers and tactical interrupts can share a common
"something might fire now" surface, but items should be grouped or weighted by
urgency and initiation model.

**Why it seems plausible:** Both categories remind the GM to check whether
something should happen now. However, skill checks, trap triggers, creature
reactions, and A/M cues do not all have the same urgency. Trap reactions are the
strongest bridge case because they can behave like scene triggers in exploration
and interrupts in tactics.

**Would affect:** Trigger component internals, interrupt placement, tactical mode
transition, and possible watchlist data model.

**How to test:** Prototype a watchlist with examples from scene traps, skill
checks, creature reactions, passive abilities, and conflict/A-M cues. Test
whether one surface works or whether the concept splits into a reactive watchlist
plus calmer action prompts.

## The shared A/M surface is participant-centered trigger context

**Hypothesis:** A shared A/M surface should work like participant-centered
trigger context: a fast way to see behavior-relevant aspects and motivations for
active participants.

**Why it seems plausible:** Feedback liked the shared A/M surface from M and P as
a way to notice "this participant would care about this PC action." It is not
necessary immediate-tier data, but it may be important enough to access quickly.

**Would affect:** A/M surface grouping, participant rows, conflict-source
cross-highlighting, and lens design.

**How to test:** Prototype A/M surface internals grouped by active participants.
Test an in-place lens treatment that replaces or augments participant-card
content, with tooltips when the full A/M text cannot fit.

## Some important information should be transient and recoverable

**Hypothesis:** Room-start reminders and flavor text should appear at the moment
they matter, then become dismissable and recoverable rather than reserving
permanent screen space.

**Why it seems plausible:** Both are important near room entry, but their value
often decays quickly. Permanent space makes the running surface pay an ongoing
cost for short-lived information.

**Would affect:** Scene-entry behavior, prompt layout, notifications, and
recoverable reference controls.

**How to test:** Prototype entry-time reminders and flavor text using
expanded-then-collapsed blocks, snackbars, or in-place temporary states. Verify
that accidental dismissal is easy to recover from.

## The stable frame should contain fewer zones

**Hypothesis:** The stable Running Mode frame should focus on repeatedly scanned
information and leave transient, on-demand, prep-only, or relational behavior
outside permanent layout zones.

**Why it seems plausible:** R1 repeatedly tried to place every named concept.
Feedback removed or reframed several of them: threat level is prep-only, Targets
are on demand, A/M highlights are behavior rather than a widget, and entry-time
content may be transient.

**Would affect:** The number of stable scan zones, component priorities, layout
density, and what becomes a lens, modal, popup, or temporary state.

**How to test:** After component internals are understood, build a deliberately
small stable frame and note which missing surfaces cause repeated interaction or
loss of situational awareness.

## A map-first layout might work only with real readability constraints

**Hypothesis:** A map-first Running Mode layout can work only if it preserves
enough free image space and solves text readability over variable backgrounds.

**Why it seems plausible:** Layout M is appealing because a map or atmosphere
image could organize room, triggers, nearby areas, and creature entrances
spatially. But FPO blocks hide the real difficulty: useful images need free
space, while transparent cards over images can become unreadable.

**Would affect:** Map placement, overlay styling, right-reference rail design,
and whether maps are primary or secondary in Running Mode.

**How to test:** Build one map-first prototype with actual image assets, real
contrast handling, and enough empty map area to judge whether the approach
survives.

## A tabbed workbench may help only after the stable frame is clear

**Hypothesis:** A tabbed workbench can organize low-overhead surfaces, but only
after the stable always-visible frame is defined.

**Why it seems plausible:** N's Run/People/Threats/Reference vocabulary seems
useful, but tabs reduce search cost only if they hide the right things and
preserve scan-critical data. Unlike lenses, tabs may replace the active surface
with a differently shaped layout.

**Would affect:** Keyboard navigation, tab taxonomy, A/M and reference surfaces,
and the layout shell.

**How to test:** First define the stable frame. Then test whether the remaining
low-overhead surfaces group naturally into tabs without hiding information that
needs periodic scanning.

## Group colors belong to runtime state

**Hypothesis:** The colors used by the adjacent group popup and membership dots are session-level display assignments rather than canonical participant-setup data.

**Why it seems plausible:** The adjacent popup established color as useful Running Mode presentation, but not who owns or assigns it. Colors distinguish the groups active in one session; they do not describe a group's canonical identity or behavior, and different active group sets may need different palettes.

**Would affect:** Runtime group participants, encounter initiation, group color selection, roster marks, and the group popup.

**How to test:** Prototype automatic runtime color assignment plus a small encounter-initiation override. Check whether colors need to persist across sessions before changing domain models.

## Inline participant and group A/Ms may be unnecessary

**Hypothesis:** Once the shared A/M surface exists, participant cards may not need inline motivations and the adjacent group popup may not need full group A/Ms.

**Why it seems plausible:** Repeating common aspects and inherited group A/Ms made similar creature cards tall and noisy. Rare individual motivations were more useful inline, but their value has not been compared with a shared A/M surface. The group popup needs names and colors as a membership legend, but its A/M body may duplicate the shared surface.

**Would affect:** Participant-card height, group-popup content, shared A/M structure, and interaction cost when deciding participant behavior.

**How to test:** Prototype the shared A/M surface with the roster visible. Compare three states: no inline A/Ms, participant motivations only, and participant motivations plus group A/Ms in the adjacent popup.

## Participant charges may work as a roster lens

**Hypothesis:** Charges such as focus points, spell slots, consumables, and ability uses can appear through a resource lens instead of permanently enlarging tactical participant cards.

**Why it seems plausible:** These resources are important only for participants that have them and only at certain moments. Permanent controls would tax every card, while a lens could reveal comparable resource state across the initiative roster.

**Would affect:** Participant resource modeling, tactical roster internals, resource editing, and lens composition.

**How to test:** First shape a concrete `ParticipantResource` model with several real examples. Then prototype a resource lens across a mixed roster and compare it with inline counters on only the affected cards.
