import { config as baseConfig } from '@repo/eslint-config/base';
import globals from 'globals';

export default [
  ...baseConfig,
  {
    ignores: ['eslint.config.mjs'],
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: {
          allowDefaultProject: ['drizzle.config.ts', 'src/test/*.spec.ts'],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
    },
  },
];
