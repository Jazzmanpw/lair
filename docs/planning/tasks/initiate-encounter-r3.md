# Initiate Encounter — Round 3: Relational

Adds group resolution, group A/Ms in the conflict source pool, and seeding
from encounter setups. This completes the encounter initiation flow as
described in the parent task.

Decisions and trade-offs: see
[encounter-initiation-domain.md](../decisions/encounter-initiation-domain.md).

Depends on: [initiate-encounter-r2.md](initiate-encounter-r2.md).

## What to add

### Group resolution

When a creature participant is added, their setup's `groupIds` indicate
which group setups they belong to. The form doesn't surface group management
directly — groups are resolved on confirm via the ensure-exists pattern:

1. Read the creature setup's `groupIds`.
2. For each, check if the session already has a group participant with that
   `setupId`.
3. If found, link. If not, create the group participant from its group
   setup.

The resolver output grows:

```
resolveEncounterDraft(draft, session) → {
  encounter: { ... }
  newParticipants: [...]
  participantUpdates: [...]
  newGroups: { id, setupId, name, concept }[]
}
```

`newGroups` are group-type participants to add to the session. Creature
participants' resolved `groupIds` reference these (or existing ones).

The component needs access to group setups (to create groups from) and the
current session (to check for existing groups). Both passed as props.

### Group A/Ms in the conflict source pool

When a creature in the working set belongs to a group, that group's
aspects and motivations enter the A/M pool for conflict source linking.

The pool now draws from:

- each working set participant's aspects and motivations
- each related group's aspects and motivations (via the creature's
  setup's `groupIds` → group setup's concept)

Group A/Ms should be visually distinguishable from individual A/Ms in the
picker (labeled with the group name or tagged).

### Ad-hoc group creation

An "Add group" option in the group picker or participant list. Creates a
minimal group participant on the spot (name + concept). This covers the
case where a new alliance forms during play or an ad-hoc creature needs a
group that wasn't prepped.

The ad-hoc group has no `setupId` — it's a runtime-only entity. The
ensure-exists pattern skips it (no setup to match against). Creatures can
link to it by runtime ID.

### Seeding from encounter setup

A new entry point: "Start from setup" alongside the from-scratch flow. This
pre-fills the encounter draft:

- `dramaticQuestion` ← `encounterSetup.potentialDramaticQuestion`
- for each `encounterSetup.participants`:
  - look up the referenced `ParticipantSetup` by `setupId`
  - seed a form entry with the setup's name (or the encounter setup's
    override name), the specified `variationId`, and any encounter-level
    motivations
  - add the generated ID to `participantIds`

The GM can still edit everything before confirming. The setup is consumed
as a seed, not bound to the resulting encounter.

The component needs an optional `encounterSetup` prop (+ the setups it
references). When provided, the form initializes pre-filled. When absent,
the form starts empty (from-scratch flow).

### Story additions

New story or variant using the full fixture set:

- `pitomnikEncounterSetup` as the seed
- `dogSetup`, `ratSetup` as available setups
- `kennelAnimalsGroupSetup` as the group setup
- a mock session (possibly with some existing participants)

Play function:

- verify pre-filled state from encounter setup (dramatic question,
  participants)
- edit a pre-filled motivation
- add a conflict source with reasons linked to group A/Ms
- confirm
- assert the resolved output includes the encounter, participants,
  group resolution, and correct groupIds

## What's still NOT in scope

- State adjustments (HP, conditions, items) — separate task
- Initiative flow — separate task
- Session persistence — separate task
- Full ad-hoc participant creation (concept authoring from scratch)

## Success criteria

- groups are resolved via ensure-exists on confirm
- group A/Ms appear in the conflict source pool
- ad-hoc groups can be created inline
- encounter setup seeds pre-fill the form correctly
- the GM can edit everything after seeding before confirming
- the resolver output includes group participants and creature groupIds
- play function verifies the seeded flow end to end
