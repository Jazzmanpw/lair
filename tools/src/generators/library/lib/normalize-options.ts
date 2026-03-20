import {names, type Tree} from '@nx/devkit';
import {basename} from 'path';
import {derivePackageName} from '#utils/package-name.ts';
import {resolvePath} from '#utils/resolve-path.ts';
import {type LibraryGeneratorSchema} from '../schema.ts';

export type NormalizedOptions = LibraryGeneratorSchema & {
  name: string;
  className: string;
  propertyName: string;
  packageName: string;
  libDir: string;
  type: 'react' | 'node' | 'shared';
  parsedTags: string[];
};

export function normalizeOptions(
  _tree: Tree,
  schema: LibraryGeneratorSchema,
): NormalizedOptions {
  const path = resolvePath(schema.path);
  const name = basename(path);
  const {className, propertyName} = names(name);

  const packageName = derivePackageName(path);

  // Parse tags
  const parsedTags = schema.tags
    ? schema.tags.split(',').map((t) => t.trim())
    : [];

  return {
    ...schema,
    name,
    className,
    propertyName,
    packageName,
    path,
    libDir: path,
    type: schema.type ?? 'react',
    parsedTags,
  };
}
