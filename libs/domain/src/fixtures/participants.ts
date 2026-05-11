import type {Participant} from '../manual/running';

export const sessionDog: Participant<'creature'> = {
  id: 'session-dog-1',
  name: 'Окаменевшая собака 1',
  setupId: 'setup-okamenevshaya-sobaka',
  motivations: [{id: 'mot-guard', value: 'Охраняет вход'}],
  type: 'creature',
  state: {
    maxHp: 44,
    currentHp: 30,
    reactionAvailable: true,
    resources: [],
    items: [],
    conditions: [{ruleId: 'blinded'}],
  },
  variationId: null,
  groupIds: ['session-kennel-animals'],
};

export const sessionKennelAnimalsGroup: Participant<'group'> = {
  id: 'session-kennel-animals',
  name: 'Животные питомника',
  setupId: 'setup-kennel-animals',
  motivations: [
    {
      id: 'mot-kennel-escape',
      value: 'Вырваться из питомника',
    },
  ],
  type: 'group',
  state: null,
};
