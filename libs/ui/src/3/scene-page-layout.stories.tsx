import type {Meta, StoryObj} from '@storybook/react-vite';
import {chimeraStatblock} from '@lair/domain/fixtures/creatures';
import {
  brazierHallScene,
  entranceScene,
  morgueScene,
} from '@lair/domain/fixtures/scenes';
import type {Scene, SceneMeta} from '@lair/domain/scene';
import ScenePageLayout, {
  type LinkedSceneData,
  type ScenePageLayoutProps,
} from './scene-page-layout.tsx';

const sceneMap: Record<string, Scene> = {
  'izl-vkhod-v-laboratoriyu': entranceScene,
  'izl-zal-s-zharovnyami': brazierHallScene,
  'izl-morg': morgueScene,
};

function stubMeta(id: string): SceneMeta {
  const titles: Record<string, string> = {
    'izl-laboratoriya': 'Лаборатория',
    'izl-pitomnik': 'Питомник',
    'izl-komnata-otdyha': 'Комната отдыха',
  };
  return {
    id,
    title: titles[id] ?? id,
    location: {
      id: 'zabroshennaya-laboratoriya',
      label: 'Заброшенная лаборатория',
    },
    adventure: {
      id: 'issledovanie-zabroshennoy-laboratorii',
      label: 'Исследование заброшенной лаборатории',
    },
    setting: {id: 'solyonye-shramy', label: 'Солёные шрамы'},
  };
}

function buildLinkedScenes(scene: Scene): LinkedSceneData[] {
  return scene.linkedSceneIds.map((id) => {
    const linked = sceneMap[id];
    if (linked) {
      return {
        meta: linked.meta,
        creatureCount: linked.encounter?.creatures.length,
        trapCount: linked.traps.length,
      };
    }
    return {meta: stubMeta(id)};
  });
}

type StoryArgs = ScenePageLayoutProps;

const meta = {
  title: 'Iteration 3/Scene Page Layout',
  component: ScenePageLayout,
  parameters: {layout: 'fullscreen'},
} satisfies Meta<StoryArgs>;

export default meta;

type Story = StoryObj<StoryArgs>;

const statblocks = {'khimera-tyangu': chimeraStatblock};

export const Default: Story = {
  args: {
    scene: entranceScene,
    linkedScenes: buildLinkedScenes(entranceScene),
    statblocks,
  },
};

export const NoEncounter: Story = {
  args: {
    scene: brazierHallScene,
    linkedScenes: buildLinkedScenes(brazierHallScene),
  },
};
