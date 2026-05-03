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
};
