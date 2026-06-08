# Running Mode Roster Model Integration

Use this as the starting context for replacing the roster prototype's local view models with data resolved from the application domain.

## Why The Prototype Uses Local Models

The prototype needed to explore UI questions before several domain questions were settled. Its local types are display projections, not proposed replacements for `Participant`, `ParticipantSetup`, `CreatureState`, or future initiative models.

Using the existing types directly would not have removed modeling work. It would have scattered unresolved joins and placeholder fields through Storybook rendering:

- runtime `Participant` contains identity, motivations, creature state, and runtime group IDs;
- `ParticipantSetup` contains concept aspects and the statblock reference;
- the group popup needs runtime group participants resolved together with their setup concepts;
- tactical ordering and active actor belong to session-level initiative flow, which is described in planning but absent from `manual/running.ts`;
- PCs need tactical roster identity and initiative participation without pretending to have participant concepts;
- group colors are useful presentation state but have no agreed domain owner;
- conflict relevance and out-of-game status are not represented on `Participant`;
- condition fixtures need readable labels, while `CreatureState.conditions` currently stores `{ruleId}` records;
- statblock actions need a resolved statblock reference through the participant's setup.

The local `RosterCreature`, `RosterGroup`, and `RosterCombatant` types gather exactly the data each prototype row needs. This kept the UI study reversible and prevented provisional presentation choices from hardening into the domain model.

## Existing Model Coverage

### Already represented

- Participant identity: `Participant.id`, `name`, `setupId`.
- Runtime motivations: `Participant.motivations`.
- Creature HP, conditions, reactions, resources, and items: `Participant<'creature'>.state`.
- Runtime creature-to-group links: `Participant<'creature'>.groupIds`.
- Group and creature concepts/aspects: resolve `Participant.setupId` to `ParticipantSetup.concept`.
- Statblock identity: resolve a creature setup to `ParticipantSetup<'creature'>.meta.statblockId`.

### Missing or unresolved

- Session-level initiative order, round, and active actor in the current manual runtime types.
- Tactical-only PC entries and their relationship to the party/player-character model.
- Participant conflict relevance and out-of-game state.
- Runtime group presentation colors.
- A resolved Running Mode view model that joins runtime participants, setups, statblocks, groups, conflict state, and initiative.
- The final structured condition and resource models.

## Questions For The Model Pass

1. Should initiative flow live directly on `Session`, in a separate session entity, or in another runtime aggregate?
2. Should initiative order be participant IDs plus a separate PC reference union, or should all tactical combatants share a lightweight initiative-entry type?
3. Is conflict relevance stored, derived from conflict-source reason links, or supplied by a Running Mode selector?
4. What exactly makes a participant out of game, and is that session state, archived participation, or a view filter?
5. Should the UI consume raw normalized entities plus selectors, or a resolved `RosterViewModel` assembled at the Running Mode boundary?
6. How are setup concepts and statblocks made available for ad-hoc participants with incomplete prep?
7. Should condition display names be resolved from a rules registry while runtime state retains rule IDs?
8. How should resources cover focus points, spell slots, consumables, and ability uses without turning the domain into a rules engine?

## Group Color Follow-Up

Start with the [Group colors belong to runtime state](../running-mode/hypotheses.md#group-colors-belong-to-runtime-state) hypothesis.

The current expectation is that colors are assigned for the active session, automatically where possible, with an encounter-initiation override. Test whether colors need to remain stable across sessions before adding them to `ParticipantSetup`.

Potential homes to compare:

- presentation metadata on the runtime group participant;
- a session-level group-color map keyed by runtime group ID;
- derived palette assignment with only explicit overrides persisted.

## Suggested Output

The next session should produce:

- a decision on initiative and PC roster-entry ownership;
- a decision on derived versus stored relevance/status;
- a proposed resolved roster input shape;
- a small migration plan from local fixtures to domain fixtures/selectors;
- a follow-up decision or prototype for group-color assignment;
- explicit deferral boundaries for conditions and participant resources.
