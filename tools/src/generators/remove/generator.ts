import {
  formatFiles,
  getProjects,
  installPackagesTask,
  type Tree,
  updateJson,
  visitNotIgnoredFiles,
} from '@nx/devkit';
import {type RemoveGeneratorSchema} from './schema.ts';

const IMPORT_FILE_PATTERN = /\.(ts|tsx|js|jsx|md|mdx|template)$/;

export default async function removeGenerator(
  tree: Tree,
  schema: RemoveGeneratorSchema,
) {
  const projects = getProjects(tree);
  const projectRoot = resolveProjectRoot(projects, schema.project);
  checkImports(tree, schema, projectRoot);
  deleteProjectFiles(tree, projectRoot);
  updateRootTsconfig(tree, projectRoot);

  await formatFiles(tree);

  return () => {
    installPackagesTask(tree, true);
  };
}

function resolveProjectRoot(
  projects: Map<string, {root: string}>,
  projectName: string,
): string {
  for (const [name, config] of projects) {
    if (name === projectName) return config.root;
  }
  throw new Error(
    `Project "${projectName}" not found. Available projects: ${[...projects.keys()].join(', ')}`,
  );
}

function checkImports(
  tree: Tree,
  schema: RemoveGeneratorSchema,
  projectRoot: string,
) {
  const filesWithImports: string[] = [];

  visitNotIgnoredFiles(tree, '.', (filePath) => {
    if (filePath.startsWith(projectRoot + '/')) return;
    if (!IMPORT_FILE_PATTERN.test(filePath)) return;

    const content = tree.read(filePath, 'utf-8');
    if (content?.includes(schema.project)) {
      filesWithImports.push(filePath);
    }
  });

  if (filesWithImports.length > 0 && !schema.force) {
    throw new Error(
      `Cannot remove "${schema.project}" — it is still imported in:\n` +
        filesWithImports.map((f) => `  - ${f}`).join('\n') +
        '\n\nUse --force to remove anyway.',
    );
  }
}

function deleteProjectFiles(tree: Tree, projectRoot: string) {
  const filesToDelete: string[] = [];
  visitNotIgnoredFiles(tree, projectRoot, (filePath) => {
    filesToDelete.push(filePath);
  });
  for (const filePath of filesToDelete) {
    tree.delete(filePath);
  }
}

function updateRootTsconfig(tree: Tree, projectRoot: string) {
  const tsconfigPath = 'tsconfig.json';
  if (!tree.exists(tsconfigPath)) return;

  updateJson(tree, tsconfigPath, (json) => {
    if (!Array.isArray(json.references)) return json;

    json.references = json.references.filter(
      (ref: {path: string}) => ref.path !== `./${projectRoot}`,
    );
    return json;
  });
}
