import type {Meta, StoryObj} from '@storybook/react-vite';
import LayoutO, {type LayoutOProps} from './layout-o.tsx';

const meta = {
  title: 'Iteration 4/Running Mode Layout R1/O - Tactical Overlay',
  component: LayoutO,
  parameters: {layout: 'fullscreen'},
} satisfies Meta<LayoutOProps>;

export default meta;

type Story = StoryObj<LayoutOProps>;

export const ExplorationNoEncounter: Story = {args: {mode: 'exploration'}};
export const ExplorationWithEncounter: Story = {args: {mode: 'encounter'}};
export const TacticsActive: Story = {args: {mode: 'tactics'}};
