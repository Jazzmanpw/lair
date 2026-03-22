import type {Preview} from '@storybook/react-vite';
import type {CSSProperties} from 'react';
import '../src/styles.css';

const preview: Preview = {
  beforeEach: [
    ({canvasElement}) => {
      // fix id missing in Vitest's playwright browser environment
      if (!canvasElement.id) {
        canvasElement.id = 'storybook-root';
      }
    },
  ],
  globalTypes: {
    textColor: {
      name: 'Primary text',
      toolbar: {
        icon: 'paintbrush',
        items: [
          {value: '#d4cbb8', title: 'Warmer'},
          {value: '#dcd8cc', title: 'Brighter'},
        ],
        dynamicTitle: true,
      },
    },
    dimColor: {
      name: 'Secondary text',
      toolbar: {
        icon: 'eye',
        items: [
          {value: '#7a7e88', title: 'Cool dim'},
          {value: '#9a9080', title: 'Warm dim'},
        ],
        dynamicTitle: true,
      },
    },
    font: {
      name: 'Font',
      toolbar: {
        icon: 'document',
        items: [
          {value: '"Rubik", sans-serif', title: 'Rubik'},
          {value: '"Century Gothic", sans-serif', title: 'Century Gothic'},
          {value: '"Nunito Sans", sans-serif', title: 'Nunito Sans'},
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    textColor: '#d4cbb8',
    dimColor: '#7a7e88',
    font: '"Rubik", sans-serif',
    backgrounds: {
      value: 'lair-void',
    },
  },
  decorators: [
    (Story, context) => (
      <div
        style={
          {
            '--lair-text': context.globals['textColor'] || '#d4cbb8',
            '--lair-text-dim': context.globals['dimColor'] || '#7a7e88',
            '--lair-font': context.globals['font'] || '"Rubik", sans-serif',
          } as CSSProperties
        }
      >
        <Story />
      </div>
    ),
  ],
  parameters: {
    a11y: {test: 'todo'},
    backgrounds: {
      options: {
        'lair-void': {name: 'Void', value: '#12170f'},
        'lair-rock': {name: 'Rock', value: '#1d231a'},
        white: {name: 'White', value: '#ffffff'},
      },
    },
  },
};

export default preview;
