import type {Meta, StoryObj} from '@storybook/react-vite';
import {
  chimeraStatblock,
  jumpingPorcupineStatblock,
  owlbearStatblock,
  threeHeadedDogStatblock,
} from '@lair/domain-archive/legacy-fixtures/creatures';
import {entranceScene} from '@lair/domain-archive/legacy-fixtures/scenes';
import LegacyEncounterRunner, {
  type EncounterRunnerProps,
} from './legacy-encounter-runner.tsx';

type StoryArgs = EncounterRunnerProps;

const statblocks = {
  'khimera-tyangu': chimeraStatblock,
  'trekhgolovaya-sobaka-tyangu': threeHeadedDogStatblock,
  'prygayushchiy-dikobraz-tyangu': jumpingPorcupineStatblock,
  'sovomed-tyangu': owlbearStatblock,
};

const meta = {
  title: 'Iteration 3/Legacy/Encounter Runner',
  component: LegacyEncounterRunner,
} satisfies Meta<StoryArgs>;

export default meta;

type Story = StoryObj<StoryArgs>;

export const Inline: Story = {
  args: {encounter: entranceScene.encounter!, statblocks},
  parameters: {layout: 'fullscreen'},
  decorators: [
    (Story) => (
      <div className="grid grid-cols-[1fr_200px] h-screen bg-[#12170f] overflow-hidden">
        <div className="overflow-hidden">
          <Story />
        </div>
        <div className="border-l border-[#2c3428] bg-[#151c12] p-3 text-[10px] font-semibold tracking-[0.1em] uppercase text-(--lair-text-dim) font-(--lair-font)">
          Sidebar rail
        </div>
      </div>
    ),
  ],
};

export const Fullscreen: Story = {
  args: {encounter: entranceScene.encounter!, statblocks},
  parameters: {layout: 'fullscreen'},
  decorators: [
    (Story) => (
      <div className="h-screen overflow-hidden">
        <Story />
      </div>
    ),
  ],
};
