import type {Meta, StoryObj} from '@storybook/react-vite';
import {chimeraStatblock} from '@lair/domain/fixtures/creatures';
import CreatureStatblock from './creature-statblock.tsx';
import SidePanel, {type SidePanelProps} from './side-panel.tsx';

type StoryArgs = SidePanelProps;

const meta = {
  title: 'Iteration 3/Side Panel',
  component: SidePanel,
  parameters: {layout: 'fullscreen'},
} satisfies Meta<StoryArgs>;

export default meta;

type Story = StoryObj<StoryArgs>;

export const WithStatblock: Story = {
  args: {
    open: true,
    title: chimeraStatblock.header.name,
  },
  render: (args) => (
    <SidePanel
      {...args}
      panelContent={<CreatureStatblock statblock={chimeraStatblock} />}
    />
  ),
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
