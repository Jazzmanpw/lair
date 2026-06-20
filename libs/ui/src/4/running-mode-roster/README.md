# Participant and Roster Prototype

This note is the local index for the participant and roster Storybook prototype created between Layout R1 and Layout R2. It records what the artifact exercises; durable conclusions belong in [Running Mode findings](../../../../../docs/planning/running-mode/findings.md), and unsettled answers belong in [Running Mode hypotheses](../../../../../docs/planning/running-mode/hypotheses.md).

## Stories

Storybook: `Iteration 4/Running Mode Roster`

The prototype exercises:

- `240px`, `320px`, and `400px` roster widths;
- average and crowded exploration rosters;
- informal conflict relevance grouping and collapsed out-of-game participants;
- an initiative-ordered tactical roster with interleaved PCs and creatures;
- overlapping group memberships and an adjacent group popup;
- sparse individual motivations and shared group A/Ms;
- actor selection, statblock actions, HP adjustment, reaction toggles, condition edits, and round controls.

The popup uses prototype-only absolute positioning. Implementation should use the appropriate Base UI positioning primitive.

## Implementation Caveats

The roster model code is still prototype scaffolding, not final runtime architecture. `RosterViewModel` currently packages session-like data, lookup maps, fixture setup data, and selector helpers so Storybook can exercise domain-shaped inputs without the real app data layer.

Important simplifications:

- HP, condition, reaction, actor, round, popup, and statblock notice edits use local React state. Product implementation should route these through session state or app UI state as appropriate.
- `setupsById` and `conditionLabelsByRuleId` live on the prototype model because the architecture does not yet define how Running Mode receives prep data and rule registries.
- Tactical mode currently leans on initiative-oriented data. A future prototype should test tactical inspection without initiative as a separate state machine sharing roster item visuals.
- `RosterViewModel.create` is mainly a fixture/test-data helper. Do not treat it as the final runtime boundary shape.
- Group color assignment uses a fixed small palette without overrides. This supports the current visual study only.

## Outcomes

- [F007 - Running Mode uses an approximately 320px compact roster](../../../../../docs/planning/running-mode/findings.md#f007---running-mode-uses-an-approximately-320px-compact-roster)
- [F008 - Groups use an adjacent popup and colored membership dots](../../../../../docs/planning/running-mode/findings.md#f008---groups-use-an-adjacent-popup-and-colored-membership-dots)
- [F009 - Creature participant controls use compact explicit actions](../../../../../docs/planning/running-mode/findings.md#f009---creature-participant-controls-use-compact-explicit-actions)
- [Inline participant and group A/Ms may be unnecessary](../../../../../docs/planning/running-mode/hypotheses.md#inline-participant-and-group-ams-may-be-unnecessary)
- [Group colors belong to runtime state](../../../../../docs/planning/running-mode/hypotheses.md#group-colors-belong-to-runtime-state)
- [Participant exit reasons belong in notes](../../../../../docs/planning/running-mode/hypotheses.md#participant-exit-reasons-belong-in-notes)
- [Tactical inspection and initiative flow share visuals but not state](../../../../../docs/planning/running-mode/hypotheses.md#tactical-inspection-and-initiative-flow-share-visuals-but-not-state)
- [How should domain IDs be branded?](../../../../../docs/planning/running-mode/open-questions.md#how-should-domain-ids-be-branded)
