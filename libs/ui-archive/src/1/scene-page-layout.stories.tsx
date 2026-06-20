import type {Meta, StoryObj} from '@storybook/react-vite';
import {
  brazierHallScene,
  entranceScene,
} from '@lair/domain-archive/legacy-fixtures/scenes';
import ScenePageLayout, {
  type ScenePageLayoutProps,
} from './scene-page-layout.tsx';

type StoryArgs = ScenePageLayoutProps;

const meta = {
  title: 'Iteration 1/Scene Page Layout',
  component: ScenePageLayout,
} satisfies Meta<StoryArgs>;

export default meta;

type Story = StoryObj<StoryArgs>;

export const Default: Story = {
  args: {scene: entranceScene},
};

export const NoEncounter: Story = {
  args: {scene: brazierHallScene},
};
