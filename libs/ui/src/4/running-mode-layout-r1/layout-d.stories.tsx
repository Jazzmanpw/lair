import type {Meta, StoryObj} from '@storybook/react-vite';
import LayoutD, {type LayoutDProps} from './layout-d.tsx';

const meta = {
  title: 'Iteration 4/Running Mode Layout R1/D — Dashboard Grid',
  component: LayoutD,
  parameters: {layout: 'fullscreen'},
} satisfies Meta<LayoutDProps>;

export default meta;

type Story = StoryObj<LayoutDProps>;

export const ExplorationNoEncounter: Story = {
  args: {mode: 'exploration'},
};

export const ExplorationWithEncounter: Story = {
  args: {mode: 'encounter'},
};

export const TacticsActive: Story = {
  args: {mode: 'tactics'},
};
