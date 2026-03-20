import {names, type Tree} from '@nx/devkit';
import {type GeneratorGeneratorSchema} from '../schema.ts';

const TOOLS_ROOT = 'tools';

export type NormalizedOptions = GeneratorGeneratorSchema & {
  className: string;
  propertyName: string;
  generatorDir: string;
};

export function normalizeOptions(
  _tree: Tree,
  schema: GeneratorGeneratorSchema,
): NormalizedOptions {
  const {className, propertyName} = names(schema.name);
  const generatorDir = `${TOOLS_ROOT}/src/generators/${schema.name}`;

  return {
    ...schema,
    className,
    propertyName,
    generatorDir,
  };
}
