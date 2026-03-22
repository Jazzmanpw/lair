import type {Meta, StoryObj} from '@storybook/react-vite';
import SidePanel, {type SidePanelProps} from './side-panel.tsx';

type StoryArgs = SidePanelProps;

const meta = {
  title: 'Iteration 2/Side Panel',
  component: SidePanel,
  parameters: {layout: 'fullscreen'},
} satisfies Meta<StoryArgs>;

export default meta;

type Story = StoryObj<StoryArgs>;

export const CreatureStatblock: Story = {
  args: {
    open: true,
    title: 'Химера Тяньгу',
    contentLabel: 'Creature Statblock',
  },
};

export const TrapStatblock: Story = {
  args: {
    open: true,
    title: 'Звериный замок Тяньгу',
    contentLabel: 'Trap Statblock',
  },
};

export const Closed: Story = {
  args: {
    open: false,
  },
};
