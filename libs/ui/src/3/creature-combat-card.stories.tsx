import type {Meta, StoryObj} from '@storybook/react-vite';
import {useReducer} from 'react';
import {chimeraStatblock} from '@lair/domain/fixtures-legacy/creatures';
import type {
  EncounterParticipant,
  ParticipantRunState,
} from '@lair/domain/run-state';
import {type EncounterRunState, runStateReducer} from '@lair/domain/run-state';
import CreatureCombatCard, {
  type CreatureCombatCardProps,
} from './creature-combat-card.tsx';

const participant: EncounterParticipant = {
  id: 'khimera-tyangu-0',
  label: 'Химера Тяньгу 1',
  statblockId: 'khimera-tyangu',
};

const fullHpState: ParticipantRunState = {
  currentHp: 40,
  maxHp: 40,
  conditions: [],
  reactionAvailable: true,
  counters: {},
};

function makeRunState(
  overrides: Partial<ParticipantRunState> = {},
): EncounterRunState {
  return {
    participants: [participant],
    flow: {
      initiativeOrder: [participant.id],
      activeParticipantId: participant.id,
      round: 1,
    },
    creatureStates: {[participant.id]: {...fullHpState, ...overrides}},
    focus: {actorParticipantId: participant.id, targetParticipantIds: []},
  };
}

function Interactive({
  initialOverrides = {},
  isActive = false,
  statblock,
}: {
  initialOverrides?: Partial<ParticipantRunState>;
  isActive?: boolean;
  statblock?: CreatureCombatCardProps['statblock'];
}) {
  const [runState, dispatch] = useReducer(
    runStateReducer,
    makeRunState(initialOverrides),
  );
  return (
    <CreatureCombatCard
      participant={participant}
      state={runState.creatureStates[participant.id]}
      statblock={statblock}
      isActive={isActive}
      onAction={dispatch}
    />
  );
}

const meta = {
  title: 'Iteration 3/Creature Combat Card',
  component: CreatureCombatCard,
  parameters: {layout: 'centered'},
  decorators: [
    (Story) => (
      <div className="w-[260px] bg-[#12170f] p-3 font-(--lair-font) text-(--lair-text)">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<CreatureCombatCardProps>;

export default meta;

type Story = StoryObj<CreatureCombatCardProps>;

export const Default: Story = {
  render: () => <Interactive statblock={chimeraStatblock} />,
};

export const Active: Story = {
  render: () => <Interactive statblock={chimeraStatblock} isActive />,
};

export const Damaged: Story = {
  render: () => (
    <Interactive
      statblock={chimeraStatblock}
      initialOverrides={{
        currentHp: 15,
        conditions: ['stupefied 2', 'slowed 1'],
      }}
    />
  ),
};

export const Critical: Story = {
  render: () => (
    <Interactive
      statblock={chimeraStatblock}
      initialOverrides={{
        currentHp: 5,
        reactionAvailable: false,
        conditions: ['dying 1'],
      }}
    />
  ),
};

export const NoStatblock: Story = {
  render: () => <Interactive />,
};
