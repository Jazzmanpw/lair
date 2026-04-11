# Initiate Encounter — Round 2: Enrichment

Adds structured A/M linking, variation selection, existing participants,
and name editing to the round 1 skeleton.

Decisions and trade-offs: see
[encounter-initiation-domain.md](../decisions/encounter-initiation-domain.md).

Depends on: [initiate-encounter-r1.md](initiate-encounter-r1.md).

## What to add

### Conflict source reasons linked to A/Ms

Each conflict source gets a `reasons` array alongside `opposition`:

```
conflictSources: {
  opposition: string
  reasons: { type: 'aspect' | 'motivation', id: string }[]
}[]
```

The available A/Ms come from the participant working set:

- each participant's aspects (from their setup's concept)
- each participant's motivations (editable in the form)

The form needs a picker or linking UI for connecting reasons to conflict
sources. The A/M pool updates reactively as participants are added/removed
and motivations are edited.

### Variation selection

Creature participant setups may have variations. When adding such a
participant, the form shows a variation picker. Selecting a variation:

- adds the variation's aspect to the participant's visible aspects
- stores `variationId` on the form entry

The `ParticipantFormEntry` grows:

```
variationId: string | null
```

Statblock delta application is NOT in scope — the variation choice is
recorded but not resolved into state changes yet.

### Existing session participants

The component accepts a `sessionParticipants` prop (the current session's
participants). The "Add participant" action offers two sources:

- from setup library (as in round 1)
- from session (existing participants)

Adding from session: use the existing participant's ID, seed the form entry
from their current runtime data (name, motivations). On submit, if the form
entry changed, the resolver produces an update diff alongside new
participants.

The resolver output grows:

```
resolveEncounterDraft(draft) → {
  encounter: { ... }
  newParticipants: [...]
  participantUpdates: { id, motivations, ... }[]
}
```

### Name editing

Participant names become editable in the form. Initially derived from the
setup name (or from the encounter setup's participant name when seeding).

The `ParticipantFormEntry` change:

```
name: string  // now editable, was read-only in round 1
```

### Story additions

Extend the round 1 story or create a new one with:

- a `sessionParticipants` prop with pre-existing participant data
- setup fixtures that include variations (may need a new fixture or
  a variation added to the dog setup)

Play function additions:

- add an existing session participant
- select a variation for a creature
- edit a participant's name
- link an A/M to a conflict source's reasons
- assert the resolved output includes variation, name, and linked reasons

## What's still NOT in scope

- Group handling (groupIds, ensure-exists, group A/Ms in pool)
- Seeding from encounter setup
- State adjustments (HP, conditions, items)
- Ad-hoc participant creation

## Success criteria

- conflict sources have structured reason links to participant A/Ms
- variation selection works for creature participants
- existing session participants can be added to the working set
- participant names are editable
- the resolver output captures all of the above
- play function verifies the enriched flow
