import type {
  RosterCombatant,
  RosterCreature,
  RosterGroup,
} from './roster-prototype.tsx';

export const rosterGroups: RosterGroup[] = [
  {
    id: 'kennel',
    name: 'Животные питомника',
    color: '#d5a657',
    aspects: [
      'Общий страх и боль держат их вместе',
      'Заперты в комнате и ищут выход',
    ],
    motivations: ['Вырваться из питомника любой ценой'],
    section: 'in-conflict',
  },
  {
    id: 'east-squad',
    name: 'Восточная стая',
    color: '#77a9c5',
    aspects: ['Держатся у восточного прохода и слушают вожака'],
    motivations: ['Не позволить чужакам пройти к лестнице'],
    section: 'in-conflict',
  },
  {
    id: 'servants',
    name: 'Слуги смотрителя',
    color: '#a88ac1',
    aspects: ['Все должны восхищаться смотрителем и его творениями'],
    motivations: ['Скрыть следы неудачного эксперимента'],
    section: 'non-conflicting',
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
    section: 'in-conflict' as const,
    initiativePosition: 2,
  },
  {
    name: 'Окаменевшая собака 2',
    groupIds: ['kennel', 'east-squad'],
    motivations: [],
    hp: 44,
    maxHp: 44,
    conditions: [],
    section: 'in-conflict' as const,
    initiativePosition: 5,
  },
  {
    name: 'Окаменевшая крыса 1',
    groupIds: ['kennel'],
    motivations: [],
    hp: 17,
    maxHp: 24,
    conditions: ['замедление 1'],
    section: 'in-conflict' as const,
    initiativePosition: 7,
  },
  {
    name: 'Окаменевшая крыса 2',
    groupIds: ['kennel'],
    motivations: [],
    hp: 24,
    maxHp: 24,
    conditions: [],
    section: 'non-conflicting' as const,
    initiativePosition: null,
  },
  {
    name: 'Младший смотритель',
    groupIds: ['servants'],
    motivations: ['Переложить вину на пропавшего помощника'],
    hp: 36,
    maxHp: 36,
    conditions: [],
    section: 'non-conflicting' as const,
    initiativePosition: 4,
  },
  {
    name: 'Раненый лаборант',
    groupIds: ['servants'],
    motivations: ['Дождаться момента и сбежать'],
    hp: 8,
    maxHp: 28,
    conditions: ['ранен 1'],
    section: 'out-of-game' as const,
    initiativePosition: null,
  },
];

export const averageRosterCreatures: RosterCreature[] = creatureSeeds.map(
  (seed, index) => ({
    kind: 'creature',
    id: `creature-${index + 1}`,
    name: seed.name,
    groupIds: seed.groupIds,
    motivations: seed.motivations,
    section: seed.section,
    initiativePosition: seed.initiativePosition,
    state: {
      currentHp: seed.hp,
      maxHp: seed.maxHp,
      reactionAvailable: index % 3 !== 1,
      conditions: seed.conditions,
    },
  }),
);

export const crowdedRosterCreatures: RosterCreature[] = [
  ...averageRosterCreatures,
  ...averageRosterCreatures.map((creature, index) => ({
    ...creature,
    id: `crowded-${index + 1}`,
    name: `${creature.name.replace(/\s\d+$/, '')} ${index + 3}`,
    motivations: [],
    state: {
      ...creature.state,
      conditions: index % 2 === 0 ? [] : creature.state.conditions,
    },
  })),
];

export const playerCharacters: RosterCombatant[] = [
  {kind: 'player-character', id: 'pc-1', name: 'Айрис', initiativePosition: 1},
  {kind: 'player-character', id: 'pc-2', name: 'Бран', initiativePosition: 3},
  {kind: 'player-character', id: 'pc-3', name: 'Кассия', initiativePosition: 6},
  {kind: 'player-character', id: 'pc-4', name: 'Торвин', initiativePosition: 8},
];
