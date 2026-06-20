import type {Preview} from '@storybook/react-vite';
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
  parameters: {
    a11y: {test: 'todo'},
  },
};

export default preview;
