import type {Meta, StoryObj} from '@storybook/react-vite';
import LayoutE, {type LayoutEProps} from './layout-e.tsx';

const meta = {
  title: 'Iteration 4/Running Mode Layout R1/E — Mode Stack',
  component: LayoutE,
  parameters: {layout: 'fullscreen'},
} satisfies Meta<LayoutEProps>;

export default meta;

type Story = StoryObj<LayoutEProps>;

export const ExplorationNoEncounter: Story = {
  args: {mode: 'exploration'},
};

export const ExplorationWithEncounter: Story = {
  args: {mode: 'encounter'},
};

export const TacticsActive: Story = {
  args: {mode: 'tactics'},
};
