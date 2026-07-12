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

## Do inquiry references remain a coherent specialization?

**Question:** Does the current inquiry-reference shape remain coherent as more real adventure prep is authored?

**Why it matters:** Salty Scars checks repeatedly combine an information-seeking action and target, roll mechanics, and facts disclosed by the result. That shape is useful enough to prototype without assuming that every discovery interaction or action check belongs in it.

**Explore:**

- Recall Knowledge, Identify Magic, Search, Seek, examination, and hidden-object discovery.
- Mixed discovery and manipulation.
- Checks whose outcomes include consequences as well as facts.
- Boundaries with scene details and free-form procedure notes.
- Whether the working seek-facts versus interact-with-the-situation distinction survives continued Lab prep.

## How can reminder items be authored during runtime?

**Question:** How can a GM create or promote reminder items during play without turning the reminder surface into a separate rules engine?

**Why it matters:** The first reminder prototypes use static prep fixtures, but play can create new reminder-worthy content: a creature gains a reaction, an elixir or spell changes available interrupts, the GM improvises an environmental consequence, or a free-form note becomes important enough to keep visible. This may be ordinary prep-data authoring during Running Mode rather than a special mixed runtime/prep model.

**Explore:**

- View-only custom reminder fixtures before designing creation flow.
- Whether a reminder is best represented as a note linked to context and marked for reminder display.
- Prep-authored versus runtime-authored reminders.
- Source attribution, persistence after the session, cleanup, and pruning.
- How runtime-authored reminders interact with dismissal, recovery, and list filtering.

## Does Running Mode need a dedicated note-reading area?

**Question:** Should expanded reminder, inquiry, and reference content open in local rows, popups, adjacent detail, or a dedicated reading area?

**Why it matters:** Item-internals work can test row and popup treatments, but the broader workspace may eventually have an empty middle area or workbench-like region that could host pinned note reading without losing orientation. This decision affects both discovery and reference retrieval.

**Explore:**

- Accordion or disclosed rows for quick local reading.
- Popup-like detail for brief checks.
- Adjacent detail or a central reading area with tabs or pinned items.
- Whether a reading area belongs to the later contextual-reference prototype rather than the immediate reminder/inquiry list work.

## What should focus surfaces be called?

**Question:** What should Lair call surfaces that gather relevant information from different sources for one GM mental activity, without confusing them with lenses?

**Why it matters:** Lenses currently mean in-place reinterpretation or augmentation of existing layout content, like colored glass over the same workspace. A focus surface is different: it creates a separate thinking space where rules references, prepared notes, participants, targets, or other streams can gather around one task. Reusing "lens" for both patterns would blur two different interaction goals.

**Explore:**

- Candidate metaphors such as prism, confluence, stream, pipe, workbench, or another short name that implies information gathering for the GM's focus.
- Whether an established UI/UX or software pattern already names this interaction.
- How the name should distinguish "show different information while preserving layout" from "gather related information into a focused surface."
- Whether the chosen name should also suggest authoring, pinning, or manual composition.

## What focus surfaces might recur across Running Mode?

**Question:** Which GM activities deserve focus surfaces, and what guidelines would prevent each one from becoming a hard-baked special screen?

**Why it matters:** Inquiry, stealth, tactical targets, and future rules-reference workflows may all need a place that gathers relevant data from multiple sources. This pattern is promising but deep: it touches information architecture, contextual retrieval, authoring, manual composition, and how much app structure should be built around reusable note/reference screens.

**Explore:**

- Inquiry surface: prepared inquiry references plus relevant system references.
- Stealth surface: participant perceptions, stealth mechanics, environmental notes, and reminders.
- Targets surface: participant defenses and tactical targeting information.
- Manual composition versus contextual aggregation.
- How a GM authors or curates a focus surface without the app becoming a fixed collection of hard-baked rules pages.
- When to use a focus surface instead of a lens, popup, reference rail, tabbed workbench, or ordinary note reading.

## Can inquiry references be organized around inquirable targets without forcing scene-object ceremony?

**Question:** Can inquiry references be authored or retrieved around inquirable scene targets instead of action-target pairs, without making scene prep require heavy object modeling?

**Why it matters:** Many inquiries are about physical objects, magical effects, creatures, or other scene elements. A target-centered model might make retrieval more robust and let the app aggregate inquiry options from linked content, but it could also turn prep into a CRPG-like inspectable-object list, create edge cases for facts not tied to one object, and impose too much authoring ceremony.

**Explore:**

- Target-first inquiry rows with inquiry-type icons and exact mechanical action in T2.
- Objects, effects, and features as optional authored anchors rather than required scene structure.
- Smart note parsing or lightweight links that avoid forcing every scene detail into a formal object model.
- Cases where one inquiry spans several targets, one target has several inquiry modes, or the relevant fact belongs to a cross-scene rule.
- Building Mode support for authoring and pruning inquirable targets if the pattern proves useful.

## How should contextual reference retrieval follow links?

**Question:** How should a contextual reference surface find and explain relevant prep across direct, reverse, and transitive references?

**Why it matters:** Free-form procedure notes, inquiry references, creatures, items, scenes, and other prep can share one connected reference substrate while retaining different internal structures. Running Mode needs discovery from the current context; Building Mode needs authoring, linking, reuse, overview, and pruning. A naive traversal could either miss useful second-order material or make heavily connected content appear relevant everywhere.

**Explore:**

- A global reference collection initially filtered or prioritized by the current scene or other context.
- Direct links, backlinks, and second- or third-order references.
- How inferred relevance is explained.
- Controls for broadening from the current scene to another scene, adventure, or the complete collection.
- How recurring free-form prep shapes can acquire structured modules without losing ordinary note composition and navigation.
- Authoring support for finding reuse opportunities, understanding where a unit is used, and pruning obsolete or orphaned units.
- Whether the first focused prototype should use free-form procedure notes while preserving a later path to heterogeneous reference types.

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
- Whether conflict sources can emit concrete reminder items.

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

## Can scene details become an image-led scan surface?

**Question:** Could a future visual scene-description surface make prepared facts faster to recognize than a bullet list?

**Why it matters:** Most scene-detail facts describe a visible place or object. Visual indexing might let the GM relocate a fact without rereading text, but it introduces substantial authoring cost, interaction complexity, and difficult edge cases. It would also make the app depend more heavily on prepared visuals: text is easier to revise when a scene changes, while alternate images or annotations for events such as fires, revealed doors, or collapsing walls require prep that may never be used. That investment can subtly encourage the GM to steer play toward prepared visual states. The current bullet list is sufficient, so this is a deferred feature direction rather than an implementation dependency.

**Explore:**

- One scene image or tactical map with information hotspots corresponding roughly one-to-one with scene-detail bullets.
- Hover or focus revealing the text for one hotspot, plus a lens-like state that reveals every annotation for quick scanning.
- A list of separate minimal landmark images, such as rugs, alchemy shelves, or holes in the ceiling, with descriptions available as T2 content.
- Authoring and editing without relying on image generation for MVP.
- How to keep free play and easy runtime edits primary instead of making prepared visual states feel prescriptive.
- Crowded scenes, abstract or non-room scenes, hidden or overlapping landmarks, mobile or keyboard access, and layouts where annotations obscure the image.
- Whether this should remain a separate visual surface instead of replacing text.

## How should domain IDs be branded?

**Question:** What branding pattern should the app use for domain IDs such as participants, typed participant IDs, player characters, encounters, and future rule IDs?

**Why it matters:** Running Mode now uses several string IDs that are easy to mix up. Branded types could prevent accidental cross-entity lookups, but stricter ID types may also add friction while the domain model is still moving.

**Explore:**

- A shared `Brand<Value, Name>` primitive using a `unique symbol`.
- Template-literal brands such as ``Brand<string, `${Type}-participant-id`>`` for typed participant IDs.
- Nested brands such as `Brand<Participant.Id, 'creature-participant-id'>`.
- Zod or factory functions as the sanctioned places where branded IDs are minted.
- Which IDs are valuable to brand now, which should wait for stronger model boundaries, and which should remain plain strings.
