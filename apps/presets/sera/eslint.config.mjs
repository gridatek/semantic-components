import nx from '@nx/eslint-plugin';
import baseConfig from '../../../eslint.config.mjs';

export default [
  ...baseConfig,
  ...nx.configs['flat/angular'],
  ...nx.configs['flat/angular-template'],
  {
    files: ['**/*.ts'],
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
      '@angular-eslint/no-input-rename': 'off',
    },
  },
  {
    files: ['**/*.html'],
    rules: {
      // A label in a scField is tied to its control by the field (as in
      // the blocks app), which this rule can't see.
      '@angular-eslint/template/label-has-associated-control': 'off',
      // The sidebar's rail: aria-hidden and out of the tab order — a mouse
      // edge, nothing to name (as in the showcase and blocks apps).
      '@angular-eslint/template/elements-content': 'off',
    },
  },
];
