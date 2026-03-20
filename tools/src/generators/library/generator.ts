import {
  formatFiles,
  generateFiles,
  installPackagesTask,
  type Tree,
} from '@nx/devkit';
import {join} from 'path';
import {normalizeOptions} from './lib/normalize-options.ts';
import {type LibraryGeneratorSchema} from './schema.ts';

export default async function libraryGenerator(
  tree: Tree,
  schema: LibraryGeneratorSchema,
) {
  const options = normalizeOptions(tree, schema);

  // Calculate relative path to root for imports
  const relativeToRoot = '../'.repeat(options.libDir.split(/[/\\]/).length);

  // Generate common files
  generateFiles(tree, join(__dirname, './files'), options.libDir, {
    ...options,
    relativeToRoot,
    template: '',
  });

  // Remove storybook files for non-react libs or when explicitly skipped
  if (options.type !== 'react' || options.skipStorybook) {
    tree.delete(join(options.libDir, '.storybook'));
  }

  await formatFiles(tree);

  return () => {
    installPackagesTask(tree, true);
  };
}
