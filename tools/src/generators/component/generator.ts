import {formatFiles, generateFiles, type Tree} from '@nx/devkit';
import {dirname, join} from 'path';
import storyGenerator from '../story/generator.ts';
import {normalizeOptions} from './lib/normalize-options.ts';
import type {ComponentGeneratorSchema} from './schema.ts';

export default async function componentGenerator(
  tree: Tree,
  schema: ComponentGeneratorSchema,
) {
  const options = normalizeOptions(tree, schema);

  generateFiles(
    tree,
    join(__dirname, 'files'),
    dirname(options.componentFilePath),
    options,
  );

  if (schema.story) {
    await storyGenerator(tree, {path: options.componentFilePath});
  }

  await formatFiles(tree);
}
