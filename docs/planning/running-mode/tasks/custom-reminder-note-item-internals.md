# Custom Reminder Note Item Internals

## Product Value

The GM needs a way to keep unstructured reminders visible when prep or runtime events create something important to remember that does not fit inquiry, environmental, or creature-interrupt grammar.

## Goal

Prototype view-only custom reminder note items and determine how they should scan beside structured reminder candidates. Do not design note creation, metadata editing, or the long-term domain model in this task.

## Scope

Use fixture-only reminders such as:

- scene-entry reminders that should appear near arrival and then become recoverable;
- a prep-authored free-form reminder linked to a scene;
- a runtime-authored reminder fixture representing an improvised consequence or temporary rule.

Treat these as notes linked to context and marked for reminder display, but keep that representation as a prototype assumption rather than a settled model.

## Questions To Test

- Can a free-form authored reminder line scan without a stronger structured grammar?
- Does a custom reminder need condition, timing, source context, or a compact type mark in T1?
- How visually loud should custom reminders be compared with environmental reminders and inquiry references?
- Does the scene-entry case need transient emphasis, recovery, or a separate placement from persistent custom notes?
- Which parts of the item are note content, source context, runtime annotation, dismissal state, or future authoring metadata?

## Alternatives

Compare at least:

1. A neutral custom reminder row that behaves like other reminders.
2. A warmer or more visible treatment suitable for scene-entry and manually pinned notes.
3. A transient-entry treatment that can collapse into the ordinary reminder list after the initial moment.

## Out Of Scope

- Designing the custom reminder creation flow.
- Deciding how arbitrary notes are marked as reminders.
- Building runtime note persistence, cleanup, or pruning behavior.
- Treating every free-form note as eligible for persistent T1 display by default.

## Expected Outcomes

- View-only T1 and T2 treatments for custom reminders.
- Evidence about whether entrance reminders belong in the reminder surface, a transient scene-entry treatment, or both.
- Provisional guidance for later runtime-authoring and note-metadata work.
