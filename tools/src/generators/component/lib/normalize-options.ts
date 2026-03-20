import {names, type Tree} from '@nx/devkit';
import {basename} from 'path';
import {resolvePath} from '#utils/resolve-path.ts';
import type {ComponentGeneratorSchema} from '../schema.ts';

export type NormalizedOptions = {
  componentFileName: string;
  componentFilePath: string;
  componentName: string;
  propsTypeName: string | null;
};

export function normalizeOptions(
  tree: Tree,
  schema: ComponentGeneratorSchema,
): NormalizedOptions {
  const path = resolvePath(schema.path);

  if (!path.endsWith('.tsx')) {
    throw new Error('Path must end with .tsx');
  }

  if (tree.exists(path)) {
    throw new Error(`File already exists: ${path}`);
  }

  const componentFileName = basename(path, '.tsx');
  const {className: componentName} = names(componentFileName);
  const propsTypeName = schema.skipProps ? null : `${componentName}Props`;

  return {
    componentFileName,
    componentFilePath: path,
    componentName,
    propsTypeName,
  };
}
