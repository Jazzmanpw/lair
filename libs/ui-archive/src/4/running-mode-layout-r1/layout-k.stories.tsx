import type {Meta, StoryObj} from '@storybook/react-vite';
import LayoutK, {type LayoutKProps} from './layout-k.tsx';

const meta = {
  title: 'Iteration 4/Running Mode Layout R1/K — Lens Canvas',
  component: LayoutK,
  parameters: {layout: 'fullscreen'},
} satisfies Meta<LayoutKProps>;

export default meta;

type Story = StoryObj<LayoutKProps>;

export const ExplorationNoEncounter: Story = {
  args: {mode: 'exploration'},
};

export const ExplorationWithEncounter: Story = {
  args: {mode: 'encounter'},
};

export const TacticsActive: Story = {
  args: {mode: 'tactics'},
};
