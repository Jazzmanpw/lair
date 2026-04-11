import type {Meta, StoryObj} from '@storybook/react-vite';
import {entranceScene} from '@lair/domain/fixtures-legacy/scenes';
import EncounterRunner, {
  type EncounterRunnerProps,
} from './encounter-runner.tsx';

type StoryArgs = EncounterRunnerProps;

const meta = {
  title: 'Iteration 2/Encounter Runner',
  component: EncounterRunner,
  parameters: {layout: 'fullscreen'},
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 200px',
          height: '100vh',
          background: '#12170f',
          overflow: 'hidden',
        }}
      >
        <div style={{overflow: 'hidden'}}>
          <Story />
        </div>
        <div
          style={{
            borderLeft: '1px solid #2c3428',
            background: '#151c12',
            padding: '12px',
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--lair-text-dim, #7a7e88)',
            fontFamily: 'var(--lair-font, "Rubik", sans-serif)',
          }}
        >
          Sidebar rail
        </div>
      </div>
    ),
  ],
} satisfies Meta<StoryArgs>;

export default meta;

type Story = StoryObj<StoryArgs>;

export const Default: Story = {
  args: {encounter: entranceScene.encounter!},
};
