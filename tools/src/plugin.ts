import {
  type CreateNodesContextV2,
  createNodesFromFiles,
  type CreateNodesV2,
  type ProjectConfiguration,
  type TargetConfiguration,
} from '@nx/devkit';
import {existsSync} from 'fs';
import {basename, dirname, join} from 'path';

export const createNodesV2: CreateNodesV2 = [
  '**/package.json',
  (configFiles, _options, context) =>
    createNodesFromFiles(
      (configFile, _options, context) => {
        const projectRoot = dirname(configFile);

        // Skip root config (it's a base config, not a project)
        if (projectRoot === '.') {
          return {};
        }

        return {
          projects: {
            [projectRoot]: {
              root: projectRoot,
              targets: Object.fromEntries([
                ...viteTargets(projectRoot, context),
                ...testTargets(projectRoot, context),
                ...typescriptTargets(projectRoot, context),
                ...storybookTargets(projectRoot, context),
              ]),
            } satisfies ProjectConfiguration,
          },
        };
      },
      configFiles,
      _options,
      context,
    ),
];

// Vite resolves libs from source via TS project references —
// building deps first is unnecessary overhead.
function* viteTargets(projectRoot: string, context: CreateNodesContextV2) {
  const hasViteConfig = existsSync(
    join(context.workspaceRoot, projectRoot, 'vite.config.ts'),
  );
  const hasAppConfig = existsSync(
    join(context.workspaceRoot, projectRoot, 'tsconfig.app.json'),
  );

  if (hasViteConfig && hasAppConfig) {
    yield targetEntry('build', {dependsOn: []});
  }
}

function* testTargets(projectRoot: string, context: CreateNodesContextV2) {
  const hasViteConfig = existsSync(
    join(context.workspaceRoot, projectRoot, 'vite.config.ts'),
  );

  if (hasViteConfig) {
    yield targetEntry('test', {
      command: 'vitest run --passWithNoTests',
      options: {cwd: projectRoot},
      cache: true,
      inputs: [
        'default',
        '^production',
        {externalDependencies: ['vitest']},
        {env: 'CI'},
      ],
      outputs: ['{workspaceRoot}/coverage/{projectRoot}'],
      metadata: {
        description: 'Run Vite tests',
        technologies: ['vite'],
      },
    });
  }
}

function* typescriptTargets(
  projectRoot: string,
  context: CreateNodesContextV2,
) {
  const hasNodeConfig = existsSync(
    join(context.workspaceRoot, projectRoot, 'tsconfig.node.json'),
  );

  if (hasNodeConfig) {
    yield targetEntry('typecheck:node', {
      command: 'tsc --noEmit -p tsconfig.node.json',
      options: {cwd: projectRoot},
      cache: true,
      inputs: [
        'production',
        '^production',
        {externalDependencies: ['typescript']},
      ],
      metadata: {
        description:
          'Runs type-checking for node config (vite.config.ts, etc.)',
        technologies: ['typescript'],
      },
    });
  }

  const hasAppConfig = existsSync(
    join(context.workspaceRoot, projectRoot, 'tsconfig.app.json'),
  );
  const hasLibConfig = existsSync(
    join(context.workspaceRoot, projectRoot, 'tsconfig.lib.json'),
  );
  const appTarget = hasAppConfig || hasLibConfig ? 'typecheck:app' : null;

  // Apps don't need declaration emit — override the vite plugin's
  // `tsc --build --emitDeclarationOnly` with `--noEmit`, but keep
  // `dependsOn: ['^typecheck:app']` so lib dependencies get built first.
  if (hasAppConfig) {
    yield targetEntry('typecheck:app', {
      command: 'tsc --noEmit -p tsconfig.app.json',
      options: {cwd: projectRoot},
      dependsOn: ['^typecheck:app'],
      cache: true,
      inputs: [
        'production',
        '^production',
        {externalDependencies: ['typescript']},
      ],
      syncGenerators: ['@nx/js:typescript-sync'],
      metadata: {
        description: 'Runs type-checking for the app.',
        technologies: ['typescript'],
      },
    });
  }

  // Override typecheck to depend on sub-targets.
  // For apps, use `nx:noop` executor to prevent the `@nx/js/typescript`
  // plugin's `tsc --build --emitDeclarationOnly` from running — apps
  // don't emit declarations, so the sub-targets do all the work.
  if (appTarget) {
    yield targetEntry('typecheck', {
      ...(hasAppConfig ? {executor: 'nx:noop'} : {}),
      dependsOn: [appTarget, ...(hasNodeConfig ? ['typecheck:node'] : [])],
      cache: true,
      inputs: ['production', '^production'],
      syncGenerators: ['@nx/js:typescript-sync'],
      metadata: {
        description: 'Runs all type-checking (app + node configs)',
        technologies: ['typescript'],
      },
    });
  }
}

// Override storybook build/serve targets to use dist/storybook/<name>
function* storybookTargets(projectRoot: string, context: CreateNodesContextV2) {
  const hasStorybook = existsSync(
    join(context.workspaceRoot, projectRoot, '.storybook', 'main.ts'),
  );

  if (hasStorybook) {
    const projectName = basename(projectRoot);
    const relativeToRoot = '../'.repeat(projectRoot.split(/[/\\]/).length);

    yield targetEntry('storybook', {
      command: 'storybook dev',
      options: {cwd: projectRoot},
      continuous: true,
    });

    yield targetEntry('build-storybook', {
      command: `storybook build --output-dir ${relativeToRoot}dist/storybook/${projectName}`,
      options: {cwd: projectRoot},
      cache: true,
      inputs: [
        'production',
        '^production',
        {externalDependencies: ['storybook']},
      ],
      outputs: [`{workspaceRoot}/dist/storybook/${projectName}`],
    });

    yield targetEntry('static-storybook', {
      executor: '@nx/web:file-server',
      continuous: true,
      dependsOn: ['build-storybook'],
      options: {
        buildTarget: 'build-storybook',
        staticFilePath: `dist/storybook/${projectName}`,
      },
    });
  }
}

function targetEntry(targetName: string, targetConfig: TargetConfiguration) {
  return [targetName, targetConfig] as const;
}
