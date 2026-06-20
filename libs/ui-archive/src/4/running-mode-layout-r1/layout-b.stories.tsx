import type {Meta, StoryObj} from '@storybook/react-vite';
import LayoutB, {type LayoutBProps} from './layout-b.tsx';

const meta = {
  title: 'Iteration 4/Running Mode Layout R1/B — Triple Column',
  component: LayoutB,
  parameters: {layout: 'fullscreen'},
} satisfies Meta<LayoutBProps>;

export default meta;

type Story = StoryObj<LayoutBProps>;

export const ExplorationNoEncounter: Story = {
  args: {mode: 'exploration'},
};

export const ExplorationWithEncounter: Story = {
  args: {mode: 'encounter'},
};

export const TacticsActive: Story = {
  args: {mode: 'tactics'},
};
