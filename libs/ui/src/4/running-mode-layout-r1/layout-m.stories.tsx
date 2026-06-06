import type {Meta, StoryObj} from '@storybook/react-vite';
import LayoutM, {type LayoutMProps} from './layout-m.tsx';

const meta = {
  title: 'Iteration 4/Running Mode Layout R1/M - Map Table',
  component: LayoutM,
  parameters: {layout: 'fullscreen'},
} satisfies Meta<LayoutMProps>;

export default meta;

type Story = StoryObj<LayoutMProps>;

export const ExplorationNoEncounter: Story = {args: {mode: 'exploration'}};
export const ExplorationWithEncounter: Story = {args: {mode: 'encounter'}};
export const TacticsActive: Story = {args: {mode: 'tactics'}};
