import type {Meta, StoryObj} from '@storybook/react-vite';
import {
  brazierHallScene,
  entranceScene,
} from '@lair/domain/fixtures-legacy/scenes';
import ScenePageLayout, {
  type ScenePageLayoutProps,
} from './scene-page-layout.tsx';

type StoryArgs = ScenePageLayoutProps;

const meta = {
  title: 'Iteration 2/Scene Page Layout',
  component: ScenePageLayout,
  parameters: {layout: 'fullscreen'},
} satisfies Meta<StoryArgs>;

export default meta;

type Story = StoryObj<StoryArgs>;

export const Default: Story = {
  args: {scene: entranceScene},
};

export const NoEncounter: Story = {
  args: {scene: brazierHallScene},
};
