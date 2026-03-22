import type {Meta, StoryObj} from '@storybook/react-vite';
import {entranceScene} from '@lair/domain/fixtures/scenes';
import EncounterTab, {type EncounterTabProps} from './encounter-tab.tsx';

type StoryArgs = EncounterTabProps;

const meta = {
  title: 'Iteration 2/Encounter Tab',
  component: EncounterTab,
} satisfies Meta<StoryArgs>;

export default meta;

type Story = StoryObj<StoryArgs>;

export const Default: Story = {
  args: {encounter: entranceScene.encounter!},
};
