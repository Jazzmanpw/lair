import type {CreatureStatblock} from '../pf2e';

export const petrifiedDogStatblock: CreatureStatblock = {
  id: 'okamenevshaya-sobaka-tyangu',
  name: 'Окаменевшая собака Тяньгу',
  level: 3,
  traits: ['Unique', 'Small', 'животное', 'земля'],
  perception: {
    modifier: {scale: 'M', value: 9},
    permanentConditions: [{ruleId: 'blinded'}],
    senses: [
      {id: 'scent', name: 'scent', precision: 'imprecise', distance: 30},
      {
        id: 'tremorsense',
        name: 'tremorsense',
        precision: 'precise',
        distance: 10,
      },
    ],
  },
  languages: [],
  skills: {
    athletics: {scale: 'H', value: 11},
    survival: {
      scale: 'M',
      value: 9,
      special: {adjustment: 2, description: 'Track'},
    },
  },
  attributes: {
    str: {scale: 'H', value: 4},
    dex: {scale: 'T', value: -1},
    con: {scale: 'M', value: 3},
    int: {scale: 'T', value: -4},
    wis: {scale: 'M', value: 2},
    cha: {scale: 'T', value: -1},
  },
  items: [],
  armorClass: {scale: 'H', value: 19},
  savingThrows: {
    fortitude: {scale: 'H', value: 12},
    reflex: {scale: 'L', value: 6},
    will: {scale: 'L', value: 7},
  },
  hitPoints: {scale: 'M', value: 44},
  immunities: 'paralysis, sleep',
  resistances: 'slashing 6 (except magical)',
  weaknesses: '',
  speeds: [{type: 'land', value: 30}],
  attacks: [
    {
      id: 'jaws',
      type: 'melee',
      name: 'челюсти',
      modifier: {scale: 'H', value: 11},
      traits: ['H', 'H'],
      damage: {
        scale: 'H',
        value: [{roll: '1d10+6', type: 'piercing'}],
      },
    },
  ],
  abilities: [
    {
      id: 'okamenevshie-veki',
      name: 'Окаменевшие веки',
      type: 'interaction',
      actionCost: '0',
      traits: [],
      effect: {
        description:
          'Собака постоянно слепа, поэтому ориентируется на чуткий нюх, острый слух и вибрации земли. Она не получает сложностей в перемещении от своего состояния, а слух позволяет определять направление к цели.',
      },
    },
    {
      id: 'prervannyy-son',
      name: 'Прерванный сон',
      type: 'interaction',
      actionCost: '0',
      traits: [],
      effect: {
        description:
          'Собака особо агрессивна к источникам шума. Если собака находится в ближнем бою с существом, и другое существо неподалёку начинает шуметь сильнее, собака отвлекается и бежит к источнику шума.',
      },
    },
    {
      id: 'klin-oruzhiya',
      name: 'Клин оружия',
      type: 'reactive',
      actionCost: 'r',
      traits: [],
      trigger: 'Собака получает урон от атаки колющим или режущим оружием.',
      effect: {
        description:
          'Собака совершает попытку Обезоружить вызвавшее реакцию существо.',
      },
    },
    {
      id: 'bystroe-okamenenie',
      name: 'Быстрое окаменение',
      type: 'active',
      actionCost: {from: '1', to: '2'},
      traits: [],
      frequency: '4 раза в день',
      effect: {
        description:
          'Собака ускоряет окаменение, закрывая свежие раны. Собака сотворяет на себя heal 1 ранга за потраченное количество действий.',
      },
    },
  ],
};

export const petrifiedRatStatblock: CreatureStatblock = {
  id: 'okamenevshaya-krysa-tyangu',
  name: 'Окаменевшая крыса Тяньгу',
  level: -1,
  traits: ['Unique', 'Tiny', 'животное'],
  perception: {
    modifier: {scale: 'M', value: 5},
    permanentConditions: [],
    senses: [
      {
        id: 'low-light-vision',
        name: 'low-light vision',
        precision: 'precise',
        distance: null,
      },
      {id: 'scent', name: 'scent', precision: 'imprecise', distance: 30},
    ],
  },
  languages: [],
  skills: {
    acrobatics: {scale: 'M', value: 4},
    athletics: {scale: 'M', value: 4},
    survival: {scale: 'H', value: 5},
    stealth: {scale: 'L', value: 3},
  },
  attributes: {
    str: {scale: 'M', value: 2},
    dex: {scale: 'M', value: 2},
    con: {scale: 'H', value: 3},
    int: {scale: 'T', value: -4},
    wis: {scale: 'L', value: 0},
    cha: {scale: 'T', value: -3},
  },
  items: [{itemId: 'krysinyy-zhivotik'}],
  armorClass: {scale: 'M', value: 15},
  savingThrows: {
    fortitude: {scale: 'H', value: 8},
    reflex: {scale: 'M', value: 5},
    will: {scale: 'T', value: 0},
  },
  hitPoints: {scale: 'M', value: 9},
  immunities: '',
  resistances: '',
  weaknesses: '',
  speeds: [{type: 'land', value: 20}],
  attacks: [
    {
      id: 'jaws',
      type: 'melee',
      name: 'челюсти',
      modifier: {scale: 'H', value: 8},
      traits: ['H', 'H'],
      damage: {
        scale: 'H',
        value: [{roll: '1d4+2', type: 'piercing'}],
      },
    },
  ],
  abilities: [
    {
      id: 'pritseplyanie',
      name: 'Прицепление',
      type: 'active',
      actionCost: '2',
      traits: [],
      effect: {
        description:
          'Крыса прыгает на 10 футов и совершает Удар челюстями. Если она попадает по существу больше, чем она, она может прицепиться к существу. Это похоже на Захват (КС Вырваться 16), но крыса движется вместе с существом, а не удерживает его на месте. Крыса застигнута врасплох, пока прикреплена. Если убить или оттолкнуть крысу, пока она прицеплена, существо получает 1 продолжительный урон от кровотечения. Если Вырваться или удалить крысу по-другому, продолжительного урона не будет.',
      },
    },
    {
      id: 'zhevanie',
      name: 'Жевание',
      type: 'active',
      actionCost: '1',
      traits: [],
      requirements: 'Крыса прицепилась к существу.',
      effect: {
        description:
          'Крыса наносит 1d4 колющего урона существу, к которому прикреплена (базовый спасбросок Стойкости КС 16).',
      },
    },
  ],
};
