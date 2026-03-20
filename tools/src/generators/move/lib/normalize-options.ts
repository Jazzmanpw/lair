import {type Tree} from '@nx/devkit';
import {derivePackageName} from '#utils/package-name.ts';
import {resolvePath} from '#utils/resolve-path.ts';
import {type MoveGeneratorSchema} from '../schema.ts';

export type NormalizedOptions = MoveGeneratorSchema & {
  oldPackageName: string;
  newPackageName: string;
};

export function normalizeOptions(
  _tree: Tree,
  schema: MoveGeneratorSchema,
): NormalizedOptions {
  const source = resolvePath(schema.source);
  const destination = resolvePath(schema.destination);

  return {
    ...schema,
    source,
    destination,
    oldPackageName: derivePackageName(source),
    newPackageName: derivePackageName(destination),
  };
}
