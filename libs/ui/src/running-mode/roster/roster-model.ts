import type {ParticipantSetup} from '@lair/domain/prep';
import type {
  Encounter,
  InitiativeFlow,
  Participant,
  PlayerCharacter,
  Session,
} from '@lair/domain/running';

export type RosterViewModel = {
  session: Session;
  setupsById: Record<string, ParticipantSetup>;
  conditionLabelsByRuleId: Record<string, string>;
};

export namespace RosterViewModel {
  export type CreateInput = {
    participants: Participant[];
    playerCharacters: PlayerCharacter[];
    setupsById: Record<string, ParticipantSetup>;
    focusedEncounter: Encounter | null;
    initiative: InitiativeFlow | null;
    groupColors: Record<string, string>;
    conditionLabelsByRuleId: Record<string, string>;
  };

  export function create({
    participants,
    playerCharacters,
    setupsById,
    focusedEncounter,
    initiative,
    groupColors,
    conditionLabelsByRuleId,
  }: CreateInput): RosterViewModel {
    return {
      session: {
        participantIds: participants.map(({id}) => id),
        playerCharacterIds: playerCharacters.map(({id}) => id),
        openEncounterIds: focusedEncounter ? ['focused-encounter'] : [],
        focusedEncounterId: focusedEncounter ? 'focused-encounter' : null,
        initiative,
        groupColors,
        entities: {
          participants: Object.fromEntries(
            participants.map((participant) => [participant.id, participant]),
          ) as Session['entities']['participants'],
          playerCharacters: Object.fromEntries(
            playerCharacters.map((playerCharacter) => [
              playerCharacter.id,
              playerCharacter,
            ]),
          ),
          encounters: focusedEncounter
            ? {'focused-encounter': focusedEncounter}
            : {},
        },
      },
      setupsById,
      conditionLabelsByRuleId,
    };
  }

  export function assignGroupColors(groupIds: string[]) {
    return Object.fromEntries(
      groupIds.map((id, index) => [
        id,
        groupPalette[index % groupPalette.length],
      ]),
    );
  }

  export function selectExplorationSections(
    model: RosterViewModel,
    creatures = selectCreatures(model),
  ) {
    return creatures.reduce<Record<RosterSection, Participant<'creature'>[]>>(
      (sections, creature) => {
        if (creature.status === 'outOfGame') {
          return {...sections, outOfGame: [...sections.outOfGame, creature]};
        }
        if (selectIsInConflict(model, creature)) {
          return {...sections, inConflict: [...sections.inConflict, creature]};
        }
        return {
          ...sections,
          nonConflicting: [...sections.nonConflicting, creature],
        };
      },
      {inConflict: [], nonConflicting: [], outOfGame: []},
    );
  }

  export function selectTacticalEntries(
    model: RosterViewModel,
    creatures = selectCreatures(model),
  ): InitiativeFlow.Entry[] {
    return (
      model.session.initiative?.order.flatMap<InitiativeFlow.Entry>(
        (entryId) => {
          const creature = creatures.find(({id}) => id === entryId);
          if (creature) return [creature];

          const playerCharacter =
            model.session.entities.playerCharacters[
              entryId as PlayerCharacter['id']
            ];
          return playerCharacter ? [playerCharacter] : [];
        },
      ) ?? []
    );
  }

  export function selectCreatures(model: RosterViewModel) {
    return model.session.participantIds.flatMap((participantId) => {
      const participant = model.session.entities.participants[participantId];
      return participant?.type === 'creature' ? [participant] : [];
    });
  }

  export function selectGroups(model: RosterViewModel) {
    return model.session.participantIds.flatMap((participantId) => {
      const participant = model.session.entities.participants[participantId];
      return participant?.type === 'group' ? [participant] : [];
    });
  }

  export function selectConditionLabel(
    model: RosterViewModel,
    condition: {ruleId: string},
  ) {
    return model.conditionLabelsByRuleId[condition.ruleId] ?? condition.ruleId;
  }

  export function selectGroupColor(model: RosterViewModel, groupId: string) {
    return model.session.groupColors[groupId] ?? '#7c8a76';
  }

  export function selectSetupAspects(
    model: RosterViewModel,
    participant: Participant,
  ) {
    return (
      model.setupsById[participant.setupId]?.concept.theme.aspects.map(
        ({value}) => value,
      ) ?? []
    );
  }

  export function selectStatblockId(
    model: RosterViewModel,
    participant: Participant<'creature'>,
  ) {
    const setup = model.setupsById[participant.setupId];
    return setup?.type === 'creature' ? setup.meta.statblockId : null;
  }

  export function selectFocusedEncounter(model: RosterViewModel) {
    return model.session.focusedEncounterId
      ? model.session.entities.encounters[model.session.focusedEncounterId]
      : model.session.entities.encounters[model.session.openEncounterIds[0]];
  }

  function selectIsInConflict(
    model: RosterViewModel,
    participant: Participant<'creature'>,
  ) {
    const encounter = selectFocusedEncounter(model);
    if (!encounter) return false;

    const reasonIds = selectParticipantAspectMotivationIds(model, participant);
    return encounter.conflictSources.some((source) =>
      source.reasons.some((reason) => reasonIds.has(reason.id)),
    );
  }

  function selectParticipantAspectMotivationIds(
    model: RosterViewModel,
    participant: Participant<'creature'>,
  ) {
    const ids = new Set(participant.motivations.map(({id}) => id));
    for (const aspect of model.setupsById[participant.setupId]?.concept.theme
      .aspects ?? []) {
      ids.add(aspect.id);
    }
    for (const groupId of participant.groupIds) {
      const group = model.session.entities.participants[groupId];
      for (const motivation of group?.motivations ?? []) ids.add(motivation.id);
      for (const aspect of model.setupsById[group?.setupId ?? '']?.concept.theme
        .aspects ?? []) {
        ids.add(aspect.id);
      }
    }
    return ids;
  }
}

export type RosterSection = 'inConflict' | 'nonConflicting' | 'outOfGame';

const groupPalette = [
  '#d5a657',
  '#77a9c5',
  '#a88ac1',
  '#78b482',
  '#c77d6f',
  '#8f9f5d',
];
