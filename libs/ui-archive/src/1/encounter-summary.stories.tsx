import type {Meta, StoryObj} from '@storybook/react-vite';
import {entranceScene} from '@lair/domain-archive/legacy-fixtures/scenes';
import EncounterSummary, {
  type EncounterSummaryProps,
} from './encounter-summary.tsx';

const encounter = entranceScene.encounter!;

type StoryArgs = EncounterSummaryProps;

const meta = {
  title: 'Iteration 1/Encounter Summary',
  component: EncounterSummary,
} satisfies Meta<StoryArgs>;

export default meta;

type Story = StoryObj<StoryArgs>;

export const Default: Story = {
  args: {encounter},
};

export const Compact: Story = {
  args: {encounter, compact: true},
};
