import type {Meta, StoryObj} from '@storybook/react-vite';
import {chimeraStatblock} from '@lair/domain/fixtures/creatures';
import CreatureStatblock, {
  type CreatureStatblockProps,
} from './creature-statblock.tsx';

type StoryArgs = CreatureStatblockProps;

const meta = {
  title: 'Iteration 3/Creature Statblock',
  component: CreatureStatblock,
} satisfies Meta<StoryArgs>;

export default meta;

type Story = StoryObj<StoryArgs>;

export const Default: Story = {
  args: {statblock: chimeraStatblock},
};
