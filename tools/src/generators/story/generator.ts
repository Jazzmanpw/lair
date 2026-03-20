import {formatFiles, generateFiles, type Tree} from '@nx/devkit';
import {join} from 'path';
import {normalizeOptions} from './lib/normalize-options.ts';
import type {StoryGeneratorSchema} from './schema.ts';

export default async function storyGenerator(
  tree: Tree,
  schema: StoryGeneratorSchema,
) {
  const options = normalizeOptions(tree, schema);

  generateFiles(tree, join(__dirname, 'files'), options.storyDir, options);

  await formatFiles(tree);
}
