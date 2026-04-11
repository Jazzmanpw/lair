# Initiate Encounter — Round 1: Skeleton

The simplest end-to-end encounter initiation flow. Dramatic question,
participants from setups, free-text conflict sources, confirm.

Decisions and trade-offs: see
[encounter-initiation-domain.md](../decisions/encounter-initiation-domain.md).

Parent task: [initiate-encounter.md](initiate-encounter.md).

## What to build

### Domain

A zod schema for the encounter draft form:

```
dramaticQuestion: string (required)
participantIds: string[]
participants: Record<string, ParticipantFormEntry>
conflictSources: { opposition: string }[]
```

`ParticipantFormEntry` for round 1 is minimal:

```
setupId: string
name: string (derived from setup, not editable yet)
motivations: { id: string, value: string }[]
```

A resolver function that transforms form data → runtime output:

```
resolveEncounterDraft(draft) → {
  encounter: { dramaticQuestion, conflictSources }
  newParticipants: { id, setupId, name, motivations, type, state }[]
}
```

State is derived from the statblock. For round 1, use a placeholder
`CreatureState` (full HP, empty conditions) — the real state derivation is
out of scope.

### UI

A single `EncounterInitiation` component (panel/modal — layout TBD). It
should have:

- a dramatic question text input
- an "Add participant" action that picks from a list of available setups
  (passed as a prop)
- each added participant shows: name and an editable motivations list
- a conflict sources section where the GM can add entries with free-text
  opposition
- confirm and cancel actions
- `onSubmit: (result: ResolvedEncounterDraft) => void` — receives the
  resolved output, not raw form data
- `onCancel: () => void`

Form management: TanStack Form + zod validation. Dramatic question, at
least one participant and at least one conflict source with non-empty
opposition are required.

### Story

A Storybook story using fixture data from `@lair/domain/fixtures/setups`
(the pitomnik encounter setups: dog and rat participant setups).

Props:

- `availableSetups`: the fixture participant setups
- `onSubmit: fn()`
- `onCancel: fn()`

Play function:

1. Type a dramatic question
2. Add a participant from the setup list (dog)
3. Add a motivation to the participant
4. Add a conflict source with opposition text
5. Click confirm
6. `await expect(args.onSubmit).toHaveBeenCalledWith(...)` — assert the
   resolved output has the right encounter and participant data

## What's explicitly NOT in round 1

- A/M linking in conflict sources (free-text only, no references to A/Ms)
- Variation selection
- Group handling (no groupIds, no ensure-exists)
- Existing session participants in the working set
- Name editing
- State adjustments (HP, conditions, items)
- Ad-hoc participant creation
- Seeding from encounter setup

## Fixture data

Uses the pitomnik fixtures in `libs/domain/src/fixtures/`:

- `statblocks.ts` — `dogStatblock`, `ratStatblock`
- `setups.ts` — `dogSetup`, `ratSetup`, `kennelAnimalsGroupSetup`,
  `pitomnikEncounterSetup`

The story only needs participant setups (dog and rat) as `availableSetups`.
The encounter setup and group are not used until round 3.

## Success criteria

- the GM can type a dramatic question
- the GM can add participants from a setup list
- each participant shows its name and editable motivations
- the GM can add conflict sources with opposition text
- confirm calls `onSubmit` with resolved encounter + participant data
- the play function verifies the full flow
