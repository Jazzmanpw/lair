import type {EncounterSetup, ParticipantSetup} from '../prep';

export const dogSetup: ParticipantSetup<'creature'> = {
  id: 'setup-okamenevshaya-sobaka',
  name: 'Окаменевшая собака Тяньгу',
  concept: {
    references:
      '[Дёрновая гончая](https://2e.aonprd.com/Monsters.aspx?ID=2977)',
    theme: {
      aspects: [
        {
          id: 'sobaka-suffering',
          value: 'Страдающее животное, ослеплённое своей болью',
        },
        {
          id: 'sobaka-noise',
          value: 'Шум вызывает страдания, дайте мне поспать',
        },
      ],
      role: 'атакует всё, что шумит, скачет между противниками',
      feeling: 'берсерк',
    },
    abilities: [
      'Не видит, но сильно реагирует на звуки',
      'Может залечивать маленькие раны (быстрое окаменение)',
      'Сопротивление режущему',
      'Обезоруживание реакцией при получении урона',
    ],
  },
  type: 'creature',
  meta: {
    statblockId: 'okamenevshaya-sobaka-tyangu',
    variations: [],
    groupIds: ['setup-kennel-animals'],
  },
};

export const kennelAnimalsGroupSetup: ParticipantSetup<'group'> = {
  id: 'setup-kennel-animals',
  name: 'Животные питомника',
  concept: {
    references: 'Группа окаменевших животных в питомнике',
    theme: {
      aspects: [
        {
          id: 'kennel-pack-fear',
          value: 'Общий страх и боль держат их вместе',
        },
        {
          id: 'kennel-trapped',
          value: 'Заперты в комнате и ищут выход',
        },
      ],
      role: 'действуют как стая, когда появляется шум или угроза',
      feeling: 'паника',
    },
    abilities: ['Срываются на движение друг друга'],
  },
  type: 'group',
  meta: null,
};

export const ratSetup: ParticipantSetup<'creature'> = {
  id: 'setup-okamenevshaya-krysa',
  name: 'Окаменевшая крыса Тяньгу',
  concept: {
    references: 'Прожорливый жеод',
    theme: {
      aspects: [{id: 'krysa-hunger', value: 'Острые зубы, неутолимый голод'}],
      role: 'прыгает на противников и вгрызается в них',
      feeling: 'жадность',
    },
    abilities: [
      'Прыжок с прикреплением к крупным существам',
      'Непрерывное жевание, пока прикреплена',
    ],
  },
  type: 'creature',
  meta: {
    statblockId: 'okamenevshaya-krysa-tyangu',
    variations: [],
    groupIds: ['setup-kennel-animals'],
  },
};

export const dogSetupWithVariation: ParticipantSetup<'creature'> = {
  ...dogSetup,
  id: 'setup-okamenevshaya-sobaka-var',
  name: 'Окаменевшая собака (вариативная)',
  meta: {
    ...dogSetup.meta,
    variations: [
      {
        id: 'var-aggro',
        name: 'Агрессивная',
        aspect: {id: 'aspect-aggro', value: 'Готова напасть на любого'},
        statblockDelta: {},
      },
      {
        id: 'var-passive',
        name: 'Пассивная',
        aspect: {id: 'aspect-passive', value: 'Спит и не хочет просыпаться'},
        statblockDelta: {},
      },
    ],
  },
};

export const pitomnikEncounterSetup: EncounterSetup = {
  potentialDramaticQuestion:
    'Смогут ли персонажи безопасно пройти через комнату?',
  participants: [
    {
      id: 'izl-pitomnik-sobaka-1',
      name: 'Окаменевшая собака 1',
      setupId: 'setup-okamenevshaya-sobaka',
      variationId: null,
      motivations: [
        {
          id: 'mot-sobaka-1-noise',
          value: 'Прекратить шум в питомнике',
        },
      ],
    },
    {
      id: 'izl-pitomnik-sobaka-2',
      name: 'Окаменевшая собака 2',
      setupId: 'setup-okamenevshaya-sobaka',
      variationId: null,
      motivations: [],
    },
    {
      id: 'izl-pitomnik-krysa-1',
      name: 'Окаменевшая крыса 1',
      setupId: 'setup-okamenevshaya-krysa',
      variationId: null,
      motivations: [],
    },
    {
      id: 'izl-pitomnik-krysa-2',
      name: 'Окаменевшая крыса 2',
      setupId: 'setup-okamenevshaya-krysa',
      variationId: null,
      motivations: [],
    },
    {
      id: 'izl-pitomnik-krysa-3',
      name: 'Окаменевшая крыса 3',
      setupId: 'setup-okamenevshaya-krysa',
      variationId: null,
      motivations: [],
    },
    {
      id: 'izl-pitomnik-krysa-4',
      name: 'Окаменевшая крыса 4',
      setupId: 'setup-okamenevshaya-krysa',
      variationId: null,
      motivations: [],
    },
  ],
};
