# Encounter Initiation — Domain Decisions

Agreements made while scoping the encounter initiation POC. These capture
trade-offs and reasoning, not just conclusions.

## Motivations are runtime-only

Motivations don't belong on `ParticipantConcept`. They're emergent runtime facts
("got feared and is fleeing", "received an order to retreat"), not stable prep-time
descriptions. Aspects describe _what the creature is_ — motivations describe
_what it wants right now_.

Aspects live in the concept. Motivations live on the runtime `Participant` and
get written during play. Encounter setups may seed motivations on their
participant entries as a convenience ("I know this creature will start wanting
X"), but the concept itself doesn't carry them.

This means adding a participant from setup without an encounter setup context
starts with empty motivations. The GM derives them from aspects during the
encounter. That's the natural flow.

## Groups are singletons per session

One group setup produces at most one runtime group participant in a session.

If keepers split into two factions, create two new groups. Some creatures relate
to both. Group composition is powerful enough to avoid multiple instances of the
same group setup. This is different from creatures, where the same setup may
produce multiple runtime participants (e.g. 2 archers with swords, 2 with bombs).

The singleton constraint makes creature-to-group resolution straightforward:
look up by `setupId`, at most one match.

## `OfType` naming for type-discriminated extensions

The discriminated union pattern (`{ type: T; state: State<T>; ... }`) appears on
both `ParticipantSetup` and `Participant`. The namespace type that carries it is
named `OfType<T>`:

- `ParticipantSetup.OfType<'creature'>` — prep-time type extension (meta, etc.)
- `Participant.OfType<'creature'>` — runtime type extension (state, groupIds, etc.)

`OfType` reads as "the participant of type creature" — it's the whole
type-discriminated slice, not just a fragment. Both prep and runtime use the same
pattern name with different payloads.

## Nullable `variationId` over type-safe parametrization

`EncounterSetup` participants reference setups by `setupId: string`. TypeScript
can't know at compile time which participant type a `setupId` resolves to, so
type-safe variation handling (like a generic `params` bag) would require a
registry pattern with no practical benefit.

`variationId: string | null` is simple. Ignored for non-creature setups. Matches
the philosophy of the statblock types (focus on display properties, not
TS-level system imitation).

## `groupIds` on the runtime participant's `OfType`

`groupIds` is creature-specific but not mechanical — it's relational metadata,
not tactical state. It lives on `Participant.OfType<'creature'>` alongside
`state`, not inside `CreatureState`:

```ts
Participant.OfType<'creature'> = {
  type: 'creature';
  state: CreatureState;
  groupIds: string[];
};
```

`CreatureState` stays purely tactical (HP, conditions, resources).

## Creature-to-group resolution: ensure-exists

When creating a creature participant from a setup:

1. Read the setup's `groupIds` (group setup IDs).
2. For each, find a session participant where `type === 'group'` and
   `setupId === groupSetupId`.
3. If found, link to its runtime ID. If not, create the group participant from
   its setup, then link.

The mapping is implicit through `setupId` — no separate registry needed. Works
because groups are singletons.

## Normalized form state

The encounter initiation form uses a normalized structure:

```
participantIds: string[]
participants: Record<string, ParticipantFormEntry>
```

Adding from setup: generate an ID, seed a new entry from setup data. Adding
from session: use the existing ID, seed an entry from current runtime state.
The form doesn't distinguish provenance — every entry has the same shape. On
submit, any ID that doesn't exist in the session → create; any that does →
update if changed.

This avoids discriminated `source` fields and gives isomorphic handling for
new and existing participants.

## Form holds decisions, resolver computes derived state

What the GM chose or edited → form data. What's derivable → computed on confirm.

| Data               | Where    | Why                                  |
| ------------------ | -------- | ------------------------------------ |
| `setupId`          | form     | GM chose this setup                  |
| `name`             | form     | editable, derived initially          |
| `variationId`      | form     | GM picks this                        |
| `motivations`      | form     | GM writes/edits these                |
| `groupIds`         | computed | derived from setup via ensure-exists |
| `state` (HP, etc.) | computed | derived from statblock + variation   |

The `onSubmit` callback receives **resolved runtime data** (encounter +
participant data for the session), not raw form values. The component owns
the transformation.

## TanStack Form + zod

`@tanstack/react-form` is already in the workspace. Zod schema is the single
source of truth for validation and form types. The normalized record structure
works naturally with TanStack Form's dot-path field names.

## Verification via Storybook play functions

Each POC round is verified by a story with:

- `onSubmit: fn()` passed as an arg
- a play function that fills the form and clicks confirm
- `await expect(args.onSubmit).toHaveBeenCalledWith(...)` on the resolved output

No separate unit tests for POC — the play function exercises the full flow
(form interaction → resolver → output assertion).

## No schema-level guards for setup/statblock lookups

The transform looks up `ctx.setupsById[setupId]` and
`ctx.statblocksById[statblockId]` without validating that they exist. The form
only offers valid selections from `availableSetups`, so invalid `setupId` values
can't be produced by user interaction — only by a programmer bug. Schema
validation protects against user input; setup/statblock availability is a system
invariant, not user input. Adding guards would mask real bugs behind validation
errors instead of letting them surface as crashes during development.

## Deferred: statblock delta application

Variation selection records `variationId` but does not apply `statblockDelta` to
derived state. The natural place for this is `deriveInitialCreatureState` — apply
the variation's delta on top of the base statblock before computing initial HP,
conditions, etc.

Deferred because R2 focuses on form UX (linking, selection, editing), and delta
application requires resolving the `CreatureStatblockDelta` functional type (each
key is `(prev) => next`). Implement when state editing enters scope — at that
point derived state is already mutable in the form and the delta is just another
seed-time transformation.
