const fs = require('fs');
const tsconfigFile = require('./tsconfig.json');

const folders = fs
  .readdirSync('src', { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => !['styles'].includes(dirent.name) && dirent.name);

const tsconfigPaths = Object.keys(tsconfigFile.compilerOptions.paths)
  .map(path => path.split('/')[0]);

module.exports = {
  root: true,
  extends: ['plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error', { usePrettierrc: true }],
  },
  overrides: [
    {
      files: ['**/*.ts'],
      extends: ['plugin:@typescript-eslint/recommended'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
        project: './tsconfig.json',
      },
      plugins: [
        '@typescript-eslint',
        'simple-import-sort',
        'import',
        'unused-imports',
      ],
      rules: {
        '@typescript-eslint/ban-types': 'warn',
        '@typescript-eslint/no-empty-function': 'warn',
        '@typescript-eslint/no-this-alias': 'warn',
        '@typescript-eslint/no-explicit-any': 'off',
        'no-restricted-imports': 'off',
        '@typescript-eslint/no-restricted-imports': [
          'error',
          {
            patterns: ['../*', './*'],
          },
        ],
        'prefer-rest-params': 'warn',
        'simple-import-sort/exports': 'error',
        'import/first': 'error',
        'import/newline-after-import': 'error',
        'import/no-duplicates': 'error',
        'unused-imports/no-unused-imports': 'error',
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              // Packages
              [
                '^@?\\w',
              ],
              // Folders
              [
                `^(${tsconfigPaths.join('|')})(/.*|$)`,
                `^(${folders.join('|')})(/.*|$)`,
                '^\\.',
                '^@\\/([a-z0-9]+)',
              ],
              // If not match on other groups
              ['^'],
            ],
          },
        ],
      },
    },
    {
      files: ['**/*.(c,m)?js?(x)'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: ['**/*.d.ts'],
      rules: {
        '@typescript-eslint/prefer-namespace-keyword': 'off',
      },
    },
  ],
};