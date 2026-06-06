import type {Meta, StoryObj} from '@storybook/react-vite';
import LayoutF, {type LayoutFProps} from './layout-f.tsx';

const meta = {
  title: 'Iteration 4/Running Mode Layout R1/F — Tactical Overlay',
  component: LayoutF,
  parameters: {layout: 'fullscreen'},
} satisfies Meta<LayoutFProps>;

export default meta;

type Story = StoryObj<LayoutFProps>;

export const ExplorationNoEncounter: Story = {
  args: {mode: 'exploration'},
};

export const ExplorationWithEncounter: Story = {
  args: {mode: 'encounter'},
};

export const TacticsActive: Story = {
  args: {mode: 'tactics'},
};
