import {type Tree} from '@nx/devkit';
import {type RemoveGeneratorSchema} from '../schema.ts';

export type NormalizedOptions = RemoveGeneratorSchema & {
  projectName: string;
};

export function normalizeOptions(
  _tree: Tree,
  schema: RemoveGeneratorSchema,
): NormalizedOptions {
  return {
    ...schema,
    projectName: schema.project,
  };
}
