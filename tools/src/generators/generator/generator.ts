import {
  formatFiles,
  generateFiles,
  readJson,
  type Tree,
  writeJson,
} from '@nx/devkit';
import {join} from 'path';
import {
  type NormalizedOptions,
  normalizeOptions,
} from './lib/normalize-options.ts';
import {type GeneratorGeneratorSchema} from './schema.ts';

export default async function generatorGenerator(
  tree: Tree,
  schema: GeneratorGeneratorSchema,
) {
  const options = normalizeOptions(tree, schema);

  generateFiles(tree, join(__dirname, './files'), options.generatorDir, {
    name: options.name,
    className: options.className,
    propertyName: options.propertyName,
    template: '',
  });

  updateGeneratorsJson(tree, options);

  await formatFiles(tree);
}

function updateGeneratorsJson(tree: Tree, options: NormalizedOptions) {
  const generatorsJsonPath = 'tools/generators.json';
  const generatorsJson = readJson(tree, generatorsJsonPath);

  const entry: Record<string, unknown> = {
    factory: `./src/generators/${options.name}/generator`,
    schema: `./src/generators/${options.name}/schema.json`,
    description: options.description || `Run ${options.name} generator`,
  };

  if (options.alias) {
    entry.aliases = [options.alias];
  }

  generatorsJson.generators[options.name] = entry;

  writeJson(tree, generatorsJsonPath, generatorsJson);
}
