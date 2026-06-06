import type {Meta, StoryObj} from '@storybook/react-vite';
import LayoutH, {type LayoutHProps} from './layout-h.tsx';

const meta = {
  title: 'Iteration 4/Running Mode Layout R1/H — Reading Column',
  component: LayoutH,
  parameters: {layout: 'fullscreen'},
} satisfies Meta<LayoutHProps>;

export default meta;

type Story = StoryObj<LayoutHProps>;

export const ExplorationNoEncounter: Story = {
  args: {mode: 'exploration'},
};

export const ExplorationWithEncounter: Story = {
  args: {mode: 'encounter'},
};

export const TacticsActive: Story = {
  args: {mode: 'tactics'},
};
