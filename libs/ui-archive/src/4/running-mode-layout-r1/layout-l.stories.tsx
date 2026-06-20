import type {Meta, StoryObj} from '@storybook/react-vite';
import LayoutL, {type LayoutLProps} from './layout-l.tsx';

const meta = {
  title: 'Iteration 4/Running Mode Layout R1/L - Timeline Shelf',
  component: LayoutL,
  parameters: {layout: 'fullscreen'},
} satisfies Meta<LayoutLProps>;

export default meta;

type Story = StoryObj<LayoutLProps>;

export const ExplorationNoEncounter: Story = {args: {mode: 'exploration'}};
export const ExplorationWithEncounter: Story = {args: {mode: 'encounter'}};
export const TacticsActive: Story = {args: {mode: 'tactics'}};
