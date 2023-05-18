const fs = require('fs');
const tsconfigFile = require('./tsconfig.json');

const folders = fs
  .readdirSync('./', { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

const tsconfigPaths = Object.keys(tsconfigFile.compilerOptions.paths ?? {})
  .map(path => path.split('/')[0]);

module.exports = {
  root: true,
  extends: ['prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error', { usePrettierrc: true }],
  },
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      extends: ['plugin:@typescript-eslint/recommended'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
        extraFileExtensions: ['.css'],
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
          'warn',
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
                // '^react',
                // '^react\\/([a-z0-9]+)',
                // '^react([a-zA-Z0-9\\-]+)?',
                '^@?\\w',
              ],
              // Folders
              [
                `^(${tsconfigPaths.join('|')})(/.*|$)`,
                `^(${folders.join('|')})(/.*|$)`,
                '^\\.',
                '^@\\/([a-z0-9]+)',
              ],
              // Styles
              ['^styles', 'styles', './styles', '^.+\\.s?css$'],
              // If not match on other groups
              ['^'],
            ],
          },
        ],
      },
    },
    {
      files: ['**/*.tsx', '**/*.jsx'],
      extends: ['plugin:react/recommended'],
      plugins: ['react'],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      rules: {
        'jsx-quotes': ['error', 'prefer-double'],
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/display-name': 'off',
        'react/jsx-curly-brace-presence': ['error', { props: 'never' }],
        'react/jsx-boolean-value': ['error', 'never'],
        'react/jsx-sort-props': [
          'error',
          {
            shorthandFirst: true,
            multiline: 'last',
            reservedFirst: ['key'],
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