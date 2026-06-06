import type {Meta, StoryObj} from '@storybook/react-vite';
import LayoutG, {type LayoutGProps} from './layout-g.tsx';

const meta = {
  title: 'Iteration 4/Running Mode Layout R1/G — Roster Spine',
  component: LayoutG,
  parameters: {layout: 'fullscreen'},
} satisfies Meta<LayoutGProps>;

export default meta;

type Story = StoryObj<LayoutGProps>;

export const ExplorationNoEncounter: Story = {
  args: {mode: 'exploration'},
};

export const ExplorationWithEncounter: Story = {
  args: {mode: 'encounter'},
};

export const TacticsActive: Story = {
  args: {mode: 'tactics'},
};
