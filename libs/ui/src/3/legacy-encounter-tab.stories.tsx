import type {Meta, StoryObj} from '@storybook/react-vite';
import {chimeraStatblock} from '@lair/domain/fixtures/creatures';
import {entranceScene} from '@lair/domain/fixtures/scenes';
import LegacyEncounterTab, {
  type EncounterTabProps,
} from './legacy-encounter-tab.tsx';

type StoryArgs = EncounterTabProps;

const meta = {
  title: 'Iteration 3/Legacy/Encounter Tab',
  component: LegacyEncounterTab,
} satisfies Meta<StoryArgs>;

export default meta;

type Story = StoryObj<StoryArgs>;

export const Default: Story = {
  args: {
    encounter: entranceScene.encounter!,
    statblocks: {'khimera-tyangu': chimeraStatblock},
  },
};
