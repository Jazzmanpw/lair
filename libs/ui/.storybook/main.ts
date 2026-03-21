import type {StorybookConfig} from '@storybook/react-vite';
import {createRequire} from 'node:module';
import {dirname, join} from 'node:path';

const require = createRequire(import.meta.url);

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.tsx'],
  addons: [
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-vitest'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },
};

export default config;

function getAbsolutePath(value: string) {
  return dirname(require.resolve(join(value, 'package.json')));
}
