# Environmental Reminder Item Internals

## Product Value

The GM needs to notice environmental consequences when their conditions occur, including consequences that fire once, remain active, or produce a lasting result.

## Goal

Test whether pending triggers, persistent environmental effects, toggleable environmental effects, and stateful environmental activations can share reminder grammar, need distinct treatments inside one surface, or point toward separate surfaces.

Use the [shared prototype guidance](../reminder-inquiry-shared-guidance.md) for common constraints.

## Candidate Shapes

### Pending Trigger

Use `Клетки у двери`, `Неустойчивая куча инструментов`, and `Непроходимая комната`.

Test trigger-led T1 against combinations with hazard name, location, or compact metadata. Keep a trap or hazard as one T2 resolution unit containing discovery, trigger, effect, disable or traversal paths, outcomes, and relevant state. Do not split trigger and disarm into independent rows by default.

Test whether PF2e statblock grammar helps T2 resolution: traits, named sections, trigger/requirements/effect order, disable sections, degree-of-success blocks, action icons, or source links.

### Persistent Effect

Use `Ужасающее присутствие`.

Test area or applicability condition, essential cadence, source identity, and exact T2 resolution. Determine whether an always-active effect remains scannable among pending triggers or needs a visibly different treatment.

### Toggleable Environmental Effect

Use the owlbear's thrashing behavior as a sample of an effect that can start and stop, unlike always-on auras.

Test active/inactive state, muted treatment, and reactivation. Simple discard is probably insufficient when the same effect can turn on again later, but a reusable state-machine builder remains out of scope.

### Stateful Environmental Activation

Use `Ароматические световые жаровни`.

Test the reminder before activation and after the aroma result has been rolled. Explore two paper-note analogues:

- editing or annotating the original reminder;
- attaching a separate visible runtime note that preserves the rolled result.

The result must remain discoverable both when the GM remembers its source and when the GM only remembers that the information exists somewhere.

## Alternatives

Compare:

1. One unified reminder item grammar.
2. One surface with distinct pending, active, toggleable, and resolved treatments.
3. Evidence for separating pending reminders from active or stateful effects.

## Runtime Boundaries

Lightweight live editing or comment-like annotation is in scope for interaction exploration. A reusable on-the-fly state-machine builder is outside MVP. Preserve it as an interesting future alternative rather than designing it now.

Do not automatically adjudicate triggers, durations, saves, aura applicability, or recurring effects.

## Questions To Carry Forward

- Which states belong in the reminder item versus a broader runtime note system?
- Does activation replace the T1 line, annotate it, or create another item?
- Does a toggleable effect need an active/inactive control, muted row, or recoverable hidden state?
- How are ended, exhausted, or dismissed effects recovered?
- Can active effects and pending triggers share list scanning at representative density?
- Which T1 summaries must be explicitly authored?
- Which parts of statblock-like structure help environmental reminders, and which make custom rules feel falsely formal?

## Expected Outcomes

- Credible T1 and T2 treatments for all environmental temporal shapes.
- A trap or hazard resolution treatment that survives simple and complex samples.
- Evidence about unified versus distinct environmental reminder grammar.
- A bounded runtime-annotation question for later surface composition and note-system work.
