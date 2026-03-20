import {names, type Tree} from '@nx/devkit';
import {basename, dirname} from 'path';
import {resolvePath} from '#utils/resolve-path.ts';
import type {StoryGeneratorSchema} from '../schema.ts';

export type NormalizedOptions = {
  componentFileName: string;
  storyFilePath: string;
  storyDir: string;
  componentName: string | null;
  propsTypeName: string | null;
  title: string;
  hasComponent: boolean;
};

export function normalizeOptions(
  tree: Tree,
  schema: StoryGeneratorSchema,
): NormalizedOptions {
  const path = resolvePath(schema.path);

  if (!path.endsWith('.tsx')) {
    throw new Error('Path must end with .tsx');
  }

  const isStoriesPath = path.includes('.stories.');
  const storyFilePath = isStoriesPath
    ? path
    : path.replace(/\.tsx$/, '.stories.tsx');
  const componentFilePath = isStoriesPath
    ? path.replace('.stories.tsx', '.tsx')
    : path;

  if (tree.exists(storyFilePath)) {
    throw new Error(`Story file already exists: ${storyFilePath}`);
  }

  if (!isStoriesPath && !tree.exists(componentFilePath)) {
    throw new Error(`Component file not found: ${componentFilePath}`);
  }

  const hasComponent = tree.exists(componentFilePath);
  const componentFileName = basename(componentFilePath, '.tsx');
  const {className: componentName} = names(componentFileName);
  const storyDir = dirname(storyFilePath);

  let propsTypeName: string | null = null;
  if (hasComponent) {
    const content = tree.read(componentFilePath, 'utf-8')!;
    const expectedPropsType = `${componentName}Props`;
    const exportedPropsRegex = new RegExp(
      `export\\s+type\\s+${expectedPropsType}\\b`,
    );
    const unexportedPropsRegex = new RegExp(
      `(?<!export\\s)type\\s+${expectedPropsType}\\b`,
    );

    if (exportedPropsRegex.test(content)) {
      propsTypeName = expectedPropsType;
    } else if (unexportedPropsRegex.test(content)) {
      const updated = content.replace(
        new RegExp(`type\\s+${expectedPropsType}\\b`),
        `export type ${expectedPropsType}`,
      );
      tree.write(componentFilePath, updated);
      propsTypeName = expectedPropsType;
    }
  }

  const title =
    schema.title ?? componentName.replace(/([a-z])([A-Z])/g, '$1 $2');

  return {
    componentFileName,
    storyFilePath,
    storyDir,
    componentName: hasComponent ? componentName : null,
    propsTypeName,
    title,
    hasComponent,
  };
}
