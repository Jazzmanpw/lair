import type {Meta, StoryObj} from '@storybook/react-vite';
import LayoutA, {type LayoutAProps} from './layout-a.tsx';

const meta = {
  title: 'Iteration 4/Running Mode Layout R1/A — Command Center',
  component: LayoutA,
  parameters: {layout: 'fullscreen'},
} satisfies Meta<LayoutAProps>;

export default meta;

type Story = StoryObj<LayoutAProps>;

export const ExplorationNoEncounter: Story = {
  args: {mode: 'exploration'},
};

export const ExplorationWithEncounter: Story = {
  args: {mode: 'encounter'},
};

export const TacticsActive: Story = {
  args: {mode: 'tactics'},
};
