import {
  formatFiles,
  installPackagesTask,
  logger,
  readJson,
  type Tree,
  updateJson,
  visitNotIgnoredFiles,
  writeJson,
} from '@nx/devkit';
import {join, relative} from 'path';
import {
  type NormalizedOptions,
  normalizeOptions,
} from './lib/normalize-options.ts';
import {type MoveGeneratorSchema} from './schema.ts';

const SOURCE_FILE_PATTERN = /\.(ts|tsx|js|jsx|template)$/;
const DOC_FILE_PATTERN = /\.(md|mdx)$/;
const SKIP_DIRS = /^(node_modules|dist|\.nx)[/\\]/;

export default async function moveGenerator(
  tree: Tree,
  schema: MoveGeneratorSchema,
) {
  const options = normalizeOptions(tree, schema);

  validate(tree, options);
  clearDestination(tree, options);
  moveFiles(tree, options);
  updatePackageJson(tree, options);
  updateRootTsconfig(tree, options);
  rewriteImports(tree, options);
  reportNonSourceReferences(tree, options);
  updateOutDir(tree, options);

  await formatFiles(tree);

  return () => {
    installPackagesTask(tree, true);
  };
}

function validate(tree: Tree, options: NormalizedOptions) {
  if (!tree.exists(join(options.source, 'package.json'))) {
    throw new Error(
      `Source "${options.source}" does not exist or has no package.json`,
    );
  }

  if (
    !options.clearDestination &&
    tree.exists(join(options.destination, 'package.json'))
  ) {
    throw new Error(
      `Destination "${options.destination}" already exists. Use --clearDestination to overwrite.`,
    );
  }
}

function clearDestination(tree: Tree, options: NormalizedOptions) {
  if (!options.clearDestination) return;
  if (!tree.exists(options.destination)) return;

  visitNotIgnoredFiles(tree, options.destination, (filePath) => {
    tree.delete(filePath);
  });
}

function moveFiles(tree: Tree, options: NormalizedOptions) {
  const filesToMove: {from: string; content: Buffer | string}[] = [];

  visitNotIgnoredFiles(tree, options.source, (filePath) => {
    filesToMove.push({from: filePath, content: tree.read(filePath)!});
  });

  for (const file of filesToMove) {
    const relativePath = relative(options.source, file.from);
    const newPath = join(options.destination, relativePath);
    tree.write(newPath, file.content);
    tree.delete(file.from);
  }
}

function updatePackageJson(tree: Tree, options: NormalizedOptions) {
  const pkgJsonPath = join(options.destination, 'package.json');
  const pkgJson = readJson(tree, pkgJsonPath);

  pkgJson.name = options.newPackageName;

  writeJson(tree, pkgJsonPath, pkgJson);
}

function updateRootTsconfig(tree: Tree, options: NormalizedOptions) {
  const tsconfigPath = 'tsconfig.json';
  if (!tree.exists(tsconfigPath)) return;

  updateJson(tree, tsconfigPath, (json) => {
    if (!Array.isArray(json.references)) return json;

    const oldRef = `./${options.source}`;
    const newRef = `./${options.destination}`;

    json.references = json.references.map((ref: {path: string}) =>
      ref.path === oldRef ? {...ref, path: newRef} : ref,
    );
    return json;
  });
}

function rewriteImports(tree: Tree, options: NormalizedOptions) {
  if (options.oldPackageName === options.newPackageName) return;

  const oldName = options.oldPackageName;
  const newName = options.newPackageName;
  const pattern = new RegExp(escapeRegExp(oldName) + '(?![\\w-])', 'g');

  visitNotIgnoredFiles(tree, '.', (filePath) => {
    if (SKIP_DIRS.test(filePath)) return;
    if (!SOURCE_FILE_PATTERN.test(filePath)) return;

    const content = tree.read(filePath, 'utf-8');
    if (!content?.includes(oldName)) return;

    tree.write(filePath, content.replace(pattern, newName));
  });
}

function reportNonSourceReferences(tree: Tree, options: NormalizedOptions) {
  if (options.oldPackageName === options.newPackageName) return;

  const oldName = options.oldPackageName;
  const fileCounts = new Map<string, number>();

  visitNotIgnoredFiles(tree, '.', (filePath) => {
    if (SKIP_DIRS.test(filePath)) return;
    if (!DOC_FILE_PATTERN.test(filePath)) return;

    const content = tree.read(filePath, 'utf-8');
    if (!content?.includes(oldName)) return;

    const count = content.split(oldName).length - 1;
    fileCounts.set(filePath, count);
  });

  if (fileCounts.size > 0) {
    const lines = [...fileCounts.entries()].map(([file, count]) =>
      count > 1 ? `  ${file} (${count} occurrences)` : `  ${file}`,
    );
    logger.info(
      `\nFound references in non-source files (not auto-updated):\n` +
        lines.join('\n') +
        `\n\nSearch and replace "${oldName}" with "${options.newPackageName}" if needed.\n`,
    );
  }
}

function updateOutDir(tree: Tree, options: NormalizedOptions) {
  const tsconfigLibPath = join(options.destination, 'tsconfig.lib.json');
  if (!tree.exists(tsconfigLibPath)) return;

  updateJson(tree, tsconfigLibPath, (json) => {
    if (typeof json.compilerOptions?.outDir !== 'string') return json;

    const oldDirName = options.source.replace(/\\/g, '/').split('/').pop()!;
    const newDirName = options.destination
      .replace(/\\/g, '/')
      .split('/')
      .pop()!;

    json.compilerOptions.outDir = json.compilerOptions.outDir.replace(
      oldDirName,
      newDirName,
    );
    return json;
  });
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
