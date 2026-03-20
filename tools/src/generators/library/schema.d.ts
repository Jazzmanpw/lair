export type LibraryGeneratorSchema = {
  path: string;
  type?: 'react' | 'node' | 'shared';
  tags?: string;
  skipStorybook?: boolean;
  dryRun?: boolean;
};
