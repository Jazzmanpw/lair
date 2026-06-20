import type {ParticipantSetup} from '@lair/domain/prep';
import type {
  Encounter,
  InitiativeFlow,
  Participant,
  PlayerCharacter,
} from '@lair/domain/running';
import {RosterViewModel} from './roster-model.ts';

const groupSeeds = [
  {
    id: 'kennel',
    name: 'Животные питомника',
    aspects: [
      'Общий страх и боль держат их вместе',
      'Заперты в комнате и ищут выход',
    ],
    motivations: ['Вырваться из питомника любой ценой'],
    conflicting: true,
  },
  {
    id: 'east-squad',
    name: 'Восточная стая',
    aspects: ['Держатся у восточного прохода и слушают вожака'],
    motivations: ['Не позволить чужакам пройти к лестнице'],
    conflicting: true,
  },
  {
    id: 'servants',
    name: 'Слуги смотрителя',
    aspects: ['Все должны восхищаться смотрителем и его творениями'],
    motivations: ['Скрыть следы неудачного эксперимента'],
    conflicting: false,
  },
];

const creatureSeeds = [
  {
    name: 'Окаменевшая собака 1',
    groupIds: ['kennel', 'east-squad'],
    motivations: ['Прекратить шум в питомнике'],
    hp: 30,
    maxHp: 44,
    conditions: ['слепота'],
    status: 'inGame' as const,
  },
  {
    name: 'Окаменевшая собака 2',
    groupIds: ['kennel', 'east-squad'],
    motivations: [],
    hp: 44,
    maxHp: 44,
    conditions: [],
    status: 'inGame' as const,
  },
  {
    name: 'Окаменевшая крыса 1',
    groupIds: ['kennel'],
    motivations: [],
    hp: 17,
    maxHp: 24,
    conditions: ['замедление-1'],
    status: 'inGame' as const,
  },
  {
    name: 'Окаменевшая крыса 2',
    groupIds: ['kennel'],
    motivations: [],
    hp: 24,
    maxHp: 24,
    conditions: [],
    status: 'inGame' as const,
  },
  {
    name: 'Младший смотритель',
    groupIds: ['servants'],
    motivations: ['Переложить вину на пропавшего помощника'],
    hp: 36,
    maxHp: 36,
    conditions: [],
    status: 'inGame' as const,
  },
  {
    name: 'Раненый лаборант',
    groupIds: ['servants'],
    motivations: ['Дождаться момента и сбежать'],
    hp: 8,
    maxHp: 28,
    conditions: ['ранен-1'],
    status: 'outOfGame' as const,
  },
];

const averageParticipants: Participant<'creature'>[] = creatureSeeds.map(
  (seed, index): Participant<'creature'> => ({
    id: `creature-${index + 1}`,
    name: seed.name,
    setupId: `setup-creature-${index + 1}`,
    status: seed.status,
    groupIds: seed.groupIds,
    motivations: seed.motivations.map((value, motivationIndex) => ({
      id: `creature-${index + 1}-motivation-${motivationIndex + 1}`,
      value,
    })),
    type: 'creature',
    variationId: null,
    state: {
      currentHp: seed.hp,
      maxHp: seed.maxHp,
      reactionAvailable: index % 3 !== 1,
      resources: [],
      items: [],
      conditions: seed.conditions.map((ruleId) => ({ruleId})),
    },
  }),
);

const crowdedParticipants: Participant<'creature'>[] = [
  ...averageParticipants,
  ...averageParticipants.map((participant, index) => ({
    ...participant,
    id: `crowded-${index + 1}`,
    name: `${participant.name.replace(/\s\d+$/, '')} ${index + 3}`,
    motivations: [],
    state: {
      ...participant.state,
      conditions: index % 2 === 0 ? [] : [...participant.state.conditions],
    },
  })),
];

const playerCharacters: PlayerCharacter[] = [
  {type: 'playerCharacter', id: 'pc-1', name: 'Айрис'},
  {type: 'playerCharacter', id: 'pc-2', name: 'Бран'},
  {type: 'playerCharacter', id: 'pc-3', name: 'Кассия'},
  {type: 'playerCharacter', id: 'pc-4', name: 'Торвин'},
];

const groupParticipants: Participant<'group'>[] = groupSeeds.map(
  (group): Participant<'group'> => ({
    id: group.id,
    name: group.name,
    setupId: `setup-${group.id}`,
    motivations: group.motivations.map((value, index) => ({
      id: `${group.id}-motivation-${index + 1}`,
      value,
    })),
    type: 'group',
    state: null,
  }),
);

const setupsById: Record<string, ParticipantSetup> = Object.fromEntries([
  ...groupSeeds.map((group): [string, ParticipantSetup<'group'>] => [
    `setup-${group.id}`,
    {
      id: `setup-${group.id}`,
      name: group.name,
      type: 'group',
      meta: null,
      concept: {
        references: '',
        theme: {
          aspects: group.aspects.map((value, index) => ({
            id: `${group.id}-aspect-${index + 1}`,
            value,
          })),
          role: '',
          feeling: '',
        },
        abilities: [],
      },
    },
  ]),
  ...averageParticipants.map(
    (participant): [string, ParticipantSetup<'creature'>] => [
      participant.setupId,
      {
        id: participant.setupId,
        name: participant.name,
        type: 'creature',
        meta: {
          statblockId: `statblock-${participant.id}`,
          variations: [],
          groupIds: [],
        },
        concept: {
          references: '',
          theme: {aspects: [], role: '', feeling: ''},
          abilities: [],
        },
      },
    ],
  ),
]);

const focusedEncounter: Encounter = {
  dramaticQuestion: 'Смогут ли персонажи безопасно пройти через комнату?',
  conflictSources: groupSeeds
    .filter(({conflicting}) => conflicting)
    .map((group) => ({
      opposition: group.name,
      reasons: group.motivations.map((_, index) => ({
        type: 'motivation',
        id: `${group.id}-motivation-${index + 1}`,
      })),
    })),
};

const initiative: InitiativeFlow = {
  order: [
    'pc-1',
    'creature-1',
    'pc-2',
    'creature-5',
    'creature-2',
    'pc-3',
    'creature-3',
    'pc-4',
  ],
  activeId: 'pc-1',
  round: 3,
};

const sharedInput = {
  playerCharacters,
  setupsById,
  focusedEncounter,
  initiative,
  groupColors: RosterViewModel.assignGroupColors(groupSeeds.map(({id}) => id)),
  conditionLabelsByRuleId: {
    слепота: 'слепота',
    'замедление-1': 'замедление 1',
    'ранен-1': 'ранен 1',
  },
};

export const averageRoster = RosterViewModel.create({
  ...sharedInput,
  participants: [...averageParticipants, ...groupParticipants],
});
export const crowdedRoster = RosterViewModel.create({
  ...sharedInput,
  participants: [...crowdedParticipants, ...groupParticipants],
});
