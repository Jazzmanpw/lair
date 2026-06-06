import type {Meta, StoryObj} from '@storybook/react-vite';
import LayoutN, {type LayoutNProps} from './layout-n.tsx';

const meta = {
  title: 'Iteration 4/Running Mode Layout R1/N - Tabbed Workbench',
  component: LayoutN,
  parameters: {layout: 'fullscreen'},
} satisfies Meta<LayoutNProps>;

export default meta;

type Story = StoryObj<LayoutNProps>;

export const ExplorationNoEncounter: Story = {args: {mode: 'exploration'}};
export const ExplorationWithEncounter: Story = {args: {mode: 'encounter'}};
export const TacticsActive: Story = {args: {mode: 'tactics'}};
