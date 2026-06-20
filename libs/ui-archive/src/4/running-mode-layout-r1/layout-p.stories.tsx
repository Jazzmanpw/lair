import type {Meta, StoryObj} from '@storybook/react-vite';
import LayoutP, {type LayoutPProps} from './layout-p.tsx';

const meta = {
  title: 'Iteration 4/Running Mode Layout R1/P - Dual Plane Split',
  component: LayoutP,
  parameters: {layout: 'fullscreen'},
} satisfies Meta<LayoutPProps>;

export default meta;

type Story = StoryObj<LayoutPProps>;

export const ExplorationNoEncounter: Story = {args: {mode: 'exploration'}};
export const ExplorationWithEncounter: Story = {args: {mode: 'encounter'}};
export const TacticsActive: Story = {args: {mode: 'tactics'}};
