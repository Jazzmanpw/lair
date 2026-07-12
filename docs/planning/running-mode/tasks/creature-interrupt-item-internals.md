# Creature Interrupt Item Internals

## Product Value

The GM needs to notice when a creature can react outside its turn without turning ordinary creature actions, tactical choices, or behavioral notes into a second Actor surface.

## Goal

Prototype reminders for formal creature reactions and triggered free actions, then compare their grammar with environmental reminders.

Use the [shared prototype guidance](../reminder-inquiry-shared-guidance.md) for common constraints.

## Scope

Use:

- the petrified dog's `Клин оружия`;
- `Свирепость` or another representative reaction with different resolution content;
- a triggered free action when a useful canonical or fixture sample is available.

## Questions To Test

- Can trigger + source + compact consequence form a useful T1 line?
- When is the reaction name necessary for recognition?
- Should T1 include a PF2e action icon or compact mark distinguishing reactions from triggered free actions?
- How should T2 expose trigger, requirements, effect, targets, and deeper ability context?
- How should multiple participant instances sharing one ability appear?
- What availability information belongs in the reminder when reaction-spent state also appears in the roster?
- What happens when one or the last obvious source leaves play?
- Does a triggered free action need different compact metadata while preserving the same interaction grammar?

## Runtime Relevance

Do not remove reminders automatically when an obvious source leaves play. Prototype enough source context to understand staleness. Keep, dismiss, recovery, and dismissed-section placement remain list-level questions.

## Out Of Scope

- Full roster reaction controls.
- General automatic-effect or aura treatment.

## Expected Outcomes

- Credible T1 and T2 treatments for creature interrupts.
- Ownership guidance across canonical ability, participant instance, and runtime availability.
- Evidence for reaction versus triggered-free-action marks in T1.
- Evidence about grammar shared with environmental reminders.
