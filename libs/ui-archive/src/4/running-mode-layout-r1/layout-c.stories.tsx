import type {Meta, StoryObj} from '@storybook/react-vite';
import LayoutC, {type LayoutCProps} from './layout-c.tsx';

const meta = {
  title: 'Iteration 4/Running Mode Layout R1/C — Focus + Rails',
  component: LayoutC,
  parameters: {layout: 'fullscreen'},
} satisfies Meta<LayoutCProps>;

export default meta;

type Story = StoryObj<LayoutCProps>;

export const ExplorationNoEncounter: Story = {
  args: {mode: 'exploration'},
};

export const ExplorationWithEncounter: Story = {
  args: {mode: 'encounter'},
};

export const TacticsActive: Story = {
  args: {mode: 'tactics'},
};
