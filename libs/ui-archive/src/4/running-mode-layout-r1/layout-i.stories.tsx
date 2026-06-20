import type {Meta, StoryObj} from '@storybook/react-vite';
import LayoutI, {type LayoutIProps} from './layout-i.tsx';

const meta = {
  title: 'Iteration 4/Running Mode Layout R1/I — Split Planes',
  component: LayoutI,
  parameters: {layout: 'fullscreen'},
} satisfies Meta<LayoutIProps>;

export default meta;

type Story = StoryObj<LayoutIProps>;

export const ExplorationNoEncounter: Story = {
  args: {mode: 'exploration'},
};

export const ExplorationWithEncounter: Story = {
  args: {mode: 'encounter'},
};

export const TacticsActive: Story = {
  args: {mode: 'tactics'},
};
