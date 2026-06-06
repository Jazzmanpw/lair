import type {Meta, StoryObj} from '@storybook/react-vite';
import LayoutJ, {type LayoutJProps} from './layout-j.tsx';

const meta = {
  title: 'Iteration 4/Running Mode Layout R1/J — Horizontal Strata',
  component: LayoutJ,
  parameters: {layout: 'fullscreen'},
} satisfies Meta<LayoutJProps>;

export default meta;

type Story = StoryObj<LayoutJProps>;

export const ExplorationNoEncounter: Story = {
  args: {mode: 'exploration'},
};

export const ExplorationWithEncounter: Story = {
  args: {mode: 'encounter'},
};

export const TacticsActive: Story = {
  args: {mode: 'tactics'},
};
