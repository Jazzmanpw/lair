# Running Mode Open Questions

Open questions are task seeds: unresolved prompts that may become hypotheses,
component studies, task files, or findings. They do not need a task to be
explored; sometimes thinking through the question is enough to turn it into a
hypothesis.

Each entry should use this shape:

```md
## Question title

**Question:** The unresolved design or planning problem.

**Why it matters:** Why this is worth keeping visible.

**Explore:** Possible angles, examples, or prototype directions.
```

## What remains unresolved in participant cards?

**Question:** How should participant cards handle exceptional content after their core grammar has been established?

**Why it matters:** The roster study resolved the normal exploration and tactical card shape, but uncommon data may still break its density or require another lens.

**Explore:**

- Charges and other participant resources.
- Exceptionally long names or individual motivations at the `240px` fallback width.
- Where add-participant and other roster-level actions live outside the roster.
- Whether condition controls keep the `C` label or adopt an icon once the wider control language exists.

## What exactly is a room/action prompt?

**Question:** Are room prompts mainly descriptive bullets, player-action
affordances, collapsible rows, annotated text, or some hybrid?

**Why it matters:** The main room surface needs very different width and
interaction treatment depending on whether it is prose-first or action-row-first.

**Explore:**

- Physical room details.
- Player-facing hints.
- Environmental interaction hooks.
- "If players do X" prompt framing.
- Relationship to skill checks and triggers.

## Can A/M cues join triggers and interrupts on a shared surface?

**Question:** Can the app use one watchlist-like surface for scene triggers,
tactical interrupts, and behavior/A-M cues, or do these need separate widgets?

**Why it matters:** This may become a central Running Mode UX concept. It also
affects whether exploration and tactics feel like one continuous screen.

**Explore:**

- Urgency: reactive/time-critical vs calm reference.
- Initiation: player-initiated action vs system/creature reaction.
- Ownership: scene, hazard, participant, conflict source, or group.
- Mode transitions: when a trap trigger becomes tactical interrupt-like.

## How should conflict source rows work?

**Question:** What should a conflict source show by default, and what
relationships should it expose through hover/focus behavior?

**Why it matters:** Conflict sources are live encounter framing, but R1 muddied
them with threat badges and misunderstood A/M highlight widgets.

**Explore:**

- Dramatic question relationship.
- Active/resolved status.
- Opposition text.
- Linked participants or reasons.
- Hover/focus cross-highlighting to participant cards.
- Whether conflict sources can emit watchlist items.

## What is the shared A/M surface's internal structure?

**Question:** Should the shared A/M surface be grouped by participant, setup,
motivation type, conflict source, or runtime relevance?

**Why it matters:** A/Ms are behavior-critical but too dense for inline display.
The surface needs to be fast enough to use without becoming a constant panel.

**Explore:**

- Active participants only vs prepared setups too.
- Grouped by participant vs grouped by aspect/motivation.
- Cross-highlighting with conflict sources.
- Search/filter/pin behavior.
- Whether A/M entries can feed the trigger/watchlist model.

## How should lenses be activated and represented?

**Question:** How should the GM enter, recognize, and leave a lens while the
underlying layout remains stable?

**Why it matters:** A lens is now defined as an in-place reinterpretation or
augmentation of existing content, not as a generic drawer. The interaction still
needs a clear vocabulary so lens state does not become invisible or confusing.

**Explore:**

- Global lens toggle vs contextual activation.
- Keyboard access and active-lens indication.
- Replaced participant-card content vs additional annotations/tooltips.
- Whether multiple lens effects can coexist.
- How the original view is restored without losing selection or scroll state.

## What is the smallest persistent tactical residue?

**Question:** When tactics is not foregrounded, what tactical information should
remain visible?

**Why it matters:** Overlay and lens approaches may be deprioritized, but the
Flow-strip idea remains useful. The app still needs a way to keep tactical
orientation without keeping full Actor detail open.

**Explore:**

- Active participant.
- Turn order.
- Round number.
- Conflict-source progress.
- Whether this lives as a shelf, strip, roster header, or inline participant
  marker.

## How should optional sidebars affect width-sensitive content?

**Question:** What happens when optional sidebars open beside content that cannot
be narrowed safely?

**Why it matters:** Some areas need fixed or minimum width. Optional sidebars can
break readability unless the layout uses `minmax`, overlays, or push behavior
carefully.

**Explore:**

- Fixed-width participant cards.
- Minimum-width prompt/detail columns.
- Right reference rail behavior.
- Overlay vs push sidebar for statblocks and A/M surfaces.

## How should domain IDs be branded?

**Question:** What branding pattern should the app use for domain IDs such as participants, typed participant IDs, player characters, encounters, and future rule IDs?

**Why it matters:** Running Mode now uses several string IDs that are easy to mix up. Branded types could prevent accidental cross-entity lookups, but stricter ID types may also add friction while the domain model is still moving.

**Explore:**

- A shared `Brand<Value, Name>` primitive using a `unique symbol`.
- Template-literal brands such as ``Brand<string, `${Type}-participant-id`>`` for typed participant IDs.
- Nested brands such as `Brand<Participant.Id, 'creature-participant-id'>`.
- Zod or factory functions as the sanctioned places where branded IDs are minted.
- Which IDs are valuable to brand now, which should wait for stronger model boundaries, and which should remain plain strings.
