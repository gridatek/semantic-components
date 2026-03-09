import playwright from 'eslint-plugin-playwright';
import baseConfig from '../../eslint.config.mjs';

export default [
  playwright.configs['flat/recommended'],
  ...baseConfig,
  {
    files: ['**/*.ts', '**/*.js'],
    // Override or add rules here
    rules: {
      'playwright/expect-expect': [
        'error',
        { assertFunctionNames: ['expect', 'expectNoA11yViolations'] },
      ],
      'playwright/no-skipped-test': 'off',
      'playwright/no-networkidle': 'off',
    },
  },
];
