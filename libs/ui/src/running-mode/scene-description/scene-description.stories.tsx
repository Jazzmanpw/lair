import type {Meta, StoryObj} from '@storybook/react-vite';
import {expect, userEvent} from 'storybook/test';
import {sceneDescriptionFixtures} from './scene-description-fixtures.ts';
import SceneDescription, {
  type SceneDescriptionProps,
} from './scene-description.tsx';

type StoryArgs = Omit<SceneDescriptionProps, 'scene'> & {
  fixture: keyof typeof sceneDescriptionFixtures;
  width: 400 | 480 | 560 | 640;
};

const meta = {
  title: 'Running Mode/Scene Description',
  parameters: {
    layout: 'fullscreen',
    backgrounds: {disable: true},
  },
  args: {
    fixture: 'complete',
    width: 640,
    showSceneTitle: false,
    hasMap: true,
    reminderStartsOpen: false,
  },
  argTypes: {
    fixture: {
      control: 'select',
      options: Object.keys(sceneDescriptionFixtures),
    },
    width: {control: 'inline-radio', options: [400, 480, 560, 640]},
  },
  render: ({fixture, showSceneTitle, hasMap, reminderStartsOpen, width}) => (
    <div style={{width}}>
      <SceneDescription
        scene={sceneDescriptionFixtures[fixture]}
        showSceneTitle={showSceneTitle}
        hasMap={hasMap}
        reminderStartsOpen={reminderStartsOpen}
        compact={width === 400}
      />
    </div>
  ),
  decorators: [
    (Story) => (
      <div className="grid min-h-screen w-screen place-items-center bg-[#12170f]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<StoryArgs>;

export default meta;

type Story = StoryObj<StoryArgs>;

export const Default: Story = {
  play: async ({canvas}) => {
    await userEvent.click(canvas.getByRole('button', {name: 'Детали сцены'}));
    await expect(
      canvas.getByRole('button', {name: 'Детали сцены'}),
    ).toHaveAttribute('aria-pressed', 'true');
  },
};

export const WithSceneTitle: Story = {
  args: {showSceneTitle: true},
};

export const ReminderOpen: Story = {
  args: {reminderStartsOpen: true},
};

export const MapPopup: Story = {
  args: {reminderStartsOpen: false},
  play: async ({canvas}) => {
    await userEvent.click(canvas.getByRole('button', {name: 'Схема сцены'}));
    await expect(
      canvas.getByRole('img', {
        name: 'Схема зала с жаровнями Круглая комната с центральной ямой, четырьмя жаровнями и проходами по сторонам света.',
      }),
    ).toBeVisible();
  },
};

export const FixtureStates: Story = {
  parameters: {controls: {disable: true}},
  render: () => (
    <div className="grid w-[1200px] grid-cols-2 bg-[#12170f]">
      {Object.values(sceneDescriptionFixtures).map((scene) => (
        <SceneDescription
          key={scene.id}
          scene={scene}
          hasMap={scene.id === 'brazier-hall'}
        />
      ))}
    </div>
  ),
};

export const Narrow: Story = {
  args: {width: 480},
};

export const Compact: Story = {
  args: {width: 400},
};

export const Overflow: Story = {
  args: {width: 480},
  render: ({width}) => (
    <div style={{width}}>
      <SceneDescription
        scene={{
          ...sceneDescriptionFixtures.detailsOnly,
          details: [
            ...sceneDescriptionFixtures.detailsOnly.details,
            'На верхних полках стоят запылённые банки с высохшими корнями и выцветшими этикетками.',
            'На столе остались весы, ступка, несколько открытых книг и недописанные заметки.',
            'Под ногами хрустят осколки тонкого стекла и рассыпанные сухие листья.',
          ],
        }}
      />
    </div>
  ),
};
