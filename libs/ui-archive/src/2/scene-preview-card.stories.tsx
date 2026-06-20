import type {Meta, StoryObj} from '@storybook/react-vite';
import {
  entranceScene,
  morgueScene,
} from '@lair/domain-archive/legacy-fixtures/scenes';
import ScenePreviewCard, {
  type ScenePreviewCardProps,
} from './scene-preview-card.tsx';

type StoryArgs = ScenePreviewCardProps;

const meta = {
  title: 'Iteration 2/Scene Preview Card',
  component: ScenePreviewCard,
} satisfies Meta<StoryArgs>;

export default meta;

type Story = StoryObj<StoryArgs>;

export const WithEncounter: Story = {
  args: {
    meta: entranceScene.meta,
    creatureCount: 4,
    trapCount: 1,
  },
};

export const NoEncounter: Story = {
  args: {
    meta: morgueScene.meta,
    creatureCount: 0,
    trapCount: 1,
  },
};

export const Minimal: Story = {
  args: {
    meta: morgueScene.meta,
  },
};
