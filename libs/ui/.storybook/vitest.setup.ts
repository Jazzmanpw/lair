import * as a11yAddonAnnotations from '@storybook/addon-a11y/preview';
import {setProjectAnnotations} from '@storybook/react-vite';
import * as projectAnnotations from './preview.tsx';

// Apply project annotations when testing stories
// https://storybook.js.org/docs/api/portable-stories/portable-stories-vitest#setprojectannotations
setProjectAnnotations([a11yAddonAnnotations, projectAnnotations]);
