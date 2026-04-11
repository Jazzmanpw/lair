import js from '@eslint/js';
import nx from '@nx/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier';
import pluginImport from 'eslint-plugin-import';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default [
  {ignores: ['dist', '**/node_modules', '.nx']},
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  reactRefresh.configs.vite,
  reactHooks.configs.flat.recommended,
  {
    rules: {
      'react-hooks/set-state-in-effect': 'off',
      'react-refresh/only-export-components': 'off',
      '@typescript-eslint/no-namespace': 'off',
    },
  },
  {
    plugins: {import: pluginImport},
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    settings: {
      'import/internal-regex': '#.*|@lair/.*',
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      'import/order': [
        'warn',
        {
          groups: [['builtin', 'external'], 'internal', 'parent', 'sibling'],
          'newlines-between': 'never',
          alphabetize: {
            order: 'asc',
            orderImportKind: 'ignore',
            caseInsensitive: true,
          },
          named: true,
        },
      ],
    },
  },
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^#.+', '^(\\.\\./)+eslint\\.config\\.js$'],
          depConstraints: [{sourceTag: '*', onlyDependOnLibsWithTags: ['*']}],
        },
      ],
    },
  },
  {
    files: ['.storybook/**/*', '**/*.{mock,stories,test}.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },
  eslintConfigPrettier,
];
