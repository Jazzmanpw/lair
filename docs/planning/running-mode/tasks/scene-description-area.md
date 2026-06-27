# Scene Description Area Prototype

## Product Value

The GM needs a stable, quickly scannable description of the current playable scene so they can keep the physical situation in working memory while players ask questions and declare actions. The same surface may support entry narration and reminders without permanently charging the layout for content that matters mostly when PCs enter.

Before implementation, align on what the GM should see continuously, what can be dismissed and recovered, and how the surface should feel when PCs first enter compared with later exploration.

## Goal

Prototype one focused content area containing:

- a permanent T1 description of the scene;
- optional flavor text used to introduce the scene to players;
- optional entrance reminders for things the GM should remember when PCs enter.

Compare multiple representations of the permanent description and multiple interactions for flavor text and entrance reminders. Use the prototype to establish useful width, height, scanning, recovery, and accessibility behavior for future layout work.

## Additional Context

The general Running Mode workflow already requires reading the project and Running Mode entry documents. In addition, read:

- `docs/planning/running-mode/iterations/layout-r1/feedback.md`
- `docs/planning/running-mode/iterations/layout-r1/data-budget.md`
- `docs/salty-scars-lab-room-map.md`

Use real Salty Scars lab scenes as fixture sources. Ignore unrelated content in those notes.

Provide four fixture states:

- flavor text and an entrance reminder;
- flavor text without an entrance reminder;
- an entrance reminder without flavor text;
- neither flavor text nor an entrance reminder.

The vault does not need to contain all four combinations. Synthesize missing optional content states from representative vault material. Every fixture should have a permanent scene description.

## Naming Questions

The vault examples are physically rooms, but the app domain should probably call the playable unit a `scene`. Default to `scene` in code and docs unless the discussion finds a useful distinction.

Find a concise name for the permanent description data. `Bullet-point description` is accurate but cumbersome, while `scene description` may name either the whole content area or only this permanent part.

## Content

### Permanent description

The bullet list following the flavor quote in the vault is permanent T1 data. It helps the GM remember the scene's physical facts and available details. Wrapping is acceptable because the list is read and scanned as one coherent unit.

The raw unordered list already works reasonably well, but it is only the initial candidate. During implementation, create at least two additional representations that are meaningfully different rather than cosmetic variations. Evaluate them visually in the prototype instead of requiring detailed text proposals first.

### Flavor text

The first ordinary `>` quote after the scene title is player-facing introductory description. It is optional: the GM may prefer to improvise.

Flavor text should contain at most five sentences. This is the working perceptual limit for an introductory description and therefore part of the expected content budget. The same limit may later become Building Mode authoring guidance, but designing those tips is outside this task.

### Entrance reminders

Early alert callouts such as `> [!tip] Есть ловушки` remind the GM to do or remember something when PCs enter. Test them in this content area without assuming this is their final home.

Entrance reminders should also be prototyped independently as candidates for the future trigger/interrupt surface. Comparing both implementations later is preferable to assigning ownership now.

## Prototype Treatments

Start with these flavor/reminder treatments:

1. An adjacent collapsible block beside or above the permanent description.
2. A popup with a clear anchor and recovery affordance.
3. A lens-like interaction where the same area switches between introductory content and the permanent description while preserving overall dimensions.

The collapsible treatment is the primary candidate. Implement additional ideas discovered during the prototype when they are meaningfully different and remain within the content area's scope.

Provide fixture switching through Storybook args. Keep one representative scene as the default while making all four optional-content combinations easy to compare.

## Questions To Test

- What concise name best describes the permanent scene information?
- Does the raw bullet list remain the strongest representation?
- Can another representation improve scanning without turning scene facts into noisy cards or imposing false structure?
- What width best supports the permanent description: around `560px`, `640px`, or a wider container with constrained text measure?
- Can flavor text remain available without occupying permanent space after entry?
- Does dismissal/collapse provide obvious and forgiving recovery?
- Can entrance reminders reuse the same visual and interaction language as flavor text?
- Does a lens-like swap help the transition from player-facing narration to GM-facing facts, or does hiding either side harm orientation?

## Interaction Requirements

Keep interactions light but real enough to evaluate feel and accessibility:

- Expand, collapse, dismiss, and recover optional content as appropriate to each treatment.
- Use keyboard-operable controls with visible focus.
- Give icon-only controls accessible names.
- Do not require hover for core behavior.

Ignore hover previews and deeper rule/reference behavior for links inside the permanent description. Those interactions belong to a separate reference-surface prototype.

## Suggested Stories

- `Default`: representative scene and primary treatment.
- `TreatmentComparison`: the same content across competing representations.
- `FixtureStates`: all four flavor/reminder combinations.
- `ConstrainedWidth`: the same content at a narrower width.
- `WideContainer`: a wider parent with readable text measure preserved.

## Deliverable

A focused Storybook prototype with multiple representation and interaction treatments, real or representative Russian fixture content, and fixture switching.

Write the local component README and update durable design memory only after prototype feedback and discussion.
