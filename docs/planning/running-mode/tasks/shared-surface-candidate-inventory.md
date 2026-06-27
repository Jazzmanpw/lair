# Shared Trigger / Interrupt Surface Candidate Inventory

## Product Value

The GM needs a fast way to notice "this may matter now" information while players describe actions or while reactions and other interrupts may fire. The user problem is not displaying every piece of scene data; it is reducing missed triggers while keeping the surface scannable during live conversation.

## Goal

Inventory the candidate item types for a possible shared trigger/interrupt surface and shape the sequence of component-internal prototype tasks needed before list-level design.

Do not assume that one list, an exploration/tactical split, or any other taxonomy is correct. Determine what each candidate needs at T1, T2, and T3; which candidates share enough interaction grammar to coexist; and what strategies might keep the surface focused.

## Additional Context

The general Running Mode workflow already requires reading the project and Running Mode entry documents. In addition, read:

- `docs/planning/running-mode/iterations/layout-r1/feedback.md`
- `docs/planning/running-mode/iterations/layout-r1/data-budget.md`
- `docs/planning/running-mode/iterations/layout-r1/original-task.md`, especially the Actor/Interrupts model;
- `docs/salty-scars-lab-room-map.md`

The existing tactical-interrupt framing is also captured by the `Triggers and interrupts may share a reactive watchlist model` hypothesis. Use these sources as starting context, not as a settled answer.

Use the Salty Scars lab scenes as the first inventory corpus. Pay special attention to:

- `> [!skill-check]` callouts;
- trap triggers, effects, and disarm paths;
- action-like statblocks such as `Пошариться на полках`;
- situational rules such as `Ароматические световые жаровни`, `Круг элементов`, shelves, and cache clues;
- entrance reminders;
- encounter setups, prepared creature/group setups, and participant-derived cues;
- tactical reactions, passive abilities, auras, and other cross-turn reminders.

## Candidate Questions

For each candidate type, identify:

- the user moment it supports and what the GM is trying not to forget;
- its likely T1 reminder or header;
- its T2 resolution content and which interactions should be tested during the item-internals prototype;
- its T3 deeper reference destination;
- whether its T1 content belongs in a scannable set or needs to be studied as a standalone unit;
- whether its priority or compact wording changes between exploration and tactics;
- representative vault or fixture examples;
- relationships to runtime state, participants, situational rules, or resources.

All candidates may ultimately lead to deeper references. The inventory question is whether each candidate provides a useful T1 reminder in this surface, not whether it links elsewhere.

## Entrance Reminders

Include entrance reminders as candidates for this surface. Their treatment near flavor text and the permanent scene description is handled independently by the scene-description prototype and does not need to be reconsidered here.

## Trap Item Hypothesis

A trap should probably be one item rather than separate trigger and disarm rows. Its T2 content is based on the trap statblock: trigger, effect, discovery, disarm actions, and other mechanics. The prototype does not need to preserve the canonical statblock's exact visual structure.

PF2e hazard rules use an explicit `Trigger` as a normal statblock field, which makes it a plausible seed for the T1 line. Trigger wording is often action-specific rather than identity-bearing, such as entering an area, opening something, or stepping on a mechanism. The trap prototype should therefore test the trigger alone against combinations with the trap name, location hint, or other compact metadata. A later named-hazard sample should verify how consistently this holds across canonical traps; preserve the exact T1 composition as an open prototype question.

## Runtime Relevance

Participant-derived reminders may become stale when a creature leaves play, but the app should not silently decide that a reminder is irrelevant. The source may still matter through another participant or resource, and some reactions can occur after death, such as an attacked corpse exploding.

Explore gentle prompts rather than automatic removal. For example, when the last obvious source leaves play, the reminder could offer:

- dismiss the reminder;
- keep it active.

Dismissal should move the reminder out of focus without removing it from the UI. A later list could keep dismissed reminders in a collapsed section similar to out-of-game participants.

This is an interaction hypothesis, not a requirement. It may remain open after the first prototype round.

## Situational Rules And References

Keep situational rules in this inventory because deciding whether they deserve T1 reminders affects the surface. Use the definition in `docs/planning/running-mode/vocabulary.md`.

Do not require hover, pin, or deep-reference interaction prototypes during this inventory or the first item-internals pass. First determine whether a situational rule merits a compact reminder and what it should say. Prototype deeper reference behavior separately, then reconnect it to list entries if needed.

## Uncluttering Strategies

Trying to keep every potentially useful reminder in focus is a harmful default driven by fear of forgetting. It would make the surface unmanageable and undermine scanning. The design must curate focus while keeping de-emphasized or dismissed information recoverable.

Do not preemptively split content by exploration and tactics: reactions and auras can matter during exploration, and scene triggers can remain relevant during tactics.

Consider several strategies after the candidate inventory is clearer:

- filter-like lenses for trigger families, independent of game mode;
- sort-like lenses that bring contextually relevant items to the top;
- mode-sensitive priority or T1 wording without removing other items;
- expandable grouping;
- color or other compact type marks instead of text-heavy or collapsed group headers;
- other strategies discovered during candidate prototyping.

Expandable grouping may consume the space needed by T1 data, so compare it critically with compact color marking. The eventual answer may still be multiple surfaces, but that should follow evidence about candidate shape and density.

## Scanning Model

The intended surface is a set of T1 reminders with T2 detail available through interaction.

Some T1 content may need to be read as a standalone unit. Wrapping can be acceptable when the GM already knows where the item lives and intentionally goes there to study it. A good example is the scene description bullet points. A list item serves a different task: the GM rapidly perceives or scans several potentially relevant reminders, often using their opening words to select one for closer reading. Wrapping and uneven row height may therefore damage list scanning even when the same prose is readable alone.

For each candidate, determine whether it can provide a short, discriminating T1 line for set scanning. If it cannot, decide whether it needs a different compact representation, a separate surface, or no persistent T1 presence.

## Expected Chain Of Follow-Up Prototypes

This inventory should produce a sequence, not one mega-task. Current expected order (it's my best guess, and it may change after discussion):

1. Skill-check item internals, because they have the clearest "players try X" shape.
   - This is the clearest item in the set. I have ideas what I want to see at different levels of this item. And I plan to use it as a foundation for other items. Especially the T1 part, since T2 internals will probably require different shapes.
2. Trap item internals, testing whether traps can use a related header/detail grammar or need a separate treatment.
   - This is the second clearest item and might evolve somewhat naturally from skill-checks.
3. Encounter setup / prepared participant candidates, testing whether they belong in this family at all.
4. Individual creature or group cues, testing whether participant-derived reminders belong here or in roster/A-M surfaces.
5. Maybe other elements that belong to the list (I want to discuss additional candidates during the planning session).
6. Shared list/surface prototypes after candidate internals are understood.

The list/surface prototype should come after item internals. Item prototypes should test plausible T2 treatments as well as T1 shape, so list prototypes can focus on composition, scanning, prioritization, and cross-item interactions rather than rediscovering each item's internals.

## Questions To Answer

- Which candidate types provide useful reminders for this surface?
- Which additional candidates should receive their own internals prototype?
- Are skill checks and traps similar enough to share T1 or T2 grammar?
- Which candidates need different T1 wording or priority in different situations?
- What compact type mapping could distinguish candidates without creating heavy taxonomy inside the surface or across several similar adjacent areas?
- Which uncluttering strategies are worth carrying into list-level prototypes?
- Which T2 treatments should be tested in item prototypes, and which depend on list context?
- Which situational-rule interactions can wait for the separate deeper-reference prototype?
- What real examples should seed each follow-up prototype?

## Deliverable

- A short inventory document under `docs/planning/running-mode/` containing candidate categories, representative examples, likely tier splits, unresolved questions, and recommended prototype order.
- A root task file defining shared questions and expectations for all candidate-item prototype tasks.
- Separate follow-up task files for every candidate type that warrants a focused discussion and prototype.
